module egret3d {

     /**
     * @language zh_CN
     * @class egret3d.DistanceFog
     * @classdesc
     * DistanceFog 类 表示远景雾。 
     * @version Egret 3.0
     * @platform Web,Native
     * 
     */
    export class DistanceFog extends EffectMethod {

        private _fogColor: number = 0xffffffff ;
        private _globalDensity: number = 1 ;
        //private _startDistance: Point = new Point(200, 1000);
        //private _height: Point = new Point(200,3000) ;
        private _startDistance:number = 500;
        private _distanceScale:number = 0.1;
        private _height: number = 500;
        private _heightScale: number = 0.1;
        private _data: Float32Array;

        /**
        * @language zh_CN
        * 创建一个新的 DistanceFog 对象。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.fsMethodName = "distanceFog_fragment";
            this._data = new Float32Array(8);

            this.fogColor = this._fogColor;
            this.globalDensity = this._globalDensity;
        }

        /**
        * @language zh_CN
        * 设置雾颜色。
        * @version Egret 3.0
        * @platform Web,Native
        * @param value{Number}
        */
        public set fogColor(value: number) {
            this._fogColor = value;
            this._data[0] = (value >> 16 & 0xff) / 255;
            this._data[1] = (value >> 8 & 0xff) / 255;
            this._data[2] = (value & 0xff) / 255;
        }
        /**
        * @language zh_CN
        * 获取雾颜色。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Number} 
        */
        public get fogColor(): number {
            return this._fogColor; 
        }

        /**
        * @language zh_CN
        * 设置雾的全局密度。
        * @version Egret 3.0
        * @platform Web,Native
        * @param value{Number}
        */
        public set globalDensity(value: number) {
            this._globalDensity = value; 
            this._data[3] = value;
        }

        /**
        * @language zh_CN
        * 获取雾的全局密度。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Number} 
        */
        public get globalDensity(): number {
            return this._globalDensity;
        }

        /**
        * @language zh_CN
        * 设置雾的开始距离。
        * @version Egret 3.0
        * @platform Web,Native
        * @param value{Number}
        */
        public set startDistance(value: number) {
            this._startDistance = value; 
            this._data[4] = value;
        }

        /**
        * @language zh_CN
        * 获取雾的开始距离。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Number} 
        */
        public get startDistance(): number {
            return this._startDistance;
        }

        /**
        * @language zh_CN
        * 设置雾的缩放距离。
        * @version Egret 3.0
        * @platform Web,Native
        * @param value{Number}
        */
        public set distanceScale(value: number) {
            this._distanceScale = value;
            this._data[5] = value;
        }
        /**
        * @language zh_CN
        * 获取雾的缩放距离。
        * @version Egret 3.0
        * @platform Web,Native
        * @returns {Number} 
        */
        public get distanceScale(): number {
            return this._distanceScale;
        }

        /**
         * @private
         * @language zh_CN
         * 激活特效
         * @version Egret 3.0
         * @platform Web,Native
         * @param context3D {Context3D}
         * @param usage {MethodUsageData}
         * @param materialData {MaterialData}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public activateEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            this.context3D = context3D;
            usage["uniform_globalFog"] = context3D.getUniformLocation(usage.program3D, "uniform_globalFog");
        }

        /**
         * @private
         * @language zh_CN
         * 更新特效
         * @param context3D {Context3D}
         * @param usage {MethodUsageData}
         * @param materialData {MaterialData}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         */
        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            context3D.gl.uniform1fv(usage["uniform_globalFog"], this._data);
        }

        /**
         * @private
         * @language zh_CN
         * 销毁
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dispose() {
        }
    }
} 