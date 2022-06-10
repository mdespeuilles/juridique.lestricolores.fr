<template>
  <section>
    <h2>Vos statuts</h2>
    <p>Plus qu'une étape avant d'obtenir vos statuts</p>
    <iframe :src="`/preview/${submission.uuid}`" />

    <div class="actions">
      <div class="back" @click="$emit('back')">
        <img src="/img/back.svg" alt="back"/>
      </div>
      <button @click="$emit('next', {autoentrepreneur: autoentrepreneur})">Continuer</button>
    </div>

  </section>
</template>

<script>
export default {
  props: {
    submission: null
  },
  mounted() {
    if (this.$route.query.edit) {
      this.$router.push({
        path: '/fin'
      })
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

  iframe {
    border: none;
    width: 100%;
    height: 500px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
    border-radius: 10px;
    margin-bottom: 50px;
  }
}
</style>
