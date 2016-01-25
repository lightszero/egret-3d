module egret3d {
                
    /**
    * @class egret3d.Mesh
    * @classdesc
    * 3d模型网格 生成渲染模型
    * 创建一个Mesh网格数据和材质数据是必需的，如果是动态模型就加上动画数据
    * 继承Object3D对象，场景中实体渲染对象
    *
    * @see egret3d.Object3D
    * @see egret3d.GeometryBase
    * @see egret3d.MaterialBase
    * @see egret3d.IAnimation
    *
    * 示例:
    * @includeExample core/node/Mesh.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Mesh extends Object3D {
                
        /**
        * @language zh_CN
        * 构建一个Mesh对象
        * @param geometry 模型数据
        * @param material 模型材质
        * @param animation 模型动画
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(geometry: GeometryBase, material: MaterialBase, animation: IAnimation = null) {
            super();

            this.geometry = geometry;
            this.material = material;
            this.animation = animation;
            this.box.fillBox(this.geometry.minPos, this.geometry.maxPos);
        }
                        
        /**
        * @language zh_CN
        * 克隆一个模型
        * @returns 克隆后的模型
        * @version Egret 3.0
        * @platform Web,Native
        */
        public clone(): Mesh {
            return new Mesh(this.geometry, this.material, this.animation ? this.animation.clone() : null );
        }
                                
        /**
        * @language zh_CN
        * 当前对象数据更新，只有在视锥内的对象才会执行此更新
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(camera: Camera3D, time: number, delay: number) {

            if (this.isDisable)
                return;

            if (this.animation) {
                this.animation.updata(time, delay);
            }
        }
    }
} 