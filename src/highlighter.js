import hljs from "highlight.js";
import md from "markdown-it";

export const highlighter = function(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
    } catch (_e) {
      console.warn(`Could not highlight ${lang}`)
    }
  }
  return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
}
