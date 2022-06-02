import hljs from "highlight.js";
import MarkdownIt from "markdown-it";

const markdown: any = MarkdownIt({
  html: true,
  breaks: true,
  typographer: true,
  highlight: function (str: any, lang: any) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value + '</code></pre>'
        );
      } catch (__) { }
    }
    return (
      '<pre><code class="hljs">' + markdown.utils.escapeHtml(str) + '</code></pre>'
    );
  },
});

export default markdown;