---
layout: base.njk
title: Annex
# Page 5 is bound into the book but stays out of the index, like the plates
# it lists. base.njk emits this as a <meta name="robots">; netlify.toml's
# X-Robots-Tag on /annex/* is the other half. Drop this line to list it.
robots: noindex, nofollow, noarchive, nosnippet
---

## ANNEX

Odds and ends from outside the shop, bound in here as fold-out plates. Each unfolds to its own size.

<!-- Hand-written, not generated: validate-content.js reads this file line by
     line, so the list must be literal for the page height to be checked.
     Adding a plate means a file in src/annex/ plus one entry here, the same
     two-place rule as adding a page. Each entry is two source lines, title
     then meta, so the estimate lands near the rendered height. -->
<ul class="toc-list plate-list">
<li class="toc-item plate-item"><a href="/annex/agbt-2025-software-roadmap/" class="toc-link">Software Roadmap at AGBT 2025</a><span class="toc-number">A-01</span>
<span class="plate-meta">Video · AGBT 2025 · 13 min 52 sec</span></li>
<li class="toc-item plate-item"><a href="/annex/xenium-launch-interview/" class="toc-link">Xenium Launch Interview</a><span class="toc-number">A-02</span>
<span class="plate-meta">Video · BioTechTV · December 2023 · 7 min 12 sec</span></li>
<li class="toc-item plate-item"><a href="/annex/single-cell-spatial-omics-poster/" class="toc-link">Democratizing single cell and spatial analysis with cloud infrastructure and agentic workflows</a><span class="toc-number">A-03</span>
<span class="plate-meta">Poster · PDF · 36 × 44 in · 2.6 MB</span></li>
<li class="toc-item plate-item"><a href="/annex/xenium-explorer-walkthrough/" class="toc-link">Xenium Explorer Walkthrough</a><span class="toc-number">A-04</span>
<span class="plate-meta">Video · Xenium Explorer 2.0 · silent screen capture · 25 sec</span></li>
</ul>
