require 'json'
require 'open-uri'
require 'open-uri/cached'

module Jekyll_Get_DOI
  class Generator < Jekyll::Generator
    safe true
    priority :highest

    def generate(site)
      site.config['pubs']['pubs'].each do |p|
        doc = JSON.load(URI("http://api.crossref.org/works/#{p['doi']}").open())
        source = doc["message"]
        p["title"] = source["title"]
        p["journal"] = source["container-title"]
        p["year"] = source["published-online"]["date-parts"][0][0]
        authors = source["author"].map {|x| x["family"]}
        p["author"] = authors[0..-2].join(", ") + " and " + authors[-1]
      end
    end
  end
end
