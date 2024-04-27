const Student = require('../models/Students');
const Teacher = require('../models/Teacher');
const Manager = require('../models/Manager');
const Admin = require('../models/Admin');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

//Register a student
const registerStudent = async(req, res) => {
    try {
        const { name, email, contactnumber, username, password } = req.body;

        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };

        if(!email){
            return res.json({
                error: 'Email is required'
            })
        };

        if(!contactnumber){
            return res.json({
                error: 'Phone number is required'
            })
        };

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };        

        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be minimum 6 characters long'
            })
        };

        const existemail = await Student.findOne({email});
        if(existemail){
            return res.json({
                error: 'Email is already in use'
            })
        };

        const existusername = await Student.findOne({username});
        if(existusername){
            return res.json({
                error: 'Username is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);

        const user = await Student.create({
            name,
            email,
            contactnumber,
            username,
            password: hashedPassword
        });

        return res.json({
            user
        })

    } catch (error) {
        console.log(error);
    }
}
    
//Login a student
const loginStudent = async (req, res) => {
    try {
        const { username, password } = req.body;

        const student = await Student.findOne({username});

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        }; 

        if(!password){
            return res.json({
                error: 'Password is required'
            })
        };

        if(!student){
            return res.json({
                error: 'No user found'
            })
        };

        const match = await comparePassword(password, student.password);

        if(match){
            jwt.sign({
                id: student._id
            }, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(student)
            })                
           
        }
        if(!match){
            res.json({
                error: 'Password is incorrect'            
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//froget password student
const forgotPasswordstudent = async (req, res) => {
    try {
        const { username, SecAnswer, newPassword } = req.body;
        if (!username) {
            return res.json({ message: "Username is required" });
        }
        if (!SecAnswer) {
            return res.json({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.json({ message: "New Password is required" });
        }
        //check
        const student = await Student.findOne({ username, SecAnswer });
        //validation
        if (!student) {
            return res.json({
            success: false,
            message: "Wrong username Or security answer",
          });
        }
        const hashed = await hashPassword(newPassword);
        await Student.findByIdAndUpdate(student._id, { password: hashed });
        return res.json({
          success: true,
          message: "Password Reset Successfully",
        });
      } catch (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Something went wrong",
          error,
        });
      }
}

//view profile student
const getProfile = async (req, res) =>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, student)=>{
            if(err) throw err;
            Student.findById({_id:student.id})
            .then(student => res.json(student))
            .catch(err => res.json(err));
        })
    }else{
        res.json(null);
    }        
}

//update get profile student
const getupdateProfile = (req, res) =>{

    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, student)=>{
            if(err) throw err;
            Student.findById({_id:student.id})
            .then(student => res.json(student))
            .catch(err => res.json(err));
        })
    }else{
        res.json(null);
    }       
}

//update profile student
const updateProfile = async(req, res) =>{

    const { token } = req.cookies;  
    
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, student)=>{
            if(err) throw err;            
            
            // const hashedPassword = await hashPassword(pass);
            Student.findByIdAndUpdate({_id:student.id},{
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                contactnumber: req.body.contactnumber,
                username: req.body.username,
                parentname: req.body.parentname,
                parentphonenumber: req.body.parentphonenumber,
                SecAnswer: req.body.SecAnswer
            })
            .then(student => res.json(student))
            .catch(err => res.json(err));
        })
    }else{
        res.json(null);
    }  
}    

//logout
const logout = (req, res) => {
    res.clearCookie('token').json({
        message: 'Logged out successfully'
    })
}

