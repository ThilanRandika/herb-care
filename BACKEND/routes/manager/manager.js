const Manager = require("../../models/manager/manager");


const router = require("express").Router();

router.route('/add').post( async(req, res) => {
    try{
        const { username, password, name, email } = req.body;

        const newManager = new Manager({
            username,
            password,
            name,
            email,
        });

        const savedManager = await newManager.save();

        res.status(200).json(savedManager);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;
