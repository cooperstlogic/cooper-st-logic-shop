module.exports = function (eleventyConfig) {
  // Pass raw materials through to the finished goods
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/img/");
  eleventyConfig.addWatchTarget("src/assets/js/");
  eleventyConfig.addWatchTarget("src/_includes/");

  // No collection for the annex: page 5 (src/annex.md) lists the plates by
  // hand so validate-content.js can weigh the list like any other page copy.

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};