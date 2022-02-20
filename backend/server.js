dotenv.config();
import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => { console.log("mongoose running") })


const PORT = process.env.PORT || 8000;

const itemSchema = new mongoose.Schema({
    itemName: String,
    description: String,
    price: Number,
    image: String
});

const invoiceSchema = new mongoose.Schema({
    customerName: String,
    itemsList: [],
    totalPrice: Number,
    totalCount: Number
})

const Item = new mongoose.model("Item", itemSchema);
const Invoice = new mongoose.model("Invoice", invoiceSchema);


app.get("/items", (req, res) => {
    Item.find({}, (err, result) => {
        if(err) {
            console.error(err);
        }
        else if(result) {
            res.send(result);
        }
    })
})

app.post("/invoices", (req, res) => {
    const {name, list, price, count} = req.body;
    console.log(req.body);
    const newInvoice = new Invoice({customerName: name, itemsList: list, totalPrice: price, totalCount: count});
    newInvoice.save()
    .then(()=> {
        res.send(true); 
    })
    .catch(()=> {
        res.send(false);
    })
    
})



app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
})