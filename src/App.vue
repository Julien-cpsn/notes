<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="sass">
.without-dropdown-icon .q-btn-dropdown__arrow
  display: none
</style>
