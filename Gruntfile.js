/**
 * Gruntfile
 *
 * If you created your Sails app with `sails new foo --linker`, 
 * the following files will be automatically injected (in order)
 * into the EJS and HTML files in your `views` and `assets` folders.
 *
 * At the top part of this file, you'll find a few of the most commonly
 * configured options, but Sails' integration with Grunt is also fully
 * customizable.	If you'd like to work with your assets differently 
 * you can change this file to do anything you like!
 *
 * More information on using Grunt to work with static assets:
 * http://gruntjs.com/configuring-tasks
 */
'use strict';
module.exports = function (grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		angconfig: {
			www: '/var/www',
			ang: '<%= angconfig.www %>/citi',
			production: '<%= angconfig.ang %>/production',
			asset: '<%= angconfig.production %>/public',
			root: '<%= angconfig.ang %>/php',
			app: '<%= angconfig.root %>/app',
			webroot: '<%= angconfig.root %>/public',
			css: '<%= angconfig.webroot %>/css',
			js: '<%= angconfig.webroot %>/js',
			templates: '<%= angconfig.webroot %>/templates',
		},

		phplint: {
			options: {
				swapPath: '/tmp'
			},
			all: [
				'app/config/*.php', 'app/controllers/*.php', 'app/models/*.php', 'public/index.php'
			]
		}, 

		clean: {
			options: {
				force: true
			},
			dev: ['.tmp/public/**'],
			build: ['www'],
			prod: ['<%= angconfig.production %>']
		},

		// http://gruntjs.com/sample-gruntfile
		jshint: {
			// define the files to lint
			src: ['js/app.js', 'package.json', 'Gruntfile.js'],
			options: {
				// more options here if you want to override JSHint defaults
				//strict: false,
				globalstrict: true,
				laxbreak: true,
				laxcomma: true,
				scripturl: true,
				globals: {
					'imagesLoaded': false,
					'moment': false,
					'Masonry': false,
					'angular': false,
					'require': false,
					'parent': false,
					'User': false,
					'Subscriber': false,
					'Dress': false,
					'Designer': false,
					'Collection': false,
					'EmailService': false,
					'process': false,
					'exports': false,
					'sails': false,
					'locals': false,
					'document': false,
					'window': false,
					'$': false,
					'alert': false,
					'sessionStorage': false,
					'adsbygoogle': false,
					//scripturl: false,
					jQuery: true,
					console: true,
					module: true
				}
			}
		},

		copy: {
			dev: {
				files: [
					{
						expand: true,
						cwd: './assets',
						src: ['**/*.!(coffee)'],
						dest: '.tmp/public'
					}
				]
			},
			build: {
				files: [
					{
						expand: true,
						cwd: '.tmp/public',
						src: ['**/*'],
						dest: 'www'
					}
				]
			},
			prod: {
				files: [
					// {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
					{
						expand: true,
						cwd: 'css',
						src: ['*.css'],
						dest: '<%= angconfig.production %>/css',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'js',
						src: ['*.js'],
						dest: '<%= angconfig.production %>/js',
						filter: 'isFile'
					},
				]
			}
		},

		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				preserveComments: false,
				// Specify mangle: false to prevent changes to your variable and function names.
				mangle: false
			},
			dist: {
				src: ['.tmp/public/concat/production.js'],
				dest: '.tmp/public/min/production.js'
			},
			prod: {
				files: [
					{
						src: ['<%= angconfig.ang %>/js/app.js'],
						dest: '<%= angconfig.production %>/js/app.js'
					},
					// {
					// 	src: ['<%= angconfig.webroot %>/js/jquery.main.js'],
					// 	dest: '<%= angconfig.asset %>/js/jquery.main.js'
					// }
				]
			}
		},

		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true
			},
			prod: {
				files: [
					{
						// '<%= angconfig.ang %>/index.html': '<%= angconfig.production %>/index.html'
						'/var/www/citi/index.html': '<%= angconfig.production %>/index.html'
					},
					// {
					// 	expand: true,
					// 	cwd: '<%= angconfig.webroot %>/templates',
					// 	src: '**/*.html',
					// 	dest: '<%= angconfig.asset %>/templates',
					// 	filter: 'isFile'
					// },
				]
			}
		},
		// https://github.com/gruntjs/grunt-contrib-cssmin
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'public/css',
					src: ['*.css', '!*.min.css'],
					dest: '<%= angconfig.asset %>/css',
					filter: 'isFile'
				}]
			}
		},

		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['assets/css/don.css']
			},
			lax: {
				options: {
					import: false
				},
				src: ['assets/**/*.css']
			}
		},

		concat: {
			js: {
				src: ['assets/js/app.js', 'assets/js/imagesloaded.pkgd.min.js', 'assets/js/masonry.pkgd.min.js', 'assets/js/jquery.infinitescroll.min.js', 'assets/js/parsley.min.js', 'assets/js/ang.js'],
				dest: '.tmp/public/concat/production.js'
			},
			css: {
			}
		},
		
		watch: {
			options: {
				livereload: true,
				interrupt: true,
				dateFormat: function(time) {
					grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
					grunt.log.writeln('Waiting for more changes...');
					grunt.log.writeln('');
				},
			},
			configFiles: {
				files: [ 'Gruntfile.js', 'package.json'],
				tasks: ['jshint'],
				options: {
					reload: true,
				}
			},
			php: {
				files: ['app/config/*.php', 'app/controllers/*.php', 'app/models/*.php', 'public/index.php'],
				tasks: ['phplint:all'],
				options: {
					reload: true
				}
			},
			js: {
				// API files to watch:
				files: ['public/js/**/*'],
				tasks: ['jshint'],
				options: {
					reload: true,
					livereload: 35729
					// livereload: true
				}
			},
			html: {
				// Views files to watch:
				files: ['public/index.html', 'public/templates/**/*'],
				options: {
					// livereload: true
					reload: true,
					livereload: 35729
				}
			},
		}
	});

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

	grunt.registerTask('default', ['phplint:all', 'jshint']);
	grunt.registerTask('ang_watch', ['phplint:all', 'jshint', 'watch']);

	grunt.registerTask('precommit', ['phplint:all', 'phpunit:unit']);
	grunt.registerTask('server', ['php']); 

	grunt.registerTask('js', [
		'jshint',
	]);

	grunt.registerTask('css', [
		//'clean:dev',
		'copy:dev',
		'concat',
		'uglify:ang',
		'cssmin'
	]);
	
	// Build the assets into a web accessible folder.
	// (handy for phone gap apps, chrome extensions, etc.)
	grunt.registerTask('build', [
		'compileAssets',
		'linkAssets',
		'clean:build',
		'copy:build'
	]);

	// production
	grunt.registerTask('prod', [
		'clean:prod',
		'copy:prod',
		'uglify:prod',
		'htmlmin:prod',
	]);

	/*
	grunt.registerTask('default', [
		//'jshint',
		//'csslint:strict'
		'clean:dev',
		'copy:dev',
		'concat',
		//'uglify:ang',
		'cssmin',
		'watch'
	]);
	*/
};
