<template>
  <v-container fluid>
    <v-row dense v-for="u in users"  v-bind:key="u">
      <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>{{u.name}}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">{{u.age}}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="orange"
            text
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
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: []
    }
  },

  mounted () {
    axios.get('http://localhost:3000/api/user')
      .then((r) => {
        this.users = r.data.users
        console.log(r)
      })
      .catch((e) => {
        console.error(e.message)
      })
  }
}
</script>
