var controllers;
(function (controllers) {
    var teaRoom;
    (function (teaRoom) {
        var shop;
        (function (shop) {
            var Event = laya.events.Event;
            var ShopModel = models.teaRoom.shop.ShopModel;
            // import ShopDialogView = views.teaRoom.shop.ShopDialogView;
            /**
             * 商店相关的控制器
             */
            var ShopCtrl = /** @class */ (function () {
                function ShopCtrl() {
                    /** 底部工具栏的高度 */
                    this.toolBarH = 30;
                    if (!ShopCtrl.model)
                        ShopCtrl.model = ShopModel.instance;
                    if (!ShopCtrl.view)
                        ShopCtrl.view = new views.teaRoom.shop.ShopDialogView();
                    ShopCtrl.view.seedTab.on(Event.CLICK, this, this.request_getSeed);
                    ShopCtrl.view.toolTab.on(Event.CLICK, this, this.request_getTool);
                    ShopCtrl.view.decorateTab.on(Event.CLICK, this, this.request_getDecorate);
                    // ShopCtrl.view.on(Event.CLICK,this,this.itemClkedFn);
                    ShopCtrl.view.rightContent.buyBtn.on(Event.CLICK, this, this.request_buySingleGoods);
                }
                ShopCtrl.getInstance = function () {
                    if (!ShopCtrl._instance)
                        ShopCtrl._instance = new ShopCtrl();
                    return ShopCtrl._instance;
                };
                /**
                 * 点击工具栏商店图标显示商店面板
                 */
                ShopCtrl.prototype.showShopDialog = function () {
                    // UILayerManager.uiLayer.addChildAt(ShopCtrl.view,UILayerManager.uiLayer.numChildren-1);
                    UILayerManager.uiLayer.addChild(ShopCtrl.view);
                    ShopCtrl.view.visible = true;
                    ShopCtrl.view.x = configs.GameConfig.GAME_WINDOW_WIDTH - ShopCtrl.view.width >> 1;
                    ShopCtrl.view.y = configs.GameConfig.GAME_WINDOW_HEIGHT - ShopCtrl.view.height - this.toolBarH * 2;
                    this.request_getSeed();
                };
                /**
                 * 种子选项卡
                 */
                ShopCtrl.prototype.request_getSeed = function () {
                    ShopModel.callback = this.getSeedDataOver;
                    ShopCtrl.model.getSeedData();
                };
                ShopCtrl.prototype.getSeedDataOver = function (seedObjArr) {
                    ShopCtrl.view.addTabGrids(seedObjArr);
                };
                /**
                 * 道具选项卡
                 */
                ShopCtrl.prototype.request_getTool = function () {
                    ShopModel.callback = this.getToolOver;
                    ShopCtrl.model.request_getShopProp();
                };
                ShopCtrl.prototype.getToolOver = function (toolObjArr) {
                    ShopCtrl.view.addTabGrids(toolObjArr);
                };
                /**
                 * 装饰选项卡
                 */
                ShopCtrl.prototype.request_getDecorate = function () {
                };
                /**
                 * 点击每项，请求右侧的内容信息
                 */
                ShopCtrl.prototype.itemClkedFn = function (event) {
                    var curObj = event.target;
                    if (curObj.name == "saleBtn" || curObj.name == "decorateBtn" || curObj.name == "seedTab" || curObj.name == "toolTab" || curObj.name == "decorateTab")
                        return;
                    ShopCtrl.view.updateRightContent(ShopCtrl.view.curItem);
                    /*		请求右侧信息（其他地方用）：
                                let curItem:any = ShopCtrl.view.curItem;
                                if(curItem)
                                {
                                    let paraObj:Object = {"si":curItem["id"],"st":curItem["type"]};
                                    ShopModel.callback = this.getRightContentOverFn;
                                    ShopCtrl.model.request_getShopRightContentData(paraObj);
                                }
                    */
                };
                /**
                 * 更新右侧信息
                 */
                ShopCtrl.prototype.getRightContentOverFn = function () {
                    // ShopCtrl.view.updateRightContent(  );
                };
                /**
                 * 购买物品
                 */
                ShopCtrl.prototype.request_buySingleGoods = function () {
                    // 参数格式：{id,type,buyNums})，如：{"si":11,"st":"teaseed","bct":2}
                    ShopCtrl.model.request_buySingleGoods(ShopCtrl.view.curBuyObj);
                };
                return ShopCtrl;
            }());
            shop.ShopCtrl = ShopCtrl;
        })(shop = teaRoom.shop || (teaRoom.shop = {}));
    })(teaRoom = controllers.teaRoom || (controllers.teaRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=ShopCtrl.js.map