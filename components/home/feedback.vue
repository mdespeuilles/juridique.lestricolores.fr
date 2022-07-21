<template>
  <section class="feedback">
    <div>
      <div class="title"><h2>Ils ont réussi avec Les Tricolores</h2></div>
      <div class="description"><p>Les Tricolores accompagnent <span>plus de 3000 entrepreneurs</span></p></div>
    </div>
    <VueSlickCarousel v-bind="settings" ref="carousel">
      <div class="item-feedback" v-for="(item, index) in reviews" :key="index">
        <div class="content">
          <div class="stars">
            <span><img src="/img/star.svg" alt=""></span>
            <span><img src="/img/star.svg" alt=""></span>
            <span><img src="/img/star.svg" alt=""></span>
            <span><img src="/img/star.svg" alt=""></span>
            <span><img src="/img/star.svg" alt=""></span>
          </div>
            <p>{{item.comment}}</p>
        </div>
        <div class="information">
          <div class="avatar">
            <img :src="`https://res.cloudinary.com/tricolores/image/fetch/q_auto,f_auto,w_140,h_140,c_fill/https://api.lestricolores.fr/media/${item.logo.filePath}`" alt="Avatar">
          </div>
          <p class="name">{{item.name}}</p>
          <p class="title">{{item.corporateName}}</p>
        </div>
      </div> 
    </VueSlickCarousel>
      <div class="btn-arrow btn-arrow-prev"><button @click="showPrev"><svg data-v-5d6d8612="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path data-v-5d6d8612="" d="M9.375 233.4l128-128c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H480c17.69 0 32 14.31 32 32s-14.31 32-32 32H109.3l73.38 73.38c12.5 12.5 12.5 32.75 0 45.25c-12.49 12.49-32.74 12.51-45.25 0l-128-128C-3.125 266.1-3.125 245.9 9.375 233.4z"></path></svg></button></div>
      <div class="btn-arrow btn-arrow-next"><button @click="showNext"><svg data-v-5d6d8612="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path data-v-5d6d8612="" d="M502.6 278.6l-128 128c-12.51 12.51-32.76 12.49-45.25 0c-12.5-12.5-12.5-32.75 0-45.25L402.8 288H32C14.31 288 0 273.7 0 255.1S14.31 224 32 224h370.8l-73.38-73.38c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l128 128C515.1 245.9 515.1 266.1 502.6 278.6z"></path></svg></button></div>
  <div class="box-rating-google"><div class="rating-google">

    <div class="left">
      <img src="/img/reviews-badge_lphcsg.webp" >
    </div>
<div class="right">
  <div data-v-c11695a4="" class="ml-2" style="display: flex; flex-direction: column; justify-content: center;"><p data-v-c11695a4="" class="mb-0" style="color: rgb(42, 46, 81); font-weight: 600; font-size: 20px;">
      4.8/5
    </p> <p data-v-c11695a4="" class="mb-2" style="color: rgb(101, 102, 104); font-weight: 400; font-size: 11px;">
      (336 AVIS)
    </p> <p data-v-c11695a4="" class="mb-0" style="color: rgb(42, 46, 81); font-weight: 600; font-size: 20px;">
      Excellent
    </p></div>
</div>
  </div></div>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

  export default {
    props: {
    reviews: []
  },
    components: { VueSlickCarousel },
    data(){
      return {
         settings: {
          arrows: false,
          dots: false,
          centerMode: false,
          slidesToShow: 3,
          infinite: false,
          
        }, 
      }
    },
    methods: {
      showNext() {
        this.$refs.carousel.next()
      }, showPrev() {
        this.$refs.carousel.prev()
      },
    }
  }
</script>
<style lang="scss" scoped>
  .feedback{
    padding: 100px 0;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    .title{
      h2{
        text-align: center;
      font-size: 36px;
      font-weight: 600;
      line-height: 1.5em;
      margin-bottom: 25px;
          color: #364697;
      }
    }
    .description{ 
     p{
       text-align: center;
      font-size: 25px;
      font-weight: 300;
      line-height: 35px;
          color: #364697;
          span{
            color: #f44336;
            font-weight: 600;
          }
     }
    }
    .btn-arrow{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      background: white;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      justify-items: center;
      align-items: center;
      button{
        background: none;
      }
      &.btn-arrow-next{
        right: -50px;
      }
       &.btn-arrow-prev{
        left: -50px;
      }
      svg{
        width: 20px;
      }
    }
    .item-feedback{
      color: black;
        padding: 20px 0 0 0;
      .content{
        padding: 20px 20px 140px 20px;
        width: 100%;
        height: 375px;
        max-width: 320px;
        margin: 0 auto;
        font-size: 16px;
        font-weight: 300;
        line-height: 24px;
        text-align: center;
        box-shadow: 0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)!important;
      }
      .stars{
        display: flex;
        margin: 0 auto;
        text-align: center;
        padding: 10px 0;justify-content: center;

        span{
          width: 34px;
          text-align: center;
         img{ width: 22px;margin: 0 auto;}
          }
      }
      .information{
        text-align: center;
        position: relative;
        top: -60px;
        .avatar{
          text-align: center;
          margin: 0 auto;
          img{
          margin: 0 auto;
            border-radius: 100%;
            width: 119px;
          }
        }
        .name{
          font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 5px;
        }
        .title{ margin-top: 5px;
          font-size: 16px;
    font-weight: 300;
    line-height: 20px;
        }
      }
    } 
    .box-rating-google{
        margin: 0 auto;
        display: flex; 
      .rating-google{
            display: flex;
            align-items: center;
            margin: 0 auto;
            .right{
              margin-left: 10px;
            }
            p {
              margin: 2px 0;
            }
          }
    }
   
  }
</style>
 