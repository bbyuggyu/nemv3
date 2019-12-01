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
      items: [
        {
          title: 'Home',
          icon: 'mdi-home-city',
          to: {
            path: '/'
          }
        },
        {
          icon: 'mdi-account',
          title: 'lv0',
          to: {
            path: '/lv0'
          }
        },
        {
          icon: 'mdi-account',
          title: 'lv1',
          to: {
            path: '/lv1'
          }
        },
        {
          icon: 'mdi-account',
          title: 'lv2',
          to: {
            path: '/lv2'
          }
        },
        {
          icon: 'mdi-account',
          title: 'lv3',
          to: {
            path: '/lv3'
          }
        },
        {
          icon: 'mdi-account-group-outline',
          title: '사용자관리',
          to: {
            path: '/user'
          }
        },
        {
          icon: 'mdi-account-group-outline',
          title: '페이지관리',
          to: {
            path: '/page'
          }
        }
      ],
      mini: true
    }
  }
}
</script>
