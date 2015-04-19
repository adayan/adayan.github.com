module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        options: {
            separator: ';'
        },
        test: {
            //src: ['<%= uglify.test.dest %>/**/*.js'],
            src: ['js/jquery-1.11.2.min.js', 'js/jquery.fullpage.min.js', 'js/main.js'],
            dest: 'build/main.js'
        }
      },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        dest: 'build/main.min.js',
        src: ['<%= concat.test.dest %>'], // Actual pattern(s) to match.
        ext: '.min.js',
      }
    },
    imagemin: {
        /* 压缩图片大小 */
        dist: {
          options: {
              optimizationLevel: 3 //定义 PNG 图片优化水平
          },
          files: [{
              expand: true,
              cwd: 'imgs/',
              src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
              dest: 'imgs/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
            }]
          }
      },

      cssmin: {
        minify: {
          expand: true,
          cwd: 'css/',
          src: ['*.css'],
          dest: 'build/css/',
          ext: '.min.css'
        },
        combine: {
          files: {
            'build/main.min.css': ['build/css/normalize.min.css', 'build/css/animate.min.css', 'build/css/main.min.css']
          }
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['concat', 'uglify', 'imagemin', 'cssmin:minify', 'cssmin:combine']);

};