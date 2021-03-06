Metalsmith Unchanged Links
==========================

Find Markdown links that were not converted to HTML links because of a typo or because the name didn't match.

[![npm version][npm-badge]][npm-link]
[![Build Status][travis-badge]][travis-link]
[![Dependencies][dependencies-badge]][dependencies-link]
[![Dev Dependencies][devdependencies-badge]][devdependencies-link]
[![codecov.io][codecov-badge]][codecov-link]


Overview
--------

Take this imaginary Markdown.

    Make sure you enable [Multi-Factor Authentication] on the account.
    It is part of our [security guidelines][security handbook].
    Oh, and read [this page][page.html) for more information.

    [Multi Factor Authentication]: mfa/
    [security policy]: security-policy/

All of the links are broken for different reasons.  The first link is to `[Multi-Factor Authentication]` but the link definition at the bottom excludes the hyphen. The second link indirectly references `[security handbook]` but the link definition is for `[security policy]`. Lastly, the `[this page]` link isn't rendered because it should have a parenthesis instead of a bracket at the beginning of the URL.

The Markdown engine won't see your broken links and warn you. Instead, it cheerfully converts it as text. This is not a problem with the Markdown engine, but it does pose a problem if you have links that are broken on your site.

The solution is to parse the HTML and look for text that matches a pattern that would match markdown links. It does mean that you can't use things like `[1]` as footnotes without converting them to code, or else you could configure the tool to exclude your use of brackets.

You would simply add this plugin to your `.use()` chain in Metalsmith.

    var unchnagedLinks = require("metalsmith-unchanged-links");

    // ...
    .use(unchangedLinks);

If the default settings don't work for you, there are options you can use to tailor how the library works.


Installation
------------

Use `npm` to install this package easily.

    $ npm install --save metalsmith-unchanged-links

Alternately you may edit your `package.json` and add this to your `dependencies` object:

    {
        ...
        "dependencies": {
            ...
            "metalsmith-unchanged-links": "*"
            ...
        }
        ...
    }


Usage
-----

Include this plugin the same as any other Metalsmith plugin. This first example shows how you would add it using a JSON configuration. It also shows the default settings. These are described later.

    {
        "plugins": {
            "metalsmith-unchanged-links": {
                "encoding": "utf8",
                "error": true,
                "ignoreNodes": [
                    "code",
                    "script"
                ],
                "match": "**/*.html",
                "matchOptions": {}
            }
        }
    }

This is a JavaScript example, which also includes a brief explanation of the options.

    var unchangedLinks = require("metalsmith-unchanged-links");

    // Then in your list of plugins you use it.
    .use(unchangedLinks());

    // Alternately, you can specify options. The values shown here are
    // the defaults.
    .use(unchangedLinks({
        // How buffers are decoded into text and encoded again. Only
        // affects the files being changed.
        "encoding": "utf8",

        // Error when there are problems detected. When this is set to
        // `false`, warning messages are still printed but the build does
        // not break.
        "error": true,

        // What HTML nodes should be excluded from the search.
        "ignoreNodes": [
            "code",
            "script"
        ],

        // What files to target.
        "match": "**/*.html",

        // Options to select what files should be targeted.
        "matchOptions": {},

        // Search pattern to use. This is expected to be a regular expression,
        // so it can not be defined in JSON.
        "pattern": /\[(\w|\s)+\]/
    });

This uses [metalsmith-plugin-kit] to match files. The `.matchOptions` object and `.match` property are just options passed directly to that library for matching files.

If you want to see what files are processed, what elements are found and the resulting list of matching files, enable debugging.

    DEBUG=metalsmith-unchanged-links metalsmith


API
---

<a name="module_metalsmith-unchanged-links"></a>

## metalsmith-unchanged-links
Find links that were in Markdown and were not converted to HTML.


* [metalsmith-unchanged-links](#module_metalsmith-unchanged-links)
    * [module.exports(options)](#exp_module_metalsmith-unchanged-links--module.exports) ⇒ <code>function</code> ⏏
        * [~metalsmithFile](#module_metalsmith-unchanged-links--module.exports..metalsmithFile)
        * [~metalsmithFileCollection](#module_metalsmith-unchanged-links--module.exports..metalsmithFileCollection) : <code>Object.&lt;string, module:metalsmith-unchanged-links--module.exports~metalsmithFile&gt;</code>
        * [~options](#module_metalsmith-unchanged-links--module.exports..options) : <code>Object</code>

<a name="exp_module_metalsmith-unchanged-links--module.exports"></a>

### module.exports(options) ⇒ <code>function</code> ⏏
Factory to build middleware for Metalsmith.

**Kind**: Exported function  
**Params**

- options [<code>options</code>](#module_metalsmith-unchanged-links--module.exports..options)

<a name="module_metalsmith-unchanged-links--module.exports..metalsmithFile"></a>

#### module.exports~metalsmithFile
Metalsmith file object.

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_metalsmith-unchanged-links--module.exports)  
**Properties**

- contents <code>Buffer</code>  
- mode <code>string</code>  

<a name="module_metalsmith-unchanged-links--module.exports..metalsmithFileCollection"></a>

#### module.exports~metalsmithFileCollection : <code>Object.&lt;string, module:metalsmith-unchanged-links--module.exports~metalsmithFile&gt;</code>
Metalsmith collection of files.

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_metalsmith-unchanged-links--module.exports)  
<a name="module_metalsmith-unchanged-links--module.exports..options"></a>

#### module.exports~options : <code>Object</code>
Options for the middleware factory.

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_metalsmith-unchanged-links--module.exports)  
**Properties**

- encoding <code>string</code> - Buffer encoding.  
- error <code>boolean</code>  
- ignoreNodes <code>Array.&lt;string&gt;</code> - HTML elements to ignore. Defaults to ["code","script"].  
- match <code>module:metalsmith-plugin-kit~match</code> - Defaults to `*.html` in any folder.  
- matchOptions <code>module:metalsmith-plugin-kit~matchOptions</code> - Controls how to find files that have elements to repeat.  
- pattern <code>RegExp</code> - Search pattern to find links that were not converted.  



Development
-----------

This uses Jasmine, Istanbul and ESLint for tests.

    # Install all of the dependencies
    npm install

    # Run the tests
    npm run test


License
-------

This software is licensed under a [MIT license][LICENSE] that contains additional non-advertising and patent-related clauses.  [Read full license terms][LICENSE]


[codecov-badge]: https://img.shields.io/codecov/c/github/connected-world-services/metalsmith-unchanged-links/master.svg
[codecov-link]: https://codecov.io/github/connected-world-services/metalsmith-unchanged-links?branch=master
[dependencies-badge]: https://img.shields.io/david/connected-world-services/metalsmith-unchanged-links.svg
[dependencies-link]: https://david-dm.org/connected-world-services/metalsmith-unchanged-links
[devdependencies-badge]: https://img.shields.io/david/dev/connected-world-services/metalsmith-unchanged-links.svg
[devdependencies-link]: https://david-dm.org/connected-world-services/metalsmith-unchanged-links#info=devDependencies
[LICENSE]: LICENSE.md
[metalsmith-plugin-kit]: https://github.com/fidian/metalsmith-plugin-kit
[npm-badge]: https://img.shields.io/npm/v/metalsmith-unchanged-links.svg
[npm-link]: https://npmjs.org/package/metalsmith-unchanged-links
[travis-badge]: https://img.shields.io/travis/connected-world-services/metalsmith-unchanged-links/master.svg
[travis-link]: http://travis-ci.org/connected-world-services/metalsmith-unchanged-links
