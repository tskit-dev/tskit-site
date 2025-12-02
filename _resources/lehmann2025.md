---
type: paper
doi: 10.1093/genetics/iyaf219
timestamp: 2025-12-02
---
This paper discusses branch relatedness in the context of tree sequences,
and introduces a method to use the tree sequence encoding to efficiently
multiply the genetic relatedness matrix (GRM) by a vector, even for huge
sample sizes. This is used to implement a fast way of performing
principle component analysis (PCA) on ARGs and other tree sequences
(now implemented as `ts.pca()` in tskit)