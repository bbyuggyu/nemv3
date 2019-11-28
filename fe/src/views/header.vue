<template>
  <v-container>
    <v-btn @click="headerSend">헤더 전송</v-btn>
    <!-- <v-btn @click="lsWrite">로컬스트레지 생성</v-btn>
    <v-btn @click="lsClear">로컬스트레지 삭제</v-btn> -->
    <v-btn @click="apiWithToken">토큰과 함께 전송</v-btn>
    <v-btn @click="apiWithTrash">이상한 문자와 함께 전송</v-btn>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
  methods: {
    headerSend () {
      axios.get('http://localhost:3000/api/test', { headers: { xxx: 1234, yyy: 'string??' } })
        .then(r => console.log(r))
        .catch(e => console.log(e))
    },
    lsWrite () {
      localStorage.setItem('token', 1234)
    },
    lsClear () {
      localStorage.clear()
    },
    apiWithToken () {
      const token = localStorage.getItem('token')
      axios.get('http://localhost:3000/api/test', { headers: { Authorization: token } })
        .then(r => console.log(r.data))
        .catch(e => console.log(e.message))
    },
    apiWithTrash () {
      axios.get('http://localhost:3000/api/test', { headers: { Authorization: 'abcdefghijk' } })
        .then(r => console.log(r.data))
        .catch(e => console.log(e.message))
    }
  }
}
</script>
