<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        VueJS Todo Test (with Vuetify)
      </div>
      <template v-slot:extension>
        <v-btn
          fab
          color="green"
          bottom
          left
          absolute
          @click="toggleAddNewTodoDialog"
          title="Click to add new Todo"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <todo-list :todos="todos"></todo-list>
      <add-todo
        :openAddNewTodoDialog="openAddNewTodoDialog"
        @addTodo="addTodo"
        @update:openAddNewTodoDialog="openAddNewTodoDialog = $event"
      ></add-todo>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Todo from "@/models/todo";
import todoApi from "@/components/todos/todosApi";
import TodoList from "@/components/todos/TodoList.vue";
import AddTodo from "@/components/todos/AddTodo.vue";

@Component({
  components: {
    TodoList,
    AddTodo
  }
})
export default class App extends Vue {
  todos: Todo[];
  openAddNewTodoDialog: boolean;

  public constructor() {
    super();
    this.todos = [];
    this.openAddNewTodoDialog = false;
  }

  public mounted() {
    this.getTodos();
  }

  public getTodos() {
    todoApi.getTodos().then(result => {
      this.todos = result;
    });
  }

  public addTodo(newTodo: string) {
    todoApi.addTodo(newTodo).then(result => {
      this.todos = [result, ...this.todos];
      this.openAddNewTodoDialog = false;
    });
  }

  public toggleAddNewTodoDialog() {
    this.openAddNewTodoDialog = !this.openAddNewTodoDialog;
  }
}
</script>
