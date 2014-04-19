var settings = money.settings.casino.roulette;
var roomroul = {
	color: undefined,
	players: [],
	host: undefined,
	winners, [],
	started: true
	}

var roul = {
	multibet: settings.multibet,
	multicolor: setttings.multicolor,
        isOn: settings.isOn,
	hosts: settings.hosts,
	rooms: settings.rooms,
	colors: ['red','yellow','green','black','orange'],
	start: function(room, user, r, roul) {
	r = Object.create(roomroul);
	var mb = 'on';
	var mc = 'on';
	if(!r.multibet) {
          mb = 'off';
	}
	if(!r.multicolor) {
	  mc = 'off;	
	} 
	r = Object.create(roomroul);
	r.isOn = true;
	r.host = user.name;
	if(roul.multicolors) {
	r.color = r.colors[Math.floor(Math.random()*roul.colors.length)];
	} 
	else {
	r.color = roul.colors[Math.floor(Math.random()*2)];	
	}
	room.add(user.name + ' has started a Roulette. The roulette rules are: Multiple Colors(more than 2 colors): ' + mc + 'Multiple Bets(place more than one bet): ' + mb + '.');
	}
	end: function(r) {
	r = {
	color: undefined,
	players: [],
	host: undefined,
	winners, [],
	started: false
	}
	};
exports.cmds = {
    roulette: 'roul',
    startroulette: 'roul',
    roul: function(target, room, user) {  
	if (!money.settings.Ops.indexOf(user.userid) || !roul.hosts.indexOf(user.userid)) { 
	   return this.sendReply('You must be a host to start a roulette. To become a host become a well known gambler and contribute to the casino chat.');
	}
	if (roul[room.id].isOn === true) {
	   return this.sendReply('There is already a roulette on.');
	}
	else {
	   roul.start(room,user,target,roul[room.id],roul);
	}
},

    bet: function(target, room, user) {
        
    if (!room[[room.id].isOn) { 
    	return this.sendReply('There is no roulette game running in this room.');
    }
        targets = target.split(',');
        target = toId(targets[0]);
        var colors = roul.colors;
        if(!roul.multicolor) {
        colors = ['red','yellow'];
        }
    if (colors.indexOf(target) === -1){ 
    	return this.sendReply(target + ' is not a valid color. The colors are ' + colors.toString);
    }
    if (targets[1]) {
    	var times = parseInt(toId(targets[1]));
    	if (!isNaN(times) && times > 0) {
    		if(!roul.multibet && times>5) {
    			return this.sendReply('You can only bet five times because the multibet format is off.');
    		}
    		if (user.tkts < times) return this.sendReply('You do not have enough tickets!')
    		user.bets += times;
    		user.tickets -= times;
    		user.bet = target;
    	} else {
    		return this.sendReply('That is an invalid amount of bets!');
    	}
    } else {
    	if(!roul.multibet && times>5) {
    			return this.sendReply('You can only bet five times because the multibet format is off.');
    		}
    	if (user.tkts < 1) { 
    		return this.sendReply('You do not even have a ticket.);
    	}
    	else {
    		user.bets += 1;
    		user.tkts -= 1;
    		user.bet = target;
    	}
    }
    if (!roul.players.indexOf(user.userid] > -1) roul.players.push[user.userid];
    return this.sendReply('You are currently betting ' + user.bets + ' times to ' + target);
    
},

    spin: function(target, room, user) {
    
    if (!money.settings.Ops.indexOf(user.userid) || !roul.hosts.indexOf(user.userid)) return this.sendReply('You are not authorized to do that!.');
    if (!roul[room.id].isOn) return this.sendReply('There is no roulette game currently.');
    if (rou[room.id].players.length === 0) return this.sendReply('Nobody has made bets in this game');
    var landon = Math.random();
    var color = roul[room.id].color;
    var winners = roul[room.id].winners;
    var totalwin = [];
    
    for (var i=0; i < roul[room.id].players.length ; i++) {
        var loopuser = Users.get(roul[room.id].players[i]);
        var loopchoice = '';
        if (loopuser) {
            loopchoice = loopuser.bet;
            if (loopchoice === color) winners.push(loopuser.userid);
        } else {
            continue;
        }
    }

    if (winners.length === 0) {
        for (var i=0; i < roul[room.id].players.length; i++) {
            var loopuser = Users.get(roul[room.id].players[i]);
            if (loopuser) {
                loopuser.bet = null;
                loopuser.bets = 0;
            }
        }
        return room.addRaw('Nobody won this time');
    }
    
    var perbetwin = 0;

    switch(color) {
        case "red": perbetwin = 100; break;
        case "yellow": perbetwin = 100; break;
        case "green": perbetwin = 300; break;
        case "black": perbetwin = 1000; break;
        default: perbetwin = 300;
    }

    for (var i=0; i < winners.length ; i++) {
        loopwinner = Users.get(winners[i]);
        totalwin[i] = perbetwin * loopwinner.bets;
        loopwinner.coins += totalwin[i];
        money.save(loopwinner);
    }

    for (var i=0; i < roul[room.id].players.length; i++) {
        var loopuser = Users.get(roul[room.id].players[i]);
        if (loopuser) {
            loopuser.bet = null;
            loopuser.bets = 0;
        }
    }
    if (winners.length === 1) {
    	room.addRaw('The roulette landed on ' + color + '. The only winner was ' + winners[0] + ', who won the sum of '+p+ totalwin[0] + '.');
    } else if (winners.length) {
    	room.addRaw('The roulette landed on ' + color + '. Winners: ' + winners.toString() + '. They won, respectively, '+p+ totalwin.toString() + '.');
    } else {
    	room.addRaw('The roulette landed on ' + color + '. Nobody won this time.');
    }
    roul.end(roul[room.id]);
},
};
