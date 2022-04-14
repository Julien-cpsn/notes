<template>
  <q-page class="flex column">
    <div class="full-width flex row items-center q-py-xs q-px-sm" :class="$q.dark.isActive ? 'bg-grey-10':'bg-grey-2'" style="height: 5vh">
      <!-- BASIC FORMAT -->
      <div class="q-mx-xs">
        <q-btn flat size="sm" padding="xs" icon="format_bold" @click="formatSelectionDouble('**')">
          <q-tooltip class="text-no-wrap">Écrire en gras – <b>ctrl + b</b></q-tooltip>
        </q-btn>
        <q-btn flat size="sm" padding="xs" icon="format_italic" @click="formatSelectionDouble('*')">
          <q-tooltip class="text-no-wrap">Écrire en italique – <b>ctrl + i</b></q-tooltip>
        </q-btn>
        <q-btn flat size="sm" padding="xs" icon="strikethrough_s" @click="formatSelectionDouble('~~')">
          <q-tooltip class="text-no-wrap">Barrer du texte – <b>ctrl + u</b></q-tooltip>
        </q-btn>
		    <q-btn flat size="sm" padding="xs" icon="drive_file_rename_outline" @click="formatSelectionDouble('==')">
          <q-tooltip class="text-no-wrap">Surligner du texte – <b>ctrl + h</b></q-tooltip>
        </q-btn>
        <q-btn flat size="sm" padding="xs" icon="subscript" @click="formatSelectionDouble('~')">
          <q-tooltip class="text-no-wrap">Sous-texte</q-tooltip>
        </q-btn>
        <q-btn flat size="sm" padding="xs" icon="superscript" @click="formatSelectionDouble('^')">
          <q-tooltip class="text-no-wrap">Exposant</q-tooltip>
        </q-btn>
      </div>

      <q-separator vertical class="q-mx-xs" style="width: 0.5px"/>

      <!-- TITLES -->
      <div class="q-mx-xs">
        <q-btn-dropdown flat size="sm" padding="xs" icon="format_size" no-caps auto-close>
        <template v-slot:label>
          <q-tooltip class="text-no-wrap">Insérer un type de texte – <b>ctrl + [1-6]</b></q-tooltip>
        </template>

        <q-list class="text-no-wrap">
          <q-item clickable v-close-popup @click="formatSelectionSimple('#')">
            <q-item-section>
              <q-item-label class="text-h3">Titre 1</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="formatSelectionSimple('##')">
            <q-item-section>
              <q-item-label class="text-h4">Titre 2</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="formatSelectionSimple('###')">
            <q-item-section>
              <q-item-label class="text-h5">Titre 3</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="formatSelectionSimple('####')">
            <q-item-section>
              <q-item-label class="text-h6">Titre 4</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="formatSelectionSimple('#####')">
            <q-item-section>
              <q-item-label class="text-subtitle2">Titre 5</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="formatSelectionSimple('######')">
            <q-item-section>
              <q-item-label class="text-caption">Titre 6</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        </q-btn-dropdown>

        <!-- LINKS -->
        <q-btn-dropdown
          ref="links"
          flat size="sm"
          padding="xs"
          icon="link"
          class="without-dropdown-icon"
          no-caps
          menu-self="bottom middle"
          :menu-offset="[0, -25]">
          <template v-slot:label>
            <q-tooltip class="text-no-wrap">Insérer un lien – <b>ctrl + l</b></q-tooltip>
          </template>

          <div class="flex column justify-center items-center q-pa-sm">
            <q-input dense standout placeholder="Texte" class="q-mb-sm" v-model="link.text" @keydown.enter="insertLink" />
            <q-input dense standout placeholder="Lien" v-model="link.link" @keydown.enter="insertLink" />
          </div>
        </q-btn-dropdown>

        <!-- ARRAYS -->
        <q-btn-dropdown flat size="xs" style="padding: 6px" icon="grid_on" class="without-dropdown-icon" no-caps>
          <template v-slot:label>
            <q-tooltip class="text-no-wrap">Insérer un tableau</q-tooltip>
          </template>

          <div class="flex row justify-center items-center q-pa-sm">
            <input
              v-model="insertArraySize.x"
              maxlength="2"
              :class="'rounded-borders no-border text-center ' + ($q.dark.isActive ? 'bg-dark text-white':'bg-grey-2 text-black')"
              style="width: 25px"
              @keydown.enter="insertArray"
            />
            <div class="q-mx-sm">×</div>
            <input
              v-model="insertArraySize.y"
              maxlength="2"
              :class="'rounded-borders no-border text-center ' + ($q.dark.isActive ? 'bg-dark text-white':'bg-grey-2 text-black')"
              style="width: 25px"
              @keydown.enter="insertArray"
            />
          </div>
          <q-tooltip
            :model-value="!validateArraySize"
            no-parent-event
            self="center middle"
          >
            Le format n'est pas valide
          </q-tooltip>
        </q-btn-dropdown>

        <q-btn-dropdown flat size="sm" padding="xs" icon="emoji_symbols" class="without-dropdown-icon" no-caps>
          <template v-slot:label>
            <q-tooltip class="text-no-wrap">Insérer un symbole</q-tooltip>
          </template>

          <q-list dense class="flex row justify-between" style="max-width: 160px">
            <q-item
              v-for="[char, index] in specialCharacters"
              :key="index"

              style="padding: 0!important; height: 32px!important; width: 32px;!important;"

              clickable
              @click="formatSelectionSimple(char)"
            >
              <q-item-label class="q-mx-auto q-my-auto text-center">{{ char }}</q-item-label>
            </q-item>
          </q-list>
        </q-btn-dropdown>
	  </div>

	  <q-separator vertical class="q-mx-xs" style="width: 0.5px;"/>

      <div class="q-mx-xs">
        <!-- INLINE CODE -->
        <q-btn flat size="sm" padding="xs" icon="blur_on" @click="formatSelectionDouble('`')">
          <q-tooltip class="text-no-wrap">Insérer du code en ligne</q-tooltip>
        </q-btn>

        <!-- CODE BLOC -->
        <q-btn flat size="sm" padding="xs" icon="code" @click="formatSelectionDouble('\r\n```\r\n')">
          <q-tooltip class="text-no-wrap">Insérer un bloc de code – <b>ctrl + p</b></q-tooltip>
        </q-btn>

        <!-- QUOTE -->
        <q-btn flat size="sm" padding="xs" icon="format_quote" @click="formatSelectionSimple('>')">
          <q-tooltip class="text-no-wrap">Insérer une citation – <b>ctrl + q</b></q-tooltip>
        </q-btn>

		    <!-- SEPARATOR -->
		    <q-btn flat size="sm" padding="xs" icon="horizontal_rule" @click="formatSelectionSimple('- - -\r\n')">
          <q-tooltip class="text-no-wrap">Insérer un séparateur – <b>ctrl + m</b></q-tooltip>
        </q-btn>

        <!-- MERMAID DIAGRAM -->
        <q-btn flat size="sm" padding="xs" icon="account_tree" @click="formatSelectionSimple('```mermaid Optional Title\ngraph TD\nA[Christmas] -->|Get money| B(Go shopping)\nB --> C{Let me think}\nC -->|One| D[Laptop]\nC -->|Two| E[test]\nC -->|Three| F[Car]\n```')">
          <q-tooltip class="text-no-wrap">Insérer un diagramme MERMAID</q-tooltip>
        </q-btn>
      </div>

      <q-separator vertical class="q-mx-xs" style="width: 0.5px"/>

      <div class="q-mx-xs">
        <q-btn flat size="sm" padding="xs" icon="content_copy" @click="copyMarkdownToClipboard">
          <q-tooltip class="text-no-wrap">Copier – <b>ctrl + c</b></q-tooltip>
        </q-btn>
        <q-btn flat size="sm" padding="xs" icon="file_download" @click="saveMarkdownFile" :disable="!$store.getters['markdown/isFileNameValid']">
          <q-tooltip class="text-no-wrap">Télécharger le fichier – <b>ctrl + s</b></q-tooltip>
        </q-btn>
      </div>

      <q-separator vertical class="q-mx-xs" style="width: 0.5px"/>

      <div class="q-mx-xs">
        <q-btn flat size="sm" padding="xs" icon="picture_as_pdf" @click="saveMarkdownAsPdf" :disable="!$store.getters['markdown/isFileNameValid']">
          <q-tooltip class="text-no-wrap">Télécharger au format PDF</q-tooltip>
        </q-btn>
        <q-btn flat size="sm" padding="xs" icon="html" @click="exportToHtmlDialog = true" :disable="!$store.getters['markdown/isFileNameValid']">
          <q-tooltip class="text-no-wrap">Télécharger au format HTML</q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-splitter
      v-model="splitterModel"
      :limits="[25, 75]"
      class="full-width flex row"
      style="height: 88vh"
      :separator-style="{ width: '1px' }"

      @update:model-value="roundSplitterModel"
    >
      <template v-slot:before>
        <textarea
          ref="editorArea"
          placeholder="Texte"
          v-model="editorText"
          :class="'full-width editor q-pt-lg q-pb-lg q-pl-lg ' + ($q.dark.isActive ? 'text-grey-5':'text-black')"
          style="min-height: 88.1vh;"
          type="textarea"

          @keydown.ctrl.b.prevent.stop="formatSelectionDouble('**')"
		      @keydown.ctrl.i.prevent.stop="formatSelectionDouble('*')"
          @keydown.ctrl.u.prevent.stop="formatSelectionDouble('~~')"
		      @keydown.ctrl.h.prevent.stop="formatSelectionDouble('==')"

          @keydown.ctrl="(e) => handleCtrlNumberKeydown(e)"
          @keydown.ctrl.l.prevent.stop="insertLink"

          @keydown.ctrl.p.prevent.stop="formatSelectionDouble('\r\n```\r\n')"
          @keydown.ctrl.q.prevent.stop="formatSelectionSimple('>')"
          @keydown.ctrl.m.prevent.stop="formatSelectionSimple('- - -\r\n')"

          @keydown.ctrl.s.prevent.stop="saveMarkdownFile"
        />
      </template>
      <template v-slot:after>
	    <q-scroll-area ref="markdownScrollArea" style="height: 88vh; border-left: 1px solid rgba(0, 0, 0, 0.12); border-top: 1px solid rgba(0, 0, 0, 0.12); border-left: none !important" :visible="false" :thumb-style="{ display: 'none' }">
          <q-markdown
            :src="editorText"
            :plugins="plugins"
            class="full-width full-height markdown text-left q-pt-sm q-px-lg q-pb-sm"
          />
	    </q-scroll-area>
      </template>
    </q-splitter>
    <q-dialog v-model="exportToHtmlDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Choisir un thème</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-my-sm">
          <div class="flex row">
            <q-radio v-model="exportToHtmlTheme" :val="0" label="Aucun" class="q-mr-md"/>
            <q-radio v-model="exportToHtmlTheme" :val="1" class="q-mr-md">
              <q-img width="100px" class="rounded-borders" src="https://raw.githubusercontent.com/pages-themes/architect/master/thumbnail.png"/>
            </q-radio>
            <q-radio v-model="exportToHtmlTheme" :val="2" class="q-mr-md">
              <q-img width="100px" class="rounded-borders" src="https://raw.githubusercontent.com/pages-themes/cayman/master/thumbnail.png"/>
            </q-radio>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Exporter" color="primary" @click="saveMarkdownAsHtml" v-close-popup />
          <q-btn flat label="Annuler" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from '@quasar/quasar-app-extension-qmarkdown'
