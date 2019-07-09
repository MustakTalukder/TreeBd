
const express = require('express');
const router = express.Router();

const {
    requireSignin,
    isAdmin,
    isAuth,
    activateAccount,
    userByEmail,
    resetPasswordMail,
    resetAvailable,
    updatePassword,
    
} = require('../controllers/authController')


const { userById, read, update, purchaseHistory, userList, deleteUser, updateUserAction  } = require('../controllers/userController');

 

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
         user: req.profile
     });
});

router.get('/user/:userId', requireSignin, isAuth, read )
router.put('/user/:userId', requireSignin, isAuth, update )
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory)

router.get('/user/activateaccount/:userId', activateAccount)

router.get('/userbyemail/:email', userByEmail)



router.post('/user/resetpasswordmail/:userId', resetPasswordMail) 

router.get('/user/resetavailable/:userId', resetAvailable) 

router.put('/user/password/update/:userId', updatePassword ) 

router.get('/allusers', userList)

router.delete('/user/remove/:deletedUserId', deleteUser)

// router.get('/user/remove/:deletedUserId', deleteUser)

router.put('/update/:emailId', updateUserAction )


router.param("userId", userById)


module.exports = router;