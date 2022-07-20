<template>
  <section class="feedback">
    <VueSlickCarousel :arrows="true" :dots="true">
      <div class="item-feedback" v-for="(item, index) in items" :key="index">
        <div class="content">
          <div class="stars">
            <span><img src="/img/star.svg" alt=""></span>
            <span><img src="/img/star.svg" alt=""></span>
            <span><img src="/img/star.svg" alt=""></span>
            <span><img src="/img/star.svg" alt=""></span>
            <span><img src="/img/star.svg" alt=""></span>
          </div>
            <p>{{item.description}}</p>
        </div>
        <div class="information">
          <div class="avatar">
            <img   :src="item.avatar" alt="Avatar">
          </div>
          <p class="name">{{item.name}}</p>
          <p class="title">{{item.title}}</p>
        </div>
      </div> 
    </VueSlickCarousel>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

  export default {
    components: { VueSlickCarousel },
    data(){
      return {
        items: [{
          avatar: 'https://res.cloudinary.com/tricolores/image/fetch/q_auto,f_auto,w_140,h_140,c_fill/https://api.lestricolores.fr/media/5fa13bda9a4c0_steven.jpg',
          name: 'EMERY Steven',
          title: 'HUDEON - Siren 887648863',
          description: `« Je suis passé par LesTricolores pour créer ma micro-entreprise et domicilier cette dernière chez eux. L'équipe a été très réactive et professionnelle :) »`
        },{
          avatar: 'https://res.cloudinary.com/tricolores/image/fetch/q_auto,f_auto,w_140,h_140,c_fill/https://api.lestricolores.fr/media/5fa13bda9a4c0_steven.jpg',
          name: 'EMERY Steven',
          title: 'HUDEON - Siren 887648863',
          description: `« Je suis passé par LesTricolores pour créer ma micro-entreprise et domicilier cette dernière chez eux. L'équipe a été très réactive et professionnelle :) »`
        },{
          avatar: 'https://res.cloudinary.com/tricolores/image/fetch/q_auto,f_auto,w_140,h_140,c_fill/https://api.lestricolores.fr/media/5fa13bda9a4c0_steven.jpg',
          name: 'EMERY Steven',
          title: 'HUDEON - Siren 887648863',
          description: `« Je suis passé par LesTricolores pour créer ma micro-entreprise et domicilier cette dernière chez eux. L'équipe a été très réactive et professionnelle :) »`
        },{
          avatar: 'https://res.cloudinary.com/tricolores/image/fetch/q_auto,f_auto,w_140,h_140,c_fill/https://api.lestricolores.fr/media/5fa13bda9a4c0_steven.jpg',
          name: 'EMERY Steven',
          title: 'HUDEON - Siren 887648863',
          description: `« Je suis passé par LesTricolores pour créer ma micro-entreprise et domicilier cette dernière chez eux. L'équipe a été très réactive et professionnelle :) »`
        },{
          avatar: 'https://res.cloudinary.com/tricolores/image/fetch/q_auto,f_auto,w_140,h_140,c_fill/https://api.lestricolores.fr/media/5fa13bda9a4c0_steven.jpg',
          name: 'EMERY Steven',
          title: 'HUDEON - Siren 887648863',
          description: `« Je suis passé par LesTricolores pour créer ma micro-entreprise et domicilier cette dernière chez eux. L'équipe a été très réactive et professionnelle :) »`
        },
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .feedback{
    padding: 100px 0;
    .item-feedback{
      color: black;
        padding: 50px 0;
      .content{
        padding: 20px 20px 140px 20px;
        width: 100%;
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
  }
</style>
 