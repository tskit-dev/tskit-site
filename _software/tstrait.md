---
layout: software-page
title: tstrait
name: tstrait
#Uncomment to override automatic values
#description: 
#repo_url: 
gh_org: tskit-dev
docs_url: https://tskit.dev/tstrait/docs/
category: simulate
python_package: tstrait
priority: 13
code_snippet: |2
  model = tstrait.trait_model(
    distribution="normal", mean=0, var=1
  )
  sim_result = tstrait.sim_phenotype(
      ts=ts, num_causal=100, model=model, h2=0.3, random_seed=1
  )
redirect_from:
  - /tstrait/
---

tstrait is a Python package to simulate quantitative traits from a given
tree sequence.
