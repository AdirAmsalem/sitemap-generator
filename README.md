# sitemap-generator

Sitemap generator for web applications

## Overview

The goal of the tool is to proactively improve the SEO of client-side web apps via sitemap.xml files, just like we do for years with traditional websites.

Today, this is not so easy to make web apps SEO-friendly. However, services like Prerender.io and libraries like Ember.js and React has started a great initiative in this field, and even Google themselves announced that their crawlers has started to execute JavaScript and they are moving toward this direction as well.

Back to the tool, it's seperated into 3 components - Engine, Configuration and Plugin (Runner):

* Engine - the core componet and its main goal is to parse the application and automatically find all the pages (urls/routes) we have in it.

* Configuration - an extensible component that defines both personal preferences (like base url, priorities, etc) and library configurations (how to actually find routes in angularjs/ember/backbone/etc apps).

* Plugin (Runner) - additional extensible component, the goal is to develop plugins for the popular build tools and task runners (Grunt, Gulp, etc), so people will be able to easily integrate it in their existing environment.

So basically you choose a plugin and a configuration according to your needs, adds it to your build process - and after each build you will have a sitemap.xml file that includes all the pages in your application.
