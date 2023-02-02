import { merge } from 'lodash';

// set ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// set the stage
const stage = process.env.STAGE || 'local';

let envConfig = {};

if (stage == 'production') {
  envConfig = require('./prod').default;
} else if (stage == 'staging') {
  envConfig = require('./staging').default;
} else {
  envConfig = require('./dev').default;
}

const defaultConfig = merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 8080,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);

export default defaultConfig;
