export interface TranslationKeys {
  gameTitle: string;
  startGame: string;
  pause: string;
  resume: string;
  resetGame: string;
  score: string;
  status: string;
  statusReady: string;
  statusPlaying: string;
  statusPaused: string;
  statusGameOver: string;
  instructionMove: string;
  instructionSpace: string;
  instructionObjective: string;
  pressSpaceToStart: string;
  gamePaused: string;
  gameOver: string;
}

export interface Locale {
  code: string;
  name: string;
  translations: TranslationKeys;
}

export const locales: Record<string, Locale> = {
  'zh-CN': {
    code: 'zh-CN',
    name: '中文',
    translations: {
      gameTitle: '贪吃蛇游戏',
      startGame: '开始游戏',
      pause: '暂停',
      resume: '继续',
      resetGame: '重置游戏',
      score: '分数: ',
      status: '状态: ',
      statusReady: '准备开始',
      statusPlaying: '游戏中',
      statusPaused: '已暂停',
      statusGameOver: '游戏结束',
      instructionMove: '使用方向键或WASD键控制蛇的移动',
      instructionSpace: '按空格键开始/暂停游戏',
      instructionObjective: '吃到食物蛇会变长，撞到墙壁或自身游戏结束',
      pressSpaceToStart: '按空格键开始游戏',
      gamePaused: '游戏暂停',
      gameOver: '游戏结束'
    }
  },
  'en-US': {
    code: 'en-US',
    name: 'English',
    translations: {
      gameTitle: 'Snake Game',
      startGame: 'Start Game',
      pause: 'Pause',
      resume: 'Resume',
      resetGame: 'Reset Game',
      score: 'Score: ',
      status: 'Status: ',
      statusReady: 'Ready',
      statusPlaying: 'Playing',
      statusPaused: 'Paused',
      statusGameOver: 'Game Over',
      instructionMove: 'Use arrow keys or WASD to control the snake',
      instructionSpace: 'Press SPACE to start/pause the game',
      instructionObjective: 'Eat food to grow, avoid walls and your own body',
      pressSpaceToStart: 'Press SPACE to start',
      gamePaused: 'Game Paused',
      gameOver: 'Game Over'
    }
  }
};

export const defaultLocale = 'zh-CN';