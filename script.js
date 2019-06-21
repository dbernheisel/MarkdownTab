
// FUNCTIONS THAT MAKE SHIT HAPPEN
function convert() {
  var converter = new showdown.Converter(),
      text      = document.getElementById("inputtext").value,
      html      = converter.makeHtml(text);


  document.getElementById('markdowntext').innerHTML = html;
}

function togglewindow(){
  var elem = document.getElementById("togglebutton");

  if (elem.value==="<") { elem.value = "Edit"; }
  else elem.value = "<";

  document.getElementById("input").classList.toggle("close");
  document.getElementById("output").classList.toggle("expand");
  document.getElementById("markdowntext").classList.toggle("expandtext");
}

// LISTENERS THAT ARE WAITING FOR SOMETHING TO HAPPEN
document.getElementById("togglebutton").onclick = function(){
  togglewindow();
};

window.addEventListener('keyup',function(e){ convert(); },true);

window.addEventListener("load", function(e){
  // GET TEXT FROM GOOGLE SYNC STORAGE
  chrome.storage.sync.get(['key'], function(result) {
    if(result.key != undefined){
      document.getElementById('inputtext').innerHTML = result.key;
      convert();
    }
    else {
      var text = `# Hello Markdown Tab
### A *Markdown* page that comes up __everytime__ we open a new tab

Useful for taking notes, keeping lists, saving links, or to be reminded of pictures or quotes.

John Gruber and Aaron Swartz created the Markdown language in 2004. Its key design goal is readability. That the language be readable as-is, without looking like it has been marked up with tags or formatting instructions, unlike text formatted with a markup language, such as Rich Text Format (RTF) or HTML, which have obvious tags and formatting instructions. [More Info.](https://en.wikipedia.org/wiki/Markdown)

### Example To Do List:
- Look up how to make a Chrome Extension
- Get supplies on [Amazon](http://www.amazon.com)
- Find video on how to do the Floss Dance.

You can learn how to use markdown [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), and edit this page by clicking "Edit" on the top left.

> Special thanks to Devyn and Estevai for creating [Showdown](https://github.com/showdownjs/showdown) which translates markdown to html using javascript, and to [Mihir](https://github.com/plibither8) for inspiring the project. Colors were grabbed from [Atom](https://atom.io/) code editor.
- Michael.

---

![Pokemon](https://media3.giphy.com/media/1342dTzTKIkbC0/giphy.gif?cid=790b76115d0d0a7872327a6e6307d86c&rid=giphy.gif)`;
      document.getElementById('inputtext').innerHTML = text;
      convert();
    }
  });
}, false);


// ---
// GOOGLE SYNC SAVE
// ---

// SAVE TEXT ON GOOGLE SYNC STORAGE
window.addEventListener("unload", function(e){
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
