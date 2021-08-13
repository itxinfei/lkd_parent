<template>
  <div class="app-wrapper">
    <navbar />
    <sidebar />
    <app-main />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { Navbar, Sidebar, AppMain } from './components'

@Component({
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
})
export default class extends Vue {

}
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}
</style>
