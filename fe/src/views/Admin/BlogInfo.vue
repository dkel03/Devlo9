<template>
  <v-container :grid-list-md="!$vuetify.breakpoint.xs">
    <admin-tool-bar page="Blog Information"></admin-tool-bar>
    <v-layout wrap row>
      <v-flex class="pa-2" xs12 sm6>
        <v-card class="mx-auto elevation-0" outlined>
          <v-card-title class="ml-2 font-weight-light">Blog Name</v-card-title>
          <v-card-text>
            <home-card
              :Title="blogInfo.title"
              :SubTitle="blogInfo.subtitle"
              :Author="blogInfo.author.name"
            ></home-card>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="blogInfo.title" label="Title" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="blogInfo.subtitle" label="SubTitle" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n7">
              <v-spacer />
              <v-btn class="mr-3 elevation-0" color="grey lighten-2" @click="putBlogInfo()">
                <v-icon left>save</v-icon>
                save
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex class="pa-2" xs12 sm6>
        <v-card class="elevation-0" outlined>
          <v-card-title class="ml-2 font-weight-light">Author</v-card-title>
          <v-card-text>
            <v-card class="elevation-0" outlined width="200">
              <author-info :author="blogInfo.author"></author-info>
            </v-card>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="blogInfo.author.name" label="Name" outlined></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="blogInfo.author.job" label="Job" outlined></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-n7">
              <v-spacer />
              <v-btn class="mr-3 elevation-0" color="grey lighten-2" @click="putBlogInfo()">
                <v-icon left>save</v-icon>
                save
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex class="pa-2" xs12>
        <v-card class="elevation-0" outlined>
          <v-card-title class="ml-2 font-weight-light">About</v-card-title>
          <v-card-text>
            <editor v-model="blogInfo.about" height="500px"/>
            <v-row class="mt-5">
              <v-spacer />
              <v-btn class="mr-3 elevation-0" color="grey lighten-2" @click="putBlogInfo()">
                <v-icon left>save</v-icon>
                save
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import { Editor } from '@toast-ui/vue-editor'

/* Components */
import adminToolBar from '@/components/Admin/adminToolBar'
import homeCard from '@/components/Blog/homeCard'
import authorInfo from '@/components/Blog/authorInfo'

export default {
  components: {
    'editor': Editor,
    'adminToolBar': adminToolBar,
    'homeCard': homeCard,
    'authorInfo': authorInfo
  },
  data () {
    return {
      Title: 'Jay_Kim',
      SubTitle: '기술블로그',
      Author: 'Jay_Kim',
      Job: 'Developer',
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
    },
    putBlogInfo () {
      this.$axios.put('/blogInfo', this.blogInfo)
        .then(r => {
          this.getBlogInfo()
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
