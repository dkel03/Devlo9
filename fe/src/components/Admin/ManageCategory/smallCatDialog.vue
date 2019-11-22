<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="title font-weight-light">Small Category</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field outlined label="Name" v-model="category.name" required></v-text-field>
              <v-text-field outlined label="Summary" v-model="category.summary" required></v-text-field>
              <v-chip>{{category._largeCat}}</v-chip>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="green darken-2" text @click="post()">Save</v-btn>
        <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: [ 'dialog', 'category' ],
  methods: {
    close () {
      this.$emit('close')
    },
    post () {
      if (this.category._id) {
        this.putCategory(this.category._id)
      } else {
        this.postCategory()
      }
    },
    postCategory () {
      this.$axios.post('/category/smallCat', this.category)
        .then((r) => {
          this.$store.commit('pop', { msg: '등록완료', color: 'success' })
          this.$emit('close')
          this.$emit('getCat')
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    putCategory () {
      this.$axios.put(`/category/smallCat/${this.category._id}`, this.category)
        .then((r) => {
          this.$emit('close')
          this.$emit('getCat')
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    }
  }
}
</script>
