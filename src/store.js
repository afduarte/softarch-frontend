import Vue from 'vue';
import { api, timer } from '@/util';
import Bus from '@/bus';

export const store = new Vue({
  data() {
    return {
      token: null,
      user: {},
      message: '',
      userMap: {},
      priceMap: {},
      inventoryMap: {},
      orderMap: {},
    };
  },
  computed: {
    isLoggedIn() {
      return this.token !== null;
    },
  },
  methods: {
    async login(username, password) {
      const { data } = await api.post('/auth/login', `user=${username}&pass=${password}`);
      this.token = data.User.Token;
      localStorage.setItem('token', this.token);
      this.user = data.User;
      await this.fetchData();
    },
    logout() {
      localStorage.removeItem('token');
      this.user = {};
      this.token = null;
    },
    async submit(customer, address, cart, points) {
      const form = {
        CustomerID: customer,
        UsePoints: Number(points),
        DeliveryAddress: address,
        Cart: cart,
      };
      await api.post('/order/new', form, { headers: { 'Content-Type': 'application/json' } });
    },
    async calculate(cart) {
      const { data } = await api.post('/price/calculate', cart, { headers: { 'Content-Type': 'application/json' } });
      return data;
    },
    async getUser() {
      const { data } = await api.get('/auth/info');
      this.user = data;
    },
    async getOrders() {
      const { data } = await api.get('/order/');
      this.orderMap = data;
    },
    async getPrices() {
      const { data } = await api.get('/price/');
      this.priceMap = data;
    },
    async getInventory() {
      const { data } = await api.get('/inventory/');
      this.inventoryMap = data;
    },
    async setMessage(evt) {
      this.message = evt;
      await timer(2000);
      this.message = '';
    },
    fetchData() {
      return Promise.all([
        this.getUser(),
        this.getOrders(),
        this.getPrices(),
        this.getInventory(),
      ]);
    },
    async init() {
      // handlers
      Bus.$on('logout', this.logout);
      Bus.$on('message', this.setMessage);
      // get token from browser store
      this.token = localStorage.getItem('token');
      // fetch all data
      if (this.isLoggedIn) {
        await this.fetchData();
      }
      setInterval(async () => {
        await this.fetchData();
      }, 3000);
    },
  },

});

export default store;
