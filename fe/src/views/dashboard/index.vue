<template>
   <v-container fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="최근 게시물"
          number="343"
          tIcon="mdi-format-list-bulleted"
          tIconColor="success"
          bIcon="mdi-update"
          bIconColor="primary"
          bText="3시간 전"
        ></small-card>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="전체 사용자"
          number="12"
          tIcon="mdi-account"
          tIconColor="primary"
          bIcon="mdi-account-group"
          bIconColor="success"
          bText="2명 접속중"
        ></small-card>
      </v-flex>

      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="전체 조회수"
          number="431"
          tIcon="mdi-eye"
          tIconColor="info"
          bIcon="mdi-chart-line-variant"
          bIconColor="error"
          bText="43 감소"
        ></small-card>
      </v-flex>

      <v-flex xs12 sm6 md3 class="pb-2">
        <small-card
          title="전체 게시물"
          number="334234"
          tIcon="mdi-file"
          tIconColor="warning"
          bIcon="mdi-chart-line-variant"
          bIconColor="success"
          bText="256 증가"
        ></small-card>
      </v-flex>

      <v-flex xs12 sm4 class="pb-2">
        <trend-card
          title="주간 게시물 현황"
          :data="[4, 7, 9, 5, 6, 4, 5]"
          :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        ></trend-card>
      </v-flex>
      <v-flex xs12 sm4 class="pb-2">
        <trend-card
          title="주간 사용자 현황"
          :data="[3, 1, 2, 1, 0, 4, 2]"
          :gradient="['red', 'orange', 'yellow']"
        ></trend-card>
      </v-flex>
      <v-flex xs12 sm4 class="pb-2">
        <trend-card
          title="주간 조회수 현황"
          :data="[33, 22, 2, 43, 33, 1, 55]"
          :gradient="['blue', 'green', 'sky']"
        ></trend-card>
      </v-flex>

      <v-flex xs12 sm6 class="pb-2">
        <link-card></link-card>
      </v-flex>
      <v-flex xs12 sm6 class="pb-2">
        <board-card></board-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import smallCard from '@/components/dashboard/smallCard'
import trendCard from '@/components/dashboard/trendCard'
import linkCard from '@/components/dashboard/linkCard'
import boardCard from '@/components/dashboard/boardCard'

export default {
  components: {
    smallCard,
    trendCard,
    boardCard,
    linkCard
  }
}
</script>
