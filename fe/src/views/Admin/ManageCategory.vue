<template>
  <v-container :grid-list-md="!$vuetify.breakpoint.xs">
    <admin-tool-bar page="Manage Category"></admin-tool-bar>
    <v-layout wrap row>
      <v-flex xs12 class="pa-2">
        <v-card>
          <v-card-title class="headline font-weight-regular">
            <span>CATEGORY</span>
          </v-card-title>
          <v-card-text>
            <v-list nav>
              <v-alert type="warning" v-if="categories.length === 0">No Category</v-alert>
              <v-list-group v-for="cat in categories" :key="cat.name" no-action color="grey">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title class="title font-weight-light">{{cat.name}}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item>
                  <v-btn class="ml-n10 elevation-0" small @click="openLdialog(cat)" color="grey lighten-2">
                    <v-icon left>create</v-icon>edit
                  </v-btn>
                  <v-btn class="ml-2 elevation-0" small @click="openDdialog(cat)" color="grey lighten-2">
                    <v-icon left>delete</v-icon>delete
                  </v-btn>
                </v-list-item>
                <v-divider />
                <v-alert type="warning" v-if="cat.smallCats.length === 0">No Category</v-alert>
                <v-list-item v-for="s in cat.smallCats" :key="s.name" class="ml-n10">
                  <v-list-item-avatar>
                    <v-icon>bookmark</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="title font-weight-light">{{s.name}}</v-list-item-title>
                    <v-list-item-sub-title class="caption font-weight-medium">{{s.summary}}</v-list-item-sub-title>
                  </v-list-item-content>
                  <v-list-action>
                    <v-menu transition="slide-x-transition">
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">settings</v-icon>
                      </template>
                      <v-list class="pa-2">
                        <v-btn small icon @click="openSdialog(s)"><v-icon>create</v-icon></v-btn>
                        <v-btn small icon @click="openDdialog(s)"><v-icon>delete</v-icon></v-btn>
                      </v-list>
                    </v-menu>
                  </v-list-action>
                </v-list-item>
                <v-divider />
                <v-list-item>
                  <v-btn class="ml-n10 my-3 elevation-0" small @click="openSdialog(cat)" color="grey lighten-2">
                    <v-icon left>add</v-icon>
                    NEW
                  </v-btn>
                </v-list-item>
              </v-list-group>
            </v-list>
            <v-btn class="ml-2" large icon @click="openLdialog()"><v-icon>add</v-icon></v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <delete-dialog
      :dialog="Ddialog"
      :category="Dcategory"
      @close="closeDdialog"
      @getCat="getCat()"
    ></delete-dialog>
    <large-cat-dialog
      :dialog="Ldialog"
      :category="Lcat"
      @close="closeLdialog"
      @getCat="getCat()"
    ></large-cat-dialog>
    <small-cat-dialog
      :dialog="Sdialog"
      :category="Scat"
      @close="closeSdialog"
      @getCat="getCat()"
    ></small-cat-dialog>
  </v-container>
</template>
<script>
/* Components */
import adminToolBar from '@/components/Admin/adminToolBar'
import largeCatDialog from '@/components/Admin/ManageCategory/largeCatDialog'
import smallCatDialog from '@/components/Admin/ManageCategory/smallCatDialog'
import deleteDialog from '@/components/Admin/ManageCategory/deleteDialog'

export default {
  components: {
    'adminToolBar': adminToolBar,
    'largeCatDialog': largeCatDialog,
    'smallCatDialog': smallCatDialog,
    'deleteDialog': deleteDialog
  },
  data () {
    return {
      categories: [],
      Ddialog: false,
      Dcategory: {},
      Ldialog: false,
      Lcat: {},
      Sdialog: false,
      Scat: {}
    }
  },
  methods: {
    openDdialog (category) {
      this.Dcategory = category
      this.Ddialog = true
    },
    closeDdialog () {
      this.Ddialog = false
      this.getCat()
    },
    openLdialog (category) {
      if (category) {
        this.Lcat.name = category.name
        this.Lcat._id = category._id
      } else this.Lcat = { name: '' }
      this.Ldialog = true
    },
    closeLdialog () {
      this.Lcat = {}
      this.Ldialog = false
    },
    openSdialog (category) {
      if (category._largeCat) {
        this.Scat = {
          name: category.name,
          summary: category.summary,
          _id: category._id,
          _largeCat: category._largeCat._id
        }
      } else {
        this.Scat = {
          name: '',
          summary: '',
          _largeCat: category._id
        }
      }
      this.Sdialog = true
    },
    closeSdialog () {
      this.Scat = {}
      this.Sdialog = false
    },
    getCat () {
      this.$axios.get('/category')
        .then((r) => {
          this.categories = r.data.ds
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  },
  mounted () {
    this.getCat()
  }
}
</script>
