export const introText = `
# NewTab Notes

A *Markdown* page that comes up __everytime__ you open a new tab

If you're anything like me, you always have a browser open, and constantly opening new tabs. Since I briefly have the new tab open, I thought it would be helpful to have my notes in front of me for quick access and little reminders.

[[toc]]

# How to use

Learn you some Markdown! Specifically, [GitHub-flavored Markdown] with some extra features. Continue reading to discover those features!

[GitHub-flavored Markdown]: https://github.github.com/gfm/


## Keyboard Shortcuts

I like to stay at the keyboard when possible without moving to the mouse. This helps my wrists from repeated stress throughout the day. Here are some keyboard shortcuts to help your wrists out!

- \`ctrl-/\` will toggle the editor
- \`ctrl-shift-/\` will toggle the settings (and editor if not open)
- \`Esc\` will close any window that is open, such as the editor, settings, or a color picker.

## Settings

There are several settings that you can take advantage of to customize your experience. The settings are saved as a JSON object into your Chrome storage. This means that if you have multiple computers with Chrome signed into your account, your settings and notes will persist between computers! :tada:

The settings can be adjusted.

- \`emoji": true | false\` Enable/disable emojis to be written as \`:)\` to render :) as a shortcut

- \`"highlight": true | false\`. Enable/disable syntax highlighting in code blocks. This uses [highlight.js].

- \`"highlightTheme": "sometheme"\`. Use the specified [highlight.js] theme. For a list of possible themes, see [highlight.js themes] and use the [filename] as the value, such as \`"monokai-sublime"\`. This only applies to code blocks, and not inline code. For inline code, please use a custom color or one of the built-in color presets.

- \`"linkify": true | false\`. Enable/disable auto-linking. For example, https://github.com will autolink without requiring it to be written as \`[https://github.com](https://github.com)\`

- \`"toc": true | false\`. Enable/disable generating a table of contents with the markup \`[[toc]]\`. See [markdown-it toc] for more info. This will create a ToC based on the H1-H2 headers.

- \`"tasklists": true | false\`. Enable/disable rendering tasks lists with checkboxes. \`- [ ]\` and \`- [x]\`. Note this will render as disabled checkboxes, so they're not interactive.

- \`"preset": "commonmark" | "zero" | "default"\`. For more information on these presets, see the [markdown-it] docs. Omitted will use \`"default"\`. _NOTE:_ if you set to anything other than \`"default"\`, other options like \`linkify\` may be ignored.

- \`"font": "My Custom Font"\`. Use this font as the general font when rendering your markdown. If you have multiple machines with different fonts, you can also specify fallbacks, eg: \`"font"; "Comic Sans MS, sans"\`. Defaults to your machine's sans font.

- \`"codeFont": "My Custom Font"\`. Use this font when rendering code blocks and inline code. If you have multiple machines with different fonts, you can also specify fallbacks, eg: \`"font"; "Fira Code, mono"\`. Defaults to your machine's mono font.




[highlight.js]: https://highlightjs.org/
[highlight.js themes]: https://highlightjs.org/static/demo/
[filename]: https://github.com/highlightjs/highlight.js/tree/9.18.1/src/styles
[markdown-it]: https://github.com/markdown-it/markdown-it
[markdown-it toc]: https://github.com/Oktavilla/markdown-it-table-of-contents

# Examples

## Lists

### Todo List

- [x] Look up how to make a Chrome Extension
- [ ] Remember not to buy from Amazon
- [ ] Don't get distracted.
  - [ ] really... don't

### Bullet List

- The Office
- Parks and Recreation
- Interstellar
  - This one was a suprise hit for me

### Numbered List

1. Elixir

   If you like [Elixir], you should also check out [Gleam] and [Erlang].

1. JavaScript

   This was built with [Vue] and [TailwindCSS].

1. Ruby

   I highly recommend trying non-Rails solutions, like [rom-rb] and [hanami].

[Vue]: https://vuejs.org/
[TailwindCSS]: https://tailwindcss.com/
[Elixir]: https://elixir-lang.org/
[Gleam]: https://gleam.run/
[Erlang]: https://www.erlang.org/
[rom-rb]: https://rom-rb.org/
[hanami]: https://hanamirb.org/

## Code Block

\`\`\`elixir
# Elixir
defmodule YouShouldTryElixir do
  def proclaim() do
    ["It's", "super", "enjoyable!"]
    |> Enum.join(" ")
    |> IO.puts()
  end
end
\`\`\`

\`\`\`javascript
// JavaScript
const waitonme = async function() {
  console.log("Oops")
}
await waitonme()
\`\`\`

If you'd like to change the highlighting theme, try changing your settings to include \`"highlightTheme": "monokai-sublime"\` and see the code block above change colors!

## Superscript/Subscript

This is ^superscript^ and this is ~subscript~. Different from ~~strikeout~~

## Blockquote

>>  "You miss 100% of the shots you don't take."
>>
>> -- Wayne Gretzky
>
> -- Michael Scott
---

## Math

Write out your maths with [KaTeX]. To use this feature, you'll need to add
\`"math": true\` to the settings. Open the settings with \`ctrl-shift-/\`. Until
then, this math below will look like gobbly-gook.

Inline: $\sqrt{3x-1}+(1+x)^2$

Block:
$$\\begin{array}{c}

\\nabla \\times \\vec{\\mathbf{B}} -\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{E}}}{\\partial t} &
= \\frac{4\\pi}{c}\\vec{\\mathbf{j}}    \\nabla \\cdot \\vec{\\mathbf{E}} & = 4 \\pi \\rho \\\\

\\nabla \\times \\vec{\\mathbf{E}}\\, +\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{B}}}{\\partial t} & = \\vec{\\mathbf{0}} \\\\

\\nabla \\cdot \\vec{\\mathbf{B}} & = 0

\\end{array}$$

[KaTeX]: https://katex.org/

## Images

![Pokemon](https://media3.giphy.com/media/1342dTzTKIkbC0/giphy.gif?cid=790b76115d0d0a7872327a6e6307d86c&rid=giphy.gif)
`;

export const markdownDefaults = {
  linkify: true,
  highlight: true,
  highlightTheme: "github",
  emoji: true,
  toc: true,
  superscript: true,
  math: false,
  subscript: true,
  tasklists: true
}
