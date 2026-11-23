const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  // Pass raw materials through to the finished goods
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/img/");
  eleventyConfig.addWatchTarget("src/assets/js/");
  eleventyConfig.addWatchTarget("src/_includes/");

  // Cache-busting: "/assets/css/workbench.css" | versioned
  //   -> "/assets/css/workbench.css?v=<first 10 hex of its md5>"
  // Asset filenames carry no hash, so without this every cache in front of
  // the site (Cloudflare, the browser) serves the old file until it expires.
  // The version comes from the file's content, so it changes only when the
  // file does. A missing file fails the build rather than shipping a bad link.
  eleventyConfig.addFilter("versioned", (url) => {
    const file = path.join(__dirname, "src", url);
    const hash = crypto
      .createHash("md5")
      .update(fs.readFileSync(file))
      .digest("hex")
      .slice(0, 10);
    return `${url}?v=${hash}`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
  };
};
