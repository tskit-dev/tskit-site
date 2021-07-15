## tskit.dev

This repo is the source code for http://tskit.dev

The site is made with [jekyll](https://jekyllrb.com/)

## Dependencies

```
gem install --user-install bundler jekyll
bundle install 
```

## Previewing the site
`bundle exec jekyll serve`

## Data sources
Publications, tutorials and videos are listed in `_config.yml`. Publication data is scraped, but can be overriden with
values in `_config.yml`. Software info is in the front matter yaml of each file in `_software/` extra info is fetched
from github, but again can be overridden. To not hit rate limiters these requests are cached, to
clear the cache `rm /tmp/open-uri-*`.