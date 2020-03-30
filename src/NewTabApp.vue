<template>
  <div class="flex flex-no-wrap min-h-screen">
    <transition
      enter-class="opacity-0 -translate-x-6"
      enter-active-class="transform ease-out duration-300 transition"
      enter-to-class="opacity-100 translate-x-0"
      leave-class="opacity-100"
      leave-active-class="opacity-0"
      leave-to-class="transition ease-in duration-100"
    >
      <div v-show="show.editor" class="sticky top-0 left-0 flex-1 h-screen">
        <div class="relative flex flex-col h-full">
          <div class="absolute bottom-0 right-0 mb-2 mr-6">
            <button @click="toggle('settings')" class="px-2 py-1 font-bold bg-orange-300 border-none rounded shadow-md cursor-pointer transition duration-150 ease-in-out hover:bg-orange-500">...</button>
          </div>

          <div class="w-full h-full text-black">
            <textarea v-model="markdown" ref="editor" class="w-full h-full p-2 font-mono outline-none resize-none">
            </textarea>
          </div>

          <transition
            enter-class="opacity-0 translate-y-3"
            enter-active-class="transform ease-out duration-300 transition"
            enter-to-class="opacity-100 translate-y-0"
            leave-class="opacity-100"
            leave-active-class="opacity-0"
            leave-to-class="transition ease-in duration-100"
          >
            <div v-show="show.settings" class="p-2 text-white bg-gray-900">
              <div>
                <h2 class="text-white">Markdown Options</h2>
                <textarea v-model="tempSettings" class="w-full h-48 font-mono text-black resize-none"></textarea>
              </div>

              <div>
                <h2 class="text-white">Custom Colors</h2>
                <div class="flex flex-row flex-wrap">
                  <div class="relative inline-block" v-click-outside="toggle('colorTitle', false, true)">
                    <div class="absolute bottom-0 z-50 p-4 mb-16 text-black bg-white rounded-lg shadow-lg" v-show="show.colorTitle">
                      <color-picker v-model="tempColorTitle" />
                      <button @click="toggle('colorTitle')" class="px-3 py-1 bg-orange-300 border-none rounded transition duration-150 ease-in-out hover:bg-orange-500">Ok</button>
                    </div>
                    <button id="cTitle" @click="toggle('colorTitle')" class="p-2 m-2 rounded">Title</button>
                  </div>

                  <div v-click-outside="toggle('colorText', false, true)">
                    <div class="absolute bottom-0 z-50 p-4 mb-16 text-black bg-white rounded-lg shadow-lg" v-show="show.colorText">
                      <color-picker v-model="tempColorText" />
                      <button @click="toggle('colorText')" class="px-3 py-1 bg-orange-300 border-none rounded transition duration-150 ease-in-out hover:bg-orange-500">Ok</button>
                    </div>
                    <button id="cText" @click="toggle('colorText')" class="p-2 m-2 rounded">Text</button>
                  </div>

                  <div v-click-outside="toggle('colorBackground', false, true)">
                    <div class="absolute bottom-0 z-50 p-4 mb-16 text-black bg-white rounded-lg shadow-lg" v-show="show.colorBackground">
                      <color-picker v-model="tempColorBackground" />
                      <button @click="toggle('colorBackground')" class="px-3 py-1 bg-orange-300 border-none rounded transition duration-150 ease-in-out hover:bg-orange-500">Ok</button>
                    </div>
                    <button id="cBackground" @click="toggle('colorBackground')" class="p-2 m-2 rounded">Background</button>
                  </div>

                  <div v-click-outside="toggle('colorQuote', false, true)">
                    <div class="absolute bottom-0 z-50 p-4 mb-16 text-black bg-white rounded-lg shadow-lg" v-show="show.colorQuote">
                      <color-picker v-model="tempColorQuote" />
                      <button @click="toggle('colorQuote')" class="px-3 py-1 bg-orange-300 border-none rounded transition duration-150 ease-in-out hover:bg-orange-500">Ok</button>
                    </div>
                    <button id="cQuote" @click="toggle('colorQuote')" class="p-2 m-2 rounded">Quote</button>
                  </div>

                  <div v-click-outside="toggle('colorHighlights', false, true)">
                    <div class="absolute bottom-0 z-50 p-4 mb-16 text-black bg-white rounded-lg shadow-lg" v-show="show.colorHighlights">
                      <color-picker v-model="tempColorHighlights" />
                      <button @click="toggle('colorHighlights')" class="px-3 py-1 bg-orange-300 border-none rounded transition duration-150 ease-in-out hover:bg-orange-500">Ok</button>
                    </div>
                    <button id="cHighlights" @click="toggle('colorHighlights')" class="p-2 m-2 rounded">Highlights</button>
                  </div>

                  <button @click="resetColors" class="p-2 m-2 font-bold text-white bg-orange-600 border-none rounded transition duration-150 ease-in-out hover:bg-orange-800">Reset</button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <div class="flex-1 w-screen overflow-x-hidden">
      <a id="editor-toggle" @click="toggleEditor" class="float-right text-lg cursor-pointer transform rotate-90 transition duration-150">...</a>
      <div v-html="renderedMarkdown" class="w-full h-full p-4 font-mono whitespace-normal rendered"></div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import Emoji from "markdown-it-emoji";
