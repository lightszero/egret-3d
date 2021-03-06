﻿module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Plane3D
     * @classdesc
     * Plane3D 类 3D空间中的平面表示数据
     * 由a,b,c,d4个分量组成 在三维空间中定义了一个平面 Ax + By + Cz + D = 0
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Plane3D {
        /**
         * @language en_US
	     * The A coefficient of this plane. (Also the x dimension of the plane normal)
	     */
        /**
         * @language zh_CN
	     * 平面中的a分量
	     */
        public a: number;

        /**
         * @language en_US
         * The B coefficient of this plane. (Also the y dimension of the plane normal)
         */
        /**
         * @language zh_CN
	     * 平面中的b分量
	     */
        public b: number;

        /**
         * @language en_US
         * The C coefficient of this plane. (Also the z dimension of the plane normal)
         */
        /**
         * @language zh_CN
	     * 平面中的c分量
	     */
        public c: number;

        /**
         * @language en_US
         * The D coefficient of this plane. (Also the inverse dot product between normal and point)
         */
        /**
         * @language zh_CN
	     * 平面中的d分量
	     */
        public d: number;
        
        // indicates the alignment of the plane
        /**
         * @private
	     */
        public static ALIGN_ANY: number = 0;

        /**
         * @private
	     */
        public static ALIGN_XY_AXIS: number = 1;
        
        /**
         * @private
	     */
        public static ALIGN_YZ_AXIS: number = 2;
        
        /**
         * @private
	     */
        public static ALIGN_XZ_AXIS: number = 3;

        /**
         * @language en_US
         * Create a Plane3D with ABCD coefficients
         */
        /**
         * @language zh_CN
	     * 创建一个平面实例
         * @param a
         * @param b
         * @param c
         * @param d
	     */
        constructor(a: number = 0, b: number = 0, c: number = 0, d: number = 0) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
        }

        /**
         * @language zh_CN
	     * 填充平面的各分量的值
         * @param a
         * @param b
         * @param c
         * @param d
	     */
        public setTo(a: number = 0, b: number = 0, c: number = 0, d: number = 0) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
        }

        /**
         * @language en_US
         * Fills this Plane3D with the coefficients from 3 points in 3d space.
         * @param p0 Vector3D
         * @param p1 Vector3D
         * @param p2 Vector3D
         */
        
        /**
         * @language zh_CN
	     * 由3个坐标来创建一个3d平面
         * @param p0 Vector3D
         * @param p1 Vector3D
         * @param p2 Vector3D
	     */
        public fromPoints(p0: Vector3D, p1: Vector3D, p2: Vector3D) {
            var d1x: number = p1.x - p0.x;
            var d1y: number = p1.y - p0.y;
            var d1z: number = p1.z - p0.z;

            var d2x: number = p2.x - p0.x;
            var d2y: number = p2.y - p0.y;
            var d2z: number = p2.z - p0.z;

            this.a = d1y * d2z - d1z * d2y;
            this.b = d1z * d2x - d1x * d2z;
            this.c = d1x * d2y - d1y * d2x;
            this.d = -(this.a * p0.x + this.b * p0.y + this.c * p0.z);
        }

        /**
         * @language en_US
         * Fills this Plane3D with the coefficients from the plane's normal and a point in 3d space.
         * @param normal Vector3D
         * @param point  Vector3D
         */
        /**
         * @language zh_CN
         * 由一条normal向量和一个坐标创建一个3d平面
         * @param normal Vector3D
         * @param point  Vector3D
         */
        public fromNormalAndPoint(normal: Vector3D, point: Vector3D) {
            this.a = normal.x;
            this.b = normal.y;
            this.c = normal.z;
            this.d = -(this.a * point.x + this.b * point.y + this.c * point.z);
        }

        /**
         * @language en_US
         * Normalize this Plane3D
         * @returns Plane3D This Plane3D.
         */
        /**
         * @language zh_CN
         * 单位化3d平面
         * @returns 返回平面长度
         */
        public normalize(): number {
            var len: number = Math.sqrt(this.a * this.a + this.b * this.b + this.c * this.c);
            if (len > 0.0) {
                var invLength: number = 1.0 / len;
                this.a *= invLength;
                this.b *= invLength;
                this.c *= invLength;
                this.d *= invLength;
            }
            
            return len;
        }

        /**
         * @language en_US
         * Returns the signed distance between this Plane3D and the point p.
         * @param p Vector3D
         * @returns Number
         */
        /**
         * @language zh_CN
         * 计算3d平面到点p的距离
         * @param p Vector3D
         * @returns 返回计算后的距离
         */
        public distance(p: Vector3D): number {
            return this.a * p.x + this.b * p.y + this.c * p.z + this.d;
        }

        /**
         * @language en_US
         * Classify a point against this Plane3D. (in front, back or intersecting)
         * @param p Vector3D
         * @param epsilon
         * @returns PlaneClassification.FRONT在平面正面 
         * PlaneClassification.BACK在平面背面面 
         * PlaneClassification.INTERSECT在平面上
         */
        /**
         * @language zh_CN
         * 计算3d平面和点p的空间关系
         * @param p Vector3D
         * @param epsilon 相对偏移值
         * @returns int Plane3.FRONT or Plane3D.BACK or Plane3D.INTERSECT
         */
        public classifyPoint(p: Vector3D, epsilon: number = 0.01): number {

            var dis: number = this.distance(p);

            if (dis < -epsilon) {
                return PlaneClassification.BACK;
            }
            else if (dis > epsilon) {
                return PlaneClassification.FRONT;
            }

            return PlaneClassification.INTERSECT;
        }
        
        /**
         * @language zh_CN
         * 当前Plane3D以字符串形式返回
         * @returns string
         */
        public toString(): string {
            return "Plane3D [a:" + this.a + ", b:" + this.b + ", c:" + this.c + ", d:" + this.d + "]";
        }
    }
} 