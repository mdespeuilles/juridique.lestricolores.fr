<template>
  <section>
    <h1>Quelques informations avant de <strong>modifier votre entreprise</strong></h1>
    <div class="blocks">
      <div>
        <div class="img">
          <img src="/img/time.svg" />
        </div>
        <h3>C’est rapide</h3>
        <p>Les utilisateurs le remplissent en moyenne en 5 à 10 minutes.</p>
      </div>
      <div>
        <div class="img">
          <img src="/img/help.svg" />
        </div>
        <h3>Vous avez besoin d'aide ?</h3>
        <p>Nos experts sont là pour vous aider, par chat ou au 01 76 41 14 99</p>
      </div>
      <div>
        <div class="img">
          <img src="/img/check2.svg" />
        </div>
        <h3>On gère tout de A à Z</h3>
        <p>Modifications en toute sérénité.</p>
      </div>
    </div>

    <div class="actions">
      <button @click="$emit('next')">Modifier ma société</button>
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
    line-height: 60px;
    max-width: 890px;
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
