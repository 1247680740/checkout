var models;
(function (models) {
    var teaRoom;
    (function (teaRoom) {
        var bag;
        (function (bag) {
            // import SeedVO = models.base.SeedVO;
            // import ToolVO = models.base.ToolVO;
            /**
             * 背包相关数据
             */
            var BagModel = /** @class */ (function () {
                // static self:BagModel;
                function BagModel() {
                    this.seedVOArr = new Array();
                    this.toolVOArr = new Array();
                    // BagModel.self = this;
                }
                BagModel.getInstance = function () {
                    if (!BagModel.instance)
                        BagModel.instance = new BagModel();
                    return BagModel.instance;
                };
                /**
                 * 请求背包种子数据
                 */
                BagModel.prototype.request_getBagSeed = function () {
                    HttpServiceProxy.request("getBagSeed", null, this.getBagSeedOverFn);
                };
                /** 此处需向老版本确认具体写法，待修改 */
                BagModel.prototype.getBagSeedOverFn = function (receiveData, takeData) {
                    if (receiveData)
                        this.receiveData = receiveData;
                    if (takeData)
                        this.takeData = takeData;
                    var tempArr = receiveData["_d"];
                    var tempArrLen = tempArr.length;
                    var i;
                    var seedVO;
                    var tempObj;
                    BagModel.instance.seedVOArr.splice(0, BagModel.instance.seedVOArr.length);
                    for (i = 0; i < tempArrLen; i++) {
                        // {si:1,sn="普通红茶种子",sc:49,simg:"http://kaixins.app100712594.twsap.com/static/fruit_17.swf",l:2,d:"一季作物，6小时成熟"}
                        tempObj = tempArr[i];
                        seedVO = new models.base.SeedVO();
                        seedVO.id = tempObj["si"]; // 种子Id
                        seedVO.name = tempObj["sn"]; // 种子名称
                        seedVO.type = tempObj["ty"]; // 类型
                        seedVO.seedNums = tempObj["sc"]; // 种子数量
                        // ============ 此处已将原swf暂换成了 png 图片 =============
                        var iconUrl = tempObj["simg"];
                        iconUrl = iconUrl.substring(0, iconUrl.lastIndexOf("."));
                        seedVO.icon = iconUrl + ".png"; // 种子图标路径
                        // seedVO.icon = tempObj["simg"];
                        seedVO.lvl = tempObj["l"];
                        seedVO.seedFruitDes = tempObj["d"];
                        // this.seedVOArr.push(seedVO);
                        BagModel.instance.seedVOArr.push(seedVO);
                    }
                    if (BagModel.callback) {
                        if (this.takeData)
                            BagModel.callback(takeData);
                        else
                            BagModel.callback();
                    }
                };
                /**
                 * 种植完后更新特定种子的数量
                 * @returns {"isSuccess":是否更新成功,"remain":当前种子剩余数量}
                 */
                BagModel.prototype.updateSeedNums = function (seedId) {
                    if (!seedId || this.seedVOArr.length == 0)
                        return;
                    var resultObj = {};
                    var isSuccess = false;
                    var remain = 0;
                    var i;
                    var len = this.seedVOArr.length;
                    var seedVO;
                    for (i = 0; i < len; i++) {
                        seedVO = this.seedVOArr[i];
                        if (seedId == seedVO.id) {
                            if (seedVO.seedNums > 0) {
                                seedVO.seedNums--;
                                isSuccess = true;
                                remain = seedVO.seedNums;
                            }
                            break;
                        }
                    }
                    resultObj["isSuccess"] = isSuccess;
                    resultObj["remain"] = remain;
                    return resultObj;
                };
                /** 请求背包道具数据 */
                BagModel.prototype.request_getBagProp = function () {
                    HttpServiceProxy.request("getBagProp", null, this.getBagPropOverFn);
                };
                BagModel.prototype.getBagPropOverFn = function (receiveData, takeData) {
                    if (receiveData)
                        this.receiveData = receiveData;
                    if (takeData)
                        this.takeData = takeData;
                    var tempArr = receiveData["_d"];
                    var tempArrLen = tempArr.length;
                    var i;
                    var toolVO;
                    var tempObj;
                    BagModel.instance.toolVOArr.splice(0, BagModel.instance.toolVOArr.length);
                    for (i = 0; i < tempArrLen; i++) {
                        tempObj = tempArr[i];
                        toolVO = new models.base.ToolVO();
                        toolVO.id = tempObj["ti"];
                        toolVO.name = tempObj["tn"];
                        toolVO.nums = tempObj["tc"];
                        // ============ 此处已将原swf暂换成了 png 图片 =============
                        var iconUrl = tempObj["timg"];
                        iconUrl = iconUrl.substring(0, iconUrl.lastIndexOf("."));
                        toolVO.icon = iconUrl + ".png"; // tempObj["timg"];
                        toolVO.des = tempObj["d"];
                        toolVO.type = tempObj["ty"];
                        toolVO.lvl = tempObj["l"];
                        if (tempObj["ti"] == 1)
                            toolVO.helpTime = 1;
                        else if (tempObj["ti"] == 2)
                            toolVO.helpTime = 2.5;
                        BagModel.instance.toolVOArr.push(toolVO);
                    }
                    if (BagModel.callback) {
                        if (this.takeData)
                            BagModel.callback(takeData);
                        else
                            BagModel.callback();
                    }
                };
                return BagModel;
            }());
            bag.BagModel = BagModel;
        })(bag = teaRoom.bag || (teaRoom.bag = {}));
    })(teaRoom = models.teaRoom || (models.teaRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=BagModel.js.map