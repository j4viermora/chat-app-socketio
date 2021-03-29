// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require( 'cors' )

const Sockets  = require('./sockets');
const { dbConnection } =require('../database/config');

class Server {

    constructor() {

        //Conexión a base de datos

        dbConnection();

        this.app  = express();
        this.port = process.env.PORT;

        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        //Habilitar cors

        this.app.use( cors() );

        //parser body 

        this.app.use( express.json() );

        //Api end points

        this.app.use( '/api/login', require( '../routers/auth' ) );
        this.app.use( '/api/messages', require( '../routers/menssages' ) );

    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}


module.exports = Server;