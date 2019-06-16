
var converter = new showdown.Converter(),
    text      = document.getElementById("inputtext").textContent,
    html      = converter.makeHtml(text);


document.getElementById('output').innerHTML = html;


function convert() {
  var converter = new showdown.Converter(),
      text      = document.getElementById("inputtext").value,
      html      = converter.makeHtml(text);


  document.getElementById('output').innerHTML = html;
}
