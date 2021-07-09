const Mensajes = require( '../models/message' );

const getMessages = async ( req , res ) => {

    const myId = req.uid;
    const msgsFrom = req.params.id
    
    const last30 = await Mensajes.find({
        $or: [
            { from: myId, to: msgsFrom },
            { from: msgsFrom, to: myId }
        ]
    })
    .sort({ createdAt: 'desc' })
    .limit( 50 );


    res.json({
        status: true,
        last30
    })

};


module.exports = getMessages;