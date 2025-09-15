import { Direction } from '../models/Direction';
import { GameBoard, GameStatus } from '../models/GameBoard';

/**
 * 游戏控制器，连接模型和视图
 */
export class GameController {
  private gameBoard: GameBoard;
  private animationId: number | null = null;
  private speed: number = 150; // 游戏速度（毫秒）
  private lastUpdateTime: number = 0;

  /**
   * 创建一个新的游戏控制器实例
   * @param gameBoard 游戏板实例
   */
  constructor(gameBoard: GameBoard) {
    this.gameBoard = gameBoard;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /**
   * 开始游戏循环
   */
  startGameLoop(): void {
    this.lastUpdateTime = performance.now();
    this.gameLoop();
  }

  /**
   * 停止游戏循环
   */
  stopGameLoop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * 游戏主循环
   */
  private gameLoop(timestamp: number = 0): void {
    // 基于时间间隔更新游戏状态
    if (timestamp - this.lastUpdateTime > this.speed) {
      this.gameBoard.update();
      this.lastUpdateTime = timestamp;
    }

    // 继续游戏循环
    this.animationId = requestAnimationFrame(this.gameLoop);
  }

  /**
   * 开始游戏
   */
  start(): void {
    this.gameBoard.start();
    this.startGameLoop();
  }

  /**
   * 暂停/继续游戏
   */
  togglePause(): void {
    const status = this.gameBoard.getStatus();
    if (status === GameStatus.PLAYING) {
      this.stopGameLoop();
    } else if (status === GameStatus.PAUSED) {
      this.startGameLoop();
    }
    this.gameBoard.pause();
  }

  /**
   * 重置游戏
   */
  reset(): void {
    this.stopGameLoop();
    this.gameBoard.reset();
  }

  /**
   * 设置键盘事件监听
   */
  setupKeyboardControls(): void {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  /**
   * 移除键盘事件监听
   */
  removeKeyboardControls(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  /**
   * 处理键盘按键事件
   */
  private handleKeyDown(event: KeyboardEvent): void {
    // 防止空格键滚动页面
    if (event.code === 'Space') {
      event.preventDefault();
    }

    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        this.gameBoard.setDirection(Direction.UP);
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.gameBoard.setDirection(Direction.DOWN);
        break;
      case 'ArrowLeft':
      case 'KeyA':
        this.gameBoard.setDirection(Direction.LEFT);
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.gameBoard.setDirection(Direction.RIGHT);
        break;
      case 'Space':
        // 空格键暂停/继续游戏
        const status = this.gameBoard.getStatus();
        if (status === GameStatus.PLAYING || status === GameStatus.PAUSED) {
          this.togglePause();
        } else if (status === GameStatus.READY || status === GameStatus.GAME_OVER) {
          this.start();
        }
        break;
    }
  }

  /**
   * 设置游戏速度
   * @param speed 游戏速度（毫秒）
   */
  setSpeed(speed: number): void {
    this.speed = speed;
  }

  /**
   * 获取游戏板实例
   */
  getGameBoard(): GameBoard {
    return this.gameBoard;
  }
}