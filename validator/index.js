
// Sign Up Validatoion

exports.userSignupValidator = (req, res, next) => {
    req.check("name", 'Name is required').notEmpty()
    req.check('email', 'Email must be between 3 to 32 characters')
        .isEmail()
        .withMessage("Email is not valid")
        .isLength({
            min: 4, max: 32
        })
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
        .isLength({ min: 6 })
        .withMessage("Password must contain al least 6 characters")
    
    
    
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            error: firstError
        })
    }

    next();
}