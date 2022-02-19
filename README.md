# Full Stack Open 2021

This repository contains my assignment submissions for Helsinki University Full Stack Open 2021 ([https://fullstackopen.com/en/](https://fullstackopen.com/en/)).

The course is an introductory course on Modern JavaScript-based Web Development. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js.

The course also contains a section on GraphQL, a modern alternative to REST APIs.

## Parts

#### [Part 0 - Fundamentals of Web apps](./part0)

#### [Part 1 - Introduction to React](./part1)

#### [Part 2 - Communicating with server](./part2)

#### [Part 3 - Programming a server with NodeJS and Express](./part3)

#### [Part 4 - Testing Express servers, user administration](./part4)

#### [Part 5 - Testing React apps](./part5)

#### [Part 6 - State management with Redux](./part6)

#### [Part 7 - React router, custom hooks, styling app with CSS and webpack](./part7)

## Working with Heroku inside a git repository

Heroku uses git repositories to manage deployment but since we have multiple seperate projects in this repository utilizing Heroku we need to do some tricks to make it work.

First add heroku as a Git remote:

    npx heroku git:remote -a <heroku-app>


Then from the top level of the working tree:

    git subtree push --prefix <path-to-heroku-app> heroku master

This command will only push the defined subtree to heroku while allowing us the freedom to seperate the repository in multiple project folders.
