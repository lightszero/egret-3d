module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Point
     * @classdesc
     * Point 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Point {
        /**
         * @language en_US
	     * The horizontal coordinate of the point. The default value is 0.
	     */
        /**
         * @language zh_CN
	     * x坐标
	     */
        public x: number;

        /**
         * @language en_US
         * The vertical coordinate of the point. The default value is 0.
         */
        /**
         * @language zh_CN
	     * y坐标
	     */
        public y: number;

        /**
         * @language en_US
         * The length of the line segment from(0,0) to this point.
         * @returns length
         */
        /**
         * @language zh_CN
         * 返回从(0, 0)到(x, y)的距离
         * @returns 当前2维向量的长度
         */
        public get length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
         * @language en_US
         * Creates a new point. If you pass no parameters to this method, a point is
         * created at(0,0).
         *
         * @param x The horizontal coordinate.
         * @param y The vertical coordinate.
         */
        /**
         * @language zh_CN
         * 创建一个Point实例
         * @param x
         * @param y
         */
        constructor(x: number = 0, y: number = 0) {
            this.x = x;
            this.y = y;
        }

        /**
         * @language en_US
         * Adds the coordinates of another point to the coordinates of this point to
         * create a new point.
         *
         * @param v The point to be added.
         * @returns The new point.
         */
        /**
         * @language zh_CN
         * 当前Point加上v Point，结果返回新的实例
         * @param v
         */
        public add(v: Point): Point {
            return new Point(this.x + v.x, this.y + v.y);
        }

        /**
         * @language en_US
         * Creates a copy of this Point object.
         *
         * @returns The new Point object.
         */
        /**
         * @language zh_CN
         * 克隆Point
         * @param 返回克隆后的Point
         */
        public clone(): Point {
            return new Point(this.x, this.y);
        }

        /**
         * @language zh_CN
         * 复制源Point的值
         * @param sourcePoint
         */
        public copyFrom(sourcePoint: Point) {
            this.x = sourcePoint.x;
            this.y = sourcePoint.y;
        }

        /**
         * @language en_US
         * Determines whether two points are equal. Two points are equal if they have
         * the same <i>x</i> and <i>y</i> values.
         *
         * @param toCompare The point to be compared.
         * @returns A value of <code>true</code> if the object is equal to this Point
         *         object; <code>false</code> if it is not equal.
         */
        /**
         * @language zh_CN
         * 比较两个Point是否全等
         * @param toCompare 被比较的Point
         */
        public equals(toCompare: Point): boolean {
            return (this.x == toCompare.x && this.y == toCompare.y);
        }

        /**
         * @language en_US
         * Scales the line segment between(0,0) and the current point to a set
         * length.
         *
         * @param thickness The scaling value. For example, if the current point is
         *                 (0,5), and you normalize it to 1, the point returned is
         *                  at(0,1).
         */
        /**
         * @language zh_CN
         * 当前Point标准化
         * @param thickness 使当前Point的长度为thickness 原点(0, 0)到(x, y)的距离
         */
        public normalize(thickness: number = 1) {
            if (this.length != 0) {
                var invLength = thickness / this.length;
                this.x *= invLength;
                this.y *= invLength;
                return;
            }
            throw "Cannot divide by zero length.";
        }

        /**
         * @language en_US
         * Offsets the Point object by the specified amount. The value of
         * <code>dx</code> is added to the original value of <i>x</i> to create the
         * new <i>x</i> value. The value of <code>dy</code> is added to the original
         * value of <i>y</i> to create the new <i>y</i> value.
         *
         * @param dx The amount by which to offset the horizontal coordinate,
         *           <i>x</i>.
         * @param dy The amount by which to offset the vertical coordinate, <i>y</i>.
         */
        /**
         * @language zh_CN
         * 当前Point偏移位置
         * @param dx 偏移的x坐标
         * @param dx 偏移的y坐标
         */
        public offset(dx: number, dy: number) {
            this.x += dx;
            this.y += dy;
        }

        /**
         * @language en_US
         * Subtracts the coordinates of another point from the coordinates of this
         * point to create a new point.
         *
         * @param v The point to be subtracted.
         * @returns The new point.
         */
        /**
         * @language zh_CN
         * 当前Point减去v Point,结果返回一个新实例
         * @param v 
         * @returns 结果返回
         */
        public subtract(v: Point): Point {
            return new Point(this.x - v.x, this.y - v.y);
        }

        /**
         * @language en_US
         * Returns a string that contains the values of the <i>x</i> and <i>y</i>
         * coordinates. The string has the form <code>"(x=<i>x</i>,
         * y=<i>y</i>)"</code>, so calling the <code>toString()</code> method for a
         * point at 23,17 would return <code>"(x=23, y=17)"</code>.
         *
         * @returns The string representation of the coordinates.
         */
        /**
        * @language zh_CN
        * 当前Point以字符串形式返回
        * @returns string
        */
        public toString(): string {
            return "[Point] (x=" + this.x + ", y=" + this.y + ")";
        }

        /**
         * @language en_US
         * Returns the distance between <code>pt1</code> and <code>pt2</code>.
         *
         * @param pt1 The first point.
         * @param pt2 The second point.
         * @returns The distance between the first and second points.
         */
        /**
        * @language zh_CN
        * 计算两个Point之间的距离
        * @returns 返回两个Point之间的距离
        */
        public static distance(pt1: Point, pt2: Point): number {
            var dx: number = pt2.x - pt1.x;
            var dy: number = pt2.y - pt1.y;

            return Math.sqrt(dx * dx + dy * dy);
        }
    }


}
 