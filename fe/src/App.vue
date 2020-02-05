
<template>
  <v-app :dark="siteDark">

    <NavigationBar></NavigationBar>

    <ToolBar></ToolBar>

    <Footer></Footer>

    <v-content>
      <router-view />
    </v-content>

    <v-snackbar
       v-model="$store.state.sb.act"
       :color="$store.state.sb.color"
     >
       {{ $store.state.sb.msg }}
       <v-btn
         text
         @click="$store.commit('pop', { act: false })"
       >
         닫기
       </v-btn>
     </v-snackbar>

  </v-app>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import ToolBar from '@/components/ToolBar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: { NavigationBar, ToolBar, Footer },
  data () {
    return {
      siteDark: false
    }
  },
  mounted () {
    this.getSite()
  },
  methods: {
    getSite () {
      this.$axios.get('/site')
        .then(r => {
          console.log(r.data.d)
          this.siteDark = r.data.d.dark
        })
        .catch(e => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    }
  }
  // created () {
  //   this.$vuetify.theme.dark = true
  // }
}
</script>
