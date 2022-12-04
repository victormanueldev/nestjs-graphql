import { Module } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { TodoResolver } from './todo.resolver';
import { TodoService } from './todo.service';

@Module({
  providers: [TodoResolver, TodoService],
})
export class TodoModule {}
