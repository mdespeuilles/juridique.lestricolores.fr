<template>
  <section>
    <h1>Êtes-vous prêt à devenir <strong>votre</strong> propre <strong>patron</strong> ? </h1>
    <div class="blocks">
      <div>
        <div class="img">
          <img src="/img/start1.svg" />
        </div>
        <h3>C’est rapide</h3>
        <p>Le formulaire prend moins de 5 minutes</p>
      </div>
      <div>
        <div class="img">
          <img src="/img/start2.svg" />
        </div>
        <h3>On vous assiste</h3>
        <p>Nos juristes répondent à toutes<br /> vos questions par chat ou au 01 76 41 14 99.</p>
      </div>
      <div>
        <div class="img">
          <img src="/img/start3.svg" />
        </div>
        <h3>On gère tout de A à Z</h3>
        <p>Statuts et formalités, votre K-Bis 48 heures garanti !</p>
      </div>
    </div>

    <div class="actions">
      <button @click="$emit('next')">Démarrer la création</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  @include desk-768 {
    max-width: 95%;
    margin: auto;
  }

  h1 {
    color: #000000;
    font-family: "Yeseva One";
    font-size: 54px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: 50px;
    max-width: 695px;
    margin: auto;
    text-align: center;
    margin-bottom: 53px;

    @include desk-1024 {
      font-size: 44px;
    }


    strong {
      color: #f44336;
    }
  }

  .blocks {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 49px;

    @include desk-1024 {
      flex-direction: column;
    }

    > div {
      width: 280px;
      height: 284px;
      background: #FFFFFF;
      box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
      border-radius: 5px;
      text-align: center;

      @include desk-1024 {
        margin-bottom: 30px;
      }

      .img {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 170px;
      }

      h3 {
        font-weight: 800;
        font-size: 18px;
        line-height: 26px;
        color: #0B2758;
        margin-top: 0;
        margin-bottom: 15px;
      }

      p {
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: #405986;
      }
    }
  }

  .actions {
    display: flex;
    justify-content: center;
  }
}
</style>
