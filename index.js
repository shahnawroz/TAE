import express from "express";
import bodyParser from "body-parser";
import easyinvoice from "easyinvoice";
import fs from "fs";

const port= process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
});
app.get("/", (req,res)=>res.json("Welcome to the Invoicing API"))
app.post("/get-invoice", (req, res) => {


const {company_name}=req.body
const {caddress} = req.body
const {pnumber} = req.body
const {email} = req.body
const {zip_code} = req.body
const {city} =req.body
const {country} = req.body

const {ccompany_name}=req.body
const {ccaddress} = req.body
const {cpnumber} = req.body
const {cemail} = req.body
const {czip_code} = req.body
const {ccity} =req.body
const {ccountry} = req.body



var data = {
    //logo extension must be png
    "images": {
      "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
     
    },
    "sender": {
        "company":company_name ,
        "custom2": email,
        "custom1": pnumber,
        "address": caddress,
        "zip": zip_code,
        "city": city,
        "country": country,
        
        
       
    },
    "client": {
      "company":ccompany_name ,
      "custom2": cemail,
      "custom1": cpnumber,
      "address": ccaddress,
      "zip": czip_code,
      "city": ccity,
      "country": ccountry,
        
       
       
    },
    "information": {
      "number": "2022.0001",
      "date": "1.1.2022",
      "due-date": "15.1.2022"
    },
    
    "products": [
        {
            "quantity": "2",
            "description": "Test1",
            "tax": 6,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "Test2",
            "tax": 21,
            "price": 10.45
        }
    ],
    "bottomNotice": "Kindly pay your invoice within 15 days.",
    "settings": {
      "currency": "USD",
      "tax-notation": "vat",
      "margin-top": 50,
      "margin-right": 50,
      "margin-left": 50,
      "margin-bottom": 25
    }
};
 
//Create Invoice Structure
easyinvoice.createInvoice(data, async function (result) {

   

    await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
 
  res.download("./invoice.pdf")
   

 }) });

 



app.listen(port, () => console.log(`Port is running at ${port}`));
