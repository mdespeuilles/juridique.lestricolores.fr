<template>
  <section>
    <h2>Êtes-vous en train d’acquérir
      un bien immobilier ?</h2>

    <div class="select">
      <div :class="{selected: acquisitionBien === 'oui'}" @click="acquisitionBien = 'oui'">
        <span>Le plus fréquent</span>
        <strong>Oui</strong>
        <p>Je suis en cours<br /> d’acquisition</p>
      </div>
      <div :class="{selected: acquisitionBien === 'non'}" @click="acquisitionBien = 'non'">
        <strong>Non</strong>
        <p>Je suis déjà<br />
          propriétaire</p>
      </div>
      <div :class="{selected: acquisitionBien === 'bientot'}" @click="acquisitionBien = 'bientot'">
        <strong>Bientôt</strong>
        <p>Je cherche encore</p>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {acquisitionBien: acquisitionBien})">Continuer</button>
    </div>
    <div class="actions">
      <a href="#" @click.prevent="$emit('next')">Renseigner plus tard</a>
    </div>
  </section>


</template>

<script>
export default {
  props: {
    data: null,
  },
  data() {
    return {
      acquisitionBien: 'oui',
    }
  },
  mounted() {
    if (this.data) this.acquisitionBien = this.data
  },
  watch: {
    data() {
      if (this.data) this.acquisitionBien = this.data
    }
  }
}
</script>

<style lang="scss" scoped>
section {
  h2 {
    margin-bottom: 0;
    margin-bottom: 78px;
  }

  .select {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    max-width: 700px;
    margin: auto;
    margin-bottom: 77px;

    @include phone-600 {
      grid-template-columns: 1fr;
    }

    > div {
      height: 210px;
      width: 210px;
      background: #FFFFFF;
      border: 1px solid #FFF;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 12px;
      cursor: pointer;
      text-align: center;
      position: relative;

      @include phone-600 {
        margin: auto;
      }

      span {
        width: 108px;
        height: 23px;
        box-shadow: 0 0 15px rgba(40, 111, 235, 0.3);
        border-radius: 20px;
        background-color: #f44336;
        display: block;
        color: #ffffff;
        font-size: 10px;
        font-weight: 400;
        line-height: 23px;
        text-align: center;
        position: absolute;
        left: 0;
        right: 0;
        top: -15px;
        margin: auto
      }

      strong {
        display: block;
      }

      &.selected {
        background: #E4F0FC;
        border: 1px solid #f44336;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      }
    }
  }
}
</style>
