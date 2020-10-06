<template>
  <v-app>
    <dashboard-core-view />

    <dashboard-core-loader />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardNoAuth',

    components: {
      DashboardCoreView: () => import('./components/core/View'),
      DashboardCoreLoader: () => import('./components/core/Loader'),
    },

    data: () => ({
      expandOnHover: false,
      loader: true,
    }),
  }
</script>
