---
layout: software-page
title: sc2ts
name: sc2ts
gh_org: tskit-dev
docs_url: https://tskit.dev/sc2ts/docs/
publication: https://www.biorxiv.org/content/10.1101/2023.06.08.544212v2
category: infer
python_package: sc2ts
logo: /assets/sc2ts.png
priority: 5
code_snippet: |2
  import sc2ts
  ts = sc2ts.load_tree_sequence("viridian_data.sc2ts.zarr")
  sc2ts.describe(ts)
redirect_from:
  - /sc2ts/
---
Sc2ts ("SARS-CoV-2 to tree sequence") provides methods to infer
Ancestral Recombination Graphs (ARGs) for SARS-CoV-2 data at
pandemic scale, plus convenient wrappers around tskit and Zarr
for working with the resulting tree sequences and associated data.
