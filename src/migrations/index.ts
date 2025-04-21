import * as migration_20250421_150938 from './20250421_150938';

export const migrations = [
  {
    up: migration_20250421_150938.up,
    down: migration_20250421_150938.down,
    name: '20250421_150938'
  },
];
