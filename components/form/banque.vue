<template>
  <section>
    <h2>Dans quelle banque<br />voulez-vous déposer le capital ?</h2>
    <p>Il est obligatoire d'ouvrir un compte bancaire dédié à la société. Nous vous mettons en relation avec deux partenaires adaptés à vos besoins.</p>


    <div class="select">
      <div :class="{selected: useQonto === 'oui'}" @click="useQonto = 'oui'">
        <div class="img">
          <img src="/img/qonto.gif" width="80">
        </div>
        <strong>QONTO - La valeur sûre</strong>
        <p>Rapide - Sans engagement - 100% en ligne - 1 mois gratuit !</p>
      </div>

      <div :class="{selected: useQonto === 'non'}" @click="useQonto = 'non'">
        <div class="picto">
          <img src="/img/banque.svg">
        </div>
        <strong>Un autre établissement ?</strong>
        <p>Rapide - Sans engagement - 100% en ligne - 1 mois gratuit !</p>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {useQonto: useQonto})">Continuer</button>
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
      useQonto: true
    }
  },
  mounted() {
    if (this.data) this.useQonto = this.data
  },
  watch: {
    data() {
      if (this.data) this.useQonto = this.data
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
    grid-gap: 27px;
    max-width: 587px;
    margin: auto;
    margin-bottom: 77px;

    @include phone-600 {
      grid-template-columns: 1fr;
      max-width: 280px;
    }

    > div {
      height: 284px;
      width: 280px;
      background: #FFFFFF;
      border: 1px solid #FFF;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      padding: 12px;
      padding-top: 26px;
      cursor: pointer;
      text-align: center;
      position: relative;

      &.selected {
        background: #E4F0FC;
        border: 1px solid #f44336;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      }

      .picto {
        width: 44px;
        height: 44px;
        display: grid;
        place-items: center;
        margin: auto;
        background-color: #e4f0fc;
        border-radius: 50%;
        margin-bottom: 33px;
        margin-top: 35px;
      }

      .img {
        margin-bottom: 33px;
        margin-top: 29px;
        img {
          max-width: 170px;
        }
      }

      strong {
        color: #0b2758;
        font-size: 16px;
        font-weight: 700;
        display: block;
        line-height: 20px;
        text-align: center;
        margin-bottom: 16px;
      }

      p {
        color: #0b2758;
        margin: 0;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
}
</style>
