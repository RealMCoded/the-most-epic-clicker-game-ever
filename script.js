//basic clicker game
//made by stuartt_mcoded @ mcoded.xyz

//TODO: Add saving/loading somehow. cookies?
//TODO: Better Item Shop Sorting. Search bar?

const version = "0.1.3.dev"
document.getElementById("ver").innerHTML= `Version ${version}`

//Init "some" SFX
const chaching = new sound('buy.mp3')

var score=0
var angle = 0
var curskn=0
var daman = document.getElementById('img')
var itemsOwned = [null]
var skinsOwned = [null, '0']
var json = {
  "items":[
    {"name":"Click x2", "price":100, "description":"Gives you x2 your current click rate", "requireditem":null},
    {"name":"Click x3", "price":400, "description":"Gives you x3 your current click rate", "requireditem":'0'},
    {"name":"Click x4", "price":500, "description":"Gives you x4 your current click rate", "requireditem":'1'},
    {"name":"Click x5", "price":700, "description":"Gives you x5 your current click rate", "requireditem":'2'},
    {"name":"Click x6", "price":900, "description":"Gives you x6 your current click rate", "requireditem":'3'},
    {"name":"Click x7", "price":1000, "description":"Gives you x7 your current click rate", "requireditem":'4'},
    {"name":"Click x8", "price":1100, "description":"Gives you x8 your current click rate", "requireditem":'5'},
    {"name":"Clicker Buddy - Weak", "price":250, "description":"Hire a buddy to help you click.", "requireditem":null},
    {"name":"Clicker Buddy - Below Average", "price":500, "description":"Hire a buddy to help you click.\nThis also fires your old buddy. Sorry Josh.", "requireditem":null},
    {"name":"Clicker Buddy - Normal", "price":750, "description":"Hire a buddy to help you click.\nThis also fires your old buddy. Sorry James.", "requireditem":null},
    {"name":"Clicker Buddy - Above Average", "price":1000, "description":"Hire a buddy to help you click.\nThis also fires your old buddy, Sorry Mark.", "requireditem":null},
    {"name":"Clicker Buddy - Strong", "price":2763, "description":"Hire a buddy to help you click.\nThis also fires your old buddy. Sorry Thomas.", "requireditem":null},
    //{"name":"Clicker Buddy Multiplication", "price":1500, "description":"Clicker Buddies can use your Click Multiplier!", "requireditem":null},
    //{"name":"Chance - Double Or Nothing", "price":NaN, "description":"50% Chance that you'll get double the points you bet, 50% Chance you loose what you bet.", "requireditem":null} //I'll add this """"""""""later"""""""""""
  ],
  "skins":[
    {"name":"Default", "price":0, "description":"Default smile"},
    {"name":"ASCII Smile", "price":25, "description":":)"},
    {"name":"Space Visor", "price":9500, "description":"plz gift or else blam gribble is my dad and he can banz u!!!!"}
  ]
}

var items = json.items
var skins = json.skins

console.log("STORE ITEMS")
console.table(json.items)

console.log("SKIN ITEMS")
console.table(json.skins)

//UNUSED
//const itemList = ['Auto Clicker', 'Juice']
//const itemPrice = ['12', '1738']
//const items = JSON.parse("")

