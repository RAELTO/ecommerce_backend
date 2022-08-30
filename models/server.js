const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

//server en clase
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/v1/auth',
            users: '/api/v1/users',
            products: '/api/v1/products',
            roles: '/api/v1/roles',
            inventory: '/api/v1/inventory',
            //types: '/api/v1/types',
        }

        //db connection
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();//dispara el motodo routes
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //Lectura y parseo body
        this.app.use( express.json() );

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));

    }

    routes() {//my routes configuration

        this.app.get('/', (req, res) => {
            res.send('Hello from main endpoint');
        });
        
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.users, require('../routes/users') );
        this.app.use( this.paths.products, require('../routes/product') );
        this.app.use( this.paths.inventory, require('../routes/inventory') );

        this.app.get('*', (req, res) => {
            res.status(404).send(`404 | Endpoint: ${req.url} was not found`);
        });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running in port: ${this.port}`)
        });
    }

}



module.exports = Server;