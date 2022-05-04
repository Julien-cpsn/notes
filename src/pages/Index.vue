<template>
  <q-page class="flex items-center justify-center">
    <div class="flex column">
      <div class="row">
        <q-card class="shadow-7" style="border-radius: 8px">
          <q-card-section class="q-pa-none">
            <q-img style="width: 200px!important; border-radius: 8px" class="full-width" src="notes_cropped.png">
              <div class="fixed-full flex items-center justify-center text-h3 text-center">
                <router-link to="/notes" class="text-weight-thin text-white" style="text-decoration: none">
                  <div>Notes</div>
                </router-link>
                <q-card-actions class="absolute-bottom justify-evenly">
                  <q-btn flat round color="light" icon="notes" to="notes">
                    <q-tooltip>Prendre des notes</q-tooltip>
                  </q-btn>
                  <q-btn flat round color="light" icon="preview" @click="openMarkdown">
                    <q-tooltip>Prévisualiser des notes</q-tooltip>
                  </q-btn>
                    <q-file ref="openMarkdown" class="hidden" accept=".md" v-model="markdownFile" @update:model-value="openMarkdownPreviewDialog" @rejected="rejectFile"/>
                </q-card-actions>
              </div>
            </q-img>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from '@quasar/quasar-app-extension-qmarkdown'
import { Notify, useMeta, useQuasar } from "quasar";
import MarkdownPreviewDialog from "components/MarkdownPreviewDialog";

export default defineComponent({
  name: "PageIndex",
  setup() {
    useMeta(() => {
      return {
        title: 'Julien C.'
      }
    })

    const $q = useQuasar()

    const markdownFile = ref()

    function openMarkdownPreviewDialog() {
      const reader = new FileReader()
      reader.readAsText(markdownFile.value, "UTF-8")
      reader.onload = (evt) => {
        $q.dialog({
          component: MarkdownPreviewDialog,

          componentProps: {
            markdownFile: {
              name: markdownFile.value.name,
              text: evt.target.result
            }
          }
        })
          .onOk(() => {
            markdownFile.value = null
          })
      }
    }

    function rejectFile() {
      Notify.create({
        message: "Le fichier doit être au format Markdown (.md)",
        type: "warning",
        icon: "warning",
      })
    }

    return {
      markdownFile,

      openMarkdownPreviewDialog,
      rejectFile
    }
  },
  methods: {
    openMarkdown() {
      this.$refs.openMarkdown.pickFiles()
    }
  }
});
</script>
