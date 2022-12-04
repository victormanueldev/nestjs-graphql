import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { description: 'Hello World Message', name: 'hello' })
  helloWorld(): string {
    return 'Hola Mundo';
  }

  @Query(() => Float, { name: 'randomNumber' })
  randomNumer(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, { name: 'randomZeroTen' })
  getRandomToTen(): number {
    return Math.floor(Math.random() * 10);
  }

  @Query(() => Int, { name: 'randomZeroTo' })
  getRandomZeroTo(
    @Args('to', { type: () => Int, nullable: true }) to = 6,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
