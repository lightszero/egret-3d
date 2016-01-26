module egret3d {

    /**
    * @class egret3d.Context3D
    * @classdesc
    * Context3D 类提供了用于呈现几何定义图形的上下文。</p>
    *
    * 渲染上下文包括一个绘图表面及其关联的资源和状态。</p>
    * Context3D 渲染上下文是一个可编程的管道，基于OpenGL ES 2.0规范。</p>
    * 您可以通过提供适当的顶点和像素片段程序来创建 2D/3D渲染器，不同的平台有不同的硬件限制，对于移动端限制要求比较大。</p>
    * egret3d.Egret3DDrive.requstContext3D（DeviceUtil.getGPUMode , viewPort , callBack），且，一个canvas 只能申请一个context。</p>
    *
    * @see egret3d.openGLES.Program3D
    * @see egret3d.openGLES.IndexBuffer3D
    * @see egret3d.openGLES.VertexBuffer3D
    * @see egret3d.openGLES.Texture2D
    * @see egret3d.openGLES.Shader
    * @see egret3d.openGLES.CubeTexture
    * @version Egret 3.0
    * @platform Web,Native
    */
    export interface Context3D {

        
        /**
        * @language zh_CN
        * @private
        * WebGLRenderingContext 的引用
        */
        gl: WebGLRenderingContext;

        /**
        * @language zh_CN
        * @private
        */
        version: string;
        
        /**
        * @language zh_CN
        * @private
        */
        isLost: boolean;

        /**
        * @language zh_CN
        * 设置渲染缓冲区的视口尺寸和其他属性
        *
        * 缓冲区的最大大小受到设备能力的限制，也可以由用户通过 viewPort 进行设置。配置缓冲区是一个缓慢的操作。在正常渲染操作期间，请避免更改缓冲区大小或属性。
        * @param x 渲染视口的位置坐标 X
        * @param y 渲染视口的位置坐标 y
        * @param width  渲染视口的宽度
        * @param height  渲染视口的高度
        */
        viewPort(x: number, y: number, width: number, height: number);

        /**
        * @language zh_CN
        * 创建 Program3D 对象。
        *
        * 每一个渲染对象都需要这样一个显卡着色程序
        * @param 顶点着色 Shader 
        * @param 片段着色 Shader
        */
        creatProgram(vsShader: IShader, fsShader: IShader): IProgram3D;

        /**
        * @language zh_CN
        * 创建 顶点索引流
        *
        * 使用 IndexBuffer3D 对象将一组三角形索引上载到渲染上下文，并在渲染时引用这组索引。索引缓冲区中的每个索引引用顶点缓冲区中一个相对应的顶点。由 3 个索引组成的每一组索引标识一个三角形。将 IndexBuffer3D 对象传递给 drawTriangles() 方法以渲染索引缓冲区中定义的一个或多个三角形。
        * @param indexData 传入模型的顶点索引数组对象3个点为一个三角形（0/1/2 或者 0/2/1 ）不同的顺序不同现实方向，正向索引就是正面，反向索引就是反面
        */
        creatIndexBuffer(indexData: Array<number>): IndexBuffer3D;

        /**
        * @language zh_CN
        *  
        * 创建 VertexBuffer3D 对象。
        *
        * 每一个顶点的数据结构也会不同，可以使用   context3D.vertexAttribPointer（） 的方式来指定顶点的数据结构
        * 不能直接使用 new VertexBuffer3D() 的方式来创建对象
        * @param vertexData 传入模型的顶点数据 
        */
        creatVertexBuffer(vertexData: Array<number>): IVertexBuffer3D;

        /**
        * @language zh_CN
        *  
        * 创建 GPU级别的显示贴图
        *
        * 创建 GPU级别的显示贴图辅助对象，不能直接使用 new Texture2D() 的方式来创建贴图显示对象
        */
        creatTexture2D(): ITexture2D;

        /**
        * @language zh_CN
        *  
        * 上传贴图信息给GPU到 显存
        *
        * 在显卡渲染中，不同的深度会进行优化显示，显示不同的贴图LOD级别，可以通过 upLoadTextureData（） 上传需要显示的层级关系
        * @param mipLevel load 贴图层级
        * @param textureMipmap 贴图
        */
        upLoadTextureData(mipLevel: number, textureMipmap: ITexture2D);
        
        /**
        * @language zh_CN
        *  
        * 上传压缩格式贴图信息给GPU 显存
        * 
        * 贴图格式分压缩后，和未压缩，压缩后的贴图体积更小，加载快，但是上传GPU时，需要解压过程，耗费一定的时间，这个时间是根据贴图像素大小而定
        * @param mipLevel load 贴图层级
        * @param textureMipmap 上传mipmap
        */
        upLoadCompressedTexture2D(mipLevel: number, textureMipmap: ITexture2D);

        /**
        * @language zh_CN
        *  
        * 设置贴图采样的状态
        *
        * 在上传贴图的时候就可以设计贴图采样方式，也可后修改贴图采样
        * 采样方式决定了贴图的显示精度，uv 的使用方式，如果超过uv的坐标是取最大值重复，还是取下一个 0.0~1.0 的循环
        * @param min_filter 最小 uv 边界 纹理使用方式
        * @param mag_filter 最大 uv 边界 纹理使用方式
        * @param wrap_u_filter u 边界 纹理使用方式
        * @param wrap_v_filter v 边界 纹理使用方式
        */
        setTexture2DSamplerState(min_filter: number, mag_filter: number, wrap_u_filter: number, wrap_v_filter: number);

        /**
        * @language zh_CN
        *  
        * 创建 Cube贴图
        *
        * 主要用于天空材质贴图，环境贴图
        */
        creatCubeTexture(): ICubeTexture;
        
        /**
        * @language zh_CN
        *  
        * 上传cube贴图
        * 
        * 此处需要提醒开发者，cube贴图的大小会直接影响显示性能
        * @param tex 需要上传的cube贴图数据
        */
        uploadCubetexture(tex: ICubeTexture);

        /**
        * @language zh_CN
        *  
        * 创建 离屏渲染缓冲 framebuffer 
        *
        * 此处需要提醒开发者，faramebufer 的大小，及是否使用深度检测会直接影响显卡能力，像素越多，填充的速度就会越小
        * 1024*1024 显卡就需要填充那么多的像素，再之，每一帧绘制frame过多也会极大影响显卡性能，同时需要将像素拷贝到贴图内存中
        * @param width frame buffer 的宽度
        * @param height frame buffer 的宽高
        * @param format 渲染的buffer
        */
        createFramebuffer(width: number, height: number, format: FrameBufferFormat): ITexture2D;

        /**
        * @language zh_CN
        *  
        * 渲染到纹理
        * 
        * 将当前屏幕内容渲染到指定的纹理，通常这个功能用于离屏渲染，延迟渲染，等使用
        * @param texture 要接受离屏像素的贴图
        * @param enableDepthAndStencil 是否开启深度检测
        * @param surfaceSelector 如果是cubemap，指定其要渲染的面索引
        */
        setRenderToTexture(texture: ITexture2D, enableDepthAndStencil: Boolean, surfaceSelector: number);

        /**
        * @language zh_CN
        *  
        * 从离屏渲染状态恢复到即时渲染状态
        *
        * 在使用 setRenderToTexture（） 之后，主渲染缓冲会停止渲染，会切换到setRenderToTexture所使用的渲染缓冲进行渲染
        * 需要恢复主渲染缓冲的时候就会需要调用这个接口来切换回主渲染缓冲
        */
        setRenderToBackBuffer();

        /**
        * @language zh_CN
        *  
        * 创建图形渲染 顶点着色器程序
        *
        * 顶点着色器程序用来处理渲染目标的显示矩阵，和顶点流数据变换，并与提供片段着色器需要的数据
        * @param source 
        */
        creatVertexShader(source: string): IShader;
        
        /**
        * @language zh_CN
        *  
        * 创建片段着色器
        * 
        * 片段着色器程序用来处理渲染目标的渲染显示效果，texture color transform 等等
        * @param source 
        */
        creatFragmentShader(source: string): IShader;

        /**
        * @language zh_CN
        *  
        * 清除渲染区域的颜色
        *
        * context 渲染上下文 清除 渲染窗口内的颜色 rgba 四个通道 一般清除会接连调用清除深度clearDepth（）
        * @param r 清除红色到什么值
        * @param g 清除绿色到什么值
        * @param b 清除蓝色到什么值
        * @param a 清除透明到什么值 
        */
        clear(r: number, g: number, b: number, a: number);

        /**
        * @language zh_CN
        *  
        * 清除渲染区域 深度
        * @param depth 深度值 
        */
        clearDepth(depth: number);

        /**
        * @language zh_CN
        *  
        * 清除渲染区域 模板缓冲
        *
        * 如果在渲染场景的时候设置过深度模板缓冲 那么下一次渲染场景在没有任何视图变化的时候可以直接使用模板缓冲
        * @param stencil 模板索引值
        */
        clearStencil(stencil: number);

        /**
        * @language zh_CN
        *  
        * 使用显卡着色器
        *
        * 设置当前渲染目标要使用的编译后的着色程序，是通过 createProgram() 创建的program 再编译 vsshader 和 fsshader 后的程序
        * @param programe 编译后的着色程序 
        */
        setProgram(programe: IProgram3D);

        /**
        * @language zh_CN
        *  
        * 获取一致变量的 显卡内存ID
        *
        * 从编译后的着色器程序获取一致变量引用ID，用来指定 要上传数据的 编译后的着色器程序 的变量名
        * @param programe  编译后的着色器程序
        * @param name  着色器程序里的变量名
        */
        getUniformLocation(programe3D: IProgram3D, name: string): number;
        
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个float 变量的值
        *
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location  一致变量ID 通过getUniformLocation（）获得
        * @param x  一个类型为float的值
        */
        uniform1f(location: any, x: number): void;
                
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个float数组 的值
        *
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location   一致变量ID 通过getUniformLocation（）获得
        * @param v  一个类型为float的数组
        */
        uniform1fv(location: any, v: any): void;
                        
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个int 的值
        *
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location   一致变量ID 通过getUniformLocation（）获得
        * @param x  一个类型为int的值
        */
        uniform1i(location: any, x: number): void;
                        
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个int数组 的值
        *
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location   一致变量ID 通过getUniformLocation（）获得
        * @param x  一个类型为int的数组
        */
        uniform1iv(location: any, v: Int32Array): void;
                                
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个int数组 的值
        *
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param x  一个类型为float的值
        * @param y  一个类型为float的值
        */
        uniform2f(location: any, x: number, y: number): void;
                                
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个point数组 的值
        *
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param v 一个[x,y]的值
        */
        uniform2fv(location: any, v: any): void;
                                        
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个结构为 [0,0] 的值
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param x 一个 int 值
        * @param y 一个 int 值
        */
        uniform2i(location: any, x: number, y: number): void;
                                                
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个 Int32Array 的值 
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param v 一个 Int32Array 的值 
        */
        uniform2iv(location: any, v: Int32Array): void;
                                                        
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 三个 float 的值 
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param x  一个类型为float的值
        * @param y  一个类型为float的值
        * @param z  一个类型为float的值
        */
        uniform3f(location: any, x: number, y: number, z: number): void;
                                                                
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个结构为[0.0,0.0,0.0] float 数组 
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param v 一个类型为float的值
        */
        uniform3fv(location: any, v: any): void;
                                                                
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个结构为[0,0,0] int 数组 
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param x 一个类型为int的值
        * @param y 一个类型为int的值
        * @param z 一个类型为int的值
        */
        uniform3i(location: any, x: number, y: number, z: number): void;
                                                                        
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个结构为 Int32Array 数组 
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param v 一个类型为Int32Array的值
        */
        uniform3iv(location: any, v: Int32Array): void;
                                                                                
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 四个 float 数值
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param x 一个类型为float的值
        * @param y 一个类型为float的值
        * @param z 一个类型为float的值
        * @param w 一个类型为float的值
        */
        uniform4f(location: any, x: number, y: number, z: number, w: number): void;
                                                                                        
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个结构为 [0.0,0.0,0.0,0.0] 的float 数组 
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param v 一个结构为 [0.0,0.0,0.0,0.0] 的float 数组 
        */
        uniform4fv(location: any, v: any): void;
                                                                                        
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个结构为 [0.0,0.0,0.0,0.0] 的float 数组 
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param x 一个 int 数值 
        * @param y 一个 int 数值 
        * @param z 一个 int 数值 
        * @param w 一个 int 数值 
        */
        uniform4i(location: any, x: number, y: number, z: number, w: number): void;
                                                                                                
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个结构为 [0.0,0.0,0.0,0.0] 的float 数组 
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param v 一个 Int32Array 数据 
        */
        uniform4iv(location: any, v: Int32Array): void;
                                                                                                
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个2*2的浮点矩阵
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param transpose 进行变换 默认false
        * @param value 一个长度2*2的float型数据，或者数组，或者 arrayBuffer 型数据
        */
        uniformMatrix2fv(location: any, transpose: boolean, value: any): void;
                                                                                                        
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个3*3的浮点矩阵
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param transpose 进行变换 默认false
        * @param value 一个长度3*3的float型数据，或者数组，或者 arrayBuffer 型数据
        */
        uniformMatrix3fv(location: any, transpose: boolean, value: any): void;
                                                                                                        
        /**
        * @language zh_CN
        *  
        * 给编译后的着色器程序传 一个4*4的浮点矩阵
        * 
        * 上传显卡中的常量数据，进行单向数据传输，从 cpu内存 传输到GPU编译后的着色器中
        * @param location 一致变量ID 通过getUniformLocation（）获得
        * @param transpose 进行变换 默认false
        * @param value 一个长度3*3的float型数据，或者数组，或者 arrayBuffer 型数据
        */
        uniformMatrix4fv(location: any, transpose: boolean, value: any): void;


        /**
        * @language zh_CN
        *  
        * 指定用于使用现有颜色混合绘制操作的输出颜色的系数。
        * 像素着色器程序的输出（源）颜色根据以下公式与该像素的现有（目标）颜色组合：
        * result color = (source color * sourceFactor) + (destination color * destinationFactor)
        * 目标颜色为该像素在渲染缓冲区中的当前颜色。因此，这是最近的 clear() 调用和任何中间 drawTriangles() 调用的结果。
        * 使用 setBlendFactors() 设置用于与源颜色和目标颜色相乘然后将它们相加的系数。默认混合系数为 sourceFactor = Egret3DDrive.ONE 和 destinationFactor = Egret3DDrive.ZERO，这会导致源颜色覆盖目标颜色（也就是说，不会发生两种颜色混合）。对于正常 alpha 混合，请使用 sourceFactor = Egret3DDrive.SOURCE_ALPHA 和 destinationFactor = Egret3DDrive.ONE_MINUS_SOURCE_ALPHA。
        * 使用 Egret3DDrive 类中定义的常量设置此函数的参数。
        * @param src 用于与源颜色相乘的系数。默认为 Egret3DDrive.ONE。
        * @param dst 用于与源颜色相乘的系数。默认为 Context3DBlendFactor.ZERO。
        */
        setBlendFactors(src: number, dst: number);

        /**
        * @language zh_CN
        *  
        * 设置三角形剔除模式。
        * 可基于其相对于视图平面的方向，提前在呈现管道流程中从场景中排除三角形。如模型外部所示，一致地指定顶点顺序（顺时针或逆时针）以正确剔除。
        * @param mode 剔除模式。使用 Egret3DDrive 类中定义的常量之一。 默认 Egret3DDrive.BACK 。
        */
        setCulling(mode: number);

        /**
        * @language zh_CN
        *  
        * 开启当前着色器的能力
        * 一般需要开启深度测试，混合模式，剔除模式
        * Egret3DDrive.DEPTH_TEST 
        * Egret3DDrive.CULL_FACE 
        * Egret3DDrive.BLEND 
        * @param cap 要开启的能力 使用Egret3DDrive类中定义的常量，默认全部关闭
        */
        enbable(cap: number);
        
        /**
        * @language zh_CN
        *  
        * 关闭 绘制模式
        * 一般需要开启深度测试，混合模式，剔除模式
        *
        * Egret3DDrive.DEPTH_TEST 
        * Egret3DDrive.CULL_FACE 
        * Egret3DDrive.BLEND  
        * @param cap 要开启的能力 使用Egret3DDrive类中定义的常量，默认全部关闭
        */
        disable(cap: number);

        /**
        * @language zh_CN
        *  
        * 设置用于深度测试的比较类型。
        *
        * 像素着色器程序的源像素输出的深度将与深度缓冲区中的当前值进行比较。如果比较计算结果为 false，则丢弃源像素。如果为 true，则呈现管道中的下一步“印模测试”将处理源像素。此外，只要 depthMask 参数设置为 true，就会使用源像素的深度更新深度缓冲区。
        * 设置用于比较源像素和目标像素的深度值的测试。当比较为 true 时，源像素与目标像素合成。将比较运算符按该顺序作为源像素值和目标像素值之间的中缀运算符应用。
        *
        * @param flag 是否开启深度测试
        * @param compareMode 开始深度测试的模式 使用Egret3DDrive类中定义的常量
        */
        enableDepthTest(flag: boolean, compareMode: number);

        /**
        * @language zh_CN
        *  
        * 获取顶点着色器变量 索引
        * @param programe 编译后的着色器程序
        * @param attribName 要指定的顶点结构在shader中的名字
        */
        getShaderAttribLocation(programe: IProgram3D, attribName: string);

        /**
        * @language zh_CN
        *  
        * 指定与单个着色器程序输入相对应的顶点数据组件。
        * 使用 setVertexBufferAt 方法来标识 VertexBuffer3D 缓冲区中每个顶点定义的哪些数据组件属于顶点程序的哪些输入。顶点程序的开发人员会确定每个顶点需要的数据量。该数据从 1 个或多个 VertexBuffer3D 流映射到顶点着色器程序的属性寄存器中。
        * 顶点着色器所使用数据的最小单位为 32 位数据。距顶点流的偏移量以 32 位的倍数指定。
        * 举例来说，编程人员可以使用以下数据定义每个顶点：
        * position: x    float32
        *           y    float32
        *           z    float32
        * color:    r    unsigned byte
        *           g    unsigned byte
        *           b    unsigned byte
        *           a    unsigned byte
        * 假定在 VertexBuffer3D 对象中定义了名为 buffer 的对象，则可使用以下代码将其分配给顶点着色器：
        * @param programe3D 编译后的着色器程序
        * @param index      顶点索引
        * @param size       顶点结构大小索引
        * @param dataType   数据类型
        * @param normalized 是否需要归一化
        * @param stride     占用长度
        * @param offset     偏移位置
        */
        vertexAttribPointer(programe3D: IProgram3D, index: number, size: number, dataType: number, normalized: boolean, stride: number, offset: number);

        /**
        * @language zh_CN
        *  
        * 实时传入显卡顶点着色器变量数组数据
        * 设置 个可通过顶点或片段程序访问的常量数据。
        *
        *
        * @param floats arrayBuffer 型数据
        * @param offest 偏移量
        * @param numLen 总长度
        */
        setVertexShaderConstData(floats: Float32Array, offest: number, numLen: number);

        /**
        * @language zh_CN
        *  
        * 实时传入显卡片段着色器变量数组数据
        * @param floats arrayBuffer 型数据
        * @param offest 偏移量
        * @param numLen 总长度
        */
        setFragmentShaderConstData(floats: Float32Array, offest: number, numLen: number);

        /**
        * @language zh_CN
        *  
        * 指定要为片段程序的纹理输入寄存器使用的纹理。
        * 一个片段程序最多可以从 8 个纹理对象读取信息。使用此函数将 Texture 或 CubeTexture 对象分配给片段程序使用的取样器寄存器之一。
        * 注意：如果将活动的片段程序（使用 setProgram）更改为使用较少纹理的着色器，请将未使用的寄存器设置为 null：
        * <code>
        *       context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, null );
        *       context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture); 
        * </code>
        * @param samplerIndex 取样器寄存器索引，介于 0 到 7 之间的值。
        * @param uniLocation 一致变量ID 通过getUniformLocation（）获得
        * @param index 贴图的索引
        * @param texture 贴图
        */
        setTexture2DAt(samplerIndex: number, uniLocation: number, index: number, texture: ITexture2D);
        
        /**
        * @language zh_CN
        *  
        * 指定要为片段程序的纹理输入寄存器使用的纹理。
        * 一个片段程序最多可以从 8 个纹理对象读取信息。使用此函数将 Texture 或 CubeTexture 对象分配给片段程序使用的取样器寄存器之一。
        * 注意：如果将活动的片段程序（使用 setProgram）更改为使用较少纹理的着色器，请将未使用的寄存器设置为 null：
        * <code>
        *       context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, null );
        *       context3D.setTexture2DAt(sampler2D.activeTextureIndex, sampler2D.uniformIndex, sampler2D.index, sampler2D.texture.texture); 
        * </code>
        * @param samplerIndex — 取样器寄存器索引，介于 0 到 7 之间的值。
        * @param uniLocation - 致变量ID 通过getUniformLocation（）获得
        * @param index 贴图的索引
        * @param texture 贴图
        */
        setCubeTextureAt(samplerIndex: number, uniLocation: number, index: number, texture: ICubeTexture);

        /**
        * @language zh_CN
        * @private
        * 设置一个裁剪矩形，绘制遮罩的类型。渲染器仅绘制到裁剪矩形内部的区域。裁剪不影响清除操作。
        * @param rectangle — 要在其中绘制的矩形。指定矩形的位置和尺寸（以像素为单位）。坐标系统原点为视口的左上角，向下和向右为递增的正值。
        */
        setScissorRectangle(rectangle: Rectangle);
        
        /**
        * @language zh_CN
        * @private
        * 可将一个 8 位印模引用值与每个绘制调用关联。在渲染期间，可根据先前存储在帧缓冲区中的值测试引用值。测试结果可控制绘制操作，以及是否更新已存储的印模值或如何更新。此外，深度测试控制是否执行印模测试。失败的深度测试也可用于控制要对印模缓冲区执行的操作。
        * 在像素处理管道流程中，首先执行深度测试。如果深度测试失败，可执行印模缓冲区更新操作，但无法进一步评估印模缓冲区值。如果深度测试通过，则执行印模测试。根据印模测试的结果，也可执行其他操作。
        * @param triangleFace —允许促使印模操作的三角形方向。一个 Context3DTriangleFace。
        * @param compareMode —用于比较当前印模引用值和目标像素印模值的测试运算符。当比较结果为 true 时，会执行目标像素颜色和深度更新。根据下面操作参数中的请求执行印模操作。将比较运算符按该顺序作为当前引用值和目标引用值之间的中缀运算符应用（以伪代码表示：if stencilReference OPERATOR stencilBuffer then pass）。使用 Context3DCompareMode 类中定义的常量之一。
        * @param actionOnBothPass —当深度和印模比较通过时要执行的操作。使用 Context3DStencilAction 类中定义的常量之一。
        * @param actionOnDepthFail —当深度比较失败时要执行的操作。使用 Context3DStencilAction 类中定义的常量之一。
        * @param actionOnDepthPassStencilFail —当深度比较通过而印模比较失败时要执行的操作。使用 Context3DStencilAction 类中定义的常量之一。
        */
        setStencilActions(triangleFace: string, compareMode: string, actionOnBothPass: string, actionOnDepthFail: string , actionOnDepthPassStencilFail: string )
     
        /**
        * @language zh_CN
        * @private
        * 设置用于印模测试的印模比较值。
        */
        setStencilReferenceValue(referenceValue: number, readMask: number , writeMask: number );
        
        /**
        * @language zh_CN
        *  
        * 绑定顶点buffer
        * 
        * 在当前的着色器下使用一个 geomtery 模型顶点数据buffer
        @ see egret3d.VertexBuffer3D
        * @param vertexBuffer
        */
        bindVertexBuffer(vertexBuffer: IVertexBuffer3D);

        /**
        * @language zh_CN
        * @private
        * 绘制模型元素
        * @param type 图元类型
        * @param first 第一个顶点索引
        * @param length 顶点个数
        */
        drawArrays(type: number, first: number, length: number);

        /**
        * @language zh_CN
        *   
        * 绘制模型元素
        * 绘制前，一定要设置好 indexBuffer 和 vertexBuffer，并且单个顶点的数目不能超过 65535 的限制，超出模型渲染就出现拉丝的情况
        * @param type-图元类型
        * @param indexBuffer-索引数据
        * @param offset-顶点偏移
        * @param length-顶点个数
        */
        drawElement(type: number, indexBuffer: IndexBuffer3D, offset: number, length: number);

        /**
        * @language zh_CN
        *   
        * 绘制提交
        * 所有的draw完成之后会将后台缓冲的画面渲染到主屏幕上
        * 调用 flush() 方法会让从上一次 flush() 调用起的所有渲染操作结果可见，并开始新的渲染周期。调用 flush 之后，必须在调用另一个 drawElement() 之前调用 clear()。否则，此函数会将渲染缓冲区清除为黄色和绿色 。
        * 与调用 setRenderToBackBuffer() 相同，调用 present() 也会重置渲染目标。
        */
        flush();
    }

    /**
    * @class egret3d.Context3DChild_OpenGLES_2_0
    * @classdesc
    * Context3DChild_OpenGLES_2_0  implements egret3d.Context3D
    * 3d设备数据
    */
    export class Context3DChild_OpenGLES_2_0 implements egret3d.Context3D {

        private programes: Array<IProgram3D>;

        /**
        * @private
        */
        public gl: WebGLRenderingContext;

        /**
        * @language zh_CN
        * 构造
        * @param context3D
        */
        constructor(context3D: WebGLRenderingContext) {
            this.gl = context3D;

            ContextSamplerType.LINEAR = this.gl.LINEAR;
            ContextSamplerType.NEAREST = this.gl.NEAREST;
            ContextSamplerType.REPEAT = this.gl.REPEAT;
            
            ///enable necessry extensions.
            ///var OES_texture_float_linear = this.gl.getExtension("OES_texture_float_linear");
            //var OES_texture_float = this.gl.getExtension("OES_texture_float");
            ///var OES_texture_half_float = this.gl.getExtension("OES_texture_half_float");
            ///var OES_texture_half_float_linear = this.gl.getExtension("OES_texture_half_float_linear");
            ///var OES_standard_derivatives = this.gl.getExtension("OES_standard_derivatives");
            ///var WEBGL_draw_buffers = this.gl.getExtension("WEBGL_draw_buffers");
            ///var WEBGL_depth_texture = this.gl.getExtension("WEBGL_depth_texture");
            //if (!OES_texture_float) {
            //    alert("OES_texture_float Texture is not available");
            //}
           
        }

        /**
        * @language zh_CN
        * 版本号
        *  
        * @param context3D
        */
        public get version(): string {
            return "";
        }

        public get isLost(): boolean {
            /// need to add instance 
            return false;
        }

        /**
        * @language zh_CN
        * 版本号
        * 视口设置定义
        * @param x position X
        * @param y position Y
        * @param width  3D canvas width
        * @param height  3D canvas  height
        */
        public viewPort(x: number, y: number, width: number, height: number) {
            this.gl.viewport(x, y, width, height);
        }

        /**
        * @language zh_CN
        * 创建 显卡程序
        * @param vsShader
        * @param fsShader
        */
        public creatProgram(vsShader: IShader, fsShader: IShader): IProgram3D {
            var shaderProgram = this.gl.createProgram();
            this.gl.attachShader(shaderProgram, vsShader.shader);
            this.gl.attachShader(shaderProgram, fsShader.shader);
            this.gl.linkProgram(shaderProgram);
            var p = this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS);
            if (!p) {
                alert("vsShader error" + this.gl.getShaderInfoLog(vsShader.shader));
                alert("fsShader error" + this.gl.getShaderInfoLog(fsShader.shader));
            }
            var program: egret3d.openGLES.Program3D = new egret3d.openGLES.Program3D(shaderProgram);
            return program;
        }

        /**
        * @language zh_CN
        * 创建 顶点索引流
        * @param indexData
        */
        public creatIndexBuffer(indexData: Array<number>): IndexBuffer3D {
            var indexDataArray = new Uint16Array(indexData);

            var indexBuffer: WebGLBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexDataArray, this.gl.STATIC_DRAW);

            return new egret3d.openGLES.IndexBuffer3D(indexBuffer);
        }

        /**
        * @language zh_CN
        * 创建 顶点数据流
        * @param vertexData
        */
        public creatVertexBuffer(vertexData: Array<number>): IVertexBuffer3D {
            var vertexDataArray: Float32Array = new Float32Array(vertexData);

            var vertexBuffer: WebGLBuffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexDataArray, this.gl.STATIC_DRAW);

            return new egret3d.openGLES.VertexBuffer3D(vertexBuffer);
        }

        /// public upLoadTextureData(mipLevel: number, texture: Texture2D , data:any ) {
        ///     /// 启用二维纹理
        ///     ///this.gl.enable( this.gl.TEXTURE );
        ///     this.gl.bindTexture(this.gl.TEXTURE_2D, texture.texture2D);
        ///     ///if (typeof (data) == HTMLImageElement) {
        ///     /// this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        ///     ///}
        ///     this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, this.gl.RGBA, 128, 128, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data ) ;
        ///
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
        ///     this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        /// }

        /**
        * @language zh_CN
        * 设置2D纹理状态
        * @param min_filter
        * @param mag_filter
        * @param wrap_u_filter
        * @param wrap_v_filter
        */
        public setTexture2DSamplerState(min_filter: number, mag_filter: number, wrap_u_filter: number, wrap_v_filter: number) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, min_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, mag_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap_u_filter);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }

        /**
        * @language zh_CN
        * 提交2D纹理
        * @param mipLevel
        * @param texture
        */
        public upLoadTextureData(mipLevel: number, texture: ITexture2D) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.gpu_texture);

            if (texture.gpu_internalformat == InternalFormat.ImageData) {
                this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1);

                this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, texture.image);
                this.gl.generateMipmap(this.gl.TEXTURE_2D);
            }
            else if (texture.gpu_internalformat == InternalFormat.CompressData) {
                this.upLoadCompressedTexture2D(mipLevel, texture);
            }
            else if (texture.gpu_internalformat == InternalFormat.PixelArray) {
                this.gl.texImage2D(this.gl.TEXTURE_2D, mipLevel, texture.gpu_colorformat, texture.mipmapDatas[mipLevel].width, texture.mipmapDatas[mipLevel].height, texture.gpu_border, texture.gpu_colorformat, this.gl.UNSIGNED_BYTE, texture.mipmapDatas[mipLevel].data);
                this.gl.generateMipmap(this.gl.TEXTURE_2D);
            }

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        }

        /**
        * @language zh_CN
        * 提交2D压缩纹理
        * @param mipLevel
        * @param texture
        */
        public upLoadCompressedTexture2D(mipLevel: number, texture: ITexture2D) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.gpu_texture);
            this.gl.compressedTexImage2D(this.gl.TEXTURE_2D, mipLevel, texture.gpu_colorformat, texture.mipmapDatas[mipLevel].width, texture.mipmapDatas[mipLevel].height, texture.gpu_border, texture.mipmapDatas[mipLevel].data);
        }

        /**
        * @language zh_CN
        * 创建 2维贴图
        */
        public creatTexture2D(): ITexture2D {
            var texture: egret3d.openGLES.Texture2D = new egret3d.openGLES.Texture2D(this.gl.createTexture(), this);
            return texture;
        }

        /**
        * @language zh_CN
        * 创建 Cube贴图
        */
        public creatCubeTexture(): ICubeTexture {
            return new egret3d.openGLES.CubeTexture(this.gl.createTexture());
        }

        /**
        * @language zh_CN
        *
        * @param tex
        */
        public uploadCubetexture(tex: ICubeTexture) {
            /// 创建纹理并绑定纹理数据
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, tex.gpu_texture);

            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_right.imageData );
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_left.imageData );
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_up.imageData );
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_down.imageData );
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_back.imageData );
            this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, tex.image_front.imageData ); 
            ///this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP);
            ///gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            ///this.gl.texParameterf(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, min_filter);
            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, mag_filter);
            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, wrap_u_filter);
            ///this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, wrap_v_filter);
        }
        
        /**
        * @language zh_CN
        *
        * @param width
        * @param height
        * @param format
        */
        public createFramebuffer(width: number, height: number, format: FrameBufferFormat): ITexture2D {
            var rttframeBuffer = this.gl.createFramebuffer();
            var texture2D: ITexture2D = this.creatTexture2D();
            var depthRenderbuffer = this.gl.createRenderbuffer();
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, rttframeBuffer);

            this.gl.bindTexture(this.gl.TEXTURE_2D, texture2D.gpu_texture);

            var float: Float32Array = new Float32Array(32 * 32 * 4);
            for (var i: number = 0; i < 32 * 32; i++) {
                float[i] = 1.0;
                float[i + 1] = 1.0;
                float[i + 2] = 1.0;
                float[i + 3] = 1.0;
            }

            switch (format) {
                case FrameBufferFormat.UNSIGNED_BYTE_RGB:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, width, height, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.UNSIGNED_BYTE_RGBA:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
                    break;
                case FrameBufferFormat.FLOAT_RGB:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, width, height, 0, this.gl.RGB, this.gl.FLOAT, float);
                    break;
                case FrameBufferFormat.FLOAT_RGBA:
                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.FLOAT, float);
                    break;
            }

            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture2D.gpu_texture, 0);

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            ///this.gl.generateMipmap(this.gl.TEXTURE_2D);  
            ///配置渲染缓冲 
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthRenderbuffer);
            this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);

            texture2D.width = width;
            texture2D.height = height;
            texture2D.frameBuffer = rttframeBuffer;
            texture2D.renderbuffer = depthRenderbuffer;

            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
            return texture2D;
        }
                
        /**
        * @language zh_CN
        *
        * @param texture
        * @param enableDepthAndStencil
        * @param surfaceSelector
        */
        public setRenderToTexture(texture: ITexture2D, enableDepthAndStencil: Boolean = false, surfaceSelector: number = 0) {
            if (enableDepthAndStencil) {
                //this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, texture.renderbuffer);
                //this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, texture.width, texture.height);
            }

            this.gl.viewport(0, 0, texture.width, texture.height);
           
            //if (this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER) != this.gl.FRAMEBUFFER_COMPLETE)
            //{
            //    alert("缓冲失败");
            //}

            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, texture.frameBuffer);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture.gpu_texture, 0);
            this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, texture.renderbuffer);
        }
                        
        /**
        * @language zh_CN
        *
        */
        public setRenderToBackBuffer() {

            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);

        }
                                
        /**
        * @language zh_CN
        *
        * @param source
        */
        public creatVertexShader(source: string): IShader {
            var shader: WebGLShader = this.gl.createShader(this.gl.VERTEX_SHADER);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            var tmpShader: egret3d.openGLES.Shader = new egret3d.openGLES.Shader(shader);
            tmpShader.id = egret3d.openGLES.Shader.ID_COUNT++;
            return tmpShader;
        }
                                        
        /**
        * @language zh_CN
        *
        * @param source
        */
        public creatFragmentShader(source: string): IShader {
            var shader: WebGLShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);

            var tmpShader: egret3d.openGLES.Shader = new egret3d.openGLES.Shader(shader);
            tmpShader.id = egret3d.openGLES.Shader.ID_COUNT++;
            return tmpShader;
        }

        /**
        * @language zh_CN
        * 清除渲染区域的颜色 深度
        * @param r
        * @param g
        * @param b
        * @param a
        */
        public clear(r: number, g: number, b: number, a: number) {
            this.gl.clearColor(r, g, b, a);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            ///console.log( "clean" , r , g, b, a );
        }
        
        /**
        * @language zh_CN
        * 清除渲染区域的 深度
        * @param depth
        */
        public clearDepth(depth: number) {
            this.gl.clearDepth(depth);
            this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
        }

                
        /**
        * @language zh_CN
        * 清除渲染区域的 模板
        * @param stencil
        */
        public clearStencil(stencil: number) {
            this.gl.clearStencil(stencil);
        }

        /**
        * @language zh_CN
        * 使用显卡着色器
        * @param program
        */
        public setProgram(program: IProgram3D) {
            this.gl.useProgram(program.program);
        }

        /**
        * @language zh_CN
        * 获取矩阵变量ID
        * @param program
        * @param name
        */
        public getUniformLocation(programe3D: IProgram3D, name: string): any {
            return this.gl.getUniformLocation(programe3D.program, name);
        }

        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        */
        public uniform1f(location: any, x: number): void {
            this.gl.uniform1f(location, x);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform1fv(location: any, v: any): void {
            this.gl.uniform1fv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        */
        public uniform1i(location: any, x: number): void {
            this.gl.uniform1i(location, x);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform1iv(location: any, v: Int32Array): void {
            this.gl.uniform1iv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        */
        public uniform2f(location: any, x: number, y: number): void {
            this.gl.uniform2f(location, x, y);
        }
                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform2fv(location: any, v: any): void {
            this.gl.uniform2fv(location, v);
        }
                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        */
        public uniform2i(location: any, x: number, y: number): void {
            this.gl.uniform2i(location, x, y);
        }
                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform2iv(location: any, v: Int32Array): void {
            this.gl.uniform2iv(location, v);
        }
                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        */
        public uniform3f(location: any, x: number, y: number, z: number): void {
            this.gl.uniform3f(location, x, y, z);
        }
                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform3fv(location: any, v: any): void {
            this.gl.uniform3fv(location, v);
        }
                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        */
        public uniform3i(location: any, x: number, y: number, z: number): void {
            this.gl.uniform3i(location, x, y, z);
        }
                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform3iv(location: any, v: Int32Array): void {
            this.gl.uniform3iv(location, v);
        }
                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        * @param w
        */
        public uniform4f(location: any, x: number, y: number, z: number, w: number): void {
            this.gl.uniform4f(location, x, y, z, w);
        }
                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform4fv(location: any, v: any): void {
            this.gl.uniform4fv(location, v);
        }
                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param x
        * @param y
        * @param z
        * @param w
        */
        public uniform4i(location: any, x: number, y: number, z: number, w: number): void {
            this.gl.uniform4i(location, x, y, z, w);
        }
                                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param v
        */
        public uniform4iv(location: any, v: Int32Array): void {
            this.gl.uniform4iv(location, v);
        }
                                                                
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix2fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix2fv(location, transpose, value);
        }
                                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix3fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix3fv(location, transpose, value);
        }
                                                                        
        /**
        * @language zh_CN
        * 传值给shader
        * @param location
        * @param transpose
        * @param value
        */
        public uniformMatrix4fv(location: any, transpose: boolean, value: any): void {
            this.gl.uniformMatrix4fv(location, transpose, value);
        }

        /**
        * @language zh_CN
        * 设置 绘制混合模式
        * @param src 
        * @param dst 
        */
        public setBlendFactors(src: number, dst: number) {
            this.gl.blendFunc(src, dst);
        }

        /**
        * @language zh_CN
        * 设置 绘制剔除模式
        * @param mode 
        */
        public setCulling(mode: number) {
            this.gl.cullFace(mode);
        }

        /**
        * @language zh_CN
        * 开启 绘制模式
        * @param cap 
        */
        public enbable(cap: number) {
            this.gl.enable(cap);
        }

        /**
        * @language zh_CN
        * 关闭 绘制模式
        * @param cap 
        */
        public disable(cap: number) {
            this.gl.disable(cap);
        }

        /**
        * @language zh_CN
        * 开启 深度模式 及 深度测试比较模式
        * @param flag 
        * @param compareMode 
        */
        public enableDepthTest(flag: boolean, compareMode: number = 0) {
            if (flag)
                this.gl.enable(this.gl.DEPTH_TEST);
        }

        /**
        * @language zh_CN
        * 获取顶点着色器变量 索引
        * @param programe 
        * @param attribName
        * @returns 着色器变量
        */
        public getShaderAttribLocation(programe: IProgram3D, attribName: string): any {
            return this.gl.getAttribLocation(programe.program, attribName);
        }

        /**
        * @language zh_CN
        * 指定顶点着色器变量索引 及机构
        * @param programe3D 
        * @param index 
        * @param size 
        * @param dataType 
        * @param normalized 
        * @param stride 
        * @param offset 
        */
        public vertexAttribPointer(programe3D: IProgram3D, index: number, size: number, dataType: number, normalized: boolean, stride: number, offset: number) {
            this.gl.vertexAttribPointer(index, size, dataType, normalized, stride, offset);
            this.gl.enableVertexAttribArray(index);
        }

        /**
        * @language zh_CN
        * 实时传入显卡顶点着色器变量数组数据
        * @param floats 
        * @param offest 
        * @param numLen 
        */
        public setVertexShaderConstData(floats: Float32Array, offest: number, numLen: number) {
            this.gl.vertexAttrib4fv(offest, floats.subarray(offest, numLen));
        }

        /**
        * @language zh_CN
        * 实时传入显卡片段着色器变量数组数据
        * @param floats 
        * @param offest 
        * @param numLen 
        */
        public setFragmentShaderConstData(floats: Float32Array, offest: number, numLen: number) {
        }

        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex 
        * @param uniLocation 
        * @param index 
        * @param texture 
        */
        public setTexture2DAt(samplerIndex: number, uniLocation: number, index: number, texture: ITexture2D) {
            this.gl.activeTexture(samplerIndex);
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture.gpu_texture);
            this.gl.uniform1i(uniLocation, index);
        }
        
        /**
        * @language zh_CN
        * 设置贴图采样 第一个参数并不是类型
        * @param samplerIndex 
        * @param uniLocation 
        * @param index 
        * @param texture 
        */
        public setCubeTextureAt(samplerIndex: number, uniLocation: number, index: number, texture: ICubeTexture) {
            this.gl.activeTexture(samplerIndex);
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture.gpu_texture);
            this.gl.uniform1i(uniLocation, index);
        } 

        /**
        * @language zh_CN
        * 设置矩形裁切区域
        * @param rectangle 
        */
        public setScissorRectangle(rectangle: Rectangle) {
        }

        /**
        * @language zh_CN
        * 设置模板测试
        */
        public setStencilReferenceValue() {
        }

        /**
        * @language zh_CN
        * 设置模板测试
        */
        setStencilActions(triangleFace: string, compareMode: string, actionOnBothPass: string, actionOnDepthFail: string, actionOnDepthPassStencilFail: string) {
        }

        /**
        * @language zh_CN
        * 绑定顶点Buffer
        * @param vertexBuffer 
        */
        public bindVertexBuffer(vertexBuffer: IVertexBuffer3D) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer.buffer);
        }

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param first 第一个顶点索引
        * @param length 顶点个数
        */
        public drawArrays(type: number, first: number, length: number) {
            this.gl.drawArrays(type, first, length);
        }

        /**
        * @language zh_CN
        * 绘制模型元素
        * @param type 图元类型
        * @param indexBuffer 索引数据
        * @param offset 顶点偏移
        * @param length 顶点个数
        */
        public drawElement(type: number, indexBuffer: IndexBuffer3D, offset: number, length: number) {
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
            this.gl.drawElements(type, length, this.gl.UNSIGNED_SHORT, offset);
        }

        /**
        * @language zh_CN
        * 绘制提交
        */
        public flush() {
            this.gl.flush();
        }
    }
}




