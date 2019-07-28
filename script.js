
window.addEventListener("load", getInfo);
document.getElementById('inputtext').addEventListener('keyup',convert);
document.getElementById("togglebutton").onclick = ()=>togglewindow();


function getInfo(){
  try{
    chrome.storage.sync.get(['key'], (result) => document.getElementById('inputtext').innerHTML = result.key);
  }
  catch{
    var text = `
# Hello Markdown Tab
### A *Markdown* page that comes up __everytime__ we open a new tab

Useful for taking notes, keeping lists, saving links, or to be reminded of pictures or quotes.

John Gruber and Aaron Swartz created the Markdown language in 2004. Its key design goal is readability. That the language be readable as-is, without looking like it has been marked up with tags or formatting instructions, unlike text formatted with a markup language, such as Rich Text Format (RTF) or HTML, which have obvious tags and formatting instructions. [More Info.](https://en.wikipedia.org/wiki/Markdown)

### Example To Do List:
- Look up how to make a Chrome Extension
- Get supplies on [Amazon](http://www.amazon.com)
- Find video on how to do the Floss Dance.

You can learn how to use markdown [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet), and edit this page by clicking "Edit" on the top left.

> Special thanks to Devyn and Estevai for creating [Showdown](https://github.com/showdownjs/showdown) which translates markdown to html using javascript, and to [Mihir](https://github.com/plibither8) for inspiring the project. Colors were grabbed from [Atom](https://atom.io/).
- Michael.

---

![Pokemon](https://media3.giphy.com/media/1342dTzTKIkbC0/giphy.gif?cid=790b76115d0d0a7872327a6e6307d86c&rid=giphy.gif)
    `;
    document.getElementById('inputtext').innerHTML = text;
  } // catch end
  convert();
} // function end

function convert() {
  let converter = new showdown.Converter(),
      text      = document.getElementById("inputtext").value,
      html      = converter.makeHtml(text);

  document.getElementById('markdowntext').innerHTML = html;
}

function togglewindow(){
  const elem = document.getElementById("togglebutton");

  elem.value==="<" ? elem.value = "Edit" : elem.value = "<";

  document.getElementById("input").classList.toggle("close");
  document.getElementById("output").classList.toggle("expand");
  document.getElementById("markdowntext").classList.toggle("expandtext");
}

// COLOR PICKER
const parentCustom = document.querySelector('#cpbtn'),
      popupCustom = new Picker({
          parent: parentCustom,
          popup: 'top',
          color: 'violet',
          alpha: false,
          editor: false,
          editorFormat: 'hex',
          onDone: function(color) {
            parentCustom.style.color = color.rgbaString;
          },
});

// GOOGLE SYNC SAVE : 2 SECOND AFTER FINISHED TYPING

var timer;
window.addEventListener('keyup',()=>{
  clearTimeout(timer);
  timer = setTimeout(savetoGoogle, 1000)
});

function savetoGoogle() {
  //console.log("Trying to connect to Google");
  var value = document.getElementById("inputtext").value;
  try{
    chrome.storage.sync.set({key: value});
    chrome.storage.sync.get(['key'], function(result) {
      document.getElementById('inputtext').innerHTML = result.key;
      convert();
    });
  }
  catch {
    console.log('not able to connect to Google.')
  }
}
