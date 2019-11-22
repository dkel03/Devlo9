<template>
  <v-container :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex class="pa-2" xs12>
        <v-card class="mx-auto elevation-0" outlined>
          <v-card-title>
            <span class="font-weight-thin display-1 mr-2">{{smallCat.name}}</span>
            <span class="font-weight-thin mt-2">({{posts.length}})</span>
          </v-card-title>
          <v-card-subtitle>
            <span class="body-1 font-weight-light">{{smallCat.summary}}</span>
          </v-card-subtitle>
          <v-card-text>
            <v-chip class="mr-2" color="dark" outlined># {{smallCat._largeCat.name}}</v-chip>
            <v-chip class="mr-2" color="dark" outlined># {{smallCat.name}}</v-chip>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 class="pa-2" v-for="p in posts" :key="p.title">
        <v-card class="elevation-0">
          <v-card-title @click="$router.push('/post/'+p._id)">{{p.title}}</v-card-title>
          <v-card-text class="mt-n3">{{p.subtitle}}</v-card-text>
          <v-card-subtitle class="mt-n3">
            <v-list-item class="ma-n3">
              <v-list-item-avatar size="32">
                <v-img
                  class="elevation-6"
                  src="@/assets/avatar.svg"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Jay_Kim</v-list-item-title>
              </v-list-item-content>
              <v-spacer/>
              <v-chip small outlined><v-icon left color="grey">remove_red_eye</v-icon>{{p.cnt.view}}</v-chip>
              <v-chip small outlined><v-icon left color="grey">share</v-icon>{{p.cnt.share}}</v-chip>
            </v-list-item>
          </v-card-subtitle>
        </v-card>
        <v-divider />
      </v-flex>
      <v-flex xs12 class="mt-5">
        <template>
          <div class="text-center">
            <v-pagination
              v-model="page"
              :length="2"
              color="grey"
            ></v-pagination>
          </div>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      page: 1,
      smallCat: {},
      posts: []
    }
  },
  methods: {
    getSmallCat () {
      const smallCat = this.$route.params.smallCat
      this.$axios.get(`/category/smallCat/one/${smallCat}`)
        .then((r) => {
          this.smallCat = r.data.d
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    getPosts () {
      const smallCat = this.$route.params.smallCat
      this.$axios.get(`/post/list/${smallCat}`)
        .then((r) => {
          this.posts = r.data.ds
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  },
  mounted () {
    this.getSmallCat()
    this.getPosts()
  }
}
</script>
