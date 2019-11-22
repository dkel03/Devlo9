<template>
  <v-container :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex class="pa-2" xs12>
        <home-card
          :Title="blogInfo.title"
          :SubTitle="blogInfo.subtitle"
          :Author="blogInfo.author.name"
        ></home-card>
      </v-flex>
      <v-flex class="pa-2" xs12>
        <v-progress-linear
          indeterminate
          color="grey darken-2"
          v-if="loading"
        ></v-progress-linear>
      </v-flex>
      <v-flex class="pa-2" xs12 sm6 lg4 v-for="p in posts" :key="p.title">
        <v-card
          class="mx-auto elevation-0"
          max-width=""
          outlined
        >
          <v-img
            class="align-end"
            height="200px"
            src="@/assets/simple_background.jpg"
          >
            <v-card-title><div @click="$router.push('/post/'+p._id)">{{p.title}}</div></v-card-title>
            <v-card-subtitle>{{id2date(p._id)}}</v-card-subtitle>
            <v-card-text class="ma-n2"><v-chip outlined small># {{p._smallCat.name}}</v-chip></v-card-text>
          </v-img>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar size="32">
                <v-img
                  class="elevation-6"
                  src="@/assets/avatar.svg"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{blogInfo.author.name}}</v-list-item-title>
              </v-list-item-content>
              <v-chip small outlined class="mr-1"><v-icon left color="grey">remove_red_eye</v-icon>{{p.cnt.view}}</v-chip>
              <v-chip small outlined><v-icon left color="grey">share</v-icon>{{p.cnt.share}}</v-chip>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* module import */
import moment from 'moment'

/* component import */
import homeCard from '@/components/Blog/homeCard'

export default {
  components: {
    'homeCard': homeCard
  },
  data () {
    return {
      loading: false,
      posts: [],
      blogInfo: {}
    }
  },
  methods: {
    getPosts () {
      this.loading = true
      this.$axios.get('/post/list')
        .then((r) => {
          this.posts = r.data.ds
          this.loading = false
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    getBlogInfo () {
      this.$axios.get('/blogInfo/home')
        .then(r => {
          this.blogInfo = r.data.d
        })
        .catch(e => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    id2date (_id) {
      moment.locale('ko')
      if (!_id) return '잘못된 시간 정보'
      var time = moment(new Date(parseInt(_id.substring(0, 8), 16) * 1000)).fromNow()
      return time
    }
  },
  mounted () {
    this.getBlogInfo()
    this.getPosts()
  }
}
</script>
