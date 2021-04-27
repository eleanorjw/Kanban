<template>
  <div class="home">
    <template>
      <!-- Navbar with Select and Button -->
      <b-navbar class="sticky-top">
        <b-nav-form class="mx-auto">
          <b-form-select
            @change="updateCards"
            class="mx-auto"
            size="md"
            v-model="selected"
          >
            <b-form-select-option disabled :value="null"
              >Select Project</b-form-select-option
            >
            <b-form-select-option
              v-for="(project, index) in projects"
              :key="index"
              :value="project.name"
              >{{ project.name }}</b-form-select-option
            >
          </b-form-select>
        </b-nav-form>
        <CreateProject @handleSubmitProject="submitProject" />
        <b-button class="bg-transparent" size="md" @click="submitDeleteProject">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
      </b-navbar>
    </template>

    <!-- Main Body -->
    <b-container class="mt-3">
      <b-row class="text-center" align-h="center">
        <Column
          class="p-0"
          v-for="(col, index) in cols"
          :key="index"
          :title="col.name"
          :cardsArray="cardsArray[index]"
          :headerColor="headerColor"
          @handleAddCard="addCard"
          @deleteCard="submitDeleteCard"
          @nextStatus="submitNext"
          @importantCard="submitImportant"
        />
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Column from "@/components/Column.vue";
import CreateProject from "@/components/CreateProject.vue";
import { db } from "@/db/db.js";

export default {
  name: "Home",
  components: {
    Column,
    CreateProject,
  },
  data() {
    return {
      selected: null,
      projectName: null,
      cols: [
        { name: "Backlog" },
        { name: "To-Do" },
        { name: "In Progress" },
        { name: "Done" },
      ],
      projects: [],
      cardsArray: [],
      people: [],
      color: [
        "blue0",
        "orange0",
        "green0",
        "yellow",
        "red",
        "blue1",
        "green1",
        "orange1",
        "blue2",
      ],
      headerColor: [],
    };
  },
  created() {
    this.db = new db();
    this.updateProjects();
  },
  methods: {
    submitProject(e) {
      this.projectName = e.trim();
      // insert into db
      this.addProject();
    },

    submitImportant(e) {
      this.db.important(e);
      this.updateCards();
    },

    async submitDeleteCard(e) {
      await this.db.deleteCard(e, this.selected);
      this.updateCards();
    },
    async submitDeleteProject() {
      if (this.selected != null) {
        if (confirm("Confirm delete " + this.selected + " ?") == true) {
          await this.db.deleteProject(this.selected);
          this.updateProjects();
        }
      }
    },

    async submitNext(e) {
      await this.db.next(e);
      this.updateCards();
    },

    async addCard(e) {
      await this.db.addCard(e, this.selected);
      this.updateCards();
    },
    async updateProjects() {
      this.projects = await this.db.getProjects();
    },
    async addProject() {
      await this.db.addProject(this.projectName);
      this.updateProjects();
    },
    async updateCards() {
      if (this.selected != null) {
        let result = await this.db.getCards(this.selected);
        this.cardsArray = [];
        this.cardsArray.push(result[0].status0);
        this.cardsArray.push(result[1].status1);
        this.cardsArray.push(result[2].status2);
        this.cardsArray.push(result[3].status3);
      }
      this.people = [];
      for (let i = 0; i < this.cardsArray.length; i++) {
        for (let j = 0; j < this.cardsArray[i].length; j++) {
          this.people.push(this.cardsArray[i][j].person);
        }
      }
      this.people = this.people.filter(this.onlyUnique);
      this.personColor();
      console.log(this.headerColor);
    },
    //https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    },
    personColor() {
      this.headerColor = [];
      for (let i = 0; i < this.people.length; i++) {
        let j = i % this.color.length;
        let color = this.color[j];
        let person = this.people[i];
        this.headerColor.push({ person, color });
      }
    },
  },
};
</script>

<style lang="scss">
$s-beige: #e9e6dc;
$ss-beige: #f1f0ea;
$s-blue: #889fa2;
$l-blue: #329085;
$bar-green: #485848;
$s-orange: #c96a3b;
$d-blue: #3a6a80;
$b-orange: #e66838;
$b-gold: #efab3e;
$s-green: #797e5c;
$d-green: #1d746e;
$dd-blue: #0d3b47;
$n-green: #4f9a5a;
$d-red: #98061d;

.home {
  color: $dd-blue !important;
  background-color: $s-beige !important;
}
.navbar {
  background-color: $bar-green !important;
}
.btn {
  opacity: 0.8;
  transition: 0.3s;
  &:hover {
    opacity: 1;
  }
}
#add {
  background-color: $d-blue;
  border-color: $d-blue;
}
#delete {
  background-color: $b-gold;
  border-color: $b-gold;
}
#next {
  background-color: $n-green;
  border-color: $n-green;
}
.column {
  background-color: $ss-beige;
}
.card {
  background-color: $ss-beige;
  &-header {
    color: white;
    border: 0;
  }
}
.blue0 {
  background-color: $d-blue;
}
.blue1 {
  background-color: $l-blue;
}
.blue2 {
  background-color: $s-blue;
  color: $dd-blue;
}
.orange0 {
  background-color: $s-orange;
}
.orange1 {
  background-color: $b-orange;
}
.yellow {
  background-color: $b-gold;
  color: $dd-blue;
}
.green0 {
  background-color: $s-green;
}
.green1 {
  background-color: $d-green;
}
.red {
  background-color: $d-red;
}
</style>
