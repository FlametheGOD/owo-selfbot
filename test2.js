console.log(`
░██████╗███████╗██╗░░░░░███████╗██████╗░░█████╗░████████╗
██╔════╝██╔════╝██║░░░░░██╔════╝██╔══██╗██╔══██╗╚══██╔══╝
╚█████╗░█████╗░░██║░░░░░█████╗░░██████╦╝██║░░██║░░░██║░░░
░╚═══██╗██╔══╝░░██║░░░░░██╔══╝░░██╔══██╗██║░░██║░░░██║░░░
██████╔╝███████╗███████╗██║░░░░░██████╦╝╚█████╔╝░░░██║░░░
╚═════╝░╚══════╝╚══════╝╚═╝░░░░░╚═════╝░░╚════╝░░░░╚═╝░░░
`)
//MENU TẠO TÀI KHOẢN
async function menubar(){
    var inquirer = require('inquirer')
    var fs = require('fs')
    var path = require('path');
    var pathToJson = path.resolve(__dirname, './config.json');
    const json = require('./config.json')
    let len = Object.keys(json.Profile).length

    var config = fs.readFile(pathToJson , 'utf8', function (err, data) {
        if (err) throw err;
        config = JSON.parse(data);
    });
    let startmenu = ['Load Profile', 'Edit Profile', 'About Me']
    let mainmenu = [
        ' Exit And Save', 
        ' Change All Settings',
        ' Change Profile Name', 
        ' Change Token',
        ' Change Channel', 
        ' Change Pray Mode', 
        ' Change Gems Mode',
        ' Change Exp Mode', 
        ' Change Sleep Mode', 
        ' Change Webhook Settings', 
        ' Change Selfbot Commands', 
        ' Change Daily Mode', 
        ' Change Stop Time',
    ] 
    let arr = [
        {
            type: 'list',
            name: 'start',
            message: 'Your Choice: ',
            choices: startmenu,
            pageSize: 3,
            loop: false,
        },
        {
            type: 'list',
            name: 'menu',
            message: 'Your Choice: ',
            choices: mainmenu,
            pageSize: 13,
            loop: false,
            when: (answer) => {
                let pos = startmenu.indexOf(answer.start)
                if(pos === 1) return true
            }
        },
        {
            type: 'input',
            name: 'Profile',
            message: "Please Enter The Profile's Name: ",
            default: `User ${len}`,
            validate: (input) => {
                return /^$|^\s{1,}$/.test(input) ? "You Need To Provide Your Profile's Name" : true
            },
            when: (answer) => {
                let pos = mainmenu.indexOf(answer.menu)
                if(pos === 2 || pos === 1) return true
            }
        },
        {
            type: 'input',
            name: 'Token',
            message: "Please Enter Your Account Token: ",
            validate: (input) => {
                return /^mfa\.[\w-]{84}$|^[\w-]{24}\.[\w-]{6}\.[\w-]{27}$/.test(input) ? true : "You Need To Provide Your Token"
            },
            when: (answer) => {
                let pos = mainmenu.indexOf(answer.menu)
                if(pos === 3 || pos === 1) return true
            }
        },
        {
            type: 'input',
            name: 'ChannelID',
            message: "Please Enter Your Channel ID: ",
            validate: (input) => {
                return /^\d{18}$/.test(input) ? true : "Invalid Channel ID"
            },
            when: (answer) => {
                let pos = mainmenu.indexOf(answer.menu)
                if(pos === 4 || pos === 1) return true
            }
        },
    ]
    await inquirer.prompt(arr).then(answers => {
        let profile = {
            ID: Object.keys(json.Profile).length,
            name: answers.Profile,
            token: answers.Token,
            channelid: answers.ChannelID,
            // prefix: answers.Prefix,
            // userallowed: answers.UserAllowed,
            // apray: answers.AutoPray,
            // agem: answers.AutoGem,
            // alb: answers.AutoLootBox,
            // aexp: answers.AutoExp,
            // webhook: answers.Webhook,
            // userping: answers.UserPing,
            // adaily: answers.AutoDaily,
            // astop: answers.AutoStop,
        }
        if(mainmenu.indexOf(answers.menu) === 0){
            config['Profile'].push(profile)
            fs.promises.writeFile(pathToJson, JSON.stringify(config))
            len = Object.keys(json.Profile).length
            console.log(`Successfully Updated Profile: ${answers.Profile}!`)
        }
    }).then(() => {menubar()})
}
menubar()
// let array = [
//     {
//         type: 'rawlist',
//         name: 'menu',
//         message: 'Your Choice: ',
//         choices: mainmenu,
//         loop: false,
//     },
//     {
//         type: 'input',
//         name: 'Profile',
//         message: "Please Enter The Profile's Name: ",
//         default: `User ${Object.keys(json.Profile).length}`
//     },
//     {
//         type: 'input',
//         name: 'Token',
//         message: "Please Enter Your Account Token: "
//     },
//     {
//         type: 'number',
//         name: 'ChannelID',
//         message: "Please Enter Your Channel ID: "
//     },
//     {
//         type: 'input',
//         name: 'Prefix',
//         message: "Please Enter Your Selfbot Prefix: ",
//         default: `!`
//     },
//     {
//         type: 'input',
//         name: 'UserAllowed',
//         message: "Enter The Account ID That Is Allowed To Use Your Selfbot Commands, Otherwise Press Enter: ",
//         default: `None`
//     },
//     {
//         type: 'input',
//         name: 'AutoPray',
//         message: "Toggle Automatically Send Pray (YES/NO): ",
//         default: `NO`
//     },
//     {
//         type: 'input',
//         name: 'AutoGem',
//         message: "Toggle Automatically Use Gem (YES/NO): ",
//         default: `NO`
//     },
//     {
//         type: 'input',
//         name: 'AutoLootBox',
//         message: "Toggle Automatically Open Gem Box (YES/NO): ",
//         default: `NO`
//     },
//     {
//         type: 'input',
//         name: 'AutoExp',
//         message: "Toggle Automatically Send Random Text To Level Up (YES/NO): ",
//         default: `NO`
//     },
//     {
//         type: 'input',
//         name: 'Webhook',
//         message: "Enter Webhook Link If You Want It To Ping You If OwO Asked Captcha, Otherwise Press Enter: ",
//         default: `None`
//     },
//     {
//         type: 'number',
//         name: 'UserPing',
//         message: "Enter User ID You Want To Ping, Otherwise Press Enter: ",
//         default: `None`
//     },
//     {
//         type: 'input',
//         name: 'AutoDaily',
//         message: "Toggle Automatically Claim Daily (YES/NO): ",
//         default: `NO`
//     },
//     {
//         type: 'number',
//         name: 'AutoStop',
//         message: "Toggle Stop After A Specifice Time, 0 For Non-Stop (Seconds): ",
//         default: `0`
//     }
// ]
// {
        //     type: 'confirm',
        //     name: 'AutoPray',
        //     message: "Toggle Automatically Send Pray: ",
        //     default: false,
        //     when: (answer) => {
        //         let pos = mainmenu.indexOf(answer.menu)
        //         if(pos === 6 || pos === 1) return true
        //     }
        // },
        // {
        //     type: 'confirm',
        //     name: 'AutoGem',
        //     message: "Toggle Automatically Use Gem: ",
        //     default: false,
        //     when: (answer) => {
        //         let pos = mainmenu.indexOf(answer.menu)
        //         if(pos === 7 || pos === 1) return true
        //     }
        // },
        // {
        //     type: 'confirm',
        //     name: 'AutoLootBox',
        //     message: "Toggle Automatically Open Gem Box: ",
        //     default: false,
        //     when: (answer) => {
        //         let pos = mainmenu.indexOf(answer.menu)
        //         if(pos === 8 || pos === 1) return true
        //     }
        // },
        // {
        //     type: 'confirm',
        //     name: 'AutoExp',
        //     message: "Toggle Automatically Send Random Text To Level Up: ",
        //     default: false,
        //     when: (answer) => {
        //         let pos = mainmenu.indexOf(answer.menu)
        //         if(pos === 9 || pos === 1) return true
        //     }
        // },
        // {
        //     type: 'input',
        //     name: 'Webhook',
        //     message: "Enter Webhook Link If You Want It To Ping You If OwO Asked Captcha, Otherwise Press Enter: ",
        //     validate: async (input) => {
        //         return /https:\/\/.+\/api\/webhooks\/([^\/]+)\/([^\/]+)\//gm.test(input) ? true : "Invalid Webhook"
        //     },
        //     when: (answer) => {
        //         let pos = mainmenu.indexOf(answer.menu)
        //         if(pos === 10 || pos === 1) return true
        //     }
        // },
        // {
        //     type: 'number',
        //     name: 'UserPing',
        //     message: "Enter User ID You Want To Ping, Otherwise Press Enter: ",
        //     validate: async (input) => {
        //         return /^\d{18}/.test(input) ? true : "Invalid User ID"
        //     },
        //     when: (answer) => {
        //         if(answer.Webhook) return true
        //     }
        // },
        // {
        //     type: 'input',
        //     name: 'Prefix',
        //     message: "Please Enter Your Selfbot Prefix: ",
        //     when: (answer) => {
        //         let pos = mainmenu.indexOf(answer.menu)
        //         if(pos === 5 || pos === 1) return true
        //     }
        // },
        // {
        //     type: 'input',
        //     name: 'UserAllowed',
        //     message: "Enter The Account ID That Is Allowed To Use Your Selfbot Commands, Otherwise Press Enter: ",
        //     validate: async (input) => {
        //         return /^\d{18}/|/^$/.test(input) ? true : "Invalid User ID"
        //     },
        //     when: (answer) => {
        //         if(answer.Prefix) return true
        //     }
        // },
        // {
        //     type: 'confirm',
        //     name: 'AutoDaily',
        //     message: "Toggle Automatically Claim Daily: ",
        //     default: false,
        //     when: (answer) => {
        //         let pos = mainmenu.indexOf(answer.menu)
        //         if(pos === 11 || pos === 1) return true
        //     }
        // },
        // {
        //     type: 'number',
        //     name: 'AutoStop',
        //     message: "Toggle Stop After A Specifice Time, 0 For Non-Stop (Seconds): ",
        //     default: 0,
        //     validate: async (input) => {
        //         return input >= 0 ? true : "Invalid Time"
        //     },
        //     when: (answer) => {
        //         let pos = mainmenu.indexOf(answer.menu)
        //         if(pos === 12 || pos === 1) return true
        //     }
        // }