<template lang="pug">
  #app
    template(v-if="this.token")
      h1 DE-Store
      #nav
        router-link(to="/") Home
        router-link(to="/order") Order
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
import { api } from '@/util';

export default {
  data() {
    return {
      username: '',
      password: '',
      token: null,
    };
  },
  methods: {
    async login() {
      const { data } = await api.post('/auth/login', `user=${this.username}&pass=${this.password}`);
      this.token = data.User.Token;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(data.User));
    },
  },
  mounted() {
    this.token = localStorage.getItem('token');
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
