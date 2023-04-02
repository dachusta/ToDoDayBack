const express = require('express');
const cors = require('cors')
// const { DateTime } = require("luxon");

const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/get', function(req, res) {
  console.log(req.query);
  console.log(req.params);

	res.json({
    "success" : true
  });
})

app.post('/setDays', function(req, res) {
  console.log(req.body);
  console.log(req.query);
  console.log(req.params);

	res.json({
    "req.body": req.body,
    "req.hostname": req.hostname,
    "success" : true
  });
  // res.json(req.body)
  const today = req.body[0].value
  console.log(today)
  //intervalId = setInterval(() => {
    
  // }, interval);
  const currentHours = new Date().getHours()
  console.log(currentHours);

  const currentMinutes = new Date().getMinutes()
  console.log(currentMinutes);

  for (const task of today) {
    if (currentHours === getHours(task.time) && currentMinutes === getMinutes(task.time)) {
      
    }
  }


  function getHours(time) {
    return parseInt(time.split(':')[0])
  }
  function getMinutes(time) {
    return parseInt(time.split(':')[1])
  }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
  console.log("Node Js Server is Running");
})