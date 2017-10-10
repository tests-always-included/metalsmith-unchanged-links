"use strict";

var plugin;

/**
 * Calls the plugin with a file that has a specified bit of content.
 * Returns true if the plugin detected a problem.
 *
 * @param {string} content File content to test.
 * @return {Promise.<*>}
 */
function callPlugin(content) {
    var files;

    files = {
        "test-file.html": {
            contents: Buffer.from(content, "utf8")
        }
    };

    return new Promise((resolve, reject) => {
        spyOn(console, "error");
        plugin()(files, {}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


/**
 * Turns a rejected promise into a successful one.
 */
function success() {
    return;
}

plugin = require("..");

describe("metalsmith-unchanged-links", () => {
    it("passes when there is nothing bad", () => {
        return callPlugin("<p>Good HTML.</p>");
    });
    it("detects a broken link", () => {
        return callPlugin("<p>This is a [broken] link</p>").then(jasmine.fail, success);
    });
    it("ignores code", () => {
        return callPlugin("<code>array[index] = 12</code>");
    });
    it("ignores script", () => {
        return callPlugin("<script>array[index] = 'test';</script>");
    });
});