function loadStore() {
  /*fetch("items.json")
  .then(responce => responce.json())
  .then (data => {var json = JSON.parse(data)})*/ //TODO: get file loading working

  var news = document.getElementsByClassName("shop")[0]; //Easier to define this here than to call this long string every time

  //Repeat until i is equal to the json's size.
  for(var i = 0; i < items.length; i++) {

    let img = document.createElement("img")
    if (UrlExists(`./store/items/${i}.png`)) {img.setAttribute("src",`./store/items/${i}.png`)} else {img.setAttribute("src",`./store/items/missing.png`)}
    img.setAttribute("id",`img_${i}`);
    news.appendChild(img)

    let h5 = document.createElement("h2");
    h5.setAttribute("id",`h5_${i}`);
    //h5.innerHTML = items[i].name + " - " + items[i].price + " Points"; //yuck
    h5.innerHTML = `${items[i].name} - ${items[i].price} Points`;
    news.appendChild(h5);

    let p = document.createElement("p");
    p.setAttribute("id",`p_desc_${i}`);
    p.innerHTML = items[i].description;
    news.appendChild(p);

    if (items[i].requireditem !== null) {
    let p = document.createElement("p");
    p.setAttribute("id",`p_rec_${i}`);
    p.innerHTML = `Required Item: ${items[items[i].requireditem].name}`;
    news.appendChild(p);
    }

    let btn = document.createElement("button");
    btn.innerHTML = "Buy";
    btn.setAttribute("id",`btn_${i}`);
    btn.setAttribute("onclick",`buyitem('${i}');`);
    //btn.name = "formBtn";
    news.appendChild(btn);

    let br = document.createElement("hr")
    br.setAttribute("id",`hr_${i}`);
    news.appendChild(br)

    console.log(`Loaded item ${i}`)
  }
  console.log("Loaded store.")

  //After loading, Remove the placeholder text
  try {
    document.getElementById("storeload").remove()
  } catch { //If failed, put an error
    console.log("Element \"storeload\" was already removed!")
  }
}

//Item Loop (every 50 or so ms)
var itemloop = setInterval(function() {
  console.log("ItemLoopPing!!!")

  if (itemsOwned.includes('11')) {
    score+=100
  } else if (itemsOwned.includes('10')) {
    score+=10
  } else if (itemsOwned.includes('9')) {
    score+=1
  } else if (itemsOwned.includes('8')) {
    score+=0.1
  } else if (itemsOwned.includes('7')) {
    score+=0.01
  }
  document.getElementById("sco").innerHTML= `Score: ${Math.trunc(score)}`
}, 50);

function clickev() {
  document.getElementById("img").addEventListener("mousedown", function() {
    document.getElementById("img").src=`./skin/${curskn}/1.png`
  });
  document.getElementById("img").addEventListener("mouseup", function() {
    document.getElementById("img").src=`./skin/${curskn}/0.png`
  });
  score = score +1
  if (itemsOwned.includes('0')) {
    score = score +1
  }
  if (itemsOwned.includes('1')) {
    score = score +1
  }
  if (itemsOwned.includes('2')) {
    score = score +1
  }
  if (itemsOwned.includes('3')) {
    score = score +1
  }
  if (itemsOwned.includes('4')) {
    score = score +1
  }
  if (itemsOwned.includes('5')) {
    score = score +1
  }
  if (itemsOwned.includes('6')) {
    score = score +1
  }
}

function buyitem(itm) {
  let want = arguments[0] //easier to define it here than call arguments[0] every time lol

  if (confirm("Are you sure you want to buy this item?")){
    if (items[want].price <= score && itemsOwned.includes(items[want].requireditem)) {
      itemsOwned.push(want) //Add it to a list so the game knows you have it
      score = score - items[want].price
      //document.getElementById("sco").innerHTML= `Score: ${score}`

      //Update store to make item out of stock
      document.getElementById(`img_${want}`).remove()
      document.getElementById(`h5_${want}`).remove()
      document.getElementById(`p_desc_${want}`).remove()
      if (items[want].requireditem !== null) {document.getElementById(`p_rec_${want}`).remove()}
      document.getElementById(`btn_${want}`).remove()
      document.getElementById(`hr_${want}`).remove()
      chaching.stop()
      chaching.play()
    } else {
      if (!itemsOwned.includes(items[want].requireditem)) {
        alert(`You need item ${items[items[want].requireditem].name} to get this.`)
      } else {
        var rem = items[want].price - score
        alert(`You don't have enough points!\nYou need ${Math.trunc(rem)} more!`)
      }
    }
  }
}

