module egret3d {

    /**
    * @class egret3d.Object3D
    * @classdesc
    * 拣选类型，拣选时可以分为，包围盒拣选、模型拣选返回模型拣选到的位置、模型拣选返回模型拣选到的UV坐标
    * 这几种拣选方式
    * 设置鼠标拣选的类型，鼠标拣选不同的类型有不同的效果作用，还有性能
    * 需要的拣选精度越高，性能要求就越高，反之亦然
    *
    * @see egret3d.Picker
    * @version Egret 3.0
    * @platform Web,Native
    */
    export enum PickType {
        
        /**
        * 包围盒拣选
        */
        BoundPick,
                
        /**
        * 模型拣选返回模型拣选到的位置
        */
        PositionPick,
                        
        /**
        * 模型拣选返回模型拣选到的UV坐标
        */
        UVPick
    };
    /**
    * @class egret3d.Object3D
    * @classdesc
    * 3d空间中的实体对象。
    * 场景图中的Object3D对象是一个树型结构，对象中包含了变换信息.
    * 这些变换信息应用于所有的子对象,子对象也有自己的变换信息,最终
    * 的变换信息要结合父对象的变换信息
    * 每个Object3D对象在生成时会创建一个包围盒
    * 
    * @see egret3d.Vector3D
    * @see egret3d.Matrix4_4
    * @see egret3d.Quaternion
    * @see egret3d.CubeBoxBound
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class Object3D extends EventDispatcher {

       /**
        * @private
        * @language zh_CN
        * 当前对象名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public static renderListChange: boolean = true;
        protected static s_id: number = 0;

        protected _modeMatrix3D: Matrix4_4 = new Matrix4_4();

        protected _transformChange: boolean = true;

        protected _pos: Vector3D = new Vector3D();
        protected _rot: Vector3D = new Vector3D();
        protected _sca: Vector3D = new Vector3D(1, 1, 1);
        protected _orientation = new Quaternion();
        protected _axis: Vector3D = new Vector3D();
        protected _angle: number = 0;

        protected _globalPos: Vector3D = new Vector3D();
        protected _globalRot: Vector3D = new Vector3D();
        protected _globalSca: Vector3D = new Vector3D(1, 1, 1);
        protected _globalOrientation = new Quaternion();

        protected _qut: Quaternion = new Quaternion();
        protected _active: boolean = false;
        protected _mat: Matrix4_4 = new Matrix4_4();

        /**
        * @language zh_CN
        * 当前对象名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string;

        /**
        * @language zh_CN
        * 当前对象id
        * @version Egret 3.0
        * @platform Web,Native
        */
        public id: number;

        /**
        * @language zh_CN
        * 渲染层级 。</p>
        * 渲染时分组进行依次渲染 前16位表示tag,后16位表示layer。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public layer: number = 0x00000000;

        /**
        * @language zh_CN
        * 渲染层级分类标签
        * @version Egret 3.0
        * @platform Web,Native
        */
        public tag: Tag; 

        /**
        * @language zh_CN
        * 是否开启鼠标事件。</p>
        * 设定这个物件是否具有 鼠标交互能力的开关。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public mouseEnable: boolean = false;

        /**
        * @language zh_CN
        * 是否需要视锥体裁剪。</p>
        * 设定这个物件是否具有 视锥体裁剪功能，为否的话，将永远不参加场景渲染剔除树，无论是否在显示范围内都会进行相关的渲染逻辑运算。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public enableCut: boolean = true;
        
        /**
        * @language zh_CN
        * 父亲节点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public parent: Object3D = null;
        
        /**
        * @language zh_CN
        * 子对象列表。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public childs: Array<Object3D> = new Array<Object3D>();

        /**
        * @language zh_CN
        * 动作对象，控制骨骼动画。</p>
        * 可拓展的动画功能属性，动画功能的驱动类总接口。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public animation: IAnimation = null;

        /**
        * @language zh_CN
        * 网格信息。</p>
         * geometry 为渲染对象的网格信息 ，渲染对象需要 vertexBuffer  和 indexBuffer 信息 及顶点着色器shade。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public geometry: GeometryBase = null;

        /**
        * @language zh_CN
        * 材质信息。</p>
         * 赋予对象节点可供渲染的材质球属性，让对象加入可渲染实体列表，及渲染对象与对象之间的混合，排序。</p>
         * @version Egret 3.0
        * @platform Web,Native
        */
        public material: MaterialBase = null;

