---
layout: software-page
title: tskit_arg_visualizer
name: tskit_arg_visualizer
gh_org: kitchensjn
docs_url: https://github.com/kitchensjn/tskit_arg_visualizer/blob/main/docs/tutorial.md
publication: https://doi.org/10.1093/bioadv/vbaf302
logo: https://raw.githubusercontent.com/kitchensjn/tskit_arg_visualizer/refs/heads/main/docs/logo/tskit_arg_visualizer_small_logo.png
category: analyse
python_package: tskit_arg_visualizer
priority: 17
force_show_title: true
code_snippet: |2
  d3arg = tskit_arg_visualizer.D3ARG.from_ts(ts)
  d3arg.draw()
redirect_from:
  - /tskit_arg_visualizer/
---

`tskit_arg_visualizer` is a python+javascript tool that plots interactive visualizations
of the graph (ARG) described by a tree sequence object.
