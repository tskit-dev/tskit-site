---
layout: software-page
title: tszip
name: tszip
gh_org: tskit-dev
docs_url: https://tskit.dev/tszip/docs/
category: analyse
python_package: tszip
code_snippet: |2
  $ tszip 1kg_chr20.trees
  $ tsunzip 1kg_chr20.trees.tsz  
redirect_from:
  - /tszip/
---
`tszip` is a command line interface and Python API for compressing tskit tree sequence files produced and read by software projects in the tskit ecosystem such as msprime, SLiM, fwdpy11 and tsinfer. Tszip achieves much better compression than is possible using generic compression utilities by building on the zarr and numcodecs packages.