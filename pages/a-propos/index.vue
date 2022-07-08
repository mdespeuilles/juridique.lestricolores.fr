<template>
  <section class="a-propos custom-container">
    <div class="heading">
      <h1>Domicilier votre entreprise en deux clics</h1>
      <p>L’équipe Les Tricolores s’est unie pour un objectif commun: permettre de simplifier la vie des entrepreneurs. Nous travaillons main dans la main pour offrir aux entrepreneurs une domiciliation rapide, prestigieuse et à moindre coût. Nous proposons des services complémentaires comme: un logiciel de facturation, un expert-comptable pour suivre votre trésorerie ouencore rédiger les statuts de votre société.</p>
    </div> 
     <div class="grid">
        <ProposComponent :item="item" v-for="item of data" :key="item.id"/>
      </div>
  </section>
</template>
<script>
import ProposComponent from "../../components/page/a-propos";

export default {
  components: {
    ProposComponent
  },
  async asyncData({ $axios, route, error }) {
    return {
      data: [
        {
          name: 'Jean-Philippe AUPETIT',
          title: 'PRÉSIDENT/ COFONDATEUR',
          description: 'Expert-comptable depuis 15 ans, Jean-Philippe propose à ses clients des solutions entièrement digitalisées pour faciliter le quotidien des entrepreneurs. Passionné de courses à pied et d’automobile, vous pouvez le retrouver sur un marathon ou sur un circuit auto.',
          image: 'https://www.lestricolores.fr/_nuxt/img/jpa-small.b686f77.jpg'
        },
         {
          name: 'Lilian ATLAN',
          title: 'COMMERCIAL',
          description: 'Fraichement diplômé et passionné par l’entrepreneuriat, Lilian souhaite mettre à profit ses diverses expériences pour développer les Tricolores et aider les entrepreneurs à lancer et structurer leur projet!',
          image: 'https://www.lestricolores.fr/_nuxt/img/lillian-small.2c61c5d.jpg'
        },
         {
          name: 'Nastasia MATHIEU',
          title: 'PRODUCT DEVELOPPER',
          description: 'Passionnée par les lettres et le théâtre, Nastasia a suivi des études littéraires et met sa plume au service des Tricolores! Si vous la cherchez en dehors du travail, vous pouvez la trouver à un concert de rock.',
          image: 'https://www.lestricolores.fr/_nuxt/img/celine-small.c07bfb3.jpg'
        },
         {
          name: 'Alexandre LOUPILLON',
          title: 'WEB DEVELOPPER',
          description: 'Diplômé d’un Master en Management des systèmes d’information à l’ISC Paris, Alexandre souhaitait rejoindre une startup et se lancer dans l’entrepreneuriat ! Passionnée de sport il est possible de le croiser sur un terrain de foot.',
          image: 'https://www.lestricolores.fr/_nuxt/img/alex-small.07ea48d.jpg'
        },
         {
          name: 'Emilie BOEFFARD',
          title: 'RESPONSABLE GESTION COURRIER',
          description: 'Étudiante en droit au sein d’ une université parisienne, Emilie souhaite se spécialiser dans le droit des affaires. Elle fera tout pour faire valoir vos droits en élaborant un contrat de domiciliation en parfaite cohérence avec votre activité',
          image: 'https://www.lestricolores.fr/_nuxt/img/emilie-small.e375d47.jpg'
        }
      ]
    }
  },
}
</script>
 