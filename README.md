# Full Stack Open 2021

This repository contains my assignment submissions for Helsinki University Full Stack Open 2021 ([https://fullstackopen.com/en/](https://fullstackopen.com/en/)).

## Working with Heroku inside a git repository

Heroku uses git repositories to manage deployment but since we have multiple seperate projects in this repository utilizing Heroku we need to do some tricks to make it work.

First add heroku as a Git remote:

    npx heroku git:remote -a <heroku-app>


Then from the top level of the working tree:

    git subtree push --prefix <path-to-heroku-app> heroku master

This command will only push the defined subtree to heroku while allowing us the freedom to seperate the repository in multiple project folders.
