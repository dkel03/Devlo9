<template>
  <v-container :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex class="pa-2" xs12>
        <v-card class="mx-auto elevation-0" outlined>
          <v-card-title class="headline">About</v-card-title>
          <v-card-subtitle>Jay_Kim</v-card-subtitle>
          <v-card-text>
            <viewer :value="blogInfo.about" />
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
      editorText: '{\n  name: Jay_Kim  \n}',
      blogInfo: {}
    }
  },
  methods: {
    getBlogInfo () {
      this.$axios.get('/blogInfo/home')
        .then(r => {
          this.blogInfo = r.data.d
        })
        .catch(e => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  },
  mounted () {
    this.getBlogInfo()
  }
}
</script>
<style>
  .tui-editor-contents p {
    font-size: 16px;
  }
</style>
