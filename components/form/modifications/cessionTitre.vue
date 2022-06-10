<template>
  <section>
    <h2>Cession de titres</h2>
    <p>Souaitez-vous céder des actions ou des parts sociales de votre entreprise ?</p>

    <div class="select">
      <div :class="{active: wantCessionTitre}" @click="wantCessionTitre = true">Oui</div>
      <div :class="{active: !wantCessionTitre}" @click="wantCessionTitre = false">Non</div>
    </div>

    <div class="form" v-if="wantCessionTitre === true">
      <div class="box" v-for="cession in cessions">
        <h3>Cession de titre</h3>
        <div>
          <label>Combien de titre cédez-vous ?</label>
          <input type="text" v-model="cession.nbreTitresCedes">
        </div>

        <div>
          <label>Nom et prénom du cédant</label>
          <input type="text" v-model="cession.nomCedant">
        </div>

        <div>
          <label>Nom et prénom de l'acquereur</label>
          <input type="text" v-model="cession.nomAquereur">
        </div>
      </div>

      <div class="add">
        <button @click="addCession">Ajouter une cession</button>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {
        cessions: cessions,
        wantCessionTitre: wantCessionTitre
      })">Continuer</button>
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
      wantCessionTitre: false,
      cessions: [
        {
          nbreTitresCedes: null,
          nomAquereur: null,
          nomCedant: null
        }
      ],
    }
  },
  mounted() {
    if (this.data) {
      if (this.data.cessions) this.cessions = this.data.cessions
      if (this.data.wantCessionTitre) this.wantCessionTitre = this.data.wantCessionTitre
    }
  },
  methods: {
    addCession() {
      this.cessions.push({
        nbreTitresCedes: null,
        nomAquereur: null,
        nomCedant: null
      })
    }
  },
  watch: {
    data() {
      if (this.data) {
        if (this.data.cessions) this.cessions = this.data.cessions
        if (this.data.wantCessionTitre) this.wantCessionTitre = this.data.wantCessionTitre
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
        border: 1px solid #286FEB;
        box-sizing: border-box;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
        border-radius: 10px;
      }
    }
  }

  .form {
    max-width: 440px;
    margin: auto;
    margin-bottom: 30px;
  }

  .box {
    border: 1px solid rgba(64, 89, 134, 0.3);
    border-radius: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    margin-bottom: 30px;

    > div {
      margin-bottom: 15px;
      label {
        display: block;
        margin-bottom: 10px;
      }
    }
  }

  .add {
    display: flex;
    justify-content: center;
  }
}
</style>
