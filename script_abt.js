
var rotclock = setInterval(function() {
    var angle = getRandomInt(360)
    document.getElementById('img').style.transform = `rotate(${angle}deg)`;
}, 50);

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  