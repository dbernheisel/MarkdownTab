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
        <div class="flex flex-col h-full">
          <div class="relative w-full h-full text-black">
            <textarea v-model="markdown" ref="editor" class="w-full h-full p-2 font-mono text-lg outline-none resize-none">
            </textarea>

            <div class="absolute bottom-0 right-0 z-10 mb-2 mr-6">
              <button @click="toggle('settings')" class="px-2 py-1 font-bold bg-orange-300 border-none rounded shadow-md cursor-pointer transition duration-150 ease-in-out hover:bg-orange-500">...</button>
            </div>
          </div>

          <transition
            enter-class="opacity-0 translate-y-3"
            enter-active-class="transform ease-out duration-300 transition"
            enter-to-class="opacity-100 translate-y-0"
            leave-class="opacity-100"
            leave-active-class="opacity-0"
            leave-to-class="transition ease-in duration-100"
          >
            <div v-show="show.settings" class="flex flex-wrap text-black bg-orange-300">
              <div class="w-full p-2 sm:w-1/2">
                <h2 class="text-black">Markdown Options</h2>
                <textarea v-model="tempSettings" class="w-full h-full font-mono text-black resize-none"></textarea>
              </div>

              <div class="w-full p-2 sm:w-1/2">
                <h2 class="text-black">Color Preset</h2>
                <div class="relative inline-block w-full">
                  <select v-model="selectedColorPreset" class="w-full h-full p-2 m-1 font-bold text-black bg-white border-none rounded">
                    <option disabled value="">Custom Preset</option>
                    <option v-for="preset in colorPresets">{{ preset.name }}</option>
                  </select>
                </div>

                <h2 class="text-black">Custom Colors</h2>
                <div class="flex flex-wrap -m-2">
                  <div class="relative inline-block w-full p-2 md:w-1/2" v-click-outside="toggle('colorTitle', false, true)">
                    <transition
                      enter-class="opacity-0 translate-y-3"
                      enter-active-class="transform ease-out duration-300 transition"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-class="opacity-100"
                      leave-active-class="opacity-0"
                      leave-to-class="transition ease-in duration-100"
                    >
                      <div class="absolute bottom-0 z-50 p-6 mb-12 text-black bg-white rounded-lg shadow-lg" v-show="show.colorTitle">
                        <button @click="toggle('colorTitle')" class="-mt-4 -ml-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                          <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                        <color-picker v-model="tempColorTitle" />
                      </div>
                    </transition>
                    <button id="cTitle" @click="toggle('colorTitle')" class="w-full h-full p-2 m-1 rounded">Title</button>
                  </div>

                  <div class="relative inline-block w-full p-2 md:w-1/2" v-click-outside="toggle('colorText', false, true)">
                    <transition
                      enter-class="opacity-0 translate-y-3"
                      enter-active-class="transform ease-out duration-300 transition"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-class="opacity-100"
                      leave-active-class="opacity-0"
                      leave-to-class="transition ease-in duration-100"
                    >
                      <div class="absolute bottom-0 z-50 p-6 mb-12 text-black bg-white rounded-lg shadow-lg" v-show="show.colorText">
                        <button @click="toggle('colorText')" class="-mt-4 -ml-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                          <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                        <color-picker v-model="tempColorText" />
                      </div>
                    </transition>
                    <button id="cText" @click="toggle('colorText')" class="w-full h-full p-2 m-1 rounded">Text</button>
                  </div>

                  <div class="relative inline-block w-full p-2 md:w-1/2" v-click-outside="toggle('colorBackground', false, true)">
                    <transition
                      enter-class="opacity-0 translate-y-3"
                      enter-active-class="transform ease-out duration-300 transition"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-class="opacity-100"
                      leave-active-class="opacity-0"
                      leave-to-class="transition ease-in duration-100"
                    >
                      <div class="absolute bottom-0 z-50 p-6 mb-12 text-black bg-white rounded-lg shadow-lg" v-show="show.colorBackground">
                        <button @click="toggle('colorBackground')" class="-mt-4 -ml-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                          <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                        <color-picker v-model="tempColorBackground" />
                      </div>
                    </transition>
                    <button id="cBackground" @click="toggle('colorBackground')" class="w-full h-full p-2 m-1 rounded">Background</button>
                  </div>

                  <div class="relative inline-block w-full p-2 md:w-1/2" v-click-outside="toggle('colorQuote', false, true)">
                    <transition
                      enter-class="opacity-0 translate-y-3"
                      enter-active-class="transform ease-out duration-300 transition"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-class="opacity-100"
                      leave-active-class="opacity-0"
                      leave-to-class="transition ease-in duration-100"
                    >
                      <div class="absolute bottom-0 z-50 p-6 mb-12 text-black bg-white rounded-lg shadow-lg" v-show="show.colorQuote">
                        <button @click="toggle('colorQuote')" class="-mt-4 -ml-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                          <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                        <color-picker v-model="tempColorQuote" />
                      </div>
                    </transition>
                    <button id="cQuote" @click="toggle('colorQuote')" class="w-full h-full p-2 m-1 rounded">Quote</button>
                  </div>

                  <div class="relative inline-block w-full p-2 md:w-1/2" v-click-outside="toggle('colorHighlights', false, true)">
                    <transition
                      enter-class="opacity-0 translate-y-3"
                      enter-active-class="transform ease-out duration-300 transition"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-class="opacity-100"
                      leave-active-class="opacity-0"
                      leave-to-class="transition ease-in duration-100"
                    >
                      <div class="absolute bottom-0 z-50 p-6 mb-12 text-black bg-white rounded-lg shadow-lg" v-show="show.colorHighlights">
                        <button @click="toggle('colorHighlights')" class="-mt-4 -ml-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                          <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                        <color-picker v-model="tempColorHighlights" />
                      </div>
                    </transition>
                    <button id="cHighlights" @click="toggle('colorHighlights')" class="w-full h-full p-2 m-1 rounded">Highlights</button>
                  </div>

                  <div class="relative inline-block w-full p-2 md:w-1/2" v-click-outside="toggle('colorCodeText', false, true)">
                    <transition
                      enter-class="opacity-0 translate-y-3"
                      enter-active-class="transform ease-out duration-300 transition"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-class="opacity-100"
                      leave-active-class="opacity-0"
                      leave-to-class="transition ease-in duration-100"
                    >
                      <div class="absolute bottom-0 z-50 p-6 mb-12 text-black bg-white rounded-lg shadow-lg" v-show="show.colorCodeText">
                        <button @click="toggle('colorCodeText')" class="-mt-4 -ml-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                          <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                        <color-picker v-model="tempColorCodeText" />
                      </div>
                    </transition>
                    <button id="cCodeText" @click="toggle('colorCodeText')" class="w-full h-full p-2 m-1 rounded">Code Text</button>
                  </div>

                  <div class="relative inline-block w-full p-2 md:w-1/2" v-click-outside="toggle('colorCodeBackground', false, true)">
                    <transition
                      enter-class="opacity-0 translate-y-3"
                      enter-active-class="transform ease-out duration-300 transition"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-class="opacity-100"
                      leave-active-class="opacity-0"
                      leave-to-class="transition ease-in duration-100"
                    >
                      <div class="absolute bottom-0 z-50 p-6 mb-12 text-black bg-white rounded-lg shadow-lg" v-show="show.colorCodeBackground">
                        <button @click="toggle('colorCodeBackground')" class="-mt-4 -ml-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                          <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                        <color-picker v-model="tempColorCodeBackground" />
                      </div>
                    </transition>
                    <button id="cCodeBackground"
                      @click="toggle('colorCodeBackground')" class="w-full h-full p-2 m-1 rounded">Code Background</button>
                  </div>

                  <div class="relative inline-block w-full p-2 md:w-1/2" v-click-outside="toggle('colorCodeBorder', false, true)">
                    <transition
                      enter-class="opacity-0 translate-y-3"
                      enter-active-class="transform ease-out duration-300 transition"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-class="opacity-100"
                      leave-active-class="opacity-0"
                      leave-to-class="transition ease-in duration-100"
                    >
                      <div class="absolute bottom-0 z-50 p-6 mb-12 text-black bg-white rounded-lg shadow-lg" v-show="show.colorCodeBorder">
                        <button @click="toggle('colorCodeBorder')" class="-mt-4 -ml-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                          <svg class="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                          </svg>
                        </button>
                        <color-picker v-model="tempColorCodeBorder" />
                      </div>
                    </transition>
                    <button id="cCodeBorder" @click="toggle('colorCodeBorder')" class="w-full h-full p-2 m-1 rounded">Code Border</button>
                  </div>

                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <div class="flex-1 w-screen overflow-x-hidden">
      <a id="editor-toggle" @click="toggleEditor" class="float-right text-lg cursor-pointer transform rotate-90 transition duration-150">...</a>
      <div v-html="renderedMarkdown" class="w-full h-full p-4 whitespace-normal rendered"></div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import debounce from "lodash.debounce";
