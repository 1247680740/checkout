var models;
(function (models) {
    var teaRoom;
    (function (teaRoom) {
        var shop;
        (function (shop) {
            // import PlayerInfoModel = models.player.PlayerInfoModel;
            // import ResourceManager = managers.ResourceManager;
            /**
             * 商店数据模型
             */
            var ShopModel = /** @class */ (function () {
                function ShopModel() {
                    this.seedObjArr = managers.ResourceManager.seedsObjArr;
                    this.toolObjArr = managers.ResourceManager.toolsObjArr;
                }
                Object.defineProperty(ShopModel, "instance", {
                    get: function () {
                        if (!ShopModel._instance)
                            ShopModel._instance = new ShopModel();
                        return ShopModel._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                /**
                 * 获取鲜叶数据
                 */
                ShopModel.prototype.getSeedData = function () {
                    this.handleCallback(this.seedObjArr);
                    /*
                                desc:"绿茶是不经过发酵的茶，即将鲜叶经过摊晾后直接下到一二百度的热锅里炒制，以保持其绿色的特点。日照绿茶汤色黄绿明亮、栗香浓郁、回味甘醇、叶片厚、香气高、耐冲泡。"
                                exp:"73"
                                fruitShopPrice:"68"
                                group:"tea"
                                growCircle:"54900,82350,82350"
                                harvest:"4"
                                id:"105"
                                level:"40"
                                market:"1"
                                name:"御青绿茶"
                                output:"58"
                                pn:"种子,幼苗期,生长,茂盛"
                                price:"1972"
                                rank:"110"
                                res:"fruit_105.swf"
                                saute:"1"
                                season:"1"
                                seasonName:"一季作物"
                                shopDesc:"【御青】日照绿茶中国味道祥云版特级礼盒装220克，选用优质原料制成。"
                                show:"1"
                                thieve:"0"
                                userFruitPrice:"34"
                                yb:"0"
                                ybp:"23"
                    */
                    /*			界面显示：
                                【种子】
                                左侧：
                                等级、名称、图标、买入价格、类型（茶、花、粮）
                                右侧：
                                名称、图标、作物类型（一季作物）、产量、售价、收入、收获经验、等级（等级不足）、成熟时间、再次成熟、描述
                    */
                    /*			let len:number = seedObjArr.length;
                                let i:number;
                                let itemObj:Object;
                                let seedVO:models.base.SeedVO;
                                for(i=0; i<len; i++)
                                {
                                    itemObj = seedObjArr[i];
                                    // market == 0,表示不可交易
                                    if(!itemObj["market"])
                                        continue;
                                    seedVO.id = parseInt(itemObj["id"]);
                                    seedVO.name = itemObj["name"];
                                    seedVO.seedNums = 0;
                                    // seedVO.icon = itemObj["res"];	// .swf，待处理！
                                    let iconUrl:string = itemObj["res"];
                                    iconUrl = iconUrl.substring(0,iconUrl.lastIndexOf("."))+".png";
                                    seedVO.icon = iconUrl;
                                    seedVO.seedBuyPrice = itemObj["price"];
                                    seedVO.seedDes = itemObj["shopDesc"];
                                    // seedVO. = itemObj["yb"];
                                    seedVO.lvl = itemObj["level"];
                                    seedVO.type = itemObj["group"]+"seed";
                    
                                    this.seedVOArr.push(seedVO);
                                }
                    
                                ShopModel.instance.handleCallback(this.seedVOArr);
                    */
                };
                /**
                 * 道具项（返回已购买的道具id）
                 */
                ShopModel.prototype.request_getShopProp = function () {
                    HttpServiceProxy.request("getShopProp", null, this.getShopPropOver);
                };
                ShopModel.prototype.getShopPropOver = function (receiveData) {
                    if (!receiveData)
                        return;
                    var toolIdsArr = receiveData["_d"];
                    if (!toolIdsArr || !ShopModel.instance.toolObjArr)
                        return;
                    // 整合配置表的原始数据与返回的道具id数组
                    var i;
                    var j;
                    var curId;
                    var curObj;
                    var idsLen = toolIdsArr.length;
                    var objsLen = ShopModel.instance.toolObjArr.length;
                    for (i = 0; i < idsLen; i++) {
                        curId = toolIdsArr[i];
                        // console.log("== curId:"+curId);
                        for (j = 0; j < objsLen; j++) {
                            curObj = ShopModel.instance.toolObjArr[j];
                            if (curId == curObj["id"]) {
                                curObj["hasBuy"] = "true";
                                break;
                            }
                            else {
                                curObj["hasBuy"] = "false";
                            }
                        }
                    }
                    ShopModel.instance.handleCallback(ShopModel.instance.toolObjArr);
                };
                /**
                 * 装饰项
                 */
                ShopModel.prototype.request_getShopDecorate = function () {
                };
                /**
                 * 购买物品
                 */
                ShopModel.prototype.request_buySingleGoods = function (obj) {
                    HttpServiceProxy.request("buySingleGoods", obj, this.buySingleGoodsOver);
                };
                ShopModel.prototype.buySingleGoodsOver = function (receiveData) {
                    if (!receiveData)
                        return;
                    var spendObj;
                    if (receiveData["_g"])
                        spendObj = { "type": "金币", "nums": receiveData["_g"] };
                    else if (receiveData["_y"])
                        spendObj = { "type": "钻石", "nums": receiveData["_y"] };
                    if (spendObj)
                        TipLayerManager.tipLayer.showDrawBgTip("购买成功，花费：" + Math.abs(spendObj["nums"]) + "个" + spendObj["type"] + "！");
                    // 更新玩家信息
                    controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                    // 后续接口调用
                    if (receiveData["_cmd"]) {
                        var cmdObjArr = receiveData["_cmd"];
                        if (cmdObjArr && cmdObjArr.length > 0) {
                            var i = void 0;
                            var len = cmdObjArr.length;
                            var obj = {};
                            for (i = 0; i < len; i++) {
                                obj = cmdObjArr[i];
                                if (obj && obj["name"]) {
                                    // 茶农工资 购买成功后，更新茶农工作时间
                                    if (obj["name"] == "initFarmer")
                                        controllers.teaRoom.TeaGardenCtrl.getInstance().request_initFarmer();
                                }
                            }
                        }
                    }
                };
                /**
                 * 获取右侧内容数据
                 */
                ShopModel.prototype.request_getShopRightContentData = function (obj) {
                    // HttpServiceProxy.request("getShopRightContentData",{"si":，"st":},this.getShopRightContentDataFn);
                };
                ShopModel.prototype.getShopRightContentDataFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    this.rightContentObj = {};
                    this.rightContentObj["errMsg"] = receiveData["_cmsg"];
                    this.rightContentObj["exp"] = receiveData["_e"];
                    this.rightContentObj["gold"] = receiveData["_g"];
                    this.rightContentObj["d"] = receiveData["d"];
                    this.rightContentObj["ext"] = receiveData["ext"];
                };
                ShopModel.prototype.handleCallback = function (takeData) {
                    if (ShopModel.callback) {
                        if (takeData)
                            ShopModel.callback(takeData);
                        else
                            ShopModel.callback();
                    }
                };
                return ShopModel;
            }());
            shop.ShopModel = ShopModel;
        })(shop = teaRoom.shop || (teaRoom.shop = {}));
    })(teaRoom = models.teaRoom || (models.teaRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=ShopModel.js.map