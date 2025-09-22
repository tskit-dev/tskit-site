---
layout: software-page
title: msprime
name: msprime
#Uncomment to override automatic values
#description:
#repo_url:
gh_org: tskit-dev
docs_url: https://tskit.dev/msprime/docs/
category: simulate
python_package: msprime
conda_package: msprime
publication: https://doi.org/10.1093/genetics/iyab229
logo: https://raw.githubusercontent.com/tskit-dev/administrative/main/logos/svg/msprime/Tskit_msprime_logo_on_black_no_background.eps.svg
priority: 2
code_snippet: |2
  ts = msprime.sim_ancestry(
      samples=10,
      recombination_rate=1e-4,
      sequence_length=1e6
  )
  ts = msprime.sim_mutations(ts, rate=1e-6)
redirect_from:
  - /msprime/
citation_url: https://tskit.dev/msprime/docs/stable/CITATION.html
citation_md: https://raw.githubusercontent.com/tskit-dev/msprime/refs/heads/main/CITATION.md
---

Msprime is a Python package that simulates ancestral histories and
DNA sequence data. Msprime uses backwards-in-time "coalescent" models
which allows it to simulate data very efficiently; however, it
is not as flexible as forwards-in-time simulators like SLiM or fwdpy11.
