// definitions begin here
let cheeseCount = 75;
let totalClickAdvantage = 0;
let clickModifiers = [];
let autoModifiers = [];

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
  pickaxe: { price: 100, quantity: 0, multiplier: 1 },
  shovel: { price: 200, quantity: 0, multiplier: 5 }
};

let autoUpgrades = {
  rover: { price: 600, quantity: 0, multiplier: 20 },
  truck: { price: 800, quantity: 0, multiplier: 50 }
};

// functions begin here
function mine() {
  cheeseCount += addClickModifiers();
  updateGame();
}

function buyClickModifier(modifier) {
  console.log("buying a click mod ", modifier);
  let purchasePrice = clickUpgrades[modifier].price;
  if (cheeseCount >= purchasePrice) {
    cheeseCount -= purchasePrice;
    clickModifiers.push(modifier);
    clickUpgrades[modifier].price += 100;
    clickUpgrades[modifier].quantity += 1;
  }
  updateGame();
}
function buyAutoModifier(modifier) {
  console.log("buying an auto mod ", modifier);
  let purchasePrice = autoUpgrades[modifier].price;
  if (cheeseCount >= purchasePrice) {
    cheeseCount -= purchasePrice;
    autoModifiers.push(modifier);
    autoUpgrades[modifier].price += 100;
    autoUpgrades[modifier].quantity += 1;
  }
  updateGame();
}

function getClickMods() {
  let itemsString = "";
  for (let i = 0; i < clickModifiers.length; i++) {
    itemsString += clickModifiers[i] + ", ";
  }
  return itemsString;
}

function getAutoMods() {
  let itemsString = "";
  for (let i = 0; i < autoModifiers.length; i++) {
    itemsString += autoModifiers[i] + ", ";
  }
  return itemsString;
}

function addClickModifiers() {
  let modTotal = 1;
  for (let i = 0; i < clickModifiers.length; i++)
    modTotal += clickUpgrades[clickModifiers[i]].multiplier;
  return modTotal;
}

function addAutoModifiers() {
  let modTotal = 0;
  for (let i = 0; i < autoModifiers.length; i++)
    modTotal += autoUpgrades[autoModifiers[i]].multiplier;
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