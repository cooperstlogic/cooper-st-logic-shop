module.exports = function (eleventyConfig) {
  // Pass raw materials through to the finished goods
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Watch for changes in the paint shop (CSS)
  eleventyConfig.addWatchTarget("src/assets/css/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};