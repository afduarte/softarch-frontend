<template lang="pug">
  .home
    h1 Welcome {{username}}
    .orders
      .order(v-for="o in orders")
        p {{o.ID}}
      p {{this.priceMap}}

</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      username: '',
      priceMap: {},
      orders: [],
    };
  },
  async mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.username = user.Name;
  },
};
</script>
