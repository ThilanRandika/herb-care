const Staff = require("../../models/staff/staff");

const router = require("express").Router();

router.route('/add').post( async(req, res) => {
    try{
        const { username, password, name, email } = req.body;

        const newStaff = new Staff({
            username,
            password,
            name,
            email,
        });

        const savedStaff = await newStaff.save();

        res.status(200).json(savedStaff);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;
