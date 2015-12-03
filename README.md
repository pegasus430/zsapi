## Quick local dev setup:

1. `git clone ...`
2. `git checkout development`
3. `bundle install`
4. `rake db:create` (after setting up database.yml)
5. `rake db:migrate`
6. `rake devdata:all`

After running the final rake (devdata), you'll be given an email address. Use this email address to log into the app using the password "demo1234"

## Development groove: 

2 terminals, 2 commands: 

1. `rails s`
3. `npm run watch`  -- mostly for browsersync (reloads scripts and templates)


## Development Approach

In a nutshell: NPM script tasks for processing scripts and styles in a manner that still uses Rails' pipeline (as needed). 

Loosely based on [gulp-rails-pipeling](https://github.com/vigetlabs/gulp-rails-pipeline), originally presented in [this post](https://viget.com/extend/gulp-rails-asset-pipeline)

### Notes:

- The directory `npm-pipeline` is the home for all source scripts and styles, which get piped to `public/assets`. 

### Why?

In efforts to have the most optimal development work environment (high developer happiness == high developer effectiveness) without completely ditching Rails' pipeline. 

Namely, when only using Rails' pipeline, there's no way to use [Browsersync](http://www.browsersync.io/) in a way that lets it inject style changes (due to the way Rails compiles Sass at runtime when in development). Instead, Browsersync has to result to a full page load. While this may seem trivial, it's a surprisingly big productivity killer (especially when working on things like modals and other state-based/dependent styles).