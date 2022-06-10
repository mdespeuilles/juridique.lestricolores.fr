<template>
  <section>
    <h2>{{ title }}</h2>
    <p>{{ subTitle }}</p>

    <div class="select">
      <div :class="{selected: actionnairePresident === 'oui'}" @click="actionnairePresident = 'oui'">
        <span>Recommandé</span>
        <strong>Oui</strong>
        <p>Comme 90% de nos clients</p>
      </div>
      <div :class="{selected: actionnairePresident === 'non'}" @click="actionnairePresident = 'non'">
        <strong>Non</strong>
      </div>
    </div>

    <actionnaire-unique
      v-if="actionnairePresident === 'non'"
      :embed="true"
      @setDirigeant="setDirigeant"
      :data="dirigeant1"
    />

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {actionnairePresident: actionnairePresident, president: dirigeant1})">Continuer</button>
    </div>
    <div class="actions">
      <a href="#" @click.prevent="$emit('next')">Renseigner plus tard</a>
    </div>
  </section>
</template>

<script>
import ActionnaireUnique from "./actionnaireUnique";
export default {
  components: {ActionnaireUnique},
  props: {
    data: null,
    president: null,
    title: null,
    subTitle: null
  },
  data() {
    return {
      actionnairePresident: 'oui',
      dirigeant1: null
    }
  },
  mounted() {
    if (this.data) this.actionnairePresident = this.data
    if (this.president) this.dirigeant1 = this.president
  },
  methods: {
    setDirigeant(dirigeant) {
      this.dirigeant1 = dirigeant
    }
  },
  watch: {
    data() {
      if (this.data) this.actionnairePresident = this.data
      if (this.president) this.dirigeant1 = this.president
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
      max-width: 210px;
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
