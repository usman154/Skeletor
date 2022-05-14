import fs from 'fs';
import  path from 'path';
const swaggerJSDoc = require('swagger-jsdoc');
import AppSetting from './app.setting';
const packagePath = '../../package.json';
const { version, description } = require(packagePath);

class ApiDoc {

    constructor() {
    }

    getDefination() {
        return {
            swagger: '2.0',
            info: {
              title: AppSetting.getConfig().APP.NAME,
              version: version,
              description: description,
              'x-logo': {
                url: 'https://www.aiondigital.com/wp-content/uploads/2018/07/Aion_white-1024x241.png',
                altText:  AppSetting.getConfig().APP.NAME
              },
              contact: {
                name: 'AION SUPPORT',
                url: 'https://www.aiondigital.com/support',
                email: 'faizan@aiondigital.com'
              },
              host: '#',
              basePath: AppSetting.getConfig().APP.BASE_PATH
            },
            securityDefinitions: {
              APP_SECRET: {
                type: 'apiKey',
                in: 'header',
                name: 'APP_SECRET'
              }
            },
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json']
          };
    }
    publish(app) {
      const fileContent = this.fileContent();
      // const filePath = this.filePath('/public/api.docs.json');
      fs.writeFileSync('public/api.docs.json', fileContent); 
      app.get('/docs',function(req,res) {
        res.sendFile('index.html');
      });
      
    }
    filePath(file) {
      const _path = AppSetting.isProduction() ? '../..' : '..';
      return path.resolve(__dirname,_path + file);
    }
    fileContent() {
      const docsDefination = this.getDefination();
      const content = swaggerJSDoc({
        swaggerDefinition: docsDefination,
          apis: ['./docs/**/*.yaml']
      });
      return JSON.stringify(content, null, 2);
    }
}

export default new ApiDoc();