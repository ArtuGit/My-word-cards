<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2" align-self="center">
          <card-add></card-add>
        </v-col>

        <v-col
          v-for="card in myCards"
          :key="card.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
        >
          <card
            :id="card.id"
            :word="card.word"
            :translation="card.translation"
            :image="card.image"
          >
          </card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from '@/components/Card'
import CardAdd from '@/components/CardAdd'
export default {
  components: {
    Card,
    CardAdd,
  },
  data() {
    return {
      myCards: [
        {
          id: '1',
          word: 'Word 1',
          translation: 'Trans Word 1',
          image: 'https://picsum.photos/600/500?1',
        },
        {
          id: '2',
          word: 'Word 2',
          translation: 'Trans Word 2',
          image: 'https://picsum.photos/600/500?2',
        },
        {
          id: '3',
          word: 'Word 3',
          translation: 'Trans Word 3',
          image: 'https://picsum.photos/600/500?3',
        },
      ],
    }
  },
}
</script>
