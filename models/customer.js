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

// customerSchema.pre("findOneAndDelete", async() => {
//     console.log("PRE MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async(Customer) => {
    if(Customer.orders.length) {
     let result = await Order.deleteMany({_id: {$in: Customer.orders}});
        console.log(result);
    }
})



//creating order model
const Order = mongoose.model("Order", orderSchema);

//creating customer model
const Customer = mongoose.model("Customer", customerSchema);

//add order to DB
const addData = async() => {
    let newcust = new Customer({
        name: "Ehan Ansari",
    })

    let order1 = new Order(
        {item:"samosa", price:10}
    )
    let order2 = new Order(
        {item:"chips", price:40},
    )
    newcust.orders.push(order1);
    newcust.orders.push(order2);
    await order1.save();
    await order2.save();
   await newcust.save();
   console.log("data is saved");
}
// addData();


const delCust = async() => {
   const res = await Customer.findByIdAndDelete("66a8919b0c8a681f42606b37");
   console.log(res);
}
delCust();







// const delCust = async() => {
//    let data = await Customer.findByIdAndDelete("66a5467cb44a9d60701a594f");
//    console.log(data);
// }
// delCust();