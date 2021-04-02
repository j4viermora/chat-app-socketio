const { response } = require("express");
const   Usuario    = require("../models/users");
const   bcrypt     = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");

const createUser =  async( req, res = response) => {

  
    try{

        const { email, password } = req.body;
        //verificar en base de datos que el email existe
        const beEmail = await Usuario.findOne( { email } );
        if( beEmail ){
            return  res.status(400).json({
                status: false,
                msg:"Something is wrong"
            })
        }

        const usuario = new Usuario( req.body );
        //encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //guardar en base de datos 
        await usuario.save();
        
        //Generar JWT
        const token = await generateJWT( usuario.id );


        res.json({
            status: true,
            usuario,
            token
        })
       

    }catch(err){
        console.log(err)
        res.status(500).json({
            status: false,
            msg: 'talk to admin'
        })
    }

}

const login =  async (req = require, res = response ) => {
    
    const { email, password } = req.body

    try{

        // verificando correo electronico
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status( 404 ).json({
                   status: false,
                   msg: "Algunos datos incorrectos"
                });
        }

        //validad el password

        const validatePassword = bcrypt.compareSync( password, usuarioDB.password );

        if( !validatePassword ){
            return res.status( 404 ).json({
                ok: false,
                msg: 'Algunos datos ingresados son incorrectos'
            })
        }

        //Generar JWT

        const token = await generateJWT( usuarioDB.id );

        res.status( 200 ).json({
            status: true,
            usuarioDB,
            token
        })


    }catch(err){
        console.log(err)
        res.status( 500 ).json({
            status: false,
            msg:'Algo anda mal intente en breve'
        });

    }
}


const renewToken = async (req, res) => {
    

    const uid = req.uid;

    const token = await generateJWT( uid );

    const usuario = await Usuario.findById( uid );


    res.status( 200 ).json({
        status: true,
        usuario,
        token,
    })
};




module.exports = {
    createUser,
    login,
    renewToken
}