<template>
<v-toolbar height="55" max-height="55">
      <v-spacer></v-spacer>
      <v-toolbar-items right>
        <v-btn text v-if="!$store.state.token" @click="$router.push('sign')">로그인</v-btn>
        <v-btn text v-else @click="signOut">로그아웃</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    signOut () {
      this.$store.commit('delToken')
      this.$router.push('/')
    }
  }
}
</script>
