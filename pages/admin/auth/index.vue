<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onsubmit">
        <AppControlInput type="email" v-model="email">E-Mail Address</AppControlInput>
        <AppControlInput type="password" v-model="password">Password</AppControlInput>
        <AppButton type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
        <AppButton
          @click="isLogin = !isLogin"
          btn-style="inverted"
          style="margin-left: 10px"
          type="button">Switch to {{ isLogin ? 'Signup' : 'Login' }}
        </AppButton>
      </form>
    </div>
  </div>
</template>

<script>
  import AppControlInput from '~/components/UI/AppControlInput'
  import AppButton from '~/components/UI/AppButton'

  export default {
    name: 'AdminAuthPage',
    layout: 'admin',
    components: {
      AppControlInput,
      AppButton,
    },
    methods: {
      onsubmit() {
        this.$store.dispatch('authenticateUser', {
            isLogin: this.isLogin,
            email: this.email,
            password: this.password,
          })
          .then(() => this.$router.push('/admin'))
          .then(() => {
            return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'Hello there!'})
          })
      },
    },
    data() {
      return {
        isLogin: true,
        email: '',
        password: '',
      }
    },
  }
</script>

<style scoped>
  .admin-auth-page {
    padding: 20px;
  }

  .auth-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 2px #ccc;
    width: 300px;
    margin: auto;
    padding: 10px;
    box-sizing: border-box;
  }
</style>

