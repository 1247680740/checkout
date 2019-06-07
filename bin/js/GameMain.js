var Sprite = laya.display.Sprite;
var HttpServiceProxy = nets.HttpServiceProxy;
var SceneLayerManager = managers.SceneLayerManager;
var UILayerManager = managers.UILayerManager;
var TipLayerManager = managers.TipLayerManager;
var Loading = views.common.Loading;
var ResLoader = commons.resLoad.ResLoader;
var ResourceManager = managers.ResourceManager;
var HttpConfig = configs.HttpConfig;
var IdentityConfig = configs.IdentityConfig;
// import PlayerInfoCtrl = controllers.player.PlayerInfoCtrl;
var IntensifyPotCtrl = controllers.friedRoom.pot.IntensifyPotCtrl;
var GameConfig = configs.GameConfig;
var Handler = laya.utils.Handler;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        /**
         * 资源配置文件地址
         */
        this.configUrl = "manifest.json?" + Math.random();
        Laya.init(950, 600, laya.webgl.WebGL);
        // 是PC端还是移动端
        if (eval("isPC()")) {
            GameConfig.device_type = GameConfig.PC;
            Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
            // Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        }
        else {
            GameConfig.device_type = GameConfig.MOBILE;
            Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
            //自动横屏，游戏的水平方向始终与浏览器屏幕较短边保持垂直
            Laya.stage.screenMode = "horizontal";
        }
        Laya.stage.bgColor = "#c0c0c0";
        Laya.stage.frameRate = "mouse"; // 默认"fast":60帧
        Laya.Mouse.hide();
        // Laya.Stat.show(200,0);
        // 调试工具
        // Laya.DebugPanel.init();  // 可用，但显示不佳且有错误提示！
        // laya.debug.DebugTool.init();
        GameMain.instance = this;
        // 加载资源版本信息 // at least v1.7.6
        Laya.ResourceVersion.enable(this.configUrl, Laya.Handler.create(this, this.maifestLoaded));
        // this.maifestLoaded();
    }
    GameMain.prototype.maifestLoaded = function () {
        // Loading 时所需素材
        Laya.loader.load([{ url: "res/atlas/comp.json", type: Laya.Loader.ATLAS }], Handler.create(this, this.startLoading));
    };
    GameMain.prototype.startLoading = function () {
        // var obj: any = Laya.loader.getRes("res/...");
        this.loading = new Loading();
        this.loading.name = "loading";
        this.loading.autoSize = true;
        Laya.stage.addChild(this.loading);
        this.loading.x = Laya.stage.width - this.loading.width >> 1;
        this.loading.y = Laya.stage.height - this.loading.height >> 1;
        this.getPfInfo();
    };
    /**
     * 获取类似 index_tencent.php 中返回的平台相关信息，
     * 然后进行游戏的初始化加载操作！
     */
    GameMain.prototype.getPfInfo = function () {
        // 调用平台入口 php 中返回平台相关信息的函数
        var pfObj;
        // yuying 测试服（"uid":"1476483"）   //1476496     388189763fbe8fe64f206a9150025e6c
        pfObj = { "uid": "1476483", "pwd": "09cca18a30bc34727b0254943811239a", "protocol": "http",
            "host": "kaixinh5game.maimaicha.net", "port": 80, "path": "/happytea/index.php", "platform": "mmc" };
        // hsx 测试服
        // pfObj = {
        //     "uid": "1476472", "pwd": "09cca18a30bc34727b0254943811239a", "protocol": "http",
        //     "host": "www.kaixinchayuan.com", "port": 80, "path": "/happytea/index.php", "platform": "mmc"
        // }; // "tencent"
        // 正式环境用
        // pfObj = eval("startGame()");
        if (!pfObj)
            return;
        // 初始化玩家数据
        if (pfObj["uid"]) {
            IdentityConfig.uid = pfObj["uid"];
            IdentityConfig.pwd = pfObj["pwd"];
            HttpConfig.init(pfObj["protocol"] + "://", pfObj["host"], pfObj["port"], pfObj["path"]);
            console.info("已获取到平台信息！uid:" + pfObj["uid"], ", pwd:" + pfObj["pwd"] + ", protocol:" + pfObj["protocol"] +
                ", host:" + pfObj["host"] + ", port:" + pfObj["port"] + ", path:" + pfObj["path"]);
            HttpConfig.serverResUrl = HttpConfig.protocol + HttpConfig.host + ":" + HttpConfig.port + "/static/";
            console.info("serverUrl:" + HttpConfig.serverResUrl);
            // 自定义数据加载部分（加载Server上的静态数据）
            ResourceManager.callback = this.resLoaderComplete;
            ResourceManager.instance.loadRes([HttpConfig.serverResUrl + "xml/seeds.json",
                HttpConfig.serverResUrl + "xml/tools.json",
                HttpConfig.serverResUrl + "xml/activity.json",
                HttpConfig.serverResUrl + "xml/tealeaf.json",
                HttpConfig.serverResUrl + "xml/prize.json"]);
            // 界面素材的预加载:
            // 茶农图集加载：{url:"res/atlas/testFromServer/farmer_13.json",type:Laya.Loader.JSON}
            Laya.loader.load(["res/atlas/gameUI/exam.json",
                "res/atlas/gameUI/fireTea.json",
                "res/atlas/gameUI/gossip.json",
                "res/atlas/gameUI/land.json",
                "res/atlas/gameUI/player.json",
                "res/atlas/gameUI/pot.json",
                "res/atlas/gameUI/ranklist.json",
                "res/atlas/gameUI/teaWiki.json",
                "res/atlas/gameUI/toolBar.json",
                "res/atlas/gameUI/makeTea.json",
                "res/atlas/gameUI/common/icon.json",
                "res/atlas/gameUI/common/imgs.json",
                "res/atlas/gameUI/common/loading.json",
                "res/atlas/gameUI/common/resTypeIcon.json",
                "res/atlas/gameUI/friendList.json"], Handler.create(this, this.uiAtlasHandler), Handler.create(this, this.loading.progressChanged, null, false), Laya.Loader.ATLAS);
            // SWF 需预先加载后再使用时才能控制它的跳帧（v1.7.1时正常，v1.7.9异常）
            // Laya.loader.load([{HttpConfig.serverResUrl + "saute/PotAnimation.json"], Handler.create(this, this.swfLoaded));
            // Laya.loader.load([{"res/atlas/test/PotAnimation.swf", type: Laya.Loader.BUFFER }], Handler.create(this, this.swfLoaded));
        }
        else {
            console.info("未获取到平台信息！");
        }
    };
    GameMain.prototype.swfLoaded = function () {
        // this.mc = new Laya.MovieClip();
        // this.mc.url = HttpConfig.serverResUrl+"saute/PotAnimation.swf";
        // this.mc.playTo(0,2,Handler.create(this,this.playOver));
        // // this.mc.gotoAndStop(2);
        // this.mc.pos(100,100);
        // Laya.stage.addChild(this.mc);
    };
    GameMain.prototype.resLoaderComplete = function (seedsObjArr) {
        console.info("Static files has loaded...");
        if (!seedsObjArr || !seedsObjArr.length)
            return;
    };
    /**
     * 纹理资源加载完成,
     */
    GameMain.prototype.uiAtlasHandler = function () {
        // loading over
        this.loading.destroy();
        // 玩家信息
        controllers.player.PlayerInfoCtrl.instance.request_getUserInfo();
        controllers.player.PlayerInfoCtrl.eventDispatcher.once(HttpConfig.SERVER_CONNECTED, this, this.loadAllLayer);
    };
    /**
     * 登录成功后，加载各层视图，请求相关数据
     */
    GameMain.prototype.loadAllLayer = function () {
        SceneLayerManager.getInstance().initTeaGardenScene();
        Laya.stage.addChild(SceneLayerManager.sceneLayer);
        SceneLayerManager.sceneLayer.pos(-180, -90);
        UILayerManager.getInstance().initTeaGardenUI();
        Laya.stage.addChild(UILayerManager.uiLayer);
        UILayerManager.uiLayer.pos(0, 0);
        TipLayerManager.getInstance().initTip();
        Laya.stage.addChild(TipLayerManager.tipLayer);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map