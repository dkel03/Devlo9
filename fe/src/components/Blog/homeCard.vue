<template>
  <v-card class="mx-auto elevation-0" outlined>
    <v-progress-linear
      indeterminate
      color="grey darken-2"
      v-if="loading"
    ></v-progress-linear>
    <v-card-title>
      <span class="font-weight-thin display-1 mr-2">{{Title}}</span>
      <span class="font-weight-thin mt-2">{{SubTitle}}</span>
    </v-card-title>
    <v-card-subtitle class="pt-2">
      <span class="font-weight-bold mx-1">By {{Author}}</span>
      <span class="mx-1">방문 {{blogInfo.cnt.visit}}</span>
      <span class="ml-1">포스트 7</span>
    </v-card-subtitle>
    <v-card-text>
      <v-chip
        v-for="l in largeCats"
        :key="l.name"
        class="mr-2"
        color="dark"
        outlined
      ># {{l.name}}</v-chip>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: [ 'Title', 'SubTitle', 'Author' ],
  data () {
    return {
      loading: false,
      largeCats: [],
      blogInfo: {}
    }
  },
  methods: {
    getLargeCat () {
      this.$axios.get('/category/largeCat/list')
        .then(r => {
          this.largeCats = r.data.ds
        })
        .catch(e => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    getBlogInfo () {
      this.loading = true
      this.$axios.get('/blogInfo/home')
        .then(r => {
          this.blogInfo = r.data.d
          this.loading = false
        })
        .catch(e => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  },
  mounted () {
    this.getLargeCat()
    this.getBlogInfo()
  }
}
</script>
