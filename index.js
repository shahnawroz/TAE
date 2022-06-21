import express from "express";
import bodyParser from "body-parser";
import easyinvoice from "easyinvoice";
import fs from "fs";


const app = express();


app.use(bodyParser.json());
const user = [ ];
app.get ("/", (req,res)=>res.json("hello world"))

app.post("/getinvoice", (req, res) => {
  //Import the library into your project
// console.log (req.body)
const {company_name}=req.body
const {address} = req.body
const {phone_no} = req.body
const {email} = req.body
const {zip_code} = req.body
const {city} =req.body
const {country} = req.body

const {ccompany_name}=req.body
const {caddress} = req.body
const {cphone_no} = req.body
const {cemail} = req.body
const {czip_code} = req.body
const {ccity} =req.body
const {ccountry} = req.body


 
var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    "images": {
      "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
     
    }, //or base64
    //"logoExtension": "png", //only when logo is base64
    "sender": {
        "company":company_name ,
        "custom2": email,
        "custom1": phone_no,
        "address": address,
        "zip": zip_code,
        "city": city,
        "country": country,
        
        
        //"custom3": "custom value 3"
    },
    "client": {
      "company":ccompany_name ,
      "custom2": cemail,
      "custom1": cphone_no,
      "address": caddress,
      "zip": czip_code,
      "city": ccity,
      "country": ccountry,
        
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
       
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
 
//Create your invoice! Easy!
easyinvoice.createInvoice(data, async function (result) {
    //The response will contain a base64 encoded PDF file
   

    await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
    
  //   var options = {
  //     root: path.join(__dirname)
      
  // };
  // console.log(__dirname)
  res.download("./invoice.pdf")
   
//   res.sendFile("./invoice.pdf", function (err) {
//       if (err) {
//           next(err);
//       } else {
//           console.log('Sent:', "./invoice.pdf");
//       }
// });
 }) });

 



app.listen(3000, () => console.log("Port is running at 3000"));
