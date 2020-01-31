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

  <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
         <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
         </template>
        <v-list-item
          v-for="subItem in item.subItems"
          :key="subItem.title"
          :to="subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
</v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      mini: true,
      items: [
        {
          icon: ' mdi-home',
          title: '끄적끄적',
          act: true,
          subItems: [
            {
              icon: 'home',
              title: '아무나',
              to: {
                path: '/'
              }
            }
          ]
        },
        {
          icon: ' mdi-tag-outline',
          title: '레벨테스트',
          subItems: [
            {
              icon: 'large',
              title: '손님용 페이지',
              to: {
                path: '/lv3'
              }
            },
            {
              icon: 'pets',
              title: '일반유저용 페이지',
              to: {
                path: '/lv2'
              }
            },
            {
              icon: 'pan_tool',
              title: '슈퍼유저용 페이지',
              to: {
                path: '/lv1'
              }
            },
            {
              icon: 'motorcycle',
              title: '관리자용 페이지',
              to: {
                path: '/lv0'
              }
            }
          ]
        },
        {
          icon: 'mdi-settings',
          title: '관리메뉴',
          subItems: [
            {
              icon: 'face',
              title: '사용자관리',
              to: {
                path: '/user'
              }
            },
            {
              icon: 'pageview',
              title: '페이지관리',
              to: {
                path: '/page'
              }
            },
            {
              icon: 'settings',
              title: '사이트관리',
              to: {
                path: '/site'
              }
            },
            {
              icon: 'settings',
              title: '게시판관리',
              to: {
                path: '/manage/boards'
              }
            }
          ]
        }
      ]
    }
  }
}
</script>
