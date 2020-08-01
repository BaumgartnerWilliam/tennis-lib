import { createGame, createPlayer } from './game';

it('player 1 win', () => {
  const game = createGame(createPlayer);
  expect(game.getScore()).toEqual('Player 1: 0 - 0: Player 2');

  while (game.p1()) {}
  expect(game.getScore()).toEqual('Player 1: GAME - 0: Player 2');

  game.reset();
  expect(game.getScore()).toEqual('Player 1: 0 - 0: Player 2');
});

it('player 1 win after Deuce', () => {
  const game = createGame(createPlayer);
  game.p1(); // 15 - 0
  game.p1(); // 30 - 0
  game.p2(); // 30 - 15

  game.p2(); // 30 - 30
  expect(game.getScore()).toEqual('Player 1: 30 - 30: Player 2');

  game.p1(); // 40 - 30
  game.p2(); // 40 - 40 - Deuce
  expect(game.getScore()).toEqual('Deuce');

  game.p2(); // 40 - A 
  expect(game.getScore()).toEqual('Player 1: 40 - A: Player 2');

  game.p1(); // 40 - 40 - Deuce
  expect(game.getScore()).toEqual('Deuce');

  game.p1(); // A - 40 
  expect(game.getScore()).toEqual('Player 1: A - 40: Player 2');

  game.p1(); // GAME - 40
  expect(game.getScore()).toEqual('Player 1: GAME - 40: Player 2');

  game.p2(); // GAME - 40 - remains unchanged
  expect(game.getScore()).toEqual('Player 1: GAME - 40: Player 2');
  game.p1(); // GAME - 40 - remains unchanged
  expect(game.getScore()).toEqual('Player 1: GAME - 40: Player 2');

  game.reset();
  expect(game.getScore()).toEqual('Player 1: 0 - 0: Player 2');
});
