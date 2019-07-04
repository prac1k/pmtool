<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label htmlFor="email">Email</label>
        <input type="text" v-model.trim="$v.email.$model" id="login" name="email" class="form-control" :class="{ 'is-invalid': submitted && $v.email.$error }" />
        <div v-if="submitted && !$v.email.required" class="invalid-feedback">Email is required</div>
      </div>
      <div class="form-group">
        <label htmlFor="password">Password</label>
        <input autocomplete="on" type="password" v-model.trim="$v.password.$model" id="pass" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.password.$error }" />
        <div v-if="submitted && !$v.password.required" class="invalid-feedback">Password is required</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loading">
          <span class="spinner-border spinner-border-sm" v-show="loading"></span>
          <span>Login</span>
        </button>
      </div>
      <div v-if="error" class="alert alert-danger">{{error}}</div>
    </form>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import { authenticationService } from '../services/authentication.service';
  import router from '../router/index';

  export default {
    data () {
      return {
        email: '',
        password: '',
        submitted: false,
        loading: false,
        returnUrl: '',
        error: ''
      };
    },
    validations: {
      email: { required },
      password: { required }
    },
    created () {
      // redirect to home if already logged in
      if (authenticationService.currentUserValue) {
        return router.push('/');
      }

      // get return url from route parameters or default to '/'
      this.returnUrl = this.$route.query.returnUrl || '/';
    },
    methods: {
      onSubmit () {
        this.submitted = true;

        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }

        this.loading = true;
        authenticationService.login(this.email, this.password)
          .then(
            user => router.push(this.returnUrl),
            error => {
              this.error = error;
              this.loading = false;
            }
          );
      }
    }
  };
</script>
