<template>
<v-navigation-drawer v-model='drawer' :mini-variant.sync='mini' permanent app>
  <v-list-item>
    <v-list-item-avatar>
      <v-img src='https://randomuser.me/api/portraits/men/85.jpg'></v-img>
    </v-list-item-avatar>

    <v-list-item-title>John Leider</v-list-item-title>

    <v-btn icon @click.stop='mini = !mini'>
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-list-item>

  <v-divider></v-divider>

  <v-list dense>
    <v-list-item v-for='item in items' :key='item.title' link :to="item.to">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [{
        title: 'Home',
        icon: 'mdi-home-city',
        to: {
          path: '/'
        }
      },
      {
        title: 'My Account',
        icon: 'mdi-account'
      },
      {
        title: 'Users',
        icon: 'mdi-account-group-outline',
        to: {
          path: '/User'
        }
      }],
      mini: true
    }
  }
}
</script>
