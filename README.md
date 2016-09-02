#Suduku React

[Sudoku solver](https://reactsudoku.herokuapp.com/)

Experiment with facebook's "Create React apps with no configuration".  I want to answer
the following questions:

* How easy is really to get started ?
* How does it integrate with a node backend ?



# Getting started with create-react-app
It's as simple as:
```
npm install -g create-react-app
create-react-app hello-world
cd hello-world
npm run
```

And that's it!  You get a fully integrated webpack build toolchain with linting and hot deployments.  It fully supports
ES6 via Babel.  You can run `npm build` to build a production version of your code.  The minification is impressive.  It
also adds hashes to the generated filenames, which allows you to specify effectively and infiinte max-age cache-control header.  All good for
making a good impression on the end user.

 


# Node API server

The documentation suggestion is to create a seperate API server in true microservice style.  The react-scripts support
a special `proxy: ` package.json entry, which allows the dev server to proxy off to another port.

I used foreman to start up both the dev react server and the api express server.  This
works well and makes for an easy dev experience.

In reality, for a project, I would probably serve that static js and html from the same server.

#Conclusions

Its very easy to get started, and takes away the complex configuration normally needed for a nice webpack setup.




