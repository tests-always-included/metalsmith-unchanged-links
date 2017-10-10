Metalsmith Link Globs
=====================

Repeat your `<script>`, `<link>`, `<img>` and `<a>` tags in your HTML by using a wildcard pattern in your `src=` or `href=` attributes.

[![npm version][npm-badge]][npm-link]
[![Build Status][travis-badge]][travis-link]
[![Dependencies][dependencies-badge]][dependencies-link]
[![Dev Dependencies][devdependencies-badge]][devdependencies-link]
[![codecov.io][codecov-badge]][codecov-link]


Overview
--------

When building HTML files that should link to a bunch of JavaScript files, one can hardcode each link, but that is tedious. It also doesn't work well when you want to use the same HTML but link to JavaScript that has not been concatenated nor minified. Why not just pull the list of files from Metalsmith?

    <html>
        <head>
            <title> BEFORE THE PLUGIN </title>
            <script src="third-party/angular.js"></script>
            <script src="third-party/angular-ui.js"></script>
            <script src="third-party/sha512.js"></script>
            <script src="my-app.js"></script>
            <script src="other-thing.js"></script>
            <link rel="stylesheet" href="third-party/normalize.css">
            <link rel="stylesheet" href="third-party/angular-ui.css">
            <link rel="stylesheet" href="themes/clean-looks.css">
            <link rel="stylesheet" href="themes/base.css">
            <link rel="stylesheet" href="site.css">
            <link rel="stylesheet" href="atomic.css">

This can be reduced to the following:

    <html>
        <head>
            <title> WITH THE PLUGIN </title>
            <script src="third-party/**/*.js"></script>
            <script src="!(third-party)**/*.js"></script>
            <link rel="stylesheet" href="**/*.css">

You would simply add this plugin to your `.use()` chain in Metalsmith.

    var linkGlobs = require("metalsmith-link-globs");

    // ...
    .use(linkGlobs);

If the default settings don't work for you, there are options you can use to tailor how the library works.


Installation
------------

Use `npm` to install this package easily.

    $ npm install --save metalsmith-link-globs

Alternately you may edit your `package.json` and add this to your `dependencies` object:

    {
        ...
        "dependencies": {
            ...
            "metalsmith-link-globs": "*"
            ...
        }
        ...
    }


Usage
-----

Include this plugin the same as any other Metalsmith plugin. This first example shows how you would add it using a JSON configuration. It also shows the default settings. These are described later.

    {
        "plugins": {
            "metalsmith-link-globs": {
                "elementMatchOptions": {},
                "encoding": "utf8",
                "match": "**/*.html",
                "matchOptions": {},
                "nodes": [
                    {
                        "element": "a",
                        "property": "href"
                    },
                    {
                        "element": "img",
                        "property": "src"
                    },
                    {
                        "element": "link",
                        "property": "href"
                    },
                    {
                        "element": "script",
                        "property": "src"
                    }
                ]
            }
        }
    }

