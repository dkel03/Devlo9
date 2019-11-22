<template>
  <v-app>
    <v-app-bar class="elevation-0" app>
      <v-toolbar-title class="headline" @click="$router.push('/')">
        <div>
          <span>Dev</span>
          <span class="font-weight-light">Lo9</span>
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :right="right"
      app
    >
      <v-list
        dense
        nav
        class="py-0"
      >
        <author-info :author="blogInfo.author"></author-info>

        <v-divider></v-divider>
        <v-list-item
          v-for="d in defaultList"
          :key="d.title"
          :to="d.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ d.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ d.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-group
          v-for="cat in categories"
          :key="cat.name"
          color=""
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="cat.name"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item dense
            v-for="s in cat.smallCats"
            :key="s.name"
            @click="$router.push('/categories/'+s.name)"
            class="ml-n10"
          >
            <v-list-item-content>
              <v-list-item-title v-text="s.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view :key="$route.fullPath" />
    </v-content>
    <v-footer>
      <div>&copy;{{blogInfo.author.name}}</div>
    </v-footer>

    <v-snackbar
      v-model="$store.state.sb.act"
      :color="$store.state.sb.color"
    >
      {{ $store.state.sb.msg }}
      <v-btn
        @click="$store.commit('pop', { act: false })"
        color="blue-grey"
      >
      닫기
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import authorInfo from '@/components/Blog/authorInfo'
export default {
  name: 'App',
  components: {
    'authorInfo': authorInfo
  },
  data () {
    return {
      drawer: true,
      defaultList: [
        { title: 'Home', icon: 'home', to: { path: '/' } },
        { title: 'About', icon: 'search', to: { path: '/about' } }
      ],
      categories: [],
      blogInfo: {},
      right: true
    }
  },
  methods: {
    getCat () {
      this.$axios.get('/category')
        .then((r) => {
          this.categories = r.data.ds
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    getBlogInfo () {
      this.$axios.get('/blogInfo/app')
        .then((r) => {
          this.blogInfo = r.data.d
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  },
  mounted () {
    this.getCat()
    this.getBlogInfo()
  }
}
</script>
