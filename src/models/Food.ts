import { Point } from './Point';

/**
 * 表示游戏中的食物
 */
export class Food {
  private position: Point;

  /**
   * 创建一个新的食物实例
   * @param position 食物的位置
   */
  constructor(position: Point) {
    this.position = position;
  }

  /**
   * 获取食物的位置
   */
  getPosition(): Point {
    return this.position.clone();
  }

  /**
   * 设置食物的位置
   * @param position 新的位置
   */
  setPosition(position: Point): void {
    this.position = position.clone();
  }
}