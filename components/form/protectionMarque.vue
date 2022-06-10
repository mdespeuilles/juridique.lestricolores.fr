<template>
  <section>
    <h2>Voulez-vous protéger le nom de<br />votre société en déposant votre marque ?</h2>
    <p>
      Déposer une marque ou logo permet notamment de se protéger contre un concurrent <br />
      qui utiliserait votre marque abusivement.
    </p>

    <div class="select">
      <div :class="{selected: protectionMarque === 'oui'}" @click="protectionMarque = 'oui'">Oui</div>
      <div :class="{selected: protectionMarque === 'non'}" @click="protectionMarque = 'non'">Non</div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {protectionMarque: protectionMarque})">Continuer</button>
    </div>
    <div class="actions">
      <a href="#" @click.prevent="$emit('next')">Renseigner plus tard</a>
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
      protectionMarque: 'oui',
    }
  },
  mounted() {
    if (this.data) this.protectionMarque = this.data
  },
  watch: {
    data() {
      if (this.data) this.protectionMarque = this.data
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
    margin-bottom: 0;
  }
  > p {
    text-align: center;
    margin-bottom: 78px;
  }

  .select {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    max-width: 509px;
    margin: auto;
    margin-bottom: 77px;

    @include phone-600 {
      grid-template-columns: 1fr;
      max-width: 247px;
    }

    > div {
      height: 70px;
      width: 247px;
      background: #FFFFFF;
      border: 1px solid #FFF;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px;
      cursor: pointer;
      text-align: center;

      &.selected {
        background: #E4F0FC;
        border: 1px solid #286FEB;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      }
    }
  }
}
</style>
