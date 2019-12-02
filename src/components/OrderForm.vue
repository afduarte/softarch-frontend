<template lang="pug">
  #order-form
    .address.row
      p Delivery Address:
      input(type="text", v-model="address")
      template(v-if="this.address !== ''")
        p There is a delivery charge of £5
    .loyalty-card.row
      p Loyalty Card:
      input(type="text", v-model="customer")
      template(v-if="this.customer.length === 6")
        p Use Points:
        input(type="text", v-model="points")
    .add-product.row
      p Product ID:
      select(v-model="prodID")
        option(v-for="p in products", :value="p.ID") {{p.Name}}
      p Quantity:
      input(type="number", v-model="quantity")
      button(@click="addProduct") Add Product
    .cart
      p.left Cart:
      .product.row(v-for="(p,i) in cart")
        p Name: {{priceMap[p.ID].Name}}
        p QTY.: {{p.Quantity}}
    .submit.left
      button(@click="calculate") Calculate
      button(v-if="Object.keys(cart).length", @click="submit") Create Order
    hr
    template(v-if="order")
      p Total: {{order.Total}}
      p Discount: {{order.Discount}}
      .reasons
        p Discount Reasons:
        p(v-for="r in order.DiscountReasons") {{r}}


</template>
<script>
/**
 *
 */
import Store from '@/store';

export default {
  name: 'order-form',
  data() {
    return {
      customer: '',
      points: '',
      address: '',
      prodID: '',
      quantity: '',
      cart: {},
      order: null,
    };
  },
  computed: {
    priceMap() {
      return Store.priceMap;
    },
    inventoryMap() {
      return Store.inventoryMap;
    },
    products() {
      if (!this.inventoryMap || !this.priceMap) return [];
      return Object.values(this.priceMap)
        .filter(p => p.ID !== '9999' && this.inventoryMap[p.ID])
        .map(p => ({
          ...p,
          Stock: this.inventoryMap[p.ID].Quantity,
        }));
    },
  },
  methods: {
    addProduct() {
      this.cart[this.prodID] = { ID: this.prodID, Quantity: Number(this.quantity) };
      this.prodID = '';
      this.quantity = '';
    },
    async submit() {
      await Store.submit(this.customer, this.address, this.cart, this.points);
      this.customer = '';
      this.address = '';
      this.cart = {};
      this.order = null;
    },
    async calculate() {
      this.order = await Store.calculate(this.cart);
    },
  },
};
</script>
<style lang="scss" scoped>
.row{
  margin: 10px 0;

  display:flex;
  flex-direction: row;
  p {
    margin: 5px;
  }
}
.left {
  text-align: left;
}
</style>
