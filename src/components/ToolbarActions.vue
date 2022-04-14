<template>
  <q-btn-dropdown flat dense class="rounded-borders q-mr-xs" label="Theme" no-caps>
    <q-btn flat size="xs" padding="xs" label="Reset" @click="themeColor = '#1976d2'"/>
    <q-color v-model="themeColor" no-header-tabs class="my-picker" />
  </q-btn-dropdown>

  <q-btn flat round class="q-mr-sm" size="md" padding="sm" :icon="darkMode ? 'light_mode':'dark_mode'" @click="toggleDarkMode"/>

  <q-icon class="q-mr-sm" name="info" size="sm">
    <q-tooltip ref="TODOS" id="TODOS" class="text-no-wrap" :hide-delay="1000">
      <q-markdown class="q-px-sm" :src="ABOUT"/>
    </q-tooltip>
  </q-icon>
</template>

<script>
import { setCssVar } from 'quasar'
import { QMarkdown } from "@quasar/quasar-app-extension-qmarkdown";
import ABOUT from '../../ABOUT.md'
import { ref } from "vue";

export default {
  name: "ToolbarActions",
  components: {
    QMarkdown
  },
  setup() {
    return {
      ABOUT: ref(ABOUT),
    }
  },
  mounted() {
    this.$q.dark.set(this.darkMode)
    setCssVar('primary', this.themeColor)
  },
  computed: {
    fileName: {
      get() {
        return this.$store.state.markdown.fileName
      },
      set(value) {
        this.$store.commit('markdown/setFileName', value)
      }
    },
    darkMode() {
      return this.$store.state.user.darkMode
    },
    themeColor: {
      get() {
        return this.$store.state.user.themeColor
      },
      set(value) {
        this.$store.commit('user/setThemeColor', value)
      }
    }
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit('user/toggleDarkMode')
    }
  },
  watch: {
    darkMode() {
      this.$q.dark.set(this.darkMode)
    },
    themeColor(newValue) {
      setCssVar('primary', newValue)
    }
  }
};
</script>

<style scoped>
#TODOS h3 {
  margin-top: 8px;
  margin-bottom: 4px;
}

#TODOS hr {
  border: none;
  border-bottom: 1px solid lightgray;
  opacity: 0.5;
  margin-top: 0;
  margin-bottom: 12px;
}
</style>
