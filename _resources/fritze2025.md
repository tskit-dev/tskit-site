---
type: paper
doi: 10.1093/genetics/iyaf198
timestamp: 2025-12-02
---
This paper discusses how non-coalescent segments of nodes in an
ancestral recombination graph (ARG) are important, shows how
to infer them, and discusses why this can make tree sequence
encodings of ARGs more efficient. The functionality is
implemented in the _tskit_ `ts.extend_haplotypes()` method.
The paper also describes haplotype-aware methods to compare
tree sequences, implemented in the _tscompare_ library.