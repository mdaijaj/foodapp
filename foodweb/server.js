const express = require('express')
const app = express()
const cors= require('cors')
const cookieParser= require('cookie-parser')
const PORT = process.env.PORT || 5000;
const bodyParser= require('body-parser')
const ejs= require('ejs')
const https = require('https')
const qs = require('querystring')


app.use(express.json());
const parseUrl= app.use(express.urlencoded({ extended: false }));
const parseJson = express.json({ extended: false })

app.use(express.static(__dirname)); 
app.use(cors());
app.use(cookieParser());

//
app.use(express.static(__dirname+ '/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

//middleware req aayi koi function chalana hai usi ko middleware kahte hai.
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


let routes=require('./routes/index')
app.use('/', routes);


const checksum_lib = require('./paytm/checksum')
const config = require('./paytm/config')

const router=express.Router();
app.use('/payment', router)
require('./view/payment_controller')(router, parseUrl, parseJson, config, checksum_lib)

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});