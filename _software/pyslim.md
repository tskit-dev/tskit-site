---
layout: software-page
title: pyslim
name: pyslim
#Uncomment to override automatic values
#description:
#repo_url:
gh_org: tskit-dev
docs_url: https://tskit.dev/pyslim/docs/stable
category: analyse
python_package: pyslim
conda_package: pyslim
publication: https://doi.org/10.1101/2025.09.30.679676
priority: 12
code_snippet: |2
  rts = pyslim.recapitate(
      ts,
      ancestral_Ne=10000
  )
redirect_from:
  - /pyslim/
citation_url: https://doi.org/10.1101/2025.09.30.679676
---

pyslim is a small python package to help analyse and manipulate tree sequences
produced by SLiM, e.g., to identify individuals alive at a particular time,
or to recapitate the results of a SLiM simulation.

