# SKELETOR

This project can be used a boilerplate for Nodejs backend. The edge point of this boilerplate is that, it supports both SQL and NoSql databases. 

Add your modules under [module](https://github.com/usman154/Skeletor/tree/master/app/modules). 

Routes will be added inside `routes` folder. Note: Make sure to end the route file with `.route.js` so that Skelator could find the files and register the routes with `express` framework.

Controllers should be added under `controllers` directory inside modules
Services ( the business logic and the code to read/write local/remote repositories) should be added under `services` directory

**Note:** Refer to any existing module [here](https://github.com/usman154/Skeletor/tree/master/app/modules). 

The heart of this application is the environment file `.env`. Please add the keys in that file so application could connect with the database and use other system resources.

To start the application:

**npm install**

**npm run start:dev**

*this project also supports pm2, which can be configured based on the need of the project.*

For any further queries, I am only one mail away [Muhammad Usman](mailto:m.usmanrana154@gmail.com)
