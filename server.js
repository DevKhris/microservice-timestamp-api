let express = require('express');
let app = express();
let parseTime = require("./moment.js");
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200})); 

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date", function (req, res) {
  let date = req.params.date;
  if(/\d{5,}/.test(date)){
    let dateInt = parseInt(date);
    let unix = dateInt;
    let utc = new Date(dateInt).toUTCString();
    res.json({
      unix: unix,
      utc: utc,
    });
  } else {
    let dateObject = new Date(date);
    let unix = dateObject.valueOf();
    let utc = dateObject.toUTCString();
    res.json({
      unix: unix,
      utc: utc,
    });
  }
})

var listener = app.listen(process.env.PORT, function () {
  console.log('Timestamp Microservice is listening on port ' + listener.address().port);
});
