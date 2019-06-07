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
    var teaWiki;
    (function (teaWiki) {
        var Event = laya.events.Event;
        var TeaWikiCtrl = controllers.teaWiki.TeaWikiCtrl;
        /**
         * 茶百科弹出面板
         */
        var TeaWikiView = /** @class */ (function (_super) {
            __extends(TeaWikiView, _super);
            function TeaWikiView() {
                var _this = _super.call(this) || this;
                // 图片路径
                _this.imgPath = "gameUI/fireTea/";
                //图片后缀名
                _this.imgSuffix = ".png";
                // 左侧茶叶分类按钮数组
                _this.tabArr = [_this.tab1, _this.tab2, _this.tab3, _this.tab4, _this.tab5, _this.tab6, _this.tab7, _this.tab8];
                _this.cacheAs = "bitmap";
                _this.dragArea = "0,0," + _this.width + ",60";
                _this.mc = new Laya.MovieClip();
                _this.selectTab(_this.tab1);
                for (var i = 1; i < 9; i++) {
                    _this.getChildByName("tab" + i).on(Event.CLICK, _this, _this.setStatus);
                }
                _this.closeBtn.on(Event.CLICK, _this, _this.closeBtnFn);
                return _this;
            }
            TeaWikiView.prototype.setStatus = function (event) {
                var i;
                var len = this.tabArr.length;
                var tempBox;
                this.curSelectedTabName = event.target.name;
                var eventBox = this.getChildByName(this.curSelectedTabName);
                for (i = 0; i < len; i++) {
                    tempBox = this.tabArr[i];
                    if (eventBox == tempBox)
                        this.selectTab(eventBox);
                    else
                        this.unSelectTab(tempBox);
                }
            };
            TeaWikiView.prototype.selectTab = function (tab) {
                tab.getChildByName("selectBg").visible = false;
                tab.getChildByName("unSelectBg").visible = true;
            };
            TeaWikiView.prototype.unSelectTab = function (tab) {
                tab.getChildByName("selectBg").visible = true;
                tab.getChildByName("unSelectBg").visible = false;
            };
            /**
             * 右侧列表填充
             */
            TeaWikiView.prototype.addFireTeaWikiGrids = function (voArr) {
                if (!voArr || !voArr.length)
                    return;
                this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                var i;
                var len = voArr.length;
                var teaWikiInfoVO;
                var _loop_1 = function () {
                    var gridItem = new ui.gameUI.teaWiki.TeaWikiGridItemUI();
                    teaWikiInfoVO = voArr[i];
                    gridItem.name = teaWikiInfoVO.id + "";
                    gridItem.itemName.text = teaWikiInfoVO.name;
                    gridItem.gridItemBg.skin = this_1.imgPath + "border_1" + this_1.imgSuffix;
                    gridItem.y = i * (gridItem.height + 8);
                    // 请求第一项的详细介绍
                    if (i == 0) {
                        gridItem.gridItemBg.skin = this_1.imgPath + "border_2" + this_1.imgSuffix;
                        TeaWikiCtrl.getInstance().itemClkedFn(teaWikiInfoVO);
                    }
                    this_1.gridContainer.addChild(gridItem);
                    gridItem.on(Event.CLICK, this_1, function () {
                        gridItem.gridItemBg.skin = this.imgPath + "border_2" + this.imgSuffix;
                        this.imgContainer.removeChildren();
                        TeaWikiCtrl.getInstance().itemTauchFn(parseInt(gridItem.name), teaWikiInfoVO);
                    });
                };
                var this_1 = this;
                for (i = 0; i < len; i++) {
                    _loop_1();
                }
            };
            /**
             * 每项的详细介绍
             */
            TeaWikiView.prototype.addFireTeaWikiImgs = function (voArr) {
                if (!voArr || !voArr.length)
                    return;
                var i;
                var icon;
                var len = voArr.length;
                var teaWikiInfoVO;
                for (i = 0; i < len; i++) {
                    teaWikiInfoVO = voArr[i];
                    this.mc.url = teaWikiInfoVO.icon;
                    this.mc.size(700, 403);
                    this.mc.scale(0.95, 0.95);
                    this.imgContainer.addChild(this.mc);
                    if (teaWikiInfoVO.pre == 0) {
                        this.pre.visible = false;
                        this.pre.mouseEnabled = false;
                    }
                    else {
                        this.pre.visible = true;
                        this.pre.mouseEnabled = true;
                    }
                }
            };
            TeaWikiView.prototype.closeBtnFn = function () {
                this.removeSelf();
            };
            return TeaWikiView;
        }(ui.gameUI.teaWiki.TeaWikiDialogUI));
        teaWiki.TeaWikiView = TeaWikiView;
    })(teaWiki = views.teaWiki || (views.teaWiki = {}));
})(views || (views = {}));
//# sourceMappingURL=TeaWikiView.js.map