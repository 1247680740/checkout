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
        var Event = laya.events.Event;
        var LeftTopToolBarUI = ui.gameUI.toolBar.LeftTopToolBarUI;
        var LeftToolBarUI = ui.gameUI.toolBar.LeftToolBarUI;
        var PlayerInfoCtrl = controllers.player.PlayerInfoCtrl;
        var PlayerInfoModel = models.player.PlayerInfoModel;
        /**
         * UI层（存放各个场景中的通用UI，也用于切换场景）
         */
        var UILayer = /** @class */ (function (_super) {
            __extends(UILayer, _super);
            function UILayer() {
                var _this = _super.call(this) || this;
                _this.pos(50, 10);
                _this.playerInfoView = PlayerInfoCtrl.playerInfoView;
                _this.addChild(_this.playerInfoView);
                _this.leftTopToolBarView = new LeftTopToolBarUI();
                _this.leftTopToolBarView.x = 10;
                _this.leftTopToolBarView.y = _this.playerInfoView.height + 5;
                _this.addChild(_this.leftTopToolBarView);
                _this.leftTopToolBarView.teaRoom.texture = Laya.loader.getRes("gameUI/toolBar/tea_graden.png");
                _this.leftToolBar = new LeftToolBarUI();
                _this.leftToolBar.x = 0;
                _this.leftToolBar.y = _this.leftTopToolBarView.y + _this.leftTopToolBarView.height + 60;
                _this.addChild(_this.leftToolBar);
                _this.on(Event.CLICK, _this, _this.toolBarClkedFn);
                return _this;
            }
            UILayer.prototype.init = function (event) {
                _super.prototype.init.call(this);
            };
            /**
             * 切换场景
             */
            UILayer.prototype.toolBarClkedFn = function (event) {
                var curName = event.target.name;
                // 茶园
                if (curName == "teaRoom") {
                    this.loadTeaRoom();
                } // 炒茶室
                else if (curName == "friedTea") {
                    this.loadFriedTea();
                } // 泡茶室
                else if (curName == "makeTea") {
                    this.loadMakeTea();
                } // 排行榜
                else if (curName == "ranklist") {
                    controllers.ranklist.RankListCtrl.instance.request_getGradeRank({ "page": 1, "num": 6 });
                    this.addChildCenter(controllers.ranklist.RankListCtrl.view, "ranklist");
                } // 活动
                else if (curName == "activity") {
                    this.loadActivityTip();
                } // 使用说明
                else if (curName == "useExplain") {
                    this.loadUseExplain();
                }
            };
            /**
             * 茶园
             */
            UILayer.prototype.loadTeaRoom = function () {
                PlayerInfoModel.friendInfo.userId = null;
                SceneLayerManager.instance.initTeaGardenScene();
                UILayerManager.getInstance().initTeaGardenUI();
                if (TipLayerManager.tipLayer)
                    TipLayerManager.tipLayer.showMainSceneCursor();
            };
            /**
             * 炒茶室
             */
            UILayer.prototype.loadFriedTea = function () {
                PlayerInfoModel.friendInfo.userId = null;
                SceneLayerManager.instance.friedTeaScene();
                UILayerManager.getInstance().showFriedTeaUI();
                if (TipLayerManager.tipLayer)
                    TipLayerManager.tipLayer.showFriedTeaCursor();
            };
            /**
             * 泡茶室
             */
            UILayer.prototype.loadMakeTea = function () {
                PlayerInfoModel.friendInfo.userId = null;
                SceneLayerManager.instance.makeTeaScene();
                UILayerManager.getInstance().showMakeTeaUI();
                if (TipLayerManager.tipLayer)
                    TipLayerManager.tipLayer.showMakeTeaCursor();
            };
            /**
             * 好友茶园
             */
            UILayer.prototype.loadFriendTea = function () {
                SceneLayerManager.instance.friendGardenScene();
                /** 加载好友茶园工具栏，好友信息等 */
                UILayerManager.getInstance().initFriendUILayer();
                // Laya.stage.addChild(UILayerManager.friendUILayer);  // TEST
                if (TipLayerManager.tipLayer)
                    TipLayerManager.tipLayer.showFriendSceneCursor();
            };
            /**
             * 活动面板
             */
            UILayer.prototype.loadActivityTip = function () {
                controllers.activity.ActivityTipCtrl.instance.getActivityData();
                this.addChildCenter(controllers.activity.ActivityTipCtrl.view, "activity");
            };
            /**
             * 使用说明
             */
            UILayer.prototype.loadUseExplain = function () {
                var useExplainView = new ui.gameUI.common.BaseBorderUI();
                useExplainView.name = "useExplain";
                useExplainView.titleImg.skin = "gameUI/common/icon/useExplainName.png";
                useExplainView.titleImg.x = useExplainView.width - useExplainView.titleImg.width >> 1;
                var contentImg = new Laya.Image();
                contentImg.skin = "gameUI/common/imgs/useExplain.png";
                contentImg.pos(40, 100);
                useExplainView.addChild(contentImg);
                useExplainView.closeBtn.once(Event.CLICK, this, this.closeUseExplain);
                useExplainView.closeBtn.scale(1.3, 1.3);
                this.addChildCenter(useExplainView, "useExplain");
            };
            UILayer.prototype.closeUseExplain = function (event) {
                event.target.parent.removeSelf();
            };
            /**
             * 将子对象居中添加至 UILayer
             */
            UILayer.prototype.addChildCenter = function (child, childName) {
                if (!this.getChildByName(childName))
                    this.addChild(child);
                child.x = configs.GameConfig.GAME_WINDOW_WIDTH - child.width >> 1;
                child.y = configs.GameConfig.GAME_WINDOW_HEIGHT - child.height >> 1;
            };
            return UILayer;
        }(BaseView));
        layers.UILayer = UILayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=UILayer.js.map