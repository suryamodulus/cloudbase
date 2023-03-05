# Cloudbase

## Description

Simple way to deploy and monitor applications and databases on your cloud

## Problem Statement

As developers, when we want to quickly deploy something online - we use managed cloud services like railway.app
or spend 2-3 hours setting up our own service on cloud platform such as Digitalocean. Even when working with docker containers the issue remains - Spin-up server, intall docker, create docker-compose file, Run commands, Monitor logs etch. Not only that, most times our server resources are under untilized and we end up paying more than we should be.

## Our solution

To solve above mentioned issues, we are building an All-in-one application management platform for developers.
## How it works - (Current scope)

- Install Cloudbase on your server
- Go to the Web UI - Pending
- Create a project
- Add Service to project
- Configuration
    - Configure resources (CPU, RAM)
    - Add ENV variables
    - Custom domains - Pending
- See Logs - Pending
- Update Configuration - Pending
- Restart Service
- Delete Service

## Project Stages
- Intial Stage : Project was built from scratch
- Current Stage : API is 60% done, UI Pending

## Pre-Requisites

- NodeJS v16+
- Redis (Remove dependency in future)
- Docker
- Caddy

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# build
$ yarn build

# production mode
$ yarn start:prod
```

## License

Cloudbase is [MIT licensed](LICENSE).
