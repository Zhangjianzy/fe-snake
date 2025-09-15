import { Point } from './Point';
import { Direction } from './Direction';
import { Snake } from './Snake';
import { Food } from './Food';

/**
 * 游戏状态枚举
 */
export enum GameStatus {
  READY = 'READY',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER'
}

/**
 * 表示游戏板
 */
export class GameBoard {
  private width: number;
  private height: number;
  private snake: Snake;
  private food: Food;
  private score: number;
  private status: GameStatus;

  /**
   * 创建一个新的游戏板实例
   * @param width 游戏板宽度
   * @param height 游戏板高度
   */
  constructor(width: number = 20, height: number = 20) {
    this.width = width;
    this.height = height;
    this.snake = new Snake(new Point(width / 2, height / 2));
    this.food = this.generateFood();
    this.score = 0;
    this.status = GameStatus.READY;
  }

  /**
   * 获取游戏板宽度
   */
  getWidth(): number {
    return this.width;
  }

  /**
   * 获取游戏板高度
   */
  getHeight(): number {
    return this.height;
  }

  /**
   * 获取蛇实例
   */
  getSnake(): Snake {
    return this.snake;
  }

  /**
   * 获取食物实例
   */
  getFood(): Food {
    return this.food;
  }

  /**
   * 获取当前分数
   */
  getScore(): number {
    return this.score;
  }

  /**
   * 获取当前游戏状态
   */
  getStatus(): GameStatus {
    return this.status;
  }

  /**
   * 设置蛇的移动方向
   */
  setDirection(direction: Direction): void {
    if (this.status === GameStatus.PLAYING) {
      this.snake.setDirection(direction);
    }
  }

  /**
   * 开始游戏
   */
  start(): void {
    this.reset();
    this.status = GameStatus.PLAYING;
  }

  /**
   * 暂停游戏
   */
  pause(): void {
    if (this.status === GameStatus.PLAYING) {
      this.status = GameStatus.PAUSED;
    } else if (this.status === GameStatus.PAUSED) {
      this.status = GameStatus.PLAYING;
    }
  }

  /**
   * 重置游戏
   */
  reset(): void {
    this.snake = new Snake(new Point(this.width / 2, this.height / 2));
    this.food = this.generateFood();
    this.score = 0;
  }

  /**
   * 游戏主循环更新
   */
  update(): void {
    if (this.status !== GameStatus.PLAYING) {
      return;
    }

    // 移动蛇
    this.snake.move();

    // 检查碰撞
    if (this.checkWallCollision() || this.snake.isCollidingWithSelf()) {
      this.status = GameStatus.GAME_OVER;
      return;
    }

    // 检查是否吃到食物
    if (this.snake.head.equals(this.food.getPosition())) {
      this.snake.grow();
      this.score += 10;
      this.food = this.generateFood();
    }
  }

  /**
   * 检查是否撞到墙壁
   */
  private checkWallCollision(): boolean {
    const head = this.snake.head;
    return head.x < 0 || head.x >= this.width || head.y < 0 || head.y >= this.height;
  }

  /**
   * 生成新的食物
   */
  private generateFood(): Food {
    let position: Point;
    const snakeBody = this.snake.getBody();

    // 生成一个不在蛇身上的随机位置
    do {
      position = new Point(
        Math.floor(Math.random() * this.width),
        Math.floor(Math.random() * this.height)
      );
    } while (snakeBody.some(segment => segment.equals(position)));

    return new Food(position);
  }
}