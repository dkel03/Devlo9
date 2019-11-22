<template>
  <v-list-item two-line>
    <v-list-item-avatar>
      <img src="@/assets/avatar.svg">
    </v-list-item-avatar>
    <v-list-item-content @click="$router.push('/admin')">
      <v-list-item-title>{{author.name}}</v-list-item-title>
      <v-list-item-subtitle>{{author.job}}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  props: [ 'author' ]
}
</script>