        /**
        * @language zh_CN
        * 对象模型包围盒。</p>
        * 每个场景物件都需要有的 包围盒子，可以自定义包围盒形状大小，也可以根据模型本身生成。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public box: CubeBoxBound = new CubeBoxBound();

        /**
        * @language zh_CN
        * 鼠标检测数据
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pickerData: PickResult = new PickResult();

        /**
        * @language zh_CN
        * 是否控制，当摄像机被绑定摄像机动画时，这个值为false.
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isController: boolean = true;

        /**
        * @language zh_CN
        * 是否可见。</p>
        * 设置渲染是否显示的快速通道，在渲染列表中，但是不进行渲染，但是进行逻辑运算。</p>
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isVisible: boolean = true;

        /**
        * @language zh_CN
        * 是否关闭
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isDisable: boolean = false;

        /**
        * @language zh_CN
        * 鼠标拣选类型。</p>
        * 设置鼠标的拣选类型，可通过 PickType来进行设置。</p>
        * 快速拣选默认使用 正方形包围盒子。</p>
        * 高精度型需要 PositionPick ， uv pick 等。</p>
        * @see egret3d.PickType
        * @version Egret 3.0
        * @platform Web,Native
        */
        public pickType: PickType = PickType.BoundPick;

        /**
        * @language zh_CN
        * 如果直接实例化这个类，就会生成一个空的3D容器，可以往里添加3D显示对象，作为对象的父级，但是本身没有渲染属性。
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor() {
            super();
            this.id = ++Object3D.s_id;
        }

        /**
        * @language zh_CN
        * 返回位移。</p>
        * 获取容器的坐标位置，基于父节点的位置坐标。</p>
        * @returns 位移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get position(): Vector3D {
            return this._pos;
        }

        /**
        * @language zh_CN
        * 设置位移。</p>
        * 设置基于父节点的位置坐标，当父容器发生变化时，子节点也会变化。</p>
        * @param vec 位移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set position(vec: Vector3D) {
            this.updateTransformChange(true);
            this._pos.copyFrom(vec);
        }
        
        /**
        * @language zh_CN
        * 返回旋转。</p>
        * 获取容器的旋转信息，基于父节点的旋转信息 欧拉角信息。</p>
        * @returns 旋转 欧拉角信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotation(): Vector3D {
            return this._rot;
        }

        /**
        * @language zh_CN
        * 设置旋转 。</p>
        * 设置基于父节点的旋转信息 欧拉角信息，当父容器发生变化时，子节点也会变化。</p>
        * @param vec 旋转 欧拉角信息
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotation(value: Vector3D) {
            this._rot.x = value.x;
            this._rot.y = value.y;
            this._rot.z = value.z;

            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this._angle = this._orientation.toAxisAngle(this._axis);
            this.updateTransformChange(true);
        }

        /**
        * @language zh_CN
        * 设置旋转。</p>
        * 设置旋转 基于四元素 旋转信息，当父容器发生变化时，子节点也会变化。</p>
        * @param value 旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set orientation(value: Quaternion) {
            this._orientation.copyFrom(value);
            this._orientation.toEulerAngles(this._rot);
            this._angle = this._orientation.toAxisAngle(this._axis);

            this.updateTransformChange(true);
        }
        
        /**
        * @language zh_CN
        * 返回旋转。</p>
        * 返回 基于四元素的旋转信息。</p>
        * @returns 旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get orientation(): Quaternion {
            return this._orientation;
        }

        /**
        * @language zh_CN
        * 返回缩放。</p>
        * 返回基于父容器的缩放信息。</p>
        * @returns 缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scale(): Vector3D {
            return this._sca;
        }

        /**
        * @language zh_CN
        * 设置缩放。</p>
        * 设置基于父容器的缩放信息，当父容器发生变化时，子节点也会变化。</p>
        * @param vec 缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scale(val: Vector3D) {
            this.updateTransformChange(true);
            this._sca = val;
        }

        /**
        * @language zh_CN
        * 设置x坐标。</p>
        * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set x(value: number) {
            this.updateTransformChange(true);

            if (this._pos.x == value)
                return;

            this._pos.x = value;
        }
        
        /**
        * @language zh_CN
        * 设置y坐标。</p>
        * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set y(value: number) {
            this.updateTransformChange(true);

            if (this._pos.y == value)
                return;

            this._pos.y = value;
        }
        
        /**
        * @language zh_CN
        * 设置z坐标。</p>
        * 设置基于父容器的位置信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value z坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set z(value: number) {
            this.updateTransformChange(true);

            if (this._pos.z == value)
                return;

            this._pos.z = value;
        }
                
        /**
        * @language zh_CN
        * 设置x轴旋转。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value x轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationX(value: number) {
            this.updateTransformChange(true);

            if (this._rot.x == value)
                return;

            this._rot.x = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this._angle = this._orientation.toAxisAngle(this._axis);
        }
                        
        /**
        * @language zh_CN
        * 设置y轴旋转。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value y轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationY(value: number) {
            this.updateTransformChange(true);

            if (this._rot.y == value)
                return;

            this._rot.y = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this._angle = this._orientation.toAxisAngle(this._axis);
        }
                        
        /**
        * @language zh_CN
        * 设置z轴旋转。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变。</p>
        * @param value z轴旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationZ(value: number) {
            this.updateTransformChange(true);

            if (this._rot.z == value)
                return;

            this._rot.z = value;
            this._orientation.fromEulerAngles(this._rot.x, this._rot.y, this._rot.z);
            this._angle = this._orientation.toAxisAngle(this._axis);
        }
                                
        /**
        * @language zh_CN
        * 设置x轴缩放。</p>
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
        * @param value x轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scaleX(value: number) {
            this.updateTransformChange(true);

            if (this._sca.x == value)
                return;

            this._sca.x = value;
        }
                                        
        /**
        * @language zh_CN
        * 设置y轴缩放
        *  
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
        * @param value y轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scaleY(value: number) {
            this.updateTransformChange(true);

            if (this._sca.y == value)
                return;

            this._sca.y = value;
        }
                                        
        /**
        * @language zh_CN
        * 设置z轴缩放
        *  
        * 设置基于父容器的旋转信息，当父容器发生变化时，子节点也会变化，值不变
        * @param value z轴缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scaleZ(value: number) {
            this.updateTransformChange(true);

            if (this._sca.z == value)
                return;

            this._sca.z = value;
        }
                                                
        /**
        * @language zh_CN
        * 以axis轴为中心进行旋转
        * 设置基于父容器的旋转信息，数值通过axis的角度进行设置。当父容器发生变化时，子节点也会变化，值不变
        * @param axis 中心轴
        * @param angle 旋转的角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setRotationFromAxisAngle(axis: Vector3D, angle: number) {
            axis.normalize();
            this.updateTransformChange(true);
            this._orientation.fromAxisAngle(axis, angle);
            this._orientation.toEulerAngles(this._rot);
            this._axis.copyFrom(axis);
            this._angle = angle;
        }

        /**
        * @language zh_CN
        * 返回x坐标
        * 返回基于父容器的位置坐标信息值
        * @returns x坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get x(): number {
            return this._pos.x;
        }
        
        /**
        * @language zh_CN
        * 返回y坐标
        *  
        * 返回基于父容器的位置坐标信息值
        * @returns y坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get y(): number {
            return this._pos.y;
        }
        
        /**
        * @language zh_CN
        * 返回z坐标
        *  
        * 返回基于父容器的位置坐标信息值
        * @returns z坐标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get z(): number {
            return this._pos.z
        }
        
        /**
        * @language zh_CN
        * 返回x旋转
        *  
        * 返回基于父容器的位置旋转信息值
        * @returns x旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationX(): number {
            return this._rot.x;
        }
        
        /**
        * @language zh_CN
        * 返回y旋转
        *  
        * 返回基于父容器的位置旋转信息值
        * @returns y旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationY(): number {
            return this._rot.y;
        }
                
        /**
        * @language zh_CN
        * 返回z旋转
        *  
        * 返回基于父容器的位置旋转信息值
        * @returns z旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get rotationZ(): number {
            return this._rot.z;
        }
                        
        /**
        * @language zh_CN
        * 返回x缩放
        * 返回基于父容器的缩放信息值
        * @returns x缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scaleX(): number {
            return this._sca.x;
        }
                                
        /**
        * @language zh_CN
        * 返回y缩放
        * 返回基于父容器的缩放信息值
        * @returns y缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scaleY(): number {
            return this._sca.y;
        }
                                
        /**
        * @language zh_CN
        * 返回z缩放
        * 返回基于父容器的缩放信息值
        * @returns z缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scaleZ(): number {
            return this._sca.z;
        }
                                        
        /**
        * @language zh_CN
        * 返回 object 世界渲染矩阵
        * 如果有父亲节点对象的话，要乘以父对象的变换.
        * @returns object 世界渲染矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get modelMatrix(): Matrix4_4 {
            if (this._transformChange) {
                this.updateModleMatrix();
            }
            return this._modeMatrix3D;
        }

        /**
        * @language zh_CN
        * 返回 object 世界渲染矩阵
        * 如果有父亲节点对象的话，要乘以父对象的变换.
        * @private
        * @returns object 世界渲染矩阵
        * @version Egret 3.0
        * @platform Web,Native
        */
        protected updateModleMatrix() {
            
            if (this.parent != null) {
                var parentOrientation: Quaternion = this.parent.globalOrientation;

                this._globalOrientation.multiply(parentOrientation, this._orientation);
                this._globalOrientation.toEulerAngles(this._globalRot);

                var parentScale: Vector3D = this.parent.globalScale;

                this._globalSca.copyFrom(parentScale.multiply(this._sca));

                parentOrientation.rotatePoint(parentScale.multiply(this._pos), this._globalPos);
                this._globalPos.copyFrom(this._globalPos.add(this.parent.globalPosition));
            }
            else {
                this._globalOrientation.copyFrom(this._orientation);
                this._globalPos.copyFrom(this._pos);
                this._globalSca.copyFrom(this._sca);
                this._globalRot.copyFrom(this._rot);
            }
            //this._modeMatrix3D.recompose([this._globalPos, this._globalRot, this._globalSca]);
            this._modeMatrix3D.makeTransform(this._globalPos, this._globalSca, this._globalOrientation);
            this.box.Transform = this._modeMatrix3D;
            this._transformChange = false;
            this.onUpdateTransform();
        }

