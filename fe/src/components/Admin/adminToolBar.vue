<template>
  <v-toolbar>
    <v-toolbar-title>
      <span class="headline">Admin</span>
      <span class="ml-4 body-1 font-weight-light">{{page}}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="$router.push('/admin')" icon>
      <v-icon>apps</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
export default {
  props: ['page']
}
</script>
