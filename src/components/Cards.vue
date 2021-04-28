<template>
  <b-card class="m-2" style="max-width: 15rem">
    <b-card-header :class="getColor(card.person)">
    
    <!-- toggle switch when is in IN PROGRESS -->
      <b-container v-if="title == 'In Progress'">
        <b-row>
          <b-col></b-col>
          <b-col>{{ card.title }}</b-col>
          <b-col
            ><div
              @click="handleImportant(card.id)"
              class="custom-control custom-switch"
              style="display: inline"
            >
              <input
                type="checkbox"
                class="custom-control-input"
                :checked="check(card.important)"
              />
              <label class="custom-control-label"></label></div
          ></b-col>
        </b-row>
      </b-container>
      <div v-else>{{ card.title }}</div>
    </b-card-header>
    <b-card-text
      class="text-left"
      :class="{ important: check(card.important) }"
    >
      <p class="p-0 m-0 text-muted text-right">
        <small>-- {{ card.person }}</small>
      </p>
      <p><b>Description:</b> {{ card.description }}</p>
      <div class="text-right" v-if="title != 'Done'">
        <b-button id="next" size="sm" class="mr-2" @click="handleNext(card.id)"
          >Next
        </b-button>
        <b-button size="sm" @click="handleDelete(card.id)" id="delete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </b-button>
      </div>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Cards",
  props: {
    card: Object,
    title: String,
    headerColor: Array,
  },
  data() {
    return {};
  },
  methods: {
    handleDelete(e) {
      this.$emit("sendDelete", e);
    },
    handleNext(e) {
      this.$emit("sendNext", e);
    },
    handleImportant(e) {
      this.$emit("sendImportant", e);
    },
    check(e) {
      if (e == 1) {
        return true;
      } else {
        return false;
      }
    },
    
    // add class to header for different color
    getColor(e) {
      for (let i = 0; i < this.headerColor.length; i++) {
        if (this.headerColor[i].person == e) {
          return { [this.headerColor[i].color]: true };
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  padding: 8px;
}
.card-body {
  padding: 0;

  .card-text {
    padding: 10px;
  }

  .important {
    background: #ffd0d0;
  }
}
</style>
