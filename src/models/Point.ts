/**
 * 表示游戏中的坐标点
 */
export class Point {
  constructor(public x: number, public y: number) {}

  /**
   * 检查两个点是否相等
   */
  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * 创建一个点的副本
   */
  clone(): Point {
    return new Point(this.x, this.y);
  }
}