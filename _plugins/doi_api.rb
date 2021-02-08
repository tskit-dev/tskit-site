require 'json'
require 'open-uri'
require 'open-uri/cached'
require 'hash-joiner'

module Jekyll_Get_DOI
  class Generator < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      site.config['pubs']['pubs'].each do |p|
        target = p
        doc = JSON.load(URI("http://api.crossref.org/works/#{p['doi']}").open())
        source = doc["message"]
        if target
          HashJoiner.deep_merge target, source
        else
          p = source
        end
      end
    end
  end
end
