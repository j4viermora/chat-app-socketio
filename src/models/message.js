const { Schema, model } = require( 'mongoose' );


const messagesSchema =  Schema({

    from:{
        type: Schema.Types.ObjectId,
        ref: 'UserChat',
        required: true
    },

    to:{
        type: Schema.Types.ObjectId,
        ref: 'UserChat',
        required: true,
    },

    message:{
        type: String,
        required: true,
    },

}, { 
    timestamps: true
 });

messagesSchema.method( 'toJson', function(){

    const { __v, ...object  } = this.toObject();  
    return object;

} );


module.exports = model( 'Message', messagesSchema );