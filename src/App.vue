<template lang="pug">
  #app
    template(v-if="isLoggedIn")
      h1 DE-Store
      #nav
        router-link(to="/") Home
        router-link(to="/order") Order
        template(v-if="isLoggedIn && user.Role ==='ManagerRole'")
          router-link(to="/set-price") Set Prices
        a(href="#", @click.prevent="logout") Logout
      router-view
    template(v-else)
      .login
        h3 Please log in to proceed
        p Username
        input(type="text" v-model="username")
        p Password
        input(type="password" v-model="password")
        button(@click="login") Login
</template>
<script>
import Store from '@/store';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    isLoggedIn() {
      return Store.isLoggedIn;
    },
    user() {
      return Store.user;
    },
  },
  methods: {
    async login() {
      await Store.login(this.username, this.password);
    },
    logout() {
      Store.logout();
    },
  },
  mounted() {
    Store.init();
  },
};
</script>

<style lang="scss">
#app {
  padding: 0 10px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    margin: 0 5px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
