## tskit.dev

This repo is the source code for http://tskit.dev

The site is made with [jekyll](https://jekyllrb.com/) and built with grunt.

## Dependencies

```
gem install --user-install bundler jekyll
bundle install 
```

## Building the site
To build the site you will need a github auth token (for API requests, no permissions are
needed on the token)
`GITHUB_TOKEN=YOUR_TOKEN_HERE grunt dev`

## Data sources
News, software and resources are the jekyll collections driving the site.
The front matter of each file in their respective directories provides the metadata for each
entry, which is supplemented with information from API requests by plugins. Any information
in front matter overrides that from API requests - useful for fixing bad publication info
for instance. To not hit rate limiters API requests are cached, to clear the cache `rm /tmp/open-uri-*`.

To add a new item create an additional file in either the `_software`, `_news` or `_resources` directory.
Refer to the existing files for the required YAML keys in the front matter. Any images needed
should be places in the `assets/images` folder and referred to with this template:
`{{ '/assets/images/PATH/TO/file.svg' |  relative_url}}` this will cause the file to be added to
the build.

## Testing a PR
It can be tedious to get a site build running locally, e.g. for testing changes.
The easiest way to see the effect of a change to the site is to make a PR, which
runs CI checks. As part of those checks, a copy of the site is made available for
download as a GitHub "artifact". To locate the URL for download, click "Show all checks"
link in the PR merge box, click on the "details" link for the penultimate item:
"Build and deploy site / Deploy 🚀 (if on main branch)".  At the bottom of the resulting
actions, under "Upload site (for PR inspection)" you should find an "Artefact download URL".
An easy way to inspect the downloaded site is then to run `python -m http.server` from within
the downloaded directory, and then point a browser at the resulting server, usually at
http://localhost:8000.