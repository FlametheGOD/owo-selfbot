# Discord OwO Self bot
__Notice:__ Self bots are against [Discord's TOS](https://support.discord.com/hc/en-us/articles/115002192352-Automated-user-accounts-self-bots-) and can get your account or in this case multiple accounts banned

We are not responsible in cases your account is banned
## About

Managed and developed by Team Ngố Tàu

## Requirement
For laptop and PC user: Window 10 OS or higher, Linux and Mac

For mobile user: download and install Termux from [here](https://f-droid.org/en/packages/com.termux/) 

Install all the requirements in [REQUIREMENT.TXT](https://github.com/LongAKolangle/owo-selfbot/blob/main/REQUIREMENT.TXT).

__Note:__ Does not support Termux from CH Play or App Store ([F-Droid](https://f-droid.org/) only)
## Installation
If you haven't installed [Node.js](https://nodejs.org/en/) yet, download it from [here](https://nodejs.org/dist/v16.15.1/node-v16.15.1-x64.msi)

Use the package manager [npm](https://www.npmjs.com/) to install the following packages.

```bash
npm install discord.js-selfbot-v13
npm install fs
npm install http
```
__Note:__ You can install them automatically by running [setup.cmd](https://github.com/LongAKolangle/owo-selfbot/blob/main/setup.cmd).
## Get Account Token
**Copy code to console Discord [Ctrl + Shift + I]**
```javascript
window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default && m.default.getToken !== undefined) {
        return copy(m.default.getToken());
      }
      if (m.getToken !== undefined) {
        return copy(m.getToken());
      }
    }
  },
]);
console.log('%cWorked!', 'font-size: 50px');
console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
```
The token will be automatically copied to your clipboard
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
## Contact

Facebook: Coming soon 

Email: Coming soon 

Discord: Coming soon

Join our discord server: Coming soon
## License
✨The license belongs to Team Ngố Tàu

💖Made by Vietnamese with love