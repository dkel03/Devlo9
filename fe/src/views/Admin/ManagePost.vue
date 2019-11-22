<template>
  <v-container :grid-list-md="!$vuetify.breakpoint.xs">
    <admin-tool-bar page="Manage Post"></admin-tool-bar>
    <v-layout wrap row>
      <v-flex xs12 class="pa-2">
        <v-card>
          <v-card-title>
            <span class="font-weight-medium">포스트</span>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="posts"
            :search="search"
          >
            <template v-slot:item.title="{ item }">
              <span @click="$router.push('/post/'+item._id)">{{item.title}}</span>
            </template>
            <template v-slot:item._id="{ item }">
              {{ id2date(item._id) }}
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" @click="editPost(item)">edit</v-icon>
              <v-icon small @click="openDdialog(item)">delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <delete-dialog
      :dialog="Ddialog"
      :post="Dpost"
      @close="closeDdialog()"
      @getPosts="getPosts()"
    ></delete-dialog>
  </v-container>
</template>
<script>
/* Components */
import adminToolBar from '@/components/Admin/adminToolBar'
import deleteDialog from '@/components/Admin/ManagePost/deleteDialog'

export default {
  components: {
    'adminToolBar': adminToolBar,
    'deleteDialog': deleteDialog
  },
  data () {
    return {
      posts: [],
      Dpost: {},
      Ddialog: false,
      search: '',
      headers: [
        { text: '제목', value: 'title', align: 'left' },
        { text: '카테고리', value: '_smallCat.name' },
        { text: '작성일', value: '_id' },
        { text: 'action', value: 'action', sortable: false }
      ]
    }
  },
  methods: {
    getPosts () {
      this.$axios.get('/post/list')
        .then((r) => {
          this.posts = r.data.ds
        })
        .catch(e => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    openDdialog (item) {
      this.Dpost = item
      this.Ddialog = true
    },
    closeDdialog () {
      this.Dpost = {}
      this.Ddialog = false
    },
    id2date (_id) {
      if (!_id) return '잘못된 시간 정보'
      return new Date(parseInt(_id.substring(0, 8), 16) * 1000).toLocaleString()
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>
