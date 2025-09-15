import React, { useEffect } from 'react';
import SnakeCanvasRenderer from './SnakeCanvasRenderer';
import GameStatusBar from './GameStatusBar';
import { GameBoard } from '../models/GameBoard';
import { GameController } from '../controllers/GameController';
import { useI18n } from '../i18n/I18nContext';

interface GameViewProps {
  width: number;
  height: number;
}

const GameView: React.FC<GameViewProps> = ({ width, height }) => {
  const { t } = useI18n();
  
  // 创建游戏模型和控制器
  const gameBoard = new GameBoard(width, height);
  const gameController = new GameController(gameBoard);

  // 设置键盘控制
  useEffect(() => {
    gameController.setupKeyboardControls();
    
    return () => {
      gameController.removeKeyboardControls();
    };
  }, [gameController]);

  // 游戏控制函数
  const handleStartGame = () => {
    gameController.start();
  };

  const handlePauseGame = () => {
    gameController.togglePause();
  };

  const handleResetGame = () => {
    gameController.reset();
  };

  return (
    <div className="game-container">
      <h1 className="game-title">{t('gameTitle')}</h1>
      <div className="game-content">
        <SnakeCanvasRenderer gameBoard={gameBoard} cellSize={20} />
      </div>
      <GameStatusBar
        gameBoard={gameBoard}
        onStartGame={handleStartGame}
        onPauseGame={handlePauseGame}
        onResetGame={handleResetGame}
      />
      <div className="game-instructions">
        <p>{t('instructionMove')}</p>
        <p>{t('instructionSpace')}</p>
        <p>{t('instructionObjective')}</p>
      </div>
    </div>
  );
};

export default GameView;