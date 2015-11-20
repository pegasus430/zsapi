## Quick local dev setup:

1. `git clone ...`
2. `git checkout development`
3. `bundle install`
4. `rake db:create` (after setting up database.yml)
5. `rake db:migrate`
6. `rake devdata:all`

After running the final rake (devdata), you'll be given an email address. Use this email address to log into the app using the password "demo1234"

## Development groove: 

3 terminals, 3 commands: 

1. `rails s`
2. `guard`          -- for injecting style changes
3. `npm run watch`  -- mostly for browsersync (reloads scripts and templates)

