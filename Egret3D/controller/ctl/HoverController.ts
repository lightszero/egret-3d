module egret3d {
    export class HoverController extends ControllerBase {
        _currentPanAngle: number = 0;
        _currentTiltAngle: number = 90;

        _panAngle: number = 0;
        _tiltAngle: number = 90;
        _distance: number = 1000;
        _minPanAngle: number = -Infinity;
        _maxPanAngle: number = Infinity;
        _minTiltAngle: number = -90;
        _maxTiltAngle: number = 90;
        _steps: number = 8;
        _yFactor: number = 2;
        _wrapPanAngle: boolean = false;
        _lookAtPosition: Vector3D = new Vector3D(0.0, 0.0, 0.0);
        private _mouseDown: boolean = false;
        private _mouseRightDown: boolean = false;
        private _keyArray: Array<boolean> = new Array<boolean>();
        constructor(targetObject: Object3D = null, lookAtObject: Object3D = null, panAngle: number = 0, tiltAngle: number = 90, distance: number = 100, minTiltAngle: number = -90, maxTiltAngle: number = 90, minPanAngle: number = NaN, maxPanAngle: number = NaN, steps: number = 8, yFactor: number = 2, wrapPanAngle: boolean = false) {
            super(targetObject, lookAtObject);

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

            Input.instance.addListenerMouseMove(() => this.mouseMove());
            Input.instance.addListenerKeyUp((e: number) => this.keyUp(e));
            Input.instance.addListenerKeyDown((e: number) => this.keyDown(e));
            Input.instance.addListenerMouseWheel(() => this.mouseWheel());

            Input.instance.addListenerSwipe(() => this.mouseMove());
        }


        private mouseWheel() {
            this._distance -= Input.instance.wheelDelta * 0.1; 
        }

        private keyDown(key: number) {
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
        private mouseMove() {
            //Input.instance.mouseLastX
            if ( this._mouseDown ){
                this._tiltAngle += Input.instance.mouseOffsetY * 0.1;
                if (this._tiltAngle > 60) {
                    this._tiltAngle = 60;
                }
                
                if (this._tiltAngle < -60) {
                    this._tiltAngle = -60;
                }
                this._panAngle += Input.instance.mouseOffsetX * 0.1;
            }
        }

        public get lookAtPosition(): Vector3D {
            return this._lookAtPosition;
        }

        public set lookAtPosition(val: Vector3D) {
            this._lookAtPosition = val; 
            this.notifyUpdate();
        }

        public get steps(): number {
            return this._steps ;
        }

        public set steps(val: number) {
            val = (val < 1) ? 1 : val;
            if (this._steps == val)
                return;
            this._steps = val;
            this.notifyUpdate();
        }
		
		/**
		 * Rotation of the camera in degrees around the y axis. Defaults to 0.
		 */
        public get panAngle(): number {
            return this._panAngle;
        }

        public set panAngle(val: number) {
            val = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, val));
            if (this._panAngle == val)
                return;
            this._panAngle = val;
            this.notifyUpdate();
        }
		
		/**
		 * Elevation angle of the camera in degrees. Defaults to 90.
		 */
        public get tiltAngle(): number {
            return this._tiltAngle;
        }

        public set tiltAngle(val: number) {
            val = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, val));
            if (this._tiltAngle == val)
                return;
            this._tiltAngle = val;
            this.notifyUpdate();
        }
		
        public get distance(): number {
            return this._distance;
        }

        public set distance(val: number) {
            if (this._distance == val)
                return;
            this._distance = val;
            this.notifyUpdate();
        }
		
        public get minPanAngle(): number {
            return this._minPanAngle;
        }

        public set minPanAngle(val: number) {
            if (this._minPanAngle == val)
                return;
            this._minPanAngle = val;
            this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
        }
		
        public get maxPanAngle(): number {
            return this._maxPanAngle;
        }

        public set maxPanAngle(val: number) {
            if (this._maxPanAngle == val)
                return;
            this._maxPanAngle = val;
            this.panAngle = Math.max(this._minPanAngle, Math.min(this._maxPanAngle, this._panAngle));
        }
		
        public get minTiltAngle(): number {
            return this._minTiltAngle;
        }

        public set minTiltAngle(val: number) {
            if (this._minTiltAngle == val)
                return;
            this._minTiltAngle = val;
            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        }
		
        public get maxTiltAngle(): number {
            return this._maxTiltAngle;
        }

        public  set maxTiltAngle(val: number) {
            if (this._maxTiltAngle == val)
                return;
            this._maxTiltAngle = val;
            this.tiltAngle = Math.max(this._minTiltAngle, Math.min(this._maxTiltAngle, this._tiltAngle));
        }
		
		/**
		 * Fractional difference in distance between the horizontal camera orientation and vertical camera orientation. Defaults to 2.
		 *
		 * @see    #distance
		 */
        public  get yFactor(): number {
            return this._yFactor;
        }

        public  set yFactor(val: number) {
            if (this._yFactor == val)
                return;
            this._yFactor = val;
            this.notifyUpdate();
        }
		
        public  get wrapPanAngle(): boolean {
            return this._wrapPanAngle;
        }

        public set wrapPanAngle(val: boolean) {
            if (this._wrapPanAngle == val)
                return;
            this._wrapPanAngle = val;
            this.notifyUpdate();
        }
        
        public update(interpolate: boolean = true): void {
            if (this._tiltAngle != this._currentTiltAngle || this._panAngle != this._currentPanAngle) {
                this.notifyUpdate();
                if (this._wrapPanAngle) {
                    if (this._panAngle < 0)
                        this._panAngle = (this._panAngle % 360) + 360;
                    else
                        this._panAngle = this._panAngle % 360;

                    if (this._panAngle - this._currentPanAngle < -180)
                        this._currentPanAngle -= 360;
                    else if (this._panAngle - this._currentPanAngle > 180)
                        this._currentPanAngle += 360;
                }

                if (interpolate) {
                    this._currentTiltAngle += (this._tiltAngle - this._currentTiltAngle) / (this.steps + 1);
                    this._currentPanAngle += (this._panAngle - this._currentPanAngle) / (this.steps + 1);
                } else {
                    this._currentPanAngle = this._panAngle;
                    this._currentTiltAngle = this._tiltAngle;
                }
				
                //snap coords if angle differences are close
                if ((Math.abs(this._tiltAngle - this._currentTiltAngle) < 0.01) && (Math.abs(this._panAngle - this._currentPanAngle) < 0.01)) {
                    this._currentTiltAngle = this._tiltAngle;
                    this._currentPanAngle = this._panAngle;
                }
            }

            var pos: Vector3D = (this._lookAtObject) ? this._lookAtObject.position : (this._lookAtPosition) ? this._lookAtPosition : this._origin;
            var p: Vector3D = new Vector3D();
            p.x = pos.x + this.distance * Math.sin(this._currentPanAngle * MathUtil.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * MathUtil.DEGREES_TO_RADIANS);
            p.z = pos.z + this.distance * Math.cos(this._currentPanAngle * MathUtil.DEGREES_TO_RADIANS) * Math.cos(this._currentTiltAngle * MathUtil.DEGREES_TO_RADIANS);
            p.y = pos.y + this.distance * Math.sin(this._currentTiltAngle * MathUtil.DEGREES_TO_RADIANS) * this.yFactor;
            
            if (this._target) {
                if (this._lookAtPosition)
                    this._target.lookAt(p, this._lookAtPosition);
                //else if (this._lookAtObject) 
                //    this._target.lookAt(pos, this._lookAtObject.position); //this._lookAtObject.parent ? this._lookAtObject.getScreenPosition() : 
            }

        }
    }
}