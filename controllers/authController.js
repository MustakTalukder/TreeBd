const User = require("../models/User");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler')
const transporter  =require('../nodemailer')
const welcomeTemplate = require('../emailTemplate/WelcomeTemplate')
const verificationTemplate = require('../emailTemplate/VerificationTemplate')
const ResetTemplate = require('../emailTemplate/ResetTemplate')



exports.signup = (req, res) => {

    const user = new User(req.body);

    user.activateToken = jwt.sign({ _id: user._id, name: user.name, email: user.email, password: user.password }, 'process.env.SECRET', { expiresIn: '1d' }) 

    user.save( async (err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }

        // Mail verificatio

        let activateLink = `http://localhost:3000/activateaccount/${user._id}?token=${user.activateToken}`
        
        let template = verificationTemplate({
            name: user.name,
            link: activateLink
        })



        await transporter.sendMail({
            from: "TreeBd@gmail.com",
            to: user.email,
            subject: "TreeBd||Please Verify your account",
            html: template
        });
        

    


        // user.salt = undefined
        // user.hashed_password = undefined

        res.json({
             user
         });
    })
 
}



exports.signin = (req, res) => {

    // find the user based on email

    const { email, password } = req.body
    
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }


        // if user is found make sure the email and password match
        //create authenticate method is user model

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            })
        }

        // Generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        
        // Persist the token as 't' in cookie with expiry date

        res.cookie('t', token, { expire: new Date() + 9999 })
        
        // return response with user and token to frontend client

        const { _id, name, email, role } = user 
        return res.json({
            token,
            user: {
                _id,
                email,
                name,
                role
            }
        });
     })
}


exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({
        message: "Signout Success"
    })
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})



exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        })
    }

    next();
}


exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        })
    }

    next()
}





exports.activateAccount = async (req, res) => {

    const { token } = req.query;

    const { payload: { _id } } = jwt.decode(token, { complete: true });

    
    const user = await User.findById(_id)
    

    user.activateToken = null;
    user.isActivated = true
        
    await user.save() 

    res.status(200).json({
        message: "Activated successfully",
        isActivated: true
     })
    
}





exports.userByEmail = (req, res, next) => {

    const { email } = req.params;

    // console.log("user BY Email", email);
    
    
    User.findOne({email}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        res.status(200).json({
            message: "user found",
            user
        })

        next()
        
    })
}




exports.resetPasswordMail = async (req, res) => {

    const { _id } = req.profile

    // console.log(_id);

   // console.log("Clicked -- ", _id);
    
    
 
    User.findOne(_id).exec(async (err, user) => {
        
        console.log(user);

        
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

     //   console.log(user);
        
        
        try {
            
            user.passwordResetToken = jwt.sign({ _id } , 'process.env.SECRET', { expiresIn: '1d' }) 
            // Mail Password Reset

            let resetLink = `http://localhost:3000/resetpassword/${user._id}?token=${user.passwordResetToken}`
            
            let template = ResetTemplate({
                name: user.name,
                link: resetLink
            })

            await transporter.sendMail({
                from: "learnandexploreteam@gmail.com",
                to: user.email,
                subject: "TreeBd||Reset Your Password",
                html: template
            });
            


            res.status(200).json({
                message: "reset token send",
                user
            })

            
        } catch (err) {
            console.log(err);
            
        }
        

        
    })
 
}






exports.resetAvailable = async (req, res) => {

    const { token } = req.query;

    const { payload: { _id } } = jwt.decode(token, { complete: true });

    
    const user = await User.findById(_id)


    if (user.passwordResetToken !== token) {
        return res.json({
            isReset: false 
        });
    }
    

    // user.passwordResetToken = null
    user.isReset = true
        
    await user.save() 

    res.status(200).json({
        message: "Reset token match",
        isReset: true,
        passwordResetToken: token

     })
    
}

exports.updatePassword = async (req, res) => {

    const { token } = req.query;

    const { password } = req.body;

    console.log("Body Password--", password );
    

    const { payload: { _id } } = jwt.decode(token, { complete: true });

    
    const user = await User.findById(_id)

    user.password = password;
        
    await user.save() 

    res.status(200).json({
        message: "Password reset Successfully"
     })
}



