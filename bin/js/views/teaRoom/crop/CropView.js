var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var views;
(function (views) {
    var teaRoom;
    (function (teaRoom) {
        var crop;
        (function (crop) {
            var View = laya.ui.View;
            var Image = laya.ui.Image;
            var HBox = laya.ui.HBox;
            var Event = laya.events.Event;
            var GameConfig = configs.GameConfig;
            var CropInfoTipUI = ui.gameUI.tips.CropInfoTipUI;
            var MovieClip = laya.ani.swf.MovieClip;
            var Handler = laya.utils.Handler;
            var LandCtrl = controllers.teaRoom.LandCtrl;
            /**
             * 作物相关的视图
             * 0、作物的显示（生长阶段对应的不同显示效果）
             * 1、鼠标悬浮显示提示信息
             * 2、虫、草
             * 3、除虫、除草
             * 4、施肥
             * 5、收获（提示图标）
             * 6、铲除
             * 7、点击事件分类：
             *
             * 鼠标悬浮显示提示信息：
             * 0、作物名字、季数
             * 1、作物状态规则：害虫，干旱，杂草，累计小于3个，为“优秀”；累计小于6个，为“良好”，累计6个以及六个以上，为“濒临死亡”
             * 2、成熟（产量） 或 生长阶段（时间）
             * 3、进度条，成熟则不显示
             *
             * 点击事件分类：
             * 1、点击正在生长的作物没有效果
             *
             * 放虫、种草：
             * 1、虫草会在作物成熟时影响作物的产量
             * 2、作物死亡/成熟后不能放虫、种草
             * 3、每个作物最多可放虫、种草各3个，数量>3时，客户端直接提示不得超过3个！
             *
             * 除虫、除草:
             * 1、除虫：   api: actPesticide 	{"li": 7}
             * 2、除草：   api: actWipeGrass    {"li": 7}
             *
             * 施肥：
             * 1、对成熟或枯萎状态的作物施肥，则弹出气泡：该阶段不能施肥
             * 2、成功：化肥数量-1，作物相关变化
             *
             * 收获：
             * 1、点击成熟的作物，作物的果实进入仓库，作物单季增加的经验直接加到经验条上。
             * 2、多季：如果作物是多季作物，且现在不是最后一季，收获后作物进入下一季的叶子阶段（茶树则进入成长阶段）。
             * 3、如果作物是单季作物或多季作物的最后一季，收获后作物进入枯萎阶段。
             *
             */
            var CropView = /** @class */ (function (_super) {
                __extends(CropView, _super);
                function CropView() {
                    var _this = _super.call(this) || this;
                    _this.wormHBox = new HBox();
                    // this.wormHBox.space = 5;	// 间距
                    _this.grassHBox = new HBox();
                    _this.grassHBox.space = 5;
                    _this.cropIcon = new Image();
                    // this.addChild(this.wormHBox);
                    // this.addChild(this.grassHBox);
                    _this.addChild(_this.cropIcon);
                    _this.harvestIcon = new Image();
                    _this.wormUrl = "res/gameAssets/swfs/worm.swf";
                    _this.wormMC = new MovieClip();
                    _this.wormHBox.rotation = 50;
                    _this.grassHBox.rotation = -30;
                    CropView.cropIconHandler = Handler.create(_this, _this.cropIconLoadedHandler);
                    // 作物信息提示框
                    CropView.cropTip = new CropInfoTipUI();
                    CropView.cropTip.name = "cropTip";
                    CropView.cropTip.visible = false;
                    if (!views.teaRoom.LandView.instance.getChildByName("cropTip"))
                        views.teaRoom.LandView.instance.addChild(CropView.cropTip);
                    // 点击作物时的情况：除虫、除草、收获……
                    _this.on(Event.CLICK, _this, _this.cropViewClkedFn);
                    _this.on(Event.MOUSE_OVER, _this, _this.cropViewMouseOverFn);
                    _this.on(Event.MOUSE_OUT, _this, _this.cropViewMouseOutFn);
                    return _this;
                }
                /** 作物的显示（含虫、草） */
                CropView.prototype.init = function (cropVO) {
                    if (!cropVO)
                        return;
                    this.selfCropVO = cropVO;
                    // 加载标识：若已加载，则不再加载其它
                    var iconLoaded = false;
                    // 地块
                    this.curGrid = LandCtrl.landView.getLandGridById(cropVO.landId);
                    if (!this.curGrid)
                        return;
                    // this.curGrid.cropView = this;
                    // 已有作物
                    if (this.curGrid.getChildByName(cropVO.id + ""))
                        return;
                    // 发现：cropVO.growthStatus 已不存在于 cropVO 中 -- 2017-06-21
                    if (cropVO.growthStatus != undefined) {
                        var cropIconName = void 0;
                        // 死亡
                        if (cropVO.growthStatus == -1) {
                            cropIconName = "plant_1_5.png";
                            console.log("作物枯萎！");
                        } // 种子（有的作物有单独的种子状态，如 "plant_11_0.png"）
                        else if (cropVO.growthStatus == 0) {
                            cropIconName = "plant_1_0.png";
                            console.log("种子阶段！");
                        }
                        else {
                            try {
                                cropIconName = "plant_" + cropVO.id + "_" + cropVO.growthStatus + ".png";
                            }
                            catch (error) {
                                cropIconName = "plant_" + cropVO.id + "_" + (cropVO.growthStatus + 1) + ".png";
                            }
                        }
                        if (cropIconName) {
                            iconLoaded = true;
                            this.cropIconUrl = HttpConfig.serverResUrl + cropIconName;
                            // this.cropIcon.cacheAs = "bitmap";
                            // this.selfCropVO.iconUrl = this.cropIconUrl;	// 2017-09-16 hsx
                            this.cropIcon.loadImage(this.cropIconUrl, 0, 0, 0, 0, CropView.cropIconHandler);
                        }
                    }
                    else {
                        // 只有先种植后此值才有效，之前已种植好的直接从老系统中加载的，则需使用如上加载方式，最终要代替如上写法！
                        if (iconLoaded == false) {
                            if (cropVO.iconUrl) {
                                this.cropIconUrl = cropVO.iconUrl;
                                // this.cropIcon.cacheAs = "bitmap";
                                this.cropIcon.loadImage(this.cropIconUrl, 0, 0, 0, 0, CropView.cropIconHandler);
                            }
                        }
                    }
                };
                CropView.prototype.cropIconLoadedHandler = function () {
                    var texture = Laya.loader.getRes(this.cropIconUrl);
                    if (texture) {
                        this.cropIcon.width = texture.width;
                        this.cropIcon.height = texture.height;
                        this.updateWormOrGrassPos();
                        // 添加作物至地块
                        this.curGrid.cropView = this;
                        // this.autoSize = true;
                        if (this.updateCropState)
                            this.updateCropState(this.selfCropVO);
                    }
                };
                /**
                 * 更新虫或草的位置
                 */
                CropView.prototype.updateWormOrGrassPos = function () {
                    this.wormHBox.removeChildren();
                    this.grassHBox.removeChildren();
                    // 虫 （数量>3时，客户端直接提示不得超过3个）
                    if (this.selfCropVO.worm > 0) {
                        this.wormNums = this.selfCropVO.worm;
                        this.loadWorm();
                    }
                    else {
                        this.resetDisObj(this.wormHBox);
                    }
                    // 草
                    if (this.selfCropVO.grass > 0) {
                        this.grassNums = this.selfCropVO.grass;
                        this.loadGrass();
                    }
                    else {
                        this.resetDisObj(this.grassHBox);
                    }
                };
                CropView.prototype.loadWorm = function () {
                    var _wormMc = new MovieClip();
                    _wormMc.load(this.wormUrl);
                    _wormMc.once(Event.COMPLETE, this, this.wormMCLoaded);
                    this.wormHBox.addChild(_wormMc);
                    // _wormMc.x = this.wormNums * 20;	// _wormMc.width == 0
                    _wormMc.y = -this.wormNums * 20;
                    console.info("worm, x:" + _wormMc.x + ", y:" + _wormMc.y + ", w:" + _wormMc.width + ", h:" + _wormMc.height);
                    this.wormNums--;
                };
                CropView.prototype.wormMCLoaded = function (event) {
                    if (this.wormNums > 0) {
                        this.loadWorm();
                    }
                    else {
                        // this.wormHBox.x = this.cropIcon.x + 30;  // this.cropIcon.x - 10;
                        // this.wormHBox.y = this.cropIcon.y+this.cropIcon.height + 10;
                        this.wormHBox.autoSize = true;
                    }
                };
                CropView.prototype.loadGrass = function () {
                    var grass = new Image();
                    // grass.loadImage("gameUI/toolBar/btn_grass.png",0,0,20,20,Handler.create(this,this.grassLoaded,null,true));
                    grass.skin = "gameUI/toolBar/grass.png";
                    this.grassHBox.addChild(grass);
                    this.grassNums--;
                    this.grassLoaded();
                };
                CropView.prototype.grassLoaded = function (event) {
                    if (this.grassNums > 0) {
                        this.loadGrass();
                    }
                    else {
                        // this.grassHBox.scale(0.5,0.5);
                        // this.grassHBox.x = this.wormHBox.x + 15;	// this.grassHBox.x / 0.2 + 50;
                        // this.grassHBox.y = this.cropIcon.y+this.cropIcon.height+15;
                        this.grassHBox.autoSize = true;
                    }
                };
                CropView.prototype.resetDisObj = function (disObj) {
                    if (!disObj)
                        return;
                    disObj.visible = false;
                    disObj.removeChildren();
                    disObj.removeSelf();
                };
                /**
                 * 点击作物后
                 * 先判断操作类型：除虫、除草、收获、其它……
                 */
                CropView.prototype.cropViewClkedFn = function (event) {
                    console.log("== CropView, 鼠标当前操作类型：" + GameConfig.curOperateType);
                    switch (GameConfig.curOperateType) {
                        case "killWorm":
                            break;
                        case "removeGrass":
                            break;
                        case "water":
                            break;
                        case "worm":
                            break;
                        case "grass":
                            break;
                        case "plant":
                            console.log("plant");
                            break;
                        case "fertilize":// 施肥
                            break;
                        case "harvest":
                            break;
                        case "removeCrop":
                            break;
                        default:// 普通状态
                            break;
                    }
                };
                /**
                 * 若作物未死亡，则显示提示信息
                 */
                CropView.prototype.cropViewMouseOverFn = function (event) {
                    if (!this.selfCropVO)
                        return;
                    if (this.selfCropVO.isDeath)
                        return;
                    CropView.cropTip = views.teaRoom.LandView.instance.getChildByName("cropTip");
                    if (!CropView.cropTip)
                        return;
                    CropView.cropTip.visible = true;
                    CropView.cropTip.cropName.text = this.getCropNameById(this.selfCropVO) + "(第" + this.selfCropVO.season + "季)";
                    CropView.cropTip.state.text = "状态(" + this.selfCropVO.statusTxt + ")";
                    if (this.selfCropVO.remnantOutput) {
                        CropView.cropTip.phase.text = this.selfCropVO.growthStateTxt + "(产：" + this.selfCropVO.totalOutput +
                            "剩：" + this.selfCropVO.remnantOutput + ")";
                    }
                    else {
                        if (this.selfCropVO.growthTime <= 120) {
                            CropView.cropTip.phase.text = this.selfCropVO.growthStateTxt + "(" + this.selfCropVO.growthTimeTxt(true) +
                                (this.selfCropVO.nextLevelText ? this.selfCropVO.nextLevelText : "") + ")";
                        }
                        else {
                            CropView.cropTip.phase.text = this.selfCropVO.growthStateTxt + "(" + this.selfCropVO.growthTimeTxt(false) +
                                (this.selfCropVO.nextLevelText ? this.selfCropVO.nextLevelText : "") + ")";
                        }
                    }
                    if (this.selfCropVO.growthRate)
                        CropView.cropTip.progress.value = this.selfCropVO.growthRate;
                    else
                        CropView.cropTip.progress.visible = false;
                    var landGridView = this.parent;
                    if (landGridView) {
                        CropView.cropTip.x = landGridView.x + landGridView.width / 4;
                        CropView.cropTip.y = landGridView.y - landGridView.height;
                        // console.log("====== cropTip, x:"+CropView.cropTip.x+", y:"+CropView.cropTip.y);
                    }
                    // 只有按正常流程种植后 作物名称 才会有值 ！！！
                    console.log("==== cur crop's name: " + this.selfCropVO.name);
                };
                /**
                 * 获取特定作物对应的名字
                 */
                CropView.prototype.getCropNameById = function (cropVO) {
                    var seedsObjArr = managers.ResourceManager.seedsObjArr;
                    if (!seedsObjArr || seedsObjArr.length == 0)
                        return;
                    var i;
                    var len = seedsObjArr.length;
                    var cropObj;
                    for (i = 0; i < len; i++) {
                        cropObj = seedsObjArr[i];
                        if (cropVO.id == cropObj["id"]) {
                            return cropObj["name"];
                        }
                    }
                    return null;
                };
                CropView.prototype.cropViewMouseOutFn = function (event) {
                    CropView.cropTip.visible = false;
                };
                /**
                 * 成熟后添加收获图标
                 */
                CropView.prototype.addHarvestIcon = function () {
                    var iconUrl = "res/gameAssets/imgs/harvestIcon.png";
                    if (!this.harvestIcon)
                        this.harvestIcon = new Image();
                    this.harvestIcon.skin = iconUrl;
                    // this.harvestIcon.loadImage(iconUrl);
                    // this.cropIcon.addChild(this.harvestIcon);
                    this.addChild(this.harvestIcon);
                };
                /**
                 * 移除收获星号图标
                 */
                CropView.prototype.removeHarvestIcon = function () {
                    if (!this.harvestIcon)
                        return;
                    this.harvestIcon.removeSelf();
                    this.harvestIcon = null;
                };
                return CropView;
            }(View));
            crop.CropView = CropView;
        })(crop = teaRoom.crop || (teaRoom.crop = {}));
    })(teaRoom = views.teaRoom || (views.teaRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=CropView.js.map