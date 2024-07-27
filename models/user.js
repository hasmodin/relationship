const mongoose = require("mongoose");


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

//defined schema for user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    addresses: [{
        _id: false,
        location: String,
        city: String,
    }]
});

//created user model
const User = mongoose.model("User", userSchema);

//arrow async funtion to save data in Database.
const addUsers = async () => {
    const user1 = new User({
        username: "Rahul Kumar",
        addresses: [
            {location: "40B zone25 Street890", city: "Doha"},    
            
        ]  
    })
    user1.addresses.push({location: "50B Zone30 Street 899", city: "Doha"});
   let result = await user1.save();
   console.log(result);
}

addUsers();