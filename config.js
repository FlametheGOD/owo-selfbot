var inquirer = require('inquirer')
var fs = require('fs')
var path = require('path');
var pathToJson = path.resolve(__dirname, './config.json');
const json = require('./config.json')

let a = Object.keys(json.Profile).length

var config = fs.readFile(pathToJson , 'utf8', function (err, data) {
    if (err) throw err;
    config = JSON.parse(data);
});

//FIRST LAUNCH
if (config['Profile'] === undefined || config['Profile'].length == 0) {}

//CREATE NEW PROFILE

let array = [
    {
        type: 'input',
        name: 'Profile',
        message: "Please Enter The Profile's Name: ",
        default: `User ${a}`
    },
    {
        type: 'input',
        name: 'Token',
        message: "Please Enter Your Account Token: "
    },
    {
        type: 'input',
        name: 'ChannelID',
        message: "Please Enter Your Channel ID: "
    },
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
    {
        type: 'input',
        name: 'AutoPray',
        message: "Toggle Automatically Send Pray (YES/NO): ",
        default: `NO`
    },
    {
        type: 'input',
        name: 'AutoGem',
        message: "Toggle Automatically Use Gem (YES/NO): ",
        default: `NO`
    },{
        type: 'input',
        name: 'AutoLootBox',
        message: "Toggle Automatically Open Gem Box (YES/NO): ",
        default: `NO`
    },
    {
        type: 'input',
        name: 'AutoExp',
        message: "Toggle Automatically Send Random Text To Level Up (YES/NO): ",
        default: `NO`
    },
    {
        type: 'input',
        name: 'Webhook',
        message: "Enter Webhook Link If You Want It To Ping You If OwO Asked Captcha. Otherwise Press Enter: ",
        default: `None`
    },
    {
        type: 'input',
        name: 'UserPing',
        message: "Do You Want To Ping A Specified User When OwO Asked Captcha? If Yes Enter User ID. Otherwise Press Enter: ",
        default: `None`
    },
    {
        type: 'input',
        name: 'AutoDaily',
        message: "Toggle Automatically Claim Daily (YES/NO): ",
        default: `NO`
    },
    {
        type: 'input',
        name: 'TimeStop',
        message: "Toggle Stop After A Specifice Time, 0 For Non-Stop (Seconds): ",
        default: `0`
    }
]
let menu = [
    {
        type: 'list',
        name: 'mainmenu',
        message: 'Your Choice: ',
        choice: [new inquirer.Separator(), 
                '| Exit And Save           |', '| Change All Settings     |', 
                '| Change Token            |', '| Change Channel          |',
                '| Change Pray Mode        |', '| Change Gems Mode        |',
                '| Change Exp Mode         |', '| Change Sleep Mode       |',
                '| Change Webhook Settings |', '| Change Selfbot Commands |',
                '| Change Daily Mode       |', '| Change Stop Time        |', 
                new inquirer.Separator()]
    }
]
inquirer.prompt(menu).then(choice => {
    console.log('Your Choice is: ' + choice.choice)
})
inquirer.prompt(array).then(answers => {
    let profile = {
            ID: a,
            name: answers.Profile,
            token: answers.Token,
            prefix: answers.Prefix,
    }
    config['Profile'].push(profile)
    fs.writeFileSync(pathToJson, JSON.stringify(config))
    console.log(`Successfully created profile: ${answers['user']}!`)
})

//MENU

console.log(`
===============================
| [0] Exit And Save           |
| [1] Change All Settings     |
| [2] Change Token            |
| [3] Change Channel          |
| [4] Change Pray Mode        |
| [5] Change Gems Mode        |
| [6] Change Exp Mode         |
| [7] Change Sleep Mode       |
| [8] Change Webhook Settings |
| [9] Change Selfbot Commands |
| [10] Change Daily Mode      |
| [11] Change Stop Time       |
===============================
`)