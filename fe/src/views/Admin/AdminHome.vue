<template>
  <v-container :grid-list-md="!$vuetify.breakpoint.xs">
    <admin-tool-bar page="home"></admin-tool-bar>
    <v-layout wrap row v-if="$store.state.admin">
      <v-flex xs12 class="pa-2">
        <v-card class="mt-3 elevation-0" outlined>
          <v-card-title>
            <span class="font-weight-thin display-1 mr-2">DashBoard</span>
            <span class="font-weight-light mt-2">for Admin</span>
          </v-card-title>
          <v-card-subtitle class="pt-2">
            <span class="ml-1">블로그 관리자를 위한 다양한 메뉴를 이용할 수 있습니다</span>
          </v-card-subtitle>
        </v-card>
      </v-flex>
      <v-flex xs12 class="pa-2">
        <admin-home-menu
          route="blogInfo"
          header="Blog"
          title="Blog Information"
          subtitle="블로그의 정보를 관리할 수 있습니다"
          alphabet="B"
        ></admin-home-menu>
      </v-flex>
      <v-flex xs12 sm6 class="pa-2">
        <admin-home-menu
          route="writePost"
          header="Post"
          title="Write Post"
          subtitle="마크다운 형식의 포스트를 작성할 수 있습니다"
          alphabet="P"
        ></admin-home-menu>
      </v-flex>
      <v-flex xs12 sm6 class="pa-2">
        <admin-home-menu
          route="managePost"
          header="Post"
          title="Manage Post"
          subtitle="포스트를 삭제 및 수정할 수 있습니다"
          alphabet="P"
        ></admin-home-menu>
      </v-flex>
      <v-flex xs12 sm6 class="pa-2">
        <admin-home-menu
          route="manageCat"
          header="Category"
          title="Manage Categories"
          subtitle="카테고리를 관리할 수 있습니다"
          alphabet="C"
        ></admin-home-menu>
      </v-flex>
    </v-layout>
    <v-layout wrap row v-else>
      <v-flex xs6 class="pa-2">
        <v-card class="mt-3 elevation-0" outlined>
          <v-card-title>
            login
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-container>
                <v-text-field
                  v-model="form.id"
                  label="ID"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="form.pw"
                  label="PW"
                  type="password"
                  required
                ></v-text-field>
              </v-container>
              <v-btn @click="login()">제출</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
/* Components */
import adminToolBar from '@/components/Admin/adminToolBar'
import adminHomeMenu from '@/components/Admin/adminHomeMenu'

export default {
  components: {
    'adminToolBar': adminToolBar,
    'adminHomeMenu': adminHomeMenu
  },
  data () {
    return {
      form: {
        id: '',
        pw: ''
      }
    }
  },
  methods: {
    login () {
      this.$axios.post('/login', this.form)
        .then(r => {
          if (r.data.success) {
            this.$store.commit('login')
            this.$store.commit('pop', { msg: '로그인 성공', color: 'success' })
          } else {
            this.$store.commit('pop', { msg: r.data.msg, color: 'warning' })
          }
        })
        .catch(e => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
