---
layout: news
title: New software for visualising ARGs and tree sequences
description: |
  James Kitchens, a graduate student in the Coop lab in UC Davis, has
  released the first version of his D3-based javascript
  software for visualising Ancestral Recombination Graphs.
  Interactive plots of ARGs in tskit format can be created
  and displayed on web pages or in Jupyter notebooks.
image: ../assets/images/news/20231103-tskit_arg_visualizer-0.0.1/viz.png
timestamp: 2023-11-05
author: Yan Wong
---

## New software for visualising ARGs and tree sequences

![James Kitchens]({{ '/assets/images/news/20231103-tskit_arg_visualizer-0.0.1/james.jpg' |  relative_url}}){:class="news-float-left" style="width: 8em"}

The standard visualization of a tree sequence is as a set of
adjacent trees. However, the set of correlated trees in a tree sequence can
also be thought of as a single graph structure. A new [D3](https://d3js.org)-based project called
[`tskit_arg_visualiser`](https://github.com/kitchensjn/tskit_arg_visualizer)
by James Kitchens (left), a graduate student in the
[Coop lab](https://gcbias.org) in UC Davis, allows you to visualize these graphs, 
interactively manipulate node positions, and more. This is a great way to
produce graphics for demos, posters, teaching etc.

The visualizer can be embedded in notebooks or web pages, and
can draw "orthogonal" style classic Ancestral Recombination
Graphs, or diagonal-line-style graphs that are more suitable
for simplified ARGs such as standard msprime output.

This is an early release, and more features are planned. Check out
the interactive examples in the
[tskit visualization tutorial](https://tskit.dev/tutorials/viz.html#graph-representations)
and the
[tskit ARG tutorial](https://tskit.dev/tutorials/args.html#visualization), or
head over to the [GitHub repo](https://github.com/kitchensjn/tskit_arg_visualizer)
for installation instructions or to help out with development.