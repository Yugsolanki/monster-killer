const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 12;
const HEAL_VALUE = 15;

let enteredValue = prompt('Maximum life of you and monster.', '100')

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER STRONG ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER HEAL';
const LOG_EVENT_GAMEOVER = 'GAME OVER';

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

let bonusLife = true;

let battleLog = [];

adjustHealthBars(chosenMaxLife); 

function writeToLog(ev, val, playerHealth, monsterHealth) {
  let logEntry;
  
  if (ev === LOG_EVENT_PLAYER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'Monster',
      playerHealth: playerHealth, 
      monsterHealth: monsterHealth
    }
  } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'Monster',
      playerHealth: playerHealth, 
      monsterHealth: monsterHealth
    }
  } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    logEntry = {
      event: ev,
      value: val,
      target: 'Player',
      playerHealth: playerHealth, 
      monsterHealth: monsterHealth
    }
  } else if (ev === LOG_EVENT_PLAYER_HEAL) {
    logEntry = {
      event: ev,
      value: val,
      target: 'Player',
      playerHealth: playerHealth, 
      monsterHealth: monsterHealth
    }
  } else if (ev === LOG_EVENT_GAMEOVER) {
    logEntry = {
      event: ev,
      value: val,
      playerHealth: playerHealth, 
      monsterHealth: monsterHealth
    }
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife)
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  
  writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentPlayerHealth, currentMonsterHealth);
  
  if (currentPlayerHealth <= 0 && bonusLife) {
    bonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('Lucky!!! You got a bonus life.')
  }
  
  
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    
    alert('You Won!!!')
    writeToLog(LOG_EVENT_GAMEOVER, 'Player Won', currentPlayerHealth, currentMonsterHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    
    alert('You Lost😞');
    writeToLog(LOG_EVENT_GAMEOVER, 'Monster Won', currentPlayerHealth, currentMonsterHealth); 
    
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    
    alert('It is a Draw!!!')
    writeToLog(LOG_EVENT_GAMEOVER, 'It was a Draw.', currentPlayerHealth, currentMonsterHealth);
  }
  
  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  let logEvent;
  
  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else {
    maxDamage = STRONG_ATTACK_VALUE
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  
  writeToLog(logEvent, damage, currentPlayerHealth, currentMonsterHealth)
  
  endRound();
}

function attackHandler() {
  attackMonster('ATTACK')
}
function strongAttackHandler() {
  attackMonster();
}

function healHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert('You can only heal upto your max life.')
    healValue = chosenMaxLife - currentPlayerHealth
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  
  writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentPlayerHealth, currentMonsterHealth);
  
  endRound();
}

function printToLog() {
  console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler)
healBtn.addEventListener('click',healHandler);
logBtn.addEventListener('click', printToLog);