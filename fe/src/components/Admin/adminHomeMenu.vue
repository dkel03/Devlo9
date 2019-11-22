<template>
  <v-card class="mx-auto" outlined>
    <v-list-item three-line @click="$router.push('/admin/'+route)">
      <v-list-item-content>
        <div class="overline mb-4">{{header}}</div>
        <v-list-item-title class="headline mb-1">{{title}}</v-list-item-title>
        <v-list-item-subtitle>{{subtitle}}</v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar
        tile
        size="80"
        color="grey"
        class="display-2"
      >{{alphabet}}</v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: ['route', 'header', 'title', 'subtitle', 'alphabet']
}
</script>
