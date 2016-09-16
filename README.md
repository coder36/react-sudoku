#Suduku React

[Sudoku solver](https://reactsudoku.herokuapp.com/)

Experiment with facebook's "Create React apps with no configuration".  I want to answer
the following questions:

* How easy is really to get started ?
* How does it integrate with a node backend ?

I'm also having a play with GraphQL, which I've got say is amazing!  

# Tech stack

* React
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* Mongo / [Mongoose](http://mongoosejs.com/)
* GraphQL
* Heroku
* Foreman


# Running the demo

```
npm install
node node_modules/foreman/nf.js start
```

Navigate to http://localhost:5000

To try out the graphql server, go to:  http://localhost:5100


# Getting started with create-react-app
It's as simple as:
```
npm install -g create-react-app
create-react-app hello-world
cd hello-world
npm run
```

And that's it!  You get a fully integrated webpack build toolchain with linting and hot deployments.  It fully supports ES6 via Babel.  You can run `npm build` to build a production version of your code.  The minification is impressive.  It also adds hashes to the generated filenames, which allows you to specify effectively and infiinte max-age cache-control header.  All good for making a good impression on the end user.




# Node API server

The documentation suggestion is to create a seperate API server in true microservice style.  The react-scripts support
a special `proxy: ` package.json entry, which allows the dev server to proxy off to another port.

I used foreman to start up both the dev react server and the api express server.  This
works well and makes for an easy dev experience.

In reality, for a project, I would probably serve that static js and html from the same server.


# GraphQL server

I'm using Mongoose as an ODM (Object Document Mapper) abstraction on top of Mongo, which is then exposed as a GraphQL server.  Visi


# Deployment to Heroku

```
heroku create reactsudoku --buildpack https://github.com/mars/create-react-app-buildpack.git
git push heroku
```

In `static.json` I've set the static assets to be cached in the browser using the `max-age` cache-control setting.  Since I expect the final javascript minified file to be over 100K, this will make a great optimisation - on a slow internet connection ie. 3g there would otherwise be a visible delay whilst downloading the assets.  For continous deployments, we need to make sure the static assets have a unique name - create-react-app does this for us by appending a hash (awesome!).  




#Conclusions

Its very easy to get started, and takes away the complex configuration normally needed for a nice webpack setup.

Developing a react application has just got a lot easier.
