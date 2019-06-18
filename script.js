
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
    if(result.key != undefined){
      document.getElementById('inputtext').innerHTML = result.key;
      convert();
    }
    else {
      var text = `
# Hello MarkdownTab
## This is a subtitle

Markdown is a lightweight markup language with plain text formatting syntax. John Gruber created the Markdown language in 2004 in collaboration with Aaron Swartz on the syntax. Its key design goal is readability – that the language be readable as-is, without looking like it has been marked up with tags or formatting instructions, unlike text formatted with a markup language, such as Rich Text Format (RTF) or HTML, which have obvious tags and formatting instructions. [More Info.](https://en.wikipedia.org/wiki/Markdown)

- something
- something else
- something nice

You can learn how to use markdown at [this](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) link.

---

![Fight Club](https://media3.giphy.com/media/YPF8N1ARFOE6c/giphy.gif?cid=790b76115d06317530676d326bcae53d&rid=giphy.gif)
      `;
      document.getElementById('inputtext').innerHTML = text;
      convert();
    }
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
