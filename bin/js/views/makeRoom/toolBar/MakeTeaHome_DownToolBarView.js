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
    var makeRoom;
    (function (makeRoom) {
        var toolBar;
        (function (toolBar) {
            var Event = laya.events.Event;
            var MakeTeaHome_DownToolBarUI = ui.gameUI.toolBar.MakeTeaHome_DownToolBarUI;
            var MakeTeaDialogCtrl = controllers.makeRoom.MakeTeaDialogCtrl;
            var Image = laya.ui.Image;
            var MakeTeaDialogModel = models.makeRoom.MakeTeaDialogModel;
            var MakeTeaHomeModel = models.makeRoom.MakeTeaHomeModel;
            /**
             * 下部工具条视图
             */
            var MakeTeaHome_DownToolBarView = /** @class */ (function (_super) {
                __extends(MakeTeaHome_DownToolBarView, _super);
                function MakeTeaHome_DownToolBarView() {
                    var _this = _super.call(this) || this;
                    MakeTeaHome_DownToolBarView.commonMouse = _this.hand1;
                    MakeTeaHome_DownToolBarView.curCursor = new Image();
                    _this.on(Event.CLICK, _this, _this.toolBarClkedFn);
                    return _this;
                }
                Object.defineProperty(MakeTeaHome_DownToolBarView, "instance", {
                    get: function () {
                        if (!MakeTeaHome_DownToolBarView._instance)
                            MakeTeaHome_DownToolBarView._instance = new MakeTeaHome_DownToolBarView();
                        return MakeTeaHome_DownToolBarView._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 点击工具条上的各个功能按钮
                 */
                MakeTeaHome_DownToolBarView.prototype.toolBarClkedFn = function (event) {
                    var curName = event.target.name;
                    // 普通手型光标
                    if (curName == "hand1") {
                        this.setShowTypeAndState2("hand1", this.hand1);
                    } // 泡茶向导
                    else if (curName == "guide") {
                        var powerVO = void 0;
                        var i = void 0;
                        var len = MakeTeaHomeModel.makeTeaPowerVOArr.length;
                        for (i = 0; i < len; i++) {
                            powerVO = MakeTeaHomeModel.makeTeaPowerVOArr[i];
                            if (powerVO.name == "hotUpWater" || powerVO.name == "finishDunkTea" || powerVO.name == "askDunk") {
                                TipLayerManager.tipLayer.showDrawBgTip("正在泡茶过程中不能重复泡茶");
                            }
                            else if (MakeTeaDialogModel.friedWaterVOArr.length > 0) {
                                TipLayerManager.tipLayer.showDrawBgTip("正在泡茶过程中不能重复泡茶");
                            }
                            else {
                                MakeTeaDialogCtrl.getInstance().showMakeTeaDialog();
                            }
                        }
                        this.setShowTypeAndState2("hand1", this.hand1);
                    }
                };
                /**
                 * 设置当前光标的类型和状态
                 * @param type 操作类型
                 * @param btnOrImg 图标对象，如 Button/Image
                 */
                MakeTeaHome_DownToolBarView.prototype.setShowTypeAndState2 = function (type, btnOrImg) {
                    configs.GameConfig.curOperateType = type;
                    MakeTeaHome_DownToolBarView.curCursor.skin = btnOrImg.skin;
                    MakeTeaHome_DownToolBarView.curCursor.name = btnOrImg.name;
                    MakeTeaHome_DownToolBarView.curCursor.x = btnOrImg.x;
                    MakeTeaHome_DownToolBarView.curCursor.y = btnOrImg.y - 50;
                    console.info("当前选中 id：" + btnOrImg.name + ", skin:" + btnOrImg.skin);
                };
                return MakeTeaHome_DownToolBarView;
            }(MakeTeaHome_DownToolBarUI));
            toolBar.MakeTeaHome_DownToolBarView = MakeTeaHome_DownToolBarView;
        })(toolBar = makeRoom.toolBar || (makeRoom.toolBar = {}));
    })(makeRoom = views.makeRoom || (views.makeRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=MakeTeaHome_DownToolBarView.js.map