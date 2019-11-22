<template>
  <v-dialog v-model="dialog" persistent max-width="330">
    <v-card>
      <v-card-title class="headline">Delete Post</v-card-title>
      <v-card-text>
        포스트가 삭제됩니다<br>
        정말 삭제하시겠습니까?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="delPost()">삭제</v-btn>
        <v-btn color="blue darken-3" text @click="close()">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: [ 'dialog', 'post' ],
  methods: {
    close () {
      this.$emit('close')
      this.$emit('getPosts')
    },
    delPost () {
      this.$axios.delete(`/post/${this.post._id}`)
        .then((r) => {
          this.$store.commit('pop', { msg: '삭제 완료', color: 'success' })
          this.close()
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
