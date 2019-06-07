var models;
(function (models) {
    var makeRoom;
    (function (makeRoom) {
        var storage;
        (function (storage) {
            /**
             * 泡茶室仓库相关数据模型
             */
            var MakeTeaStorageModel = /** @class */ (function () {
                function MakeTeaStorageModel() {
                    this.seedVOArr = new Array();
                    this.toolVOArr = new Array();
                }
                MakeTeaStorageModel.getInstance = function () {
                    if (!MakeTeaStorageModel.instance)
                        MakeTeaStorageModel.instance = new MakeTeaStorageModel();
                    return MakeTeaStorageModel.instance;
                };
                /**
                 * 获取茶叶数据
                 */
                MakeTeaStorageModel.prototype.request_getMaterial = function () {
                    HttpServiceProxy.request("getDepottea", null, this.getMaterialOverFn);
                };
                /**
                 * 获取首个茶叶的描述信息
                 */
                MakeTeaStorageModel.prototype.request_getDepotRightContentData = function (paraObj) {
                    if (paraObj) {
                        HttpServiceProxy.request("getDepotRightContentData", paraObj, this.getFirstSeedContentFn, paraObj);
                    }
                    else {
                        HttpServiceProxy.request("getDepotRightContentData", this.firstObj, this.getFirstSeedContentFn, this.firstObj);
                    }
                };
                /**
                 * 获取仓库水源数据
                 */
                MakeTeaStorageModel.prototype.request_getScroll = function () {
                    HttpServiceProxy.request("getDepotWater", null, this.getScrollOverFn);
                };
                /**
                 * 卖出
                 * paraObj: {"si": id,"st": 类型,"sct": 卖出数量}
                 */
                MakeTeaStorageModel.prototype.request_sellSingle = function (paraObj) {
                    HttpServiceProxy.request("sellSingle", { "si": paraObj["si"], "st": paraObj["st"], "sct": paraObj["sct"], "q": paraObj["q"] }, this.sellSingleOverFn);
                };
                MakeTeaStorageModel.prototype.sellSingleOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    MakeTeaStorageModel.receiveData = receiveData;
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
                    MakeTeaStorageModel.instance.handleCallback(takeData);
                };
                MakeTeaStorageModel.prototype.getMaterialOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    var teaObjArr = receiveData["_d"];
                    var len = teaObjArr.length;
                    var teaObj;
                    var seedVO;
                    var i, j;
                    MakeTeaStorageModel.instance.seedVOArr.splice(0, MakeTeaStorageModel.instance.seedVOArr.length);
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
                        MakeTeaStorageModel.instance.seedVOArr.push(seedVO);
                    }
                    if (MakeTeaStorageModel.instance.seedVOArr.length > 0) {
                        MakeTeaStorageModel.instance.firstObj = { "si": MakeTeaStorageModel.instance.seedVOArr[0]["id"], "st": MakeTeaStorageModel.instance.seedVOArr[0]["type"] };
                        MakeTeaStorageModel.instance.request_getDepotRightContentData();
                    }
                };
                /**
                 * 按种子等级排序
                 */
                MakeTeaStorageModel.prototype.sortFn = function (a, b) {
                    if (a.lvl > b.lvl)
                        return 1;
                    else if (a.lvl < b.lvl)
                        return -1;
                    else
                        return 0;
                };
                /**
                 * 将首个茶叶的描述信息加入对应的作物数据中（在作为种子、道具等的统一处理入口……）
                 */
                MakeTeaStorageModel.prototype.getFirstSeedContentFn = function (receiveData, obj) {
                    if (!receiveData || !obj)
                        return;
                    var len;
                    var i;
                    var seedVO;
                    switch (obj["st"]) {
                        case "leaf":
                            len = MakeTeaStorageModel.instance.seedVOArr.length;
                            for (i = 0; i < len; i++) {
                                seedVO = MakeTeaStorageModel.instance.seedVOArr[i];
                                if (seedVO.id == obj["si"]) {
                                    seedVO.seedFruitDes = receiveData["d"];
                                    MakeTeaStorageModel.curSelectedObjVO = seedVO;
                                    break;
                                }
                            }
                            break;
                        case "water":
                            len = MakeTeaStorageModel.instance.toolVOArr.length;
                            var toolVO = void 0;
                            for (i = 0; i < len; i++) {
                                toolVO = MakeTeaStorageModel.instance.toolVOArr[i];
                                if (toolVO.id == obj["si"]) {
                                    toolVO.des = receiveData["d"];
                                    MakeTeaStorageModel.curSelectedObjVO = toolVO;
                                    break;
                                }
                            }
                            break;
                    }
                    MakeTeaStorageModel.instance.handleCallback();
                };
                MakeTeaStorageModel.prototype.getScrollOverFn = function (receiveData) {
                    if (!receiveData)
                        return;
                    var toolObjArr = receiveData["_d"];
                    var toolObj;
                    var toolVO;
                    var key;
                    var i;
                    var len = toolObjArr.length;
                    MakeTeaStorageModel.instance.toolVOArr.splice(0, MakeTeaStorageModel.instance.toolVOArr.length);
                    for (i = 0; i < len; i++) {
                        toolObj = toolObjArr[i];
                        if (toolObj.hasOwnProperty("ti")) {
                            toolVO = new models.base.ToolVO();
                            toolVO.id = toolObj["ti"];
                            toolVO.price = toolObj["p"];
                            toolVO.nums = parseInt(toolObj["tc"]);
                            // console.log("道具类型："+toolVO.type);  // saute_tool / book
                            MakeTeaStorageModel.instance.toolVOArr.push(toolVO);
                        }
                    }
                    if (MakeTeaStorageModel.instance.toolVOArr.length > 0) {
                        // FriedTeaStorageModel.instance.toolVOArr.sort(FriedTeaStorageModel.instance.sortFn2);
                        MakeTeaStorageModel.instance.firstObj = { "si": MakeTeaStorageModel.instance.toolVOArr[0]["id"], "st": MakeTeaStorageModel.instance.toolVOArr[0]["type"] };
                        MakeTeaStorageModel.instance.request_getDepotRightContentData();
                    }
                };
                /**
                 * 按道具等级排序
                 */
                MakeTeaStorageModel.prototype.sortFn2 = function (a, b) {
                    if (a.lvl > b.lvl)
                        return 1;
                    else if (a.lvl < b.lvl)
                        return -1;
                    else
                        return 0;
                };
                MakeTeaStorageModel.prototype.handleCallback = function (takeData) {
                    if (MakeTeaStorageModel.callback) {
                        if (takeData)
                            MakeTeaStorageModel.callback(takeData);
                        else
                            MakeTeaStorageModel.callback();
                    }
                };
                /** 当前选中的对象所对应的 VO 数据，格式：{"type", "vo" } */
                MakeTeaStorageModel.curSelectedObjVO = {};
                return MakeTeaStorageModel;
            }());
            storage.MakeTeaStorageModel = MakeTeaStorageModel;
        })(storage = makeRoom.storage || (makeRoom.storage = {}));
    })(makeRoom = models.makeRoom || (models.makeRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=MakeTeaStorageModel.js.map