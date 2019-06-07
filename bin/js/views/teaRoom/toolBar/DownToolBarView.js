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
        var toolBar;
        (function (toolBar) {
            var Event = laya.events.Event;
            var DownToolBarUI = ui.gameUI.toolBar.DownToolBarUI;
            var Image = laya.ui.Image;
            var BagCtrl = controllers.teaRoom.bag.BagCtrl;
            /**
             * 下部工具条视图
             */
            var DownToolBarView = /** @class */ (function (_super) {
                __extends(DownToolBarView, _super);
                function DownToolBarView() {
                    var _this = _super.call(this) || this;
                    DownToolBarView.commonMouse = _this.commonMouse;
                    DownToolBarView.curShowCursor = new Image();
                    // DownToolBarView.curShowCursor.name = "sceneCursor";
                    // 鼠标可穿透，增加点击的精确性
                    _this.mouseThrough = true;
                    _this.on(Event.CLICK, _this, _this.toolBarClkedFn);
                    return _this;
                }
                Object.defineProperty(DownToolBarView, "instance", {
                    get: function () {
                        if (!DownToolBarView._instance)
                            DownToolBarView._instance = new DownToolBarView();
                        return DownToolBarView._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 点击工具条上的各个功能按钮
                 */
                DownToolBarView.prototype.toolBarClkedFn = function (event) {
                    var curName = event.target.name;
                    if (this.toolBoxView)
                        this.toolBoxView.visible = false;
                    // 普通手型光标
                    if (curName == "commonMouse") {
                        this.setShowTypeAndState("commonMouse", this.commonMouse);
                    } // 土地升级
                    else if (curName == "landUpgrade") {
                        this.setShowTypeAndState("landUpgrade", this.landUpgrade);
                    } // 铁锹（翻地/铲除枯萎作物）
                    else if (curName == "spade") {
                        this.setShowTypeAndState("removeCrop", this.spade);
                    } // 背包
                    else if (curName === "bag") {
                        configs.GameConfig.curOperateType = "bag";
                        this.setShowTypeAndState("commonMouse", this.commonMouse);
                        BagCtrl.getInstance().showBagDialog();
                    } // 工具箱
                    else if (curName === "toolBox") {
                        this.setShowTypeAndState("commonMouse", this.commonMouse);
                        if (!this.toolBoxView)
                            this.toolBoxView = new views.teaRoom.toolBar.DownToolBoxView();
                        // this.toolBoxView.size(200,60);
                        // this.toolBoxView.width=200;
                        // this.toolBoxView._width=200;
                        this.toolBoxView.grass.visible = false;
                        this.toolBoxView.worm.visible = false;
                        this.toolBoxView.grass.mouseEnabled = false;
                        this.toolBoxView.worm.mouseEnabled = false;
                        this.toolBoxView.visible = true;
                        this.toolBoxView.name = "toolBoxView";
                        UILayerManager.teaGardenUI.addChild(this.toolBoxView);
                        this.toolBoxView.x = this.toolBox.x - 5;
                        this.toolBoxView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - this.toolBoxView.height - 80;
                    } // 单个收获
                    else if (curName === "harvestOne") {
                        this.setShowTypeAndState("harvestOne", this.harvestOne);
                    } // 全部收获
                    else if (curName == "harvestAll") {
                        this.setShowTypeAndState("harvestAll", this.harvestAll);
                    }
                };
                /**
                 * 设置当前光标的类型和状态
                 * @param type 操作类型
                 * @param btnOrImg 图标对象，如 Button/Image
                 */
                DownToolBarView.prototype.setShowTypeAndState = function (type, btnOrImg) {
                    configs.GameConfig.curOperateType = type;
                    DownToolBarView.curShowCursor.skin = btnOrImg.skin;
                    DownToolBarView.curShowCursor.name = btnOrImg.name;
                    DownToolBarView.curShowCursor.x = btnOrImg.x;
                    DownToolBarView.curShowCursor.y = btnOrImg.y - 50;
                    if (btnOrImg.name == "commonMouse") {
                        DownToolBarView.curShowCursor.pivotX = 5;
                        DownToolBarView.curShowCursor.pivotY = 5;
                    }
                    else {
                        DownToolBarView.curShowCursor.pivotX = 5;
                        DownToolBarView.curShowCursor.pivotY = DownToolBarView.curShowCursor.height / 2 + 10;
                    }
                };
                return DownToolBarView;
            }(DownToolBarUI));
            toolBar.DownToolBarView = DownToolBarView;
        })(toolBar = teaRoom.toolBar || (teaRoom.toolBar = {}));
    })(teaRoom = views.teaRoom || (views.teaRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=DownToolBarView.js.map