const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
.then((result) => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}


//defining order schema

const orderSchema = new Schema({
    item: String,
    price: Number
});

//defining customer schema
const customerSchema = new  Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        }
    ]
});

//creating order model
const Order = mongoose.model("Order", orderSchema);

//creating customer model
const Customer = mongoose.model("Customer", customerSchema);

//add order to DB
const addOrders = async() => {
//    let result =  await Order.insertMany([
//         {item:"somosa", price: 12},
//         {item: "chips", price: 40},
//         {item: "chocolate", price:100}
//     ]);
//     console.log(result);
}
addOrders();

//add customer to DB
const addCustomer = async() => {
    // const cust1 = new Customer({
    //     name: "Ehan Ansari",  
    // })

    // const order1 = await Order.findOne({item: "chips"});
    // const order2 = await Order.findOne({item: "chocolate"});
    // cust1.orders.push(order1);
    // cust1.orders.push(order2);

    // let result = await cust1.save();
    // console.log(result);
}

addCustomer();

//finding customer from DB.
const findCustomer = async() => {
    let result = await Customer.find({}).populate("orders");
    console.log(result[1]);
}

findCustomer();