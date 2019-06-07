var controllers;
(function (controllers) {
    var makeRoom;
    (function (makeRoom) {
        var storage;
        (function (storage) {
            var MakeTeaStorageModel = models.makeRoom.storage.MakeTeaStorageModel;
            var Event = laya.events.Event;
            var TweenUtil = utils.TweenUtil;
            /**
             * 泡茶仓库控制器类
             */
            var MakeTeaStorageCtrl = /** @class */ (function () {
                function MakeTeaStorageCtrl() {
                    /** 底部工具栏的高度 */
                    this.toolBarH = 30;
                    if (!MakeTeaStorageCtrl.model)
                        MakeTeaStorageCtrl.model = MakeTeaStorageModel.getInstance();
                    if (!MakeTeaStorageCtrl.view)
                        MakeTeaStorageCtrl.view = new views.makeRoom.storage.MakeTeaStorageView();
                    MakeTeaStorageCtrl.view.seedTab.on(Event.CLICK, this, this.request_getMaterial);
                    MakeTeaStorageCtrl.view.toolTab.on(Event.CLICK, this, this.request_getTool);
                    MakeTeaStorageCtrl.view.on(Event.CLICK, this, this.itemClkedFn);
                    MakeTeaStorageCtrl.view.saleBtn.on(Event.CLICK, this, this.saleFn);
                }
                MakeTeaStorageCtrl.getInstance = function () {
                    if (!MakeTeaStorageCtrl.instance)
                        MakeTeaStorageCtrl.instance = new MakeTeaStorageCtrl();
                    return MakeTeaStorageCtrl.instance;
                };
                /**
                 * 点击每项，请求右侧的内容信息
                 */
                MakeTeaStorageCtrl.prototype.itemClkedFn = function (event) {
                    var flag = event.target instanceof ui.gameUI.common.GridItemUI;
                    if (!flag)
                        return;
                    // 茶叶栏、道具栏
                    var curItem = MakeTeaStorageCtrl.view.curItem;
                    if (curItem) {
                        var paraObj = { "si": curItem["id"], "st": curItem["type"] };
                        MakeTeaStorageModel.callback = this.getRightContentOverFn;
                        MakeTeaStorageCtrl.model.request_getDepotRightContentData(paraObj);
                    }
                };
                /**
                 * 卖出操作
                 */
                MakeTeaStorageCtrl.prototype.saleFn = function (event) {
                    var curItem = MakeTeaStorageCtrl.view.curItem;
                    if (curItem) {
                        var saleNums = parseInt(MakeTeaStorageCtrl.view.saleNumTxt.text);
                        switch (curItem["type"]) {
                            case "leaf":
                                if (curItem["fruitNums"] >= saleNums)
                                    curItem["saleNums"] = saleNums;
                                break;
                            case "water":
                                if (curItem["nums"] >= saleNums)
                                    curItem["saleNums"] = saleNums;
                                break;
                        }
                        if (curItem["saleNums"] > 0) {
                            MakeTeaStorageModel.callback = this.saleOverFn;
                            MakeTeaStorageCtrl.model.request_sellSingle({ "si": curItem["id"], "st": curItem["type"], "sct": curItem["saleNums"], "q": curItem["quality"] });
                        }
                    }
                };
                MakeTeaStorageCtrl.prototype.saleOverFn = function (takeData) {
                    if (!takeData)
                        return;
                    if (takeData["errMsg"]) {
                        TipLayerManager.tipLayer.showDrawBgTip(takeData["errMsg"]);
                    }
                    else {
                        if (takeData["exp"] > 0)
                            TweenUtil.tweenTo(views.common.CommonDisplay.expPrize(takeData["exp"]));
                        if (takeData["money"] > 0)
                            TweenUtil.tweenTo(views.common.CommonDisplay.moneyPrize(takeData["money"]));
                        // 更新仓库状态
                        if (MakeTeaStorageCtrl.view.curSelectedTabName == "seedTab") {
                            MakeTeaStorageCtrl.instance.request_getMaterial();
                        }
                        else if (MakeTeaStorageCtrl.view.curSelectedTabName == "toolTab") {
                            MakeTeaStorageCtrl.instance.request_getTool();
                        }
                    }
                };
                /**
                 * 更新右侧信息（与 FriedTeaStorageView 中的 gridItem 点击事件重复，待整合）
                 */
                MakeTeaStorageCtrl.prototype.getRightContentOverFn = function () {
                    MakeTeaStorageCtrl.view.updateRightContent(MakeTeaStorageModel.curSelectedObjVO);
                };
                /**
                 * 点击工具栏仓库图标显示仓库面板
                 */
                MakeTeaStorageCtrl.prototype.showStorageDialog = function () {
                    UILayerManager.uiLayer.addChild(MakeTeaStorageCtrl.view.bgUI);
                    MakeTeaStorageCtrl.view.bgUI.visible = true;
                    MakeTeaStorageCtrl.view.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - MakeTeaStorageCtrl.view.bgUI.width >> 1;
                    MakeTeaStorageCtrl.view.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - MakeTeaStorageCtrl.view.bgUI.height >> 1;
                    this.request_getMaterial();
                };
                /**
                 * 获取茶叶
                 */
                MakeTeaStorageCtrl.prototype.request_getMaterial = function () {
                    MakeTeaStorageModel.callback = this.getMaterialOverFn;
                    MakeTeaStorageCtrl.model.request_getMaterial();
                };
                MakeTeaStorageCtrl.prototype.getMaterialOverFn = function (takeData) {
                    MakeTeaStorageCtrl.view.addStorageGrids(MakeTeaStorageModel.getInstance().seedVOArr);
                };
                /**
                 * 获取仓库中水源道具
                 */
                MakeTeaStorageCtrl.prototype.request_getTool = function () {
                    MakeTeaStorageModel.callback = this.getScrollOverFn;
                    MakeTeaStorageCtrl.model.request_getScroll();
                };
                MakeTeaStorageCtrl.prototype.getScrollOverFn = function (takeData) {
                    MakeTeaStorageCtrl.view.addStorageGrids(MakeTeaStorageModel.getInstance().toolVOArr);
                };
                return MakeTeaStorageCtrl;
            }());
            storage.MakeTeaStorageCtrl = MakeTeaStorageCtrl;
        })(storage = makeRoom.storage || (makeRoom.storage = {}));
    })(makeRoom = controllers.makeRoom || (controllers.makeRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=MakeTeaStorageCtrl.js.map