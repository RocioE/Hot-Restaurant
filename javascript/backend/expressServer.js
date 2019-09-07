const Model = require("./Model.js");
const model = new Model(2);
var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [
    // {
    //     name: "Daniel",
    //     phone: 4105555555,
    //     email: "daniel@github.com",
    //     id: "shibby",
    // },
    // {
    //     name: "Jeremy",
    //     phone: 3105555555,
    //     email: "jeremy@github.com",
    //     id: "jeremy",
    // }
];

var waitlist = [
    // {
    //     name: "Vicki",
    //     phoneNumber: 4105555555,
    //     email: "vicki@github.com",
    //     id: "vicki",
    // },
    // {
    //     name: "Charles",
    //     phoneNumber: 3105555555,
    //     email: "charles@github.com",
    //     id: "charles",
    // }
];

// model.reserveTable(1, "daniel", "asdf", "qwer");
// model.reserveTable(2, "daniel", "asdf", "qwer");
// model.reserveTable(3, "daniel", "asdf", "qwer");
// model.reserveTable(4, "daniel", "asdf", "qwer");
// model.reserveTable(5, "daniel", "asdf", "qwer");
// model.reserveTable(6, "daniel", "asdf", "qwer");

// model.getAllReservations().then((result) => {
//     console.log(JSON.stringify(result));
// });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../html/index.html"));
});
  
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "../../html/tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "../../html/reserve.html"));
});

app.get("/api/tables", function(req, res) {
    model.getAllReservations().then((reservations) => {
        return res.json(reservations);
    });
}); 

app.get("/api/waitlist", function(req, res) {
    model.getWaitingList().then((waitingList) => {
        return res.json(waitingList);
    });
}); 

app.post("/api/tables", function(req, res) {
    console.log(req.body);
    model.reserveTable(parseInt(req.body.id), req.body.name, req.body.phone, req.body.email).then((result) => {
        if (result === Model.addedReservation){
            res.json(result);
            console.log(result);
        } else if (result === Model.addedToWaitingList){
            res.json();
            console.log(result);
        };
    }).catch((err) => {
        console.log(err);
        res.json();
    });
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});