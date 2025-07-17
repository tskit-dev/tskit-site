---
layout: software-page
title: tsdate
name: tsdate
gh_org: tskit-dev
docs_url: https://tskit.dev/tsdate/docs/stable/
publication: https://doi.org/10.1126/science.abi8264
category: infer
python_package: tsdate
logo: https://raw.githubusercontent.com/tskit-dev/administrative/main/logos/svg/tsdate/Tskit_tsdate_logo_on_black_no_background.eps.svg
priority: 4
code_snippet: |2
  dated_ts = tsdate.date(inferred_ts, mutation_rate=1e-8)
redirect_from:
  - /tsdate/
citation_url: https://tskit.dev/tsdate/docs/stable/#citing
citation_md: https://raw.githubusercontent.com/tskit-dev/tsdate/refs/heads/main/docs/citation.md
---
Tsdate is a scalable method for estimating the age of ancestral nodes in a tree sequence.
