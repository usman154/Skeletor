# SKELETOR

Skeletor is a versatile Node.js boilerplate for building backend applications. It provides a solid foundation for projects that require support for both SQL and NoSQL databases.

## Getting Started

1. **Modules**: Add your application modules under the [modules](https://github.com/usman154/Skeletor/tree/master/app/modules) directory. Each module should contain routes, controllers, and services.

2. **Routes**: Define your API routes inside the `routes` folder. Ensure that each route file has a `.route.js` extension so that Skeletor can automatically register them with the Express framework.

3. **Controllers**: Controllers should be added under the `controllers` directory within each module. These controllers handle the request/response logic for each route.

4. **Services**: Business logic and code to interact with databases or external resources should be placed under the `services` directory within each module.

**Note:** You can refer to existing modules [here](https://github.com/usman154/Skeletor/tree/master/app/modules) for guidance on structuring your modules.

## Environment Configuration

The `.env` file is the heart of the application. Add your environment variables in this file to configure database connections and other system resources.

## Usage

To start the application, follow these steps:

1. Install dependencies:

    ```bash
    npm install
    ```

2. Run the application in development mode:

    ```bash
    npm run start:dev
    ```

Skeletor also supports PM2, a process manager for Node.js applications. You can configure PM2 based on the specific needs of your project.

## Support

If you have any questions or need assistance, feel free to reach out:

**Muhammad Usman**  
Email: [m.usmanrana154@gmail.com](mailto:m.usmanrana154@gmail.com)
