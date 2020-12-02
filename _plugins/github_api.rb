require 'json'
require 'open-uri'
require 'open-uri/cached'

module Jekyll_Get_Github
  class Generator < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      site.collections['software'].docs.each do |d|
        d.data['github'] = {}
        d.data['github']['releases'] = JSON.load(
          open("https://api.github.com/repos/#{d['gh_org']}/#{d['name']}/releases")
        )
        d.data['github']['repo'] = JSON.load(
          open("https://api.github.com/repos/#{d['gh_org']}/#{d['name']}")
        )
        d.data['github']['contributors'] = JSON.load(
          open("https://api.github.com/repos/#{d['gh_org']}/#{d['name']}/contributors")
        )
      end
    end
  end
end