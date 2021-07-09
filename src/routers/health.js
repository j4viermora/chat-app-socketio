const { Router,response } = require('express');


const router = Router();

router.get( '/', ( req, res = response  ) => {
    res.status(200).json({
        status: "ok",
        msg:"server running ok",
    })
} );



module.exports = router