class Main extends egret.DisplayObjectContainer {

    private sample: SampleBase = null;
    public constructor() {
        super();
        this.sample = new Sample_Character();
    }
}