<template>
  <section>
    <h2>Êtes-vous déclaré en tant<br /> qu'auto-entrepreneur ?</h2>
    <p>
      Vous êtes auto-entrepreneur si vous possédez un SIRET qui vous permet d’exercer une activité
    </p>

    <div class="select">
      <div :class="{selected: autoentrepreneur === 'oui'}" @click="autoentrepreneur = 'oui'">Oui</div>
      <div :class="{selected: autoentrepreneur === 'non'}" @click="autoentrepreneur = 'non'">Non</div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {autoentrepreneur: autoentrepreneur})">Continuer</button>
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
      autoentrepreneur: 'non',
    }
  },
  mounted() {
    if (this.data) this.autoentrepreneur = this.data
  },
  watch: {
    data() {
      if (this.data) this.autoentrepreneur = this.data
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

  .select {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    max-width: 509px;
    margin: auto;
    margin-bottom: 77px;

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
        border: 1px solid #f44336;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      }
    }
  }
}
</style>
