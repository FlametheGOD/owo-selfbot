process.title = "Tool Farm OwO by Eternity_VN & aiko-chan-ai";
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js-selfbot-v13');
const http = require('http');
var timer = 0, totalcmd = 0, totaltext = 0, outofgem1 = false, outofgem2 = false, outofgem3 = false, config = {};

console.clear()

function sleep(ms) {
  timer += ms
  return new Promise(resolve => setTimeout(resolve, ms))
}

function ranInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function log(type = 'UNKNOWN', content) {
  console.log(
      `\x1b[43m${new Date().toLocaleTimeString('VN')}${type === "info" ? "\x1b[0m\x1b[34m [INFO]"
          : type === "sent" ? "\x1b[0m\x1b[92m [SENT]"
              : type === "alert" ? "\x1b[0m\x1b[31m [ALERT]"
                  : `\x1b[0m\x1b[93m [${type}]`}` +
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
  var filter = m => m.author.id === '408785106942164992' && m.content.includes(m.client.user.username) && m.content.includes('Inventory') && m.content.match(/Inventory|Please wait |Please slow down~/)
  channel.sendTyping()
  await sleep(ranInt(1900, 2600))
  channel.send('owo inv')
  log("sent","owo inv")
  channel.awaitMessages({filter, max: 1, time: 10000, errors: ["time"]})
  .catch((e) => {log("", e)})
  .then(async collection => {
    if(collection.first().content.match(/Please wait |Please slow down~/)) {
      await sleep(ranInt(8100, 9800))
      return await gem(channel)
    }
    var inventory, gem1, gem2, gem3, lootbox=false
    inventory = collection.first().content.split("`")
    gem1 = inventory.filter(i => i.match(/^05[1-7]$/))
    gem2 = inventory.filter(i => i.match(/^06[5-9]|07[0-1]$/))
    gem3 = inventory.filter(i => i.match(/^07[2-8]$/))
    inventory.filter(i => i.match(/^050$/)).length !== 0 ? lootbox = true : lootbox = false
    gem1.length === 0 ? outofgem1 = true : outofgem1 = false
    gem2.length === 0 ? outofgem2 = true : outofgem2 = false
    gem3.length === 0 ? outofgem3 = true : outofgem3 = false
    log("info", `\x1b[0mFound ${gem1.length + gem2.length + gem3.length} gems in inventory`)
    if(lootbox) {
      channel.sendTyping()
      await sleep(ranInt(2300, 3100))
      channel.send('owo lootbox all')
      log("sent",'owo lootbox all')
      await sleep(ranInt(8100, 9800))
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
      var data = ''
      res.on('data', function (chunk) {
      data += chunk
      })
      res.on('end', async function () {
        const json = JSON.parse(data)
        if(json["statusCode"] !== 200) return
        channel.sendTyping()
        await sleep(ranInt(3400, 5600))
        channel.send(json["data"][0]["quoteText"])
        totaltext++
      })
    })
    request.on('error', function (e) {
      log("",e.message)
    })
    request.end()
  } catch(e) {log("",String(e.stack))}
}

async function webhook(channel) {
  const webhookClient = new Discord.WebhookClient({url: config.webhookurl})
  if(config.webhookurl.length !== 0) {
    await webhookClient.send({
      content: `${config.userping.length === 0 ? "" : `<@${config.userping}>, `}I found a captcha in channel <#${channel.id}>`,
      username: 'Captcha Detector',
      avatarURL: client.user.displayAvatarURL({dynamics: true})
    })
  }
  log("alert", "FOUND A CAPTCHA ON CHANNEL: " + channel.name)
  console.log("\x1b[92mTotal command sent: \x1b[0m" + totalcmd)
  console.log("\x1b[92mTotal text sent: \x1b[0m" + totaltext)
}

async function ordinary(channel) {
  var filter = m => m.author.id === '408785106942164992' && m.content.includes(m.client.user.username) && m.content.match(/hunt is empowered by| spent 5 <:cowoncy:\d{18}> and caught a | Please wait |Please slow down~/)
  var arr = ['owo hunt', 'owo battle', 'owo hunt']
  var time = Math.random() * (22000 - 15000) + 15000
  let text = arr[Math.floor(Math.random() * arr.length)]
  channel.sendTyping()
  await sleep(ranInt(1600, 2170))
  channel.send(text)
  totalcmd++
  log("sent", text)
  if(config.autousegem && !outofgem1 && !outofgem2 && !outofgem3 && text === 'owo hunt') {
    channel.awaitMessages({ filter: filter, max: 1, time: 10000, errors: ["time"] })
    .catch((e) => {log("", e)})
    .then(async (collection) => {
      var content = collection.first().content
      if(content.match(/Please wait |Please slow down~/)) return
      if(!content.includes("gem1") && outofgem1) return 
      if(!content.includes("gem3") && outofgem2) return 
      if(!content.includes("gem4") && outofgem3) return 
      if(content.includes("gem1") && content.includes("gem3") && content.includes("gem4")) return
      await gem(channel)
    })
  }
  await sleep(time)
  if(config.autopray) await pray(channel)
  if(config.autosendrandomtext) await randomtext(channel)
  await ordinary(channel)
}

process.on('unhandledRejection', (err) => {
  log("PROMISE.ERROR", err)
})

process.on("SIGINT", async function () {
  console.log("\x1b[92mTotal command sent: \x1b[0m" + totalcmd)
  console.log("\x1b[92mTotal text sent: \x1b[0m" + totaltext)
  process.exit(1)
})

const FolderPath = path.resolve(__dirname, 'data');
const FilePath = path.resolve(FolderPath, 'config.json');

if (!fs.existsSync(FolderPath)) {
  fs.mkdirSync(FolderPath);
  fs.writeFileSync(FilePath, '{}', 'utf8');
};

/** Copyright Github: aiko-chan-ai */
const fileData = JSON.parse(fs.existsSync(FilePath) ? fs.readFileSync(FilePath, 'utf8') : '{}')
const Form = (token, guildID, channelID, webhookURL = "", pingWhenCaptchaUserId = "", pray = true, spamchat = true, useGem = true, tag) => {
  return {
      token,
      guildID,
      channelID,
      webhookurl: webhookURL,
      userping: pingWhenCaptchaUserId,
      autopray: pray,
      autosendrandomtext: spamchat,
      autousegem: useGem,
      user: tag
  }
}

const tokenCheck = (token) => {
  return token.match(/^mfa\.[\w-]{84}$|^[\w-]{24}\.[\w-]{6}\.[\w-]{27}$/) ? true : 'Invalid Token'
}

const token_question = (token) => {
  const res = {
      type: 'input',
      name: 'answer',
      validate: tokenCheck,
      message: "Enter your token: ",
  }
  if (token && tokenCheck(token)) res.default = () => {
    return token
  }
  return res;
}

const list = () => {
  return {
    type: 'list',
    name: 'answer',
    message: 'Select the account you want to log in to',
    choices: [...new Set(Object.values(fileData).map(obj => obj.user)), 'New Account (Token)', 'New Account (QR Code Login)'],
    pageSize : 10,
    loop : false,
    filter(value) {
        const obj = Object.values(fileData).find(val => val.user == value);
        if (obj) return Buffer.from(obj.token.split('.')[0], 'base64').toString();
        else return value.includes('Token') ? 0 : 1;
    },
  }
}

const listGuild = (client, guildIdCache) => {
  const obj = {
      type: 'list',
      name: 'answer',
      message: 'Choose the server you want to start farming OwO (id-name)',
      choices: client.guilds.cache.map(guild => `${guild.id}-${guild.name}`),
      pageSize : 10,
      loop : false,
      filter(value) {
        return value.split('-')[0];
      },
  }
  if (guildIdCache && client.guilds.cache.get(guildIdCache)) {
    obj.default = () => {
      return client.guilds.cache.get(guildIdCache).id + '-' + client.guilds.cache.get(guildIdCache).name;
    }
  }
  return obj;
}

const listChannel = (client, guildId, channelIdCache) => {
  const guild = client.guilds.cache.get(guildId);
  const channelList = guild.channels.cache.filter(c => ['GUILD_TEXT', 'GUILD_NEWS'].includes(c.type) && c.permissionsFor(guild.me).has('VIEW_CHANNEL') && c.permissionsFor(guild.me).has('SEND_MESSAGES'))
  const obj = {
      type: 'list',
      name: 'answer',
      message: 'Select the channel you want to start farming OwO (id-name)',
      choices: [...channelList.map(c => `${c.id}-${c.name}`), 'Back to guilds select'],
      pageSize : 10,
      loop : false,
      filter(value) {
          return value.split('-')[0];
      },
  }
  if (channelIdCache && channelList.get(channelIdCache)) {
      obj.default = () => {
          return channelList.get(channelIdCache)?.id + '-' + channelList.get(channelIdCache)?.name;
      }
  }
  return obj;
}

const trueFalse = (question, defaultValue = true) => {
  return {
      type: 'confirm',
      name: 'answer',
      message: question,
      default: defaultValue,
  };
}

const checkWebhook = (webhookCache) => {
  const res = {
    type: 'input',
    name: 'answer',
    message: "Enter Webhook Link If You Want It To Ping You If OwO Asked Captcha, Otherwise Press Enter: ",
    validate: async (input) => {
      if (!input) return true;
      else return input.match(/(^.*(discord|discordapp)\.com\/api\/webhooks\/([\d]+)\/([a-zA-Z0-9_-]+)$)|^$/gm) ? true : "Invalid Webhook"
    },
  }
  if (webhookCache) res.default = () => {
    return webhookCache;
  }
  return res;
}

const userPing = (userPingCache) => {
  const res = {
    type: 'input',
    name: 'answer',
    message: "Enter User ID You Want To Ping, Otherwise Press Enter: ",
    validate: async (input) => {
      if (!input) return true;
      else return /^\d{17,19}$/.test(input) ? true : "Invalid User ID"
    },
  }
  if (userPingCache) res.default = () => {
    return userPingCache;
  }
  return res;
}

const getResult = (question, log) => {
  console.clear();
  if (log) console.log(log);
  return new Promise((resolve) => {
    inquirer.prompt([
      question,
    ]).then(res => resolve(res.answer));
  })
}

const loginCheck = (token) => {
  const client = new Discord.Client({
      checkUpdate: false,
  });
  return new Promise(async (ok) => {
      client.once('ready', () => {
          ok(client);
      });
      try {
          await token ? client.login(token) : client.QRLogin(); //token ? client.login(token) : await client.QRLogin();
      } catch {
          ok('Token invalid, Exiting ...');
      }
  })
}

(async () => {
  if (JSON.stringify(fileData) == '{}') {
    const notif = `Copyright 2022 © Eternity_VN x aiko-chan-ai [Version 1.0.1]
From Github with love ❤
` + "\x1b[4m[EN]\x1b[0m" + `
By Using This Module, You Agree To Our Terms Of Use And Accept The Risks That May Be Taken.
Please Note that We Do Not Take Any Responsibility For Accounts Banned Due To Using Our Tools
` + "\x1b[4m[VI]\x1b[0m" + `
Đồng Nghĩa Với Việc Sử Dụng Module Này, Bạn Đồng Ý Với Các Điều Khoản Sử Dụng Và Chấp Nhận Các Rủi Ro Có Thể Xảy Đến
Xin Lưu Ý Rằng Chúng Tôi Không Chịu Bất Kỳ Trách Nhiệm Nào Đối Với Các Tài khoản Bị Cấm Do Sử Dụng Công Cụ Này
`
    const res = await getResult(trueFalse('Do you still want to continue?'), notif);
    if (!res) {
      console.log('Exiting...')
      process.exit(1);
    }
  }
  const result = await getResult(list());
  let cache, client;
  if (result === 0) {
    const token = await getResult(token_question());
    log("CHECK", 'Token checking ...')
    client = await loginCheck(token);
    if (typeof client == 'string') {
        log("ERROR",client);
        process.exit(1);
    }
  } else if(result === 1) {
    client = await loginCheck();
    if (typeof client == 'string') {
      log("ERROR",client);
      process.exit(1);
    }
  } else {
    const obj = fileData[`${result}`];
    cache = obj;
    log("CHECK", 'Token checking ...')
    client = await loginCheck(obj.token);
    if (typeof client == 'string') {
        log("ERROR",client);
        process.exit(1);
    }
  }
  let guildId = await getResult(listGuild(client, cache?.guildID));
  let channelID = await getResult(listChannel(client, guildId, cache?.channelID));
  while(channelID.startsWith('Back')) {
      guildId = await getResult(listGuild(client, cache?.guildID));
      channelID = await getResult(listChannel(client, guildId, cache?.channelID));
  }
  const webhookURL = await getResult(checkWebhook(cache?.webhookurl));
  const userping = webhookURL ? await getResult(userPing(cache?.userping)) : undefined;
  const pray = await getResult(trueFalse('Toggle Automatically Send Pray: ', cache?.autopray));
  const spam = await getResult(trueFalse('Toggle Automatically Send Random Text To Level Up:', cache?.autosendrandomtext));
  const gem = await getResult(trueFalse('Toggle Automatically Use Gems: ', cache?.autousegem));
  config = Form(client.token, guildId, channelID, webhookURL, userping, pray, spam, gem, client.user.tag)
  fileData[`${client.user.id}`] = config
  fs.writeFileSync(FilePath, JSON.stringify(fileData), 'utf8')
  log("info", `File Saved To: ${FilePath}`)

  client.on('ready', () => {
    console.log('\x1b[94m%s\x1b[0m', `Logged in as ${client.user.tag}!`)
    const channel = client.channels.cache.get(config.channelID)
    ordinary(channel)
  })

  client.on('messageCreate', async (message) => {
    if(message.content.includes(message.client.user.username) && message.content.match(/that you are.{1,3}human!/gm)) {
      await webhook(message.channel)
      console.log("\x1b[92mTotal command sent: \x1b[0m" + totalcmd)
      console.log("\x1b[92mTotal text sent: \x1b[0m" + totaltext)
      process.exit(1)
    }
  })
  client.emit('ready')
})()