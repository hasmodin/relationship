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

const userSchema = new Schema({
    username: String,
    email: String,
})

const postschema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postschema);

// const addData =  async () => {
//     const user = await User.findOne({});


//     const post2 = new Post({
//         content: "Bye Bye :)",
//         likes: 30,
//     });
//        post2.user = user;
//        await post2.save();
// }
// addData();

const getData = async() => {
 let result =  await Post.findOne({}).populate("user", "username");
 console.log(result);

}
getData();
