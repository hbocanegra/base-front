<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-loader />
  </v-app>
</template>

<script>

  export default {
    name: 'DashboardAuth',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreView: () => import('./components/core/View'),
      DashboardCoreLoader: () => import('./components/core/Loader'),
    },

    data: () => ({
      expandOnHover: false,
      loader: true,
    }),
  }
</script>
