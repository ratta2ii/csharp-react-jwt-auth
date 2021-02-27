export interface IDuck {
  name: string;
  numLegs: number;
  makeSound: (sound: string) => void;
}

const duck1: IDuck = {
  name: 'hewey',
  numLegs: 2,
  makeSound: (sound: string) => console.log(sound),
}

const duck2: IDuck = {
  name: 'dewey',
  numLegs: 2,
  makeSound: (sound: string) => console.log(sound),
}

export const ducks = [duck1, duck2];