//Register a teacher
const registerTeacher = async(req, res) => {
    try {
        const { name, email, contactnumber, username, password, gender, subject, SecAnswer } = req.body;

        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };        

        const existemail = await Teacher.findOne({email});
        if(existemail){
            return res.json({
                error: 'Email is already in use'
            })
        };

        const existusername = await Teacher.findOne({username});
        if(existusername){
            return res.json({
                error: 'Username is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);

        const user = await Teacher.create({
            name,
            email,
            contactnumber,
            username,
            password: hashedPassword,
            gender,           
            subject,
            SecAnswer
        });

        return res.json({
            user
        })

    } catch (error) {
        console.log(error);
    }
}    

//Login a teacher
const loginTeacher = async (req, res) => {
    try {
        const { username, password } = req.body;

        const teacher = await Teacher.findOne({username});

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        }; 

        if(!password){
            return res.json({
                error: 'Password is required'
            })
        };

        if(!teacher){
            return res.json({
                error: 'No user found'
            })
        };

        const match = await comparePassword(password, teacher.password);

        if(match){
            jwt.sign({
                id: teacher._id                
            }, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(teacher)
            })                
           
        }
        if(!match){
            res.json({
                error: 'Password is incorrect'            
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//froget password teacher
const forgotPasswordteacher = async (req, res) => {
    try {
        const { username, SecAnswer, newPassword } = req.body;
        if (!username) {
            return res.json({ message: "Username is required" });
        }
        if (!SecAnswer) {
            return res.json({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.json({ message: "New Password is required" });
        }
        //check
        const teacher = await Teacher.findOne({ username, SecAnswer });
        //validation
        if (!teacher) {
            return res.json({
            success: false,
            message: "Wrong username Or security answer",
          });
        }
        const hashed = await hashPassword(newPassword);
        await Teacher.findByIdAndUpdate(teacher._id, { password: hashed });
        return res.json({
          success: true,
          message: "Password Reset Successfully",
        });
      } catch (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Something went wrong",
          error,
        });
      }
}    

//view profile teacher
const getTeacherProfile = async (req, res) =>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, teacher)=>{
            if(err) throw err;
            Teacher.findById({_id:teacher.id})
            .then(teacher => res.json(teacher))
            .catch(err => res.json(err));
        })
    }else{
        res.json(null);
    }        
}

//update get profile teacher
const getteacherupdateProfile = (req, res) =>{

    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, teacher)=>{
            if(err) throw err;
            Teacher.findById({_id:teacher.id})
            .then(teacher => res.json(teacher))
            .catch(err => res.json(err));
        })
    }else{
        res.json(null);
    }       
}

//update profile teacher
const updateteacherProfile = async(req, res) =>{

    const { token } = req.cookies;  
    
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, teacher)=>{
            if(err) throw err;            
            
            // const hashedPassword = await hashPassword(pass);
            Teacher.findByIdAndUpdate({_id:teacher.id},{
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                contactnumber: req.body.contactnumber,
                username: req.body.username,
                subject: req.body.subject,                
                SecAnswer: req.body.SecAnswer
            })
            .then(teacher => res.json(teacher))
            .catch(err => res.json(err));
        })
    }else{
        res.json(null);
    }  
}   

//Register a manager
const registerManager = async(req, res) => {
    try {
        const { name, email, contactnumber, username, password, SecAnswer } = req.body;

        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };

        if(!email){
            return res.json({
                error: 'Email is required'
            })
        };

        if(!contactnumber){
            return res.json({
                error: 'Phone number is required'
            })
        };

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };      
        
        if(!SecAnswer){
            return res.json({
                error: 'Security answer is required'
            })
        };    

        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be minimum 6 characters long'
            })
        };

        const existemail = await Manager.findOne({email});
        if(existemail){
            return res.json({
                error: 'Email is already in use'
            })
        };

        const existusername = await Manager.findOne({username});
        if(existusername){
            return res.json({
                error: 'Username is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);

        const manager = await Manager.create({
            name,
            email,
            contactnumber,
            username,
            password: hashedPassword,
            SecAnswer
        });

        return res.json({
            manager
        })

    } catch (error) {
        console.log(error);
    }
}

//Login a manager
const loginManager = async (req, res) => {
    try {
        const { username, password } = req.body;

        const manager = await Manager.findOne({username});

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        }; 

        if(!password){
            return res.json({
                error: 'Password is required'
            })
        };

        if(!manager){
            return res.json({
                error: 'No user found'
            })
        };

        const match = await comparePassword(password, manager.password);

        if(match){
            jwt.sign({
                id: manager._id
            }, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(manager)
            })                
           
        }
        if(!match){
            res.json({
                error: 'Password is incorrect'            
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//froget password manager
const forgotPasswordmanager = async (req, res) => {
    try {
        const { username, SecAnswer, newPassword } = req.body;
        if (!username) {
            return res.json({ message: "Username is required" });
        }
        if (!SecAnswer) {
            return res.json({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.json({ message: "New Password is required" });
        }
        //check
        const manager = await Manager.findOne({ username, SecAnswer });
        //validation
        if (!manager) {
            return res.json({
            success: false,
            message: "Wrong username Or security answer",
          });
        }
        const hashed = await hashPassword(newPassword);
        await Manager.findByIdAndUpdate(manager._id, { password: hashed });
        return res.json({
          success: true,
          message: "Password Reset Successfully",
        });
      } catch (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Something went wrong",
          error,
        });
      }
}

//view profile manager
const getManagerProfile = async (req, res) =>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, manager)=>{
            if(err) throw err;
            Manager.findById({_id:manager.id})
            .then(manager => res.json(manager))
            .catch(err => res.json(err));
        })
    }else{
        res.json(null);
    }        
}