        protected onUpdateTransform() {
        }
                                                
        /**
        * @language zh_CN
        * 返回 object 世界位置
        * 返回世界坐标系的 全局位置坐标
        * @returns object 世界位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalPosition(): Vector3D {
            if (this._transformChange) {
                this.modelMatrix;
            }
            return this._globalPos;
        }
                                                        
        /**
        * @language zh_CN
        * 返回 object 世界旋转
        * 返回世界坐标系的 全局旋转信息
        * @returns object 世界旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalRotation(): Vector3D {
            if (this._transformChange) {
                this.modelMatrix;
            }
            return this._globalRot;
        }
                                                        
        /**
        * @language zh_CN
        * 返回 object 世界缩放
        * 返回世界坐标系的 全局缩放信息
        * @returns object 世界缩放
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalScale(): Vector3D {
            if (this._transformChange) {
                this.modelMatrix;
            }
            return this._globalSca;
        }
                                                        
        /**
        * @language zh_CN
        * 返回 object 世界旋转
        * 返回世界坐标系的 全局旋转信息，数据类型是 四元素
        * @returns object 世界旋转
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get globalOrientation(): Quaternion {
            if (this._transformChange) {
                this.modelMatrix;
            }
            return this._globalOrientation;
        }

        /**
        * @language zh_CN
        * 增加一个子对象,并返回当前子对象
        * 在容器中添加子对象，如果有显示接口的，将会放到场景显示树种进行渲染逻辑运算，及渲染
        * @param child 增加的子对象
        * @returns 子对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChild(child: Object3D): Object3D {
            this.childs.push(child);
            Object3D.renderListChange = true;

            child.parent = this;

            child.updateTransformChange(true);
            return child;
        }
        
        /**
        * @language zh_CN
        * 增加一个子对象,并返回当前子对象
        * 在容器中添加子对象，如果有显示接口的，将会放到场景显示树种进行渲染逻辑运算，及渲染
        * @param child 增加的子对象
        * @param index 子对象的下标
        * @returns 子对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChildAt(child: Object3D, index: number): Object3D {
            if (index < 0) {
                this.childs.splice(0, 0, child);
            }
            else if (index >= this.childs.length) {
                this.childs.push(child);
            }
            else {
                this.childs.splice(index, 0, child);
            }

            child.parent = this;
            child.updateTransformChange(true);
            return child;
        }
                
        /**
        * @language zh_CN
        * 返回下标为index的子对象
        * @private
        * @param index 子对象下标
        * @returns 如果有就返回子对象,否则就返回null.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getChildAt(index: number): Object3D {

            if (index < 0 || index >= this.childs.length)
                return null;

            return this.childs[index];
        }
                        
        /**
        * @language zh_CN
        * @private
        * 返回子对角child的下标
        * @param child 子对象
        * @returns 如果有就返回子对象的下标,否则就返回-1.
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getChildIndex(child: Object3D): number {

            for (var index = 0; index < this.childs.length; ++index) {

                if (this.childs[index] != child) {
                    continue;
                }

                return index;
            }

            return -1;
        }
                                
        /**
        * @language zh_CN
        * 移除child子对象 并返回
        * 移除显示列表中的指定对象，如果为空将会返回
        * @param child 子对象
        * @returns 如果成功就返回child,否则返回null
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeChild(child: Object3D): Object3D {

            for (var index = 0; index < this.childs.length; ++index) {

                if (this.childs[index] != child) {
                    continue;
                }

                child.parent = null;

                this.childs.splice(index, 1);

                return child;
            }

            child.updateTransformChange(true);
            return null;
        }
                                        
        /**
        * @language zh_CN
        * 移除下标为index的子对象 并返回
        * @private
        * @param index 子对象的下标
        * @returns 如果成功就返回child,否则返回null
        * @version Egret 3.0
        * @platform Web,Native
        */
        public removeChildAt(index: number): Object3D {

            if (index < 0 || index >= this.childs.length)
                return null;

            var object3D: Object3D = this.childs[index];

            object3D.parent = null;

            this.childs.splice(index, 1);

            object3D.updateTransformChange(true);
            return object3D;
        }
                                                
