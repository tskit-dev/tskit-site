---
layout: software-page
title: tspop
name: tspop
gh_org: gtsambos
docs_url: https://tspop.readthedocs.io/en/latest/index.html
publication: https://doi.org/10.1093/bioadv/vbad163
category: analyse
python_package: tspop
priority: 16
code_snippet: |2
  pop_ancestry = tspop.get_pop_ancestry(ts, census_time=100.01)
  print(pop_ancestry)
redirect_from:
  - /tspop/
---

`tspop` is a convenience library that makes it easy to to extract local ancestry from
tree sequence genealogies, using the efficient
[link-ancestors](https://tskit.dev/tskit/docs/stable/python-api.html#tskit.TableCollection.link_ancestors)
method provided by `tskit`.