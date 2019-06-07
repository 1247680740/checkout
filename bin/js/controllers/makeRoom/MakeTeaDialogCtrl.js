var controllers;
(function (controllers) {
    var makeRoom;
    (function (makeRoom) {
        var MakeTeaDialogModel = models.makeRoom.MakeTeaDialogModel;
        var MakeTeaHomeModel = models.makeRoom.MakeTeaHomeModel;
        var Event = laya.events.Event;
        // import MakeTeaHomeLayer =  views.makeRoom.MakeTeaHomeLayer;
        /**
        * 泡茶相关控制器
        */
        var MakeTeaDialogCtrl = /** @class */ (function () {
            function MakeTeaDialogCtrl() {
                if (!MakeTeaDialogCtrl.model)
                    MakeTeaDialogCtrl.model = MakeTeaDialogModel.getInstance();
                if (!MakeTeaDialogCtrl.model1)
                    MakeTeaDialogCtrl.model1 = MakeTeaHomeModel.getInstance();
                if (!MakeTeaDialogCtrl.view)
                    MakeTeaDialogCtrl.view = new views.makeRoom.MakeTeaDialogView();
                if (!MakeTeaDialogCtrl.makeTeaHomeLayer) {
                    MakeTeaDialogCtrl.makeTeaHomeLayer = SceneLayerManager.makeTeaSceneLayer; //new views.makeRoom.MakeTeaHomeLayer();
                    // MakeTeaDialogCtrl.makeTeaHomeLayer = managers.SceneLayerManager.makeTeaSceneLayer;
                }
                MakeTeaDialogCtrl.view.tab1.on(Event.CLICK, this, this.request_getClassify, [null]);
                MakeTeaDialogCtrl.view.tab2.on(Event.CLICK, this, this.request_getClassify, ["green"]);
                MakeTeaDialogCtrl.view.tab3.on(Event.CLICK, this, this.request_getClassify, ["red"]);
                MakeTeaDialogCtrl.view.tab4.on(Event.CLICK, this, this.request_getClassify, ["uron"]);
                MakeTeaDialogCtrl.view.tab5.on(Event.CLICK, this, this.request_getClassify, ["white"]);
                MakeTeaDialogCtrl.view.tab6.on(Event.CLICK, this, this.request_getClassify, ["yellow"]);
                MakeTeaDialogCtrl.view.tab7.on(Event.CLICK, this, this.request_getClassify, ["black"]);
                MakeTeaDialogCtrl.view.tab8.on(Event.CLICK, this, this.request_getClassify, ["flower"]);
                MakeTeaDialogCtrl.view.tab9.on(Event.CLICK, this, this.request_getClassify, ["flower"]);
            }
            MakeTeaDialogCtrl.getInstance = function () {
                if (!MakeTeaDialogCtrl.instance)
                    MakeTeaDialogCtrl.instance = new MakeTeaDialogCtrl();
                return MakeTeaDialogCtrl.instance;
            };
            /** 点击泡茶向导显示泡茶界面 */
            MakeTeaDialogCtrl.prototype.showMakeTeaDialog = function () {
                // ======================= 调整 泡茶面板 的层级 -- 暂用
                // UILayerManager.makeTealayer.addChild(MakeTeaDialogCtrl.view.bgUI);
                SceneLayerManager.makeTeaSceneLayer.addChild(MakeTeaDialogCtrl.view.bgUI);
                MakeTeaDialogCtrl.view.bgUI.visible = true;
                MakeTeaDialogCtrl.view.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - MakeTeaDialogCtrl.view.bgUI.width >> 1;
                MakeTeaDialogCtrl.view.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - MakeTeaDialogCtrl.view.bgUI.height >> 1;
                //获取全部茶叶种类
                this.request_getClassify(null);
            };
            MakeTeaDialogCtrl.prototype.request_MakeTeaPower = function () {
                MakeTeaHomeModel.callback = this.initMakeTeaHome;
                MakeTeaDialogCtrl.model1.request_MakeTeaPower();
            };
            MakeTeaDialogCtrl.prototype.initMakeTeaHome = function () {
                MakeTeaDialogCtrl.makeTeaHomeLayer.initMakeTeaHome(MakeTeaHomeModel.makeTeaPowerVOArr);
            };
            /** 获取分类茶叶 */
            MakeTeaDialogCtrl.prototype.request_getClassify = function (type) {
                MakeTeaDialogModel.callback = this.getTeaOverFn;
                MakeTeaDialogCtrl.model.request_getClassify(type);
            };
            MakeTeaDialogCtrl.prototype.getTeaOverFn = function () {
                MakeTeaDialogCtrl.view.addStorageGrids(MakeTeaDialogModel.allTeaVOArr);
            };
            /** 请求右侧茶叶详情信息 */
            MakeTeaDialogCtrl.prototype.itemClkedFn = function (seedVO) {
                MakeTeaDialogModel.callback = this.getRrightContent;
                MakeTeaDialogCtrl.model.request_getDepotRightContentData(seedVO.id);
            };
            MakeTeaDialogCtrl.prototype.getRrightContent = function (takeData) {
                MakeTeaDialogCtrl.view.updateRightContent(MakeTeaDialogModel.teaShowVOArr);
            };
            /**请求右侧泡茶所需茶叶材料 */
            MakeTeaDialogCtrl.prototype.itemClkedMaterial = function (teaId) {
                MakeTeaDialogModel.callback = this.getRightMaterContent;
                MakeTeaDialogCtrl.model.request_getMaterRightContentData(teaId);
            };
            MakeTeaDialogCtrl.prototype.getRightMaterContent = function (takeData) {
                MakeTeaDialogCtrl.view.loadMakeTeaSecret(MakeTeaDialogModel.dataShowVOArr);
            };
            /** 请求泡茶所需要的水资源 */
            MakeTeaDialogCtrl.prototype.itemClkedWater = function () {
                MakeTeaDialogModel.callback = this.setWaterData;
                MakeTeaDialogCtrl.model.request_getWater();
            };
            MakeTeaDialogCtrl.prototype.setWaterData = function (takeData) {
                MakeTeaDialogCtrl.view.loadWaterData(MakeTeaDialogModel.waterVOArr);
            };
            /** 请求泡茶所需要的茶具资源 */
            MakeTeaDialogCtrl.prototype.itemClkedTeaSet = function () {
                MakeTeaDialogModel.callback = this.setTeaSetData;
                MakeTeaDialogCtrl.model.request_getTeaSet();
            };
            MakeTeaDialogCtrl.prototype.setTeaSetData = function () {
                MakeTeaDialogCtrl.view.getCurMakeTeaScore();
            };
            /** 请求当前泡茶组合的得分 */
            MakeTeaDialogCtrl.prototype.itemClkedScore = function (teaId, waterId, teaSetId) {
                MakeTeaDialogModel.callback = this.setScore;
                MakeTeaDialogCtrl.model.request_getScore(teaId, waterId, teaSetId);
            };
            MakeTeaDialogCtrl.prototype.setScore = function () {
                MakeTeaDialogCtrl.view.loadScore(MakeTeaDialogModel.curScore);
            };
            /** 请求购买玄天符接口 */
            MakeTeaDialogCtrl.prototype.getBuyXTF = function (st, si, bct) {
                MakeTeaDialogModel.callback = this.resetXTFStatus;
                MakeTeaDialogCtrl.model.request_getXTF(st, si, bct);
            };
            MakeTeaDialogCtrl.prototype.resetXTFStatus = function () {
                MakeTeaDialogCtrl.view.initXTFStatus(MakeTeaDialogModel.waterVOArr);
            };
            /** 请求购买水源接口 */
            MakeTeaDialogCtrl.prototype.getBuyWater = function (st, si, bct) {
                MakeTeaDialogModel.callback = this.resetWaterNums;
                MakeTeaDialogCtrl.model.request_getBuyWater(st, si, bct);
            };
            /** 重置水源数量 */
            MakeTeaDialogCtrl.prototype.resetWaterNums = function () {
                MakeTeaDialogCtrl.view.initWaterLockNums(parseInt(MakeTeaDialogCtrl.view.teaNums.text));
            };
            /** 购买单一茶叶 */
            MakeTeaDialogCtrl.prototype.getBuyLeaf = function (st, si, bct, nums) {
                MakeTeaDialogModel.callback = this.resetLeafNums;
                MakeTeaDialogCtrl.model.request_buyleaf(st, si, bct, nums);
            };
            /** 重置茶叶数量 */
            MakeTeaDialogCtrl.prototype.resetLeafNums = function () {
                MakeTeaDialogCtrl.view.initTeaLockNums(parseInt(MakeTeaDialogCtrl.view.teaNums.text));
            };
            /** 开始烧水请求 */
            MakeTeaDialogCtrl.prototype.friedWater = function (teaId, teaLvl, waterId, teaSetId, makeTeaNums, useToolFn) {
                MakeTeaDialogModel.callback = this.setFriedWaterData;
                MakeTeaDialogCtrl.model.request_friedWater(teaId, teaLvl, waterId, teaSetId, makeTeaNums, useToolFn);
            };
            MakeTeaDialogCtrl.prototype.setFriedWaterData = function () {
                MakeTeaDialogCtrl.makeTeaHomeLayer.startMakeTea(MakeTeaDialogModel.friedWaterVOArr);
            };
            /** 停止加热获取分数 */
            MakeTeaDialogCtrl.prototype.stopFriedWater = function (temp) {
                MakeTeaHomeModel.callback = this.stopFriedWaterData;
                MakeTeaDialogCtrl.model1.request_stopFire(temp);
            };
            /** 停止加热 */
            MakeTeaDialogCtrl.prototype.stopFriedWaterData = function () {
                MakeTeaDialogCtrl.makeTeaHomeLayer.initStopFriedWaterData();
            };
            /** 开始泡茶 */
            MakeTeaDialogCtrl.prototype.startMakeTea = function () {
                MakeTeaDialogCtrl.model1.request_startMakeTea();
            };
            /** 出售茶叶 */
            MakeTeaDialogCtrl.prototype.saleTea = function () {
                MakeTeaDialogCtrl.model1.request_saleTea();
            };
            /** 倒掉茶水 */
            MakeTeaDialogCtrl.prototype.dropWater = function () {
                MakeTeaDialogCtrl.model1.request_getWater();
            };
            return MakeTeaDialogCtrl;
        }());
        makeRoom.MakeTeaDialogCtrl = MakeTeaDialogCtrl;
    })(makeRoom = controllers.makeRoom || (controllers.makeRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=MakeTeaDialogCtrl.js.map