//Register a admin
const registerAdmin = async(req, res) => {
    try {
        const { name, email, contactnumber, username, password, SecAnswer } = req.body;

        if(!name){
            return res.json({
                error: 'Name is required'
            })
        };

        if(!email){
            return res.json({
                error: 'Email is required'
            })
        };

        if(!contactnumber){
            return res.json({
                error: 'Phone number is required'
            })
        };

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        };      
        
        if(!SecAnswer){
            return res.json({
                error: 'Security answer is required'
            })
        };    

        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be minimum 6 characters long'
            })
        };

        const existemail = await Admin.findOne({email});
        if(existemail){
            return res.json({
                error: 'Email is already in use'
            })
        };

        const existusername = await Admin.findOne({username});
        if(existusername){
            return res.json({
                error: 'Username is already in use'
            })
        };

        const hashedPassword = await hashPassword(password);

        const admin = await Admin.create({
            name,
            email,
            contactnumber,
            username,
            password: hashedPassword,
            SecAnswer
        });

        return res.json({
            admin
        })

    } catch (error) {
        console.log(error);
    }
}

//Login a admin
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({username});

        if(!username){
            return res.json({
                error: 'Username is required'
            })
        }; 

        if(!password){
            return res.json({
                error: 'Password is required'
            })
        };

        if(!admin){
            return res.json({
                error: 'No user found'
            })
        };

        const match = await comparePassword(password, admin.password);

        if(match){
            jwt.sign({
                id: admin._id
            }, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(admin)
            })                
           
        }
        if(!match){
            res.json({
                error: 'Password is incorrect'            
            })
        }
    } catch (error) {
        console.log(error);
    }
}

//froget password admin
const forgotPasswordadmin = async (req, res) => {
    try {
        const { username, SecAnswer, newPassword } = req.body;
        if (!username) {
            return res.json({ message: "Username is required" });
        }
        if (!SecAnswer) {
            return res.json({ message: "Answer is required" });
        }
        if (!newPassword) {
            return res.json({ message: "New Password is required" });
        }
        //check
        const admin = await Admin.findOne({ username, SecAnswer });
        //validation
        if (!admin) {
            return res.json({
            success: false,
            message: "Wrong username Or security answer",
          });
        }
        const hashed = await hashPassword(newPassword);
        await Admin.findByIdAndUpdate(admin._id, { password: hashed });
        return res.json({
          success: true,
          message: "Password Reset Successfully",
        });
      } catch (error) {
        console.log(error);
        return res.json({
          success: false,
          message: "Something went wrong",
          error,
        });
      }
}

//view profile manager
const getAdminProfile = async (req, res) =>{
    const { token } = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, admin)=>{
            if(err) throw err;
            Admin.findById({_id:admin.id})
            .then(admin => res.json(admin))
            .catch(err => res.json(err));
        })
    }else{
        res.json(null);
    }        
}

module.exports = {
    test,
    registerStudent,
    loginStudent,
    forgotPasswordstudent,
    getProfile,
    getupdateProfile,
    updateProfile,
    registerTeacher,
    loginTeacher,
    forgotPasswordteacher,
    getTeacherProfile,
    getteacherupdateProfile,
    updateteacherProfile,
    registerManager,
    loginManager,
    forgotPasswordmanager,
    getManagerProfile,
    registerAdmin,
    loginAdmin,
    forgotPasswordadmin,
    getAdminProfile,
    logout
}