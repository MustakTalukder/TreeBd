
const express = require('express');
const router = express.Router();


const { create, categoryById, read, update, remove, list } = require('../controllers/categoryController');
const { requireSignin, isAdmin, isAuth } = require('../controllers/authController')
const { userById } = require('../controllers/userController');


// get single category
router.get('/category/:categoryId', read);

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin , create );

router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin , update );

router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin , remove );

router.get('/categories', list);



router.param('categoryId', categoryById )
router.param("userId", userById)


module.exports = router;