<template lang="pug">
  #order-form
    .address
      p Delivery Address
      input(type="text", v-model="address")
      template(v-if="this.address !== ''")
        p There is a delivery charge of £5
    .loyalty-card
      p Loyalty Card
      input(type="text", v-model="customer")
      template(v-if="this.customer.length === 6")
        p Use Points
        input(type="text", v-model="points")
    .add-product
      p Product ID
      select(v-model="prodID")
        option(v-for="p in products", :value="p.ID") {{p.Name}}
      p Quantity
      input(type="number", v-model="quantity")
      button(@click="addProduct") Add Product
    .cart
      .product(v-for="(p,i) in cart")
        p Name: {{priceMap[p.ID].Name}}
        p QTY.: {{p.Quantity}}
    .submit
      button(@click="submit") Submit


</template>
<script>
import { api } from '@/util';

export default {
  name: 'order-form',
  props: {
    priceMap: { type: Object },
  },
  data() {
    return {
      customer: '',
      points: '',
      address: '',
      prodID: '',
      quantity: '',
      cart: {},
    };
  },
  computed: {
    products() {
      return Object.values(this.priceMap).filter(p => p.ID !== '9999');
    },
  },
  methods: {
    addProduct() {
      this.cart[this.prodID] = { ID: this.prodID, Quantity: Number(this.quantity) };
      this.prodID = '';
      this.quantity = '';
    },
    async submit() {
      const form = {
        CustomerID: this.customer,
        UsePoints: Number(this.points),
        DeliveryAddress: this.address,
        Cart: this.cart,
      };
      await api.post('/order/new', form, { headers: { 'Content-Type': 'application/json' } });
      this.customer = '';
      this.address = '';
      this.cart = {};
    },
  },
};

/**
 * {
    "CustomerID": "000002",
    "UsePoints": 500,
    "DeliveryAddress": "EH164FL",
    "Cart": {
        "0001": {
            "ID": "0001",
            "Quantity": 1
        },
        "0003": {
            "ID": "0003",
            "Quantity": 6
        }
    }
}
 */
</script>
