<template lang="pug">
  .order
    order-form(v-if="priceMap", :priceMap="priceMap",:orderMap="orderMap")
    p(v-else) Loading...
</template>
<script>
import OrderForm from '@/components/OrderForm.vue';
import Store from '@/store';

export default {
  components: { OrderForm },
  data() {
    return {

    };
  },
  computed: {
    priceMap() {
      return Store.priceMap;
    },
    orderMap() {
      return Store.orderMap;
    },
  },
};
</script>
