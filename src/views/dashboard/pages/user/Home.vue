<template>
  <v-container
    id="timeline"
    fluid
    tag="section"
  >
    <hello-world-component
      :role="User"
    />
  </v-container>
</template>

<script>
  export default {
    name: 'HomeUser',

    components: {
      HelloWorldComponent: () => import('@/views/dashboard/component/HelloWorld'),
    },

    data: () => ({
      User: 'Usuario',
    }),
  }
</script>
