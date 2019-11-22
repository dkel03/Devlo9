<template>
  <v-container :grid-list-md="!$vuetify.breakpoint.xs">
    <admin-tool-bar page="Write Post"></admin-tool-bar>
    <v-layout wrap row>
      <v-flex xs12 class="pa-2">
        <v-card>
          <v-card-text>
            <v-row>
              <v-text-field class="pa-2" outlined label="Title" v-model="postForm.title"></v-text-field>
              <v-text-field class="pa-2" outlined label="Summary" v-model="postForm.subtitle"></v-text-field>
            </v-row>
            <v-row class="mt-n5">
              <v-col col-6>
                <v-select
                  class="pa-2"
                  :items="largeCatList"
                  label="대분류"
                  required
                  v-model="largeCatName"
                  outlined
                  dense
                ></v-select>
              </v-col>
              <v-col col-6>
                <v-select
                  class="pa-2"
                  :items="smallCatList"
                  label="소분류"
                  required
                  v-model="postForm._smallCat"
                  outlined
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <editor v-model="postForm.content"/>
          </v-card-text>
          <span>
            <v-spacer />
            <v-btn class="ma-5" @click="postPost()">등록</v-btn>
          </span>
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

export default {
  components: {
    'editor': Editor,
    'adminToolBar': adminToolBar
  },
  data () {
    return {
      category: [],
      largeCatList: [],
      largeCatName: '',
      postForm: {
        title: '',
        subtitle: '',
        content: '',
        _smallCat: ''
      },
      smallCat: [],
      posts: []
    }
  },
  computed: {
    smallCatList: function () {
      return this.smallCat
        .map((el) => {
          if (el._largeCat.name === this.largeCatName) return el.name
        })
        .filter(n => n)
    }
  },
  methods: {
    getCat () {
      this.$axios.get('/category')
        .then((r) => {
          this.category = r.data.ds
          this.largeCatList = r.data.ds.map((el) => {
            return el.name
          })
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    getSmallCat () {
      this.$axios.get('/category/smallCat/list')
        .then((r) => {
          this.smallCat = r.data.ds
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    postPost () {
      this.$axios.post('/post', this.postForm)
        .then((r) => {
          this.$router.push('/admin/managePost')
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  },
  mounted () {
    this.getCat()
    this.getSmallCat()
  }
}
</script>
