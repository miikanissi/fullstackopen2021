# Full Stack Open 2021

This repository contains my assignment submissions for Helsinki University Full Stack Open 2021 ([https://fullstackopen.com/en/](https://fullstackopen.com/en/)).

The course is on Modern JavaScript-based Web Development. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js.

The course also contains additional sections for the following:
  - GraphQL, a modern alternative to REST APIs.
  - TypeScript, an open-source typed superset of JavaScript that compiles to plain JavaScript.
  - React Native, an open-source UI software framework to create native mobile applications using JavaScript.
  - CI/CD, Continuous integration (CI) and continuous delivery (CD)
  - Docker Containers, an open platform for developing, shipping, and running applications by virtualizing the operating system of the computer on which it is installed and running.

## Parts

#### [Part 0 - Fundamentals of Web apps](./part0)

#### [Part 1 - Introduction to React](./part1)

#### [Part 2 - Communicating with server](./part2)

#### [Part 3 - Programming a server with NodeJS and Express](./part3)

#### [Part 4 - Testing Express servers, user administration](./part4)

#### [Part 5 - Testing React apps](./part5)

#### [Part 6 - State management with Redux](./part6)

#### [Part 7 - React router, custom hooks, styling app with CSS and webpack](./part7)

#### [Part 8 - GraphQL](./part8)

#### [Part 9 - TypeScript](./part9)

#### [Part 10 - React Native](./part10)

#### [Part 11 - CI/CD](./part11)

#### [Part 12 - Containers](./part12)

## Working with Heroku inside a git repository

Heroku uses git repositories to manage deployment but since we have multiple seperate projects in this repository utilizing Heroku we need to do some tricks to make it work.

First add heroku as a Git remote:

    npx heroku git:remote -a <heroku-app>


Then from the top level of the working tree:

    git subtree push --prefix <path-to-heroku-app> heroku master

This command will only push the defined subtree to heroku while allowing us the freedom to seperate the repository in multiple project folders.

## Course Certificates

<p align="center"><img height="60%" width="100%" src="./certificates/certificate-fullstack.png" alt="FullStack Certificate"></p>
<p align="center"><img height="60%" width="100%" src="./certificates/certificate-graphql.png" alt="GraphQL Certificate"></p>
<p align="center"><img height="60%" width="100%" src="./certificates/certificate-typescript.png" alt="TypeScript Certificate"></p>
<p align="center"><img height="60%" width="100%" src="./certificates/certificate-reactnative.png" alt="React Native Certificate"></p>
<p align="center"><img height="60%" width="100%" src="./certificates/certificate-cicd.png" alt="CI/CD Certificate"></p>
<p align="center"><img height="60%" width="100%" src="./certificates/certificate-containers.png" alt="Docker Containers Certificate"></p>
