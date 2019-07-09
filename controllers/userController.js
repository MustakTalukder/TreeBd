const User = require('../models/User');
const { Order } = require('../models/Order')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.userById = (req, res, next, id) => {
    
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        req.profile = user;

        next()
        
    })
}


 



// to see profile

exports.read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined

    return res.json(req.profile);
}

// Update user ingormation

exports.update = (req, res) => {
    User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: 'You are not authorized to perform this action'
            })
        }



        user.hashed_password = undefined
        user.salt = undefined
    
        return res.json(user);
    })
}





exports.addOrderToUserHistory = (req, res, next) => {
    let history = []

    req.body.order.products.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category,
            quantity: item.count,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    })

    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { history: history } },
        { new: true },
        (err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Could not update user puchase history'
                })
            }

            next()
        }
    )
}



exports.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

             res.json(orders);
        })
}




exports.userList = (req, res) => {

    User.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        // console.log(data);
        

         res.json(data);
    })

}



exports.deleteUser = async (req, res) => {

    
    const { deletedUserId } = req.params

    // console.log("back id", deletedUserId);
    
    
    
    try {
        let user = await User.findByIdAndRemove(deletedUserId)
        res.json({
            user,
             message: 'User Removed Successfully'
        });
        
    } catch (err) {

        // console.log(err);
        

        return res.status(400).json({
            error: errorHandler(err)
        })
    }

}






exports.updateUserAction = async (req, res) => {

    
    const { emailId } = req.params

    const { action } =req.body

    // console.log(action);
    

    // console.log("back id", emailId);

    try {
        let user = await User.findOneAndUpdate(
            { email: emailId },
            {
                $set: {
                    role: action
                }
            },
            {new: true}
        )
        res.json({
            user,
            message: 'User update Successfully'
        });
        
    } catch (err) {

        console.log(err);
        

        return res.status(400).json({
            error: errorHandler(err)
        })
    }

}
