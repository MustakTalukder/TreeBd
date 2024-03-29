const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator');


const helmet = require('helmet')
const compression = require('compression')


const path = require('path')
require('dotenv').config()


// Import routes
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');


// APP  
const app = express()



//DB
const MONGODB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-n2lsy.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`


mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log("DB Connected"))



// //DB
// const db = require('./config/keys').DATABASE;


// mongoose.connect(db, {
//     useNewUrlParser: true,
//     useCreateIndex: true
// }).then(() => console.log("DB Connected"))



// const MongoClient = require('mongodb').MongoClient;
// const uri = require('./config/keys').DATABASE;

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });









// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use(helmet());
app.use(compression());



// Route Middleware

app.use("/api", authRoutes);
app.use('/api', userRoutes);
app.use('/api', require('./routes/categoryRoute'));
app.use('/api', require('./routes/productRoute'));
app.use('/api', require('./routes/braintreeRoute'))
app.use('/api', require('./routes/orderRoute'))

// --------------------------------------------------------------------
// app.use("/", authRoutes);
// app.use('/', userRoutes);
// app.use('/', require('./routes/categoryRoute'));
// app.use('/', require('./routes/productRoute'));
// app.use('/', require('./routes/braintreeRoute'))
// app.use('/', require('./routes/orderRoute'))

// ---------------------------------------------------------------------

console.log(process.env.NODE_ENV);



//Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



// Port connection
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});