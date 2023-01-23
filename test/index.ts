import { Pool } from 'pg';
import { select } from '../src';

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  port: 5432,
  database: 'node_test',
  host: 'localhost',
});

// TODO: Execute via Execute function
pool
  .query(select().from('person').getQuery())
  .then((result) => console.log(result.rows))
  .catch((err: any) => console.error(err));
