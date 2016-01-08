module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.Orientation3D
     * @classdesc
     * 定义 Orientation3D 常量
     * Matrix4_4.decompose 会分 axisAngle、eulerAngles、quaternion这3种类型进行分解
     * 比如: matrix.decompose(Orientation3D.QUATERNION)
     *
     * @see egret3d.geom.Matrix4_4
     * @see egret3d.geom.Quaternion
     *
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class Orientation3D {

        /**
        * @language zh_CN
        * 按轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static AXIS_ANGLE: string = "axisAngle";

        /**
        * @language zh_CN
        * 按欧拉角旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static EULER_ANGLES: string = "eulerAngles";

        /**
        * @language zh_CN
        * 四元数旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static QUATERNION: string = "quaternion";
    }
} 