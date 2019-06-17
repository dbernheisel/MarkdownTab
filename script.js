
// FUNCTIONS THAT MAKE SHIT HAPPEN
function convert() {
          var converter = new showdown.Converter(),
              text      = document.getElementById("inputtext").value,
              html      = converter.makeHtml(text);


          document.getElementById('markdowntext').innerHTML = html;
}

function togglewindow(){
  var elem = document.getElementById("togglebutton");

    if (elem.value==="<") {
      elem.value = ">";
    }
    else elem.value = "<";


  document.getElementById("input").classList.toggle("close");
  document.getElementById("output").classList.toggle("expand");
  document.getElementById("markdowntext").classList.toggle("expandtext");
}

// LISTENERS THAT ARE WAITING FOR SOMETHING TO HAPPEN

window.addEventListener('keyup',function(e){
  convert();
},true);


document.getElementById("togglebutton").onclick = function(){
  togglewindow();
};

window.addEventListener("load", function(e){
  // GET TEXT FROM GOOGLE SYNC STORAGE
  chrome.storage.sync.get(['key'], function(result) {
    document.getElementById('inputtext').innerHTML = result.key;
    convert();
  });
}, false);

window.addEventListener("unload", function(e){
  // SAVE TEXT ON GOOGLE SYNC STORAGE
  var value = document.getElementById("inputtext").value;
  chrome.storage.sync.set({key: value});
}, false);

// THIS FUNCTION SAVES TO GOOGLE EVERY SECOND
var timer = null;
window.addEventListener('keyup',function(e){
  clearTimeout(timer);
  timer = setTimeout(savetoGoogle, 1000)
});

function savetoGoogle() {
  console.log("Calling google");
  // SAVE TEXT ON GOOGLE SYNC STORAGE
  var value = document.getElementById("inputtext").value;
  chrome.storage.sync.set({key: value});
  // GET TEXT FROM GOOGLE SYNC STORAGE
  chrome.storage.sync.get(['key'], function(result) {
    document.getElementById('inputtext').innerHTML = result.key;
    convert();
  });
}

togglewindow();
