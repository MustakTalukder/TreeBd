const nodemailer = require('nodemailer')

// Mailtrap

// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,

//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD
//     }
// })



// Gamil

const transporter = nodemailer.createTransport({

    // service: 'gmail',

    host: 'smtp.gmail.com',
    port: 465,
    secure: true,

    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
})

module.exports = transporter