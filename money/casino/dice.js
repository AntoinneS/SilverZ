exports.cmds = {
searchdice: function(target, room, user){
if(!target || isNaN(target)){
    return this.sendReply('Please enter a real bet to search for dice.');
}
if(user.searchingdice === true) {
return this.sendReply('You are already searching for a game of dice.');
} else {
this.sendReply('You are now searching for a game of dice.');
user.dicesearch = true;
}
user.dicebet = parseInt(target);
user.diceamount = Math.floor(Math.random*6);
for(var i in Users.users){ 
if(Users.users[i].dicesearch){
Users.users[i].diceamount = Math.floor(Math.random*6);
break;
}
if(user.diceamount > Users.users[i].diceamount) {
  user.popup('You won the game of dice and won ' + user.dicebet + ' coins');
  user.coins += user.dicebet;
  Users.users[i].popup('You lost the the game of dice and lost ' + user.dicebet + ' coins');
  Users.users[i].coins -= Users.users[i].dicebet;
}
}
}
};
