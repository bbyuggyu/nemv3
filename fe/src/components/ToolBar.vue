<template>
  <v-app-bar app height="55" max-height="55">
    <div class="center">
    <v-toolbar-title v-text="siteTitle"></v-toolbar-title>
    </div>
    <v-spacer></v-spacer>
    <v-toolbar-items right>
      <template v-if="!$store.state.token">
        <v-btn text @click="$router.push('/sign')">로그인</v-btn>
        <v-btn text @click="$router.push('/register')">회원가입</v-btn>
      </template>
      <v-btn text v-else @click="signOut">로그아웃</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      siteTitle: '미정'
    }
  },
  mounted () {
    this.getSite()
  },
  methods: {
    signOut () {
      this.$store.commit('delToken')
      this.$router.push('/')
    },
    getSite () {
      this.$axios.get('/site')
        .then(r => {
          this.siteTitle = r.data.d.title
        })
        .catch(e => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    }
  }
}
</script>

<style scoped>
.center{
  position: absolute;
  left: 50%;
}
</style>
