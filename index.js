const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder')
const GoalFollow = goals.GoalFollow

const bot = mineflayer.createBot({
  host: 'YOUR SERVER IP', //EDIT THE IP
  port: 25565, //EDIT THE PORT
  username: 'Technoblade',
});
bot.loadPlugin(pathfinder)

bot.on(`physicTick`, lookAtPlayer)

bot.on('chat', (username, message) => {

  if(message.toLocaleLowerCase() === "follow"){//enable technopet follows player really cutely 
    followPlayer(username)
  }

  if (message.toLocaleLowerCase() === "start") {//start pvp 
    followPlayer(username);
    attackPlayer(username);
  }

  if (message.toLocaleLowerCase() === "technoblade" &&username != bot.username) {//Tehcnoblade
    bot.chat("Technoblade")
  }
})

bot.on('death', async () => {
  bot.chat("HEH HACKS, hypixel pls ban");
})
bot.on('playerJoined', async (player)=>{
  bot.chat("Technoblade");
})
bot.on('playerLeft', async (player)=> {
  bot.chat("Nerd");
})
function lookAtPlayer() {
  const playerFilter = (entity) => entity.type === 'player'
  const playerEntity = bot.nearestEntity(playerFilter)

  if (!playerEntity) return

  const pos = playerEntity.position.offset(0, playerEntity.height, 0)
  bot.lookAt(pos)
}
function followPlayer(username) {
  const player = bot.players[username]
  if (!player || !player.entity) return;

  const mcData = require('minecraft-data')(bot.version)
  const movements = new Movements(bot, mcData)

  bot.pathfinder.setMovements(movements)

  const goal = new GoalFollow(player.entity, 1)
  bot.pathfinder.setGoal(goal, true)
}
function attackPlayer(username) {
  var pvp = setInterval(() => {
    const player = bot.players[username]
    if (!player || !player.entity) {
      clearInterval(pvp);
      if(bot.health > 0 && bot.health <= 3){
        bot.chat("NOT EVEN CLOSE BABY TECHNOBLADE NEVER DIES")
      }
      
      return; 
    }

    const pos = player.entity.position.offset(0, player.entity.height, 0)
    bot.lookAt(pos, true, () => {
      bot.attack(player.entity)
    })
  }, 148.8)
}