//Skins code
function loadSkins() {
  /*fetch("items.json")
  .then(responce => responce.json())
  .then (data => {var json = JSON.parse(data)})*/ //TODO: get file loading working

  var news = document.getElementsByClassName("skin")[0]; //Easier to define this here than to call this long string every time

  //Repeat until i is equal to the json's size.
  for(var i = 0; i < skins.length; i++) {

    let img = document.createElement("img")
    if (UrlExists(`./store/skins/${i}.png`)) {img.setAttribute("src",`./store/skins/${i}.png`)} else {img.setAttribute("src",`./store/skins/missing.png`)}
    img.setAttribute("id",`skn_img_${i}`);
    news.appendChild(img)

    let h5 = document.createElement("h2");
    h5.setAttribute("id",`skn_h5_${i}`);
    //h5.innerHTML = items[i].name + " - " + items[i].price + " Points"; //yuck
    h5.innerHTML = `${skins[i].name} - ${skins[i].price} Points`;
    news.appendChild(h5);

    let p = document.createElement("p");
    p.setAttribute("id",`skn_p_desc_${i}`);
    p.innerHTML = skins[i].description;
    news.appendChild(p);

    let btn = document.createElement("button");
    btn.innerHTML = "Buy";
    btn.setAttribute("id",`skn_btn_${i}`);
    btn.setAttribute("onclick",`buyskin('${i}');`);
    //btn.name = "formBtn";
    news.appendChild(btn);

    let br = document.createElement("hr")
    br.setAttribute("id",`skn_hr_${i}`);
    news.appendChild(br)

    console.log(`Loaded skin ${i}`)
  }
  console.log("Loaded skin store.")

  //After loading, Remove the placeholder text
  try {
    document.getElementById("sknload").remove()
  } catch { //If failed, put an error
    console.log("Element \"storeload\" was already removed!")
  }
}

function buyskin(skn) {
  let want = skn //easier to define it here than call arguments[0] every time lol

  if (confirm("Are you sure you want to buy this skin?")){
    if (skins[want].price <= score) {
      skinsOwned.push(want) //Add it to a list so the game knows you have it
      score = score - skins[want].price
      //document.getElementById("sco").innerHTML= `Score: ${score}`

      //Update store to make item out of stock
      //document.getElementById(`img_${want}`).remove()
      //document.getElementById(`h5_${want}`).remove()
      //document.getElementById(`p_desc_${want}`).remove()
      let btn = document.getElementById(`skn_btn_${want}`)
      btn.innerHTML = "Equip";
      btn.setAttribute("onclick",`equipskin('${want}');`);
      //document.getElementById(`hr_${want}`).remove()
      chaching.stop()
      chaching.play()
      equipskin(skn)
    } else {
        var rem = skins[want].price - score
        alert(`You don't have enough points!\nYou need ${Math.trunc(rem)} more!`)
    }
  }
}

function equipskin(skn) {
  //Set old button text to say "Equip
  document.getElementById(`skn_btn_${curskn}`).innerHTML = "Equip"
  document.getElementById(`skn_btn_${curskn}`).disabled = false

  //Set new button text to say "Equipped"
  document.getElementById(`skn_btn_${skn}`).innerHTML = "Equipped";
  document.getElementById(`skn_btn_${skn}`).disabled = true

  curskn = skn
  daman.src=`./skin/${skn}/0.png`
}

//Debug Funct.
function debug(itm) {
  switch (itm) {
    case 0: //Print Items Owned
      console.log(itemsOwned) 
    break;
  }
}

//https://stackoverflow.com/a/3646923
function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

//thx to https://www.w3schools.com/graphics/game_sound.asp 4 this code xoxo
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.stop = function(){
    this.sound.pause();
    this.sound.currentTime = 0;
  }
  this.play = function(){
    this.sound.play();
  }
}

//Rotating man thing. some wise man named "StackOverflow" told me to put this at the bottom of the file.
var rotclock = setInterval(function() {
  if (angle > 359) {angle = 0}
  angle = angle + 1
  document.getElementById('img').style.transform = `rotate(${angle}deg)`;
}, 50);