const express = require('express')
const stripe = require('stripe')('sk_test_51N8qHYB0g8aoPJr77HFaiMJojv95o6mCrEOIeGMEcSe2uFbVgqOgMgnsEwA1sCdIOHeM5Wvea4ZGGyIfG8tBIZGs00QJOyRpsZ')
const bodyParser = require('body-parser')
var cors = require('cors')
const bookController = require('./src/controller/bookController')

// const {engine}  = require('express-handlebars');

const server = express();
server.use(express.static(`${__dirname}/public`));
server.use(express.json());
server.use(cors())

//handlebars middleware
// server.engine('handlebars', engine());
// server.set('view engine', 'handlebars');
// server.set('views', './views');

//Body Parse Middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))

//set static folder
// server.use(express.static(`${__dirname}/dist`))

//index route
// server.get('/',(req, res) =>{
//     res.render('src/index.js')
// })

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};
server.get('/books',bookController.getBookList)
server.post('/create-payment-intent', async (req, res) =>{
    console.log('-->',req.body)
    const {items} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency : "usd",
        automatic_payment_methods : {
            enabled : true,
        },
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
})
const port = process.env.PORT || 5000
//start the listen
server.listen(port, () =>{
    console.log(`Server started on ${port}`)
})