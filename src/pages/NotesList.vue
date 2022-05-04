<template>
  <q-page class="flex items-center justify-center">
    <div class="flex column" style="width: 50%">
      <div class="flex row justify-evenly">
        <q-card
          v-for="(file, index) in files"
          :key="index"
          class="q-mx-sm q-my-md shadow-7"
          style="border-radius: 8px"
        >
          <q-card-section class="q-pa-none">
            <q-img style="width: 200px!important; border-radius: 8px" class="full-width" src="notes_cropped.png">
              <div class="fixed-full flex items-center justify-center text-h5 text-center">
                <router-link
                  :to="{ name: 'note', params: { index: index } }"
                  class="text-weight-thin text-white"
                  style="width: 95%; text-decoration: none"
                >
                  <div class="text-no-wrap ellipsis">{{ file.name }}</div>
                </router-link>
                <q-card-actions class="absolute-bottom justify-evenly">
                  <q-btn flat round color="light" icon="notes" :to="{ name: 'note', params: { index: index } }">
                    <q-tooltip>Prendre en notes</q-tooltip>
                  </q-btn>
                  <q-btn flat round color="light" icon="preview" @click="viewNote(index)">
                    <q-tooltip>Prévisualiser</q-tooltip>
                  </q-btn>
                </q-card-actions>
              </div>
            </q-img>
            <q-btn flat round size="md" padding="none" icon="close" color="grey" class="absolute-top-right q-mr-sm q-mt-sm" @click="removeNote(index)" />
          </q-card-section>
        </q-card>
        <q-card class="q-mx-xs q-my-md" style="width: 200px!important; border-radius: 8px">
          <q-card-section>
            <div class="q-mt-md flex items-baseline justify-center text-h4 text-center">
              <div class="text-weight-thin">
                Ajouter une note
              </div>
              <q-card-actions class="justify-center">
                <q-btn flat round color="light" icon="add">
                  <q-popup-edit v-model="newFileName" v-slot="scope" @update:model-value="addNote">
                    <q-input
                      v-model="scope.value"
                      dense
                      autofocus
                      counter
                      :maxlength="20"
                      @keyup.enter="scope.set"
                    />
                  </q-popup-edit>
                </q-btn>
              </q-card-actions>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { QMarkdown } from '@quasar/quasar-app-extension-qmarkdown'
import { Notify, useMeta } from "quasar";
import MarkdownPreviewDialog from "components/MarkdownPreviewDialog";
import { getFile } from "src/store/markdown/getters";

export default defineComponent({
  name: "NoteList",
  setup() {
    useMeta(() => {
      return {
        title: 'Julien C.'
      }
    })

    const newFileName = null

    return {
      newFileName
    }
  },
  computed: {
    files() {
      return this.$store.state.markdown.files
    }
  },
  methods: {
    addNote() {
      if (this.newFileName.trim() !== null && this.newFileName.trim() !== '') {
        this.$store.commit('markdown/addFile', this.newFileName.trim())
        this.newFileName = null
      }
    },
    removeNote(index) {
      this.$store.commit('markdown/removeFile', index)
    },
    viewNote(index) {
      const file = this.$store.getters["markdown/getFile"](index)
      this.$q.dialog({
        component: MarkdownPreviewDialog,

        componentProps: {
          markdownFile: file
        }
      })
    }
  }
});
</script>