        /**
        * @language zh_CN
        * 设置子对象的下标
        * @private
        * @param child 子对象
        * @param index 子对象的下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setChildIndex(child: Object3D, index: number) {

            for (var i = 0; i < this.childs.length; ++i) {

                if (this.childs[i] != child) {
                    continue;
                }

                if (i == index) {
                    return;
                }
                else if (index > i) {

                    for (var m = i; m > index; --m) {
                        this.childs[m] = this.childs[m - 1];
                    }
                }
                else if (index < i) {

                    for (var m = i; m < index; ++m) {
                        this.childs[m] = this.childs[m + 1];
                    }
                }

                this.childs[index] = child;

                return;
            }
        }
                                                        
        /**
        * @language zh_CN
        * @private
        * 交换子对象的位置
        * @param child1 子对象1
        * @param child2 子对象2
        * @version Egret 3.0
        * @platform Web,Native
        */
        public swapChildren(child1: Object3D, child2: Object3D) {

            var index1 = 0, index2 = 0;

            for (; index1 < this.childs.length; ++index1) {

                if (this.childs[index1] != child1) {
                    continue;
                }

                for (; index2 < this.childs.length; ++index2) {

                    if (this.childs[index2] != child2) {
                        continue;
                    }

                    var tmp: Object3D = this.childs[index1];

                    this.childs[index1] = this.childs[index2];

                    this.childs[index2] = tmp;

                    break;
                }

                return;
            }
        }
                                                                
