const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test,    
    
    AllProduct
} = require('../productControler');

//middleware
router.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

router.get('/', test)
router.get('/product/anyproducts', AllProduct);



module.exports = router;