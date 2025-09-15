import React, { useEffect, useRef } from 'react';
import { GameBoard, GameStatus } from '../models/GameBoard';
import { Point } from '../models/Point';
import { useI18n } from '../i18n/I18nContext';

interface SnakeCanvasRendererProps {
  gameBoard: GameBoard;
  cellSize?: number;
}

const SnakeCanvasRenderer: React.FC<SnakeCanvasRendererProps> = ({
  gameBoard,
  cellSize = 20,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useI18n();

  // 计算画布尺寸
  const width = gameBoard.getWidth() * cellSize;
  const height = gameBoard.getHeight() * cellSize;

  // 渲染游戏画面
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清除画布
    ctx.clearRect(0, 0, width, height);

    // 设置样式
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    ctx.fillStyle = isDarkMode ? '#1e1e1e' : '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // 绘制网格线（可选）
    ctx.strokeStyle = isDarkMode ? '#333333' : '#e0e0e0';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= gameBoard.getWidth(); i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, height);
      ctx.stroke();
    }
    for (let i = 0; i <= gameBoard.getHeight(); i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(width, i * cellSize);
      ctx.stroke();
    }

    // 绘制蛇身体
    const snakeBody = gameBoard.getSnake().getBody();
    snakeBody.forEach((point, index) => {
      const x = point.x * cellSize;
      const y = point.y * cellSize;
      
      // 蛇头和身体颜色区分
      if (index === 0) {
        ctx.fillStyle = '#4caf50'; // 蛇头绿色
      } else {
        ctx.fillStyle = isDarkMode ? '#2e7d32' : '#81c784'; // 蛇身体颜色
      }
      
      ctx.fillRect(x, y, cellSize, cellSize);
      
      // 蛇的边框
      ctx.strokeStyle = isDarkMode ? '#1b5e20' : '#388e3c';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellSize, cellSize);
    });

    // 绘制食物
    const food = gameBoard.getFood();
    if (food) {
      const foodPosition = food.getPosition();
      const x = foodPosition.x * cellSize;
      const y = foodPosition.y * cellSize;
      
      ctx.fillStyle = '#f44336'; // 食物红色
      ctx.fillRect(x, y, cellSize, cellSize);
    }

    // 绘制游戏状态文本
    const status = gameBoard.getStatus();
    if (status !== GameStatus.PLAYING) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      let text = '';
      switch (status) {
        case GameStatus.READY:
          text = t('pressSpaceToStart');
          break;
        case GameStatus.PAUSED:
          text = t('gamePaused');
          break;
        case GameStatus.GAME_OVER:
          text = t('gameOver');
          break;
      }
      
      ctx.fillText(text, width / 2, height / 2 - 20);
      ctx.font = '16px Arial';
      ctx.fillText(t('score') + gameBoard.getScore(), width / 2, height / 2 + 20);
    }
  };

  // 当游戏状态变化时重新渲染
  useEffect(() => {
    const interval = setInterval(() => {
      render();
    }, 16); // 约60fps

    return () => {
      clearInterval(interval);
    };
  }, [gameBoard, cellSize, width, height, t]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        border: '2px solid #333',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    />
  );
};

export default SnakeCanvasRenderer;