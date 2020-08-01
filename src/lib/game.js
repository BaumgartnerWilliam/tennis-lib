const ZERO = 0;
const FIFTEEN = 1;
const THIRTY = 2;
const FORTY = 3;
const ADVANTAGE = 4;
const GAME = 5;

const POINTS_MAP = new Map([
  [ZERO, '0'],
  [FIFTEEN, '15'],
  [THIRTY, '30'],
  [FORTY, '40'],
  [ADVANTAGE, 'A'],
  [GAME, 'GAME']
]);

export const createPlayer = () => {
  let _points = ZERO;

  const getScore = () => {
    return POINTS_MAP.get(_points);
  };

  const getPoints = () => {
    return _points;
  };

  const setPoints = points => {
    _points = points;
  };

  const reset = () => {
    _points = ZERO;
  };

  return {
    getScore,
    getPoints,
    setPoints,
    reset
  };
};

export const createGame = generatePlayer => {
  const player1 = generatePlayer();
  const player2 = generatePlayer();

  const getScore = () => {
    if (player1.getPoints() === FORTY && player2.getPoints() === FORTY) {
      return `Deuce`;
    } else {
      return `Player 1: ${player1.getScore()} - ${player2.getScore()}: Player 2`;
    }
  };

  const score = (p1, p2) => {
    if (p1.getPoints() === GAME || p2.getPoints() === GAME) {
      return false;
    }

    if (p2.getPoints() <= FORTY) {
      p1.setPoints(p1.getPoints() + FIFTEEN);
    } else {
      p2.setPoints(p2.getPoints() - FIFTEEN);
    }

    if (p1.getPoints() === ADVANTAGE && p2.getPoints() <= THIRTY) {
      p1.setPoints(p1.getPoints() + FIFTEEN);
    }

    return true;
  };

  const reset = () => {
    player1.reset();
    player2.reset();
  };

  return {
    getScore,
    p1: () => score(player1, player2),
    p2: () => score(player2, player1),
    reset
  };
};
