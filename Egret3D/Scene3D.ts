module egret3d {
    export class Scene3D extends Object3D {
        public collect: EntityCollect;
        constructor() {
            super();
            this.collect = new EntityCollect(this);
        }

    }
} 