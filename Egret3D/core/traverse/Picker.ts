module egret3d{

    /**
    * @class egret3d.Picker
    * @classdesc
    * @version Egret 3.0
    * @platform Web,Native
    * 射线对场景中的实体对像进行检测
    *
    * @see egret3d.geom.Ray
    *
    * 示例:鼠标拣选模型,拣选到的进行绕Y轴旋转
    * @includeExample egret3d/core/traverse/Picker.ts
    */
    export class Picker {
        protected static ray: Ray = new Ray();
                                                        
        /**
        * @language zh_CN
        * 返回鼠标拾取对象得到的所有对象,调用之前到设置被拣选对象的pickType.
        * @param camera 当前相机
        * @param objects 检测的对象列表
        * @returns 拾取的object列表
        */
        public static pickObject3DList(camera: Camera3D, objects: Array<Object3D>): Array<Object3D> {
            var ret: Array<Object3D> = new Array<Object3D>();
            var ray: Ray = this.ray;
            ray.CalculateAndTransformRay(Egret3DDrive.canvasRectangle.width, Egret3DDrive.canvasRectangle.height, camera.modelMatrix, camera.projectMatrix, Input.instance.mouseX, Input.instance.mouseY);
            for (var i: number = 0; i < objects.length; ++i) {
                var mesh: egret3d.Mesh = <egret3d.Mesh>objects[i];
                var inPos: Vector3D = new Vector3D();
                switch (mesh.pickType) {
                    case PickType.BoundPick:
                        if (mesh.box != null) {
                            if (ray.IntersectMesh(mesh.box.vexData, mesh.box.indexData, 3, mesh.box.indexData.length / 3, 0, mesh.modelMatrix, mesh.pickerData)) {
                                var target: PickResult = new PickResult();
                                ret.push(objects[i]);
                            }
                        }
                        break;
                    case PickType.PositionPick:
                        if (ray.IntersectMeshEx(mesh, 13, mesh.pickerData)) {
                            var target: PickResult = new PickResult();
                            ret.push(objects[i]);
                        }
                        break;
                    case PickType.UVPick:
                        if (ray.IntersectMeshEx(mesh, 13, mesh.pickerData)) {
                            var target: PickResult = new PickResult();
                            ret.push(objects[i]);
                        }
                        break;
                }
            }
            return ret;
        }
    }
}