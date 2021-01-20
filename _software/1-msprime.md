---
layout: software-page
title: msprime
name: msprime
#Uncomment to override automatic values
#description: 
#repo_url: 
gh_org: tskit-dev
#For now - ultimately we'd like this to be https://tskit-dev/msprime/docs/stable
docs_url: https://tskit-dev.github.io/msprime-docs/main/
category: simulate
permalink: /msprime
python_package: msprime
logo: https://user-images.githubusercontent.com/8552/101000815-4837ad00-3556-11eb-8597-490e44f53f41.png
code_snippet: |2
  ts = msprime.sim_ancestry(
      samples=10, 
      recombination_rate=1e-4, 
      sequence_length=1e6
  )
  ts = msprime.mutate(ts, rate=1e-6)
---


TODO Here is some content that is on the full page about msprime
