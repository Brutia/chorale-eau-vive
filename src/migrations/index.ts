import * as migration_20260713_190000 from './20260713_190000';

export const migrations = [
  {
    up: migration_20260713_190000.up,
    down: migration_20260713_190000.down,
    name: '20260713_190000'
  },
];
