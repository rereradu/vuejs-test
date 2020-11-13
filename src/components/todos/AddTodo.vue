<template>
  <v-dialog v-model="openDialog" max-width="500px">
    <v-card class="pt-2">
      <v-card-text>
        <v-text-field
          label="Add new todo"
          v-model="newTodo"
          @keyup.enter="addTodo"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-progress-circular
          v-if="processing"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <v-btn
          v-else
          text
          outlined
          color="primary"
          @click="addTodo"
          :disabled="newTodo === ''"
        >
          Add Todo
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Watch, Vue } from "vue-property-decorator";
@Component
export default class AddTodo extends Vue {
  @PropSync("openAddNewTodoDialog") openDialog?: boolean;
  newTodo: string;
  processing: boolean;

  public constructor() {
    super();
    this.newTodo = "";
    this.processing = false;
  }

  private addTodo() {
    this.processing = true;
    this.$emit("addTodo", this.newTodo);
  }

  @Watch("openDialog")
  public resetDialog() {
    this.processing = false;
    this.newTodo = "";
  }
}
</script>

<style></style>
