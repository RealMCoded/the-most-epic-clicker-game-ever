/*
  _   _                                _                _             _ _      _                                                                _ _ _ 
 | | | |                              | |              (_)           | (_)    | |                                                              | | | |
 | |_| |__   ___   _ __ ___   ___  ___| |_    ___ _ __  _  ___    ___| |_  ___| | _____ _ __    __ _  __ _ _ __ ___   ___    _____   _____ _ __| | | |
 | __| '_ \ / _ \ | '_ ` _ \ / _ \/ __| __|  / _ \ '_ \| |/ __|  / __| | |/ __| |/ / _ \ '__|  / _` |/ _` | '_ ` _ \ / _ \  / _ \ \ / / _ \ '__| | | |
 | |_| | | |  __/ | | | | | | (_) \__ \ |_  |  __/ |_) | | (__  | (__| | | (__|   <  __/ |    | (_| | (_| | | | | | |  __/ |  __/\ V /  __/ |  |_|_|_|
  \__|_| |_|\___| |_| |_| |_|\___/|___/\__|  \___| .__/|_|\___|  \___|_|_|\___|_|\_\___|_|     \__, |\__,_|_| |_| |_|\___|  \___| \_/ \___|_|  (_|_|_)
                                                 | |                                            __/ |                                                 
                                                 |_|                                           |___/                                                  

  Created by stuartt_mcoded @ mcoded.xyz
  Official site: https://realmcoded.github.io/the-most-epic-clicker-game-ever/
  Source code: https://github.com/RealMCoded/the-most-epic-clicker-game-ever
*/

/*
stu's todo list o' shit:

- Add saving/loading somehow. cookies?
- Better Item Shop Sorting. Search bar?
- figure out how to load items from an external file.
- clickev(): Re-do how auto clicker is done for Clicker Buddy Multiplication
- how tf would i do Chance - Double Or Nothing
- UrlExists(): async xmlhttprequest request?
*/

//Set Version
const version = "0.1.4"
document.getElementById("ver").innerHTML= `Version ${version}`

//Init "some" SFX
const chaching = new sound('buy.mp3')

//Global events (date, other stuff later)
const d = new Date(); //d for date
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) //Check for mobile device

// Init other stuff
var score=0
var angle = 0
var curskn=0
var level = 0
var levelprogres=0
var daman = document.getElementById('img')
var itemsOwned = [null]
var skinsOwned = [null, '0']

//Item Listing
var json = {
  "items":[
    {"name":"Click x2", "price":100, "description":"Gives you x2 your current click rate", "requireditem":null},
    {"name":"Click x3", "price":300, "description":"Gives you x3 your current click rate", "requireditem":'0'},
    {"name":"Click x4", "price":500, "description":"Gives you x4 your current click rate", "requireditem":'1'},
    {"name":"Click x5", "price":700, "description":"Gives you x5 your current click rate", "requireditem":'2'},
    {"name":"Click x6", "price":900, "description":"Gives you x6 your current click rate", "requireditem":'3'},
    {"name":"Click x7", "price":1100, "description":"Gives you x7 your current click rate", "requireditem":'4'},
    {"name":"Click x8", "price":1300, "description":"Gives you x8 your current click rate", "requireditem":'5'},
    {"name":"Clicker Buddy - Weak", "price":250, "description":"Hire a buddy to help you click.", "requireditem":null},
    {"name":"Clicker Buddy - Below Average", "price":500, "description":"Hire a buddy to help you click.\nThis also fires your old buddy. Sorry Josh.", "requireditem":null},
    {"name":"Clicker Buddy - Normal", "price":750, "description":"Hire a buddy to help you click.\nThis also fires your old buddy. Sorry James.", "requireditem":null},
    {"name":"Clicker Buddy - Above Average", "price":1000, "description":"Hire a buddy to help you click.\nThis also fires your old buddy, Sorry Mark.", "requireditem":null},
    {"name":"Clicker Buddy - Strong", "price":2763, "description":"Hire a buddy to help you click.\nThis also fires your old buddy. Sorry Thomas.", "requireditem":null},
    {"name":"x2 your Current Score - One time use", "price":0, "description":"Double your current score by 2.<br>The catch is you can <b>only use it once</b>.", "requireditem":null},
    //{"name":"Clicker Buddy Multiplication", "price":1500, "description":"Clicker Buddies can use your Click Multiplier!", "requireditem":null},
    //{"name":"Chance - Double Or Nothing", "price":0, "description":"50% Chance that you'll get double what you bet, 50% Chance you loose what you bet.", "requireditem":null},
  ],
  "skins":[
    {"name":"Default", "price":0, "description":"Default smile"},
    {"name":"ASCII Smile", "price":25, "description":":)"},
    {"name":"Default but cooler", "price":125, "description":"b sides"},
    {"name":"Moden", "price":225, "description":"Clean & Simplistic"},
    {"name":"Event - Christmas", "price":0, "description":"Only available from 11/25 to 01/01!<br>Christmas! Just a week away!"},
  ]
}
var items = json.items
var skins = json.skins

