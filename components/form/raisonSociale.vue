<template>
  <section>
    <h2>Quelle sera le nom<br /> de votre société ?</h2>
    <input type="text" v-model="raisonSociale" placeholder="Saisissez le nom de votre société"/>
    <span>Vous pourrez trouver ou modifier plus tard</span>
    <div class="actions">
      <button @click="$emit('next', {raisonSociale: raisonSociale})">Continuer</button>
    </div>
    <div class="actions">
      <a href="#" @click.prevent="$emit('next')">Choisir le nom plus tard</a>
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
      raisonSociale: null
    }
  },
  mounted() {
    if (this.data) this.raisonSociale = this.data
  },
  watch: {
    data() {
      if (this.data) {
        this.raisonSociale = this.data
      }
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
    text-align: center;
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
}
</style>
