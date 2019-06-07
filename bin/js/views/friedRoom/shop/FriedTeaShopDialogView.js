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
        var shop;
        (function (shop) {
            var Event = laya.events.Event;
            var SeedVO = models.base.SeedVO;
            var TabItemUI = ui.gameUI.common.TabItemUI;
            var BaseBorderUI = ui.gameUI.common.BaseBorderUI;
            var ShopRightContentUI = ui.gameUI.shop.ShopRightContentUI;
            /**
             * 炒茶室商店弹出面板
             */
            var FriedTeaShopDialogView = /** @class */ (function (_super) {
                __extends(FriedTeaShopDialogView, _super); //ShopStoragePanelUI
                function FriedTeaShopDialogView() {
                    var _this = _super.call(this) || this;
                    _this.titleUrl = "gameUI/shop/title.png";
                    _this.baseUrl = "gameUI/common/";
                    /** 类型前缀 */
                    _this.typePrefix = _this.baseUrl + "resTypeIcon/";
                    /** 类型后缀 */
                    _this.typeSuffix = ".png";
                    /** 金币图标 */
                    _this.moneyUrl = _this.baseUrl + "icon/money.png";
                    /** 钻石图标 */
                    _this.goldUrl = _this.baseUrl + "icon/gold.png";
                    /** 购买数量 */
                    _this.buyNums = 0;
                    /** 当前项的单价 */
                    _this.singlePrice = 0;
                    _this.titleImg.skin = _this.titleUrl;
                    _this.dragArea = "0,0," + _this.width + ",60";
                    _this.cacheAs = "bitmap";
                    _this.bgImg.size(788, 450);
                    _this.size(788, 450);
                    // 根据缩放率来动态调整标题、关闭按钮
                    var wRate = (788 - 600) / 600;
                    var hRate = (450 - 400) / 400;
                    _this.closeBtn.x += _this.closeBtn.x * wRate;
                    _this.closeBtn.y -= _this.closeBtn.y * hRate;
                    _this.closeBtn.scale(1.5, 1.5);
                    _this.titleImg.skin = "gameUI/common/icon/shopName.png";
                    _this.titleImg.x = _this.width - _this.titleImg.width >> 1;
                    _this.titleImg.y += 3;
                    // 原料
                    _this.seedTab = new TabItemUI();
                    _this.seedTab.tabName.skin = "gameUI/common/icon/seedTabBg.png";
                    _this.seedTab.pos(20, 100);
                    _this.addChild(_this.seedTab);
                    _this.seedTab.on(Event.CLICK, _this, _this.seedTabFn);
                    // 道具
                    _this.toolTab = new TabItemUI();
                    _this.toolTab.tabName.skin = "gameUI/common/icon/toolTabBg.png";
                    _this.toolTab.pos(20, 176);
                    _this.addChild(_this.toolTab);
                    _this.toolTab.on(Event.CLICK, _this, _this.toolTabFn);
                    // 装饰
                    _this.decorateTab = new TabItemUI();
                    _this.decorateTab.tabName.skin = "gameUI/common/icon/decorateTabBg.png";
                    _this.decorateTab.pos(20, 252);
                    _this.addChild(_this.decorateTab);
                    _this.decorateTab.visible = false;
                    // this.decorateTab.on(Event.CLICK,this,this.decorateTabFn);
                    _this.gridContainer = new Laya.Panel();
                    _this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
                    _this.gridContainer.pos(115, 100);
                    _this.gridContainer.size(333, 333);
                    _this.addChild(_this.gridContainer);
                    _this.rightContent = new ShopRightContentUI();
                    _this.addChild(_this.rightContent);
                    _this.autoSize = true;
                    _this.rightContent.pos(_this.gridContainer.x + _this.gridContainer.width + 10, 100);
                    _this.rightContent.buyNumTxt.restrict = "0-9";
                    _this.seedTabFn();
                    _this.closeBtn.on(Event.CLICK, _this, _this.closeBtnFn);
                    return _this;
                }
                FriedTeaShopDialogView.prototype.seedTabFn = function () {
                    this.curSelectedTabName = "seedTab";
                    this.selectTab(this.seedTab);
                    this.unSelectTab(this.toolTab);
                    this.unSelectTab(this.decorateTab);
                    this.changeBtnState();
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                FriedTeaShopDialogView.prototype.toolTabFn = function () {
                    this.curSelectedTabName = "toolTab";
                    this.selectTab(this.toolTab);
                    this.unSelectTab(this.seedTab);
                    this.unSelectTab(this.decorateTab);
                    this.changeBtnState();
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                };
                FriedTeaShopDialogView.prototype.selectTab = function (tab) {
                    this.setTabIcon(tab);
                    tab.selectBg.visible = true;
                    tab.unSelectBg.visible = false;
                };
                FriedTeaShopDialogView.prototype.unSelectTab = function (tab) {
                    this.setTabIcon(tab);
                    tab.selectBg.visible = false;
                    tab.unSelectBg.visible = true;
                };
                FriedTeaShopDialogView.prototype.setTabIcon = function (tab) {
                    if (tab === this.seedTab)
                        tab.tabName.skin = "gameUI/common/icon/materialTabBg.png";
                    else if (tab === this.toolTab)
                        tab.tabName.skin = "gameUI/common/icon/toolTabBg.png";
                    else if (tab === this.decorateTab)
                        tab.tabName.skin = "gameUI/common/icon/decorateTabBg.png";
                };
                /**
                 * 根据选项卡切换对应的操作按钮
                 */
                FriedTeaShopDialogView.prototype.changeBtnState = function () {
                    if (this.curSelectedTabName == "decorateTab") {
                        this.rightContent.buyBtn.visible = false;
                        this.rightContent.preViewBtn.visible = true;
                    }
                    else {
                        this.rightContent.buyBtn.visible = true;
                        this.rightContent.preViewBtn.visible = false;
                    }
                };
                FriedTeaShopDialogView.prototype.closeBtnFn = function () {
                    this.removeSelf();
                    // 默认选中第一个选项卡
                    this.seedTabFn();
                };
                /**
                 * 添加选项卡下的格子项
                 */
                FriedTeaShopDialogView.prototype.addTabGrids = function (voArr) {
                    this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
                    if (!voArr || !voArr.length)
                        return;
                    var i;
                    var len = voArr.length;
                    if (this.curSelectedTabName == "seedTab") {
                        var seedObj = new SeedVO();
                        for (i = 0; i < len; i++) {
                            seedObj = voArr[i];
                            var gridItem = new ui.gameUI.common.GridItemUI();
                            gridItem.name = seedObj.id + " ";
                            gridItem.lvl.text = seedObj.lvl + "级";
                            gridItem.nameTxt.text = seedObj.name;
                            gridItem.nums.visible = false;
                            gridItem.imgContainer.skin = this.translateSwfTypeToPngType(seedObj.icon);
                            gridItem.salePrice.text = seedObj.seedBuyPrice + "";
                            gridItem.priceIcon.skin = this.goldUrl;
                            // if(gridItem.imgContainer.width>60 && gridItem.imgContainer.height>60)
                            // 	gridItem.imgContainer.size(60,60);
                            // else
                            gridItem.imgContainer.size(50, 50);
                            gridItem.typeIcon.skin = this.typePrefix + seedObj.type + this.typeSuffix;
                            // 显示首个对象的右侧信息
                            if (i == 0) {
                                this.gridItemClkedFn(seedObj);
                            }
                            this.gridContainer.addChild(gridItem);
                            // this.gridContainer.vScrollBar = this.vscrollBar;	// 2017-09-15 hsx
                            // this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
                            // 每行最多放 4 个
                            if (i >= 4) {
                                gridItem.x = parseInt((i - 4) % 4 + "") * (gridItem.width + 5);
                                gridItem.y = (parseInt((i - 4) / 4 + "") + 1) * (gridItem.height + 5);
                            }
                            else {
                                gridItem.x = i * (gridItem.width + 5);
                            }
                            gridItem.on(Event.CLICK, this, this.gridItemClkedFn, [seedObj]);
                        }
                    } // 道具
                    else if (this.curSelectedTabName == "toolTab") {
                        var toolObj = void 0;
                        for (i = 0; i < len; i++) {
                            toolObj = voArr[i];
                            var gridItem = new ui.gameUI.common.GridItemUI();
                            gridItem.name = toolObj.id + "";
                            gridItem.lvl.text = toolObj.lvl + "级";
                            gridItem.nameTxt.text = toolObj.name;
                            gridItem.nums.visible = false;
                            gridItem.imgContainer.skin = this.translateSwfTypeToPngType(toolObj.icon);
                            gridItem.imgContainer.size(50, 50);
                            gridItem.salePrice.text = toolObj.price + "";
                            if (toolObj.type == "book")
                                gridItem.priceIcon.skin = this.moneyUrl;
                            else
                                gridItem.priceIcon.skin = this.goldUrl;
                            // 显示首个对象的右侧信息
                            if (i == 0) {
                                this.gridItemClkedFn(toolObj);
                            }
                            this.gridContainer.addChild(gridItem);
                            // this.gridContainer.vScrollBar = this.vscrollBar; // 2017-09-15 hsx
                            // this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
                            // 每行最多放 4 个
                            if (i >= 4) {
                                gridItem.x = parseInt((i - 4) % 4 + "") * (gridItem.width + 5);
                                gridItem.y = (parseInt((i - 4) / 4 + "") + 1) * (gridItem.height + 5);
                            }
                            else {
                                gridItem.x = i * (gridItem.width + 5);
                            }
                            gridItem.on(Event.CLICK, this, this.gridItemClkedFn, [toolObj]);
                        }
                    }
                };
                /**
                 * 转换图片格式
                 */
                FriedTeaShopDialogView.prototype.translateSwfTypeToPngType = function (swfUrl) {
                    var pngUrl;
                    if (!swfUrl)
                        return null;
                    pngUrl = swfUrl.substring(0, swfUrl.lastIndexOf("."));
                    pngUrl += ".png";
                    return pngUrl;
                };
                /**
                 * 输入框输入后
                 */
                FriedTeaShopDialogView.prototype.saleNumsInputOverFn = function (event) {
                    // 需根据金币或钻石的量来判断能买多少
                };
                /**
                 * 购买数量+1
                 */
                FriedTeaShopDialogView.prototype.addOneBtnFn = function (event) {
                    this.buyNums++;
                    this.curBuyObj["bct"] = this.buyNums;
                    this.rightContent.buyNumTxt.text = this.buyNums + "";
                    this.rightContent.buyPrice.text = this.buyNums * this.singlePrice + "";
                    console.log("buyNums:" + this.buyNums + ", 总价：" + this.rightContent.buyPrice.text);
                    /*			if(this.saleNums > this.curItem["allNums"])
                                    return;
                                this.saleNums++;
                                if(this.saleNums > this.curItem["allNums"])
                                    this.saleNums = this.curItem["allNums"];
                                this.saleNumTxt.text = this.saleNums+"";
                                this.priceAll.text = parseInt(this.priceOne.text) * this.saleNums + "";
                    */
                };
                /**
                 * 购买数量-1
                 */
                FriedTeaShopDialogView.prototype.reduceOneBtnFn = function (event) {
                    if (this.buyNums == 0)
                        return;
                    this.buyNums--;
                    this.curBuyObj["bct"] = this.buyNums;
                    this.rightContent.buyNumTxt.text = this.buyNums + "";
                    this.rightContent.buyPrice.text = this.buyNums * this.singlePrice + "";
                    console.log("buyNums:" + this.buyNums);
                };
                FriedTeaShopDialogView.prototype.buyNumInputOverFn = function (event) {
                    this.buyNums = parseInt(this.rightContent.buyNumTxt.text);
                    this.curBuyObj["bct"] = this.buyNums;
                    this.rightContent.buyPrice.text = this.buyNums * this.singlePrice + "";
                };
                FriedTeaShopDialogView.prototype.gridItemClkedFn = function (obj) {
                    this.buyNums = 1;
                    this.rightContent.buyNumTxt.text = "1";
                    this.curBuyObj = { "si": obj["id"], "st": obj["type"], "bct": this.buyNums };
                    this.curItem = obj;
                    // 右侧信息
                    this.updateRightContent(obj);
                };
                /**
                 * 更新右侧信息
                 */
                FriedTeaShopDialogView.prototype.updateRightContent = function (obj) {
                    this.rightContent.nameTxt.text = obj["name"];
                    this.rightContent.iconImg.skin = this.translateSwfTypeToPngType(obj["icon"]);
                    this.rightContent.iconImg.size(50, 50);
                    // 等级不足
                    if (parseInt(obj["lvl"]) > models.player.PlayerInfoModel.playerInfo.level)
                        this.rightContent.lvlNoEnougnImg.visible = true;
                    else
                        this.rightContent.lvlNoEnougnImg.visible = false;
                    if (this.curSelectedTabName == "seedTab") {
                        this.singlePrice = obj["seedBuyPrice"];
                        this.rightContent.buyPrice.text = obj["seedBuyPrice"];
                        this.rightContent.priceIcon.skin = this.goldUrl;
                        this.rightContent.desTxt.text = obj["seedDes"];
                        this.rightContent.contentArea.text = "单体价格:" + obj["seedBuyPrice"] + "\n\n单批数量:" + obj["seedNums"];
                    }
                    else if (this.curSelectedTabName == "toolTab") {
                        this.singlePrice = obj["price"];
                        this.rightContent.buyPrice.text = obj["price"] + "";
                        if (obj["type"] == "book")
                            this.rightContent.priceIcon.skin = this.moneyUrl;
                        else
                            this.rightContent.priceIcon.skin = this.goldUrl;
                        var toolType = void 0;
                        if (obj["type"] == "book")
                            toolType = "工艺书";
                        else if (obj["type"] == "fire")
                            toolType = "火";
                        else if (obj["type"] == "saute_tool")
                            toolType = "炒锅升级强化道具";
                        this.rightContent.contentArea.text = "类型:" + toolType;
                        this.rightContent.desTxt.text = obj["des"];
                    }
                    this.rightContent.buyNumTxt.on(Event.INPUT, this, this.buyNumInputOverFn);
                    this.rightContent.buyNumTxt.on(Event.BLUR, this, this.buyNumInputOverFn);
                    this.rightContent.addOneBtn.on(Event.CLICK, this, this.addOneBtnFn);
                    this.rightContent.reduceOneBtn.on(Event.CLICK, this, this.reduceOneBtnFn);
                };
                return FriedTeaShopDialogView;
            }(BaseBorderUI //ShopStoragePanelUI
            ));
            shop.FriedTeaShopDialogView = FriedTeaShopDialogView;
        })(shop = friedRoom.shop || (friedRoom.shop = {}));
    })(friedRoom = views.friedRoom || (views.friedRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=FriedTeaShopDialogView.js.map