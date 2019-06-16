

function convert() {
          var converter = new showdown.Converter(),
              text      = document.getElementById("inputtext").value,
              html      = converter.makeHtml(text);


          document.getElementById('markdowntext').innerHTML = html;
}

convert();

function togglewindow(){
  var elem = document.getElementById("togglebutton");
  
    if (elem.value==="<") {
      elem.value = ">";
      console.log("it works");
    }
    else elem.value = "<";


  document.getElementById("input").classList.toggle("close");
  document.getElementById("output").classList.toggle("expand");
  document.getElementById("markdowntext").classList.toggle("expandtext");

}

window.addEventListener('keyup',function(e){
    convert();
},true);
