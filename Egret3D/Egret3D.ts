module egret3d {
            
    /**
     * @class egret3d.DrawMode
     * @classdesc
     * 渲染模式
     * LINES 线框显示模式
     * POINTS 点显示模式
     * TRIANGLES 三角形显示模式
     * LINE_STRIP 连接线显示模式
     */ 
    export class DrawMode {
                    
        /**
         * @language zh_CN
         * 线框显示模式
         */
        static LINES: number;
                            
        /**
         * @language zh_CN
         * 点显示模式
         */
        static POINTS: number;
                                    
        /**
         * @language zh_CN
         * 三角形显示模式
         */
        static TRIANGLES: number;
                                    
        /**
         * @language zh_CN
         * 连接线显示模式
         */
        static LINE_STRIP: number;

    }
            
    /**
     * @private
     * @class egret3d.Egret3DDrive
     * @classdesc
     * 3d 驱动 
     */ 
    export class Egret3DDrive {
                    
        /**
        * @private
        */ 
        static Direct3D_Opengl_Auto: string = "Direct3D_Opengl_Auto";
                            
        /**
        * @private
        */ 
        static Direct3D_9_0: string = "Direct3D_9_0";
                            
        /**
        * @private
        */ 
        static Direct3D_10_0: string = "Direct3D_10_0";
                            
        /**
        * @private
        */ 
        static Direct3D_11_0: string = "Direct3D_11_0";
                            
        /**
        * @private
        */ 
        static OpenGLES_2_0: string = "OpenGLES_2_0";
                            
        /**
        * @private
        */ 
        static OpenGLES_3_0: string = "OpenGLES_3_0";
                            
        /**
        * @private
        */ 
        static OpenGL: string = "OpenGL";
                            
        /**
        * @private
        */ 
        static context3D: Context3D;
                            
        /**
        * @private
        */ 
        static canvas: HTMLCanvasElement;
                            
        /**
        * @private
        */ 
        static VERTEX_SHADER: number;
                            
        /**
        * @private
        */ 
        static FRAGMENT_SHADER: number;
                            
        /**
        * @private
        */ 
        static BLEND: number;
                            
        /**
        * @private
        */ 
        static FLOAT: number;
                            
        /**
        * @private
        */ 
        static CULL_FACE: number;
                            
        /**
        * @private
        */ 
        static FRONT: number;
                            
        /**
        * @private
        */ 
        static BACK: number;
                            
        /**
        * 深度测试
        */ 
        static DEPTH_TEST: number;
                            
        /**
        * 深度缓冲值
        */ 
        static DEPTH_BUFFER_BIT: number;
                                    
        /**
        * @private
        */ 
        static ELEMENT_ARRAY_BUFFER: number;
                                            
        /**
        * @private
        */ 
        static UNSIGNED_SHORT: number;
                                            
        /**
        * @private
        */ 
        static NEAREST: number;
                                            
        /**
        * @private
        */ 
        static REPEAT: number;
                                            
        /**
        * @private
        */ 
        static ONE: number;
                                            
        /**
        * @private
        */ 
        static ZERO: number;
                                            
        /**
        * @private
        */ 
        static SRC_ALPHA: number;
                                            
        /**
        * @private
        */ 
        static ONE_MINUS_SRC_ALPHA: number;
                                            
        /**
        * @private
        */ 
        static SRC_COLOR: number;
                                            
        /**
        * @private
        */ 
        static ONE_MINUS_SRC_COLOR: number;
                                            
        /**
        * @private
        */ 
        static ColorFormat_RGB565: number;
                                            
        /**
        * @private
        */ 
        static ColorFormat_RGBA5551: number;
                                            
        /**
        * @private
        */ 
        static ColorFormat_RGBA4444: number;
                                            
        /**
        * @private
        */ 
        static ColorFormat_RGBA8888: number;
                                            
        /**
        * @private
        */ 
        static ColorFormat_DXT1_RGB: number = 0;
                                            
        /**
        * @private
        */ 
        static ColorFormat_DXT1_RGBA: number = 0;
                                            
        /**
        * @private
        */ 
        static ColorFormat_DXT3_RGBA: number = 0;
                                            
        /**
        * @private
        */ 
        static ColorFormat_DXT5_RGBA: number = 0;

        /**
        * canvas窗口矩形
        */ 
        static canvasRectangle: Rectangle;
                                            
        /**
        * 用户窗口矩形
        */ 
        static clientRect: ClientRect;

        /**
        * @language zh_CN
        * get GPU Context3D 
        * 获取GPU交换链表程序
        * @param GPU_CONFIG
        * @param canvasRec
        * @event call
        */
        static requstContext3D(GPU_CONFIG: string, canvasRec: Rectangle, call: Function) {
            console.log("requst GPU Config", GPU_CONFIG);
            if (!this.context3D || (this.context3D && !this.context3D.isLost)) {
                switch (GPU_CONFIG) {
                    case Egret3DDrive.OpenGLES_2_0:
                        var tapContext3D: WebGLRenderingContext = Egret3DDrive.requestWEBGL(canvasRec)
                        Egret3DDrive.context3D = new Context3DChild_OpenGLES_2_0(tapContext3D);


                        var ext: any = tapContext3D.getExtension('WEBGL_compressed_texture_s3tc');
                        var OES_texture_float: any = tapContext3D.getExtension("OES_texture_float");
                        ///if (!OES_texture_float) {
                        ///    alert("OES_texture_float Texture is not available");
                        ///}
                        ///else
                        ///    alert("OES_texture_float Texture");

                        Egret3DDrive.BLEND = tapContext3D.BLEND;

                        DrawMode.TRIANGLES = tapContext3D.TRIANGLES;
                        DrawMode.POINTS = tapContext3D.POINTS;
                        DrawMode.LINES = tapContext3D.LINES;
                        DrawMode.LINE_STRIP = tapContext3D.LINE_STRIP;

                        Egret3DDrive.FLOAT = tapContext3D.FLOAT
                        Egret3DDrive.VERTEX_SHADER = tapContext3D.VERTEX_SHADER;
                        Egret3DDrive.FRAGMENT_SHADER = tapContext3D.FRAGMENT_SHADER;
                        Egret3DDrive.canvasRectangle = canvasRec;

                        Egret3DDrive.FRONT = tapContext3D.FRONT;
                        Egret3DDrive.BACK = tapContext3D.BACK;

                        Egret3DDrive.DEPTH_BUFFER_BIT = tapContext3D.DEPTH_BUFFER_BIT;
                        Egret3DDrive.ELEMENT_ARRAY_BUFFER = tapContext3D.ELEMENT_ARRAY_BUFFER;
                        Egret3DDrive.UNSIGNED_SHORT = tapContext3D.UNSIGNED_SHORT;

                        Egret3DDrive.NEAREST = tapContext3D.NEAREST;
                        Egret3DDrive.REPEAT = tapContext3D.REPEAT;
                        Egret3DDrive.ONE = tapContext3D.ONE;
                        Egret3DDrive.ZERO = tapContext3D.ZERO;
                        Egret3DDrive.SRC_ALPHA = tapContext3D.SRC_ALPHA;
                        Egret3DDrive.ONE_MINUS_SRC_ALPHA = tapContext3D.ONE_MINUS_SRC_ALPHA;
                        Egret3DDrive.SRC_COLOR = tapContext3D.SRC_COLOR;
                        Egret3DDrive.ONE_MINUS_SRC_COLOR = tapContext3D.ONE_MINUS_SRC_COLOR;;

                        Egret3DDrive.ColorFormat_RGB565 = tapContext3D.RGB565;
                        Egret3DDrive.ColorFormat_RGBA5551 = tapContext3D.RGB5_A1;
                        Egret3DDrive.ColorFormat_RGBA4444 = tapContext3D.RGBA4;
                        Egret3DDrive.ColorFormat_RGBA8888 = tapContext3D.RGBA;

                        Egret3DDrive.DEPTH_TEST = tapContext3D.DEPTH_TEST;
                        Egret3DDrive.CULL_FACE = tapContext3D.CULL_FACE;
                        Egret3DDrive.BLEND = tapContext3D.BLEND;

                        
                        if (ext) {
                            Egret3DDrive.ColorFormat_DXT1_RGB = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
                            Egret3DDrive.ColorFormat_DXT1_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                            Egret3DDrive.ColorFormat_DXT3_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                            Egret3DDrive.ColorFormat_DXT5_RGBA = ext.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                        }

                        ContextSamplerType.TEXTURE_0 = tapContext3D.TEXTURE0;
                        ContextSamplerType.TEXTURE_1 = tapContext3D.TEXTURE1;
                        ContextSamplerType.TEXTURE_2 = tapContext3D.TEXTURE2;
                        ContextSamplerType.TEXTURE_3 = tapContext3D.TEXTURE3;
                        ContextSamplerType.TEXTURE_4 = tapContext3D.TEXTURE4;
                        ContextSamplerType.TEXTURE_5 = tapContext3D.TEXTURE5;
                        ContextSamplerType.TEXTURE_6 = tapContext3D.TEXTURE6;
                        ContextSamplerType.TEXTURE_7 = tapContext3D.TEXTURE7; 
                        ContextSamplerType.TEXTURE_8 = tapContext3D.TEXTURE8;

                        break;
                }
            }

            CheckerboardTexture.texture.upload(Egret3DDrive.context3D);

            console.log("requst GPU Config", Egret3DDrive.context3D);
            ShaderSystemTool.regist(call);
        }

        private static requestWEBGL(viewPort: Rectangle,blend2D:boolean=false): WebGLRenderingContext {
            Egret3DDrive.canvas = document.createElement("canvas");
            Egret3DDrive.canvas.style.position = "absolute";
            Egret3DDrive.canvas.style.zIndex = "0";
            Egret3DDrive.canvas.style.left = "0px";
            Egret3DDrive.canvas.style.top = "0px";
         
            if (document.getElementsByClassName("egret-player").length > 0) {
                document.getElementsByClassName("egret-player")[0].appendChild(this.canvas);
            }
            else {
                document.body.appendChild(this.canvas);
            }

         
            Egret3DDrive.canvas.id = "egret3D";
            Egret3DDrive.canvas["x"] = viewPort.x;
            Egret3DDrive.canvas["y"] = viewPort.y;
            Egret3DDrive.canvas.width = viewPort.width;
            Egret3DDrive.canvas.height = viewPort.height;
            Egret3DDrive.clientRect = Egret3DDrive.canvas.getBoundingClientRect();

            Egret3DDrive.canvas.oncontextmenu = function () {
                return false;
            };

            var gl = <WebGLRenderingContext>this.canvas.getContext("experimental-webgl");
            if (!gl)
                gl = <WebGLRenderingContext>this.canvas.getContext("webgl");

            console.log("this.context3D ==>", this.context3D);
            if (!gl)
                alert("you drivers not suport webgl");
            return gl;
        }

        /**
        * @language zh_CN
        * 请求全屏
        */
        public static requestFullScreen() {
            var dom:HTMLElement = document.documentElement;
            if (dom.requestFullscreen) {
                dom.requestFullscreen();
            } else if (dom.webkitRequestFullScreen) {
                dom.webkitRequestFullScreen();
            }
        }
        
        /**
        * @language zh_CN
        * 退出全屏
        */
        public static  exitFullscreen() {
                var de: Document = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        }
    }
}