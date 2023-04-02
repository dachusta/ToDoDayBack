// const { Telegraf } = require('telegraf');
// const { message } = require('telegraf/filters');

const token = '5898941434:AAH9YwrSrbadYPMcm6JVdSECV_v3lVOBL8I'
// const bot = new Telegraf(token);

// bot.start((ctx) => ctx.reply('Welcome'));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
// bot.hears('hi', (ctx) => ctx.reply('Hey there'));
// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

//===================================================

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

async function sendMessage(task) {
  // https://api.telegram.org/bot<token>/METHOD_NAME

  let response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          chat_id: '@ToDoDayNotification',
          text: task.value
        })
      });
      
      let result = await response.json();
      console.log(result)
}

let intervalId = null

app.post('/setDays', async function(req, res) {
	res.json({
    "success" : true
  });

  clearInterval(intervalId)

  const today = req.body[0].value

  intervalId = setInterval(() => {
    const currentHours = new Date().getHours()
    const currentMinutes = new Date().getMinutes()
  
    for (const task of today) {
      if (currentHours === getHours(task.time) && currentMinutes === getMinutes(task.time)) {
        sendMessage(task)
      }
    }
  }, 60000);


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
