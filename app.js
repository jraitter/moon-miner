// definitions begin here
let cheeseCount = 0;

let cheeseCountElem = document.getElementById("cheese-count");
let numPickaxeElem = document.getElementById("pickaxe-mods");
let numShovelElem = document.getElementById("shovel-mods");
let numRoverElem = document.getElementById("rover-mods");
let numTruckElem = document.getElementById("truck-mods");
let totalClickModsElem = document.getElementById("total-click-mods");
let totalAutoModsElem = document.getElementById("total-auto-mods");
let pickaxePriceElem = document.getElementById("pickaxe-price");
let shovelPriceElem = document.getElementById("shovel-price");
let roverPriceElem = document.getElementById("rover-price");
let truckPriceElem = document.getElementById("truck-price");

let clickUpgrades = {
  pickaxe: { price: 100, quantity: 0, multiplier: 1, strength: 0 },
  shovel: { price: 200, quantity: 0, multiplier: 5, strength: 0 }
};

let autoUpgrades = {
  rover: { price: 600, quantity: 0, multiplier: 20, strength: 0 },
  truck: { price: 800, quantity: 0, multiplier: 50, strength: 0 }
};

// functions begin here
function mine() {
  cheeseCount += addClickModifiers();
  updateGame();
}

function buyClickModifier(modifier) {
  console.log("buying a click mod ", modifier);
  let purchasePrice = clickUpgrades[modifier].price;
  let tmpEntry = clickUpgrades[modifier];

  if (cheeseCount >= purchasePrice) {
    cheeseCount -= purchasePrice;
    tmpEntry.price += 50;
    tmpEntry.quantity += 1;
    tmpEntry.strength = tmpEntry.quantity * tmpEntry.multiplier;
  }
  updateGame();
}
function buyAutoModifier(modifier) {
  console.log("buying an auto mod ", modifier);
  let purchasePrice = autoUpgrades[modifier].price;
  let tmpEntry = autoUpgrades[modifier];
  if (cheeseCount >= purchasePrice) {
    cheeseCount -= purchasePrice;
    tmpEntry.price += 100;
    tmpEntry.quantity += 1;
    tmpEntry.strength = tmpEntry.quantity * tmpEntry.multiplier;

  }
  updateGame();
}

function addClickModifiers() {
  let modTotal = 1;
  let keys = Object.keys(clickUpgrades);
  for (let i = 0; i < keys.length; i++)
    modTotal += parseInt(clickUpgrades[keys[i]].strength);
  return modTotal;
}

function addAutoModifiers() {
  let modTotal = 0;
  let keys = Object.keys(autoUpgrades);
  for (let i = 0; i < keys.length; i++)
    modTotal += parseInt(autoUpgrades[keys[i]].strength);
  return modTotal;
}

function checkButtonStatus() {
  if (cheeseCount >= clickUpgrades.pickaxe.price) {
    // enable pickaxe button
    disableButton("pickaxe-btn", false);
  } else {
    disableButton("pickaxe-btn", true);
  }
  if (cheeseCount >= clickUpgrades.shovel.price) {
    // enable shovel button
    disableButton("shovel-btn", false);
  } else {
    disableButton("shovel-btn", true);
  }
  if (cheeseCount >= autoUpgrades.rover.price) {
    // enable rover button
    disableButton("rover-btn", false);
  } else {
    disableButton("rover-btn", true);
  }
  if (cheeseCount >= autoUpgrades.truck.price) {
    // enable truck button
    disableButton("truck-btn", false);
  } else {
    disableButton("truck-btn", true);
  }
  if (cheeseCount >= 5000) {
    // set alert and stop interval timer
    gameAlerts("game-over")
    clearInterval(intervalID);
    cheeseCount = 5000;
  }
}

function gameAlerts(trigger) {
  switch (trigger) {
    case "truck":
      swal("Good job!", "You can now purchase a truck", "success");
      break;
    case "game-over":
      swal("Game Over!", "You have mined all the cheese off the moon, refresh page to start over.", "success");
      break;
    default:
      swal("Problem", "gameAlerts funcion called with invalid parameter", "warning")
  }

}

function disableButton(btnID, bool) {
  document.getElementById(btnID).disabled = bool;
}

function collectAutoUpgrades() {
  cheeseCount += addAutoModifiers();
  updateGame();
}

let intervalID = setInterval(collectAutoUpgrades, 3000);

function updateGame() {
  checkButtonStatus();
  cheeseCountElem.innerText = cheeseCount.toString();
  numPickaxeElem.innerText = clickUpgrades.pickaxe.quantity.toString();
  numShovelElem.innerText = clickUpgrades.shovel.quantity.toString();
  numRoverElem.innerText = autoUpgrades.rover.quantity.toString();
  numTruckElem.innerText = autoUpgrades.truck.quantity.toString();
  pickaxePriceElem.innerText = clickUpgrades.pickaxe.price.toString();
  shovelPriceElem.innerText = clickUpgrades.shovel.price.toString();
  roverPriceElem.innerText = autoUpgrades.rover.price.toString();
  truckPriceElem.innerText = autoUpgrades.truck.price.toString();
  totalClickModsElem.innerText = addClickModifiers().toString();
  totalAutoModsElem.innerText = addAutoModifiers().toString();
}
updateGame();