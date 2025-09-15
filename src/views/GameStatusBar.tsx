import React, { useState, useEffect } from 'react';
import { GameBoard, GameStatus } from '../models/GameBoard';
import { useI18n } from '../i18n/I18nContext';

interface GameStatusBarProps {
  gameBoard: GameBoard;
  onStartGame: () => void;
  onPauseGame: () => void;
  onResetGame: () => void;
}

const GameStatusBar: React.FC<GameStatusBarProps> = ({
  gameBoard,
  onStartGame,
  onPauseGame,
  onResetGame,
}) => {
  const { t } = useI18n();
  
  // 使用useState保存分数和状态，这样React可以追踪变化
  const [score, setScore] = useState<number>(0);
  const [status, setStatus] = useState<GameStatus>(GameStatus.READY);

  // 使用useEffect监听游戏状态和分数的变化
  useEffect(() => {
    // 初始设置
    setScore(gameBoard.getScore());
    setStatus(gameBoard.getStatus());
    
    // 创建一个定时器，定期检查分数和状态的变化
    const updateInterval = setInterval(() => {
      setScore(gameBoard.getScore());
      setStatus(gameBoard.getStatus());
    }, 100); // 每100毫秒检查一次
    
    // 清理函数
    return () => {
      clearInterval(updateInterval);
    };
  }, [gameBoard]); // 依赖项数组包含gameBoard

  const getStatusText = (): string => {
    switch (status) {
      case GameStatus.READY:
        return t('statusReady');
      case GameStatus.PLAYING:
        return t('statusPlaying');
      case GameStatus.PAUSED:
        return t('statusPaused');
      case GameStatus.GAME_OVER:
        return t('statusGameOver');
      default:
        return '';
    }
  };

  return (
    <div className="game-status-bar">
      <div className="status-info">
        <div className="score">{t('score')}{score}</div>
        <div className="status">{t('status')}{getStatusText()}</div>
      </div>
      <div className="control-buttons">
        {(status === GameStatus.READY || status === GameStatus.GAME_OVER) && (
          <button onClick={onStartGame} className="start-btn">
            {t('startGame')}
          </button>
        )}
        {(status === GameStatus.PLAYING || status === GameStatus.PAUSED) && (
          <button onClick={onPauseGame} className="pause-btn">
            {status === GameStatus.PLAYING ? t('pause') : t('resume')}
          </button>
        )}
        {(status !== GameStatus.READY) && (
          <button onClick={onResetGame} className="reset-btn">
            {t('resetGame')}
          </button>
        )}
      </div>
    </div>
  );
};

export default GameStatusBar;