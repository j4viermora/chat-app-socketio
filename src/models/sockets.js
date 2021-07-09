const { comprobarJWT }     = require( '../helpers/generateJWT' );
const { usuarioConectado,
  usuarioDesconectado,
  getUsuarios,
  grabarMensaje } = require( '../controllers/socket' );

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

            console.log( 'Client no identify' );
            return socket.disconnect();

          }

          await usuarioConectado( uid );

          socket.join( uid );

           
           this.io.emit( 'lista-usuario', await getUsuarios() )

           socket.on( 'mensaje-personal', async( payload ) => {
           
            const mensaje = await grabarMensaje( payload );

            this.io.to( payload.to ).emit( 'mensaje-personal', mensaje );
            this.io.to( payload.from ).emit( 'mensaje-personal', mensaje );

            });
          
          socket.on( 'disconnect', async() => {
            await usuarioDesconectado( uid )
            this.io.emit( 'lista-usuarios', await getUsuarios() )
          } )
            
        
        });
    }


}


module.exports = Sockets;