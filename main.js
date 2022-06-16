const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  intents: [32767]
})
const http = require('http');
const d = new Date()
const timer = 0, count1 = 0, count2 = 0

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function pray(channel, timer, delay) {
  timer = timer + delay
  if(!timer >= 300000) {
    timer = 0
    channel.sendTyping()
    setTimeout(() => {
      channel.send('owo pray')
    }, 2618);
  }
  
}
function gem() {
  
}
function randomtext(channel, count2) {
  var options = {
    host: 'quote-garden.herokuapp.com',
    path: '/api/v3/quotes/random',
  }
  var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
    data += chunk;
    });
    res.on('end', function () {
      var str = data.substring(data.indexOf('"quoteText":"') + 13, data.lastIndexOf('","quoteAuthor"'));
      channel.sendTyping()
      setTimeout(() => {
        channel.send(str)
        count2++
      }, 2618);
    });
  });
  request.on('error', function (e) {
    console.log(e.message);
  });
  request.end();
  }
async function ordinary(channel, timer, count1) {
  var arr = ['owo hunt', 'owo hunt', 'owo battle']
  var time = Math.random() * (22000 - 15000) + 15000
  channel.sendTyping()
  setTimeout(() => {
    let text = arr[Math.floor(Math.random() * arr.length)]
    channel.send(text)
    console.log(`\x1b[43m${d.toLocaleString()}` + '\x1b[0m\x1b[92m [SENT]'+ '\x1b[0m', text)
    count1++
  }, 2371)
  await sleep(time)
  timer += (time + 2371)
  ordinary(channel)
}

client.on('ready', () => {
  console.log(`Logged in as ` + '\x1b[32m%s\x1b[0m', `${client.user.tag}!`);
  //const channel = client.channels.cache.get('978205427030441987')
  //ordinary(channel, timer)
});

client.on('messageCreate', (message) => {
  if(message.guildId === '978205426476797953') console.log(message.content)
  //if(!message.content.includes(message.client.user.username)) return
  
})

client.login('NjgwNzE4MDE3MTY4MDE1NDAw.GqlDNd.ZSK1qjWiWek_xeOrFBfFXbgFlnJ6U94MGN4oHI');