import isEqual from "lodash.isequal";
import ClickOutside from "vue-click-outside";

import { introText, markdownDefaults } from "./defaults"
import { github as defaultColors, presets as colorPresets } from "./colors"

export default {
  components: {
    'color-picker': () => import(/* webpackChunkName: "color-picker" */ './color-picker')
  },

  directives: {
    ClickOutside
  },

  data() {
    return {
      show: {
        colorBackground: false,
        colorCodeBackground: false,
        colorCodeBorder: false,
        colorCodeText: false,
        colorHighlights: false,
        colorQuote: false,
        colorText: false,
        colorTitle: false,
        editor: false,
        settings: false
      },
      parser: new MarkdownIt(),
      tempSettings: "{}",
      tempColorBackground: defaultColors.values.background,
      tempColorCodeBackground: defaultColors.values["code-background"],
      tempColorCodeText: defaultColors.values["code-text"],
      tempColorCodeBorder: defaultColors.values["code-border"],
      tempColorTitle: defaultColors.values.title,
      tempColorText: defaultColors.values.text,
      tempColorQuote: defaultColors.values.quote,
      tempColorHighlights: defaultColors.values.highlights,
      markdown: "",
      settings: markdownDefaults,
      highlightThemes: {},
      colors: defaultColors.values,
      selectedColorPreset: "",
      colorPresets: colorPresets
    }
  },

  methods: {
    toggle: function(key, value, lazy) {
      let instance = this

      if (lazy) {
        return function() {
          if (value === undefined) { value = !instance.show[key] }
          instance.$set(instance.show, key, value)
        }
      } else {
        if (value === undefined) { value = !instance.show[key] }
        instance.$set(instance.show, key, value)
      }
    },

    toggleEditor: function() {
      this.toggle("editor")

      if (this.show.editor) {
        this.$nextTick(function() {
          this.$refs.editor.focus()
        })
      } else {
        this.show.settings = false
        this.saveAll(true)
      }
    },

    saveAll: function(immediate) {
      let saver
      if (immediate) { saver = this.saveToGoogle } else { saver = this.save }

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

    setCss: function(key, value) {
      if (value) {
        document.documentElement.style.setProperty(`--${key}`, value)
      } else {
        document.documentElement.style.removeProperty(`--${key}`)
      }
    },

    detectColorPreset: function() {
      const foundPreset = colorPresets.find((preset) => {
        return isEqual(preset.values, this.colors)
      })
      if(foundPreset) {
        this.selectedColorPreset = foundPreset.name
      }
    },

    loadSaved: function(saved) {
      this.markdown = saved.markdown || introText
      if (saved.settings) this.settings = saved.settings
      this.colors = {...defaultColors.values, ...saved.colors}
      this.tempSettings = JSON.stringify(this.settings, null, "  ")

      this.setColor("background")(this.colors.background);
      this.setColor("title")(this.colors.title);
      this.setColor("text")(this.colors.text);
      this.setColor("quote")(this.colors.quote);
      this.setColor("highlights")(this.colors.highlights);
      this.setColor("code-background")(this.colors["code-background"]);
      this.setColor("code-text")(this.colors["code-text"]);
      this.setColor("code-border")(this.colors["code-border"]);
      this.setCss("custom-font", this.settings.font);
      this.setCss("custom-code-font", this.settings.codeFont);
      this.detectColorPreset()
    },

    handleCtrlSlash: function(e) {
      if (e.defaultPrevented) { return }

      if (e.ctrlKey && !e.shiftKey && !e.altKey && e.keyCode == 191) {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
        e.preventDefault();

        this.toggleEditor()
      } else if (e.ctrlKey && e.shiftKey && !e.altKey && e.keyCode == 191) {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
        e.preventDefault();

        if (!this.show.editor) {
          this.toggleEditor()
          this.toggle("settings", true)
        } else {
          this.toggle("settings")
        }
      }
    },

    handleEsc: function(e) {
      if (e.defaultPrevented) { return }

      if (!e.ctrlKey && !e.shiftKey && !e.altKey && e.keyCode == 27) {
        e.cancelBubble = true;
        e.stopImmediatePropagation();
        e.preventDefault();

        if ([
          this.show.colorBackground,
          this.show.colorTitle,
          this.show.colorText,
          this.show.colorQuote,
          this.show.colorHighlights,
          this.show.colorCodeText,
          this.show.colorCodeBackground,
          this.show.colorCodeBorder
        ].some((val) => val)) {
          this.toggle("colorBackground", false)
          this.toggle("colorTitle", false)
          this.toggle("colorText", false)
          this.toggle("colorQuote", false)
          this.toggle("colorHighlights", false)
          this.toggle("colorCodeText", false)
          this.toggle("colorCodeBackground", false)
          this.toggle("colorCodeBorder", false)
        } else {
          this.toggle("editor", false)
          this.toggle("settings", false)
        }
      }
    },

    shortcuts: function(adding) {
      if (adding) {
        document.addEventListener("keydown", this.handleCtrlSlash, false);
        document.addEventListener("keydown", this.handleEsc, false);
      } else {
        document.removeEventListener("keydown", this.handleCtrlSlash);
        document.removeEventListener("keydown", this.handleEsc);
      }
    },

    loadParser: function() {
      let {preset, highlight, highlightTheme, ...options} = {...markdownDefaults, ...this.settings}
      let parser

      if (highlight == true) {
        import(/* webpackChunkName: "highlighter" */ "./highlighter")
          .then(({highlighter}) => this.parser.set({highlight: highlighter}))
      }

      if (typeof(highlightTheme) == "string") {
        const theme = this.highlightThemes[highlightTheme]
        if (theme) {
          try { window.unuseStyle() } catch {}
          window.unuseStyle = theme.unuse
          theme.use()
        } else {
          let instance = this
          import(/* webpackChunkName: "highlighter-css" */ `highlight.js/styles/${highlightTheme}.css`)
            .then(({default: styles}) => {
              instance.$set(instance.highlightThemes, highlightTheme, styles)
              try { window.unuseStyle() } catch {}
              window.unuseStyle = styles.unuse
              styles.use()
            }).catch(() => {});
        }
      }

      if (preset) {
        parser = new MarkdownIt(preset, options)
      } else {
        parser = new MarkdownIt(options)
      }

      this.parser = parser

      if (options.emoji) {
        import(/* webpackChunkName: "emoji" */ "markdown-it-emoji")
          .then(({default: Emoji}) => this.parser.use(Emoji))
      }

      if (options.superscript) {
        import(/* webpackChunkName: "superscript" */ "markdown-it-sup")
          .then(({default: Sup}) => this.parser.use(Sup))
      }

      if (options.subscript) {
        import(/* webpackChunkName: "subscript" */ "markdown-it-sub")
          .then(({default: Sub}) => this.parser.use(Sub))
      }

      if (options.math) {
        import(/* webpackChunkName: "math" */ "markdown-it-katex")
          .then(({default: math}) => {
            import(/* webpackChunkName: "math-css" */ "katex/dist/katex.min.css")
              .then(({default: styles}) => {
                this.parser.use(math)
                styles.use()
              })
          })
      }

      if (options.toc) {
        import(/* webpackChunkName: "header-anchor" */ "markdown-it-anchor")
          .then(({default: Anchor}) => {
            import(/* webpackChunkName: "toc" */ "markdown-it-table-of-contents")
              .then(({default: TOC}) => {
                this.parser.use(Anchor)
                this.parser.use(TOC)
              })
          })
      }

      if (options.tasklists) {
        import(/* webpackChunkName: "task-lists" */ "markdown-it-task-lists")
          .then(({default: TaskList}) => this.parser.use(TaskList))
      }
    }
  },

  computed: {
    renderedMarkdown: function() {
      return this.parser.render(this.markdown)
    }
  },

  watch: {
    markdown: function(newValue, old) {
      if (old == "") return
      this.save("markdown", newValue)
    },
    settings: function(newValue, old) {
      this.save("settings", newValue)
      this.setCss("custom-font", newValue.font)
      this.setCss("custom-code-font", newValue.codeFont)
      this.loadParser()
    },
    tempSettings: function(newValue, old) {
      try {
        const newSettings = JSON.parse(newValue)
        this.settings = newSettings
      } catch {}
    },
    tempColorText: function(newValue, _old) {
      this.setColor("text")(newValue.hex8)
    },
    tempColorTitle: function(newValue, _old) {
      this.setColor("title")(newValue.hex8)
    },
    tempColorBackground: function(newValue, _old) {
      this.setColor("background")(newValue.hex8)
    },
    tempColorCodeBackground: function(newValue, _old) {
      this.setColor("code-background")(newValue.hex8)
    },
    tempColorCodeText: function(newValue, _old) {
      this.setColor("code-text")(newValue.hex8)
    },
    tempColorCodeBorder: function(newValue, _old) {
      this.setColor("code-border")(newValue.hex8)
    },
    tempColorQuote: function(newValue, _old) {
      this.setColor("quote")(newValue.hex8)
    },
    tempColorHighlights: function(newValue, _old) {
      this.setColor("highlights")(newValue.hex8)
    },
    selectedColorPreset: function(newPresetName, old) {
      const newPreset = colorPresets.find((preset) => preset.name == newPresetName)
      if (newPreset) {
        for (let [key, value] of Object.entries(newPreset.values)) {
          this.setColor(key)(value)
        }
      } else {
        this.selectedColorPreset = old
      }
    },
  },

  mounted() {
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
