<template lang="pug">
  .home
    h1 Welcome {{username}}
    .orders
      order(:header="true")
      template(v-for="o in orders")
        order(:order="o")

</template>

<script>
import { api } from '@/util';
import Order from '@/components/Order.vue';

export default {
  name: 'home',
  components: { Order },
  data() {
    return {
      username: '',
      orders: {},
    };
  },
  async mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.username = user.Name;

    const { data } = await api.get('/order/');
    this.orders = data;
  },
};

/**
{
  "ID": "022367b7-4d3d-4013-b207-80da8a21ebb1",
  "UserID": "Antero Duarte",
  "CustomerID": "",
  "DeliveryAddress": "",
  "OrderStatus": "processed",
  "Timestamp": "2019-12-02T12:33:08.874475801Z",
  "Cart": {
    "0002": {
      "ID": "0002",
      "Quantity": 9
    }
  },
  "Total": 49.050000000000004,
  "Discount": 16.35,
  "DiscountReasons": [
    "3 x 3 for 2"
  ]
}
 */
</script>
