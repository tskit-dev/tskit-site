---
layout: software-page
title: sc2ts
name: sc2ts
gh_org: tskit-dev
docs_url: https://tskit.dev/sc2ts/docs/
publication: https://www.biorxiv.org/content/10.1101/2023.06.08.544212v3
category: infer
python_package: sc2ts
logo: /assets/sc2ts.png
priority: 5
code_snippet: |2
  import tszip, sc2ts

  ts = tszip.load("sc2ts_viridian_v1.2.trees.tsz")
  df_node = sc2ts.node_data(ts)
redirect_from:
  - /sc2ts/
---
Sc2ts ("SARS-CoV-2 to tree sequence") provides methods to infer
Ancestral Recombination Graphs (ARGs) for SARS-CoV-2 data at
pandemic scale, plus convenient wrappers around tskit and Zarr
for working with the resulting tree sequences and associated data.
