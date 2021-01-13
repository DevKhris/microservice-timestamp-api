let express = require('express');
let app = express();

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: new Date().toUTCString() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string;

  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.json({ unix: dateString, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Timestamp Microservice is listening on port ' + listener.address().port);
});
