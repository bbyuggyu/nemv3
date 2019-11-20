<template>
  <v-container fluid grid-list-md>
    <v-row dense>
      <!-- <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-card-subtitle class="pb-0"></v-card-subtitle>

        <v-card-text>
          <v-textarea v-model='getMd'>
          </v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange"
            text
            @click="getReq"
          >
            Share
          </v-btn>

          <v-btn
            color="orange"
            text
          >
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-card-subtitle class="pb-0"></v-card-subtitle>

        <v-card-text>
          <v-textarea v-model='postMd'>
          </v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange"
            text
            @click="postReq"
          >
            Share
          </v-btn>

          <v-btn
            color="orange"
            text
          >
            Explore
          </v-btn>
        </v-card-actions>
      </v-card> -->
      <v-flex xs12 sm6 md4 v-for="u in users" v-bind:key="u.id">
        <v-col cols="12">
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <v-card-subtitle class="pb-0">{{ u.name }}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ u.age }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="orange"
                text
                @click="putDialog(u)"
              >
                수정
              </v-btn>

              <v-btn
                color="error"
                text
                @click="delUser(u._id)"
              >
                삭제
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-flex>
      <v-btn
        color="pink"
        dark
        right
        fixed
        fab
        bottom
        @click="mdUp"
        >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  v-model="userName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="userAges"
                  label="Age*"
                  required
                  v-model="userAge"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="putUser">수정</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="postUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
    >
      {{ sbMsg }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      getMd: '',
      postMd: '',
      putMd: '',
      delMd: '',
      dialog: false,
      userAges: [],
      userName: '',
      userAge: 0,
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },

  mounted () {
    for (let i = 10; i < 50; i++) this.userAges.push(i)
    this.getUsers()
  },

  methods: {
    getReq () {
      axios.get('http://localhost:3000/api/user')
        .then((r) => {
          this.getMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },

    postReq () {
      axios.post('http://localhost:3000/api/user', {
        name: '가정', age: 444 // req.body
      })
        .then((r) => {
          this.postMd = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },

    mdUp () {
      this.dialog = true
      this.userName = ''
      this.userAge = ''
    },

    postUser () {
      this.dialog = false
      axios.post('http://localhost:3000/api/user', {
        name: this.userName, age: this.userAge // req.body
      })
        .then((r) => {
          this.pop('사용자 등록 완료.')
          this.getUsers()
        })
        .catch((e) => {
          // console.error(e.message)
          this.pop(e.message)
        })
    },

    getUsers () {
      axios.get('http://localhost:3000/api/user', {
        name: this.userName, age: this.userAge // req.body
      })
        .then((r) => {
          this.users = r.data.users
        })
        .catch((e) => {
          // console.error(e.message)
          this.pop(e.message)
        })
    },

    putDialog (user) {
      this.putId = user._id
      this.dialog = true
      this.userName = user.name
      this.userAge = user.age
    },

    putUser () {
      this.dialog = false
      axios.put(`http://localhost:3000/api/user/${this.putId}`, {
        name: this.userName, age: this.userAge // req.body
      })
        .then((r) => {
          this.pop('사용자 수정 완료.')
          this.getUsers()
        })
        .catch((e) => {
          // console.error(e.message)
          this.pop(e.message)
        })
    },

    delUser (id) {
      axios.delete(`http://localhost:3000/api/user/${id}`)
        .then((r) => {
          this.pop('사용자 삭제 완료.')
          this.getUsers()
        })
        .catch((e) => {
          // console.error(e.message)
          this.pop(e.message)
        })
    },

    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}
</script>
