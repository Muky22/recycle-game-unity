import * as dotenv from 'dotenv';
import { SQL } from '../src/classes/SQL';

dotenv.config();

const run = async () => {
  console.log('Connecting to DB ..');
  SQL.getInstance();
  console.log('Droping DB ..');
  await SQL.knex.raw('DROP DATABASE ' + process.env.MYSQL_DATABASE);
  console.log('Creating DB ..');
  await SQL.knex.raw('CREATE DATABASE ' + process.env.MYSQL_DATABASE);
  console.log('Done');
  process.exit(0);
};

run();
