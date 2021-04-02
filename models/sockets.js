const { comprobarJWT }     = require( '../helpers/generateJWT' );
const { manejadorDeConexion } = require( '../controllers/socket' );

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {


          

          //TODO validad jwt
        
          const token = ( socket.handshake.query['x-token']);
          const [ valide, uid ] = comprobarJWT( token );
          
          if( !valide ){

            console.log( 'cliente no identificado' );
            return socket.disconnect();

          }

           await manejadorDeConexion( uid, true );


          // si el token no es valido desconectar


          //TODO saber que usuario esta activo mediane el uid del token

          //TODO emitir tods los usuario conectados 

          //TODO socket join 

          //TODO escuchar cuando un cliente manda un mensaje

          //TODO disconnect 
          
          socket.on( 'disconnect', async() => {
            await manejadorDeConexion( uid, false )
          } )

          //marcar en la base de datos que el usuario se desconecto 

            
        
        });
    }


}


module.exports = Sockets;