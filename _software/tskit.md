---
layout: software-page
title: tskit
name: tskit
gh_org: tskit-dev
docs_url: https://tskit.dev/tskit/docs/
category: analyse
python_package: tskit
conda_package: tskit
logo: https://raw.githubusercontent.com/tskit-dev/administrative/main/logos/svg/tskit/Tskit_logo_on_black_no_background.eps.svg
priority: 1
code_snippet: |2
  ts = tskit.load("example.trees")
  afs = ts.allele_frequency_spectrum()
redirect_from:
  - /tskit/
citation_url: https://tskit.dev/tskit/docs/stable/citation.html
citation_md: https://raw.githubusercontent.com/tskit-dev/tskit/refs/heads/main/docs/citation.md
---
The tskit library provides the underlying functionality used to load, examine, and
manipulate tree sequences, including efficient methods for calculating genetic statistics.
It often forms part of an installation of other software packages such as
msprime, SLiM, fwdpp, and tsinfer.