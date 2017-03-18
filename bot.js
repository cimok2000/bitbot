const Discord = require("discord.js");
const bot = new Discord.Client();
const token = '{BOT-TOKEN}'; // Replace this with the bots Token!

const prefix = "!";

const channelID = '{CHANNEL-ID}'; // Add the Channel-ID of the Channel you want the bot to welcome users!

const evlAcs = '165087303281147904'; // DO NOT CHANGE THIS, WILL BREAK THE BOT!

// Bot Commands
const cmd1 = "!help";
const cmd2 = "!add";
const cmd3 = "!say";
const cmd4 = "!ping";
const cmd5 = "!foo";
const cmd6 = "!kick";
const cmd7 = "!pb";

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.username}!`);
});

// Welcomes new users to the Server.
bot.on('guildMemberAdd', member => {
  const channel = bot.channels.get(channelID);

  channel.sendMessage(`Welcome to the server, ${member}!`);
});

bot.on('ready', () => {
    bot.user.setGame('with Herself <3','');
    bot.user.setStatus('dnd');
});

bot.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;

  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = msg.content.split(" ").slice(1);

  if (command === "add") {
    let numArray = args.map(n=> parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);
    msg.channel.sendMessage(total).catch(console.error);
  }

  // Repeats what the user types in.
  if (command === "say") {
    msg.channel.sendMessage(args.join(" "));
  }

  // Reply's with 'Pong!'.
  if (command === "ping") {
    msg.reply('Pong!');
  } else

  // Kicks the user specified after the @.
  if (command === "kick") {
    let modRole = msg.guild.roles.find("name", "Mods");
    if(!msg.member.roles.has(modRole.id)) {
      return msg.reply("You do not have the permissions to use this command.");
    }
    if(msg.mentions.users.size === 0) {
      return msg.reply("Please mention a user to kick");
    }
    let kickMember = msg.guild.member(msg.mentions.users.first());
    if(!kickMember) {
      return msg.reply("That user does not seem valid.");
    }
    if(!msg.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
      return msg.reply("I don't have the permissions (KICK_MEMBER) to do this.");
    }
    kickMember.kick().then(member => {
      msg.reply(`${member.user.username} was successfully kicked.`)
    });
  }

  // Only for cimok2000 :D
  if (command === "eval") {
    if(msg.author.id !== evlAcs) return;
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      msg.channel.sendCode("x1", clean(evaled));
    } catch(err) {
      msg.channel.sendMessage(`\`ERROR\` \`\`\`x1\n${clean(err)}\n\`\`\``);
    }
  }

  // TEST STUFF
  if (command === "help") {
    msg.author.sendMessage("--------------------------------------------------------------------------------------------");
    msg.author.sendMessage("Here is the Commands:");
    msg.author.sendMessage("## " + cmd1 + ", " + cmd2 + ", " + cmd3 + ", " + cmd4 + ", " + cmd5 + ", " + cmd6 + ", " + cmd7 + " ##");
    msg.author.sendMessage("If you would like more information, please visit the Official Server for this bot <3");
    msg.author.sendMessage("--------------------------------------------------------------------------------------------");
  }

  if (command === "pb") {
    msg.reply("cimok2000's Best run on Half-Life is currently at '00:00'!");
  }

  if (command === "ranklist") {
    msg.reply("Here are some of the players who have their rank listed here!");
    msg.channel.sendMessage("- cimok2000 (Creater of Sexy me <3).");
  }

  if (command === "rankcimok2000") {
    msg.reply("cimok2000's Rank on CSGO is Currently Global Elite (He Wishes :|).");
  }

  if (command === "info") {
    msg.author.sendMessage("I was created by a Discord user named cimok2000.");
    msg.author.sendMessage("I am cimok2000's first bot that he Created, and the Best <3");
    msg.author.sendMessage("If you do ''!help', I will supply you with some commands and such.");
    msg.author.sendMessage("Do the command '!links' to find all the links to get in touch with him!");
    msg.reply("I have poked you the information about me :D");
  }

  if (command === "links") {
    msg.author.sendMessage("Here are the links below for cimok2000:");
    msg.author.sendMessage("**__Steam__**");
    msg.author.sendMessage("");
  }

  if (command === "kappa") {
    msg.reply("KAPPA ALL DAY LONG!");
    msg.channel.sendFile("images/kappa.png");
  }

}); // END MESSAGE HANDLER

function clean(text) {
  if (typeof(text) === "string")
   return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
  }

bot.login(token);
