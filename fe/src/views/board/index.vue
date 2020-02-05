<template>
  <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs" :class="$vuetify.breakpoint.xs ? 'pa-0' : ''">
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
            <v-card-title class="headline">
            <v-tooltip bottom>
              <template v-slot:activator="{}">{{board.name}}</template>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-flex xs4>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
          </v-card-title>
        </v-card>
      </v-flex>
      <!-- <v-flex xs12 sm6 md4 v-for="article in articles" :key="article._id">
        {{article}}
      </v-flex> -->
     <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="articles"
        :loading="loading"
        :search="search">
        <template v-slot:item.id="{ item }">
          <td :class="headers[0].class">{{ id2date(item._id)}}</td>
        </template>
        <template v-slot:item.title="{ item }">
          <td :class="headers[1].class"><a @click="read(item)"> {{ item.title }}</a></td>
        </template>
        <template v-slot:item.user="{ item }">
          <td :class="headers[2].class">{{ item._user ? item._user.id : '손님' }}</td>
        </template>
        <template v-slot:item.view="{ item }">
          <td :class="headers[3].class">{{ item.cnt.view }}</td>
        </template>
        <template v-slot:item.like="{ item }">
          <td :class="headers[4].class">{{ item.cnt.like }}</td>
        </template>
      </v-data-table>
     </v-flex>
    </v-layout>

    <v-btn
      color="pink"
      dark
      small
      absolute
      bottom
      right
      fab
      @click="addDialog"
    >
      <v-icon>+</v-icon>
    </v-btn>

   <v-dialog v-model="dialog" persistent max-width="500px" :fullscreen="$vuetify.breakpoint.xs">
      <v-card v-if="!dlMode">
        <v-card-title>
          <span class="headline">{{selArticle.title}}</span>
        </v-card-title>
        <v-card-text>
          {{selArticle.content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning darken-1" text @click.native="modDialog()">수정</v-btn>
          <v-btn color="error darken-1" text @click.native="ca=true">삭제</v-btn>
          <v-btn color="secondary darken-1" text @click.native="dialog = false">닫기</v-btn>
        </v-card-actions>
        <v-card-text>
          <v-card-text v-if="ca">
            <v-alert v-model="ca" type="warning">
              <h4>정말 진행 하시겠습니까?</h4>
              <v-btn color="error" @click="del()">확인</v-btn>
              <v-btn color="secondary" @click="ca=false">취소</v-btn>
            </v-alert>
          </v-card-text>
        </v-card-text>
      </v-card>
      <v-card v-else>
        <v-card-title>
          <span class="headline">글 {{(dlMode === 1) ? '작성' : '수정'}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="제목"
                  persistent-hint
                  required
                  v-model="form.title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  label="내용"
                  persistent-hint
                  required
                  v-model="form.content"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="(dlMode === 1) ? add() : mod()">확인</v-btn>
          <v-btn color="red darken-1" text @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>
<script>
export default {
  components: { },
  data () {
    return {
      board: {
        name: '로딩중...',
        rmk: '무엇?'
      },
      search: '',
      headers: [
        { text: '날짜', value: 'id', sortable: true },
        { text: '제목', value: 'title', sortable: true },
        { text: '글쓴이', value: 'user', sortable: false },
        { text: '조회수', value: 'view', sortable: true },
        { text: '추천', value: 'like', sortable: true }
      ],
      articles: [],
      loading: false,
      dialog: false,
      dlMode: 0, // 0: read, 1: write, 2: modify
      selArticle: {},
      ca: false,
      lvs: [0, 1, 2, 3],
      form: {
        title: '',
        content: ''
      },
      dlRead: false,
      rd: {
        title: '',
        content: ''
      }
    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to.path, from.path)
      this.getBoard()
    }
  },
  mounted () {
    this.getBoard()
  },
  methods: {
    addDialog () {
      this.dialog = true
      this.dlMode = 1
      this.form = {
        title: '',
        content: ''
      }
    },
    modDialog () {
      this.dlMode = 2
      this.form = {
        title: this.selArticle.title,
        content: this.selArticle.content
      }
    },
    getBoard () {
      this.$axios.get(`board/read/${this.$route.params.name}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.board = data.d
          this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    add () {
      if (!this.form.title) return this.$store.commit('pop', { msg: '제목을 작성해주세요', color: 'warning' })
      if (!this.form.content) return this.$store.commit('pop', { msg: '내용을 작성해주세요', color: 'warning' })
      this.$axios.post(`article/${this.board._id}`, this.form)
        .then((r) => {
          this.dialog = false
          this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    list () {
      if (this.loading) return
      this.loading = true
      this.$axios.get(`article/list/${this.board._id}`)
        .then(({ data }) => {
          this.articles = data.ds
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    },
    read (atc) {
      this.selArticle = atc
      this.loading = true
      this.$axios.get(`article/read/${atc._id}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.dlMode = 0
          this.dialog = true
          this.selArticle.content = data.d.content
          this.selArticle.cnt.view = data.d.cnt.view
          this.loading = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    },
    mod () {
      if (!this.form.title) return this.$store.commit('pop', { msg: '제목을 작성해주세요', color: 'warning' })
      if (!this.form.content) return this.$store.commit('pop', { msg: '내용을 작성해주세요', color: 'warning' })
      if (this.selArticle.title === this.form.title && this.selArticle.content === this.form.content) return this.$store.commit('pop', { msg: '변경된 내용이 없습니다', color: 'warning' })
      this.$axios.put(`article/${this.selArticle._id}`, this.form)
        .then(({ data }) => {
          this.dialog = false
          if (!data.success) throw new Error(data.msg)
          this.selArticle.title = data.d.title
          this.selArticle.content = data.d.content
          // this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    del () {
      this.$axios.delete(`article/${this.selArticle._id}`)
        .then(({ data }) => {
          this.dialog = false
          if (!data.success) throw new Error(data.msg)
          this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    id2date (val) {
      if (!val) return '잘못된 시간 정보'
      return new Date(parseInt(val.substring(0, 8), 16) * 1000).toLocaleString()
    }
  }
}
</script>

<style>
.v-data-footer__pagination {
  display: none;
}
</style>
