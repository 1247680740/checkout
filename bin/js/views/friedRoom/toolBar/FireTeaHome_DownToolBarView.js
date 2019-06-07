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
    var friedRoom;
    (function (friedRoom) {
        var toolBar;
        (function (toolBar) {
            var Event = laya.events.Event;
            var FireTeaHome_DownToolBarUI = ui.gameUI.toolBar.FireTeaHome_DownToolBarUI;
            var Image = laya.ui.Image;
            var FireTeaBagCtrl = controllers.friedRoom.bag.FireTeaBagCtrl;
            var UpGradePotCtrl = controllers.friedRoom.pot.UpGradePotCtrl;
            var IntensifyPotCtrl = controllers.friedRoom.pot.IntensifyPotCtrl;
            /**
             * 下部工具条视图
             */
            var FireTeaHome_DownToolBarView = /** @class */ (function (_super) {
                __extends(FireTeaHome_DownToolBarView, _super);
                function FireTeaHome_DownToolBarView() {
                    var _this = _super.call(this) || this;
                    FireTeaHome_DownToolBarView.commonMouse = _this.hand1;
                    FireTeaHome_DownToolBarView.curCursor = new Image();
                    // FireTeaHome_DownToolBarView.curCursor.name = "fireTeaCursor";
                    _this.mouseThrough = true;
                    _this.on(Event.CLICK, _this, _this.toolBarClkedFn);
                    return _this;
                }
                Object.defineProperty(FireTeaHome_DownToolBarView, "instance", {
                    get: function () {
                        if (!FireTeaHome_DownToolBarView._instance)
                            FireTeaHome_DownToolBarView._instance = new FireTeaHome_DownToolBarView();
                        return FireTeaHome_DownToolBarView._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 点击工具条上的各个功能按钮
                 */
                FireTeaHome_DownToolBarView.prototype.toolBarClkedFn = function (event) {
                    var curName = event.target.name;
                    // 普通手型光标
                    if (curName == "hand1") {
                        this.setShowTypeAndState2("hand1", this.hand1);
                    } // 炒锅升级
                    else if (curName == "pot_1") {
                        this.setShowTypeAndState2("pot-1", this.pot_1);
                        UpGradePotCtrl.getInstance().showUpGradeDialog();
                        this.setShowTypeAndState2("hand1", this.hand1);
                    } // 刷子
                    else if (curName == "brush") {
                        this.setShowTypeAndState2("brush", this.brush);
                    } // 背包
                    else if (curName === "bag") {
                        FireTeaBagCtrl.getInstance().showFireTeaBagDialog();
                        this.setShowTypeAndState2("hand1", this.hand1);
                    } // 炒锅强化
                    else if (curName === "pot_2") {
                        this.setShowTypeAndState2("pot-1", this.pot_1);
                        IntensifyPotCtrl.getInstance().showPotIntensifyDialog();
                        this.setShowTypeAndState2("hand1", this.hand1);
                    } // 收获
                    else if (curName === "hand2") {
                        this.setShowTypeAndState2("hand2", this.hand2);
                    } // 自动收获
                    else if (curName == "hand3") {
                        this.setShowTypeAndState2("hand3", this.hand3);
                    }
                };
                /**
                 * 设置当前光标的类型和状态
                 * @param type 操作类型
                 * @param btnOrImg 图标对象，如 Button/Image
                 */
                FireTeaHome_DownToolBarView.prototype.setShowTypeAndState2 = function (type, btnOrImg) {
                    configs.GameConfig.curOperateType = type;
                    FireTeaHome_DownToolBarView.curCursor.skin = btnOrImg.skin;
                    FireTeaHome_DownToolBarView.curCursor.name = btnOrImg.name;
                    FireTeaHome_DownToolBarView.curCursor.x = btnOrImg.x;
                    FireTeaHome_DownToolBarView.curCursor.y = btnOrImg.y - 50;
                    if (btnOrImg.name == "hand1") {
                        FireTeaHome_DownToolBarView.curCursor.pivotX = 5;
                        FireTeaHome_DownToolBarView.curCursor.pivotY = 5;
                    }
                    else {
                        FireTeaHome_DownToolBarView.curCursor.pivotX = 5;
                        FireTeaHome_DownToolBarView.curCursor.pivotY = FireTeaHome_DownToolBarView.curCursor.height / 2 + 10;
                    }
                };
                return FireTeaHome_DownToolBarView;
            }(FireTeaHome_DownToolBarUI));
            toolBar.FireTeaHome_DownToolBarView = FireTeaHome_DownToolBarView;
        })(toolBar = friedRoom.toolBar || (friedRoom.toolBar = {}));
    })(friedRoom = views.friedRoom || (views.friedRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=FireTeaHome_DownToolBarView.js.map