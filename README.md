# exigo

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
