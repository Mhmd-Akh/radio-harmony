# π Radio Harmony π

<h2> Public Server : <a href="https://discord.gg/ir">π π π₯ π  π’ π‘ π¬<a/>
<br/>
Develope & Config Server : <a href="https://discord.gg/dvc">Celestialβ’<a/>
<h2/>

#

# π€ Object info : 
</br>

```
IdChannel : Voice channel ID of the channel you want the radio to play on
```
```
Links : Radio link or song you want
```
```
Token : Bot token
```
```
GuildId : The Server ID that voice channel is there
```
```
ResetChannelId :  Voice channel ID of the where the bot can be restarted (preferably hidden)
```
```
LogId : The Text channel ID to log the bot actions
```

# β¨ Example for use :

```js
const radio = require("radio-harmony")

radio({
    IdChannel: "Voice_Id(play)",
    Links: "Link(music_or_radio)",
    Token: "Bot_Token",
    GuildId: "Server_Id",
    ResetChannelId: "Voice_Id(reset)",
    LogId: "Channel_Id(log)"
})

// ===================================================== //

const radio = require("radio-harmony")

radio({
    IdChannel: "Voice_Id(play)",
    Links: [ "Spotify", "Soundcloud", "Youtube", "Mp3" ],
    Token: "Bot_Token",
    GuildId: "Server_Id",
    ResetChannelId: "Voice_Id(reset)",
    LogId: "Channel_Id(log)"
})
```

See the <a href="https://github.com/Mhmd-Akh/radio-harmony/blob/main/test.js">test.js<a/> file for better guidance


# π Update


> v1.0.5 : `Fix Spotify & youtube`

> v1.0.4 : `Added Spotify & Souncloud. In addition update playing status to song name or title`

> v1.0.1 & 1.0.2 & 1.0.3 : `Fix all bug`



# πͺ¬ Created By 

<h2 align= "center" > Profile : <a href="https://discordapp.com/users/750337293927055452">Discord<a/> / <a href ="https://github.com/Mhmd-Akh/">Github<a/>
</br>
<img src="https://discord.c99.nl/widget/theme-2/750337293927055452.png"><h2/>