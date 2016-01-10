var Sample_BlendTerrain = (function () {
    function Sample_BlendTerrain(width, height) {
        var _this = this;
        if (width === void 0) { width = 800; }
        if (height === void 0) { height = 600; }
        this._time = 0;
        this._delay = 0;
        this._timeDate = null;
        this._view3D = null;
        this._viewPort = null;
        this._cameraCtl = null;
        this._wireframeMesh = null;
        this._enableWireframe = false;
        this._viewPort = new egret3d.Rectangle(0, 0, width, height);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, this._viewPort, function () { return _this.onInit3D(); });
    }
    var d = __define,c=Sample_BlendTerrain;p=c.prototype;
    p.onInit3D = function () {
        var _this = this;
        //创建View3D对象;
        this._view3D = new egret3d.View3D(this._viewPort);
        //创建像机控制器;
        this._cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());
        //设置像机视野距离;
        this._cameraCtl.setEyesLength(100);
        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addLoadTexture("sky/Mars_skybox_front.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("sky/Mars_skybox_back.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("sky/Mars_skybox_left.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("sky/Mars_skybox_right.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("sky/Mars_skybox_up.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("sky/Mars_skybox_down.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/height.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/light.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/normal.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/ColorMap.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/Mask.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/ground/Cliff.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/ground/Sand.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/ground/Sand_2.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/ground/Sand_stone.jpg");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, function (e) { return _this.initScene(e); });
        egret3d.AssetsManager.getInstance().startLoad();
        egret3d.Input.instance.addListenerKeyUp(function (keyCode) { return _this.onKeyUp(keyCode); });
    };
    p.onKeyUp = function (keyCode) {
        if (keyCode == egret3d.KeyCode.Key_1) {
            this._enableWireframe = !this._enableWireframe;
            if (true == this._enableWireframe) {
                this._view3D.addWireframe(this._wireframeMesh);
            }
            else {
                this._view3D.delWireframe(this._wireframeMesh);
            }
        }
    };
    p.initScene = function (e) {
        var _this = this;
        var sky_f = egret3d.AssetsManager.getInstance().findTexture("sky/Mars_skybox_front.jpg");
        var sky_b = egret3d.AssetsManager.getInstance().findTexture("sky/Mars_skybox_back.jpg");
        var sky_l = egret3d.AssetsManager.getInstance().findTexture("sky/Mars_skybox_left.jpg");
        var sky_r = egret3d.AssetsManager.getInstance().findTexture("sky/Mars_skybox_right.jpg");
        var sky_u = egret3d.AssetsManager.getInstance().findTexture("sky/Mars_skybox_up.jpg");
        var sky_d = egret3d.AssetsManager.getInstance().findTexture("sky/Mars_skybox_down.jpg");
        var skyTexture = new egret3d.SkyTexture(sky_b, sky_f, sky_l, sky_r, sky_u, sky_d);
        var sky = new egret3d.Sky(skyTexture);
        this._view3D.sky = sky;
        this._cameraCtl.setEyesLength(5000);
        var dir = new egret3d.DirectLight(new egret3d.Vector3D(0.5, 0.9, 0.7));
        dir.intensity = 0.6;
        var lightGroup = new egret3d.LightGroup();
        lightGroup.addDirectLight(dir);
        var colorMap = egret3d.AssetsManager.getInstance().findTexture("terrain/ColorMap.jpg");
        var mask = egret3d.AssetsManager.getInstance().findTexture("terrain/Mask.jpg");
        var rtexture = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Sand.jpg");
        var gtexture = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Cliff.jpg");
        var btexture = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Sand_stone.jpg");
        var atexture = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Sand_2.jpg");
        var height = egret3d.AssetsManager.getInstance().findTexture("terrain/height.jpg");
        var light = egret3d.AssetsManager.getInstance().findTexture("terrain/light.jpg");
        var normalTexture = egret3d.AssetsManager.getInstance().findTexture("terrain/normal.jpg");
        var geo = new egret3d.ElevationGeometry(height, 5000, 1000, 5000, 200, 200, 2000, -1000);
        var fog = new egret3d.DistanceFog();
        fog.fogColor = 0xefbe95;
        fog.globalDensity = 0.002;
        fog.startDistance = 700;
        fog.distanceScale = 0.08;
        var mat = new egret3d.TerrainMaterial(colorMap, mask, rtexture, gtexture, btexture, atexture, light);
        mat.normalTexture = normalTexture;
        mat.specularColor = 0xffffff;
        mat.shininess = 100.0;
        mat.specularPower = 0.9;
        mat.setUVTitling(0, 60, 60);
        mat.setUVTitling(1, 60, 60);
        mat.setUVTitling(2, 60, 60);
        mat.setUVTitling(3, 60, 60);
        mat.ambientPower = 0.4;
        mat.lightGroup = lightGroup;
        mat.addDiffusePassEffectMothod(fog);
        var mesh = new egret3d.Mesh(geo, mat);
        mesh.material.acceptShadow = false;
        mesh.material.castShadow = false;
        this._view3D.addChild3D(mesh);
        this._wireframeMesh = new egret3d.WireframeMesh();
        this._wireframeMesh.createByMesh(mesh);
        this.onKeyUp(egret3d.KeyCode.Key_1);
        this._time = new Date().getTime();
        requestAnimationFrame(function () { return _this.onUpdate(); });
    };
    p.onUpdate = function () {
        var _this = this;
        this._timeDate = new Date();
        this._delay = this._timeDate.getTime() - this._time;
        this._time = this._timeDate.getTime();
        this._cameraCtl.update();
        this._view3D.renden(this._time, this._delay);
        requestAnimationFrame(function () { return _this.onUpdate(); });
    };
    return Sample_BlendTerrain;
})();
egret.registerClass(Sample_BlendTerrain,"Sample_BlendTerrain");
//# sourceMappingURL=Sample_BlendTerrain.js.map