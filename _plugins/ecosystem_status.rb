require 'json'
require 'net/http'
require 'uri'
require 'time'

module Jekyll
  class EcosystemStatusGenerator < Generator
    safe true
    priority :high

    def generate(site)
      github_token = ENV['GITHUB_TOKEN']
      headers = {}
      if github_token && !github_token.empty?
        headers = {
          'Authorization' => "token #{github_token}",
          'Accept' => 'application/vnd.github.v3+json',
          'User-Agent' => 'tskit-ecosystem-status'
        }
      else
        puts "Warning: No GITHUB_TOKEN provided, ecosystem status data will be limited"
        headers = {
          'Accept' => 'application/vnd.github.v3+json',
          'User-Agent' => 'tskit-ecosystem-status'
        }
      end

      site.data['ecosystem_status'] = {}
      
      site.collections['software'].docs.each do |software|
        repo_name = software.data['name']
        gh_org = software.data['gh_org']
        python_package = software.data['python_package']
        conda_package = software.data['conda_package']
        
        next unless gh_org && repo_name
        
        repo_data = {}
        
        begin
          # Get repository info
          repo_info = fetch_github_api("https://api.github.com/repos/#{gh_org}/#{repo_name}", headers)
          default_branch = repo_info&.dig('default_branch') || 'main'
          
          # Get releases
          releases = fetch_github_api("https://api.github.com/repos/#{gh_org}/#{repo_name}/releases", headers)
          latest_release = releases.first if releases && !releases.empty?
          
          # Get commit info for default branch
          commits = fetch_github_api("https://api.github.com/repos/#{gh_org}/#{repo_name}/commits?sha=#{default_branch}&per_page=1", headers)
          latest_commit = commits.first if commits && !commits.empty?
          
          # Get PR info
          open_prs = fetch_github_api("https://api.github.com/repos/#{gh_org}/#{repo_name}/pulls?state=open", headers)
          
          # Get last merged PR - use the merged state and sort by merged date
          merged_prs = fetch_github_api("https://api.github.com/repos/#{gh_org}/#{repo_name}/pulls?state=closed&sort=updated&direction=desc&per_page=50", headers)
          last_merged_pr = nil
          if merged_prs && !merged_prs.empty?
            # Find the most recently merged PR (not just closed)
            merged_only = merged_prs.select { |pr| pr['merged_at'] }
            last_merged_pr = merged_only.max_by { |pr| Time.parse(pr['merged_at']) } unless merged_only.empty?
          end
          
          # Get CI status for latest commit (check both status API and check runs)
          ci_status = nil
          if latest_commit
            # Try GitHub Actions Check Runs first (modern approach)
            check_runs = fetch_github_api("https://api.github.com/repos/#{gh_org}/#{repo_name}/commits/#{latest_commit['sha']}/check-runs", headers)
            if check_runs && check_runs['check_runs'] && !check_runs['check_runs'].empty?
              # Use check runs (GitHub Actions)
              check_states = check_runs['check_runs'].map { |run| run['conclusion'] || run['status'] }
              if check_states.any? { |state| state == 'failure' || state == 'cancelled' || state == 'timed_out' }
                ci_status = { 'state' => 'failure' }
              elsif check_states.any? { |state| state == 'in_progress' || state == 'queued' || state == 'pending' }
                ci_status = { 'state' => 'pending' }
              elsif check_states.all? { |state| state == 'success' || state == 'completed' }
                ci_status = { 'state' => 'success' }
              else
                ci_status = { 'state' => 'unknown' }
              end
            else
              # Fallback to older status API
              combined_status = fetch_github_api("https://api.github.com/repos/#{gh_org}/#{repo_name}/commits/#{latest_commit['sha']}/status", headers)
              if combined_status
                ci_status = {
                  'state' => combined_status['state'],
                  'total_count' => combined_status['total_count'],
                  'statuses' => combined_status['statuses']
                }
              end
            end
          end
          
          # Calculate commits since last release
          commits_since_release = 0
          if latest_release && latest_commit
            release_commit_sha = latest_release['target_commitish'] || 'main'
            comparison = fetch_github_api("https://api.github.com/repos/#{gh_org}/#{repo_name}/compare/#{latest_release['tag_name']}...#{default_branch}", headers)
            commits_since_release = comparison['ahead_by'] if comparison
          end
          
          # Get PyPI info if python package exists
          pypi_info = nil
          if python_package
            pypi_info = fetch_pypi_info(python_package)
          end

          # Get conda info if conda package exists
          conda_info = nil
          if conda_package
            conda_info = fetch_conda_info(conda_package)
          end
          
          repo_data = {
            'repo_name' => repo_name,
            'gh_org' => gh_org,
            'python_package' => python_package,
            'conda_package' => conda_package,
            'repo_url' => "https://github.com/#{gh_org}/#{repo_name}",
            'latest_release' => latest_release,
            'commits_since_release' => commits_since_release,
            'latest_commit' => latest_commit,
            'ci_status' => ci_status,
            'open_pr_count' => open_prs ? open_prs.length : 0,
            'last_merged_pr' => last_merged_pr,
            'pypi_info' => pypi_info,
            'conda_info' => conda_info,
            'updated_at' => Time.now
          }
          
        rescue => e
          puts "Error fetching data for #{gh_org}/#{repo_name}: #{e.message}"
          repo_data = {
            'repo_name' => repo_name,
            'gh_org' => gh_org,
            'error' => e.message,
            'updated_at' => Time.now
          }
        end
        
        site.data['ecosystem_status'][repo_name] = repo_data
      end
    end

    private

    def fetch_github_api(url, headers)
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      
      request = Net::HTTP::Get.new(uri)
      headers.each { |key, value| request[key] = value }
      
      response = http.request(request)
      
      if response.code == '200'
        JSON.parse(response.body)
      else
        puts "GitHub API error for #{url}: #{response.code} #{response.message}"
        nil
      end
    end

    def fetch_pypi_info(package_name)
      uri = URI("https://pypi.org/pypi/#{package_name}/json")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true

      request = Net::HTTP::Get.new(uri)
      response = http.request(request)

      if response.code == '200'
        JSON.parse(response.body)
      else
        nil
      end
    rescue => e
      puts "Error fetching PyPI info for #{package_name}: #{e.message}"
      nil
    end

    def fetch_conda_info(package_name)
      uri = URI("https://api.anaconda.org/package/conda-forge/#{package_name}")
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true

      request = Net::HTTP::Get.new(uri)
      response = http.request(request)

      if response.code == '200'
        JSON.parse(response.body)
      else
        nil
      end
    rescue => e
      puts "Error fetching conda info for #{package_name}: #{e.message}"
      nil
    end
  end
end
