const { response } = require("express");
const   Usuario    = require("../models/users");


const createUser =  async( req, res = response) => {

  
    try{

        const { email, password } = req.body;
        //verificar en base de datos que el email existe
        const beEmail = await Usuario.findOne( { email } );
        if( beEmail ){
            return  res.status(400).json({
                status: false,
                msg:"Algo anda mal"
            })
        }

        //encriptar contraseña

        //guardar en base de datos 

        const usuario = new Usuario( req.body );
        await usuario.save();

        res.json({
            usuario
        })
       

    }catch(err){
        console.log(err)
        res.status(500).json({
            status: false,
            msg: 'talk to admin'
        })
    }

}

const login =  async(req, res ) => {
    
    const body = req.body

    res.json({
        status:true,
        msg:"login",
        body
    })
}


const renewToken = async (req, res) => {
    res.status( 200 ).json({
        status: true,
        msg: 'token'
    })
}




module.exports = {
    createUser,
    login,
    renewToken
}