<template lang="pug">
  .order
    template(v-if="header")
      p ID
      p User
      p Status
      p Delivery
    template(v-else)
      p {{order.Id}}
      p {{username(order.UserID)}}
      p {{order.OrderStatus}}
      p {{order.DeliveryAddress || 'No delivery'}}
</template>
<script>
/**
 * {
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
import Store from '@/store';

export default {
  name: 'order',
  props: {
    order: { type: Object },
    header: { type: Boolean },
  },
  computed: {
    username() {
      return (id) => {
        if (this.header || !Store.users || !Store.users[id]) {
          return '';
        }
        return Store.users[id].Name;
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.order {
  display: flex;
  flex-direction: row;
}
</style>