import TaskLists from "markdown-it-task-lists";
import hljs from "highlight.js";
import debounce from "lodash.debounce";
import { Chrome as ChromePicker } from "vue-color";
import ClickOutside from "vue-click-outside";

import defaults  from "./defaults"

export default {
  components: {
    'color-picker': ChromePicker
  },

  directives: {
    ClickOutside
  },

  data() {
    return {
      show: {
        editor: false,
        settings: false,
        colorBackground: false,
        colorTitle: false,
        colorText: false,
        colorQuote: false,
        colorHighlights: false
      },
      tempSettings: "{}",
      tempColorBackground: defaults.colors.background,
      tempColorTitle: defaults.colors.title,
      tempColorText: defaults.colors.text,
      tempColorQuote: defaults.colors.quote,
      tempColorHighlights: defaults.colors.highlights,
      markdown: "",
      settings: "",
      colors: defaults.colors
    }
  },

  methods: {
    toggle: function(key, value, lazy) {
      let instance = this

      if (lazy) {
        return function() {
          if(value === undefined) { value = !instance.show[key] }
          instance.$set(instance.show, key, value)
        }
      } else {
        if (value === undefined) { value = !instance.show[key] }
        instance.$set(instance.show, key, value)
      }
    },

    resetColors: function() {
      for (let [key, value] of Object.entries(defaults.colors)) {
        this.setColor(key)(value)
      }
    },

    toggleEditor: function() {
      this.toggle("editor")

      if(this.show.editor) {
        this.$nextTick(function() {
          this.$refs.editor.focus()
        })
      } else {
        this.show.settings = false
      }
    },

    saveAll: function(immediate) {
      let saver
      if (immediate) { saver = saveToGoogle } else { saver = save }

      saver("markdown", this.markdown)
      saver("settings", this.settings)
      saver("colors", this.colors)
    },

    save: debounce(function(key, value) {
            this.saveToGoogle(key, value)
          }, 1000, { 'maxWait': 3000 }),

    saveToGoogle: function(key, value) {
      try {
        if (typeof key_or_object === 'object' && key_or_object !== null) {
          chrome.storage.sync.set(key_or_object);
        } else {
          chrome.storage.sync.set({ [key]: value });
        }
      } catch (err) {
        console.warn(`Could not save ${key}`);
        console.error(err);
      }
    },

    setColor: function(key) {
      let instance = this

      return function(color) {
        if (color) {
          instance.$set(instance.colors, key, color)
          document.documentElement.style.setProperty(`--${key}-color`, color)
          instance.save("colors", {...instance.colors, [key]: color})
        }
      }
    },

    loadSaved: function(saved) {
      this.markdown = saved.markdown || defaults.introText
      this.settings = saved.settings || defaults.markdown
      this.colors = {...defaults.colors, ...saved.colors}
      this.tempSettings = JSON.stringify(this.settings, null, "  ")

      this.setColor("background")(this.colors.background);
      this.setColor("title")(this.colors.title);
      this.setColor("text")(this.colors.text);
      this.setColor("quote")(this.colors.quote);
      this.setColor("highlights")(this.colors.highlights);
    },

    highlighter: function(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (_e) {
          console.warn(`Could not highlight ${lang}`)
        }
      }
      return '';
    },

    handleCtrlSlash: function(e) {
      if (e.defaultPrevented) { return }

      if (e.ctrlKey && !e.shiftKey && e.keyCode == 191) {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
        e.preventDefault();
        this.toggleEditor()
        return false;
      }
    },

    shortcuts: function(adding) {
      if (adding) {
        document.addEventListener("keydown", this.handleCtrlSlash, false);
      } else {
        document.removeEventListener("keydown", this.handleCtrlSlash);
      }
    }
  },

  computed: {
    renderedMarkdown: function() {
      return this.parser.render(this.markdown)
    },

    parser: function() {
      let options = {...defaults.markdown, ...this.settings}
      if(options.highlight) { options.highlight = this.highlighter }

      let parser = new MarkdownIt(options)
      if(options.emoji) { parser.use(Emoji) }
      if(options.tasklists) { parser.use(TaskLists) }

      return parser
    }
  },

  watch: {
    markdown: function(newValue, old) {
      if(old == "") return
      this.save("markdown", newValue)
    },
    settings: function(newValue, old) {
      if(old == "") return
      this.save("settings", newValue)
    },
    tempSettings: function(newValue, old) {
      try {
        const newSettings = JSON.parse(newValue)
        this.settings = newSettings
      } catch {
        return
      }
    },
    tempColorText: function(newValue, _old) {
      this.setColor("text")(newValue.hex)
    },
    tempColorTitle: function(newValue, _old) {
      this.setColor("title")(newValue.hex)
    },
    tempColorBackground: function(newValue, _old) {
      this.setColor("background")(newValue.hex)
    },
    tempColorQuote: function(newValue, _old) {
      this.setColor("quote")(newValue.hex)
    },
    tempColorHighlights: function(newValue, _old) {
      this.setColor("highlights")(newValue.hex)
    }
  },

  beforeMount() {
    chrome.storage.sync.get(["markdown", "colors", "settings"], this.loadSaved);
    document.addEventListener('beforeunload', this.beforeDestroy)
    this.shortcuts(true)
  },

  beforeDestroy() {
    this.saveAll(true)
    this.shortcuts(false)
  }
}
</script>

<style>
  .vc-chrome {
    box-shadow: none !important;
  }
</style>
