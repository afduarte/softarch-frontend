<template lang="pug">
  .order
    template(v-if="header")
      p ID
      p User
      p Status
      p Delivery
      p Time
      p Products
      p Price
      p Discount
      p Discount Reasons
    template(v-else)
      p {{order.ID}}
      p {{username(order.UserID)}}
      p {{order.OrderStatus}}
      p {{order.DeliveryAddress || 'No delivery'}}
      p {{new Date(order.Timestamp).toLocaleDateString('en-GB',dateOpts)}}
      .cart
        p(v-for="c in prodStrings(order)") {{c}}
      p {{order.Total}}
      p {{order.Discount}}
      p {{order.DiscountReasons}}
</template>
<script>
import Store from '@/store';

export default {
  name: 'order',
  props: {
    order: { type: Object },
    header: { type: Boolean },
  },
  data() {
    return {
      dateOpts: {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
      },
    };
  },
  computed: {
    username() {
      return (id) => {
        if (this.header || !Store.userMap || !Store.userMap[id]) {
          return id;
        }
        return Store.userMap[id].Name;
      };
    },
    prodStrings() {
      return order => Object.values(order.Cart).map(c => ({
        ...c,
        Name: Store.priceMap[c.ID].Name,
        Price: Store.priceMap[c.ID].Price,
      })).map(c => `${c.Quantity} x ${c.Name} (${c.Price})`);
    },
  },

};
</script>
<style lang="scss" scoped>
.order {
  display: flex;
  flex-direction: row;
  p {
    padding: 5px;
    border-left: 1px solid #000;
  }
}
</style>
