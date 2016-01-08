module egret3d {
                        
    /**
     * @class egret3d.View3D
     * @classdesc
     * 渲染视图
     * view3D 是整个3D引擎的渲染视口，可以控制渲染窗口的大小，渲染的方式
     * 可以设置不同的相机 camera3D
     * 交换不同的场景元素 scene3D 
     * skyBox需要在这里直接设置，有cube sky 和 sphere sky
     * 整个渲染的主循环通过 render  
     * @see egret3d.camera3d
     * @see egret3d.scene3D
     * @version Egret 3.0
     * @platform Web,Native
     */   
    export class View3D {

        protected _context3D: Context3D;
        protected _camera: Camera3D;
        protected _scene: Scene3D; 
        protected _render: RenderBase;
        protected _shadowRender: ShadowRender;
        protected _width: number = 0;
        protected _height: number = 0;
        protected _x: number = 0;
        protected _y: number = 0;
        protected _localPos: Point = new Point();
        protected _globalPos: Point = new Point();
        protected _globalPosDirty: Boolean;
        protected _aspectRatio: number = 1;
        protected _scissorRect: Rectangle;
        protected _viewPort: Rectangle;
        protected _scissorRectDirty: Boolean = true;
        protected _viewportDirty: Boolean = true;
        protected _viewPortMatrix: Matrix4_4 = new Matrix4_4();
        protected _useShadow: boolean = false ;
        protected _backImg: HUD;
        protected _postCanvas: PostCanvas;
        protected _sky: Sky;
        protected _sphereSky: SphereSky;
        protected _postList: Array<PostEffectBase>;
        protected _isDeferred: boolean = false;
        protected _sourceFrameBuffer: FrameBuffer;
        protected _resizeFuncs: Array<Function> = new Array<Function>();
        protected _wireframeList: Array<WireframeBase> = new Array<WireframeBase>();
        protected _hudList: Array<HUD> = new Array<HUD>();

        private _mouseEventManager: Mouse3DManager;

        /**
        * @language zh_CN
        * 返回渲染根节点
        * 返回渲染场景的 scene3D 
        * @returns Object3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get root(): Object3D {
            return this._scene;
        }

        /**
        * @language zh_CN
        * 设置场景
        * 设置渲染场景的 scene3D ， 可以将整个渲染 列表替换，可作为游戏中切换游戏场景的主要接口
        * @param scene {Scene3D}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set scene(scene: Scene3D) {
            this._scene = scene; 
        }

        /**
        * @language zh_CN
        * 返回 Scene3D 对象
        * 返回 Scene3D 对象
        * @returns {Scene3D}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get scene(): Scene3D {
            return this._scene;
        }

        /**
        * @language zh_CN
        * 创建一个新的 View3D 对象。
        * @param viewPort {Rectangle} 显示区域
        * @param camera {Camera3D} 摄像机
        * @version Egret 3.0
        * @platform Web,Native
        */   
        constructor(viewPort: Rectangle, camera: Camera3D = null ) {

            this._context3D = Egret3DDrive.context3D;
            this._camera = camera || new Camera3D(CameraType.perspective);
            this._scissorRect = new Rectangle();
            this._viewPort = viewPort;

            this._scene = new Scene3D();

            this._render = RenderManager.getRender(RenderType.defaultRender);

            //this.requestFrameBuffer();

            this.x = viewPort.x;
            this.y = viewPort.y;
            this.width = viewPort.width;
            this.height = viewPort.height;

            window.addEventListener("resize", () => this.resize());

            this._mouseEventManager = new Mouse3DManager( this._camera );

        }

        private resize() {
            this.x = this.viewPort.x = 0 ;
            this.y = this.viewPort.y = 0 ;
            this.width = this.viewPort.width = window.innerWidth ;
            this.height = this.viewPort.height = window.innerHeight ;
            Egret3DDrive.canvas.width = this.viewPort.width;
            Egret3DDrive.canvas.height = this.viewPort.height;
            Egret3DDrive.canvasRectangle.x = this.x;
            Egret3DDrive.canvasRectangle.y = this.y;
            Egret3DDrive.canvasRectangle.width = this.width;
            Egret3DDrive.canvasRectangle.height = this.height;
            this.updateViewSizeData();

            for (var i: number = 0; i < this._resizeFuncs.length; ++i) {
                this._resizeFuncs[i]();
            }
        }

        /**
        * @language zh_CN
        * 设置渲染器
        * view3D 可以使用不同的渲染器，每个渲染器可以渲染不同的渲染通道使之直接在主屏幕中显示出来
        * @param val {RenderBase}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set render(val: RenderBase) {
            this._render = val; 
            if (typeof (val) === "GBufferRender") {
                this._isDeferred = true;
            } else {
                this._isDeferred = false;
            }
        }

        /**
        * @language zh_CN
        * 是否使用影子
        * 在当前的渲染时口中，是否可以使用阴影映射，如果是将开始进行渲染逻辑
        * @param flag {boolean}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set useShadow(flag: boolean) {

            this._useShadow = flag; 
            if (flag) {
                this._shadowRender = new ShadowRender();
            }
        }

        /**
        * @language zh_CN
        * 是否使用影子
        * 在当前的渲染时口中，是否可以使用阴影映射，如果是将开始进行渲染逻辑
        * @returns {boolean}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get useShadow(): boolean {
            return this._useShadow; 
        }

        protected requestFrameBuffer() {
            if (this._isDeferred) {
            }
            else {
                this._postCanvas = new PostCanvas();
                //this._defaultFrameBuffer = RttManager.getInstance().creatFrameBuffer(FrameBuffer.defaultFrameBuffer, this._context3D, 1024, 1024);
            }
        }

        /**
        * @language zh_CN
        * @private
        * 监听设备重置回调
        * 事件机制
        * @event func  {Function}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addListenerResize(func: Function) {
            this._resizeFuncs.push(func);
        }

        /**
        * @language zh_CN
        * 返回视口
        * 返回视口的尺寸大小
        * @returns {Rectangle}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get viewPort(): Rectangle {
            return this._viewPort;
        }

        /**
        * @language zh_CN
        * 设置天空盒子
        * 设置天空盒子，天空盒子的类型有 cubesky 和 spheresky 两种类型，其中 spheresky 是属于360天空全景照片使用
        * @param value {Sky} 天空盒子
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set sky(value: Sky) {
            this._sky = value;
        }

        /**
        * @language zh_CN
        * 设置天空球
        * 设置天空盒子，天空盒子的类型有 cubesky 和 spheresky 两种类型，其中 spheresky 是属于360天空全景照片使用
        * @param value {SphereSky} 天空球
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set sphereSky(value: SphereSky) {
            this._sphereSky = value;
        }

        /**
        * @language zh_CN
        * 返回天空盒子
        * 设置天空盒子，天空盒子的类型有 cubesky 和 spheresky 两种类型，其中 spheresky 是属于360天空全景照片使用
        * @returns {Sky}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get sky(): Sky {
            return this._sky;
        }

        /**
        * @language zh_CN
        * 添加 HUD 到渲染列表中
        * 设置天空盒子，天空盒子的类型有 cubesky 和 spheresky 两种类型，其中 spheresky 是属于360天空全景照片使用
        * @param hud {HUD}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addHUD(hud: HUD) {
            this._hudList.push(hud);
        }

        /**
        * @language zh_CN
        * @private
        * 在渲染列表中删除一个HUD
        * @param hud {HUD}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public delHUN(hud: HUD) {

            var index: number = this._hudList.indexOf(hud);
            this._hudList.splice(index, 1);
        }

        /**
        * @language zh_CN
        * 增加wireframe进渲染列表
        * 在view3D中添加物体的网格显示对象
        * @param wireframe 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addWireframe(wireframe: WireframeBase) {
            this._wireframeList.push(wireframe);
        }

        /**
        * @language zh_CN
        * 在渲染列表中删除一个wireframe
        * 动态删除物体的显示网格
        * @param hud 
        * @version Egret 3.0
        * @platform Web,Native
        */
        public delWireframe(wireframe: WireframeBase) {
            var index: number = this._wireframeList.indexOf(wireframe);
            this._wireframeList.splice(index, 1);
        }

        /**
        * @language zh_CN
        * 设置背景渲染贴图
        * 设置一个可跟随视口大小匹配，且永远在最后的背景显示贴图
        * @param texture 贴图
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set backImageTexture(texture: TextureBase) {

            if (!this._backImg) {
                this._backImg = new HUD();
                this._backImg.x = 0;// viewPort.width * 0.5  ;
                this._backImg.y = 0;// * 0.5  ;
                this._backImg.width = this.width;
                this._backImg.height = this.height;
            }
            texture.upload( this._context3D );
            this._backImg.texture = texture ;
        }

        /**
        * @language zh_CN
        * 设置 postEffect
        * 设置后期MRT处理的着色滤镜，例如（HDR，tonymaping，bloom）
        * @param postEffects {Array<PostEffectBase>}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set postEffect( postEffects: Array<PostEffectBase> ) {

            if (postEffects) {
                this._postCanvas = this._postCanvas || new PostCanvas();
                this._postList = postEffects;
                for (var i: number = 0; i < this._postList.length;i++){
                    this._postList[i].init(this._context3D, 512, 512 );
                }
                this._sourceFrameBuffer = this._sourceFrameBuffer || RttManager.creatFrameBuffer(FrameBufferType.defaultFrameBuffer, this._context3D, 512, 512, FrameBufferFormat.UNSIGNED_BYTE_RGB);
            }
        }

        /**
        * @language zh_CN
        * 返回 摄像机
        * 返回 摄像机 Camera3D
        * @returns Camera3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get camera3D(): Camera3D {
            return this._camera;
        }

        /**
        * @language zh_CN
        * @private
        * 返回 Context3D
        * @returns Context3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get context3D(): Context3D {

            return this._context3D;
        }

        /**
        * @language zh_CN
        * 获取视口的大小
        * 视口的宽度。当使用软件渲染，平台限制2048像素
        * @private
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get width(): number {
            return this._width;
        }

        /**
        * @language zh_CN
        * 设置视口的宽度。
        * 视口的宽度。当使用软件渲染，平台限制2048像素
        * @param width {number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set width(value: number) {

            this._width = value;
            this._aspectRatio = this._width / this._height;
            this._camera.aspectRatio = this._aspectRatio;
            this._scissorRect.width = value;
            this._scissorRectDirty = true;
        }
		
        /**
        * @language zh_CN
        * 获取视口的大小
        * 视口的高度。当使用软件渲染，平台限制2048像素
        * @returns {number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get height(): number {

            return this._height;
        }

        /**
        * @language zh_CN
        * 设置视口的宽度。
        * 视口的高度。当使用软件渲染，平台限制2048像素
        * @param height {number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set height(value: number) {

            this._height = value;
            this._aspectRatio = this._width / this._height;
            this._camera.aspectRatio = this._aspectRatio;
            this._scissorRect.height = value;
            this._scissorRectDirty = true;
        }

        /**
        * @language zh_CN
        * 设置 x 坐标值。
        * 设置在网页中的webgl画面位置
        * @param  x {number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set x(value: number) {

            if (this._x == value)
                return;

            this._localPos.x = this._x = value;

            this._globalPos.x = value;
            this._globalPosDirty = true;
        }

        /**
        * @language zh_CN
        * 设置 y 坐标值。
        * 设置在网页中的webgl画面位置
        * @param  x {number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set y(value: number) {

            if (this._y == value)
                return;

            this._localPos.y = value;

            this._globalPos.y = value;
            this._globalPosDirty = true;
        }
        /**
        * @language zh_CN
        * 返回 x 坐标值
        * 返回在网页中的webgl画面位置
        * @returns {number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get x(): number {

            return this._x;
        }

        /**
        * @language zh_CN
        * 返回 y 坐标值
        * 返回在网页中的webgl画面位置
        * @returns {number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get y(): number {

            return this._y;
        }

        /**
        * @language zh_CN
        * 将一个 Object3D 实例添加到 Scene3D 实例中。
        * 将一个 Object3D 实例添加到 Scene3D 实例中。参与scene3D中的显示树优化，并且即时渲染出来
        * @param  child3D {Object3D}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public addChild3D(child3D: Object3D) {
            this._scene.addChild(child3D);
        }

        /**
        * @language zh_CN
        * 渲染
        * 渲染中的主循环，可以使用外部时间控制器驱动，也可使用 requestFrame
        * @param time 当前时间
        * @param delay 时间间隔
        * @version Egret 3.0
        * @platform Web,Native
        */
        public renden(time: number, delay: number) {

            this.updateViewSizeData();

            this._scene.collect.update(this._camera);

            this._mouseEventManager.update( this._scene.collect );

            this._context3D.gl.enable(Egret3DDrive.BLEND);

            this._context3D.gl.enable(Egret3DDrive.CULL_FACE)

            this._context3D.viewPort(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);

            this._context3D.clear(0.0, 0.0, 0.0, 1);

            if (this._backImg)
                this._backImg.draw(this._context3D);

            this._context3D.clearDepth(1);

            this._context3D.clearStencil(0);

            //----------即时渲染部分-------------------
            if (!this._isDeferred) {

                if (this._postList) {

                    if (this._useShadow) {
                        RttManager.drawToTexture(time, delay, ShadowRender.frameBuffer.texture.texture, this._context3D, this._shadowRender, this._scene.collect, this._camera, this.viewPort);
                    }

                    if (this._sky) {
                        this._sky.draw(this._context3D, this.camera3D);
                    }
                    else if (this._sphereSky) {
                        this._sphereSky.draw(this._context3D, this.camera3D);
                    }

                    RttManager.drawToTexture(time, delay, this._sourceFrameBuffer.texture.texture, this._context3D, this._render, this._scene.collect, this._camera, this.viewPort);

                    this._context3D.clearDepth(1);

                    var next: FrameBuffer = this._sourceFrameBuffer;

                    for (var i: number = 0; i < this._postList.length; i++) {
                        this._postList[i].drawToTarget(this._sourceFrameBuffer, next, this._context3D, this._viewPort);
                        next = this._postList[i].nextFrameBuffer;
                    }

                    this._postCanvas.width = this._viewPort.width;
                    this._postCanvas.height = this._viewPort.height;
                    this._postCanvas.texture = next.texture;
                    this._postCanvas.draw(this._context3D, this._viewPort);
                }
                else {
                    if (this._sky) {
                        this._sky.draw(this._context3D, this.camera3D);
                    }
                    else if (this._sphereSky) {
                        this._sphereSky.draw(this._context3D, this.camera3D);
                    }

                    if (this._useShadow) {
                        RttManager.drawToTexture(time, delay, ShadowRender.frameBuffer.texture.texture, this._context3D, this._shadowRender, this._scene.collect, this._camera, this.viewPort);
                    }

                    this._context3D.clearDepth(1);
                    this._context3D.viewPort(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
                    this._render.draw(time, delay, this._context3D, this._scene.collect, this._camera, this._viewPort);
                }
            }
            else {
                //----------延迟渲染部分-------------------
                this._context3D.clearDepth(1);
                this._context3D.viewPort(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
                this._render.draw(time, delay, this._context3D, this._scene.collect, this._camera, this._viewPort);
            }
      
            for (var i: number = 0; i < this._wireframeList.length; i++) {
                this._wireframeList[i].draw(this._context3D,this.camera3D);
            }

            for (var i: number = 0; i < this._hudList.length; i++) {
                this._hudList[i].draw(this._context3D);
            }

            this._context3D.gl.finish();

        }

        protected updateViewSizeData() {

            this._camera.aspectRatio = this._aspectRatio;

            if (this._scissorRectDirty) {
                this._scissorRectDirty = false;
                this._camera.updateScissorRect(this._scissorRect.x, this._scissorRect.y, this._scissorRect.width, this._scissorRect.height);
            }

            if (this._viewportDirty) {
                this._viewportDirty = false;
                this._camera.updateViewport(this._viewPort.x, this._viewPort.y, this._viewPort.width, this._viewPort.height);
            }

        }
                
        /**
        * @language zh_CN
        * 设置tag名和name的下标为index 没有的话会新加tag
        * 设置渲染的层级标签，可以自定义渲染优先顺序，让渲染可自定义化
        * @param name tag名
        * @param index 下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setTags(name: string, index: number) {
            this._scene.collect.setTags(name, index);
        }

        /**
        * @language zh_CN
        * 设置layer名和name的下标为index
        * 设置渲染的层级标签，可以自定义渲染优先顺序，让渲染可自定义化
        * @param layer layer名
        * @param index 下标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setTagsItem(layer: string, index: number) {
            this._scene.collect.setTagsItem(layer, index);
        }
                                
        /**
        * @language zh_CN
        * 返回layer的值
        * 返回当前标签的渲染层级
        * @param name tag名
        * @param layer layer名
        * @returns {Number}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getTagLayer(name: string = "default", layer: string = "layer_0"): number {
            return this._scene.collect.getTagLayer(name, layer);
        }
                                        
        /**
        * @language zh_CN
        * 得到tag
        * 返回当前标签的渲染标签的名字
        * @param name tag名
        * @returns {Tag}
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getTag(name: string = "default"): Tag {
            return this._scene.collect.getTag(name);
        }
    }
}