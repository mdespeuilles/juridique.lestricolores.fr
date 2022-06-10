<template>
  <section>
    <h2>Vos coordonnées</h2>
    <div class="row">
      <div>
        <label>Votre email</label>
        <input type="email" v-model="email"/>
      </div>

      <div>
        <label>Numéro de téléphone</label>
        <input type="text" v-model="phone"/>
      </div>
    </div>

    <div class="actions" v-if="phone && email">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {phone: phone, email: email})">Continuer</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: null
  },
  data() {
    return {
      email: null,
      phone: null
    }
  },
  mounted() {
    if (this.data.email) this.email = this.data.email
    if (this.data.phone) this.phone = this.data.phone
  },
  watch: {
    data() {
      if (this.data.email) this.email = this.data.email
      if (this.data.phone) this.phone = this.data.phone
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  @include desk-768 {
    max-width: 95%;
    margin: auto;
  }

  h2 {
    margin-bottom: 86px;
  }
  input {
    margin: auto;
  }

  span {
    display: block;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: rgba(64, 89, 134, 0.5);
    margin-top: 14px;
    margin-bottom: 120px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    max-width: 580px;
    margin: auto;
    margin-bottom: 25px;

    @include phone-600 {
      display: block;
    }

    > div {
      width: 280px;

      @include phone-600 {
        margin: auto;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
