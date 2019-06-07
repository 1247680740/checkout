var controllers;
(function (controllers) {
    var teaRoom;
    (function (teaRoom) {
        var storage;
        (function (storage) {
            var StorageModel = models.teaRoom.storage.StorageModel;
            var Event = laya.events.Event;
            var TweenUtil = utils.TweenUtil;
            /**
             * 仓库控制器类
             */
            var StorageCtrl = /** @class */ (function () {
                function StorageCtrl() {
                    if (!StorageCtrl.model)
                        StorageCtrl.model = StorageModel.getInstance();
                    if (!StorageCtrl.view)
                        StorageCtrl.view = new views.teaRoom.storage.StorageDialogView();
                    StorageCtrl.view.seedTab.on(Event.CLICK, this, this.request_getSeed);
                    StorageCtrl.view.toolTab.on(Event.CLICK, this, this.request_getTool);
                    StorageCtrl.view.fruitTab.on(Event.CLICK, this, this.request_getFruit);
                    StorageCtrl.view.decorateTab.on(Event.CLICK, this, this.request_getDecorate);
                    StorageCtrl.view.on(Event.CLICK, this, this.itemClkedFn);
                    StorageCtrl.view.saleBtn.on(Event.CLICK, this, this.saleFn);
                }
                StorageCtrl.getInstance = function () {
                    if (!StorageCtrl.instance)
                        StorageCtrl.instance = new StorageCtrl();
                    return StorageCtrl.instance;
                };
                /**
                 * 点击每项，请求右侧的内容信息
                 */
                StorageCtrl.prototype.itemClkedFn = function (event) {
                    var flag = event.target instanceof ui.gameUI.common.GridItemUI;
                    if (!flag)
                        return;
                    // 果实栏读取的是本地数据
                    if (StorageCtrl.view.curSelectedTabName == "fruitTab")
                        return;
                    // 种子栏、道具栏
                    var curItem = StorageCtrl.view.curItem;
                    if (curItem) {
                        var paraObj = { "si": curItem["id"], "st": curItem["type"] };
                        StorageModel.callback = this.getRightContentOverFn;
                        StorageCtrl.model.request_getDepotRightContentData(paraObj);
                    }
                };
                /**
                 * 卖出操作
                 */
                StorageCtrl.prototype.saleFn = function (event) {
                    var curItem = StorageCtrl.view.curItem;
                    if (curItem) {
                        var saleNums = parseInt(StorageCtrl.view.saleNumTxt.text);
                        // 种子
                        if (curItem["type"].indexOf("seed") > 0) {
                            if (curItem["seedNums"] >= saleNums)
                                curItem["saleNums"] = saleNums;
                        } // 果实
                        else if (curItem["type"].indexOf("fruit") > 0) {
                            if (curItem["fruitNums"] >= saleNums)
                                curItem["saleNums"] = saleNums;
                        } // 道具
                        else if (curItem["type"] == "prop") {
                            if (curItem["nums"] >= saleNums)
                                curItem["saleNums"] = saleNums;
                        }
                        if (curItem["saleNums"] > 0) {
                            StorageModel.callback = this.saleOverFn;
                            StorageCtrl.model.request_sellSingle({ "si": curItem["id"], "st": curItem["type"], "sct": curItem["saleNums"] });
                        }
                    }
                };
                StorageCtrl.prototype.saleOverFn = function (takeData) {
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
                        if (StorageCtrl.view.curSelectedTabName == "seedTab") {
                            StorageCtrl.instance.request_getSeed();
                        }
                        else if (StorageCtrl.view.curSelectedTabName == "toolTab") {
                            StorageCtrl.instance.request_getTool();
                        }
                        else if (StorageCtrl.view.curSelectedTabName == "fruitTab") {
                            StorageCtrl.instance.request_getFruit();
                        }
                    }
                };
                /**
                 * 更新右侧信息
                 */
                StorageCtrl.prototype.getRightContentOverFn = function () {
                    StorageCtrl.view.updateRightContent(StorageModel.curSelectedObjVO);
                };
                /**
                 * 点击工具栏仓库图标显示仓库面板
                 */
                StorageCtrl.prototype.showStorageDialog = function () {
                    UILayerManager.uiLayer.addChild(StorageCtrl.view.bgUI);
                    StorageCtrl.view.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - StorageCtrl.view.bgUI.width >> 1;
                    StorageCtrl.view.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - StorageCtrl.view.bgUI.height >> 1;
                    this.request_getSeed();
                };
                /**
                 * 获取种子
                 */
                StorageCtrl.prototype.request_getSeed = function () {
                    StorageModel.callback = this.getSeedOverFn;
                    StorageCtrl.model.request_getSeed();
                };
                StorageCtrl.prototype.getSeedOverFn = function (takeData) {
                    StorageCtrl.view.addStorageGrids(StorageModel.getInstance().seedVOArr);
                };
                /**
                 * 获取道具
                 */
                StorageCtrl.prototype.request_getTool = function () {
                    StorageModel.callback = this.getPropOverFn;
                    StorageCtrl.model.request_getProp();
                };
                StorageCtrl.prototype.getPropOverFn = function (takeData) {
                    StorageCtrl.view.addStorageGrids(StorageModel.getInstance().toolVOArr);
                };
                /**
                 * 获取果实
                 */
                StorageCtrl.prototype.request_getFruit = function () {
                    StorageModel.callback = this.getFruitOverFn;
                    StorageCtrl.model.request_getFruit();
                };
                StorageCtrl.prototype.getFruitOverFn = function (takeData) {
                    StorageCtrl.view.addStorageGrids(StorageModel.getInstance().seedVOArr);
                };
                StorageCtrl.prototype.request_getDecorate = function () {
                    StorageModel.callback = this.getDecorateOverFn;
                    StorageCtrl.model.request_getDecorate();
                };
                StorageCtrl.prototype.getDecorateOverFn = function (takeData) {
                    StorageCtrl.view.addStorageGrids(takeData);
                };
                return StorageCtrl;
            }());
            storage.StorageCtrl = StorageCtrl;
        })(storage = teaRoom.storage || (teaRoom.storage = {}));
    })(teaRoom = controllers.teaRoom || (controllers.teaRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=StorageCtrl.js.map