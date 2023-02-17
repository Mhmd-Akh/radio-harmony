require('dotenv').config()

const { createAudioPlayer, createAudioResource, joinVoiceChannel, NoSubscriberBehavior } = require('@discordjs/voice')
const { Client, Intents, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

const play = require('play-dl')
const ytdl = require("ytdl-core")
const scdl = require("soundcloud-downloader").default;
const dl = require("@distube/ytdl")
const Sr = require("youtube-sr").default
const SPinfo = require('spotify-info');

async function radio({ IdChannel, Links, Token, GuildId, ResetChannelId, LogId }) {
    client.login(Token)

    let Data;

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

        async function joinChannel(VoiceId) {
            let musiclink = (await MusicLink(Links))
            let Type = (await LinkValid(musiclink))

            client.channels.fetch(VoiceId).then(async channel => {

                const VoiceConnection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator
                })

                if (Type === "Youtube") {
                    let title = (await dl.getInfo(musiclink)).videoDetails.title
                    Data = "Playing 🎵 " + title

                    const Radio = createAudioResource(ytdl(musiclink, {
                        quality: "highestaudio"
                    }), {
                        inlineVolume: true
                    });

                    Player(Radio, VoiceConnection, VoiceId, Type)
                } else if (Type === "SoundCloud") {
                    let Songs = (await scdl.getInfo(musiclink))
                    Data = "Playing 🎵 " + Songs.title

                    let searched = await Sr.search(Songs.title, {
                        limit: 1
                    })

                    let stream = await play.stream(searched[0].url)
                    let Radio = createAudioResource(stream.stream, {
                        inlineVolume: true,
                        inputType: stream.type
                    })

                    Player(Radio, VoiceConnection, VoiceId, Type)
                } else if (Type === "Spotify") {
                    let sp_data = await SPinfo.scrapeSong(musiclink)

                    let searched = await Sr.search(sp_data.name, {
                        limit: 1
                    })
                    Data = "Playing 🎵 " + searched[0].title

                    let stream = await play.stream(searched[0].url)
                    let Radio = createAudioResource(stream.stream, {
                        inlineVolume: true,
                        inputType: stream.type
                    })

                    Player(Radio, VoiceConnection, VoiceId, Type)
                } else if (Type === null) {
                    Data = "Playing 🎵 Mp3 File"

                    const Radio = createAudioResource(musiclink, {
                        inlineVolume: true
                    });

                    Player(Radio, VoiceConnection, VoiceId, Type)
                } else if (Type === "YoutubePl") {
                    joinChannel(VoiceId)
                    return console.log("Please use track, don't use playlist. ❤️")
                } else if (Type === "SoundCloudPl") {
                    joinChannel(VoiceId)
                    return console.log("Please use track, don't use playlist. ❤️")
                } else if (Type === "SpotifyPl") {
                    joinChannel(VoiceId)
                    return console.log("Please use track, don't use playlist. ❤️")
                }

            }).catch(console.error)
        }
        async function Player(Radio, VoiceConnection, VoiceId, Type) {
            try {
                let player;
                if (Type === "Youtube") {
                    Radio.volume.setVolume(0.3);
                    player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Play } })
                    VoiceConnection.subscribe(player);
                    player.play(Radio)
                    console.log(Data);

                    client.user.setPresence({
                        activities: [{
                            name: Data,
                            type: "PLAYING"
                        }],
                        status: "online"
                    })
                } else
                    if (Type === "SoundCloud") {
                        Radio.volume.setVolume(0.3);
                        player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Play } })
                        VoiceConnection.subscribe(player)
                        player.play(Radio)
                        console.log(Data);

                        client.user.setPresence({
                            activities: [{
                                name: Data,
                                type: "PLAYING"
                            }],
                            status: "online"
                        })
                    } else
                        if (Type === "Spotify") {
                            Radio.volume.setVolume(0.3);
                            player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Play } })
                            VoiceConnection.subscribe(player)
                            player.play(Radio)

                            client.user.setPresence({
                                activities: [{
                                    name: Data,
                                    type: "PLAYING"
                                }],
                                status: "online"
                            })
                        } else if (Type === null) {
                            Radio.volume.setVolume(0.3);
                            player = createAudioPlayer({ behaviors: { noSubscriber: NoSubscriberBehavior.Play } })
                            VoiceConnection.subscribe(player);
                            player.play(Radio)

                            client.user.setPresence({
                                activities: [{
                                    name: Data,
                                    type: "PLAYING"
                                }],
                                status: "online"
                            })
                        }

                player.on("idle", () => {
                    try {
                        player.stop()
                        client.user.setPresence({
                            activities: [{
                                name: "Radio for " + client.user.username,
                                type: "PLAYING"
                            }],
                            status: "online"
                        })
                    } catch (e) { console.error(e) }
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

    let valid = {
        VideoID: /^[a-zA-Z0-9-_]{11}$/,
        VideoURL: /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
        SCTrack: /^https?:\/\/(soundcloud\.com|snd\.sc)\/([A-Za-z0-9_-]+)\/([A-Za-z0-9_-]+)\/?$/,
        Spotify: /^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/,

        PlaylistID: /(PL|UU|LL|RD)[a-zA-Z0-9-_]{16,41}/,
        PlaylistURL: /https?:\/\/(www.)?youtube.com\/playlist\?list=((PL|UU|LL|RD)[a-zA-Z0-9-_]{16,41})/,
        SCPlaylist: /^https?:\/\/(soundcloud\.com|snd\.sc)\/([A-Za-z0-9_-]+)\/sets\/([A-Za-z0-9_-]+)\/?$/,
    };

    async function MusicLink(Links) {
        let LinksNum = Math.floor(Math.random() * Links.length);
        let musicLink = Links[LinksNum]
        return musicLink
    }

    function LinkValid(Value) {
        let Type = null;

        if (valid.VideoID.test(Value)) return Type = "Youtube";
        if (valid.VideoURL.test(Value) && !Value.toLowerCase().includes("list")) return Type = "Youtube";
        if (valid.SCTrack.test(Value)) return Type = "SoundCloud";
        if (valid.Spotify.test(Value) && Value.toLowerCase().includes("track")) return Type = "Spotify";

        if (valid.PlaylistID.test(Value) && !Value.startsWith("http")) return Type = "YoutubePl";
        if (valid.PlaylistURL.test(Value)) return Type = "YoutubePl";
        if (valid.SCPlaylist.test(Value)) return Type = "SoundCloudPl";
        if (valid.Spotify.test(Value) && Value.toLowerCase().includes("playlist")) return Type = "SpotifyPl";

        return Type
    }
}

module.exports = radio