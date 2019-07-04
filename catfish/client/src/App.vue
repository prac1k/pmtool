<template>
  <div id="app">
    <nav v-if="currentUser" class="navbar navbar-expand navbar-dark bg-dark">
      <div class="navbar-nav">
        <router-link to="/" class="nav-item nav-link">Home</router-link>
        <router-link v-if="isAdmin" to="/admin" class="nav-item nav-link">Admin</router-link>
        <a @click="logout" class="nav-item nav-link">Logout</a>
        </div>
      <div class="nav-item nameCurrentUser"> Welcome, {{ currentUser.name }} {{ currentUser.lastname }}</div>
    </nav>
    <div class="jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-sm-6 offset-sm-3">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { authenticationService } from './services/authentication.service';
  import router from './router/index';
  import { Role } from './_helpers/role';
  export default {
    name: 'app',
    data () {
      return {
        currentUser: null
      };
    },
    computed: {
      isAdmin () {
        return this.currentUser && this.currentUser.role === Role.Admin;
      }
    },
    created () {
      authenticationService.currentUser.subscribe(x => this.currentUser = x);
    },
    methods: {
      logout () {
        authenticationService.logout();
        router.push('/login');
      }
    }
  }
</script>

<style>
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  body {
    margin: 0;
  }
  html, body, #app {
    height: 100%;
  }
  body {
    background-color: #4fc08d;
    font-size: 1.6rem;
    font-family: Helvetica Neue,Arial,Helvetica,sans-serif;
    line-height: 20px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  .nameCurrentUser {
    text-align: right;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }

</style>
