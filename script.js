window.markdownSettings = {}
document.getElementById("markdown").addEventListener("keyup", convert);
document.getElementById("toggleButton").onclick = () => toggleWindow();
document.getElementById("settingsToggle").onclick = () => toggleSettings();

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

> Special thanks to Devyn and Estevai for creating [Showdown](https://github.com/showdownjs/showdown) which translates markdown to html using javascript, and to [Mihir](https://github.com/plibither8) for inspiring the project.
- Michael.

---

![Pokemon](https://media3.giphy.com/media/1342dTzTKIkbC0/giphy.gif?cid=790b76115d0d0a7872327a6e6307d86c&rid=giphy.gif)
`;

window.onload = ()=>{
  chrome.storage.sync.get(["key", "titleCustom", "textCustom", "highCustom", "quoteCustom", "bgCustom", "settings"], (result) => {
    // TEXT
    if(result.key !== undefined) {
      document.getElementById("markdown").innerHTML = result.key;
    }
    else {
      document.getElementById("markdown").innerHTML = text;
    }

    // SETTINGS
    if(result.settings !== undefined) {
      document.getElementById("markdown-settings").innerHTML = result.settings;
      window.markdownSettings = JSON.parse(result.settings);
    }
    else {
      document.getElementById("markdown-settings").innerHTML = "{}";
    }

    // COLORS
    if( result.bgCustom ) document.documentElement.style.setProperty("--background-color", result.bgCustom);
    if(result.titleCustom !== undefined) document.documentElement.style.setProperty("--title-color", result.titleCustom);
    if(result.textCustom !== undefined) document.documentElement.style.setProperty("--text-color", result.textCustom);
    if(result.quoteCustom !== undefined) document.documentElement.style.setProperty("--quote-color", result.quoteCustom);
    if(result.highCustom !== undefined) document.documentElement.style.setProperty("--highlights-color", result.highCustom);

    convert();
  });
}

function convert() {
  let {flavor, ...options} = window.markdownSettings
  let converter = new showdown.Converter(options)
  if(flavor) { converter.setFlavor(flavor); }

  let text      = document.getElementById("markdown").value,
      html      = converter.makeHtml(text);

  document.getElementById("renderedMarkdown").innerHTML = html;
}

function toggleWindow(){
  document.getElementById("editor").classList.toggle("hidden");
  document.getElementById("editor").classList.toggle("w-1/2");
  document.getElementById("rendered").classList.toggle("w-1/2");
  document.getElementById("rendered").classList.toggle("w-screen");
}

function toggleSettings(){
  document.getElementById("settings").classList.toggle("hidden");
}

//
// COLOR PICKERS
//

const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--background-color");
const titleColor = getComputedStyle(document.documentElement).getPropertyValue("--title-color");
const textColor = getComputedStyle(document.documentElement).getPropertyValue("--text-color");
const quoteColor = getComputedStyle(document.documentElement).getPropertyValue("--quote-color");
const highlightsColor = getComputedStyle(document.documentElement).getPropertyValue("--highlights-color");

const bgCustom = document.querySelector("#cBg"),
      popupBg = new Picker({
          parent: bgCustom,
          popup: "top",
          color: backgroundColor,
          alpha: false,
          editor: true,
          editorFormat: "hex",
          onDone: function(color) {
            document.documentElement.style.setProperty("--background-color", color.rgbaString);
            try {
              chrome.storage.sync.set({bgCustom: color.rgbaString});
            }
            catch {}
          }
});

const titleCustom = document.querySelector("#cTitle");
      popupTitle = new Picker({
          parent: titleCustom,
          popup: "top",
          color: titleColor,
          alpha: false,
          editor: true,
          editorFormat: "hex",
          onDone: function(color) {
            document.documentElement.style.setProperty("--title-color", color.rgbaString);
            try {
              chrome.storage.sync.set({titleCustom: color.rgbaString});
            }
            catch {}
          }
});

const textCustom = document.querySelector("#cText"),
      popupText = new Picker({
          parent: textCustom,
          popup: "top",
          color: textColor,
          alpha: false,
          editor: true,
          editorFormat: "hex",
          onDone: function(color) {
            document.documentElement.style.setProperty("--text-color", color.rgbaString);
            try {
              chrome.storage.sync.set({textCustom: color.rgbaString});
            }
            catch {}
          }
});


const quoteCustom = document.querySelector("#cQuote"),
      popupQuote = new Picker({
          parent: quoteCustom,
          popup: "top",
          color: quoteColor,
          alpha: false,
          editor: true,
          editorFormat: "hex",
          onDone: function(color) {
            document.documentElement.style.setProperty("--quote-color", color.rgbaString);
            try {
              chrome.storage.sync.set({quoteCustom: color.rgbaString});
            }
            catch {}
          }
});

const highCustom = document.querySelector("#cHigh"),
      popupHigh = new Picker({
          parent: highCustom,
          popup: "top",
          color: highlightsColor,
          alpha: false,
          editor: true,
          editorFormat: "hex",
          onDone: function(color) {
            document.documentElement.style.setProperty("--highlights-color", color.rgbaString);
            try {
              chrome.storage.sync.set({highCustom: color.rgbaString});
            }
            catch {}
          }
});

const resetCustom = document.querySelector("#cReset");
resetCustom.addEventListener("click",()=>{
  document.documentElement.style.setProperty("--background-color", backgroundColor);
  document.documentElement.style.setProperty("--title-color", titleColor);
  document.documentElement.style.setProperty("--text-color", textColor);
  document.documentElement.style.setProperty("--quote-color", quoteColor);
  document.documentElement.style.setProperty("--highlights-color", highlightsColor);

  try {
    chrome.storage.sync.set({
      bgCustom: backgroundColor,
      titleCustom: titleColor,
      textCustom: textColor,
      quoteCustom: quoteColor,
      highCustom: highlightsColor,
      settings: "{}"
    });
  }
  catch {}
});

// GOOGLE SYNC SAVE

var timer;

document.getElementById("markdown").addEventListener("keyup", () => {
  clearTimeout(timer);
  timer = setTimeout(savetoGoogle, 1000);
});

document.getElementById("markdown-settings").addEventListener("keyup", () => {
  clearTimeout(timer);
  timer = setTimeout(saveSettingsToGoogle, 1000);
})

function savetoGoogle() {
  try {
    var value = document.getElementById("markdown").value;
    chrome.storage.sync.set({key: value});
    console.log("Saved Markdown")
  } catch {
    console.error("Not able to connect to Google.");
  }
}
//
function saveSettingsToGoogle() {
  try {
    const value = document.getElementById("markdown-settings").value;
    window.markdownSettings = JSON.parse(value);
    chrome.storage.sync.set({settings: value});
    console.log("Saved settings")
  } catch {
    console.error("Invalid settings JSON")
  }
}
