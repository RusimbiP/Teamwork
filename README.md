[![Build Status](https://travis-ci.org/RusimbiP/Teamwork.svg?branch=develop)](https://travis-ci.org/RusimbiP/Teamwork)
[![Coverage Status](https://coveralls.io/repos/github/RusimbiP/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/RusimbiP/Teamwork?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/e686f5d47b07d0b89953/maintainability)](https://codeclimate.com/github/RusimbiP/Teamwork/maintainability)
# Teamwork
## TOOLS USED


- **JavaScript** - Programming Language

- **NodeJS** - Server Environment

- **Mocha and Chai** - Test Framework And Assertion Library

- **Travis-CI** - Continuous Integration Testing

- **Coveralls** - Continuous Integration Test Coverage

- **Code Climate** - Continuous Integration Code Quality

- **Heroku** - Deployment. [Visit The App](https://tmwork.herokuapp.com/)

- **GIT** - Version Control System

- **GitHub Pages** - Front-End UI Hosting. [Visit The App](https://rusimbip.github.io/Teamwork/UI)

## GETTING STARTED

### Clone The Project

```
$ git clone https://github.com/RusimbiP/Teamwork.git

### Install Required Dependencies

```
$ npm install
```

### Create A .env File In The Project Folder And Save The Following Credentials Inside

```
$ SECRET = "xxxxxxxxxxx"
```

### Start The Server

```
$ npm start
```

### Run Tests

```
$ npm test
```

## API ENDPOINT ROUTES


`POST  | api/v1/auth/signup | User Registration | Public `
`POST  | api/v1/auth/login  | User Login | Public `
`POST  | api/v1/articles | Publish an article | Private `
`GET  | api/v1/articles/feed | Retrieve published articles | Private `
`GET  | api/v1/articles/:articleId  | Retrieve A Specific published article | Private `
`DELETE  | api/v1/articles/:articleId  | Delete A Specific published article | Private `
`PATCH  | api/v1/articles/:articleId  | Edit A Specific published article | Private `
`POST   | api/v1/articles/:articleId/comments | comment on  A Specific published article| Private `


## DEVELOPER

Rusimbi Patrick

## COPYRIGHT

&copy; 2019 Rusimbi Patrick
