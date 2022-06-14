import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
const user = ["nawrose", "ratul", "saminvai"];

app.get("/user/:name", (req, res) => {
  
  user.forEach((item, index) => {
    if (req.params.name === item) {
      res.json(item);
    }
    if (index + 1 === user.length) {
      res.json("user not found");
    }
  });
});
app.get("/",(req,res)=> res.json('here'))



app.listen(3000, () => console.log("Port is running at 3000"));
