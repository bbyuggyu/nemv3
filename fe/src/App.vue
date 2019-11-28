
<template>
  <v-app>
    <NavigationBar></NavigationBar>
    <ToolBar></ToolBar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import ToolBar from '@/components/ToolBar'

export default {
  name: 'App',
  components: { NavigationBar, ToolBar },
  data: () => ({
  })
}
</script>
