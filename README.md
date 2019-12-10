# exigo

[![Build Status](https://img.shields.io/travis/com/kripod/exigo)](https://travis-ci.com/kripod/react-hooks)
[![Netlify Status](https://img.shields.io/netlify/600a0c99-a3c4-4791-b3c1-7ee66485ed44)](https://app.netlify.com/sites/exigo/deploys)

## Development process

### Prequisites

- [Node.js](https://nodejs.org/) ≥10
- [Yarn](https://yarnpkg.com/) ≥1

### Workflow

1. Clone a fork of the `master` branch and install all the required dependencies with `yarn`
1. Initialize the development database as follows:
   ```sh
   cd server
   yarn db:init
   yarn db:seed
   ```
1. Execute `yarn develop` from the project's root directory
