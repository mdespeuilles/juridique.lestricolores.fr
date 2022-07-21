<template>
  <section class="faq">
    <div>
      <div class="title"><h2>VOS QUESTIONS, NOS RÉPONSES</h2></div>
      <div class="box-faqs">
        <div class="row-faq">
          <div class="faq-group col-sm-12 col-md-6 col-12">
            <div class="item-faq-group" v-for="(item, index) in left" :key="index">
              <div class="title-group">
               {{item.question}}
              </div> 
              <div class="content-group" v-html="item.answer"></div>
            </div>
          </div>
          <div class="faq-group col-sm-12 col-md-6 col-12">
            <div class="item-faq-group" v-for="(item, index) in right" :key="index">
              <div class="title-group">
               {{item.question}}
              </div> 
              <div class="content-group" v-html="item.answer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
   props: {
    faqs: []
  },
  data() {
    return {
      left: [],
      right: []
    };
  },
  created(){
    this.faqs.forEach((el, index) => {
        if(index % 2 === 0){
          this.left.push(el)
        }else{
           this.right.push(el)
        }
    });
  }
};
</script>
<style lang="scss" scoped>
.faq {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  .title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 32px;
    h2 {
      text-align: center;
      color: #364697;
      font-size: 36px;
      font-weight: 600;
      position: relative;
      margin: 10px 0;
    }
    &::after {
      content: "";
      bottom: 0;
      height: 6px;
      width: 90px;
      background-color: #f95258;
      margin: 8px auto;
    }
  }
  .box-faqs {
    .row-faq {
      display: flex;
      
      margin-right: -12px;
      margin-left: -12px;
    }
    .faq-group {
      padding: 10px;
      width: 100%;
      .item-faq-group{
        background: white;
        padding: 20px;
        margin-bottom: 20px;
      }
      .title-group {
        color: #f95258;
        font-weight: bold;
        font-size:1.17em;
      }
      .content-group {
        color: #364697;
        a {
          color: #1976d2;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
 