This is a JavaScript example, which also includes a brief explanation of the options.

    var linkGlobs = require("metalsmith-link-globs");

    // Then in your list of plugins you use it.
    .use(linkGlobs());

    // Alternately, you can specify options. The values shown here are
    // the defaults.
    .use(linkGlobs({
        // Matching options for the glob patterns that are used within
        // elements.
        "elementMatchOptions": {},

        // How buffers are decoded into text and encoded again. Only
        // affects the files being changed.
        "encoding": "utf8",

        // What files to target.
        "match": "**/*.html",

        // Options to select what files should be targeted.
        "matchOptions": {},

        // A list of HTML element and property names that should be
        // processed.
        "nodes": [
            {
                "element": "a",
                "property": "href"
            },
            {
                "element": "img",
                "property": "src"
            },
            {
                "element": "link",
                "property": "href"
            },
            {
                "element": "script",
                "property": "src"
            }
        ]
    });

This uses [metalsmith-plugin-kit] to match files. The `.matchOptions` and `.elementMatchOptions` objects are just options passed directly to that library for matching files.

If you want to see what files are processed, what elements are found and the resulting list of matching files, enable debugging.

    DEBUG=metalsmith-link-globs metalsmith


API
---

<a name="module_metalsmith-link-globs"></a>

## metalsmith-link-globs
Metalsmith Link Globs will repeat HTML elements so you can link to
one or several files, based on what is in your build. Your debug build
may not combine and minify files but your production build does.
Eliminate the hassle and use a layout like this to link all files.

    <script src="js/*.js"></script>


* [metalsmith-link-globs](#module_metalsmith-link-globs)
    * [module.exports(options)](#exp_module_metalsmith-link-globs--module.exports) ⇒ <code>function</code> ⏏
        * [~processNode(node, sourceFile, content, fileList)](#module_metalsmith-link-globs--module.exports..processNode)
        * [~metalsmithFile](#module_metalsmith-link-globs--module.exports..metalsmithFile)
        * [~metalsmithFileCollection](#module_metalsmith-link-globs--module.exports..metalsmithFileCollection) : <code>Object.&lt;string, module:metalsmith-link-globs--module.exports~metalsmithFile&gt;</code>
        * [~nodeDefinition](#module_metalsmith-link-globs--module.exports..nodeDefinition) : <code>Object</code>
        * [~options](#module_metalsmith-link-globs--module.exports..options) : <code>Object</code>

<a name="exp_module_metalsmith-link-globs--module.exports"></a>

### module.exports(options) ⇒ <code>function</code> ⏏
Factory to build middleware for Metalsmith.

**Kind**: Exported function
**Params**

- options [<code>options</code>](#module_metalsmith-link-globs--module.exports..options)

<a name="module_metalsmith-link-globs--module.exports..processNode"></a>

#### module.exports~processNode(node, sourceFile, content, fileList)
Rewrites element tags in the HTML for a given node definition.

**Kind**: inner method of [<code>module.exports</code>](#exp_module_metalsmith-link-globs--module.exports)
**Params**

- node <code>Object</code>
- sourceFile <code>string</code>
- content <code>Cheerio</code>
- fileList <code>Array.&lt;string&gt;</code>

<a name="module_metalsmith-link-globs--module.exports..metalsmithFile"></a>

#### module.exports~metalsmithFile
Metalsmith file object.

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_metalsmith-link-globs--module.exports)
**Properties**

| Name | Type |
| --- | --- |
| contents | <code>Buffer</code> | 
| mode | <code>string</code> | 

<a name="module_metalsmith-link-globs--module.exports..metalsmithFileCollection"></a>

#### module.exports~metalsmithFileCollection : <code>Object.&lt;string, module:metalsmith-link-globs--module.exports~metalsmithFile&gt;</code>
Metalsmith collection of files.

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_metalsmith-link-globs--module.exports)
<a name="module_metalsmith-link-globs--module.exports..nodeDefinition"></a>

#### module.exports~nodeDefinition : <code>Object</code>
Defines a node name and the property that has the glob expression.  For
instance, images may look like `<img src="*.jpg">`. This would match all
jpeg files in the current folder. The definition for `img` tags should
look like this:

    {
        element: "img",
        property: "src"
    }

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_metalsmith-link-globs--module.exports)
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| element | <code>string</code> | Name of element to fine. |
| property | <code>string</code> | Attribute or property name of the element that contains the glob expression. |

<a name="module_metalsmith-link-globs--module.exports..options"></a>

#### module.exports~options : <code>Object</code>
Options for the middleware factory.

**Kind**: inner typedef of [<code>module.exports</code>](#exp_module_metalsmith-link-globs--module.exports)
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| elementMatchOptions | <code>module:metalsmith-plugin-kit~matchOptions</code> | <code>{}</code> | Controls what files match the patterns found in the HTML elements. |
| encoding | <code>string</code> | <code>&quot;utf8&quot;</code> | Buffer encoding. |
| match | <code>module:metalsmith-plugin-kit~matchList</code> |  | Defaults to `*.html` in any folder. |
| matchOptions | <code>module:metalsmith-plugin-kit~matchOptions</code> | <code>{}</code> | Controls how to find files that have elements to repeat. |
| nodes | <code>Array.&lt;module:metalsmith-plugin-kit~nodeDefinition&gt;</code> |  | What HTML elements to process. Defaults to a, img, link and script. |



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


[codecov-badge]: https://img.shields.io/codecov/c/github/connected-world-services/metalsmith-link-globs/master.svg
[codecov-link]: https://codecov.io/github/connected-world-services/metalsmith-link-globs?branch=master
[dependencies-badge]: https://img.shields.io/david/connected-world-services/metalsmith-link-globs.svg
[dependencies-link]: https://david-dm.org/connected-world-services/metalsmith-link-globs
[devdependencies-badge]: https://img.shields.io/david/dev/connected-world-services/metalsmith-link-globs.svg
[devdependencies-link]: https://david-dm.org/connected-world-services/metalsmith-link-globs#info=devDependencies
[LICENSE]: LICENSE.md
[metalsmith-plugin-kit]: https://github.com/fidian/metalsmith-plugin-kit
[npm-badge]: https://img.shields.io/npm/v/metalsmith-link-globs.svg
[npm-link]: https://npmjs.org/package/metalsmith-link-globs
[travis-badge]: https://img.shields.io/travis/connected-world-services/metalsmith-link-globs/master.svg
[travis-link]: http://travis-ci.org/connected-world-services/metalsmith-link-globs
