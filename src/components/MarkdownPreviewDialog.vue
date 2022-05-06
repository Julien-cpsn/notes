<template>
  <q-dialog ref="dialog" @hide="onDialogHide" full-width>
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-center text-italic text-h6">{{ markdownFile.name }}</div>
      </q-card-section>

      <q-card-section class="q-py-none q-px-xl">
        <q-markdown :no-heading-anchor-links="true" :src="markdownFile.text" />
      </q-card-section>

      <q-card-actions class="q-pb-md" align="center">
        <q-btn flat label="Fermer" color="primary" @click="onOKClick"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { QMarkdown } from "@quasar/quasar-app-extension-qmarkdown";

export default {
  name: "MarkdownPreviewDialog",
  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  components: {
    QMarkdown
  },
  props: {
    markdownFile: {
      type: Object,
      default: () => {
        return {
          name: '',
          text: ''
        }
      }
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onOKClick () {

      this.$emit('ok')
      this.hide()
    },

    onCancelClick () {
      this.hide()
    }
  }
};
</script>

<style scoped>

</style>
