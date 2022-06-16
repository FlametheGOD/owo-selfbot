function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      function pray(channel, timer, delay) {
        timer = timer + delay
        if(!timer >= 300000) return
        timer = 0
        setTimeout(() => {
          channel.send('owo pray')
        }, 2618);
      }
      function gem() {
        
      }
      function randomtext(channel) {
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
                var str = data.substring(
                        data.indexOf('"quoteText":"') + 13, 
                        data.lastIndexOf('","quoteAuthor"')
                        );
                channel.send(str)
                });
        });
        request.on('error', function (e) {
                console.log(e.message);
        });
        request.end();
        }
      async function ordinary(channel, timer) {
        var arr = ['owo hunt', 'owo hunt', 'owo battle']
        var time = Math.random() * (22000 - 15000) + 15000
        channel.startTyping()
        setTimeout(() => {
          let text = arr[Math.floor(Math.random() * arr.length)]
          channel.send(text)
          console.log(`\x1b[43m${d.toLocaleString()}` + '\x1b[0m\x1b[92m [SENT]'+ '\x1b[0m', text)
        }, 2371)
        await sleep(time)
        ordinary(channel)
      }
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
        // let settings = {
        //         name: '',
        //         token: '',
        //         channelid: '',
        //         prefix: '',
        //         userallowed: '',
        //         pray: '',
        //         gem: '',
        //         lootbox: '',
        //         exp: '',
        //         webhook: '',
        //         userping: '',
        //         daily: '',
        //         stop: '',
        //     }