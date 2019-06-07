var models;
(function (models) {
    var friedRoom;
    (function (friedRoom) {
        var storage;
        (function (storage) {
            /**
             * 炒茶室仓库相关数据模型
             */
            var FriedTeaStorageModel = /** @class */ (function () {
                function FriedTeaStorageModel() {
                    this.seedVOArr = new Array();
                    this.toolVOArr = new Array();
                }
                FriedTeaStorageModel.getInstance = function () {
                    if (!FriedTeaStorageModel.instance)
                        FriedTeaStorageModel.instance = new FriedTeaStorageModel();
                    return FriedTeaStorageModel.instance;
                };
                /**
                 * 获取种子（原料）数据
                 */
                FriedTeaStorageModel.prototype.request_getMaterial = function () {
                    HttpServiceProxy.request("getMaterial", null, this.getMaterialOverFn);
                };
                /**
                 * 获取首个种子的描述信息
                 */
                FriedTeaStorageModel.prototype.request_getDepotRightContentData = function (paraObj) {
                    if (paraObj) {
                        HttpServiceProxy.request("getDepotRightContentData", paraObj, this.getFirstSeedContentFn, paraObj);
                    }
                    else {
                        HttpServiceProxy.request("getDepotRightContentData", this.firstObj, this.getFirstSeedContentFn, this.firstObj);
                    }
                };
                /**
                 * 获取道具数据
                 */
                FriedTeaStorageModel.prototype.request_getScroll = function () {
                    HttpServiceProxy.request("getScroll", null, this.getScrollOverFn);
                };
                /**
                 * 获取果实数据（茶叶）
                 */
                FriedTeaStorageModel.prototype.request_getDepottea = function () {
                    HttpServiceProxy.request("getDepottea", null, this.getDepotteaOverFn);
                };
                /**
                 * 卖出
                 * paraObj: {"si": id,"st": 类型,"sct": 卖出数量}
                 */
                FriedTeaStorageModel.prototype.request_sellSingle = function (paraObj) {
                    HttpServiceProxy.request("sellSingle", { "si": paraObj["si"], "st": paraObj["st"], "sct": paraObj["sct"], "q": paraObj["q"] }, this.sellSingleOverFn);
                };
                FriedTeaStorageModel.prototype.sellSingleOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    FriedTeaStorageModel.receiveData = receiveData;
                    var takeData = {};
                    // 卖出失败
                    if (receiveData["_cmsg"] && receiveData["_cmsg"].length > 2) {
                        takeData["errMsg"] = receiveData["_cmsg"];
                    }
                    else {
                        if (receiveData["_e"] > 0) {
                            takeData["exp"] = receiveData["_e"];
                        }
                        if (receiveData["_g"] > 0) {
                            takeData["money"] = receiveData["_g"];
                        }
                        controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                    }
                    FriedTeaStorageModel.instance.handleCallback(takeData);
                };
                FriedTeaStorageModel.prototype.getDepotteaOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    var teaObjArr = receiveData["_d"];
                    var len = teaObjArr.length;
                    var teaObj;
                    var seedVO;
                    var i, j;
                    FriedTeaStorageModel.instance.seedVOArr.splice(0, FriedTeaStorageModel.instance.seedVOArr.length);
                    for (i = 0; i < len; i++) {
                        teaObj = teaObjArr[i];
                        seedVO = new models.base.SeedVO();
                        seedVO.id = teaObj["li"];
                        seedVO.name = teaObj["ln"];
                        seedVO.icon = teaObj["limg"];
                        seedVO.lvl = teaObj["l"];
                        seedVO.quality = teaObj["q"]; // 茶叶品质
                        seedVO.qualityName = teaObj["qn"]; // 茶叶品质名称
                        seedVO.fruitNums = teaObj["lc"];
                        seedVO.fruitSalePrice = teaObj["lp"];
                        seedVO.type = teaObj["ty"];
                        // console.log("茶叶类型："+seedVO.type);
                        FriedTeaStorageModel.instance.seedVOArr.push(seedVO);
                    }
                    if (FriedTeaStorageModel.instance.seedVOArr.length > 0) {
                        // FriedTeaStorageModel.instance.seedVOArr.sort(FriedTeaStorageModel.instance.sortFn);
                        FriedTeaStorageModel.instance.firstObj = { "si": FriedTeaStorageModel.instance.seedVOArr[0]["id"], "st": FriedTeaStorageModel.instance.seedVOArr[0]["type"] };
                        FriedTeaStorageModel.instance.request_getDepotRightContentData();
                    }
                };
                FriedTeaStorageModel.prototype.getMaterialOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    // 种子：{0:{l:1,p:39,sc:"1",si:11,sn:"普通绿茶种子",simg:"http://... fruit_11.swf",ty:teaseed}, 1:{...} }
                    // 原料：{"0":{"si":11,"sn":"普通绿茶鲜叶","hc":1238,"fp":"6","simg":"http://... /fruit_11.swf","l":1,"ty":"material"}
                    var seedsObj = receiveData["_d"];
                    if (!seedsObj)
                        return;
                    var seedObj;
                    var seedVO;
                    var key;
                    FriedTeaStorageModel.instance.seedVOArr.splice(0, FriedTeaStorageModel.instance.seedVOArr.length);
                    for (key in seedsObj) {
                        seedObj = seedsObj[key];
                        // 排除 seedObj 上层对象中的属性
                        if (seedObj.hasOwnProperty("si")) {
                            seedVO = new models.base.SeedVO();
                            seedVO.id = seedObj["si"];
                            seedVO.name = seedObj["sn"];
                            seedVO.lvl = seedObj["l"];
                            seedVO.seedNums = parseInt(seedObj["hc"]);
                            seedVO.seedSalePrice = seedObj["fp"];
                            seedVO.icon = seedObj["simg"];
                            seedVO.type = seedObj["ty"];
                            // console.log("原料类型："+seedVO.type);
                            FriedTeaStorageModel.instance.seedVOArr.push(seedVO);
                        }
                    }
                    if (FriedTeaStorageModel.instance.seedVOArr.length > 0) {
                        // FriedTeaStorageModel.instance.seedVOArr.sort(FriedTeaStorageModel.instance.sortFn);
                        FriedTeaStorageModel.instance.firstObj = { "si": FriedTeaStorageModel.instance.seedVOArr[0]["id"], "st": FriedTeaStorageModel.instance.seedVOArr[0]["type"] };
                        FriedTeaStorageModel.instance.request_getDepotRightContentData();
                    }
                };
                /**
                 * 按种子等级排序
                 */
                FriedTeaStorageModel.prototype.sortFn = function (a, b) {
                    if (a.lvl > b.lvl)
                        return 1;
                    else if (a.lvl < b.lvl)
                        return -1;
                    else
                        return 0;
                };
                /**
                 * 将首个种子的描述信息加入对应的作物数据中（在作为种子、道具等的统一处理入口……）
                 */
                FriedTeaStorageModel.prototype.getFirstSeedContentFn = function (receiveData, obj) {
                    if (!receiveData || !obj)
                        return;
                    var len;
                    var i;
                    var seedVO;
                    switch (obj["st"]) {
                        case "material":
                            len = FriedTeaStorageModel.instance.seedVOArr.length;
                            for (i = 0; i < len; i++) {
                                seedVO = FriedTeaStorageModel.instance.seedVOArr[i];
                                if (seedVO.id == obj["si"]) {
                                    seedVO.seedFruitDes = receiveData["d"];
                                    FriedTeaStorageModel.curSelectedObjVO = seedVO;
                                    break;
                                }
                            }
                            break;
                        case "book":
                        case "saute_tool":
                            len = FriedTeaStorageModel.instance.toolVOArr.length;
                            var toolVO = void 0;
                            for (i = 0; i < len; i++) {
                                toolVO = FriedTeaStorageModel.instance.toolVOArr[i];
                                if (toolVO.id == obj["si"]) {
                                    toolVO.des = receiveData["d"];
                                    FriedTeaStorageModel.curSelectedObjVO = toolVO;
                                    break;
                                }
                            }
                            break;
                        case "leaf":
                            len = FriedTeaStorageModel.instance.seedVOArr.length;
                            for (i = 0; i < len; i++) {
                                seedVO = FriedTeaStorageModel.instance.seedVOArr[i];
                                if (seedVO.id == obj["si"]) {
                                    seedVO.seedFruitDes = receiveData["d"];
                                    FriedTeaStorageModel.curSelectedObjVO = seedVO;
                                    break;
                                }
                            }
                            break;
                    }
                    FriedTeaStorageModel.instance.handleCallback();
                };
                FriedTeaStorageModel.prototype.getScrollOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    var toolObjArr = receiveData["_d"];
                    var toolObj;
                    var toolVO;
                    var key;
                    var i;
                    var len = toolObjArr.length;
                    FriedTeaStorageModel.instance.toolVOArr.splice(0, FriedTeaStorageModel.instance.toolVOArr.length);
                    for (i = 0; i < len; i++) {
                        toolObj = toolObjArr[i];
                        if (toolObj.hasOwnProperty("ti")) {
                            toolVO = new models.base.ToolVO();
                            toolVO.id = toolObj["ti"];
                            toolVO.name = toolObj["tn"];
                            toolVO.lvl = toolObj["l"];
                            toolVO.price = toolObj["p"];
                            toolVO.nums = parseInt(toolObj["tc"]);
                            toolVO.icon = toolObj["timg"];
                            toolVO.type = toolObj["ty"];
                            // console.log("道具类型："+toolVO.type);  // saute_tool / book
                            FriedTeaStorageModel.instance.toolVOArr.push(toolVO);
                        }
                    }
                    if (FriedTeaStorageModel.instance.toolVOArr.length > 0) {
                        // FriedTeaStorageModel.instance.toolVOArr.sort(FriedTeaStorageModel.instance.sortFn2);
                        FriedTeaStorageModel.instance.firstObj = { "si": FriedTeaStorageModel.instance.toolVOArr[0]["id"], "st": FriedTeaStorageModel.instance.toolVOArr[0]["type"] };
                        FriedTeaStorageModel.instance.request_getDepotRightContentData();
                    }
                };
                /**
                 * 按道具等级排序
                 */
                FriedTeaStorageModel.prototype.sortFn2 = function (a, b) {
                    if (a.lvl > b.lvl)
                        return 1;
                    else if (a.lvl < b.lvl)
                        return -1;
                    else
                        return 0;
                };
                FriedTeaStorageModel.prototype.handleCallback = function (takeData) {
                    if (FriedTeaStorageModel.callback) {
                        if (takeData)
                            FriedTeaStorageModel.callback(takeData);
                        else
                            FriedTeaStorageModel.callback();
                    }
                };
                /** 当前选中的对象所对应的 VO 数据，格式：{"type", "vo" } */
                FriedTeaStorageModel.curSelectedObjVO = {};
                return FriedTeaStorageModel;
            }());
            storage.FriedTeaStorageModel = FriedTeaStorageModel;
        })(storage = friedRoom.storage || (friedRoom.storage = {}));
    })(friedRoom = models.friedRoom || (models.friedRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=FriedTeaStorageModel.js.map