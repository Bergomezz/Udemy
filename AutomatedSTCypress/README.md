# Testes _end-to-end_ com Cypress

Sample project to demonstrate tests written with Cypress with 3 Frameworks (App Actions, Page Objects, Cucumber) + Typescript, Docker and running on a CI service.

## Pre-requirements

To run this project, you will need:

- [git](https://git-scm.com/downloads) (I've used version `2.34.0` while writing this doc)
- [nodejs](https://nodejs.org/en/) (I've used version `16.13.0` while writing this doc)
- [NPM] (I've used version `8.1.4` while writing this doc)
- [Google Chrome](https://www.google.com/intl/en_us/chrome/) (I've used version `100.0.4896.88` while writing this doc)

**Note:** When installing nodejs, NPM is automatically installed too.

## Installation

To install the dev dependencies, run `npm install` (or `npm i` for short.)

## Configuring the environment variables

Before running the tests, some environment variables need to be set up.

Make a copy of the [`cypress.env.example.json`](./cypress.env.example.json) file as `cypress.env.json`, and set the appropriate values for all the variables.

**Note:** `cypress.env.json` file is not tracked by git.

## Code formatter check

Run `npm run prettier:check`

## Executer the code formatter fixer

Run `npm run prettier`

## Running the tests

In this project, you can run tests in interactive and headless modes, and on desktop and tablet viewports.

### Headless mode

Run `npm test` (or `npm t` for short) to run all tests in headless mode using a desktop viewport.

### Interactive mode

Run `npm run open` to open the Cypress Test Runner to run tests in interactive mode using a desktop viewport.

---

Made with ❤️ by [Bernardo Gomes](https://github.com/Bergomezz).
