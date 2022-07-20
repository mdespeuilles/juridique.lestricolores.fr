<template>
  <div>
    <div class="bg-video">
      <div class="content">
        <div class="left-content">
          <h1>
            Vos formalités juridiques <br />
            pour 99 € HT
          </h1>
          <ul>
             <li>
              <img class="icon" src="/img/checked.svg" alt="" />  Une offre sécurisée et 100% digitale
            </li>
            <li>
              <img class="icon" src="/img/checked.svg" alt="" /> Votre kbis en 48h
            </li>
            <li>
              <img class="icon" src="/img/checked.svg" alt="" /> Satisfait ou remboursé
            </li>
          </ul>
          <div class="button-groups">
            <button
            type="button"
            class="v-btn v-btn--contained theme--dark v-size--x-large"
            style="
              background-color: rgb(249, 82, 88);
              border-color: rgb(249, 82, 88);
            "
          >
            <span class="v-btn__content">Créer mon entreprise</span>
          </button>
          <button
            type="button"
            class="v-btn v-btn--contained theme--dark v-size--x-large"
            style="
              background-color: rgb(249, 82, 88);
              border-color: rgb(249, 82, 88);
            "
          >
            <span class="v-btn__content">Modifier mon entreprise</span>
          </button>
          <button
            type="button"
            class="v-btn v-btn--contained theme--dark v-size--x-large"
            style="
              background-color: rgb(249, 82, 88);
              border-color: rgb(249, 82, 88);
            "
          >
            <span class="v-btn__content">liquider mon entreprsie</span>
          </button>
          </div>
        </div>
        <div class="right-content">
          Les Tricolores,<br />
          domiciliez votre entreprise<br />
          en 3 clics seulement
          <div>
            <img
              src="https://res.cloudinary.com/tricolores/image/upload/q_auto,f_auto/v1610114286/assets/lefigaro_hpvzpr.png"
              alt="Le figaro"
              width="94"
              height="94"
            />
          </div>
        </div>
      </div>
      <video
        width="100%"
        id="video-container"
        autoplay="autoplay"
        loop="loop"
        muted="muted"
        src="https://res.cloudinary.com/tricolores/video/upload/q_auto,f_auto/v1610114360/assets/paris_xhhvpt.mp4"
      ></video>
    </div>
    <div class="home-content">
      <feedback />
      <div v-for="(component, index ) in components" :key="index">
        <three-steps
          v-if="component.__component === 'content.steps'"
          :component="component"
        />

        <products
          v-if="component.__component === 'content.products'"
          :component="component"
        />

        <faq
          v-if="component.__component === 'content.faqs'"
          :component="component"
        />

        <ytvideo
          v-if="component.__component === 'content.video'"
          :component="component"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ThreeSteps from "./three-steps";
import Products from "./products";
import Faq from "./faq";
import Ytvideo from "./ytvideo";
import feedback from '../home/feedback.vue';
export default {
  props: {
    components: null,
  },
  components: { Ytvideo, Faq, Products, ThreeSteps, feedback },
};
</script>
<style lang="scss" scoped>
.home-content {

  background-color: #fbf9f8;
  position: relative;
  z-index: 9;
}
.bg-video {
  width: 100%;
  height: 968px;
  position: relative;
   &::after{
      position: fixed;
      top: 0;
      left: 0;
      min-width: 100%;
      min-height: 100%;
      width: auto;
      height: auto;
      z-index: 0;
      transition: opacity 1s;
      content: "";
      background: rgba(0,0,0,.6);
    }
  #video-container {
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: 0;
    transform: translateX(-50%) translateY(-50%);
    transition: opacity 1s;
   
    
  }
  .content {
    width: 100%;
    position: absolute;
    max-width: 1300px;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    z-index: 3;
    .left-content {
      width: 100%;
      text-align: left;
      color: white;
      h1 {
        font-size: 24px;
        font-weight: 600;
        line-height: 34px;
        margin-bottom: 50px;
      }
      ul {
        padding: 0;
        margin-bottom: 50px;
        li {
          list-style-type: none;
          font-size: 20px;
          margin-top: 20px;
          margin-bottom: 10px;
          .icon {
            width: 20px;
          }
        }
      }
      .button-groups{
        button{
          margin-right:10px;
        }
      }
    }
    .right-content {
      width:100%;
      max-width: 332px;
      padding-top: 150px;
      display: flex;
      text-align: right;
      padding-right: 15px;
      line-height: 30px;
      align-items: center;
      color: white;
      div {
        padding-left: 10px;
      }
    }
  }
}
</style>
