<template>
  <section>
    <h2>Quel est le montant du capital de la société ?</h2>
    <span>Bon à savoir la majorité des entrepreneurs mettent entre 100 et 1000 euros</span>

    <div class="form">
      <div v-if="type === 'sasu' || type === 'eurl'">
        <label>Montant du capital</label>
        <input type="text" v-model="capital" placeholder="Montant de mon capital"/>
      </div>

      <div>
        <label>Pourcentage du capital versé à la création</label>
        <v-select :options="percentages" v-model="verseCreation"></v-select>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {capital: capital, verseCreation: verseCreation})">Continuer</button>
    </div>
    <div class="actions">
      <a href="#" @click.prevent="$emit('next')">Choisir le nom plus tard</a>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: null,
    percentage: null,
    percentages: null,
    type: null
  },
  data() {
    return {
      capital: null,
      verseCreation: {
        label: '100%',
        value: 1
      },
    }
  },
  mounted() {
    if (this.data) this.capital = this.data
    if (this.percentage) this.verseCreation = this.percentage
  },
  watch: {
    data() {
      if (this.data) {
        this.capital = this.data
        if (this.percentage) this.verseCreation = this.percentage
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
    margin-bottom: 8px;
  }
  input {
    background: url(/img/euro.svg) no-repeat right center;
    background-position-x: calc(100% - 20px);
    max-width: 350px !important;
  }

  .form {
    display: flex;
    justify-content: space-around;
    margin-bottom: 45px;

    @include phone-600 {
      flex-direction: column;
    }

    > div {
      max-width: 350px !important;

      @include phone-600 {
        margin: auto;
        margin-bottom: 30px;
      }
    }
  }

  span {
    display: block;
    text-align: center;
    font-size: 18px;
    color: #405986;
    text-align: center;
    color: rgba(64, 89, 134, 0.5);
    margin-top: 0px;
    margin-bottom: 50px;
  }
}
</style>
