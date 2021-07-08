---
layout: software-page
title: SLiM
name: SLiM
gh_org: MesserLab
docs_url: https://messerlab.org/slim/
category: simulate
permalink: /SLiM
code_snippet: |2
  initialize() {
      initializeTreeSeq();
      initializeMutationRate(1e-8);
      initializeMutationType("m1", 0.5, "e", 0.001);
      initializeGenomicElementType("g1", m1, 1.0);
      initializeGenomicElement(g1, 0, 999999);
      initializeRecombinationRate(1e-8);
  }
  1 { sim.addSubpop("p1", 500); }
  2000 late() { sim.treeSeqOutput("out.trees"); }
---
Here is some content that is on the full page about SLiM