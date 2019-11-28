<template>
<v-toolbar height="55" max-height="55">
      <v-spacer></v-spacer>
      <v-toolbar-items right>
        <v-btn text @click="$router.push('sign')">로그인</v-btn>
        <v-btn text @click="signOut">로그아웃</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    signOut () {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  }
}
</script>
