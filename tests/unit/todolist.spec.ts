import Vue from 'vue';
import { mount, Wrapper } from "@vue/test-utils";
import Todos from "@/components/todos/TodoList.vue";
import todos from "./__mocks__/todos";

describe("TodoList.vue", () => {
  let wrapper: Wrapper<Vue>;
  beforeEach(() => {
    wrapper = mount(Todos, {
      propsData: {
        todos: todos
      }
    })
  })

  it("should display a card with two buttons for each todo item", () => {
    const results = wrapper.findAll('.todo-card');
    expect(results.length).toEqual(todos.length);

    results.wrappers.forEach(todo => {
      const buttons = todo.findAll('.v-btn');
      expect(buttons.length).toEqual(2);
    })

  });

  it("should display a checkmark icon for an incomplete todo", () => {
    const results = wrapper.findAll('.todo-card');

    const incompleteTodosIndexes = todos.reduce((acc: number[], todo, index) => {
      if (!todo.completed) {
        acc.push(index);
      }
      return acc;
    }, []);
    
    const randomIncompleteIndex = incompleteTodosIndexes[Math.floor(Math.random() * incompleteTodosIndexes.length)];

    const incompletedTodo = results.at(randomIncompleteIndex);
    expect(incompletedTodo.find('i.mdi-check-bold').exists()).toBe(true);

  });

  it("should display an undo icon for a complete todo", () => {
    const results = wrapper.findAll('.todo-card');

    const completeTodosIndexes = todos.reduce((acc: number[], todo, index) => {
      if (todo.completed) {
        acc.push(index);
      }
      return acc;
    }, []);

    const randomCompleteIndex = completeTodosIndexes[Math.floor(Math.random() * completeTodosIndexes.length)];

    const completedTodo = results.at(randomCompleteIndex);
    expect(completedTodo.find('i.mdi-undo').exists()).toBe(true);

  });
  
});
