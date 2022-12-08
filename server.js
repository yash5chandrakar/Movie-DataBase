// IMP NOTE : Do not try to run both react and this server from single folder. Use different folders for server and client -YKC //

let myexpress = require('express')

let app = myexpress();

const port = 3001;

const mymongodb = require('mongodb');

const myMongoClient = mymongodb.MongoClient

const location = "mongodb://127.0.0.1:27017"

var myDatabase
var userData

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})


myMongoClient.connect(location, (err, server) => {
    if (err) {
        return console.log("MongoDB server connection is Unsuccesful")
    }
    console.log("MongoDB server Connection Successful")
    myDatabase = server.db("MovieDatabase").collection("movieCollection")
    userData = server.db("MovieDatabase").collection("userData")
    // console.log(myDatabase)
})

app.use(myexpress.json())

app.get("/api/getUsers", (req, res) => {
    userData.find({}).toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result)
    });
})

app.get("/api/getSingleUser", (req, res) => {
    userData.findOne({ email: req.query.id }, (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
})

app.post("/api/updateUser", (req, res) => {
    let username = req.body.username
    let data = req.body.data
    userData.updateOne({ email: username }, { $set: { items: data } }, (err) => {
        if (err) {
            console.log(err)
        }
        console.log("Item updated Successfully")
        res.send("Item updated Successfully")
    })
})

app.post("/api/updateUserPrivelege", (req, res) => {
    let email = req.body.email
    let value = req.body.admin
    userData.updateOne({ email: email }, { $set: { admin: value } }, (err) => {
        if (err) {
            console.log(err)
        }
        console.log("User Privilege updated Successfully")
        res.send("Item updated Successfully")
    })
})


app.post("  ", (req, res) => {
    userData.insertOne(req.body, (err) => {
        if (err) {
            console.log("Error ", err)
            res.send({ ok: false })
        }
        console.log("New User Signed Up")
        res.send({ ok: true })
    })
})


app.get("/api/getItems", (req, res) => {                   // getting all items
    myDatabase.find({}).toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.send(result)
    });
})

app.post("/api/addItems", (req, res) => {
    myDatabase.insertOne(req.body, (err) => {             // inserting single data
        if (err) {
            return console.log("Data indsertion failed")
        }
        console.log("Data Inserted Succesfully")
        res.send("Data Inserted Succesfully")
    })
})

// app.use(myexpress.urlencoded({ extended: true }))

app.delete("/api/deleteItem", (req, res) => {                   // deleting single item by name
    const itemName = req.query.name
    myDatabase.deleteOne({ title: itemName }, function (err, obj) {
        if (err) throw err;
        console.log(obj)
        console.log("1 document deleted");
        res.send({ operation: "true" })
    })
})


app.listen(port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("Server running at port", port)
})