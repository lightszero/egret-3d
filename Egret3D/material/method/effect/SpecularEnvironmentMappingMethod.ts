﻿module egret3d {
     /**
     * @language zh_CN
     * @class egret3d.EnvironmentMappingMethod
     * @classdesc
     * 
     * 环境贴图方法 通过材质球的 Specular 贴图纹理强度作为 反射强度值
     * @version Egret 3.0
     * @platform Web,Native
     */
    export class SpecularEnvironmentMappingMethod extends EffectMethod {

        private texture: TextureBase; 

        private reflectValue: number = 1.0;
        /**
        * @language zh_CN
        * 创建一个新的 EnvironmentMappingMethod 对象。
        * @param texture {TextureBase}
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(texture: TextureBase) {
            super();
            this.fsMethodName = "SpecularEnvironmentMappingMethod";
            this.lightTexture = texture; 
        }

        /**
        * @language zh_CN
        * 设置反射值。
        * @private
        * @param value{Number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set reflect(value: number) {
            this.reflectValue = value; 
        }

        /**
        * @language zh_CN
        * 获取反射值。
        * @private
        * @returns {Number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get reflect(): number {
            return this.reflectValue;
        }

        /**
         * @language zh_CN
         * 设置材质信息。
        * @private
         * @param materialData {MaterialData}
         * @param usage {MethodUsageData}
        * @version Egret 3.0
        * @platform Web,Native
         */
        public setMaterialData(materialData: MaterialData, usage: MethodUsageData) {
            this.usage = usage;
            this.materialData = materialData;

            if (this.texture)
                this.materialData.environmentMapTex = this.texture;
            else
                this.materialData.environmentMapTex = CheckerboardTexture.texture;
        }

        /**
         * @language zh_CN
         * 设置贴图。
         *  设置环境光照的贴图，必须为cube纹理贴图
         * @param texture {TextureBase}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public set lightTexture(texture: TextureBase) {
            this.texture = texture; 
            if (texture) {
                if (this.materialData) {
                    this.materialData.environmentMapTex = texture;
                    this.materialData.textureChange = true;
                }
            }
        }

        /**
         * @private
         * @language zh_CN
         * 激活特效
         * @param context3D {Context3D}
         * @param usage {MethodUsageData}
         * @param materialData {MaterialData}
         * @param modeltransform {Matrix4_4}
         * @param camera3D {Camera3D}
         * @param geometry {GeometryBase}
         * @param animation {IAnimation}
         * @version Egret 3.0
         * @platform Web,Native
         */
        public activateEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
            this.context3D = context3D;
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
         * @version Egret 3.0
         * @platform Web,Native
         */
        public updataEffect(context3D: Context3D, usage: MethodUsageData, materialData: MaterialData, modeltransform: Matrix4_4, camera3D: Camera3D, geometry: GeometryBase, animation: IAnimation) {
        }


        /**
         * @private
         * @language zh_CN
         * 销毁
         * 进行相关的 贴图纹理资源回收
         * @version Egret 3.0
         * @platform Web,Native
         */
        public dispose() {
        }
    }
} 