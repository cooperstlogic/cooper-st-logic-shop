module.exports = function (eleventyConfig) {
  // Pass raw materials through to the finished goods
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/img/");
  eleventyConfig.addWatchTarget("src/assets/js/");
  eleventyConfig.addWatchTarget("src/_includes/");

  // Annex plates in plate order rather than filename order. The contents page
  // at /annex/ inherits the same tag from the directory data file, so it is
  // filtered out by URL to stop it listing itself.
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