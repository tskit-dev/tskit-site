require 'json'
require 'open-uri'
require 'open-uri/cached'
require 'httparty'



module Jekyll_Get_Github
  class Generator < Jekyll::Generator
    safe true
    priority :highest

    def fetch_all_pages(url, headers)
      all_results = []
      page = 1
      per_page = 100  # Maximum allowed by GitHub API
      
      loop do
        response = HTTParty.get("#{url}?page=#{page}&per_page=#{per_page}", headers: headers)
        page_results = JSON.load(response.body)
        
        # Break if we get an empty array or if it's not an array (error case)
        break if !page_results.is_a?(Array) || page_results.empty?
        
        all_results.concat(page_results)
        page += 1
        
        # Break if we got fewer results than per_page (last page)
        break if page_results.length < per_page
      end
      
      all_results
    end

    def generate(site)
        headers = {
          Authorization: 'token '+ ENV['GITHUB_TOKEN'],
        }
      site.data['contributors'] = {}
      site.collections['software'].docs.each do |d|
        d.data['github'] = {}
        d.data['github']['releases'] = fetch_all_pages(
          "https://api.github.com/repos/#{d['gh_org']}/#{d['name']}/releases", headers
        )
        d.data['github']['repo'] = JSON.load(
          HTTParty.get("https://api.github.com/repos/#{d['gh_org']}/#{d['name']}", headers: headers).body
        )
        d.data['github']['contributors'] = fetch_all_pages(
          "https://api.github.com/repos/#{d['gh_org']}/#{d['name']}/contributors", headers
        )
        site.config['extra_contributors'].each do |login, repo|
            if repo == d['name']
                d.data['github']['contributors'] << {
                    "login" => login,
                    "contributions" => 0
                }
            end
        end
        d.data['github']['contributors'].each do |c|
            if d.data['github']['repo']['owner']['login'] == "tskit-dev"
                if site.data['contributors'].key?(c['login'])
                    site.data['contributors'][c['login']]['contributions'] += c['contributions']
                else
                    c['repos'] = []
                    site.data['contributors'][c['login']] = c
                end
                site.data['contributors'][c['login']]['repos'].append(d.data['github']['repo']['name'])
            end
        end
      end
      site.data['contributors'] = site.data['contributors'].values.sort_by {|x| -x['contributions']}
      site.data['contributors'] = site.data['contributors'].filter {|x| !x['login'].include?("[bot]") and x['login'] != "pyup-bot"}
      site.data['contributors'].each do |c|
        fetched = false
        sleep_time = 1
        retry_count = 0
        max_retries = 5
        
        while not fetched and retry_count < max_retries do
            begin
              response = HTTParty.get("https://api.github.com/users/#{c['login']}", headers: headers)
              user_data = JSON.load(response.body)
              
              # Check if we got valid user data
              if user_data.is_a?(Hash) && user_data.key?('login')
                c.merge!(user_data)
                fetched = true
                sleep_time = 1
              else
                puts "Invalid user data for #{c['login']}: #{user_data}"
                retry_count += 1
              end
            rescue => e
              puts "Error fetching user #{c['login']}: #{e.message}"
              retry_count += 1
              
              if e.message.include?("rate limit exceeded") || e.message.include?("403")
                puts("Rate limit hit, sleeping for #{sleep_time} seconds")
                sleep(sleep_time)
                sleep_time = [sleep_time * 2, 60].min  # Cap at 60 seconds
              elsif retry_count >= max_retries
                puts("Max retries reached for user #{c['login']}, skipping")
                break
              else
                sleep(1)  # Brief pause before retry
              end
            end
        end
      end
    end
  end
end
