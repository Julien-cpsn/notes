<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <router-link
          to="/notes"
          class="flex column justify-center q-ml-xs q-mr-md text-weight-thin text-white"
          style="text-decoration: none"
        >
          <div>Notes</div>
          <q-icon name="notes"/>
        </router-link>

        <q-input
          :dark="!darkMode"
          standout
          dense
          v-model="fileName"
          class="q-ml-xs q-mr-auto"
          :input-class="'text-right ' + (darkMode ? 'text-white':'')"
          :maxlength="20"

          :error="!$store.getters['markdown/isFileNameValid']"
          hide-bottom-space
        >
          <template v-slot:default>
            <q-tooltip v-if="!$store.getters['markdown/isFileNameValid']" class="text-center">
              Le fichier doit avoir un nom
            </q-tooltip>
          </template>

          <template v-slot:append>
            <div :class="'text-subtitle2 text-weight-regular q-pa-none q-my-auto ' + (darkMode ? 'text-white':'')" style="opacity: 0.7">.md</div>
          </template>
        </q-input>

        <q-space />

        <toolbar-actions />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import ToolbarActions from "components/ToolbarActions";

export default defineComponent({
  name: "MainLayout",
  components: {
    ToolbarActions
  },
  computed: {
    fileName: {
      get() {
        return this.$store.getters['markdown/selectedFile'].name
      },
      set(value) {
        this.$store.commit('markdown/setFileName', value)
      }
    },
    darkMode() {
      return this.$store.state.user.darkMode
    },
  }
})
</script>
