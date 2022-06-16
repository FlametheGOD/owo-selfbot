var inquirer = require('inquirer')
var fs = require('fs')
var path = require('path');
var pathToJson = path.resolve(__dirname, './config.json');

var config = fs.readFile(pathToJson , 'utf8', function (err, data) {
    if (err) throw err;
    config = JSON.parse(data);
});
console.log(`
░██████╗███████╗██╗░░░░░███████╗██████╗░░█████╗░████████╗
██╔════╝██╔════╝██║░░░░░██╔════╝██╔══██╗██╔══██╗╚══██╔══╝
╚█████╗░█████╗░░██║░░░░░█████╗░░██████╦╝██║░░██║░░░██║░░░
░╚═══██╗██╔══╝░░██║░░░░░██╔══╝░░██╔══██╗██║░░██║░░░██║░░░
██████╔╝███████╗███████╗██║░░░░░██████╦╝╚█████╔╝░░░██║░░░
╚═════╝░╚══════╝╚══════╝╚═╝░░░░░╚═════╝░░╚════╝░░░░╚═╝░░░
`)

let settings = {
    name: '',
    token: '',
    channelid: '',
    prefix: '',
    userallowed: '',
    pray: '',
    gem: '',
    lootbox: '',
    exp: '',
    webhook: '',
    userping: '',
    daily: '',
    stop: '',
}

