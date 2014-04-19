				function setAvatar(data, self) {
				    var line = data.split('\n');
				    for (var u in line) {
				        var row = line[u].split(',');
				        if (row[0] == self.userid) {
				            self.avatar = row[1];
				            break;
				        }
				    }
				    return self.avatar;
				}

				function getAv(user) {
				    delete user.avatar;
				    avatar = fs.readFile('config/avatars.csv', 'utf8', function read(err, data) {
				        if (err) data = '';
				        return setAvatar(data, user);
				    });
				    if (config.customavatars[user.userid]) {
				        return config.customavatars[user.userid];
				    }
				    if(avatar) { 
				    	user.avatar = avatar;
				    	return user.avatar
				    }
				    else {
				        var trainersprites = [1, 2, 101, 102, 169, 170, 265, 266];
				        var avatar = trainersprites[Math.floor(Math.random() * trainersprites.length)];
				        return avatar;
				    }
				}
				exports.edits = function () {
				    global.today = new Date();
				    global.spamphase = 0;
				    Users.User.prototype.bp = 0;
				    Users.User.prototype.money = 0;
				    Users.User.prototype.coins = 0;
				    Users.User.prototype.tkts = 0;
				    Users.User.prototype.avatar = getAv(this);
				    Users.User.prototype.numMessages = 0;
				    Users.User.prototype.warnCounters = 0;
				    Users.User.prototype.o3omessagetime = today.getMinutes();
				    Users.User.prototype.twitchChat = true;
				    var path = require('path');
				    //global.money = require(path.join(__dirname, '../', 'money/money.js')).money();
				};
				Rooms.BattleRoom.prototype.botsupported = true;
				Rooms.ChatRoom.prototype.botsupported = false;
				Rooms.rooms.lobby.botsupported = true;
