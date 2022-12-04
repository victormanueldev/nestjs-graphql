import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field(() => String, { description: 'What needs to be done' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  description?: string;

  @Field(() => Boolean)
  @IsBoolean()
  done?: boolean;
}
