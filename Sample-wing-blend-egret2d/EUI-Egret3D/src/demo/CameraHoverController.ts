class Finger {
    public touchID: number = -1;
    public mouseX: number = 0 ;
    public mouseY: number = 0 ;
    
    public mouseOffsetX: number = 0 ;
    public mouseOffsetY: number = 0 ;
    
    public mouseLastX: number = 0;
    public mouseLastY: number = 0;
}
    /**
     *
     * @author 
     *
     */
    class CameraHoverController extends egret3d.ControllerBase{
        private _currentPanAngle: number = 0;
        private _currentTiltAngle: number = 90;

        private _panAngle: number = 0;
        private _tiltAngle: number = 90;
        private _distance: number = 1000;
        private _minPanAngle: number = -Infinity;
        private _maxPanAngle: number = Infinity;
        private _minTiltAngle: number = -90;
        private _maxTiltAngle: number = 90;
        private _maxDistance: number = 5000;
        private _minDistance: number = -5000;
        private _steps: number = 8;
        private _yFactor: number = 2;
        private _wrapPanAngle: boolean = false;
        private _lookAtPosition: egret3d.Vector3D = new egret3d.Vector3D(0.0,0.0,0.0);
        private _mouseDown: boolean = false;
        private _mouseRightDown: boolean = false;
        private _keyArray: Array<boolean> = new Array<boolean>();
        
        public mouseX: number = 0;
        public mouseY: number = 0;
        public wheelDelta: number = 0;
        public mouseOffsetX: number = 0;
        public mouseOffsetY: number = 0;
        public mouseLastX: number = 0; 
        public mouseLastY: number = 0;
        private _oldPosition1: egret3d.Point = null;
        private _oldPosition2: egret3d.Point = null;
        
        constructor(targetObject: egret3d.Object3D = null,lookAtObject: egret3d.Object3D = null,panAngle: number = 0,tiltAngle: number = 90,distance: number = 100,minTiltAngle: number = -90,maxTiltAngle: number = 90,minPanAngle: number = NaN,maxPanAngle: number = NaN,steps: number = 8,yFactor: number = 2,wrapPanAngle: boolean = false) {
            super(targetObject,lookAtObject);

            this.distance = distance;
            this.panAngle = panAngle;
            this.tiltAngle = tiltAngle;
            this.minPanAngle = minPanAngle || -Infinity;
            this.maxPanAngle = maxPanAngle || Infinity;
            this.minTiltAngle = minTiltAngle;
            this.maxTiltAngle = maxTiltAngle;
            this.steps = steps;
            this.yFactor = yFactor;
            this.wrapPanAngle = wrapPanAngle;
			
            //values passed in contrustor are applied immediately
            this._currentPanAngle = this._panAngle;
            this._currentTiltAngle = this._tiltAngle;

            egret3d.Input.instance.addListenerMouseMove(() => this.pcmouseMove());
            egret3d.Input.instance.addListenerKeyUp((e: number) => this.keyUp(e));
            egret3d.Input.instance.addListenerKeyDown((e: number) => this.keyDown(e));
            egret3d.Input.instance.addListenerMouseWheel(() => this.pcmouseWheel());
        }
        
        private pcmouseWheel() {
            this._distance -= egret3d.Input.instance.wheelDelta * 0.1;
            this._distance = Math.max(this._minDistance,Math.min(this._maxDistance,this._distance));
        }
        
        private pcmouseMove() {
            if(this._mouseDown) {
                this._tiltAngle += egret3d.Input.instance.mouseOffsetY * 0.1;
                this._tiltAngle = Math.max(this._minTiltAngle,Math.min(this._maxTiltAngle,this._tiltAngle))

                this._panAngle += egret3d.Input.instance.mouseOffsetX * 0.1;
                this._panAngle = Math.max(this._minPanAngle,Math.min(this._maxPanAngle,this._panAngle))
            }
        }
        
        public useEventDis(e: any) {
            e.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchStart,this);
            e.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this);
            e.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);

        }
        private a: Finger = new Finger() ;
        private b: Finger = new Finger() ;
        private touchStart(e: egret.TouchEvent) {
//            egret3d.Debug.instance.trace("touchStart");
            if(this.a.touchID == -1) {
                this.a.touchID = e.touchPointID;
                this.a.mouseX = e.stageX;
                this.a.mouseY = e.stageY;
            } else if(this.b.touchID == -1) {
                this.b.touchID = e.touchPointID;
                this.b.mouseX = e.stageX;
                this.b.mouseY = e.stageY;
            }
            this._mouseDown = true ;
        }

        private touchEnd(e: egret.TouchEvent) {
//            egret3d.Debug.instance.trace("touchEnd");
            if(this.a.touchID == e.touchPointID) {
                this.a.touchID = -1;
                this.a.mouseX = e.stageX;
                this.a.mouseY = e.stageY;
            } else if(this.b.touchID == e.touchPointID) {
                this.b.touchID = -1;
                this.b.mouseX = e.stageX;
                this.b.mouseY = e.stageY;
            }
            this._mouseDown = false;
        }
   
        private touchMove(e: egret.TouchEvent) {
           // egret3d.Debug.instance.trace(e.touchPointID.toString());
            if(this.a.touchID == e.touchPointID) {
                
                this.a.mouseLastX = this.a.mouseX;
                this.a.mouseLastY = this.a.mouseY;

                this.mouseOffsetX = this.a.mouseOffsetX = e.stageX - this.a.mouseLastX;
                this.mouseOffsetY = this.a.mouseOffsetY = e.stageY - this.a.mouseLastY;
                
                this.a.mouseX = e.stageX;
                this.a.mouseY = e.stageY;
                
            } else if( this.b.touchID == e.touchPointID ) {
                this.b.mouseLastX = this.b.mouseX;
                this.b.mouseLastY = this.b.mouseY;

                this.b.mouseOffsetX = this.mouseOffsetX = e.stageX - this.b.mouseLastX;
                this.b.mouseOffsetY = this.mouseOffsetY = e.stageY - this.b.mouseLastY;

                this.b.mouseX = e.stageX;
                this.b.mouseY = e.stageY;
            }

            if(this.a.touchID != -1 && this.b.touchID != -1) {
                var newPosition1: egret3d.Point = new egret3d.Point(this.a.mouseX,this.a.mouseY);
                var newPosition2: egret3d.Point = new egret3d.Point(this.b.mouseX,this.b.mouseY);

                if(this._oldPosition1 == null)
                    this._oldPosition1 = newPosition1;
                if(this._oldPosition2 == null)
                    this._oldPosition2 = newPosition2;

                var value: number = this.isEnlarge(this._oldPosition1,this._oldPosition2,newPosition1,newPosition2);
                if(value == 1)
                    this.wheelDelta = 80;
                else if(value == -1)
                    this.wheelDelta = -80;

                this._oldPosition1 = newPosition1;
                this._oldPosition2 = newPosition2;
                this.mouseWheel(); 
            } else {
                this.mouseMove();
            }
        }
        
        private isEnlarge(op1: egret3d.Point,op2: egret3d.Point,np1: egret3d.Point,np2: egret3d.Point): number {
            //函数传入上一次触摸两点的位置与本次触摸两点的位置计算出用户的手势
            var leng1 = Math.sqrt((op1.x - op2.x) * (op1.x - op2.x) + (op1.y - op2.y) * (op1.y - op2.y));
            var leng2 = Math.sqrt((np1.x - np2.x) * (np1.x - np2.x) + (np1.y - np2.y) * (np1.y - np2.y));

            if(Math.abs(leng1 - leng2)>2){
                if(leng1 < leng2) {
                    //放大手势
                    return 1;
                } else {
                    //缩小手势
                    return -1;
                }
            }else{
                return 0 ;
            }
        }
        
        private mouseWheel() {
            this._distance -= this.wheelDelta * 0.1;
            this._distance = Math.max(this._minDistance,Math.min(this._maxDistance,this._distance));
        }

        private keyDown(key: number) {
            switch(key) {
                case egret3d.KeyCode.Key_W:///w
                    this._keyArray[0] = true;
                    break;
                case egret3d.KeyCode.Key_A:///a
                    this._keyArray[1] = true;
                    break;
                case egret3d.KeyCode.Key_S:///s
                    this._keyArray[2] = true;
                    break;
                case egret3d.KeyCode.Key_D:///d
                    this._keyArray[3] = true;
                    break;
                case egret3d.KeyCode.Key_Mouse_Left:
                    this._mouseDown = true;
                    break;
                case egret3d.KeyCode.Key_Mouse_Right:
                    this._mouseRightDown = true;
                    break;
            }
        }

        private keyUp(key: number) {
            switch(key) {
                case egret3d.KeyCode.Key_W:///w
                    this._keyArray[0] = false;
                    break;
                case egret3d.KeyCode.Key_A:///a    
                    this._keyArray[1] = false;
                    break;
                case egret3d.KeyCode.Key_S:///s        
                    this._keyArray[2] = false;
                    break;
                case egret3d.KeyCode.Key_D:///d   
                    this._keyArray[3] = false;
                    break;
                case egret3d.KeyCode.Key_Mouse_Left:
                    this._mouseDown = false;
                    break;
                case egret3d.KeyCode.Key_Mouse_Right:
                    this._mouseRightDown = false;
                    break;
            }
        }
        private mouseMove() {
            if(this._mouseDown) {
                this._tiltAngle += this.mouseOffsetY * 0.1;
                this._tiltAngle = Math.max(this._minTiltAngle,Math.min(this._maxTiltAngle,this._tiltAngle))

                this._panAngle += this.mouseOffsetX * 0.1;
                this._panAngle = Math.max(this._minPanAngle,Math.min(this._maxPanAngle,this._panAngle))
            }
        }
        
        /**
        * @language zh_CN
        * 返回目标的位置
        *  
        * @returns 目标的位置
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get lookAtPosition(): egret3d.Vector3D {
            return this._lookAtPosition;
        }
        
        /**
        * @language zh_CN
        * 设置目标坐标
        *  
        * @param val 摄像机看向的目标点
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set lookAtPosition(val: egret3d.Vector3D) {
            this._lookAtPosition = val;
            this.notifyUpdate();
        }
                
        /**
        * @private
        */
        public get steps(): number {
            return this._steps;
        }
                        
        /**
        * @private
        */
        public set steps(val: number) {
            val = (val < 1) ? 1 : val;
            if(this._steps == val)
                return;
            this._steps = val;
            this.notifyUpdate();
        }
                        
        /**
        * @language zh_CN
        * 得到相机y轴旋转角度
        * @returns 相机y轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get panAngle(): number {
            return this._panAngle;
        }
                
        /**
        * @language zh_CN
        * 设置相机y轴旋转
        * @param val 旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set panAngle(val: number) {
            val = Math.max(this._minPanAngle,Math.min(this._maxPanAngle,val));
            if(this._panAngle == val)
                return;
            this._panAngle = val;
            this.notifyUpdate();
        }
                        
        /**
        * @language zh_CN
        * 得到相机x轴旋转角度
        * @returns 相机x轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get tiltAngle(): number {
            return this._tiltAngle;
        }
                
        /**
        * @language zh_CN
        * 设置相机x轴旋转
        * @param val 旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set tiltAngle(val: number) {
            val = Math.max(this._minTiltAngle,Math.min(this._maxTiltAngle,val));
            if(this._tiltAngle == val)
                return;
            this._tiltAngle = val;
            this.notifyUpdate();
        }
		        
        /**
        * @language zh_CN
        * 得到目标和相机的距离
        * @returns 目标和相机的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get distance(): number {
            return this._distance;
        }
        
        /**
        * @language zh_CN
        * 设置目标和相机的距离
        * @param val 距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set distance(val: number) {
            if(this._distance == val)
                return;
            this._distance = this._distance = Math.max(this._minDistance,Math.min(this._maxDistance,val));
            this.notifyUpdate();
        }
		                        
        /**
        * @language zh_CN
        * 得到相机最小y轴旋转角度
        * @returns 相机最小x轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get minPanAngle(): number {
            return this._minPanAngle;
        }
        		                        
        /**
        * @language zh_CN
        * 设置相机最小y轴旋转角度
        * @param val 相机最小x轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set minPanAngle(val: number) {
            if(this._minPanAngle == val)
                return;
            this._minPanAngle = val;
            this.panAngle = Math.max(this._minPanAngle,Math.min(this._maxPanAngle,this._panAngle));
        }
				                        
        /**
        * @language zh_CN
        * 得到相机最大y轴旋转角度
        * @returns 相机最大y轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get maxPanAngle(): number {
            return this._maxPanAngle;
        }
                		                        
        /**
        * @language zh_CN
        * 设置相机最大y轴旋转角度
        * @param val 相机最大y轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set maxPanAngle(val: number) {
            if(this._maxPanAngle == val)
                return;
            this._maxPanAngle = val;
            this.panAngle = Math.max(this._minPanAngle,Math.min(this._maxPanAngle,this._panAngle));
        }
				                        
        /**
        * @language zh_CN
        * 得到相机最小x轴旋转角度
        * @returns 相机最小x轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get minTiltAngle(): number {
            return this._minTiltAngle;
        }
                		                        
        /**
        * @language zh_CN
        * 设置相机最小x轴旋转角度
        * @param val 相机最小x轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set minTiltAngle(val: number) {
            if(this._minTiltAngle == val)
                return;
            this._minTiltAngle = val;
            this.tiltAngle = Math.max(this._minTiltAngle,Math.min(this._maxTiltAngle,this._tiltAngle));
        }
						                        
        /**
        * @language zh_CN
        * 得到相机最大x轴旋转角度
        * @returns 相机最大x轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get maxTiltAngle(): number {
            return this._maxTiltAngle;
        }
                        		                        
        /**
        * @language zh_CN
        * 设置相机最大x轴旋转角度
        * @param val 相机最大x轴旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set maxTiltAngle(val: number) {
            if(this._maxTiltAngle == val)
                return;
            this._maxTiltAngle = val;
            this.tiltAngle = Math.max(this._minTiltAngle,Math.min(this._maxTiltAngle,this._tiltAngle));
        }
		                        		                        
        /**
        * @language zh_CN
        * 设置相机和目标最大的距离
        * @param val 相机和目标最大的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set maxDistance(val: number) {
            if(this._maxDistance == val)
                return;
            this._maxDistance = val;
            this._distance = Math.max(this._minDistance,Math.min(this._maxDistance,this._distance));
        }
        		                        		                        
        /**
        * @language zh_CN
        * 得到相机和目标最大的距离
        * @returns 相机和目标最大的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get maxDistance(): number {
            return this._maxDistance;
        }
        		                        		                        
        /**
        * @language zh_CN
        * 设置相机和目标最小的距离
        * @param val 相机和目标最小的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set minDistance(val: number) {
            if(this._minDistance == val)
                return;
            this._minDistance = val;
            this._distance = Math.max(this._minDistance,Math.min(this._maxDistance,this._distance));
        }
                		                        		                        
        /**
        * @language zh_CN
        * 得到相机和目标最小的距离
        * @returns 相机和目标最小的距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public get minDistance(): number {
            return this._maxDistance;
        }

        /**
        * @private
        */
        public get yFactor(): number {
            return this._yFactor;
        }

        /**
        * @private
        */
        public set yFactor(val: number) {
            if(this._yFactor == val)
                return;
            this._yFactor = val;
            this.notifyUpdate();
        }
		
        /**
        * @private
        */
        public get wrapPanAngle(): boolean {
            return this._wrapPanAngle;
        }
        
        /**
        * @private
        */
        public set wrapPanAngle(val: boolean) {
            if(this._wrapPanAngle == val)
                return;
            this._wrapPanAngle = val;
            this.notifyUpdate();
        }

        /**
        * @language zh_CN
        * 控制器数据更新
        * @param interpolate
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update(interpolate: boolean = true): void {
            if(this._tiltAngle != this._currentTiltAngle || this._panAngle != this._currentPanAngle) {
                this.notifyUpdate();
                if(this._wrapPanAngle) {
                    if(this._panAngle < 0)
                        this._panAngle = (this._panAngle % 360) + 360;
                    else
                        this._panAngle = this._panAngle % 360;

                    if(this._panAngle - this._currentPanAngle < -180)
                        this._currentPanAngle -= 360;
                    else if(this._panAngle - this._currentPanAngle > 180)
                        this._currentPanAngle += 360;
                }

                if(interpolate) {
                    this._currentTiltAngle += (this._tiltAngle - this._currentTiltAngle) / (this.steps + 1);
                    this._currentPanAngle += (this._panAngle - this._currentPanAngle) / (this.steps + 1);
                } else {
                    this._currentPanAngle = this._panAngle;
                    this._currentTiltAngle = this._tiltAngle;
                }
				
                //snap coords if angle differences are close
                if((Math.abs(this._tiltAngle - this._currentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._currentPanAngle) < 0.01)) {
                    this._currentTiltAngle = this._tiltAngle;
                    this._currentPanAngle = this._panAngle;
                }
            }

            var pos: egret3d.Vector3D = (this._lookAtObject) ? this._lookAtObject.position : (this._lookAtPosition) ? this._lookAtPosition : this._origin;
            var p: egret3d.Vector3D = new egret3d.Vector3D();
            p.x = pos.x + this.distance * Math.sin(this._currentPanAngle * egret3d.MathUtil.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * egret3d.MathUtil.DEGREES_TO_RADIANS);
            p.z = pos.z + this.distance * Math.cos(this._currentPanAngle * egret3d.MathUtil.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * egret3d.MathUtil.DEGREES_TO_RADIANS);
            p.y = pos.y + this.distance * Math.sin(this._currentTiltAngle * egret3d.MathUtil.DEGREES_TO_RADIANS) * this.yFactor;

            if(this._target) {
                if(this._lookAtPosition)
                    this._target.lookAt(p,this._lookAtPosition);
                //else if (this._lookAtObject) 
                //    this._target.lookAt(pos, this._lookAtObject.position); //this._lookAtObject.parent ? this._lookAtObject.getScreenPosition() : 
            }
        }
    }

 