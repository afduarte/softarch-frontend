<template lang="pug">
  .home
    h1 Welcome {{username}}
    .orders
      .header
        order(:header="true")
      .body
        template(v-for="o in orders")
          order(:order="o")

</template>

<script>
import Store from '@/store';
import Order from '@/components/Order.vue';

export default {
  name: 'home',
  components: { Order },
  computed: {
    username() {
      if (!Store.user) return '';
      return Store.user.Name;
    },
    orders() {
      return Store.orderMap;
    },
  },
};
</script>
<style lang="scss" scoped>
.order{
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ;
}
</style>
