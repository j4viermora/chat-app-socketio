const Usuario = require( '../models/users' )

const manejadorDeConexion = async( uid, status ) => {

	const usuario = await Usuario.findById( uid );
	usuario.online = status;
	await usuario.save();

	return usuario;

}



module.exports = {
	manejadorDeConexion
}