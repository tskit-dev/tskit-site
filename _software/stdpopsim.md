---
layout: software-page
title: stdpopsim
name: stdpopsim
gh_org: popsim-consortium
docs_url: https://popsim-consortium.github.io/stdpopsim-docs/stable/index.html
publication: https://doi.org/10.7554/eLife.54967
priority: 10
force_show_title: false
category: simulate
code_snippet: |2
    species = stdpopsim.get_species(
        "HomSap"
    )
    model = species.get_demographic_model(
        "OutOfAfrica_3G09"
    )
    contig = species.get_contig("chr22")
    samples = {
        "YRI": 5,
        "CHB": 5,
        "CEU": 0
    }
    engine = stdpopsim.get_engine(
        "msprime"
    )
    ts = engine.simulate(
        model, contig, samples
    )
---
stdpopsim is a community-maintained library of standard population genetic simulation models.
It provides easy access to a growing catalog of published simulation models from a range of
organisms and supports multiple simulation-engine backends. 