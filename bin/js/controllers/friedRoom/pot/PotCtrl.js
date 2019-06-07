var controllers;
(function (controllers) {
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot) {
            var TipLayerManager = managers.TipLayerManager;
            var PotModel = models.friedRoom.pot.PotModel;
            /**
             * 炒锅相关的控制类
             */
            var PotCtrl = /** @class */ (function () {
                function PotCtrl() {
                    /** 底部工具栏的高度 */
                    this.toolBarH = 30;
                    PotCtrl.potModel = PotModel.getInstance();
                    if (!PotCtrl.friedPotView)
                        PotCtrl.friedPotView = new views.friedRoom.pot.FriedPotView();
                }
                PotCtrl.getInstance = function () {
                    if (!PotCtrl.instance)
                        PotCtrl.instance = new PotCtrl();
                    return PotCtrl.instance;
                };
                /** 点击 “未激活” 图标，准备激活 */
                PotCtrl.prototype.willAssartFun = function (id) {
                    this.curPotId = id;
                    PotModel.callback = this.getAssartPotInfoOver;
                    PotCtrl.potModel.request_getAssartPotInfo(this.curPotId);
                };
                /** 激活炒锅对话框 */
                PotCtrl.prototype.getAssartPotInfoOver = function (takeData) {
                    if (takeData)
                        console.info("== PotCtrl, takeData:" + takeData);
                    var needMoney = takeData["t"];
                    // 激活提示
                    TipLayerManager.tipLayer.showEnableTip(needMoney);
                };
                /** 请求炒锅接口 */
                PotCtrl.prototype.request_getFarmPot = function () {
                    PotModel.callback = PotCtrl.instance.getFarmPotOver;
                    PotCtrl.potModel.request_getCauldron();
                };
                /** 填充炒锅 */
                PotCtrl.prototype.getFarmPotOver = function () {
                    PotCtrl.friedPotView.fillPot(PotModel.potArr);
                };
                /** 激活炒锅 */
                PotCtrl.prototype.request_actAssartPot = function () {
                    PotModel.callback = this.actAssartPotOver;
                    PotCtrl.potModel.request_actAssartPot(this.curPotId);
                };
                /**
                 * 激活完成
                 */
                PotCtrl.prototype.actAssartPotOver = function (potId) {
                    // 更新炒锅状态
                    PotCtrl.friedPotView.updatePotGrid(potId);
                };
                /**
                 * 更新炒锅的显示状态
                 */
                PotCtrl.prototype.potLevelUpOver = function (takeData) {
                    var potId = takeData["potId"];
                    var curPotVO = PotModel.getPotVOByPotId(potId);
                    if (!curPotVO)
                        return;
                };
                /**
                 * 单个收获炒锅中的茶叶
                 */
                PotCtrl.prototype.request_reapTea = function (potVO) {
                    PotModel.callback = this.singleHarvestOver;
                    PotCtrl.potModel.request_reapTeaInfo(potVO.id);
                };
                PotCtrl.prototype.singleHarvestOver = function (takeData) {
                    if (!takeData)
                        return;
                    var potId = takeData["potId"];
                    if (PotCtrl.callback)
                        PotCtrl.callback(potId);
                };
                /**
                 * 清除炒锅中的茶叶
                 */
                PotCtrl.prototype.request_brushPot = function (potVO) {
                    if (!potVO)
                        return;
                    if (potVO.status == 1 || potVO.status == 2) {
                        PotModel.callback = this.brushPotOver;
                        PotCtrl.potModel.request_brushPotInfo(potVO.id);
                    }
                };
                /**
                 * 使用火把加火
                 */
                PotCtrl.prototype.request_sauteUseTool = function (potId, toolId) {
                    PotModel.callback = this.useToolOver;
                    PotCtrl.potModel.request_sauteUseTool(potId, toolId);
                };
                /**
                 * @param leftTime 使用火把后的剩余时间（秒）
                 */
                PotCtrl.prototype.useToolOver = function (takeData) {
                    if (PotCtrl.callback)
                        PotCtrl.callback(takeData);
                };
                PotCtrl.prototype.brushPotOver = function (takeData) {
                    if (PotCtrl.callback)
                        PotCtrl.callback(takeData);
                };
                return PotCtrl;
            }());
            pot.PotCtrl = PotCtrl;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = controllers.friedRoom || (controllers.friedRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=PotCtrl.js.map