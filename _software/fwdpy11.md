---
layout: software-page
title: fwdpy11
name: fwdpy11
gh_org: molpopgen
docs_url: https://molpopgen.github.io/fwdpy11
category: simulate
python_package: fwdpy11
priority: 11
code_snippet: |2
  pop = fwdpy11.DiploidPopulation(
    100, 1000.0
  )
  p = {
    "nregions": [],
    "rates": (0.0, 1e-3, None),
    "prune_selected": False,
    "demography": 
      fwdpy11.DiscreteDemography(),
    "simlen": 10 * pop.N + 200,
    ...
  }
  params = fwdpy11.ModelParams(**p)
  fwdpy11.evolvets(rng, pop, params)
---
`fwdpy11` is a Python package for individual-based, forward-time simulations of population genetic processes.
