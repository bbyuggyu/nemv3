<template>
    <v-footer fixed app>
      <span>{{siteCopyright}}</span>
    </v-footer>
</template>

<script>
export default {
  data () {
    return {
      siteCopyright: '미정'
    }
  },
  mounted () {
    this.getSite()
  },
  methods: {
    getSite () {
      this.$axios.get('/site')
        .then(r => {
          this.siteCopyright = r.data.d.copyright
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>
