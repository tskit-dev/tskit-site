---
layout: news
title: Publications on new tskit functionality
description: |
  A pair of newly published papers describe efficient implementations
  of matrix-vector multiplication and principle component analysis in tskit,
  as well as ways to compare and infer haplotype lengths.
timestamp: 2025-11-09
author: Yan Wong
---

## Working with genetic relatedness

![Example PCA]({{ '/assets/images/news/20251202-genetics_papers/pca.jpg' |  relative_url}}){:class="news-float-left"}

Brieuc Lehman at UCL and others in the tskit developer community have introduced a method to use the tree sequence encoding to efficiently multiply the genetic relatedness matrix (GRM) by a vector, even for huge sample sizes. This is a foundation for many other potential methods. As an example, it is used to implement fast principle component analysis (PCA) on ARGs and other tree sequences, scalable to very large sample sizes (image; left).

The approach is described in Lehmann _et al._ (2025) On ARGs, pedigrees, and genetic relatedness matrices, _Genetics_: iyaf219 [doi: 10.1093/genetics/iyaf219](https://doi.org/10.1093/genetics/iyaf219).

The new methods are available as
[ts.pca()](https://tskit.dev/tskit/docs/stable/python-api.html#tskit.TreeSequence.pca)
and [ts.genetic_relatedness_vector()](https://tskit.dev/tskit/docs/stable/python-api.html#tskit.TreeSequence.genetic_relatedness_vector).

## Extending haplotypes

Halley Fritz at Oregon and colleagues have a paper describing the new
[ts.extend_haplotypes()](https://tskit.dev/tskit/docs/stable/python-api.html#tskit.TreeSequence.extend_haplotypes) method. This discusses how non-coalescent segments of nodes in an ancestral recombination graph (ARG) are important, shows how to infer them, and discusses why this can make tree sequence encodings of ARGs more efficient. also describes haplotype-aware methods to compare tree sequences, implemented in the [tscompare](https://tskit.dev/tskit/tscompare) library

The paper is in the same journal edition: Fritze _et al._ (2025) A forest is more than its trees: haplotypes and ancestral recombination graphs, _Genetics_: iyaf198 [doi: 10.1093/genetics/iyaf198](https://doi.org/10.1093/genetics/iyaf198).
