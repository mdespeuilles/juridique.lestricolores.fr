<template>
  <section>
    <h2>De quel bien s'agit-il ?</h2>

    <p>Indiquez le type de bien que vous souhaitez loger dans votre SCI.</p>

    <div class="select">
      <div :class="{selected: typeDeBien === 'locatif'}" @click="typeDeBien = 'locatif'">
        <strong>Un investissement locatif</strong>
      </div>
      <div :class="{selected: typeDeBien === 'principal'}" @click="typeDeBien = 'principal'">
        <strong>Votre résidence
          principale</strong>
      </div>
      <div :class="{selected: typeDeBien === 'secondaire'}" @click="typeDeBien = 'secondaire'">
        <strong>Une résidence
          secondaire</strong>
      </div>
    </div>

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {typeDeBien: typeDeBien})">Continuer</button>
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
      typeDeBien: 'locatif',
    }
  },
  mounted() {
    if (this.data) this.typeDeBien = this.data
  },
  watch: {
    data() {
      if (this.data) this.typeDeBien = this.data
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
        background-color: #286feb;
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
        border: 1px solid #286FEB;
        box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      }
    }
  }
}
</style>
