## Available Scripts

In the project directory, you can run:

### `npm install`

Runs instalation of dependencies.\


### `Configuration`
 
Go to the .env file, and modify the DB_USER DB_PASSWORD variables for the local postgreSQL enviroment, then create a new dataBase `cTech`.


### `npm start`

Runs the app in the development mode.\

The page will reload when you make changes.\
You may also see any lint errors in the console.


### `Usage`

Create a new user on `/api/usuario/register`, and then log in on `/api/usuario/login` for a jwsToken that has to be included in the header (as `token`) of every petition that is not metioned before. By default, the server will be mounted on `http:\\localhost:3001`.
