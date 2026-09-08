module.exports = function (eleventyConfig) {
  // Pass raw materials through to the finished goods
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/img/");
  eleventyConfig.addWatchTarget("src/assets/js/");
  eleventyConfig.addWatchTarget("src/_includes/");

  // Annex plates in plate order rather than filename order. The contents page
  // at /annex/ inherits the same tag from the directory data file, so it is
  // filtered out by URL to stop it listing itself. Filtering by URL is not
  // belt-and-braces here, it is the only thing holding: Eleventy's deep data
  // merge keeps the directory's `tags` value, so a `tags: []` in the contents
  // page's own front matter does not override it and the page still lands in
  // the collection.
  eleventyConfig.addCollection("annexPlates", (collectionApi) =>
    collectionApi
      .getFilteredByTag("annex")
      .filter((item) => item.url !== "/annex/")
      .sort((a, b) =>
        String(a.data.plateNo || "").localeCompare(String(b.data.plateNo || ""))
      )
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};