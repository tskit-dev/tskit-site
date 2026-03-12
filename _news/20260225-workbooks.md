---
layout: news
title: New interactive workbooks
description: | 
  A set of interactive online workbooks are available at 
  https://tskit.dev/explore.
image: https://jupyterlite.readthedocs.io/en/stable/_static/wordmark-dark.svg
timestamp: 2026-02-25
author: Yan Wong
---

You can now try _tskit_ online! The workbooks
at [https://tskit.dev/explore](https://tskit.dev/explore) are built using
[JupyterLite](https://jupyterlite.readthedocs.io) which allows them to be run
within any modern browser, with no local installation
required.

Workbooks differ from the existing [tutorials](https://tskit.dev/tutorials) by being 
dynamic rather than static pages. Readers are encouraged to actively run the workbook
code themselves — hence the term "workbooks" rather than simply "notebooks".

A few workbooks are intended for teaching in online workshops, others provide
introductions to _tskit_-relevant topics (see below). We also intend to add further
material.

### Topic introductions

Currently the following workbooks are available:
* [tskit.ipynb](https://tskit.dev/explore/lab/?path=tskit.ipynb): an interactive tour of tskit (loading files, mutations, stats & plotting)
* [simulation.ipynb](https://tskit.dev/explore/lab/?path=simulation.ipynb): a quick introduction to simulation (msprime, slim, recapitation, multiple chromosomes)

### Workshop material

A pair of workbooks exists to help explain ancestral recombination graphs (ARGs)
using _tskit_. These include inline self-assessment questions, and are intended
for use in workshops, such as that pictured below.

![Porto ARG workshop]({{ '/assets/images/news/20260225-workbooks/PortoWorkshop.jpg' |  relative_url}}){:style="width: 100%"}

* [WhatIsAnARG_workbook1.ipynb](https://tskit.dev/explore/lab/?path=WhatIsAnARG_workbook1.ipynb): Graphs and local trees, mutations, genetic variation and statistical calculations
* [WhatIsAnARG_workbook2.ipynb](https://tskit.dev/explore/lab/?path=WhatIsAnARG_workbook2.ipynb): Types of ARG, simplification, and ARG simulation

### Dataset analysis

Notebooks also exist to allow students and researchers to explore existing datasets.
At the moment, there is a single such notebook, demonstrating methods for
inspecting and analysing the 2.48 million sample
[SARS-CoV-2 ARG](https://www.biorxiv.org/content/10.1101/2023.06.08.544212v3).

* [sc2ts.ipynb](https://tskit.dev/explore/lab/?path=sc2ts.ipynb): Analysing the SARS-CoV-2 (sc2ts) ARG using tskit, numpy and pandas.
The [tszipped](/software/tszip.html) ARG itself is available to manipulate directly in the browser.