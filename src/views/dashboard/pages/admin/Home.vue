<template>
  <v-container
    id="timeline"
    fluid
    tag="section"
  >
    <hello-world-component
      :role="Admin"
    />
  </v-container>
</template>

<script>
  export default {
    name: 'HomeAdmin',

    components: {
      HelloWorldComponent: () => import('@/views/dashboard/component/HelloWorld'),
    },

    data: () => ({
      Admin: 'Administrador',
    }),
  }
</script>
