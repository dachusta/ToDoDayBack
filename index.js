require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN

console.log(token);

const bot = new TelegramBot(token, {
  polling: true
});

let chatId = ''

bot.on('text', async msg => {
  console.log(msg);
  chatId = msg.chat.id
})

//===================================================

const express = require('express');
const https = require('https')
const cors = require('cors')

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

// async function sendMessage(task) {
//   // https://api.telegram.org/bot<token>/METHOD_NAME

//   let response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify({
//           chat_id: '@ToDoDayNotification',
//           text: task.value
//         })
//       });
      
//       let result = await response.json();
//       console.log(result)
// }

let intervalId = null

let days = []
let today = null
let modifyDate = null

app.get('/getDays', function(req, res) {
	res.json({
    "success" : true,
    "data": days
  });
})

app.post('/setDays', async function(req, res) {
	res.json({
    "success" : true
  });
  clearInterval(intervalId)

  days = req.body
  today = days[0]

  intervalId = setInterval(() => {
    const currentDate = new Date().getDate()
    const currentHours = new Date().getHours()
    const currentMinutes = new Date().getMinutes()
  
    for (const task of today.tasks) {
      if (currentHours === getHours(task.time) && currentMinutes === getMinutes(task.time)) {

        if (chatId) {
          bot.sendMessage(chatId, task.value);
        }
      }
    }

    if (currentDate !== modifyDate && currentHours === 23 && currentMinutes === 59) {
      modifyDate = currentDate

      const pastDay = days.shift()
      days.push(pastDay)

      today = days[0]
    }
  }, 59999);


  function getHours(time) {
    if (!time) return null
    return parseInt(time.split(':')[0])
  }
  function getMinutes(time) {
    if (!time) return null
    return parseInt(time.split(':')[1])
  }
})

// const key = fs.readFileSync('encryption/private.key');
// const cert = fs.readFileSync( 'encryption/primary.crt' );
// const ca = fs.readFileSync( 'encryption/intermediate.crt' );

// const options = {
//   key: key,
//   cert: cert,
//   ca: ca
// };

// https.createServer(options, app).listen(443);

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
  console.log("Node Js Server is Running");
})
