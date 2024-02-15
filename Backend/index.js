// /* 
//     CHAPA API PAYMENT INTEGRATION TEST
//     Required: Chapa secret key || GET THE KEY BY REGISTERING @ https://dashboard.chapa.co/register
// */

// const express = require("express")
// const app = express()
// const cors = require("cors")
// const axios = require("axios").default
// require("dotenv").config()
// const PORT = process.env.PORT || 4400

// const CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize"
// const CHAPA_AUTH = process.env.CHAPA_AUTH || `CHASECK_TEST-ql3djurbhHByY4k2XI4PGySSSczjJBG6`// || register to chapa and get the key

// app.set("view engine", "ejs")

// // req header with chapa secret key
// const config = {
//     headers: {
//         Authorization: `Bearer ${CHAPA_AUTH}`
//     }
// }

// // entry for the front end
// app.get('/', (req, res) => {
//     res.render("index")
// })

// // initial payment endpoint
// app.post("/api/pay", async (req, res) => {

//          // chapa redirect you to this url when payment is successful
//         const CALLBACK_URL = "http://localhost:4400/api/verify-payment/"
//         const RETURN_URL = "http://localhost:4400/api/payment-success/"

//         // a unique reference given to every transaction
//         const TEXT_REF = "tx-myecommerce12345-" + Date.now()

//         // form data
//         const data = {
//             amount: '250', //350(delivery) or 250(pick)
//             currency: 'USD',
//             email: 'ato@ekele.com',
//             first_name: 'Ato',
//             last_name: 'Ekele',
//             tx_ref: TEXT_REF,
//             callback_url: CALLBACK_URL + TEXT_REF,
//             return_url: RETURN_URL
//         }

//         // post request to chapa
//         await axios.post(CHAPA_URL, data, config)
//             .then((response) => {
//                 res.redirect(response.data.data.checkout_url)
//             })
//             .catch((err) => console.log(err))
// })

// // verification endpoint
// app.get("/api/verify-payment/:id", async (req, res) => {
    
//         //verify the transaction 
//         await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id, config)
//             .then((response) => {
//                 console.log("Response",response.data);
//                 console.log("Payment was successfully verified")
//             }) 
//             .catch((err) => console.log("Payment can't be verfied", err))
// })

// app.get("/api/payment-success", async (req, res) => {
//     //push the user data(JSON) to the mini db NB. This should be awaited, after successful insertion success page will be rendered
//     res.render("success")
// })

// app.listen(PORT, () => console.log("Server listening on port:", PORT))