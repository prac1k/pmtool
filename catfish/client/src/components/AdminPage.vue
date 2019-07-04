<template>
  <div>
    <h1>Admin</h1>
    <p>This page can only be accessed by administrators.</p>
    <div>
      All users from secure (admin only) api end point:
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{user.name + ' ' + user.lastname + ' ' + user.email + ' ' + user.role}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import authenticationService from '../services/authentication.service';
  import userService from '../services/user.service';

  export default {
    data () {
      return {
        user: authenticationService.currentUserValue,
        users: []
      };
    },
    created () {
      userService.getAll().then(users => this.users = users);
    }
  };
</script>
