const introText = `
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

const markdown = {
  linkify: true,
  highlight: true,
  emoji: true,
  tasklists: true
}

const colors = {
  background: "#23241f",
  title: "#5187b3",
  text: "#a0a7b3",
  quote: "#555555",
  highlights: "#90b876"
}

module.exports = { introText, colors, markdown }
