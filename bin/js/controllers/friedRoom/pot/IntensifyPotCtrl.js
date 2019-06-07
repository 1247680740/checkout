var controllers;
(function (controllers) {
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot) {
            var IntensifyPotModel = models.friedRoom.pot.IntensifyPotModel;
            var Event = laya.events.Event;
            /**
            * 炒茶相关控制器
            */
            var IntensifyPotCtrl = /** @class */ (function () {
                function IntensifyPotCtrl() {
                    if (!IntensifyPotCtrl.model)
                        IntensifyPotCtrl.model = IntensifyPotModel.getInstance();
                    if (!IntensifyPotCtrl.intensifyview)
                        IntensifyPotCtrl.intensifyview = new views.friedRoom.pot.IntensifyPotView();
                    IntensifyPotCtrl.intensifyview.bgUI.closeBtn.on(Event.CLICK, this, this.closeBtnFn);
                    IntensifyPotCtrl.intensifyview.metal.on(Event.CLICK, this, this.request_getUPDate);
                    IntensifyPotCtrl.intensifyview.wood.on(Event.CLICK, this, this.request_getUPDate);
                    IntensifyPotCtrl.intensifyview.water.on(Event.CLICK, this, this.request_getUPDate);
                    IntensifyPotCtrl.intensifyview.fire.on(Event.CLICK, this, this.request_getUPDate);
                    IntensifyPotCtrl.intensifyview.earth.on(Event.CLICK, this, this.request_getUPDate);
                    IntensifyPotCtrl.intensifyview.way.on(Event.CLICK, this, this.request_getUPDate);
                }
                IntensifyPotCtrl.getInstance = function () {
                    if (!IntensifyPotCtrl.instance)
                        IntensifyPotCtrl.instance = new IntensifyPotCtrl();
                    return IntensifyPotCtrl.instance;
                };
                /** 显示炒锅强化弹窗 */
                IntensifyPotCtrl.prototype.showPotIntensifyDialog = function () {
                    // 2017-09-20
                    // UILayerManager.uiLayer.addChildAt(IntensifyPotCtrl.intensifyview.bgUI, UILayerManager.uiLayer.numChildren - 1);
                    if (!UILayerManager.friedTeaLayer.getChildByName("intensifyview")) {
                        IntensifyPotCtrl.intensifyview.bgUI.name = "intensifyview";
                        UILayerManager.friedTeaLayer.addChild(IntensifyPotCtrl.intensifyview.bgUI);
                    }
                    IntensifyPotCtrl.intensifyview.bgUI.visible = true;
                    IntensifyPotCtrl.intensifyview.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - IntensifyPotCtrl.intensifyview.bgUI.width >> 1;
                    IntensifyPotCtrl.intensifyview.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - IntensifyPotCtrl.intensifyview.bgUI.height >> 1;
                    this.request_getUPDate();
                };
                IntensifyPotCtrl.prototype.closeBtnFn = function () {
                    // 2017-09-20
                    // IntensifyPotCtrl.intensifyview.bgUI.removeSelf();
                    // IntensifyPotCtrl.intensifyview.destroy(false);
                    // IntensifyPotCtrl.intensifyview = null;
                    IntensifyPotCtrl.intensifyview.bgUI.visible = false;
                };
                /** 请求炒锅全部状态信息 */
                IntensifyPotCtrl.prototype.request_getUPDate = function () {
                    IntensifyPotModel.callback = IntensifyPotCtrl.instance.getUpDateOver;
                    IntensifyPotCtrl.model.request_getFarmPot();
                };
                IntensifyPotCtrl.prototype.getUpDateOver = function () {
                    IntensifyPotCtrl.intensifyview.fillUpData(IntensifyPotModel.potArr);
                };
                /**  请求获取炒锅强化成功后的状态变化数据*/
                IntensifyPotCtrl.prototype.request_FinishData = function (id) {
                    IntensifyPotModel.callback = IntensifyPotCtrl.instance.getFinishData;
                    IntensifyPotCtrl.model.request_strengthPot(id);
                };
                IntensifyPotCtrl.prototype.getFinishData = function () {
                    IntensifyPotCtrl.intensifyview.finishUpGrade(IntensifyPotModel.getInstance().potVOArr);
                };
                /** 请求获取中部材料数量并加载 */
                IntensifyPotCtrl.prototype.request_needUpData = function (id, level) {
                    IntensifyPotModel.callback = IntensifyPotCtrl.instance.fillMidData;
                    IntensifyPotCtrl.model.request_UPDate(id, level);
                };
                IntensifyPotCtrl.prototype.fillMidData = function (takeData) {
                    IntensifyPotCtrl.intensifyview.addUpDate(IntensifyPotModel.getInstance().potVOArr);
                };
                IntensifyPotCtrl.prototype.willBuyDataOver = function (potsArr, curBuyName) {
                    TipLayerManager.tipLayer.showIntensifyPotTip(potsArr, curBuyName);
                };
                /** 确认购买强化材料 */
                IntensifyPotCtrl.prototype.request_confirmBuy = function (potVO) {
                    IntensifyPotCtrl.model.request_ConfirmBuy(potVO.toolId, parseInt(potVO.lockToolNums));
                };
                /** 取消购买，强化 */
                IntensifyPotCtrl.prototype.cancelBtnClkFn = function () {
                    IntensifyPotCtrl.intensifyview.removeChild(IntensifyPotCtrl.dataView);
                    IntensifyPotCtrl.dataView = null;
                };
                return IntensifyPotCtrl;
            }());
            pot.IntensifyPotCtrl = IntensifyPotCtrl;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = controllers.friedRoom || (controllers.friedRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=IntensifyPotCtrl.js.map