import abbreviation from 'markdown-it-abbr'
import deflist from 'markdown-it-deflist'
import emoji from 'markdown-it-emoji'
import footnote from 'markdown-it-footnote'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import taskLists from 'markdown-it-task-lists'
import markdownItMermaid from '@datatraccorporation/markdown-it-mermaid'
import { copyToClipboard, exportFile, Notify, useMeta } from "quasar";
import { api } from "boot/axios";
import { architect, cayman, defaultTheme } from "src/store/html-themes";
import * as textFieldEdit from 'text-field-edit';
import * as indentation from 'indent-textarea';
import showdown from 'showdown'
import showdownMermaid from 'showdown-mermaid'

export default defineComponent({
  name: "MarkdownEditor",
  components: {
    QMarkdown
  },
  setup() {
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
    window.Prism.languages = require('../../public/prism/prism')

    const markdownScrollArea = ref(null)
    const insertArraySize = ref({ x: 2, y: 2 })
	  const link = ref({ text: '', link: '' })
    const exportToHtmlDialog = ref(false)
    const exportToHtmlTheme = ref(0)

    const specialCharacters = [
      '¤',
      '¶',
      '§',
      'æ',
      'Æ',
      'œ',
      'Œ',
      '¢',
      '£',
      '¥',
      'P',
      'ƒ',
      '¿',
      '¬',
      '½',
      '¼',
      '¾',
      '«',
      '»',
      'ß',
      '·',
      '‰',
      '×',
      'Ø',
    ]

    return {
      splitterModel: ref(45),
      plugins,
	    markdownScrollArea,
      insertArraySize,
	    link,
      exportToHtmlDialog,
      exportToHtmlTheme,
      specialCharacters
    }
  },
  mounted() {
    useMeta(() => {
      return {
        title: `Notes ${ this.$store.getters["markdown/isFileNameValid"] ? (' | ' + this.fileName):'' }`
      }
    })

	indentation.watch(this.$refs.editorArea)
    this.$refs.editorArea.addEventListener(
      'scroll',
      (value) => {
          this.markdownScrollArea.setScrollPosition('vertical', value.target.scrollTop * 0.995 * this.markdownScrollArea.getScroll().verticalSize / value.target.scrollHeight);
        },
      true
    )
  },
  computed: {
    editorText: {
      get() {
        this.$nextTick( function() { window.Prism.highlightAll() })
        return this.$store.state.markdown.editorText
      },
      set(value) {
        this.$store.commit('markdown/setEditorText', value)
      }
    },
    fileName() {
      return this.$store.state.markdown.fileName
    },
    validateArraySize() {
      return /^[1-9][0-9]?$/.test(this.insertArraySize.x.toString()) && /^[1-9][0-9]?$/.test(this.insertArraySize.y.toString())
    },
  },
  methods: {
    handleCtrlNumberKeydown(e) {
      if (e.keyCode >= 49 && e.keyCode <= 54) {
        this.formatSelectionSimple('#'.repeat(e.keyCode - 48) + ' ')
      }
	  },
    formatSelectionSimple(format) {
      this.$refs.editorArea.focus()
      textFieldEdit.insert(this.$refs.editorArea, (format + ' ' + window.getSelection().toString()));
    },
    formatSelectionDouble(format) {
      this.$refs.editorArea.focus()
      textFieldEdit.wrapSelection(this.$refs.editorArea, format);
    },
    insertArray() {
      if (this.validateArraySize) {
        this.$refs.editorArea.focus()
        let array = "\n|"
        for (let i = 0; i < this.insertArraySize.y; i++) {
          for (let j = 0; j < this.insertArraySize.x; j++) {
            array += ` ${i + j + 1} |`
          }
          if (i === 0) {
            array += "\n|"
            array += "----|".repeat(this.insertArraySize.x)
          }
          if (i < this.insertArraySize.y - 1) {
            array += "\n"
            array += "|"
          }
        }
        array += "\n"
        textFieldEdit.insert(this.$refs.editorArea, array);
      }
    },
    insertLink() {
      if (textFieldEdit.getSelection(this.$refs.editorArea)) {
        textFieldEdit.insert(this.$refs.editorArea, `[${textFieldEdit.getSelection(this.$refs.editorArea)}]()`)
      }
      else {
        textFieldEdit.insert(this.$refs.editorArea, `[${this.link.text}](${this.link.link})`)
      }
      this.link.text = ''
      this.link.link = ''
    },
    copyMarkdownToClipboard() {
      copyToClipboard(this.editorText)
        .then(() => {
          Notify.create({
            type: 'positive',
            message: 'Texte copié',
            timeout: 400
          })
        })
        .catch(() => {
          Notify.create({
            type: 'negative',
            message: "Le texte n'a pas pu être copié",
            timeout: 400
          })
        })
    },
    saveMarkdownFile() {
      if (!this.$store.getters['markdown/isFileNameValid']) {
        return
      }

      const status = exportFile(
        this.$store.getters["markdown/fileNameEncoded"] + '.md',
        this.editorText
      )

      if (status !== true) {
        Notify.create({
          type: 'positive',
          message: "Le fichier n'a pas pu être enregistré",
          time: 400
        })
      }
    },
    saveMarkdownAsHtml() {
      if (!this.$store.getters['markdown/isFileNameValid']) {
        return
      }

      const converter = new showdown.Converter({
        openLinksInNewWindow: true,
        parseImgDimensions: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tables: true,
        tablesHeaderId: true,
        tasklists: true,
        emoji: true,
        extensions: [showdownMermaid]
      })
      const html = converter.makeHtml(this.editorText)
      let theme = defaultTheme
      switch (this.exportToHtmlTheme) {
        case 2:
          theme = cayman
          break
        case 1:
          theme = architect
          break
        default:
          theme = defaultTheme
          break
      }

      const status = exportFile(
        this.$store.getters['markdown/fileNameEncoded'] + '.html',
        theme.replace(/\{\{ title \}\}/gm, this.fileName).replace('{{ content }}', html)
      )

      if (status !== true) {
        Notify.create({
          type: 'positive',
          message: "Le fichier n'a pas pu être enregistré",
          time: 400
        })
      }
    },
    saveMarkdownAsPdf() {
      if (!this.$store.getters['markdown/isFileNameValid']) {
        return
      }

      const data = new FormData()
      data.append('input_files[]', this.editorText)
      api.post('/convert', data,{ headers: { "Content-Type": "multipart/form-data" }})
        .then((response) => {
          console.log(response);
        })
    },
    roundSplitterModel(value) {
      if (value <= 47.5 && value >= 42.5) {
        this.splitterModel = 45
      }
    }
  },
});

window.onkeydown = (e) => {
	if (e.ctrlKey && (e.keyCode === 49 || e.keyCode === 50 || e.keyCode === 51 || e.keyCode === 52 || e.keyCode === 53 || e.keyCode === 54 || e.keyCode === 55 || e.keyCode === 56 || e.keyCode === 57)) {
      return false;
	}
}
</script>

<style src="../../public/prism/prism.css"></style>
<style lang="sass">
.editor
  resize: none
  border-radius: 0
  border: 1px solid rgba(0, 0, 0, 0.12)
  border-right: none !important

.q-markdown--code-wrapper pre
  background-color: transparent!important

pre[class*=language-]
  padding: 5px 5px!important
  margin: 0!important

.body--dark .editor
  color: white
  background-color: $dark-page

.editor:focus
  outline: none !important

.q-splitter__before
  overflow-y: hidden

.markdown
  border-radius: 0
  overflow-y: hidden

  hr
    border: none
    border-bottom: 2px solid lightgray

::-webkit-scrollbar
  width: 3px
  background-color: transparent

::-webkit-scrollbar-thumb
  border-radius: 5px
  background-color: lightgray

.body--dark ::-webkit-scrollbar-thumb
  background-color: grey !important

</style>
