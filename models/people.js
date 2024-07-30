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

const personSchema = new Schema({
    name: {
        type: String,
    },
    tasks: [ {
        type: Schema.Types.ObjectId,
        ref: "Task",
    }],
});

const taskSchema = new Schema({
    task: String,
});

const Task = mongoose.model("Task", taskSchema);
// const addTask = async() => {
//     Task.insertMany([
//         {task:"I have to finish reading this book by tomorrow."},
//         {task: "I have to go for shopping tomorrow."}
//     ])

// }

// addTask();


const Person = mongoose.model("Person", personSchema);

const addPerson = async() => {
    let person1 = new Person({
        name: "Ehan Ansari",
    })
    const task1 = await Task.findById("66a5d0ffa08c2c52dc5873e9");
    const task2 = await Task.findById("66a5d0ffa08c2c52dc5873ea");
   
    person1.tasks.push(task1);
    person1.tasks.push(task2);

  let result =  await person1.save();
  console.log(result);
}


addPerson();