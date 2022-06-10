<template>
  <section>
    <h2>Liquidation entreprise</h2>
    <p>Liquidez votre entreprise en toute sécurité</p>

    <h3>Connaissez-vous votre numéro de Siren ?</h3>

    <div class="select">
      <div :class="{active: knowSiren}" @click="knowSiren = true">Oui</div>
      <div :class="{active: !knowSiren}" @click="knowSiren = false">Non</div>
    </div>

    <div class="form-start">
      <div class="row" v-if="knowSiren">
        <label>Numéro de SIREN</label>
        <input type="text" v-model="siren" placeholder="Renseignez votre numéro SIREN"/>
      </div>

      <div class="row">
        <label>Votre adresse e-mail</label>
        <input type="email" v-model="email" placeholder="mail@mail.com"/>
      </div>
      <div class="row">
        <label>Votre téléphone</label>
        <input type="email" v-model="phone"/>
      </div>
    </div>

    <div class="actions" v-if="phone && email">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {email: email, phone: phone, siren: siren})">Continuer</button>
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
      knowSiren: true,
      email: null,
      siren: null,
      phone: null
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
    margin-bottom: 78px;
  }

  h3 {
    text-align: center;
    font-family: Yeseva One;
    font-size: 28px;
    line-height: 50px;
    color: #0B2758;
  }

  .select {
    display: flex;
    justify-content: space-between;
    max-width: 260px;
    margin: auto;
    margin-bottom: 30px;

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

  .form-start {
    max-width: 400px;
    margin: auto;
    margin-bottom: 50px;
    .row {
      margin-bottom: 15px;
    }
  }
}
</style>
