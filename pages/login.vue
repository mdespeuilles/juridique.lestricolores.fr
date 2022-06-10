<template>
  <section>
    <h1>Se connecter</h1>

    <form id="form" @submit.prevent="login">
      <div class="errors" v-if="loginErrors.length">
        <span v-for="error in loginErrors">{{ error }}</span>
      </div>
      <div>
        <label>Email</label>
        <input type="email" v-model="email" required/>
      </div>

      <div>
        <label>Mot de passe</label>
        <input type="password" v-model="password" required/>
      </div>

      <div class="action">
        <button>Se connecter</button>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      loginErrors: []
    }
  },
  methods: {
    async login() {
      this.loginErrors = [];
      try {
        let response = await this.$auth.loginWith("local", {
          data: {
            identifier: this.email,
            password: this.password,
          },
        });

        /*this.$router.push({
          path: '/app'
        })*/

      } catch (e) {
        if (e.response.data.error.message === 'Invalid identifier or password') {
          this.loginErrors.push("Email et/ou mot de passe incorrect")
        }
        else {
          this.loginErrors.push(e.response.data.error.message)
        }
        //this.error = this.translate(e.response.data.message[0].messages[0].id);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
section {
  min-height: calc(100vh - 300px);
  padding-top: 80px;
  h1 {
    color: #000000;
    font-family: "Yeseva One";
    font-size: 54px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: 60px;
    max-width: 890px;
    margin: auto;
    text-align: center;
    margin-bottom: 53px;
  }

  form {
    max-width: 400px;
    margin: auto;

    .errors {
      background: #fbdfdf;
      padding: 10px 10px;
      border: 1px solid #ff9696;
      color: #e32a2a;
    }

    > div {
      margin-bottom: 15px;

      &.action {
        display: flex;
        justify-content: center;
      }
      label {
        display: block;
      }
      input {
        width: 100%;
        max-width: 100% !important;
        margin: auto;
      }
    }
  }
}
</style>
