// definitions begin here
let cheeseCount = 2000;
let totalClickAdvantage = 0;
let clickModifiers = [];
let autoModifiers = [];

let cheeseCountElem = document.getElementById("cheese-count");
let clickModsElem = document.getElementById("click-mods");
let autoModsElem = document.getElementById("auto-mods");
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
  console.log("ClickModTotal ", modTotal);
  return modTotal;
}
function addAutoModifiers() {
  let modTotal = 0;
  for (let i = 0; i < autoModifiers.length; i++)
    modTotal += autoUpgrades[autoModifiers[i]].multiplier;
  console.log("autoModTotal ", modTotal);
  return modTotal;
}

function collectAutoUpgrades() {
  cheeseCount += addAutoModifiers();
  updateGame();
}

setInterval(collectAutoUpgrades, 3000);

function updateGame() {
  cheeseCountElem.innerText = cheeseCount.toString();
  clickModsElem.innerText = getClickMods();
  autoModsElem.innerText = getAutoMods();
  pickaxePriceElem.innerText = clickUpgrades.pickaxe.price.toString();
  shovelPriceElem.innerText = clickUpgrades.shovel.price.toString();
  roverPriceElem.innerText = autoUpgrades.rover.price.toString();
  truckPriceElem.innerText = autoUpgrades.truck.price.toString();
  totalClickModsElem.innerText = addClickModifiers().toString();
  totalAutoModsElem.innerText = addAutoModifiers().toString();
}

updateGame();