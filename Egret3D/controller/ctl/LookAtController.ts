module egret3d {
    
    /**
    * @class egret3d.LookAtController
    * @classdesc
    * look at 摄像机控制器 。</p>
    * 指定摄像机看向的目标对象。</p>
    * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
    * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
    * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
    *
    * @includeExample controller/ctl/LookAtController.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class LookAtController extends ControllerBase{

        protected _lookAtObject:Object3D;
        protected _origin: Vector3D = new Vector3D(0.0, 0.0, 0.0);
        protected _lookAtPosition: Vector3D = new Vector3D();

        private _eyesPos: Vector3D = new Vector3D();
        private _up: Vector3D = Vector3D.Y_AXIS;

        private _eyesLength: number = 0;
        private _rotaEyesLine: Vector3D = new Vector3D(0, 0, 1);
        private _rotaAngle: Vector3D = new Vector3D();

        private _matRot: Matrix4_4 = new Matrix4_4();
        private _quaRot: Quaternion = new Quaternion();

        private _tempVec: Vector3D = new Vector3D();
        private _matTemp: Matrix4_4 = new Matrix4_4();

        private _mouseDown: boolean = false;
        private _mouseRightDown: boolean = false;

        private _screenMoveStartDetail: Point = new Point();
        private _screenMoveDelay: Point = new Point();

        private _isUpdate: boolean = false;

        private _elapsed: number = 0;
        private _speed: number = 3;
        private _xAngle: number = 0;

        private _keyArray: Array<boolean> = new Array<boolean>();

        /**
        * @language zh_CN
        * 目标点偏移
        * @version Egret 3.0
        * @platform Web,Native
        */
        public lookAtOffset: Vector3D = new Vector3D(0, 0, 0);

        /**
        * @language zh_CN
        * 是否第一人称相机
        * @version Egret 3.0
        * @platform Web,Native
        */
        public firstCamera: boolean = false;

        /**
        * @language zh_CN
        * 控制的目标相机，目标对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(targetObject: Object3D = null, lookAtObject: Object3D = null)
        {
            super(targetObject);

            this._keyArray.push(false);
            this._keyArray.push(false);
            this._keyArray.push(false);
            this._keyArray.push(false);

            if (lookAtObject)
                this.lookAtObject = lookAtObject;
            else
                this.lookAtPosition = new Vector3D();

            this._eyesPos.copyFrom(targetObject.position);
            this._lookAtPosition.copyFrom(lookAtObject.position.add(this.lookAtOffset));

            this._target.lookAt(this._eyesPos, this._lookAtPosition);

            Input.instance.addListenerMouseWheel(() => this.mouseWheel());

            Input.instance.addListenerMouseMove(() => this.mouseMove());

            Input.instance.addListenerKeyUp((e:number) => this.keyUp(e));
            Input.instance.addListenerKeyDown((e: number) => this.keyDown(e));

            Input.instance.addListenerSwipe(() => this.mouseMove());
        }


        private mouseWheel() {
            this.setEyesLength(this._eyesLength - Input.instance.wheelDelta * 0.1);
        }

        private mouseMove() {
            if (this._mouseDown) {
                this._rotaAngle.y += Input.instance.mouseOffsetX;
                this._rotaAngle.x += Input.instance.mouseOffsetY;

                this._rotaAngle.y %= 360;
                this._rotaAngle.x %= 360;
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
        public  get lookAtPosition(): Vector3D {

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
        public  set lookAtPosition(val: Vector3D) {

            if (this._lookAtObject)
                this._lookAtObject = null;

            this._lookAtPosition.copyFrom(val.add(this.lookAtOffset));
            
            this.notifyUpdate();
        }

        /**
        * @language zh_CN
        *  
        * 返回目标对象
        * @returns 目标对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public  get lookAtObject(): Object3D {

            return this._lookAtObject;
        }

        /**
        * @language zh_CN
        *  
        * 设置目标对象
        * @param val 目标
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set lookAtObject(val: Object3D) {

            if (this._lookAtObject == val)
                return;

            this._lookAtObject = val;
            this._lookAtPosition.copyFrom(this._lookAtObject.position.add(this.lookAtOffset));

            this.notifyUpdate();
        }

        /**
        * @language zh_CN
        * 设置目标和相机的距离
        * @param length 距离
        * @version Egret 3.0
        * @platform Web,Native
        */
        public setEyesLength(length: number) {

            this._eyesLength = length;
            if (this._eyesLength < 1) {
                this._eyesLength = 1;
            }
        }
        
        /**
        * @language zh_CN
        * 设置相机x轴旋转
        * @param x 旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationX(x: number) {
            this._rotaAngle.x = x;
        }
        
        /**
        * @language zh_CN
        * 设置相机y轴旋转
        * @param y 旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationY(y: number) {
            this._rotaAngle.y = y;
        }
        
        /**
        * @language zh_CN
        * 设置相机z轴旋转
        * @param z 旋转角度
        * @version Egret 3.0
        * @platform Web,Native
        */
        public set rotationZ(z: number) {
            this._rotaAngle.z = z;
        }

        /**
        * @language zh_CN
        * 控制器数据更新
        * @version Egret 3.0
        * @platform Web,Native
        */
        public update() {
           
            if (this._target) {

                if (this._target.isController == false) {
                    return;
                }

                if (this._keyArray[0]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._tempVec.y = 0;
                    this._tempVec.normalize();
                    this._tempVec.scaleBy(this._speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.add(this._tempVec));
                    this._lookAtObject.position = this._tempVec;

                }

                if (this._keyArray[1]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._matTemp.identity();
                    this._matTemp.appendRotation(90, Vector3D.Y_AXIS);
                    this._tempVec.copyFrom(this._matTemp.transformVector(this._tempVec));
                    this._tempVec.y = 0;
                    this._tempVec.normalize();
                    this._tempVec.scaleBy(this._speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.subtract(this._tempVec));
                    this._lookAtObject.position = this._tempVec;
                }

                if (this._keyArray[2]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._tempVec.y = 0;
                    this._tempVec.normalize();

                    this._tempVec.scaleBy(this._speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.subtract(this._tempVec));
                    this._lookAtObject.position = this._tempVec;
                }

                if (this._keyArray[3]) {
                    this._tempVec.copyFrom(this._rotaEyesLine);
                    this._matTemp.identity();
                    this._matTemp.appendRotation(90, Vector3D.Y_AXIS);
                    this._tempVec.copyFrom(this._matTemp.transformVector(this._tempVec));
                    this._tempVec.y = 0;
                    this._tempVec.normalize();

                    this._tempVec.scaleBy(this._speed);
                    this._tempVec.copyFrom(this._lookAtObject.position.add(this._tempVec));
                    this._lookAtObject.position = this._tempVec;
                }
                this._quaRot.fromEulerAngles(this._rotaAngle.x, this._rotaAngle.y, 0);
                this._rotaEyesLine.copyFrom(this._quaRot.rotatePoint(Vector3D.Z_AXIS));
                this._rotaEyesLine.normalize();

                this._tempVec.copyFrom(this._rotaEyesLine);
                this._tempVec.scaleBy(this._eyesLength);
                this._eyesPos.copyFrom(this._lookAtPosition.subtract(this._tempVec));

                if (this._lookAtObject) {
                    this._lookAtPosition.copyFrom(this._lookAtObject.position.add(this.lookAtOffset));
                }

                this._quaRot.fromEulerAngles(this._rotaAngle.x, this._rotaAngle.y, this._rotaAngle.z);
                this._tempVec.copyFrom(this._up);
                this._tempVec.copyFrom(this._quaRot.rotatePoint(this._tempVec));
                this._tempVec.normalize();

                if (this.firstCamera) {
                    this._lookAtObject.rotationY = this._rotaAngle.y;
                    this._lookAtObject.rotationX = this._rotaAngle.x;
                }

                this._target.lookAt(this._eyesPos, this._lookAtPosition, this._tempVec);
            }
        }

        private keyDown(key:number) {
            switch (key) {
                case KeyCode.Key_W:///w
                    this._keyArray[0] = true;
                    break;
                case KeyCode.Key_A:///a
                    this._keyArray[1] = true;
                    break;
                case KeyCode.Key_S:///s
                    this._keyArray[2] = true;
                    break;
                case KeyCode.Key_D:///d
                    this._keyArray[3] = true;
                    break;
                case KeyCode.Key_Mouse_Left:
                    this._mouseDown = true;
                    break;
                case KeyCode.Key_Mouse_Right:
                    this._mouseRightDown = true;
                    break;
            }
        }

        private keyUp(key: number) {
            switch (key) {
                case KeyCode.Key_W:///w
                    this._keyArray[0] = false;
                    break;
                case KeyCode.Key_A:///a    
                    this._keyArray[1] = false;           
                    break;
                case KeyCode.Key_S:///s        
                    this._keyArray[2] = false;      
                    break;
                case KeyCode.Key_D:///d   
                    this._keyArray[3] = false;           
                    break;
                case KeyCode.Key_Mouse_Left:
                    this._mouseDown = false;
                    break;
                case KeyCode.Key_Mouse_Right:
                    this._mouseRightDown = false;
                    break;
            }
        }
    }
} 