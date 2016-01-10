module egret3d {

    /**
    * @private
    * @class egret3d.ControllerBase
    * @classdesc
    * 控制器 基类, 抽象控制器的一些数据
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class ControllerBase {
        protected _autoUpdate:boolean = true;
        protected _target: Object3D;
        protected _lookAtObject: Object3D;
        protected _origin:Vector3D = new Vector3D(0.0, 0.0, 0.0);
        /**
        * @language zh_CN
        * 构造函数
        * @param targetObject 控制的目标
        */
        constructor(targetObject: Object3D = null,lookAtObject:Object3D = null) {
            this._target = targetObject;
            this._lookAtObject = lookAtObject;
        }

        /**
        * @language zh_CN
        *  
        * @returns 返回当前的目标
        */
        public get target(): Object3D {

            return this._target;
        }

        /**
        * @language zh_CN
        *  
        * @param val 当前的目标
        */
        public set target(val: Object3D) {

            if (this._target == val)
                return;

            ///if (this._target && _autoUpdate)
            ///    this._target._controller = null;

            this._target = val;

            ///if (this._target && _autoUpdate)
            ///    this._target._controller = this;

            ///notifyUpdate();
        }

        /**
        * @language zh_CN
        *  
        * @returns 是否自动更新
        */
        public get autoUpdate(): boolean {

            return this._autoUpdate;
        }

        /**
        * @language zh_CN
        *  
        * @param val 是否自动更新
        */
        public set autoUpdate(val: boolean) {

            if (this._autoUpdate == val)
                return;

            this._autoUpdate = val;
        }


        protected  notifyUpdate()
		{
            ///if (_targetObject && _targetObject.implicitPartition && _autoUpdate)
            ///    _targetObject.implicitPartition.markForUpdate(_targetObject);
        }

        /**
        * @language zh_CN
        * 数据更新
        */
        public  update(){
            ///throw null ;
        }
    }
}