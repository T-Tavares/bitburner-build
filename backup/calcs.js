const currentMoney = 128_000_000_000; // current
const goalMoney = 160_000_000_000; // goal
const leftTo = goalMoney - currentMoney;

const hacknetMoneyPerSec = 222_000;
const hourInSec = 60 * 60;
const hacknetMoneyPerHour = hourInSec * hacknetMoneyPerSec;
const hoursToGoal = leftTo / hacknetMoneyPerHour;

console.log(`Hacknet Production per hour: ${hacknetMoneyPerHour}`);
console.log(`Hours Left to reach Money Goal: ${hoursToGoal}`);
