<template>
  <div id="app">
    <nav class="navbar">
    <div class="navlogo">
      <router-link
      <div class="logobrandheader">The Catfish project</div>
        <div v-if="currentUser" class="nav-item nameCurrentUser"> Welcome, {{ currentUser.name }} {{ currentUser.lastname }}</div>
          </div>
      <div v-if="currentUser" class="navbar-nav">
        <div class="navbarlinks">
        <router-link to="/" class="nav-item nav-link">Home</router-link>
        <router-link v-if="isAdmin" to="/admin" class="nav-item nav-link">Admin</router-link>
        <router-link v-if="currentUser" to="#" class="nav-item nav-link">My boards</router-link>
          <div class="logoutborder">
          <a @click="logout" class="nav-item nav-link navbarlogout">Logout</a>
          </div>
        </div>
      </div>
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

  .nav-item.nav-link{
    position: relative;
    top: -3em;
    padding-left: 20%;
    justify-content: normal;
}

  .logobrandheader{
    text-transform: uppercase;
    padding-top: 10px;
  }
.navlogo{
  top: 1%;
  background: gainsboro;
  height: 4em;
  padding-left: 2%;
  }
.nameCurrentUser{
  padding-bottom: 1%;
}
  .nav-item.nav-link.navbarlogout{
    display: flex;
    padding: 0%;
    right: 7%;
    top: -3.8em;
    justify-content: flex-end;
    color: crimson;
    font-size: large;
    font-weight: bolder;
  }

</style>
