<template>
  <v-dialog v-model="dialog" persistent max-width="330">
    <v-card>
      <v-card-title class="headline">Delete Category</v-card-title>
      <v-card-text>
        하위 카테고리 및 포스트가 모두 삭제됩니다<br>
        정말 삭제하시겠습니까?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="delCategory()">삭제</v-btn>
        <v-btn color="blue darken-3" text @click="close()">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: [ 'dialog', 'category', 'title', 'subtitle' ],
  methods: {
    delCategory () {
      if (this.category._largeCat) {
        this.delSmallCat()
      } else {
        this.delLargeCat()
      }
      this.close()
      this.$emit('getCat')
    },
    close () {
      this.$emit('close')
    },
    delLargeCat () {
      this.$axios.delete(`/category/largeCat/${this.category._id}`)
        .then((r) => {
          this.$store.commit('pop', { msg: '삭제 완료', color: 'success' })
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    delSmallCat () {
      this.$axios.delete(`/category/smallCat/${this.category._id}`)
        .then((r) => {
          this.$store.commit('pop', { msg: '삭제 완료', color: 'success' })
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
