/**
 * Find links that were in Markdown and were not converted to HTML.
 *
 * @module metalsmith-unchanged-links
 */
"use strict";

/**
 * Metalsmith file object.
 *
 * @typedef metalsmithFile
 * @property {Buffer} contents
 * @property {string} mode
 */

/**
 * Metalsmith collection of files.
 *
 * @typedef {Object.<string,module:metalsmith-unchanged-links~metalsmithFile>} metalsmithFileCollection
 */
var cheerio, debug, pluginKit;

cheerio = require("cheerio");
debug = require("debug")("metalsmith-unchanged-links");
pluginKit = require("metalsmith-plugin-kit");

/**
 * Options for the middleware factory.
 *
 * @typedef {Object} options
 * @property {string} [encoding=utf8] Buffer encoding.
 * @property {boolean} [error=true]
 * @property {Array.<string>} [ignoreNodes] HTML elements to ignore. Defaults to ["code","script"].
 * @property {module:metalsmith-plugin-kit~match} [match] Defaults to `*.html` in any folder.
 * @property {module:metalsmith-plugin-kit~matchOptions} [matchOptions={}] Controls how to find files that have elements to repeat.
 * @property {RegExp} [pattern] Search pattern to find links that were not converted.
 */

/**
 * Factory to build middleware for Metalsmith.
 *
 * @param {module:metalsmith-unchanged-links~options} options
 * @return {Function}
 */
module.exports = function (options) {
    options = pluginKit.defaultOptions({
        encoding: "utf8",
        error: true,
        ignoreNodes: [
            "code",
            "script"
        ],
        match: "**/*.html",
        matchOptions: {},
        pattern: /\[(\w|\s)*\]/
    }, options);

    return pluginKit.middleware({
        each: (filename, file) => {
            var content, failures;

            debug("Processing %s", filename);
            content = cheerio.load(file.contents.toString(options.encoding));
            failures = [];
            content("*").contents().filter((index, element) => {
                var elementInContext, i;

                if (element.type !== "text") {
                    return false;
                }

                elementInContext = content(element);

                for (i = 0; i < options.ignoreNodes.length; i += 1) {
                    if (elementInContext.parents(options.ignoreNodes[i]).length) {
                        return false;
                    }
                }

                return true;
            }).each((index, element) => {
                var matches;

                matches = element.data.match(options.pattern);

                if (matches) {
                    console.error(`Unconverted link found in ${filename}: ${matches[0]}`);
                    failures.push(`${filename}: ${matches[0]}`);
                }
            });

            if (failures.length && options.error) {
                throw new Error(`Unconverted links found:\n* ${failures.join("\n* ")}`);
            }
        },
        match: options.match,
        matchOptions: options.matchOptions,
        name: "metalsmith-unchanged-links"
    });
};
