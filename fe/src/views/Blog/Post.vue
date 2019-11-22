<template>
  <v-container :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex class="pa-2" xs12>
        <v-card class="mx-auto elevation-0" outlined>
          <v-img
            class="align-end"
            height="200px"
            src="@/assets/simple_background.jpg"
          >
            <v-card-title class="headline">{{post.title}}</v-card-title>
            <v-card-subtitle>
              <span>{{post.subtitle}}</span><br>
              <span class="caption">{{id2date(post._id)}}</span>
            </v-card-subtitle>
          </v-img>
          <v-card-text>
            <v-progress-circular
              indeterminate
              color="grey darken-2"
              v-if="loading"
            ></v-progress-circular>
            <viewer :value="post.content" />
          </v-card-text>
          <v-card-text>
            <v-flex class="pa-2" xs12>
              <div class="comments">
                <vue-disqus shortname="devlog-11" :identifier="post._id" :title="post.title"></vue-disqus>
              </div>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import 'tui-editor/dist/tui-editor-contents.css'
import 'highlight.js/styles/github.css'
import { Viewer } from '@toast-ui/vue-editor'

export default {
  components: {
    'viewer': Viewer
  },
  data () {
    return {
      loading: false,
      post: {}
    }
  },
  methods: {
    getPost () {
      const postId = this.$route.params.postId
      this.loading = true
      this.$axios.get(`/post/one/${postId}`)
        .then((r) => {
          this.post = r.data.d
          this.loading = false
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    id2date (_id) {
      if (!_id) return '잘못된 시간 정보'
      return new Date(parseInt(_id.substring(0, 8), 16) * 1000).toLocaleString()
    }
  },
  mounted () {
    this.getPost()
  }
}
</script>
<style>
  p {
    font-size: 16px
  }
</style>
