var controllers;
(function (controllers) {
    var friedRoom;
    (function (friedRoom) {
        var shop;
        (function (shop) {
            var Event = laya.events.Event;
            var FriedTeaHomeShopModel = models.friedRoom.shop.FriedTeaHomeShopModel;
            /**
             * 炒茶室商店相关控制器
             */
            var FriedTeaHomeShopCtrl = /** @class */ (function () {
                function FriedTeaHomeShopCtrl() {
                    /** 底部工具栏的高度 */
                    this.toolBarH = 30;
                    if (!FriedTeaHomeShopCtrl.model)
                        FriedTeaHomeShopCtrl.model = FriedTeaHomeShopModel.instance;
                    if (!FriedTeaHomeShopCtrl.view)
                        FriedTeaHomeShopCtrl.view = new views.friedRoom.shop.FriedTeaShopDialogView();
                    FriedTeaHomeShopCtrl.view.seedTab.on(Event.CLICK, this, this.request_getChaoMaterial);
                    FriedTeaHomeShopCtrl.view.toolTab.on(Event.CLICK, this, this.request_getShopScroll);
                    FriedTeaHomeShopCtrl.view.rightContent.buyBtn.on(Event.CLICK, this, this.request_buySingleGoods);
                }
                FriedTeaHomeShopCtrl.getInstance = function () {
                    if (!FriedTeaHomeShopCtrl._instance)
                        FriedTeaHomeShopCtrl._instance = new FriedTeaHomeShopCtrl();
                    return FriedTeaHomeShopCtrl._instance;
                };
                /**
                 * 点击工具栏商店图标显示商店面板
                 */
                FriedTeaHomeShopCtrl.prototype.showShopDialog = function () {
                    UILayerManager.uiLayer.addChild(FriedTeaHomeShopCtrl.view);
                    FriedTeaHomeShopCtrl.view.visible = true;
                    FriedTeaHomeShopCtrl.view.x = configs.GameConfig.GAME_WINDOW_WIDTH - FriedTeaHomeShopCtrl.view.width >> 1;
                    FriedTeaHomeShopCtrl.view.y = configs.GameConfig.GAME_WINDOW_HEIGHT - FriedTeaHomeShopCtrl.view.height - this.toolBarH * 2;
                    this.request_getChaoMaterial();
                };
                /**
                 * 炒茶原料选项卡
                 */
                FriedTeaHomeShopCtrl.prototype.request_getChaoMaterial = function () {
                    FriedTeaHomeShopModel.callback = this.getChaoMaterialOver;
                    FriedTeaHomeShopCtrl.model.request_getChaoMaterial();
                };
                FriedTeaHomeShopCtrl.prototype.getChaoMaterialOver = function (seedObjArr) {
                    FriedTeaHomeShopCtrl.view.addTabGrids(seedObjArr);
                };
                /**
                 * 道具选项卡
                 */
                FriedTeaHomeShopCtrl.prototype.request_getShopScroll = function () {
                    FriedTeaHomeShopModel.callback = this.getShopScrollOver;
                    FriedTeaHomeShopCtrl.model.request_getShopScroll();
                };
                FriedTeaHomeShopCtrl.prototype.getShopScrollOver = function (toolObjArr) {
                    FriedTeaHomeShopCtrl.view.addTabGrids(toolObjArr);
                };
                /**
                 * 购买物品
                 */
                FriedTeaHomeShopCtrl.prototype.request_buySingleGoods = function () {
                    FriedTeaHomeShopCtrl.model.request_buySingleGoods(FriedTeaHomeShopCtrl.view.curBuyObj);
                };
                return FriedTeaHomeShopCtrl;
            }());
            shop.FriedTeaHomeShopCtrl = FriedTeaHomeShopCtrl;
        })(shop = friedRoom.shop || (friedRoom.shop = {}));
    })(friedRoom = controllers.friedRoom || (controllers.friedRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=FriedTeaHomeShopCtrl.js.map