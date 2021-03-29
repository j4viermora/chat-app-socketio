

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

          //TODO validad jwt
          // si el token no es valido desconectar


          //TODO saber que usuario esta activo mediane el uid del token

          //TODO emitir tods los usuario conectados 

          //TODO socket join 

          //TODO escuchar cuando un cliente manda un mensaje

          //TODO disconnect 
          //marcar en la base de datos que el usuario se desconecto 

            
        
        });
    }


}


module.exports = Sockets;