import { Direction } from './Direction';
import { Point } from './Point';

/**
 * 表示游戏中的蛇
 */
export class Snake {
  private body: Point[];
  private direction: Direction;
  private nextDirection: Direction;
  private isGrowing: boolean;

  /**
   * 创建一个新的蛇实例
   * @param initialPosition 蛇的初始位置
   * @param initialDirection 蛇的初始移动方向
   */
  constructor(initialPosition: Point = new Point(10, 10), initialDirection: Direction = Direction.RIGHT) {
    this.body = [initialPosition];
    this.direction = initialDirection;
    this.nextDirection = initialDirection;
    this.isGrowing = false;
    // 初始化为3节身体
    this.grow();
    this.grow();
  }

  /**
   * 获取蛇的头部位置
   */
  get head(): Point {
    return this.body[0];
  }

  /**
   * 获取蛇的身体部分
   */
  getBody(): Point[] {
    return [...this.body];
  }

  /**
   * 设置蛇的移动方向
   */
  setDirection(newDirection: Direction): void {
    // 防止180度转向（不能直接掉头）
    if (
      (this.direction === Direction.UP && newDirection !== Direction.DOWN) ||
      (this.direction === Direction.DOWN && newDirection !== Direction.UP) ||
      (this.direction === Direction.LEFT && newDirection !== Direction.RIGHT) ||
      (this.direction === Direction.RIGHT && newDirection !== Direction.LEFT)
    ) {
      this.nextDirection = newDirection;
    }
  }

  /**
   * 移动蛇
   */
  // 优化move方法，确保每次移动都是整数格子
  move(): void {
    // 更新当前方向
    this.direction = this.nextDirection;
  
    // 创建新的头部 - 确保坐标始终为整数
    const newHead = this.head.clone();
    switch (this.direction) {
      case Direction.UP:
        newHead.y = Math.floor(newHead.y - 1); // 确保是整数
        break;
      case Direction.DOWN:
        newHead.y = Math.floor(newHead.y + 1);
        break;
      case Direction.LEFT:
        newHead.x = Math.floor(newHead.x - 1);
        break;
      case Direction.RIGHT:
        newHead.x = Math.floor(newHead.x + 1);
        break;
    }
  
    // 将新头部添加到身体前面
    this.body.unshift(newHead);
  
    // 如果不是在增长，则移除尾部
    if (!this.isGrowing) {
      this.body.pop();
    } else {
      this.isGrowing = false;
    }
  }

  /**
   * 使蛇增长一节
   */
  grow(): void {
    this.isGrowing = true;
  }

  /**
   * 检查蛇是否撞到了自己
   */
  isCollidingWithSelf(): boolean {
    const head = this.head;
    // 从第二个身体部分开始检查
    for (let i = 1; i < this.body.length; i++) {
      if (head.equals(this.body[i])) {
        return true;
      }
    }
    return false;
  }
}