<template>
  <div class="column">
    <b-col style="width: 17rem" cols="12">
      <div class="column-title">
        <h4 class="mt-3">
          {{ title }}
          <AddCard
            style="display: inline"
            v-if="title == 'Backlog'"
            @handleSubmitCard="submitCard"
          />
        </h4>
      </div>
      <!-- Display cards -->
      <Cards
        @sendDelete="sendDeleteCard"
        @sendNext="nextCol"
        @sendImportant="importantCard"
        v-for="(card, index) in cardsArray"
        :key="index"
        :card="card"
        :title="title"
        :headerColor="headerColor"
      />
    </b-col>
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";
import AddCard from "@/components/AddCard.vue";

export default {
  name: "Column",
  props: {
    title: String,
    cardsArray: Array,
    headerColor: Array,
  },
  components: {
    Cards,
    AddCard,
  },
  data() {
    return {
      color: [
        "blue0",
        "orange0",
        "yellow",
        "green0",
        "orange1",
        "blue1",
        "green1",
        "blue2",
      ],
      header: [],
    };
  },
  methods: {
    submitCard(e) {
      this.$emit("handleAddCard", e);
    },
    sendDeleteCard(e) {
      this.$emit("deleteCard", e);
    },
    nextCol(e) {
      this.$emit("nextStatus", e);
    },
    importantCard(e) {
      this.$emit("importantCard", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.column {
  min-height: 75vh;
  transition: box-shadow 0.5s;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 4px;
  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
}
</style>
