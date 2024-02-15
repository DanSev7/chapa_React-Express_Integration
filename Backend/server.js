import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Allow requests from any origin
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 4400;

const CHAPA_URL = process.env.CHAPA_URL || "https://api.chapa.co/v1/transaction/initialize";
const CHAPA_AUTH = process.env.CHAPA_AUTH || "CHASECK_TEST-ql3djurbhHByY4k2XI4PGySSSczjJBG6";

const config = {
  headers: {
    Authorization: `Bearer ${CHAPA_AUTH}`
  }
};

app.post("/api/pay", async (req, res) => {
  const CALLBACK_URL = "http://localhost:4400/api/verify-payment/";
  // const RETURN_URL = "http://localhost:4400/api/payment-success/";
  // const {amount, first_name, last_name, location} = req.body;
  // console.log("the amount is " + amount);
  const TEXT_REF = "tx-myecommerce12345-" + Date.now();
const data = {
  amount: '250',
  currency: 'ETB',
  email: 'ato@ekele.com',
  first_name: 'Ato',
  last_name: 'Ekele',
  // return_url : RETURN_URL,
  tx_ref: TEXT_REF,
  callback_url: CALLBACK_URL + TEXT_REF,
};



  try {
    const response = await axios.post(CHAPA_URL, data, config);
    res.json(response.data.data.checkout_url);
    const status = response.data.status;
    console.log("entery to the if clause", status);
    console.log("Data form /api/pay : ",response.data);
    // console.log("response.data.data.checkout_url", response.data.data.checkout_url);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/verify-payment/:id", async (req, res) => {
  try {
    // here req.params.id returns the "tx_ref"
    const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${req.params.id}`, config);
  
    const jsonData = response.data;
    console.log("Finall response", jsonData); // response.data.amount  , response
    console.log("Payment was successfully verified");
    res.status(200).json({ message: 'Payment successfully verified' });
  } catch (err) {
    console.log("Payment can't be verified", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => console.log("Server listening on port:", PORT));