        /**
        * @language zh_CN
        * @private
        * 交换子对象的位置
        * @param index1 子对象1下标
        * @param index2 子对象2下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public swapChildrenAt(index1: number, index2: number) {

            if (index1 < 0 || index1 >= this.childs.length)
                return;

            if (index2 < 0 || index2 >= this.childs.length)
                return;

            var tmp: Object3D = this.childs[index1];

            this.childs[index1] = this.childs[index2];

            this.childs[index2] = tmp;
        }
                                                                        
        /**
        * @language zh_CN
        * 当前对象对视位置
        * @private
        * @param pos 对象的位置
        * @param target 目标的位置
        * @param up 向上的方向
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lookAt(pos: Vector3D, target: Vector3D, up: Vector3D = Vector3D.Y_AXIS) {

        }

        /**
        * @language zh_CN
        * 返回目标的位置
        *  
        * @private
        * @returns 目标的位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get lookAtPosition(): Vector3D {
            return new Vector3D();
        }

        protected updateTransformChange(change: boolean) {
            this._transformChange = change;
            ///Octree.getInstance().checkObject3D(obj);
            for (var i: number = 0; i < this.childs.length; ++i) {
                this.childs[i].updateTransformChange(change);
            }
        }
        
        /**
        * @language zh_CN
        * 当前对象数据更新
        * @private
        * @param camera 当前渲染的摄相机
        * @param time 当前时间
        * @param delay 每帧时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(camera: Camera3D, time: number, delay: number) {

        }

        /**
        * @language zh_CN
        * 返回对象的屏幕坐标
        * 获取当前物体的屏幕坐标值，一般用来指定屏幕相关的ui绑定及其他功能
        * @param camera 对象渲染的摄像机
        * @returns 对象的屏幕坐标 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getScreenPosition(camera: Camera3D): Vector3D {
            this._mat.copyFrom(camera.viewProjectionMatrix);
            this._mat.append(this.modelMatrix);
            return this._mat.transformVector(this.globalPosition);
        }
        
        /**
        * @language zh_CN
        * 释放所有数据
        * 是否内存中的相关数据连接引用，移除逻辑运算，从主渲染刘表中挪出
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose() {
            if (this.parent)
                this.parent.removeChild(this);

            if (this.geometry) {
                this.geometry.dispose();
                this.geometry = null;
            }

            if (this.material) {
                this.material.dispose();
                this.material = null;
            }

            for (var i: number = 0; i < this.childs.length; i++) {
                this.childs[i].dispose();
            }
        }
    }
} 