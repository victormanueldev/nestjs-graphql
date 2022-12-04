import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { StatusArgs } from './dto/args/status.args';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}
  @Query(() => [Todo], { name: 'todo' })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'todoById' })
  findOne(@Args('id', { type: () => Int, nullable: true }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Todo {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => [Todo], { name: 'updateTodo' })
  updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ): Todo[] {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => [Todo], { name: 'deleteTodo' })
  deleteTodo(@Args('id', { type: () => Int }) id: number): Todo[] {
    return this.todoService.delete(id);
  }
}
