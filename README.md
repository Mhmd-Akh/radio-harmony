# Harmony Radio

# Object Info : 

`IdChannel : Voice channel ID of the channel you want the radio to play on`
`Links : Radio link or song you want`
`Youtube : If your radio or music link was YouTube (true) else (false)`
`Token : Bot token`
`GuildId : The Server ID that voice channel is there`
`ResetChannelId :  Voice channel ID of the where the bot can be restarted. (preferably hidden.)`
`LogId : The Text channel ID to log the bot actions `

# example for use :

```
const radio = require("harmony-radio")

radio({
    IdChannel: "1013186636718276628",
    Links: "https://www.youtube.com/watch?v=93lXh1yBjpg",
    Youtube: true,
    Token: "",
    GuildId: "578558255392096256",
    ResetChannelId: "1044631776640901190",
    LogId: "1013185293408538805"
})
```

# Created By 

<img src="https://discord.c99.nl/widget/theme-2/750337293927055452.png">