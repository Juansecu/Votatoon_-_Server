# Votatoon API

<!--[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Open-source web API for Votatoon client.

## Requirements

### Environment variables

In order for setting up the Votatoon API, you will need to set up the following environment variables:

- **DATABASE_HOST -** The host where the database server is running
- **DATABASE_NAME -** The name of the database to connect to
- **DATABASE_PASSWORD -** The password of the user who owns the database
- **DATABASE_PORT -** The port where the database server is running
- **DATABASE_SYNCHRONIZE -** Whether the database should be synchronized with the entities. Set to `1` for development and first set up of the application, and `0` for production
- **DATABASE_USERNAME -** The name of the user who owns the database
- **INIT_VECTOR -** The initial vector that is used to encrypt/decrypt IP addresses from the clients
- **SECURITY_KEY -** The security key that is used to encrypt/decrypt IP addresses from the clients

**Note:** You can generate values for `INIT_VECTOR` and `SECURITY_KEY` environment variables by using online tools like **[All Keys Generator](https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx)** (both `INIT_VECTOR` and `SECURITY_KEY` must be 512-bit and not hex). Once you set the values of the environment variables, you will need to create another session in your terminal in order to allow the application to access the new environment variables.

Note that you must set up the environment variables by setting them for your Operating System internal use.

#### Setting environment variables in your Operating System

- **Windows:**

  1. Open `Settings > System > About > Advanced system settings > Environment Variables`.
  2. Now, you can decide whether defining environment variables for specific users or for the entire Operating System. My personal suggestion is to define them for specific users.
  3. Click `New...` button.
  4. Type variable name and value.

  You have to follow steps **3** and **4** per environment variable.

- **Linux:**

  Before starting, you must know that you can use the `export` command to set environment variables on Linux, but they may not be available after you leave your current session, so maybe you will want to set the environment variables using `.(bash/zsh)_profile` file.

  1. In order to set the environment variables, you have to use the `export` command followed by the key-value pair (like `.env` files). F.E To set `DATABASE_NAME` environment variable, you must use the command `export DATABASE_NAME={{Database name}}` _(without `{{}}`)_.
  2. If you used `.(bash/zsh)_profile` to set the environment variables, you have to use the command `source path/to/profile/file/.(bash/zsh)_profile`, so your current session in the terminal will be updated with the new set environment variables.

  For more information about setting environment variables on Linux, you can check out [this tutorial](https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-set-environment-variables-in-linux/).

### Available port

This application needs port **3000** by default for running on, but if you want to use a different port, you can set it by setting the environment variable `PORT`.

Note that this behavior allows you to deploy your own instance using a VPS/PaaS like Heroku or Digital Ocean.

## Installation

```bash
# development
$ npm install

# production mode
$ npm install --prod
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is [MIT licensed](LICENSE).
