---
layout: base.njk
title: Annex
# Page 5 is bound into the book but stays out of the index, like the plates
# it lists. base.njk emits this as a <meta name="robots">; netlify.toml's
# X-Robots-Tag on /annex/* is the other half. Drop this line to list it.
robots: noindex, nofollow, noarchive, nosnippet
---

## ANNEX

<!-- The table of contents' sibling, in the same markup and rhythm. Kept
     to titles and numbers: the phone-sized leaf (350×467 at the 375px
     floor) holds about five rows, and that, not the 800px page, is what
     this list has to fit. Plates carry their own captions and running times.

     Hand-written, not generated, so validate-content.js can weigh it. Adding
     a plate means a file in src/annex/ plus one line here, the same two-place
     rule as adding a page. A list title may be shorter than the plate's own
     (A-03 uses its pdfLabel); a row that wraps on a phone costs two rows. -->
<ul class="toc-list">
<li class="toc-item"><a href="/annex/agbt-2025-software-roadmap/" class="toc-link">Software Roadmap at AGBT 2025</a><span class="toc-number">A-01</span></li>
<li class="toc-item"><a href="/annex/xenium-launch-interview/" class="toc-link">Xenium Launch Interview</a><span class="toc-number">A-02</span></li>
<li class="toc-item"><a href="/annex/single-cell-spatial-omics-poster/" class="toc-link">Democratizing Single-Cell and Spatial Omics Analysis</a><span class="toc-number">A-03</span></li>
<li class="toc-item"><a href="/annex/xenium-explorer-walkthrough/" class="toc-link">Xenium Explorer Walkthrough</a><span class="toc-number">A-04</span></li>
</ul>
