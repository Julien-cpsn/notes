<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" style="width: 450px">
      <q-card-section>
        <div class="text-h6">Choisir un thème</div>
      </q-card-section>

      <q-card-section class="flex justify-center q-pt-none q-my-sm">
        <div class="flex row">
          <q-radio v-model="selectedTheme" :val="0" label="Aucun" class="q-mr-md"/>
          <q-radio v-model="selectedTheme" :val="1" class="q-mr-md">
            <q-img width="100px" class="rounded-borders" src="https://raw.githubusercontent.com/pages-themes/architect/master/thumbnail.png"/>
          </q-radio>
          <q-radio v-model="selectedTheme" :val="2" class="q-mr-md">
            <q-img width="100px" class="rounded-borders" src="https://raw.githubusercontent.com/pages-themes/cayman/master/thumbnail.png"/>
          </q-radio>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Exporter" color="primary" @click="onOKClick" />
        <q-btn flat label="Annuler" color="primary" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ThemeSelectionDialog",
  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  setup() {
    const selectedTheme = ref(0)

    return {
      selectedTheme
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
      this.$emit('ok', this.selectedTheme)
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
