const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

//setting envior
const envior = require('dotenv')
envior.config({path : './config/.env'})

const stripe = require('stripe')(process.env.REACT_APP_SECRECT_KEY)

const server = express();

//Body Parse Middleware
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))

const bookController = require('./src/controller/bookController')

// server.use(express.static(`${__dirname}/public`));
server.use(express.json());
server.use(cors())


server.get('/books',bookController.getBookList)
server.post('/create-payment-intent', async (req, res) =>{
    const {items} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: items[0].total,
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