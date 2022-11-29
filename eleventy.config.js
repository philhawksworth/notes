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


	let _CAPTURES;
	eleventyConfig.on('beforeBuild', () => {
		//I need this to wipe _CAPTURES when editing pages, wouldn't be an issue in prod
		_CAPTURES = {};
	});
	
	
	eleventyConfig.addPairedShortcode("mycapture", function (content, name) {
		if(!_CAPTURES[this.page.inputPath]) _CAPTURES[this.page.inputPath] = {};
		if(!_CAPTURES[this.page.inputPath][name]) _CAPTURES[this.page.inputPath][name] = '';
		_CAPTURES[this.page.inputPath][name] += content;
		return '';
	});
	
	eleventyConfig.addShortcode("displaycapture", function(name) {
		if(_CAPTURES[this.page.inputPath] && _CAPTURES[this.page.inputPath][name]) return _CAPTURES[this.page.inputPath][name];
		return '';
	});

  
  return {
    dir: {
      input: "site",
      output: "dist",
      data: "_data"
    }
  }
};

