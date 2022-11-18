---
layout: software-page
title: tskit-rust
name: tskit-rust
gh_org: tskit-dev
docs_url: https://docs.rs/tskit
category: analyse
logo: https://raw.githubusercontent.com/tskit-dev/administrative/main/logos/svg/tskit-rust/Tskit_rust_logo_white.eps.svg
priority: 13
code_snippet: |2
  let treeseq = tskit::TreeSequence::load(
    &treefile
  ).unwrap();
  let mut tree_iterator = 
    treeseq.tree_iterator(
      tskit::TreeFlags::default()
    ).unwrap();
  while let Some(tree) = 
    tree_iterator.next() {
      ...
    }
redirect_from:
  - /tskit-rust/
---
`tskit-rust` provides [rust](https://www.rust-lang.org/) bindings to the [tskit](https://tskit.dev/tskit) C library.

