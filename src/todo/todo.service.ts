import { Injectable, NotFoundException } from '@nestjs/common';
import { StatusArgs } from './dto/args/status.args';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Todo } from './entity/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'TODO 1', done: false },
    { id: 2, description: 'TODO 2', done: true },
    { id: 3, description: 'TODO 3', done: false },
    { id: 4, description: 'TODO 4', done: true },
  ];

  findAll(statusArgs: StatusArgs): Todo[] {
    if (statusArgs.status === undefined) return this.todos;
    return this.todos.filter((todo) => todo.done === statusArgs.status);
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo: Todo) => id === todo.id);
    if (!todo) throw new NotFoundException(`Todo with ID ${id} not found`);
    return todo;
  }

  create(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    todo.done = false;
    this.todos.push(todo);
    return todo;
  }

  update(updateTodoInput: UpdateTodoInput): Todo[] {
    this.findOne(updateTodoInput.id);

    const todo = this.todos.map((todo: Todo) => {
      if (todo.id === updateTodoInput.id) {
        todo.description = updateTodoInput.description;
        todo.done = updateTodoInput.done;
      }
      return todo;
    });

    return todo;
  }

  delete(id: number): Todo[] {
    this.findOne(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.todos;
  }
}
