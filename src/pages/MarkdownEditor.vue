<template>
  <q-page class="flex column overflow-hidden">
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
        <q-btn v-show="advancedToolbar" flat size="sm" padding="xs" icon="subscript" @click="formatSelectionDouble('~')">
          <q-tooltip class="text-no-wrap">Sous-texte</q-tooltip>
        </q-btn>
        <q-btn v-show="advancedToolbar" flat size="sm" padding="xs" icon="superscript" @click="formatSelectionDouble('^')">
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

        <!-- SYMBOLES -->
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

        <!-- EMOJIS -->
        <q-btn-dropdown
          v-show="advancedToolbar"
          flat
          size="sm"
          padding="xs"
          icon="insert_emoticon"
          class="without-dropdown-icon"
          no-caps

          menu-self="bottom middle"
        >
          <template v-slot:label>
            <q-tooltip class="text-no-wrap">Insérer un emoji</q-tooltip>
          </template>

          <q-list dense class="flex row justify-between" style="max-width: 280px">
            <q-item
              v-for="emoji in everyEmoji"
              :key="emoji[0]"

              style="padding: 0!important; height: 32px!important; width: 32px;!important;"

              clickable
              @click="formatSelectionSimple(emoji[0])"
            >
              <q-item-label class="q-mx-auto q-my-auto text-center">{{ emoji[1] }}</q-item-label>
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
        <q-btn v-show="advancedToolbar" flat size="sm" padding="xs" icon="account_tree" @click="formatSelectionSimple('```mermaid Optional Title\ngraph TD\nA[Christmas] -->|Get money| B(Go shopping)\nB --> C{Let me think}\nC -->|One| D[Laptop]\nC -->|Two| E[test]\nC -->|Three| F[Car]\n```')">
          <q-tooltip class="text-no-wrap">Insérer un diagramme MERMAID</q-tooltip>
        </q-btn>
      </div>

      <q-separator vertical class="q-mx-xs" style="width: 0.5px"/>

      <div class="q-mx-xs">
        <q-btn flat size="sm" padding="xs" icon="content_copy" @click="copyMarkdownToClipboard">
          <q-tooltip class="text-no-wrap">Copier – <b>ctrl + c</b></q-tooltip>
        </q-btn>

        <q-btn flat size="sm" padding="xs" icon="file_upload" @click="pickFiles">
          <q-tooltip class="text-no-wrap">Importer un fichier<br><b>(Remplace tout le contenu)</b></q-tooltip>
        </q-btn>
        <q-file ref="importMarkdownPicker" class="hidden" accept=".md" v-model="importMarkdown" @update:model-value="importMarkdownFile" @rejected="rejectFile"/>

        <q-btn flat size="sm" padding="xs" icon="file_download" @click="saveMarkdownFile" :disable="!$store.getters['markdown/isFileNameValid']">
          <q-tooltip class="text-no-wrap">Télécharger le fichier – <b>ctrl + s</b></q-tooltip>
        </q-btn>
      </div>

      <q-separator vertical class="q-mx-xs" style="width: 0.5px"/>

      <div class="q-mx-xs">
        <q-btn flat size="sm" padding="xs" icon="picture_as_pdf" @click="saveMarkdownAsPdf" :disable="!$store.getters['markdown/isFileNameValid']">
          <q-tooltip class="text-no-wrap">Télécharger au format PDF</q-tooltip>
        </q-btn>

        <q-btn v-show="advancedToolbar" flat size="sm" padding="xs" icon="html" @click="saveMarkdownAsHtml" :disable="!$store.getters['markdown/isFileNameValid']">
          <q-tooltip class="text-no-wrap">Télécharger au format HTML</q-tooltip>
        </q-btn>
      </div>

      <div class="q-ml-auto q-mr-sm">
        <span class="text-caption text-grey-7 q-mr-sm">Avancé</span>
        <q-toggle dense size="xs" v-model="advancedToolbar"/>
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

          autofocus

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
	    <q-scroll-area
        ref="markdownScrollArea"
        style="height: 88vh; border-left: 1px solid rgba(0, 0, 0, 0.12); border-top: 1px solid rgba(0, 0, 0, 0.12); border-left: none !important"
        :visible="false"
        :thumb-style="{ display: 'none' }"
      >
          <q-markdown
            :src="editorText"
            :toc-start="tocRange.min"
            :toc-end="tocRange.max"
            toc
            @data="(data) => { tocData.value = data }"
            class="full-width full-height markdown text-left q-pt-sm q-px-lg q-pb-sm"
          />
	    </q-scroll-area>
      </template>
    </q-splitter>

    <!-- TOC -->
		<div
      v-show="advancedToolbar && editorText.trim() !== '' && /^#{0,4} /gm.test(editorText)"
      class="toc absolute-top-right"
      :style="{ marginRight: isTocActive ? '0':'-173px' }"
    >
			<q-btn
        flat
        round
        color="primary"
        size="md"
        padding="none"
        :icon="isTocActive ? 'chevron_right':'chevron_left'"
        class="float-left"
        style="margin: 110px 0 0 -30px"
        @click="isTocActive = !isTocActive"
      />
			<div class="toc-data q-py-xs q-pl-sm q-pr-sm">
        <div class="q-mt-xs text-center text-weight-medium">Table des matières</div>
        <q-separator class="q-mt-xs q-mb-sm" />
				<div v-for="title of tocData.value" :key="title.id" class="q-my-auto text-no-wrap ellipsis">
					{{ '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(title.level - 1)}}
					<a :href="$route.path + '#' + title.id" class="toc-link text-caption text-black" style="text-decoration: none">{{ title.label }}</a>
				</div>
			</div>
		</div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from '@quasar/quasar-app-extension-qmarkdown'
import { copyToClipboard, exportFile, Notify, useMeta } from "quasar";
import { architect, cayman, defaultTheme } from "src/store/html-themes";
import * as textFieldEdit from 'text-field-edit';
import * as indentation from 'indent-textarea';
import showdown from 'showdown'
import showdownMermaid from 'showdown-mermaid'
import { everyEmoji } from "src/store/emojis-list";
import ThemeSelectionDialog from "components/ThemeSelectionDialog";

export default defineComponent({
  name: "MarkdownEditor",
  components: {
    QMarkdown
  },
  setup() {
    window.Prism.languages = require('../../public/prism/prism')
    window.Prism.disableWorkerMessageHandler = true

    const insertArraySize = ref({ x: 2, y: 2 })
	  const link = ref({ text: '', link: '' })
    const importMarkdown = ref()

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

    const tocRange = { min: 1, max: 4 }
    const tocData = ref({})
    const isTocActive = ref(false)

    return {
      splitterModel: ref(45),
      insertArraySize,
	    link,
      importMarkdown,
      specialCharacters,
      everyEmoji,
      tocRange,
      tocData,
      isTocActive
    }
  },
  mounted() {
    const queryFileIndex = parseInt(this.$route.params.index)
    if (queryFileIndex !== undefined && typeof queryFileIndex === 'number' && queryFileIndex >= 0 &&  queryFileIndex < this.$store.state.markdown.files.length) {
      this.$store.commit('markdown/setSelectedFile', queryFileIndex)
    }
    else {
      this.$router.push('/notes')
    }

    useMeta(() => {
      return {
        title: `Notes ${ this.$store.getters["markdown/isFileNameValid"] ? (' | ' + this.fileName):'' }`
      }
    })

	  indentation.watch(this.$refs.editorArea)
    this.$refs.editorArea.addEventListener(
      'scroll',
      (value) => {
          this.$refs.markdownScrollArea.setScrollPercentage('vertical', value.target.scrollTop / value.target.scrollHeight);
        },
      true
    )
  },
  computed: {
    editorText: {
      get() {
        this.$nextTick( function() { window.Prism.highlightAll() })
        return this.$store.getters['markdown/selectedFile'].text
      },
      set(value) {
        this.$store.commit('markdown/setEditorText', value)
      }
    },
    fileName() {
      return this.$store.getters['markdown/selectedFile'].name
    },
    advancedToolbar: {
      get() {
        return this.$store.state.user.advancedToolbar
      },
      set(value) {
        this.$store.commit('user/setAdvancedToolbar', value)
      }
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
    importMarkdownFile() {
      const reader = new FileReader()
      reader.readAsText(this.importMarkdown, "UTF-8")
      reader.onload = (evt) => {
        this.editorText = evt.target.result
      }
    },
    pickFiles() {
      this.$refs.importMarkdownPicker.pickFiles()
    },
    rejectFile() {
      Notify.create({
        message: "Le fichier doit être au format Markdown (.md)",
        type: "warning",
        icon: "warning",
      })
    },
    saveMarkdownFile() {
      if (!this.$store.getters['markdown/isFileNameValid']) {
        return
      }

      const status = exportFile(
        this.$store.getters['markdown/fileNameEncoded'] + '.md',
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

      this.$q.dialog({
        component: ThemeSelectionDialog,
      })
        .onOk(selectedTheme => {
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
          switch (selectedTheme) {
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
        })
    },
    saveMarkdownAsPdf() {
      if (!this.$store.getters['markdown/isFileNameValid']) {
        return
      }

      this.$q.dialog({
        component: ThemeSelectionDialog,
      })
        .onOk(selectedTheme => {
          let theme = defaultTheme
          switch (selectedTheme) {
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
          let windowToPrint = window.open('')
          windowToPrint.document.open()
          windowToPrint.document.write(theme.replace(/\{\{ title \}\}/gm, this.fileName).replace('{{ content }}', converter.makeHtml(this.editorText)))
          windowToPrint.document.close()
          setTimeout(() => {
            windowToPrint.focus()
            windowToPrint.print()
            windowToPrint.close()
          }, 500)
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
  background: transparent!important
  padding: 5px 5px!important
  margin: 0!important

[id^=drender]
  transform: scale(0.75) translateY(20%) translateX(-15%)
  position: absolute
  bottom: 10px
  left: 10px

[id^=drender]:before
  margin-left: -25px
  margin-right: -45px
  content: 'Recharger la page'
  font-size: 12px
  color: grey
  display: inline-block
  transform: rotate(-90deg) translateY(-100%) translateX(50%)

.token.operator
  background: transparent!important

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

.toc
  min-width: 175px
  max-width: 175px
  min-height: 250px
  max-height: 250px
  height: 200px
  margin-top: 8vh
  z-index: 1000
  transition: 0.3s margin-right

.toc-data
  height: 100%
  width: 100%
  overflow-y: scroll
  overflow-x: hidden
  border-top-left-radius: 7px
  border-bottom-left-radius: 7px
  box-shadow: 5px 4px 9px rgba(0, 0, 0, 0.23)
  background-color: rgba(200, 200, 200, 0.3)
  transition: 0.3s background-color

.toc-data:hover
  background-color: rgba(185, 185, 185, 0.8)
  transition: 0.3s background-color

.toc-link:hover::before
  content: '–'
  color: $primary

::-webkit-scrollbar
  width: 3px
  background-color: transparent

::-webkit-scrollbar-thumb
  border-radius: 5px
  background-color: lightgray

.body--dark ::-webkit-scrollbar-thumb
  background-color: grey !important

</style>
