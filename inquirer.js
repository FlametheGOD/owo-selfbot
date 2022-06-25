const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const pathToJson = path.resolve(__dirname, './config.json')

var config, listmenu = []

fs.readFile(pathToJson, 'utf-8', (err, data) => {
    if(err) throw err
    config = JSON.parse(data)
})

const startmenu = [
    "Load Existing Profile",
    "Create New Profile",
    "About Us",
]

for(const element of config){
    listmenu.push(element.name)
}

const profilemenu = [
    "Log In To This Profile",
    "Change Profile Settings",
    "Delete This Profile",
]

const settingmenu = [
    ' Save And Exit', 
    ' Change All Settings',
    ' Change Profile Name', 
    ' Change Token',
    ' Change Channel', 
    ' Change Pray Mode', 
    ' Change Gems Mode',
    ' Change Exp Mode', 
    ' Change Webhook Settings', 
]

const index = [
    {
        type : "list",
        name : "entrance",
        message : "Your Choice: ",
        choices : startmenu,
        default : 0,
        pageSize : 3,
        loop : false
    },
    {
        type : "rawlist",
        name : "selection",
        message : "Your Choice: ",
        choices : listmenu,
        default : 0,
        pageSize : 10,
        loop : false,
        when : (answer) => {
            return startmenu.indexOf(answer["entrance"]) === 0
        }
    },
    {
        type : "list",
        name : "option",
        message : "Your Choice: ",
        choices : profilemenu,
        default : 0,
        pageSize : 3,
        loop : false,
        when : (answer) => {
            if (answer["selection"]) return true
        }
    },
    {
        type : "list",
        name : "modification",
        message : "Your Choice: ",
        choices : settingmenu,
        default : 0,
        pageSize : 10,
        loop : false,
        when : (answer) => {
            if (startmenu.indexOf(answer["entrance"]) === 1
            || startmenu.indexOf(answer["option"]) === 1) return true
        }
    },
    {
        type: 'input',
        name: 'name',
        message: "Please Enter The Profile's Name: ",
        default: `User ${Object.keys(config).length}`,
        validate: (input) => {
            return input.match(/^$|^\s{1,}$/) ? "You Need To Provide The Name" : true
        },
        when: (answer) => {
            let pos = settingmenu.indexOf(answer["modification"])
            if(pos === 2 || pos === 1) return true
        }
    },
    {
        type: 'input',
        name: 'token',
        message: "Please Enter The Profile's Token: ",
        validate: (input) => {
            return input.match(/^mfa\.[\w-]{84}$|^[\w-]{24}\.[\w-]{6}\.[\w-]{27}$/) ? true : "You Need To Provide A Valid Token"
        },
        when: (answer) => {
            let pos = settingmenu.indexOf(answer["modification"])
            if(pos === 3 || pos === 1 && answer["name"]) return true
        }
    },
    {
        type: 'input',
        name: 'channel',
        message: "Please Enter The Channel ID: ",
        validate: (input) => {
            return input.match(/^\d{18}$/) ? true : "Invalid Channel ID"
        },
        when: (answer) => {
            let pos = settingmenu.indexOf(answer["modification"])
            if(pos === 4 || pos === 1 && answer["token"]) return true
        }
    },
    {
        type: 'confirm',
        name: 'autopray',
        message: "Toggle Automatically Send Pray: ",
        default: false,
        validate: (input) => {
            return input.match(/^(y|n)$/i) ? true : "Invalid Input"
        },
        when: (answer) => {
            let pos = settingmenu.indexOf(answer["modification"])
            if(pos === 6 || pos === 1 && answer["channel"]) return true
        }
    },
    {
        type: 'confirm',
        name: 'autogem',
        message: "Toggle Automatically Use Gem: ",
        default: false,
        validate: (input) => {
            return input.match(/^(y|n)$/i) ? true : "Invalid Input"
        },
        when: (answer) => {
            let pos = settingmenu.indexOf(answer["modification"])
            if(pos === 7 || pos === 1 && typeof answer["autopray"] !== "undefined") return true
        }
    },
    {
        type: 'confirm',
        name: 'autoexp',
        message: "Toggle Automatically Send Random Text To Level Up: ",
        default: false,
        validate: (input) => {
            return input.match(/^(y|n)$/i) ? true : "Invalid Input"
        },
        when: (answer) => {
            let pos = settingmenu.indexOf(answer["modification"])
            if(pos === 9 || pos === 1 
                && typeof answer["autogem"] !== "undefined"
                && typeof answer["autogem"] !== null) return true
        }
    },
    {
        type: 'input',
        name: 'Webhook',
        message: "Enter Webhook Link If You Want It To Ping You If OwO Asked Captcha, Otherwise Press Enter: ",
        validate: async (input) => {
            return input.match(/(^.*(discord|discordapp)\.com\/api\/webhooks\/([\d]+)\/([a-zA-Z0-9_-]+)$)|^$/gm) ? true : "Invalid Webhook"
        },
        when: (answer) => {
            let pos = mainmenu.indexOf(answer.menu)
            if(pos === 10 || pos === 1 
                && typeof answer["autoexp"] !== "undefined"
                && typeof answer["autoexp"] !== null) return true
        }
    },
    {
        type: 'number',
        name: 'userping',
        message: "Enter User ID You Want To Ping, Otherwise Press Enter: ",
        validate: async (input) => {
            return /^\d{18}$/.test(input) ? true : "Invalid User ID"
        },
        when: (answer) => {
            if(answer.Webhook.match(/^.*(discord|discordapp)\.com\/api\/webhooks\/([\d]+)\/([a-zA-Z0-9_-]+)$/gm)) return true
        }
    },
]