//Print out store items
console.log("STORE ITEMS")
console.table(json.items)

console.log("SKIN ITEMS")
console.table(json.skins)

scaleToMobile()

//Start of Item Related Code
function loadStore() {

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

      //Buy Events
      if (want == 12) {
        score = score*2
      }
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
//End of Item Related Code

//Start of Skin Related Code
function loadSkins() {

  var news = document.getElementsByClassName("skin")[0]; //Easier to define this here than to call this long string every time

  //Repeat until i is equal to the json's size.
  for(var i = 0; i < skins.length; i++) {

    let img = document.createElement("img")
    if (UrlExists(`./store/skins/${i}.png`)) {img.setAttribute("src",`./store/skins/${i}.png`)} else {img.setAttribute("src",`./store/skins/missing.png`)}
    img.setAttribute("id",`skn_img_${i}`);
    news.appendChild(img)

    let h5 = document.createElement("h2");
    h5.setAttribute("id",`skn_h5_${i}`);
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

  //Change Default skin to "Owned"
  let btn = document.getElementById(`skn_btn_0`)
  btn.innerHTML = "Equipped";
  btn.disabled = true
  btn.setAttribute("onclick",`equipskin('0');`);

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

      let btn = document.getElementById(`skn_btn_${want}`)
      btn.innerHTML = "Equip";
      btn.setAttribute("onclick",`equipskin('${want}');`);
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
  //Set old button text to say "Equip"
  document.getElementById(`skn_btn_${curskn}`).innerHTML = "Equip"
  document.getElementById(`skn_btn_${curskn}`).disabled = false

  //Set new button text to say "Equipped"
  document.getElementById(`skn_btn_${skn}`).innerHTML = "Equipped";
  document.getElementById(`skn_btn_${skn}`).disabled = true

  curskn = skn
  daman.src=`./skin/${skn}/0.png`

  //Skin Events

  //Reset to normal
  document.body.style.background = "#FFFFFF";
  document.getElementById("dabase").style.color = "black";
  document.body.style.fontFamily = ""

  //Events
  if (skn == 4) { //Seasonal
    document.body.style.background = "#00137F url('./skin/4/bg.png')";
    document.getElementById("dabase").style.color = "white";
  } else if (skn == 3) { //Modern
    document.body.style.fontFamily = "Calibri, sans-serif"
  }
  scaleToMobile()
}
//End of Skin Related Code

//Add click anim if on desktop
if (!isMobile) {
  daman.addEventListener("mousedown", function() {
    daman.src=`./skin/${curskn}/1.png`
  });
  daman.addEventListener("mouseup", function() {
    daman.src=`./skin/${curskn}/0.png`
  });
}

//Click Event Code
function clickev() {
  score = score +1
  levelprogres++

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

//Other Scripts

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

//Rotating man thing.
var rotclock = setInterval(function() {
  if (angle > 359) {angle = 0}
  angle = angle + 1
  daman.style.transform = `rotate(${angle}deg)`;
}, 50);

//Scale things if mobile
function scaleToMobile(){
  if (isMobile) {
    if (curskn == 3){
      daman.style.height = `240px`
      daman.style.width = `240px`
    } else if (curskn == 4){
      daman.style.width = `236px`
      daman.style.height = `236px`
    } else {
      daman.style.height = `160px`
      daman.style.width = `236px`
    }
  }
}

//DEBUG STUFF
function debug() {
  let arg = arguments[0]

  if (arg == "forceMobile"){
    isMobile = true
    scaleToMobile()
  }
}