'use strict';

var gulp     = require('gulp');

var slim     = require("gulp-slim");

var requireDir = require('require-dir');

requireDir('./gulp/tasks', {recurse: true});
