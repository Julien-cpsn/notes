<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <router-link
          to="/"
          class="flex column justify-center q-ml-xs q-mr-md text-weight-thin text-white"
          style="text-decoration: none"
        >
          <div>Julien C.</div>
          <q-icon name="person"/>
        </router-link>

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
import { defineComponent, ref } from "vue";
import ToolbarActions from "components/ToolbarActions";

export default defineComponent({
  name: "MainLayout",
  components: {
    ToolbarActions
  },
  computed: {
    darkMode() {
      return this.$store.state.user.darkMode
    },
  }
})
</script>
