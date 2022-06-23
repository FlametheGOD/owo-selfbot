const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({intents: [32767]})
const http = require('http');
const d = new Date()
const config = require('./config.json')
var timer = 0, totalcmd = 0, totaltext = 0, outofgem1 = false, outofgem2 = false, outofgem3 = false

function sleep(ms) {
  timer += ms
  return new Promise(resolve => setTimeout(resolve, ms));
}

function ranInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function log(type, content) {
  console.log(
    `\x1b[43m${(d.getDate() < 10 ? "0":"") + d.getDate() + "/" + 
    (d.getMonth() < 10 ? "0":"") + (d.getMonth()+1) + "/" + 
    d.getFullYear() + " " + 
    (d.getHours() < 10 ? "0":"") + d.getHours() + ":" + 
    (d.getMinutes() < 10 ? "0":"") + d.getMinutes()+ ":" + 
    (d.getSeconds() < 10 ? "0":"") + d.getSeconds()}${type === "info" ? "\x1b[0m\x1b[34m [INFO]" 
    : type === "sent" ? "\x1b[0m\x1b[92m [SENT]" 
    : type === "alert" ? "\x1b[0m\x1b[31m [ALERT]" 
    : "\x1b[0m\x1b[93m [UNKNOWN]"}` +
    `\x1b[0m ${content}`
  )
}

async function pray(channel) {
  if(timer >= 360000 || totalcmd <= 2) {
    timer = 0
    channel.sendTyping()
    await sleep(ranInt(2000, 3500))
    channel.send('owo pray')
    log("sent","owo pray")
    totalcmd++
  }
}

async function gem(channel) {
  var filter = m => m.author.id === '408785106942164992' && m.content.includes(m.client.user.username) && m.content.includes('Inventory')
  channel.sendTyping()
  await sleep(ranInt(1900, 2600))
  channel.send('owo inv')
  channel.awaitMessages({filter, max: 1, time: 10000, errors: ["time"]})
    .then(async collection => {
      var inventory, gem1, gem2, gem3, lootbox=false
      inventory = collection.first().content.split("`")
      gem1 = inventory.filter(i => i.match(/^05[1-7]$/))
      gem2 = inventory.filter(i => i.match(/^06[5-9]|07[0-1]$/))
      gem3 = inventory.filter(i => i.match(/^07[2-8]$/))
      inventory.filter(i => i.match(/^050$/)).length !== 0 ? lootbox = true : lootbox = false
      gem1.length === 0 ? outofgem1 = true : outofgem1 = false
      gem2.length === 0 ? outofgem2 = true : outofgem2 = false
      gem3.length === 0 ? outofgem3 = true : outofgem3 = false
      log("info", `\x1b[0m Found ${gem1.length + gem2.length + gem3.length} gems in inventory`)
      if(lootbox) {
        channel.sendTyping()
        await sleep(ranInt(2300, 3100))
        channel.send('owo lootbox all')
        log("sent",'owo lootbox all')
        await sleep(ranInt(5100, 7800))
        return await gem(channel)
      }
      if(outofgem1 && outofgem2 && outofgem3 && !lootbox) return
      channel.sendTyping()
      await sleep(ranInt(5300, 6800))
      channel.send(`owo use ${gem1.length != 0 ? `${Math.max(...gem1)} ` : ""}${gem2.length != 0 ? `${Math.max(...gem2)} ` : ""}${gem3.length != 0 ? `${Math.max(...gem3)}` : ""}`)
      log("sent", `owo use ${gem1.length != 0 ? `${Math.max(...gem1)} ` : ""}${gem2.length != 0 ? `${Math.max(...gem2)} ` : ""}${gem3.length != 0 ? `${Math.max(...gem3)}` : ""}`)
      totalcmd++
    })
}

async function randomtext(channel) {
  try {
    var options = {
      host: 'quote-garden.herokuapp.com',
      path: '/api/v3/quotes/random',
    }
    var request = http.request(options, function (res) {
      var data = '';
      res.on('data', function (chunk) {
      data += chunk;
      });
      res.on('end', async function () {
        const json = JSON.parse(data)
        if(json["statusCode"] !== 200) return
        channel.sendTyping()
        await sleep(ranInt(3400, 5600))
        channel.send(json["data"][0]["quoteText"])
        totaltext++
      });
    });
    request.on('error', function (e) {
      log("",e.message);
    });
    request.end();
  }catch(e) {log("",String(e.stack))}
}

async function webhook(channel) {
  const webhookClient = new Discord.WebhookClient({url: config.webhookurl})
  if(config.webhookurl.length !== 0) {
    await webhookClient.send({
      content: `${config.userping ? `<@${config.userping}>, ` : ""}I found a captcha in channel <#${channel.id}>`,
      username: 'Captcha Detector',
      avatarURL: client.user.displayAvatarURL({dynamics: true})
    })
  }
  log("alert", "FOUND A CAPTCHA ON CHANNEL: " + channel.name)
  console.log("\x1b[92mTotal command sent: \x1b[0m" + totalcmd)
  console.log("\x1b[92mTotal text sent: \x1b[0m" + totaltext)
}

async function ordinary(channel) {
  var filter = m => m.author.id === '408785106942164992' && m.content.includes(m.client.user.username) && m.content.match(/hunt is empowered by| spent 5 \S{9} and caught a /)
  var arr = ['owo hunt', 'owo hunt', 'owo battle']
  var time = Math.random() * (22000 - 15000) + 15000
  let text = arr[Math.floor(Math.random() * arr.length)]
  channel.sendTyping()
  await sleep(ranInt(1600, 2170))
  channel.send(text)
  totalcmd++
  log("sent", text)
  if(config.autousegem && text === 'owo hunt') {
    channel.awaitMessages({ filter: filter, max: 1, time: 10000, errors: ["time"] })
    .then(async (collection) => {
      var content = collection.first().content
      if(!content.includes("gem1") && outofgem1) return 
      if(!content.includes("gem3") && outofgem2) return 
      if(!content.includes("gem4") && outofgem3) return 
      await gem(channel)
    });
  }
  await sleep(time)
  if(config.autopray) await pray(channel)
  if(config.autosendrandomtext) await randomtext(channel)
  await ordinary(channel)
}

client.on('ready', () => {
  console.log('\x1b[94m%s\x1b[0m', `Logged in as ${client.user.tag}!`);
  const channel = client.channels.cache.get(config.channelID)
  ordinary(channel)
});

client.on('messageCreate', async (message) => {
  if(message.content.includes(message.client.user.username) && message.content.match(/that you are.{1,3}human!/gm)) {
    await webhook(message.channel)
    process.exit().catch(e => log("", String(e.stack)))
  }
});

client.login(config.token);