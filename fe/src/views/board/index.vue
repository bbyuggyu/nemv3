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
        :page.sync="page"
        @page-count="pageCount = $event"
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
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
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

   <v-dialog v-model="dialog" max-width="500px" :fullscreen="$vuetify.breakpoint.xs">
      <v-card v-if="!dlMode">
        <v-card-title>
          <span class="headline">제목 : {{selArticle.title}}</span>
        </v-card-title>
        <v-card-text>
          <p>내용</p>
          <!-- {{selArticle.content}} -->
          <viewer :value="selArticle.content" />
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

        <v-divider></v-divider>
        <v-list two-line v-for="comment in selArticle._comments" :key="comment._id">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{comment.content}}</v-list-item-title>
              <v-list-item-subtitle>{{comment._user ? comment._user.id : '손님'}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                  icon
                  ripple
                  @click="commentDialogOpen(comment)"
              >
                <v-icon color="warning lighten-1">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-action>
              <v-btn
                  icon
                  ripple
                  @click="delComment(comment)"
              >
                <v-icon color="error">
                  mdi-close
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>

        <v-text-field
              label="댓글 작성"
              v-model="formComment.content"
              append-icon="mdi-message"
              @keyup.enter="checkRobot"
              @click:append="checkRobot"
          >
          </v-text-field>

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
                <!-- <v-textarea
                  label="내용"
                  persistent-hint
                  required
                  v-model="form.content"
                ></v-textarea> -->
                <editor v-model="form.content"/>
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

    <v-dialog width="400" v-model="commentDialog">
      <v-card>
        <v-card-text>
          <v-text-field
              label="댓글 수정"
              v-model="selComment.content"
              @keyup.enter="modComment()"
              flat
              height="100"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" @click="modComment()">
            수정
          </v-btn>
          <v-btn color="secondary" @click="commentDialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <vue-recaptcha
        ref="recaptcha"
        :sitekey="$cfg.recaptchaSiteKey"
        size="invisible"
        @verify="onVerify"
        @expired="onExpired"
    >
    </vue-recaptcha>

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
      page: 1,
      pageCount: 0,
      loading: false,
      dialog: false,
      commentDialog: false,
      dlMode: 0, // 0: read, 1: write, 2: modify
      selArticle: {
        _comments: []
      },
      selComment: {
        content: ''
      },
      formComment: {
        content: '',
        response: ''
      },
      ca: false,
      lvs: [0, 1, 2, 3],
      form: {
        title: '',
        content: '',
        response: ''
      },
      response: '',
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
    commentDialogOpen (c) {
      this.commentDialog = true
      this.selComment = c
    },
    onVerify (r) {
      this.response = r
      this.$refs.recaptcha.reset()
      if (this.dlMode === 0) this.addComment()
      else if (this.dlMode === 1) this.add()
      else if (this.dlMode === 2) this.mod()
    },
    onExpired () {
      this.form.response = ''
      this.$refs.recaptcha.reset()
    },
    checkRobot () {
      if (!this.response.length) return this.$refs.recaptcha.execute()
      if (this.dlMode === 0) this.addComment()
      else if (this.dlMode === 1) this.add()
      else if (this.dlMode === 2) this.mod()
    },
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
      this.form.response = this.response
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
          this.selArticle._comments = data.d._comments
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
    addComment () {
      this.formComment.response = this.response
      this.$axios.post(`comment/${this.selArticle._id}`, this.formComment)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.formComment.content = ''
          this.read(this.selArticle)
          // this.list()
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    delComment (cmt) {
      this.$axios.delete(`comment/${cmt._id}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.read(this.selArticle)
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    modComment () {
      if (!this.selComment.content) return this.$store.commit('pop', { msg: '내용을 작성해주세요', color: 'warning' })
      this.commentDialog = false
      this.$axios.put(`comment/${this.selComment._id}`, { content: this.selComment.content })
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.read(this.selArticle)
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
.v-data-footer__icons-before {
  display: none;
}
.v-data-footer__icons-after {
  display: none;
}
</style>
