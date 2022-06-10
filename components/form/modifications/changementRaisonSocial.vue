<template>
  <section>
    <h2>Changement de raison sociale</h2>
    <p>Souaitez-vous changer la raison social de votre entreprise ?</p>

    <div class="select">
      <div :class="{active: wantRaisonSocial}" @click="wantRaisonSocial = true">Oui</div>
      <div :class="{active: !wantRaisonSocial}" @click="wantRaisonSocial = false">Non</div>
    </div>

    <div class="form" v-if="wantRaisonSocial === true">
      <div>
        <label>Nouvelle dénomination sociale :</label>
        <input type="text" v-model="nouvelleRaisonSocial">
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {nouvelleRaisonSocial: nouvelleRaisonSocial, wantRaisonSocial: wantRaisonSocial})">Continuer</button>
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
      wantRaisonSocial: false,
      nouvelleRaisonSocial: null
    }
  },
  mounted() {
    if (this.data) {
      if (this.data.nouvelleRaisonSocial) this.nouvelleRaisonSocial = this.data.nouvelleRaisonSocial
      if (this.data.wantRaisonSocial) this.wantRaisonSocial = this.data.wantRaisonSocial
    }
  },
  watch: {
    data() {
      if (this.data) {
        if (this.data.nouvelleRaisonSocial) this.nouvelleRaisonSocial = this.data.nouvelleRaisonSocial
        if (this.data.wantRaisonSocial) this.wantRaisonSocial = this.data.wantRaisonSocial
      }
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  h2 {
    margin-bottom: 0;
  }
  > p {
    text-align: center;
    margin-bottom: 50px;
  }
  .select {
    display: flex;
    justify-content: space-between;
    max-width: 260px;
    margin: auto;
    margin-bottom: 50px;

    > div {
      width: 120px;
      height: 70px;
      display: grid;
      place-items: center;
      background: #FFFFFF;
      border: 1px solid #FFF;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      cursor: pointer;

      &.active {
        background: #E4F0FC;
        border: 1px solid #f44336;
        box-sizing: border-box;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
        border-radius: 10px;
      }
    }
  }

  .form {
    max-width: 400px;
    margin: auto;
    margin-bottom: 30px;
  }
}
</style>
