---
layout: software-page
title: kastore
name: kastore
gh_org: tskit-dev
docs_url: https://tskit.dev/kastore/docs/
category: analyse
python_package: kastore
conda_package: kastore
priority: 15
code_snippet: |2
    $ kastore ls simulation.trees

redirect_from:
  - /kastore/
---
`kastore` is a write-once-read-many store for simple numerical data. It is used
as the binary file format underlying tskit tree sequence files, providing
efficient storage and retrieval of keyed numerical arrays with both a Python
API and a portable C library. It also provides a CLI which can be useful
for inspecting tskit trees files.
