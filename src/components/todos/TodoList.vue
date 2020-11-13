<template>
  <div class="todo-list pt-4">
    <v-row class="d-flex justify-center">
      <v-col cols="8" md="6" sm="8" xs="8">
        <v-text-field
          label="Search Todo List"
          outlined
          v-model="filter"
        ></v-text-field>
      </v-col>
    </v-row>

    <transition-group name="fade" v-if="todoList.length > 0">
      <v-card
        v-for="(todo, i) in todoList"
        :key="`todo-${i}`"
        class="mx-auto pa-3 ma-2 todo-card"
        max-width="800"
      >
        <v-row>
          <v-col cols="8">
            <v-card-title
              :class="[
                'headline mb-1',
                todo.completed ? 'text-decoration-line-through' : ''
              ]"
              >{{ todo.title }}</v-card-title
            >
          </v-col>
          <v-col cols="2" class="text-center">
            <v-btn icon color="green" @click="updateTodo(todo)">
              <v-icon v-if="todo.completed" title="Click to reset Todo"
                >mdi-undo</v-icon
              >
              <v-icon
                v-else-if="updating !== todo.id"
                title="Click to complete Todo"
                >mdi-check-bold</v-icon
              >
              <v-progress-circular
                v-else
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-btn>
          </v-col>
          <v-col cols="2" class="text-center">
            <v-btn icon color="red" @click="deleteTodo(todo, i)">
              <v-icon
                v-if="deleting !== todo.id"
                title="Click to delete this Todo"
                >mdi-delete</v-icon
              >
              <v-progress-circular
                v-else
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </transition-group>
    <v-row v-else class="d-flex justify-center">
      <v-col cols="8" md="6" sm="8" xs="8">
        <p>Nothing to do.</p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

import Todo from "@/models/todo";
import todoApi from "./todosApi";

@Component
export default class TodoList extends Vue {
  @Prop({ type: Array, required: true }) todos!: Todo[];
  updating: number;
  deleting: number;
  filter: string;

  public constructor() {
    super();
    this.updating = 0;
    this.deleting = 0;
    this.filter = "";
  }

  public updateTodo(todo: Todo): void {
    this.updating = todo.id;
    todo.completed = !todo.completed;
    todoApi.updateTodo(todo).then(() => {
      this.updating = 0;
      // for real data I'd emit an event to the parent component
      // to update the list of Todos
    });
  }

  public deleteTodo(todo: Todo, index: number): void {
    this.deleting = todo.id;
    todoApi.deleteTodo(todo).then(() => {
      // remove the item from the list
      // for real data I'd emit an event to the parent component
      // to update the list of Todos
      this.$delete(this.todoList, index);
      this.deleting = 0;
    });
  }

  private get todoList(): Todo[] {
    if (this.filter.length > 0) {
      return this.todos.filter(todo => todo.title.indexOf(this.filter) >= 0);
    }
    return [...this.todos];
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
