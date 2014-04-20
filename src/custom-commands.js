 var cmds = {
     /*********************************************************
      * Informational Commands                                *
      *********************************************************/
     sh: 'servercommands',
     serverhelp: 'servercommands',
     sc: 'servercommands',
     servercommand: 'servercommands',
     servercommands: function (target, room, user) {
         if (!this.canBroadcast()) return;

         if (!target) {
             return this.sendReplyBox(
                 '/profile - See user\'s profile with infomation about money, status, location, etc. <br/>' +
                 '/stafflist - List of staff members. <br/>' +
                 '/regdate <i>name</i> - Displays registration date of a user. <br/>' +
                 '/twitchchat <i>on/off</i> - Enables Twitch Chat integration. <br/>' +
                 '/twitchgroup - Shows info about twitch groups. <br/>' +
                 '/poke <i>name</i> - Pokes a users. <br/>' +
                 '/pickrandom <i>options...</i> - Randomly picks one from the options <br/>' +
                 '/emoticons - View list of emoticons <br/>' +
                 '/earnmoney - Find out more ways to earn money <br/>' +
                 '<br/> For more help use /serverhelp <i>hangman</i>'
             );
         }
         if (target.toLowerCase() === 'tour') {
             return this.sendReplyBox(
                 "- /nt &lt;format>, &lt;type> [, &lt;comma-separated arguments>]: Creates a new tournament in the current room.<br />" +
                 "- /settype &lt;type> [, &lt;comma-separated arguments>]: Modifies the type of tournament after it's been created, but before it has started.<br />" +
                 "- /et: Forcibly ends the tournament in the current room.<br />" +
                 "- /st: Starts the tournament in the current room.<br />" +
                 "- /dq &lt;user>: Disqualifies a user.<br />" +
                 "- /remind &lt;user>: Pings the users in the tournament.<br />" +
                 "More detailed help can be found <a href=\"https://gist.github.com/kotarou3/7872574\">here</a>"
             );
         }

         if (target.toLowerCase() === 'hangman') {
             return this.sendReplyBox('<font size = 2>A brief introduction to </font><font size = 3>Hangman:</font><br />' +
                 'The classic game, the basic idea of hangman is to guess the word that someone is thinking of before the man is "hanged." Players are given 8 guesses before this happens.<br />' +
                 'Games can be started by any of the rank Voice or higher, including Room Voice, Room Mod, and Room Owner.<br />' +
                 'The commands are:<br />' +
                 '<ul><li>/hangman <em>word</em>, <em>description</em> - Starts the game of hangman, with a specified word and a general category. Requires: + % @ & ~</li>' +
                 '<li>/guess <em>letter</em> - Guesses a letter.</li>' +
                 '<li>/guessword <em>word</em> - Guesses a word.</li>' +
                 '<li>/viewhangman - Shows the current status of hangman. Can be broadcasted.</li>' +
                 '<li>/word - Allows the person running hangman to view the word.</li>' +
                 '<li>/category <em>description</em> OR /topic <em>description</em> - Allows the person running hangman to changed the topic.</li>' +
                 '<li>/endhangman - Ends the game of hangman in the room. Requires: + % @ & ~</li></ul>');
         } 
		 /* if(target === 'techsupport' || target === 'support') {
		 return this.sendReplyBox('<h1>Tech Support</h1><br />' +
		 '<h3>Rank 3 Support - Developers</h3><hr /><br />' +
		 '<b>iFaZe<b> - Custom Styles, Trainer Cards, Commands<br />' +
		 '<b>Bandi<b> - Custom Styles, Bot, Tournament edits, Other<br />' +
		 '<b>CreaturePhil<b> - Twitch Chat, Bot, Commands, Other<br />' +
		 
		 );
		 }*/ else {

             return this.sendReply('Could not find ' + target + '.');
         }
     },
     stafflist: function (target, room, user, connection) {
         var buffer = [];
         var admins = [];
         var leaders = [];
         var mods = [];
         var drivers = [];
         var voices = [];

         admins2 = '';
         leaders2 = '';
         mods2 = '';
         drivers2 = '';
         voices2 = '';
         stafflist = fs.readFileSync('config/usergroups.csv', 'utf8');
         stafflist = stafflist.split('\n');
         for (var u in stafflist) {
             line = stafflist[u].split(',');
             if (line[1] == '~') {
                 admins2 = admins2 + line[0] + ',';
             }
             if (line[1] == '&') {
                 leaders2 = leaders2 + line[0] + ',';
             }
             if (line[1] == '@') {
                 mods2 = mods2 + line[0] + ',';
             }
             if (line[1] == '%') {
                 drivers2 = drivers2 + line[0] + ',';
             }
             if (line[1] == '+') {
                 voices2 = voices2 + line[0] + ',';
             }
         }
         admins2 = admins2.split(',');
         leaders2 = leaders2.split(',');
         mods2 = mods2.split(',');
         drivers2 = drivers2.split(',');
         voices2 = voices2.split(',');
         for (var u in admins2) {
             if (admins2[u] != '') admins.push(admins2[u]);
         }
         for (var u in leaders2) {
             if (leaders2[u] != '') leaders.push(leaders2[u]);
         }
         for (var u in mods2) {
             if (mods2[u] != '') mods.push(mods2[u]);
         }
         for (var u in drivers2) {
             if (drivers2[u] != '') drivers.push(drivers2[u]);
         }
         for (var u in voices2) {
             if (voices2[u] != '') voices.push(voices2[u]);
         }
         if (admins.length > 0) {
             admins = admins.join(', ');
         }
         if (leaders.length > 0) {
             leaders = leaders.join(', ');
         }
         if (mods.length > 0) {
             mods = mods.join(', ');
         }
         if (drivers.length > 0) {
             drivers = drivers.join(', ');
         }
         if (voices.length > 0) {
             voices = voices.join(', ');
         }
         connection.popup('Administrators: \n--------------------\n' + admins + '\n\nLeaders:\n-------------------- \n' + leaders + '\n\nModerators:\n-------------------- \n' + mods + '\n\nDrivers: \n--------------------\n' + drivers + '\n\nVoices:\n-------------------- \n' + voices);
     },
     emoticons: function (target, room, user) {
         if (!this.canBroadcast()) return;
         return this.sendReplyBox(
             '<b><u>Emoticons are case-sensitive:</b></u> <br/>' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ebf60cd72f7aa600-24x18.png">:) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ae4e17f5b9624e2f-24x18.png">:O ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-d570c4b3b8d8fc4d-24x18.png">:( ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-cfaf6eac72fe4de6-24x18.png">;) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-e838e5e34d9f240c-24x18.png">:P ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-374120835234cb29-24x18.png">:/ ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3407bf911ad2fd4a-24x18.png">;P ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-2cde79cfe74c6169-24x18.png">B) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-8e128fa8dc1de29c-24x18.png">O_o ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-0536d670860bf733-24x18.png">R) ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-9f2ac5d4b53913d7-24x18.png">:D ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-b9cbb6884788aa62-24x18.png">:z ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f124d3a96eff228a-41x28.png">BloodTrail ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-f6c13c7fc0a5c93d-36x30.png">BibleThump ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-76292ac622b0fc38-20x30.png"> 4Head ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ddc6e3a8732cb50f-25x28.png">Kappa ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-60aa1af305e32d49-23x30.png">PogChamp ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-1ddcc54d77fc4a61-28x28.png">ResidentSleeper ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3227-src-77d12eca2603dde0-28x28.png">crtNova ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-3228-src-d4b613767d7259c4-28x28.png">crtSSoH ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-5d019b356bd38360-24x24.png">SSSsss ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-680b6b3887ef0d17-21x28.png">SwiftRage ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ce52b18fccf73b29-25x32.png">DansGame ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-3a624954918104fe-19x27.png">Kreygasm ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-c8a77ec0c49976d3-22x30.png">FailFish ' +
             '<img src="http://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-10413-src-9e30fb4e8b42c21a-28x28.png">pikaQQ ' +
             '<img src="http://e.deviantart.net/emoticons/n/ninja.gif">:ninja: ' +
             '<img src="http://e.deviantart.net/emoticons/k/katana.gif">:katana: ' +
             '<img src="http://e.deviantart.net/emoticons/n/ninjabattle.gif">:ninjabattle: ' +
             '<img src="http://e.deviantart.net/emoticons/j/jawdrop.gif">:jawdrop:' +
			 '<img src="https://s.yimg.com/lq/i/mesg/emoticons7/19.gif">:devil:' +
			 '<img src="http://e.deviantart.net/emoticons/h/heart.gif">:heart:' +
			 '<img src="https://s.yimg.com/lq/i/mesg/emoticons7/46.gif">:sigh:' +
			 '<img src="http://www.sherv.net/cm/emo/lol/moving-lol.gif">LOL' +
			 '<img src="http://e.deviantart.net/emoticons/t/tears.gif">:cry:' +
			 '<img src="http://e.deviantart.net/emoticons/l/lmao.gif">:lmao: ' +
			 '<img src="http://e.deviantart.net/emoticons/a/above.gif">^' +
             '<img src="http://e.deviantart.net/emoticons/h/hump.gif">:hump:'
         );
     },

     groups: function (target, room, user) {
         if (!this.canBroadcast()) return;
         this.sendReplyBox('+ <b>Voice</b> - They can use ! commands like !groups, and talk during moderated chat<br />' +
             '% <b>Driver</b> - The above, and they can mute. Global % can also lock users and check for alts<br />' +
             '@ <b>Moderator</b> - The above, and they can ban users<br />' +
             '&amp; <b>Leader</b> - The above, and they can promote to moderator and force ties<br />' +
             '~ <b>Administrator</b> - They can do anything, like change what this message says<br />' +
             '± <b>Nova Bot</b> - This is the server itself that auto moderates chats and tells jokes<br />' +
             '# <b>Room Owner</b> - They are administrators of the room and can almost totally control it');
     },

     regdate: function (target, room, user, connection) {
         if (!this.canBroadcast()) return;
         if (!target || target == "." || target == "," || target == "'") return this.sendReply('/regdate - Please specify a valid username.');
         var username = sanitize(target);
         target = target.replace(/\s+/g, '');
         var util = require("util"),
             http = require("http");

         var options = {
             host: "www.pokemonshowdown.com",
             port: 80,
             path: "/forum/~" + target
         };

         var content = "";
         var self = this;
         var req = http.request(options, function (res) {

             res.setEncoding("utf8");
             res.on("data", function (chunk) {
                 content += chunk;
             });
             res.on("end", function () {
                 content = content.split("<em");
                 if (content[1]) {
                     content = content[1].split("</p>");
                     if (content[0]) {
                         content = content[0].split("</em>");
                         if (content[1]) {
                             regdate = content[1];
                             data = username + ' was registered on' + regdate + '.';
                         }
                     }
                 } else {
                     data = username + ' is not registered.';
                 }
                 self.sendReplyBox(data);
                 room.update();
             });
         });
         req.end();
     },

     twitchgroups: function (target, room, user) {
         if (!this.canBroadcast()) return;

         return this.sendReplyBox('<img src="http://i.imgur.com/UEMY7N1.png" title="System Operator" height="14"><b>System Operator</b> - These are the people who make the server tick. Say hello!<br/><img src="http://i.imgur.com/mbdkl0w.png" title="Elite Moderator" height="14"><b>Elite Moderator</b> - Our most experienced and trustworthy moderator squad who help us keep the server safe and fun.<br/><img src="http://i.imgur.com/0IugM.png" title="Broadcaster" height="14"><b>Broadcaster</b> - This icon denotes the person whose room you\'re currently in.<br/><img src="http://i.imgur.com/Fqiyjil.png" title="Chat Moderator" height="14"><b>Chat Moderator</b> - Specifically appointed chat moderators for the server.<br/><img src="http://i.imgur.com/kZyJVgU.png" title="Turbo User" height="14"><b>Turbo User</b> - These are the people who donated or contributed to the server.');
     },
     /*********************************************************
      * Useful Commands                                       *
      *********************************************************/
      join: function(target, room, user, connection) {
		if (!target) return false;
		var targetRoom = Rooms.get(target) || Rooms.get(toId(target));
		if (!targetRoom) {
			if (target === 'lobby') return connection.sendTo(target, "|noinit|nonexistent|");
			return connection.sendTo(target, "|noinit|nonexistent|The room '"+target+"' does not exist.");
		}
		if (targetRoom.isPrivate && !user.named) {
			return connection.sendTo(target, "|noinit|namerequired|You must have a name in order to join the room '"+target+"'.");
		}
		if (!user.joinRoom(targetRoom || room, connection)) {
			return connection.sendTo(target, "|noinit|joinfailed|The room '"+target+"' could not be joined.");
		}
		if (target.toLowerCase() == "lobby") {
			return connection.sendTo('lobby','|html|<div class="broadcast-silver"><h1><center><b><u>Welcome to the Silver!</u></b></center></h1><br/><br/<center><img src="http://img834.imageshack.us/img834/5062/70785931.jpg"><br/><br/><center>What Can You Do Here?</center><hr>' +
'<center><b>Participate In Tournaments For Money And Prizes!</b></center><br>' +
'<center><b>Join Various Leagues And Clans!</b></center><br>' +
'<center><b>Chat With Emoticons Our Change Your Name Color!</b></center><br>' +
'<center><b>Our Just Hang Out And Chat</b></center><br>' +
'<center><b>If You Liked Your Experience here Make Sure To Tell Your Friends About Us!</b></center><hr><br>' +
'<center><b>For General Help For Server Commands Use /serverhelp</b></center><br>' +
'<center><b>If You Have Any Problems Pm a Staff Member, Only Serious Problems Should Be Taken To Admins (~)</b></center><hr><br>' +
'<center><a href="http://pokemonshowdown.com/rules"><button class="pinkbutton" title="Rules"><font color="white"><b>Rules</b></a></button>   |   <a href="http://www.smogon.com/sim/faq"><button class="pinkbutton" title="FAQs"><font color="white"><b>FAQs</b></a></button> </button></div>');
		}
	},

	
	/*********************************************************
	 * Shop commands
	 *********************************************************/

	createpoints: function(target, room, user, connection) {
		if(!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');
		fs.exists('config/money.csv', function (exists) {
			if(exists){
				return connection.sendTo(room, 'Since this file already exists, you cannot do this.');
			} else {
				fs.writeFile('config/money.csv', 'badsteel,10000', function (err) {
					if (err) throw err;
					console.log('config/money.csv created.');
					connection.sendTo(room, 'config/money.csv created.');
				});
			}
		});
	},

	wallet: 'atm',
	satchel: 'atm',
	fannypack: 'atm',
	purse: 'atm',
	bag: 'atm',
	atm: function(target, room, user, connection, cmd) {
	if (!this.canBroadcast()) return;
	var cMatch = false;
	var mMatch = false;
	var money = 0;
	var coins = 0;
	var total = '';
	if (!target) {
	var data = fs.readFileSync('config/money.csv','utf8')
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (user.userid == userid) {
			var x = Number(parts[1]);
			var money = x;
			mMatch = true;
			if (mMatch === true) {
				break;
			}
			}
		}
		if (mMatch === true) {
			var p = 'bucks';
			if (money < 2) p = 'buck';
			total += user.name + ' has ' + money + ' ' + p + '.<br />';
		}
		if (mMatch === false) {
			total += 'You have no bucks.<br />';
		}
		user.money = money;
		var data = fs.readFileSync('config/coins.csv','utf8')
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (user.userid == userid) {
			var x = Number(parts[1]);
			var coins = x;
			cMatch = true;
			if (cMatch === true) {
				break;
			}
			}
		}
		if (cMatch === true) {
			var p = 'coins';
			if (coins < 2) p = 'coin';
			total += user.name + ' has ' + coins + ' ' + p + '.'
		}
		if (cMatch === false) {
			total += 'You have no coins.'
		}
		user.coins = coins;
	} else {
		var data = fs.readFileSync('config/money.csv','utf8')
		target = this.splitTarget(target);
		var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}
		var money = 0;
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (targetUser.userid == userid || target == userid) {
			var x = Number(parts[1]);
			var money = x;
			mMatch = true;
			if (mMatch === true) {
				break;
			}
			}
		}
		if (mMatch === true) {
			var p = 'bucks';
			if (money < 2) p = 'buck';
			total += targetUser.name + ' has ' + money + ' ' + p + '.<br />';
		}
		if (mMatch === false) {
			total += targetUser.name + ' has no bucks.<br />';
		}
		targetUser.money = money;
		var data = fs.readFileSync('config/coins.csv','utf8')
		var coins = 0;
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (targetUser.userid == userid || target == userid) {
			var x = Number(parts[1]);
			var coins = x;
			cMatch = true;
			if (cMatch === true) {
				break;
			}
			}
		}
		if (cMatch === true) {
			var p = 'coins';
			if (coins < 2) p = 'coin';
			total += targetUser.name + ' has ' + coins + ' ' + p + '.<br />';
		}
		if (cMatch === false) {
			total += targetUser.name + ' has no coins.<br />';
		}
		targetUser.coins = coins;
	}
	return this.sendReplyBox(total);
	},

	awardbucks: 'givebucks',
	gb: 'givebucks',
	givebucks: function(target, room, user) {
		if(!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');
		if(!target) return this.parse('/help givebucks');
		if (target.indexOf(',') != -1) {
			var parts = target.split(',');
			parts[0] = this.splitTarget(parts[0]);
			var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}
		if (isNaN(parts[1])) {
			return this.sendReply('Very funny, now use a real number.');
		}
		var cleanedUp = parts[1].trim();
		var giveMoney = Number(cleanedUp);
		var data = fs.readFileSync('config/money.csv','utf8')
		var match = false;
		var money = 0;
		var line = '';
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (targetUser.userid == userid) {
			var x = Number(parts[1]);
			var money = x;
			match = true;
			if (match === true) {
				line = line + row[i];
				break;
			}
			}
		}
		targetUser.money = money;
		targetUser.money += giveMoney;
		if (match === true) {
			var re = new RegExp(line,"g");
			fs.readFile('config/money.csv', 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			var result = data.replace(re, targetUser.userid+','+targetUser.money);
			fs.writeFile('config/money.csv', result, 'utf8', function (err) {
				if (err) return console.log(err);
			});
			});
		} else {
			var log = fs.createWriteStream('config/money.csv', {'flags': 'a'});
			log.write("\n"+targetUser.userid+','+targetUser.money);
		}
		var p = 'bucks';
		if (giveMoney < 2) p = 'buck';
		this.sendReply(targetUser.name + ' was given ' + giveMoney + ' ' + p + '. This user now has ' + targetUser.money + ' bucks.');
		targetUser.send(user.name + ' has given you ' + giveMoney + ' ' + p + '.');
		} else {
			return this.parse('/help givebucks');
		}
	},

	takebucks: 'removebucks',
	removebucks: function(target, room, user) {
		if(!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');
		if(!target) return this.parse('/help removebucks');
		if (target.indexOf(',') != -1) {
			var parts = target.split(',');
			parts[0] = this.splitTarget(parts[0]);
			var targetUser = this.targetUser;
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}
		if (isNaN(parts[1])) {
			return this.sendReply('Very funny, now use a real number.');
		}
		var cleanedUp = parts[1].trim();
		var takeMoney = Number(cleanedUp);
		var data = fs.readFileSync('config/money.csv','utf8')
		var match = false;
		var money = 0;
		var line = '';
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (targetUser.userid == userid) {
			var x = Number(parts[1]);
			var money = x;
			match = true;
			if (match === true) {
				line = line + row[i];
				break;
			}
			}
		}
		targetUser.money = money;
		targetUser.money -= takeMoney;
		if (match === true) {
			var re = new RegExp(line,"g");
			fs.readFile('config/money.csv', 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			var result = data.replace(re, targetUser.userid+','+targetUser.money);
			fs.writeFile('config/money.csv', result, 'utf8', function (err) {
				if (err) return console.log(err);
			});
			});
		} else {
			var log = fs.createWriteStream('config/money.csv', {'flags': 'a'});
			log.write("\n"+targetUser.userid+','+targetUser.money);
		}
		var p = 'bucks';
		if (takeMoney < 2) p = 'buck';
		this.sendReply(targetUser.name + ' has had ' + takeMoney + ' ' + p + ' removed. This user now has ' + targetUser.money + ' bucks.');
		targetUser.send(user.name + ' has removed ' + takeMoney + ' bucks from you.');
		} else {
			return this.parse('/help removebucks');
		}
	},

	buy: function(target, room, user) {
		if (!target) return this.parse('/help buy');
		if (closeShop) return this.sendReply('The shop is currently closed and will open shortly.');
		var target2 = target;
		var target3 = target;
		target = target.split(', ');
		var avatar = '';
		var voice = '';
		var data = fs.readFileSync('config/money.csv','utf8')
		var match = false;
		var money = 0;
		var line = '';
		var row = (''+data).split("\n");
		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			var userid = toUserid(parts[0]);
			if (user.userid == userid) {
			var x = Number(parts[1]);
			var money = x;
			match = true;
			if (match === true) {
				line = line + row[i];
				break;
			}
			}
		}
		user.money = money;
		var price = 0;
		if (target2 === 'symbol') {
			price = 5;
			if (price <= user.money) {
				user.money = user.money - price;
				this.sendReply('You have purchased a custom symbol. You will have this until you log off for more than an hour.');
				this.sendReply('Use /customsymbol [symbol] to change your symbol now!');
				user.canCustomSymbol = true;
				this.add(user.name + ' has purchased a custom symbol!');
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target[0] === 'custom') {
			price = 15;
			if (price <= user.money) {
				if (!target[1]) return this.sendReply('Please specify the avatar you would like you buy. It has a maximum size of 80x80 and must be in .png format. ex: /buy custom, [url to the avatar]');
       				var filename = target[1].split('.');
				filename = '.'+filename.pop();
				if (filename != ".png") return this.sendReply('Your avatar must be in .png format.');
				user.money = user.money - price;
				this.sendReply('You have purchased a custom avatar. Staff have been notified and it will be added in due time.');
				user.canCustomAvatar = true;
				Rooms.rooms.staff.add(user.name+' has purchased a custom avatar. Image: '+target[1]);
				for (var u in Users.users) {
					if (Users.users[u].group == "~" || Users.users[u].group == "&") {
						Users.users[u].send('|pm|~Server|'+Users.users[u].group+Users.users[u].name+'|'+user.name+' has purchased a custom avatar. Image: '+target[1]);
					}
				}
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target[0] === 'animated') {
			price = 25;
			if (price <= user.money) {
				if (!target[1]) return this.sendReply('Please specify the avatar you would like you buy. It has a maximum size of 80x80 and must be in .gif format. ex: /buy animated, [url to the avatar]');
       				var filename = target[1].split('.');
				filename = '.'+filename.pop();
				if (filename != ".gif") return this.sendReply('Your avatar must be in .gif format.');
				user.money = user.money - price;
				this.sendReply('You have purchased a custom animated avatar. Staff have been notified and it will be added in due time.');
				user.canAnimatedAvatar = true;
				Rooms.rooms.staff.add(user.name+' has purchased a custom animated avatar. Image: '+target[1]);
				for (var u in Users.users) {
					if (Users.users[u].group == "~" || Users.users[u].group == "&") {
						Users.users[u].send('|pm|~Server|'+Users.users[u].group+Users.users[u].name+'|'+user.name+' has purchased a custom animated avatar. Image: '+target[1]);
					}
				}
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target[0] === 'room') {
			price = 80;
			if (price <= user.money) {
				user.money = user.money - price;
				this.sendReply('You have purchased a chat room. You need to message an Admin so that the room can be made.');
				user.canChatRoom = true;
				this.add(user.name + ' has purchased a chat room!');
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target2 === 'trainer') {
			price = 30;
			if (price <= user.money) {
				user.money = user.money - price;
				this.sendReply('You have purchased a trainer card. You need to message an Admin capable of adding this (Storm Developer or Cometstorm).');
				user.canTrainerCard = true;
				this.add(user.name + ' has purchased a trainer card!');
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target2 === 'fix') {
			price = 10;
			if (price <= user.money) {
				user.money = user.money - price;
				this.sendReply('You have purchased the ability to alter your avatar or trainer card. You need to message an Admin capable of adding this (Storm Developer or Cometstorm).');
				user.canFixItem = true;
				this.add(user.name + ' has purchased the ability to set alter their card or avatar!');
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (target2 === 'declare') {
			price = 25;
			if (price <= user.money) {
				user.money = user.money - price;
				this.sendReply('You have purchased the ability to declare (from Admin). To do this message an Admin (~) with the message you want to send. Keep it sensible!');
				user.canDecAdvertise = true;
				this.add(user.name + ' has purchased the ability to declare from an Admin!');
			} else {
				return this.sendReply('You do not have enough bucks for this. You need ' + (price - user.money) + ' more bucks to buy ' + target + '.');
			}
		}
		if (match === true) {
			var re = new RegExp(line,"g");
			fs.readFile('config/money.csv', 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}
			var result = data.replace(re, user.userid+','+user.money);
			fs.writeFile('config/money.csv', result, 'utf8', function (err) {
				if (err) return console.log(err);
			});
			});
		}
	},

	customsymbol: function(target, room, user) {
		if(!user.canCustomSymbol) return this.sendReply('You need to buy this item from the shop to use.');
		if(!target || target.length > 1) return this.sendReply('/customsymbol [symbol] - changes your symbol (usergroup) to the specified symbol. The symbol can only be one character');
		var a = target;
		if (a === "+" || a === "$" || a === "%" || a === "@" || a === "&" || a === "~" || a === "#" || a === "a" || a === "b" || a === "c" || a === "d" || a === "e" || a === "f" || a === "g" || a === "h" || a === "i" || a === "j" || a === "k" || a === "l" || a === "m" || a === "n" || a === "o" || a === "p" || a === "q" || a === "r" || a === "s" || a === "t" || a === "u" || a === "v" || a === "w" || a === "x" || a === "y" || a === "z" || a === "0" || a === "1" || a === "2" || a === "3" || a === "4" || a === "5" || a === "6" || a === "7" || a === "8" || a === "9" ) {
			return this.sendReply('Sorry, but you cannot change your symbol to this for safety/stability reasons.');
		}
		user.getIdentity = function(){
			if(this.muted)	return '!' + this.name;
			if(this.locked) return '‽' + this.name;
			return target + this.name;
		};
		user.updateIdentity();
		user.canCustomSymbol = false;
		user.hasCustomSymbol = true;
	},

	shop: function(target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<center><h4><b><u>Silver Bucks Shop</u></b></h4><table border="1" cellspacing ="0" cellpadding="3"><tr><th>Command</th><th>Description</th><th>Cost</th></tr>' +
			'<tr><td>Symbol</td><td>Buys a custom symbol to go infront of name and puts you at top of userlist (temporary until restart)</td><td>5</td></tr>' +
			'<tr><td>Custom</td><td>Buys a custom avatar to be applied to your name (you supply)</td><td>15</td></tr>' +
			'<tr><td>Animated</td><td>Buys an animated avatar to be applied to your name (you supply)</td><td>25</td></tr>' +
			'<tr><td>Room</td><td>Buys a chatroom for you to own (within reason, can be refused)</td><td>80</td></tr>' +
			'<tr><td>Trainer</td><td>Buys a trainer card which shows information through a command such as /badsteel (note: third image costs 10 bucks extra, ask for more details)</td><td>40</td></tr>' +
			'<tr><td>Fix</td><td>Buys the ability to alter your current custom avatar or trainer card (don\'t buy if you have neither)!</td><td>10</td></tr>' +
			'<tr><td>Declare</td><td>You get the ability to get two declares from an Admin in lobby. This can be used for league or room advertisement (not server)</td><td>25</td></tr>' +
			'</table><br />To buy an item from the shop, use /buy [command]. <br />Also do /moneycommands to view money based commands.<br /> Bucks are not transferable among alts.</center>');
		global.closeShop = global.closeShop || false;
		if (closeShop) return this.sendReply('|raw|<center><h3><b>The shop is currently closed and will open shortly.</b></h3></center>');
	},

	lockshop: 'closeshop',
	closeshop: function(target, room, user) {
		if (!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');

		if(closeShop && closedShop === 1) closedShop--;

		if (closeShop) {
			return this.sendReply('The shop is already closed. Use /openshop to open the shop to buyers.');
		}
		else if (!closeShop) {
			if (closedShop === 0) {
				this.sendReply('Are you sure you want to close the shop? People will not be able to buy anything. If you do, use the command again.');
				closedShop++;
			}
			else if (closedShop === 1) {
				closeShop = true;
				closedShop--;
				this.add('|raw|<center><h4><b>The shop has been temporarily closed, during this time you cannot buy items.</b></h4></center>');
			}
		}
	},

	openshop: function(target, room, user) {
		if (!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');

		if (!closeShop && closedShop === 1) closedShop--;

		if (!closeShop) {
			return this.sendRepy('The shop is already closed. Use /closeshop to close the shop to buyers.');
		}
		else if (closeShop) {
			if (closedShop === 0) {
				this.sendReply('Are you sure you want to open the shop? People will be able to buy again. If you do, use the command again.');
				closedShop++;
			}
			else if (closedShop === 1) {
				closeShop = false;
				closedShop--;
				this.add('|raw|<center><h4><b>The shop has been opened, you can now buy from the shop.</b></h4></center>');
			}
		}
	},

	shoplift: 'awarditem',
	giveitem: 'awarditem',
	awarditem: function(target, room, user) {
		if (!target) return this.parse('/help awarditem');
		if(!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');

		target = this.splitTarget(target);
		var targetUser = this.targetUser;

		if (!target) return this.parse('/help awarditem');
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}

		var matched = false;
		var isItem = false;
		var theItem = '';
		for (var i = 0; i < inShop.length; i++) {
			if (target.toLowerCase() === inShop[i]) {
				isItem = true;
				theItem = inShop[i];
			}
		}
		if (isItem === true) {
			if (theItem === 'symbol') {
				if (targetUser.canCustomSymbol === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canCustomSymbol === false) {
					matched = true;
					this.sendReply(targetUser.name + ' can now use /customsymbol to get a custom symbol.');
					targetUser.canCustomSymbol = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen custom symbol from the shop!');
					targetUser.send(user.name + ' has given you ' + theItem + '! Use /customsymbol [symbol] to add the symbol!');
				}
			}
			if (theItem === 'custom') {
				if (targetUser.canCustomAvatar === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canCustomAvatar === false) {
					matched = true;
					targetUser.canCustomSymbol = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen a custom avatar from the shop!');
					targetUser.send(user.name + ' has given you ' + theItem + '!');
				}
			}
			if (theItem === 'animated') {
				if (targetUser.canAnimated === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canCustomAvatar === false) {
					matched = true;
					targetUser.canCustomAvatar = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen a custom avatar from the shop!');
					targetUser.send(user.name + ' has given you ' + theItem + '!');
				}
			}
			if (theItem === 'room') {
				if (targetUser.canChatRoom === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canChatRoom === false) {
					matched = true;
					targetUser.canChatRoom = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen a chat room from the shop!');
					targetUser.send(user.name + ' has given you ' + theItem + '!');
				}
			}
			if (theItem === 'trainer') {
				if (targetUser.canTrainerCard === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canTrainerCard === false) {
					matched = true;
					targetUser.canTrainerCard = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen a trainer card from the shop!');
					targetUser.send(user.name + ' has given you ' + theItem + '!');
				}
			}
			if (theItem === 'fix') {
				if (targetUser.canFixItem === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canFixItem === false) {
					matched = true;
					targetUser.canFixItem = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen the ability to alter a current trainer card or avatar from the shop!');
					targetUser.send(user.name + ' has given you the ability to set ' + theItem + '!');
				}
			}
			if (theItem === 'voice') {
				if (targetUser.canBeVoice === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canBeVoice === false) {
					matched = true;
					targetUser.canBeVoice = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen Global Voice from the shop!');
					targetUser.send(user.name + ' has given you Global ' + theItem + '!');
				}
			}
			if (theItem === 'declare') {
				if (targetUser.canDecAdvertise === true) {
					return this.sendReply('This user has already bought that item from the shop... no need for another.');
				}
				if (targetUser.canDecAdvertise === false) {
					matched = true;
					targetUser.canDecAdvertise = true;
					Rooms.rooms.lobby.add(user.name + ' has stolen the ability to get a declare from the shop!');
					targetUser.send(user.name + ' has given you the ability to set ' + theItem + '!');
				}
			}
			else
				if (!matched) return this.sendReply('Maybe that item isn\'t in the shop yet.');
		}
		else
			return this.sendReply('Shop item could not be found, please check /shop for all items - ' + theItem);
	},

	removeitem: function(target, room, user) {
		if (!target) return this.parse('/help removeitem');
		if(!user.can('hotpatch')) return this.sendReply('You do not have enough authority to do this.');

		target = this.splitTarget(target);
		var targetUser = this.targetUser;

		if (!target) return this.parse('/help removeitem');
		if (!targetUser) {
			return this.sendReply('User '+this.targetUsername+' not found.');
		}

		if (target === 'symbol') {
			if (targetUser.canCustomSymbol) {
				targetUser.canCustomSymbol = false;
				this.sendReply(targetUser.name + ' no longer has a custom symbol ready to use.');
				targetUser.send(user.name + ' has removed the custom symbol from you.');
			}
			else
				return this.sendReply('They do not have a custom symbol for you to remove.');
		}
		else if (target === 'voice') {
			if (targetUser.canBeVoice) {
				targetUser.canBeVoice = false;
				this.sendReply(targetUser.name + ' no longer has Global Voice ready to use.');
				targetUser.send(user.name + ' has removed Global Voice from you.');
			}
			else
				return this.sendReply('They do not have Global voice for you to remove.');
		}
		else if (target === 'custom') {
			if (targetUser.canCustomAvatar) {
				targetUser.canCustomAvatar = false;
				this.sendReply(targetUser.name + ' no longer has a custom avatar ready to use.');
				targetUser.send(user.name + ' has removed the custom avatar from you.');
			}
			else
				return this.sendReply('They do not have a custom avatar for you to remove.');
		}
		else if (target === 'animated') {
			if (targetUser.canAnimatedAvatar) {
				targetUser.canAnimatedAvatar = false;
				this.sendReply(targetUser.name + ' no longer has a animated avatar ready to use.');
				targetUser.send(user.name + ' has removed the animated avatar from you.');
			}
			else
				return this.sendReply('They do not have an animated avatar for you to remove.');
		}
		else if (target === 'room') {
			if (targetUser.canChatRoom) {
				targetUser.canChatRoom = false;
				this.sendReply(targetUser.name + ' no longer has a chat room ready to use.');
				targetUser.send(user.name + ' has removed the chat room from you.');
			}
			else
				return this.sendReply('They do not have a chat room for you to remove.');
		}
		else if (target === 'trainer') {
			if (targetUser.canTrainerCard) {
				targetUser.canTrainerCard = false;
				this.sendReply(targetUser.name + ' no longer has a trainer card ready to use.');
				targetUser.send(user.name + ' has removed the trainer card from you.');
			}
			else
				return this.sendReply('They do not have a trainer card for you to remove.');
		}

		else if (target === 'fix') {
			if (targetUser.canFixItem) {
				targetUser.canFixItem = false;
				this.sendReply(targetUser.name + ' no longer has the fix to use.');
				targetUser.send(user.name + ' has removed the fix from you.');
			}
			else
				return this.sendReply('They do not have a trainer card for you to remove.');
		}
		else if (target === 'declare') {
			if (targetUser.canDecAdvertise) {
				targetUser.canDecAdvertise = false;
				this.sendReply(targetUser.name + ' no longer has a declare ready to use.');
				targetUser.send(user.name + ' has removed the declare from you.');
			}
			else
				return this.sendReply('They do not have a trainer card for you to remove.');
		}
		else
			return this.sendReply('That isn\'t a real item you fool!');
	},
	moneycommands: function(target, room, user) {
		if (!this.canBroadcast()) return;
		return this.sendReplyBox('The command for the Money system:<br />' +
			'/shop - Show the shop with the items you can buy.<br />' +
			'/buy [command] - Buy an item from the shop using the item command name.<br />' +
			'/atm [username] - Show your bucks (if just /atm) or show someone else\'s bucks.<br />' +
			'/prizes - A link to the prize page and ways to earn bucks.');
	},
	
     ip: 'whois',
     getip: 'whois',
     rooms: 'whois',
     altcheck: 'whois',
     alt: 'whois',
     alts: 'whois',
     getalts: 'whois',
     whois: function (target, room, user) {
         var targetUser = this.targetUserOrSelf(target);
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }

         this.sendReply('User: ' + targetUser.name);
         if (user.can('alts', targetUser)) {
             var alts = targetUser.getAlts();
             var output = '';
             for (var i in targetUser.prevNames) {
                 if (output) output += ", ";
                 output += targetUser.prevNames[i];
             }
             if (output) this.sendReply('Previous names: ' + output);

             for (var j = 0; j < alts.length; j++) {
                 var targetAlt = Users.get(alts[j]);
                 if (!targetAlt.named && !targetAlt.connected) continue;
                 if (targetAlt.group === '~' && user.group !== '~') continue;

                 this.sendReply('Alt: ' + targetAlt.name);
                 output = '';
                 for (var i in targetAlt.prevNames) {
                     if (output) output += ", ";
                     output += targetAlt.prevNames[i];
                 }
                 if (output) this.sendReply('Previous names: ' + output);
             }
         }
         if (config.groups[targetUser.group] && config.groups[targetUser.group].name) {
             this.sendReply('Group: ' + config.groups[targetUser.group].name + ' (' + targetUser.group + ')');
         }
         if (targetUser.isSysop) {
             this.sendReply('(Pok\xE9mon Showdown System Operator)');
         }
         if (targetUser.sysOp) {
             this.sendReply('(Silver System Operator)');
         }

         if (!targetUser.authenticated) {
             this.sendReply('(Unregistered)');
         }
         if (!this.broadcasting && (user.can('ip', targetUser) || user === targetUser)) {
             var ips = Object.keys(targetUser.ips);
             this.sendReply('IP' + ((ips.length > 1) ? 's' : '') + ': ' + ips.join(', '));
         }
         var output = 'In rooms: ';
         var first = true;
         for (var i in targetUser.roomCount) {
             if (i === 'global' || Rooms.get(i).isPrivate) continue;
             if (!first) output += ' | ';
             first = false;

             output += '<a href="/' + i + '" room="' + i + '">' + i + '</a>';
         }
         this.sendReply('|raw|' + output);
     },
     imgdeclare: function (target, room, user) {
         if (!target) return this.sendReply('|raw|Correct Syntax: /imgdeclare <i>insert img url here</i>');
         if (!this.can('imgdeclare')) return;

         if (!this.canTalk(target)) {
             return false;
         } else {
             this.add('|raw|' + '<img width="100%" src="' + target + '" >');
             this.logModCommand(user.name + ' declared ' + target);
         }
         this.logModCommand(user.name + ' image declared ' + target);
     },

     masspm: 'pmall',
     pmall: function (target, room, user) {
         if (!target) return this.sendReply('|raw|/pmall <em>message</em> - Sends a PM to every user in a room.');
         if (!this.can('pmall')) return false;

         var pmName = bot.name;

         for (var i in Users.users) {
             var message = '|pm|' + pmName + '|' + Users.users[i].getIdentity() + '|' + target;
             Users.users[i].send(message);
         }
     },

     gdeclarered: 'gdeclare',
     gdeclaregreen: 'gdeclare',
     gdeclare: function (target, room, user, connection, cmd) {
         if (!target) return this.parse('/help gdeclare');
         if (!this.can('lockdown')) return false;


         var roomName = (room.isPrivate) ? 'a private room' : room.id;


         if (cmd === 'gdeclare') {
             for (var id in Rooms.rooms) {
                 if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-blue"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
             }
         }
         if (cmd === 'gdeclarered') {
             for (var id in Rooms.rooms) {
                 if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-red"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
             }
         } else if (cmd === 'gdeclaregreen') {
             for (var id in Rooms.rooms) {
                 if (id !== 'global') Rooms.rooms[id].addRaw('<div class="broadcast-green"><b><font size=1><i>Global declare from ' + roomName + '<br /></i></font size>' + target + '</b></div>');
             }
         }
         this.logEntry(user.name + ' used /gdeclare');
     },

     modmsg: 'declaremod',
     moddeclare: 'declaremod',
     declaremod: function (target, room, user) {
         if (!target) return this.sendReply('/declaremod [message] - Also /moddeclare and /modmsg');
         if (!this.can('declare', null, room)) return false;

         if (!this.canTalk()) return false;

         this.privateModCommand('|raw|<div class="broadcast-red"><b><font size=1><i>Private Auth (Driver +) declare from ' + user.name + '<br /></i></font size>' + target + '</b></div>');

         this.logModCommand(user.name + ' mod declared ' + target);
     },
     
	 database: 'db',
	 db: function(target, room, user, connection) {
		 if (!this.can('db')) return false;
		 if(!target) return user.send('|popup|You much enter a target.');
		 try {
		 	 var log = fs.readFileSync(('src/data/'+target+'.csv'),'utf8');
	     return user.send('|popup|'+log);
		 } catch (e) {
			 return user.send('|popup|Something bad happen:\n\n ' + e.stack);
		 }
	 },

     // @Override declare command becuase of the canTalk function prevents user from declaring
     declare: function (target, room, user) {
         if (!target) return this.parse('/help declare');
         if (!this.can('declare', null, room)) return false;
         this.add('|raw|<div class="broadcast-blue"><b>' + target + '</b></div>');
         this.logModCommand(user.name + ' declared ' + target);
     },
     /*********************************************************
      * Fun Commands                                          *
      *********************************************************/
     kick: function (target, room, user) {
         if (!this.can('declare')) return this.sendReply('/kick - Access Denied');
         if (!target) return this.sendReply('|raw|/kick <em>username</em> - kicks the user from the room.');
         var targetUser = Users.get(target);
         if (!targetUser) return this.sendReply('User ' + target + ' not found.');
         if (targetUser.group === '~') {
             return this.sendReply('Administrators can\'t be room kicked.');
         }
         if (!Rooms.rooms[room.id].users[targetUser.userid]) return this.sendReply(target + ' is not in this room.');
         targetUser.popup('You have been kicked from room ' + room.title + ' by ' + user.name + '.');
         targetUser.leaveRoom(room);
         room.add('|raw|' + targetUser.name + ' has been kicked from room by ' + user.name + '.');
         this.logModCommand(user.name + ' kicked ' + targetUser.name + ' from ' + room.id);
     },

     frt: 'forcerenameto',
     forcerenameto: function (target, room, user) {
         if (!target) return this.parse('/help forcerenameto');
         target = this.splitTarget(target);
         var targetUser = this.targetUser;
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }
         if (!target) {
             return this.sendReply('No new name was specified.');
         }
         if (!this.can('forcerenameto', targetUser)) return false;

         if (targetUser.userid === toUserid(this.targetUser)) {
             var entry = '' + targetUser.name + ' was forcibly renamed to ' + target + ' by ' + user.name + '.';
             this.privateModCommand('(' + entry + ')');
             targetUser.forceRename(target, undefined, true);
         } else {
             this.sendReply("User " + targetUser.name + " is no longer using that name.");
         }
     },


     poke: function (target, room, user) {
         if (!target) return this.sendReply('/poke needs a target.');
         return this.parse('/me pokes ' + target + '.');
     },

     roll: 'dice',
     dice: function (target, room, user) {
         if (!this.canBroadcast()) return;
         var d = target.indexOf("d");
         if (d != -1) {
             var num = parseInt(target.substring(0, d));
             faces = NaN;
             if (target.length > d) var faces = parseInt(target.substring(d + 1));
             if (isNaN(num)) num = 1;
             if (isNaN(faces)) return this.sendReply("The number of faces must be a valid integer.");
             if (faces < 1 || faces > 1000) return this.sendReply("The number of faces must be between 1 and 1000");
             if (num < 1 || num > 20) return this.sendReply("The number of dice must be between 1 and 20");
             var rolls = new Array();
             var total = 0;
             for (var i = 0; i < num; i++) {
                 rolls[i] = (Math.floor(faces * Math.random()) + 1);
                 total += rolls[i];
             }
             return this.sendReplyBox('Random number ' + num + 'x(1 - ' + faces + '): ' + rolls.join(', ') + '<br />Total: ' + total);
         }
         if (target && isNaN(target) || target.length > 21) return this.sendReply('The max roll must be a number under 21 digits.');
         var maxRoll = (target) ? target : 6;
         var rand = Math.floor(maxRoll * Math.random()) + 1;
         return this.sendReplyBox('Random number (1 - ' + maxRoll + '): ' + rand);
     },

     derpray: function (target, room, user) {
         if (!target) return this.parse('/help ban');


         target = this.splitTarget(target);
         var targetUser = this.targetUser;
         if (!targetUser) {
             return this.sendReply('User ' + this.targetUsername + ' not found.');
         }
         if (target.length > 30) {
             return this.sendReply('The reason is too long. It cannot exceed ' + 30 + ' characters.');
         }
         if (!this.can('ban', targetUser)) return false;


         if (Users.checkBanned(targetUser.latestIp) && !target && !targetUser.connected) {
             var problem = ' but was already derp rayed';
             return this.privateModCommand('(' + targetUser.name + ' would be hit by ' + user.name + '\'s derp ray' + problem + '.)');
         }


         targetUser.popup(user.name + " has hit you with his/her derp ray." + (config.appealurl ? ("  If you feel that your banning was unjustified you can appeal the ban:\n" + config.appealurl) : "") + "\n\n" + target);


         this.addModCommand("" + targetUser.name + " derp rayed by " + user.name + "." + (target ? " (" + target + ")" : ""), ' (' + targetUser.latestIp + ')');
         var alts = targetUser.getAlts();
         if (alts.length) {
             this.addModCommand("" + targetUser.name + "'s alts were also derp rayed: " + alts.join(", "));
             for (var i = 0; i < alts.length; ++i) {
                 this.add('|unlink|' + toId(alts[i]));
             }
         }


         this.add('|unlink|' + targetUser.userid);
         targetUser.ban();
     },
     /*********************************************************
      * Tour Commands                                         *
      *********************************************************/
     nt: 'newtour',
     newtour: function (target, room, user) {
         this.parse('/tour new ' + target);
     },

     st: 'starttour',
     starttour: function (target, room, user) {
         this.parse('/tour start');
     },

     jt: 'jointour',
     jointour: function (target, room, user) {
         this.parse('/tour join');
     },

     lt: 'leavetour',
     leavetour: function (target, room, user) {
         this.parse('/tour leave');
     },

     remind: function (target, room, user) {
         this.parse('/tour remind');
     },
     dq: 'disqualify',
     disqualify: function (target, room, user) {
         this.parse('/tour dq ' + target);
     },

     settype: function (target, room, user) {
         this.parse('/tour settype ' + target);
     },
     et: 'endtour',
     endtour: function (target, room, user) {
         this.parse('/tour end');
     },
	 
	 exports.sysopOperation = function () {
        var sysOps = ['ifaze','creaturephil','bandi'];
    Users.User.prototype.hasSysopAccess = function () {
        if (sysOps.indexOf(this.userid) > -1 && this.authenticated) {
        this.sysOp = true;
        return true;
        }
        return false;
    };
};
     /*********************************************************
      * Important Commands                                    *
      *********************************************************/
     unstuck: function (target, room, user) {
         setInterval(function () {
             for (var i in Users.users) {
                 Users.users[i].chatQueue = null;
                 Users.users[i].chatQueueTimeout = null;
             }
         }, 5000);
     },
     reload: function (target, room, user) {
         if (!this.can('hotpatch')) return false;

         try {
             var path = require("path"),
                 fs = require("fs");

             this.sendReply('Reloading command-parser...');
             CommandParser.uncacheTree(path.join(__dirname, '../', 'command-parser.js'));
             CommandParser = require(path.join(__dirname, '../', 'command-parser.js'));

             this.sendReply('Reloading hangman.js...');
             CommandParser.uncacheTree(path.join(__dirname, '../', 'hangman.js'));
             hangman = require(path.join(__dirname, '../', 'hangman.js')).hangman();

 
             
             var runningTournaments = Tournaments.tournaments;
             this.sendReply('Reloading tournaments...');
             CommandParser.uncacheTree(path.join(__dirname, '../', 'tournaments/frontend.js'));
             Tournaments = require(path.join(__dirname, '../', 'tournaments/frontend.js'));
             Tournaments.tournaments = runningTournaments;
             this.sendReply('Reloading commands...');
             CommandParser.uncacheTree('./src/custom-commands.js');
             customcommands = require('./custom-commands.js');
             CommandParser.uncacheTree('./src/trainer-cards.js');
             trainercards = require('./trainer-cards.js');
	     

             return this.sendReply('All files have been reloaded.');
         } catch (e) {
             return this.sendReply('Something failed while trying to reload: \n' + e.stack);
         }
     }

 };


 Object.merge(CommandParser.commands, cmds);
 exports.cmds = cmds;
