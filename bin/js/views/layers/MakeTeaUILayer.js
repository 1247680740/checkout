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
    var layers;
    (function (layers) {
        var BaseView = views.base.BaseView;
        var GameConfig = configs.GameConfig;
        /**
         * 泡茶室UI层
         */
        var MakeTeaUILayer = /** @class */ (function (_super) {
            __extends(MakeTeaUILayer, _super);
            function MakeTeaUILayer() {
                var _this = _super.call(this) || this;
                //  this.playerInfoView = PlayerInfoCtrl.playerInfoView;
                //  this.playerInfoView.x=5;
                //  this.playerInfoView.y=0;
                //  this.playerInfoView.visible=true;
                //  this.addChild(this.playerInfoView);
                _this.downToolBarView = views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.instance;
                _this.downToolBarView.x = (GameConfig.GAME_WINDOW_WIDTH - _this.downToolBarView.width >> 1) >> 1;
                _this.downToolBarView.x = _this.downToolBarView.width * 2 + _this.downToolBarView.width >> 1;
                _this.downToolBarView.y = 500;
                _this.addChild(_this.downToolBarView);
                _this.rightDownToolBarView = new views.makeRoom.toolBar.MakeTeaRightDownToolBarView();
                _this.rightDownToolBarView.x = _this.downToolBarView.x + _this.downToolBarView.width + 40;
                _this.rightDownToolBarView.y = 520;
                _this.addChild(_this.rightDownToolBarView);
                // 光标设置
                // this.resetCursorState();
                Laya.timer.loop(100, _this, _this.updateCursorPosFn);
                return _this;
            }
            /**
             * 复位光标状态（普通鼠标类型）
             */
            MakeTeaUILayer.prototype.resetCursorState = function () {
                if (TipLayerManager.tipLayer) {
                    if (!TipLayerManager.tipLayer.getChildByName("makeTeaCursor"))
                        TipLayerManager.tipLayer.addChild(views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor);
                }
                this.downToolBarView.setShowTypeAndState2("hand1", this.downToolBarView.hand1);
                console.log("鼠标复位成功");
            };
            /**
             * 更新光标位置
             */
            MakeTeaUILayer.prototype.updateCursorPosFn = function () {
                views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.x = Laya.stage.mouseX - 5; // -20
                views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.y = Laya.stage.mouseY - 18; // -20  //原 '- 10' --- hsx 2017-09-13
            };
            MakeTeaUILayer.prototype.init = function (event) {
                _super.prototype.init.call(this);
            };
            return MakeTeaUILayer;
        }(BaseView));
        layers.MakeTeaUILayer = MakeTeaUILayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=MakeTeaUILayer.js.map