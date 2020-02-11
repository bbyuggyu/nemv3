<template>
  <v-card height="100%">
    <v-toolbar dark tabs>
      <v-toolbar-title>{{board.name}}</v-toolbar-title>
      <v-tabs
        slot="extension"
        v-model="tab"
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab v-for="article in articles" :key="article._id">
          {{ article.title }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="article in articles" :key="article._id">
        <v-card flat>
          <v-card-text v-html="article.content"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-btn @click="test">test</v-btn>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      board: {
        name: '로딩중...',
        title: '로딩중...',
        rmk: '무엇?'
      },
      tab: null,
      loading: false,
      params: {
        draw: 0,
        search: '',
        skip: 0,
        sort: '_id',
        order: 1,
        limit: 10
      },
      articles: []
    }
  },
  mounted () {
    this.getBoard()
  },
  watch: {
    tab (t) {
      console.log(55, t)
      if (this.articles.length) this.read(t)
    }
  },
  methods: {
    test () {
      this.articles[0].content = Math.random()
    },
    getBoard () {
      this.$axios.get(`board/read/Link`)
        .then(({ data }) => {
          console.log(66, data)
          if (!data.success) throw new Error(data.msg)
          this.board = data.d
          this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    list () {
      if (!this.board._id) return
      this.loading = true
      this.params.draw += 1

      this.$axios.get(`article/list/${this.board._id}`, { params: this.params })
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          data.ds.forEach((v) => {
            v.content = ''
          })
          this.articles = data.ds
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    },
    read (i) {
      const atc = this.articles[i]
      this.loading = true
      this.$axios.get(`article/read/${atc._id}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          console.log(100, data)
          atc.content = data.d.content
          atc.cnt.view = data.d.cnt.view
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    }
  }
}
</script>
