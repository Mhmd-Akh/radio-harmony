async function radio({ IdChannel, Links, Youtube, Token, GuildId, ResetChannelId, LogId }) {
    const {
        Client,
        Intents,
        MessageEmbed,
        MessageButton,
        MessageActionRow
    } = require("discord.js")
    const ytdl = require("ytdl-core")
    const {
        joinVoiceChannel,
        createAudioPlayer,
        createAudioResource
    } = require("@discordjs/voice")
    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_VOICE_STATES
        ]
    })

    client.login(Token)
    const channels = [
        ResetChannelId,
        IdChannel
    ]

    client.on("ready", async () => {
        console.log(client.user.tag);

        client.user.setPresence({
            activities: [{
                name: "Radio for " + client.user.username,
                type: "PLAYING"
            }],
            status: "online"
        })

        for (const VoiceId of channels) {
            joinChannel(VoiceId)

            await new Promise(res => setTimeout(() => res(2), 500))
        }

        function joinChannel(VoiceId) {
            client.channels.fetch(VoiceId).then(channel => {

                const VoiceConnection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator
                })
                if (Youtube === true) {
                    const Radio = createAudioResource(ytdl(Links, {
                        quality: "highestaudio"
                    }), {
                        inlineVolume: true
                    });
                    Player(Radio, VoiceConnection, VoiceId)
                } else {
                    const Radio = createAudioResource(Links, {
                        inlineVolume: true
                    });
                    Player(Radio, VoiceConnection, VoiceId)
                }
            }).catch(console.error)
        }
        async function Player(Radio, VoiceConnection, VoiceId) {
            try {
                Radio.volume.setVolume(0.3);
                const player = createAudioPlayer()
                VoiceConnection.subscribe(player);
                player.play(Radio)

                player.on("idle", () => {
                    try {
                        player.stop()
                    } catch (e) { }
                    joinChannel(VoiceId)
                    const EMBED = new MessageEmbed()
                        .setTitle(`Radio ${client.user.username}`)
                        .setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 2048 }))
                        .setDescription(`The radio is restarted.`)
                        .setTimestamp()

                    let NpmPackage = new MessageButton().setEmoji("🗂️").setStyle("LINK").setLabel("Visit Npm Package").setURL("https://www.npmjs.com/package/harmony-radio");
                    let UserDis = new MessageButton().setEmoji("🪬").setStyle("LINK").setLabel("Visit Profile Discord").setURL("https://discord.com/users/750337293927055452");

                    let row = new MessageActionRow().addComponents([NpmPackage, UserDis])

                    client.channels.cache.get(LogId).send({ embeds: [EMBED], components: [row] }).catch(e => { return console.error(e); })
                })
            } catch (e) {
                return console.error(e);
            }
        }
    })
}


module.exports = radio