import hljs from "highlight.js";
import { escapeHtml } from "markdown-it/lib/common/utils";

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
  return '<pre class="hljs"><code>' + escapeHtml(str) + '</code></pre>'
}
