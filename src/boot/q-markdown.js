import { useQMarkdownGlobalProps } from '@quasar/quasar-ui-qmarkdown/src/index'
import abbreviation from "markdown-it-abbr";
import deflist from "markdown-it-deflist";
import emoji from "markdown-it-emoji";
import footnote from "markdown-it-footnote";
import insert from "markdown-it-ins";
import mark from "markdown-it-mark";
import subscript from "markdown-it-sub";
import superscript from "markdown-it-sup";
import taskLists from "markdown-it-task-lists";
import markdownItMermaid from "@datatraccorporation/markdown-it-mermaid";

const plugins = [
  abbreviation,
  deflist,
  emoji,
  footnote,
  insert,
  mark,
  subscript,
  superscript,
  taskLists,
  markdownItMermaid
]

// defaults for QMarkdown
useQMarkdownGlobalProps({
  plugins: plugins
})
