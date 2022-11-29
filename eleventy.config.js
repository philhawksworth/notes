const sass = require("sass");

module.exports = function(eleventyConfig) {

  // Just pass some assets through directly
  eleventyConfig.addPassthroughCopy({ "site/notes-img": "/notes-img" });
    
  // Simple sass pipeline
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: function(contents, includePath) {
      let includePaths = [this.config.dir.includes];
      return () => {
        let ret = sass.renderSync({
          file: includePath,
          includePaths,
          data: contents,
          outputStyle: "compressed"
        });
        return ret.css.toString("utf8");
      }
    }
  });
  
  return {
    dir: {
      input: "site",
      output: "dist",
      data: "_data"
    }
  }
};

