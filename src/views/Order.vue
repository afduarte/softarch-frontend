<template lang="pug">
  .order
    order-form(v-if="priceMap", :priceMap="priceMap")
    p(v-else) Loading...
</template>
<script>
import OrderForm from '@/components/OrderForm.vue';
import { api } from '@/util';

export default {
  components: { OrderForm },
  data() {
    return {
      priceMap: {},
    };
  },
  async mounted() {
    const { data } = await api.get('/price/');
    this.priceMap = data;
  },
};
</script>
