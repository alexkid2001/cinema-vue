<template>
<v-row 
  align="center"
  justify="center"
>
  <v-col col="12">
    <h2 class="title">{{ title }}</h2>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: 'Title',
  props: ['title'],
}
</script>