async function InName(settings){
    const json = require('./config.json')
    let array = [
        {
            type: 'input',
            name: 'Profile',
            message: "Please Enter The Profile's Name: ",
            default: `User ${Object.keys(json.Profile).length}`
        },
    ]
    await inquirer.prompt(array).then(answer => {
        settings.name = answer.Profile
    })
}
async function InToken(settings){
    let array = [
        {
            type: 'input',
            name: 'Token',
            message: "Please Enter Your Account Token: "
        },
    ]
    await inquirer.prompt(array).then(answer => {
        settings.token = answer.Token
    })
}
async function InChannelID(settings){
    let array = [
        {
            type: 'number',
            name: 'ChannelID',
            message: "Please Enter Your Channel ID: "
        },
    ]
    await inquirer.prompt(array).then(answer => {
        settings.channelid = answer.ChannelID
    })
}
async function InPrefix(settings){
    let array = [
        {
            type: 'input',
            name: 'Prefix',
            message: "Please Enter Your Selfbot Prefix: ",
            default: `!`
        },
        {
            type: 'input',
            name: 'UserAllowed',
            message: "Do You Want To Allow An User To Use Your Selfbot Commands? If Yes Enter The Account ID, Otherwise Press Enter: ",
            default: `None`
        },
    ]
    await inquirer.prompt(array).then(answer => {
        settings.prefix = answer.Prefix
        settings.userallowed = answer.UserAllowed
    })
}
async function InPray(settings){
    let array = [
        {
            type: 'input',
            name: 'AutoPray',
            message: "Toggle Automatically Send Pray (YES/NO): ",
            default: `NO`
        },
    ]
    await inquirer.prompt(array).then(answer => {
        settings.pray = answer.AutoPray
    })
}
async function InGem(settings){
    let array = [
        {
            type: 'input',
            name: 'AutoGem',
            message: "Toggle Automatically Use Gem (YES/NO): ",
            default: `NO`
        },
    ]
    await inquirer.prompt(array).then(answer => {
        settings.gem = answer.AutoGem
    })
}
async function InLootBox(settings){
    let array = [
        {
            type: 'input',
            name: 'AutoLootBox',
            message: "Toggle Automatically Open Gem Box (YES/NO): ",
            default: `NO`
        },
    ]
    await inquirer.prompt(array).then(answer => {
        settings.lootbox = answer.AutoLootBox
    })
}
async function InExp(settings){
    let array = [
        {
            type: 'input',
            name: 'AutoExp',
            message: "Toggle Automatically Send Random Text To Level Up (YES/NO): ",
            default: `NO`
        },
    ]
    await inquirer.prompt(array).then(answer => {
        settings.exp = answer.AutoExp
    })
}
async function InWebhook(settings){
    let array = [
        {
            type: 'input',
            name: 'Webhook',
            message: "Enter Webhook Link If You Want It To Ping You If OwO Asked Captcha. Otherwise Press Enter: ",
            default: `None`
        },
        {
            type: 'number',
            name: 'UserPing',
            message: "Do You Want To Ping A Specified User When OwO Asked Captcha? If Yes Enter User ID. Otherwise Press Enter: ",
            default: `None`
        },
    ]
    await inquirer.prompt(array).then(answer => {
        settings.webhook = answer.Webhook
        settings.userping = answer.UserPing
    })
}
async function InDaily(settings){
    let array = [
        {
            type: 'input',
            name: 'AutoDaily',
            message: "Toggle Automatically Claim Daily (YES/NO): ",
            default: `NO`
        },
    ]
    await inquirer.prompt(array).then(answer => {
        settings.daily = answer.AutoDaily
    })
}
async function InStop(settings){
    let array = [
        {
            type: 'number',
            name: 'AutoStop',
            message: "Toggle Stop After A Specifice Time, 0 For Non-Stop (Seconds): ",
            default: `0`
        }
    ]
    await inquirer.prompt(array).then(answer => {
        settings.stop = answer.AutoStop
    })
}
async function menubar(settings){
    let mainmenu = [' Exit And Save', ' Change All Settings',
     ' Change Profile', ' Change Token',
     ' Change Channel', ' Change Pray Mode',
     ' Change Gems Mode', ' Change Exp Mode', 
     ' Change Sleep Mode', ' Change Webhook Settings', 
     ' Change Selfbot Commands', ' Change Daily Mode', ' Change Stop Time',] 
    let arr = [
        {
            type: 'rawlist',
            name: 'menu',
            message: 'Your Choice: ',
            choices: mainmenu,
            loop: false,
        }
    ]
    await inquirer.prompt(arr).then(choice => {
        let a = mainmenu.indexOf(choice.menu)
        console.log(a)
        if(a === 0) return console.log(settings)//process.exit()
        if(a === 1) {
            InName(settings)
            InToken(settings)
            InChannelID(settings)
            InPrefix(settings)
            InPray(settings)
            InGem(settings)
            InWebhook(settings)
            InDaily(settings)
            InStop(settings)
        }
        else if(a === 2) InName(settings)
        else if(a === 3) InToken(settings)
        else if(a === 4) InChannelID(settings)
        else if(a === 5) InPrefix(settings)
        else if(a === 6) InPray(settings)
        else if(a === 7) InGem(settings)
        else if(a === 8) InLootBox(settings)
        else if(a === 9) InExp(settings)
        else if(a === 10) InWebhook(settings)
        else if(a === 11) InDaily(settings)
        else if(a === 12) InStop(settings)
    })
    menubar(settings)
}
Repeat:menubar()
// InName()
// InToken()
// InChannelID()
// InPrefix()
// InPray()
// InGem()
// InLootBox()
// InExp()
// InWebhook()
// InDaily()
// InStop() 
// console.log(`
// ===============================
// | [0] Exit And Save           |
// | [1] Change All Settings     |
// | [2] Change Token            |
// | [3] Change Channel          |
// | [4] Change Pray Mode        |
// | [5] Change Gems Mode        |
// | [6] Change Exp Mode         |
// | [7] Change Sleep Mode       |
// | [8] Change Webhook Settings |
// | [9] Change Selfbot Commands |
// | [10] Change Daily Mode      |
// | [11] Change Stop Time       |
// ===============================
// `)
// console.log(`
// ===============================
// | [0] Load Existing Profile   |
// | [1] Create New Profile      |
// | [2] Exit                    |
// ===============================
// `)