 //const path = require('path')
 require('dotenv').config()
 const express = require('express')
 const mongoose = require('mongoose')
 const cors = require('cors')
 const fileUpload = require('express-fileupload')
 const cookieParser = require('cookie-parser')
 const bodyParser = require('body-parser')
 const path = require('path')
 const mercadopago = require('mercadopago'); // SDK de Mercado Pago

 mercadopago.configure({
     access_token: 'TEST-3071634864670083-060221-8cb9a74325a62ab88352121ef23fa581-35290695'
 }); // Agrega credenciales
 //public key :   TEST-857fce73-9556-41d3-8f7e-2390231207df



 const app = express()
 app.use(express.json())
 app.use(cookieParser())
 app.use(cors())
 app.use(fileUpload({
     useTempFiles: true
 }))

 //middleware
 app.use(bodyParser.urlencoded({ extended: false }))

 //routes

 app.use('/user', require('./routes/userRouter'))
 app.use('/api', require('./routes/categoryRouter'))
 app.use('/api', require('./routes/upload'))
 app.use('/api', require('./routes/productRouter'))
 app.post('/checkout', (req, res) => {
     // Crea un objeto de preferencia
     let preference = {
         items: [{
             title: req.body.title,
             unit_price: parseInt(req.body.total),
             quantity: 1,
         }, ],
         back_urls: {
             "success": "http://localhost:3000",
             "failure": "http://localhost:3000",
             "pending": "http://localhost:3000"
         },
         auto_return: 'approved',
         payment_methods: {
             excluded_payment_types: [{
                     id: "credit_card"

                 },
                 {
                     id: "debit_card"
                 }
             ]
         }
     };

     mercadopago.preferences.create(preference)
         .then(function(response) {

             res.redirect(response.body.init_point)
             global.id = response.body.id;
         }).catch(function(error) {
             console.log(error);
         });

 });




 // Connect to mongodb
 const URI = process.env.MONGODB_URL
 mongoose.connect(URI, {
     useCreateIndex: true,
     useFindAndModify: false,
     useNewUrlParser: true,
     useUnifiedTopology: true
 }, err => {
     if (err) throw err;
     console.log('Connected to MongoDB')
 })

// deploy
 if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


 const PORT = process.env.PORT || 5000
 app.listen(PORT, () => {
     console.log('Server is running on port', PORT)
 })