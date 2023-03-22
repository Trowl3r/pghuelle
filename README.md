# PG Huelle

### What is this Project about?
PG Huelle is a project, to work with postgresql databases without the need to write real SQL commands via a function based approach. Everything you can do with normal SQL in a postgres environment can be done with PG Huelle aswell. 

## Installation
For now PG Huelle is only available via GitHub cloning. If you want to test this Repository, use the test folder and write you're own tests. When the Project is in an acceptable state, it will be published to the NPM registry and can be used as a normal package.

## Example
The Example will be held, as we import this from the npm registry  
To give a quick example, how things work in PG Huelle, we will use a quick query example. The installation script can be found under `src/test/testdb.sql`. In simple terms it creates a Table Person consisting of an `ID` as the `PK`, a `Name` and an `Age`. 

```js
const PGHuelle = require('pghuelle').PGHuelle;

const config = {
  user: 'postgres',
  password: 'root',
  port: 5432,
  database: '<your_database>',
  host: 'localhost',
};

const db = new PGHuelle(config);

db.select().from('person').execute();

```

First we import our PHuelle class, and create a config object to connect to the Database. Then we create an instance of a PGHuelle class and give it our config object. With `db.select().from('person').execute();` we query every person in our persons table, and execute the query. This function then returns a `Promise` with our result. 