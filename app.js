let cheeseCount = 500;
let clickModifiers = [];
let autoModifiers = [];

let cheeseCountElem = document.getElementById("cheese-count");
let clickModsElem = document.getElementById("click-mods");
let pickaxePriceElem = document.getElementById("pickaxe-price");
let shovelPriceElem = document.getElementById("shovel-price");



let clickUpgrades = {
  pickaxe: { price: 100, quantity: 0, multiplier: 1 },
  shovel: { price: 200, quantity: 0, multiplier: 5 }
};

let automaticUpgrades = {
  rovers: { price: 600, quantity: 0, multiplier: 20 },
  truck: { price: 800, quantity: 0, multiplier: 50 }
};


function mine() {
  cheeseCount++;
  console.log(cheeseCount);
  updateGame();
}

function buyClickModifier(modifier) {
  console.log("buying a ", modifier);
  let purchasePrice = clickUpgrades[modifier].price;
  if (cheeseCount >= purchasePrice) {
    cheeseCount -= purchasePrice;
    clickModifiers.push(modifier);
    clickUpgrades[modifier].price += 100;
    clickUpgrades[modifier].quantity += 1;
  }
  console.log(clickModifiers)
  console.log(clickUpgrades)
  updateGame();
}

function getClickMods() {
  let itemsString = "";
  for (let i = 0; i < clickModifiers.length; i++) {
    itemsString += clickModifiers[i] + ", ";
  }
  return itemsString;
}


function updateGame() {
  cheeseCountElem.innerText = cheeseCount.toString();
  clickModsElem.innerText = getClickMods();
  pickaxePriceElem.innerText = clickUpgrades.pickaxe.price.toString();
  shovelPriceElem.innerText = clickUpgrades.shovel.price.toString();

}


updateGame();