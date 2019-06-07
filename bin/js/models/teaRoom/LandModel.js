var models;
(function (models) {
    var teaRoom;
    (function (teaRoom) {
        var EventDispatcher = laya.events.EventDispatcher;
        // import PlayerInfoModel = models.player.PlayerInfoModel;
        /**
         * 土地相关的数据模型
         */
        var LandModel = /** @class */ (function () {
            function LandModel() {
                if (!LandModel.landArr)
                    LandModel.landArr = new Array();
                if (!LandModel.friendLanArr)
                    LandModel.friendLanArr = new Array();
            }
            LandModel.getInstance = function () {
                if (!LandModel.instance)
                    LandModel.instance = new LandModel();
                return LandModel.instance;
            };
            /** 请求土地接口 */
            LandModel.prototype.request_getFarmLand = function () {
                HttpServiceProxy.request("getFarmLand", null, this.getFarmLandFn);
            };
            /** 请求好友土地接口 */
            LandModel.prototype.request_getFriendFarmLand = function () {
                HttpServiceProxy.request("getFarmLand", { "_f": models.player.PlayerInfoModel.friendInfo.userId }, this.getFriendFarmLandFn);
            };
            /** 请求开垦土地所需条件接口 */
            LandModel.prototype.request_getAssartLandInfo = function (landId) {
                HttpServiceProxy.request("getAssartLandInfo", { "li": landId }, this.getAssartLandInfoFn);
            };
            /** 请求开垦土地接口 */
            LandModel.prototype.request_actAssartLand = function (curLandVO) {
                HttpServiceProxy.request("actAssartLand", { "li": curLandVO.id }, this.actAssartLandFn);
            };
            /**
             * 土地升级
             */
            LandModel.prototype.request_getLandLevelUpInfo = function (landId) {
                HttpServiceProxy.request("getLandLevelUpInfo", { "li": landId }, this.getLandLevelUpFn, { "landId": landId });
            };
            /**
             * 确认土地升级
             */
            LandModel.prototype.request_actLandLevelUp = function (landId) {
                HttpServiceProxy.request("actLandLevelUp", { "li": landId }, this.actLandLevelUpFn, { "landId": landId });
            };
            LandModel.prototype.getFarmLandFn = function (receiveData, takeData) {
                if (!receiveData)
                    return;
                LandModel.receiveData = receiveData;
                if (takeData)
                    LandModel.takeData = takeData;
                LandModel.landArr.length = 0;
                if (!LandModel.landArr)
                    LandModel.landArr = new Array();
                LandModel.landArr.length = 0;
                // LandModel.landArr.splice(0,LandModel.landArr.length);
                // 搜索结果失败
                var allLandObj = LandModel.receiveData["_d"];
                var tempObj;
                var index;
                for (index = 0; index < 24; index++) {
                    tempObj = allLandObj[index];
                    if (!tempObj)
                        continue;
                    LandModel.landArr.push(new teaRoom.LandVO(tempObj["li"], tempObj["ls"], tempObj["ll"]));
                }
                // 在 View 中更新土地
                LandModel.instance.handleCallback(takeData);
            };
            LandModel.prototype.getFriendFarmLandFn = function (receiveData, takeData) {
                if (!receiveData)
                    return;
                LandModel.receiveData = receiveData;
                if (takeData)
                    LandModel.takeData = takeData;
                LandModel.friendLanArr.length = 0;
                if (!LandModel.friendLanArr)
                    LandModel.friendLanArr = new Array();
                var allLandObj = LandModel.receiveData["_d"];
                var tempObj;
                var index;
                for (index = 0; index < 24; index++) {
                    tempObj = allLandObj[index];
                    if (!tempObj)
                        continue;
                    LandModel.friendLanArr.push(new teaRoom.LandVO(tempObj["li"], tempObj["ls"], tempObj["ll"])); //
                }
                // 在 View 中更新土地
                LandModel.instance.handleCallback(takeData);
            };
            LandModel.prototype.getAssartLandInfoFn = function (receiveData, takeData) {
                if (!receiveData)
                    return;
                LandModel.receiveData = receiveData;
                takeData && (LandModel.takeData = takeData);
                LandModel.instance.handleCallback(takeData);
            };
            /**
             * 点击开垦土地后的回调
             */
            LandModel.prototype.actAssartLandFn = function (receiveData, takeData) {
                if (!receiveData)
                    return;
                console.log("如下写法需完善！");
                // 开垦失败
                if (receiveData.hasOwnProperty("_cmsg")) {
                    // TipLayerManager.tipLayer.showCommonTip(receiveData["_cmsg"]);
                    TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
                    return;
                } // 开垦成功
                else {
                    controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                }
                LandModel.instance.handleCallback(takeData);
            };
            LandModel.prototype.getLandLevelUpFn = function (receiveData, takeData) {
                // {"_c":"1","errMsg":" ","_api":"getLandLevelUpInfo_84874","nm":51100,"ny":0,"nl":37,"_cmd":"","_g":"","_e":""}
                if (!receiveData)
                    return;
                if (receiveData["errMsg"]) {
                    // TipLayerManager.tipLayer.showCommonTip(receiveData["errMsg"]);
                    TipLayerManager.tipLayer.showDrawBgTip(receiveData["errMsg"]);
                }
                else {
                    takeData["needMoney"] = receiveData["nm"];
                    takeData["needDiamond"] = receiveData["ny"];
                    takeData["needLevel"] = receiveData["nl"];
                    LandModel.instance.handleCallback(takeData);
                }
            };
            /**
             * 土地升级成功
             */
            LandModel.prototype.actLandLevelUpFn = function (receiveData, takeData) {
                if (!receiveData)
                    return;
                if (receiveData["errMsg"]) {
                    TipLayerManager.tipLayer.showDrawBgTip(receiveData["errMsg"]);
                }
                else {
                    TipLayerManager.tipLayer.showDrawBgTip("土地升级成功！");
                    LandModel.instance.updateLandGridLevel(takeData["landId"]);
                    LandModel.instance.handleCallback(takeData);
                    controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                }
            };
            /**
             * 更新土地等级数据
             */
            LandModel.prototype.updateLandGridLevel = function (landId) {
                var i;
                var len = LandModel.landArr.length;
                var curLandVO;
                for (i = 0; i < len; i++) {
                    curLandVO = LandModel.landArr[i];
                    if (curLandVO.id == landId) {
                        curLandVO.level += 1;
                        break;
                    }
                }
            };
            LandModel.prototype.handleCallback = function (takeData) {
                if (LandModel.callback) {
                    if (takeData)
                        LandModel.callback(takeData);
                    else
                        LandModel.callback();
                }
            };
            /**
             * 通过地块 id 获取地块数据
             */
            LandModel.getLandVOByLandId = function (landId) {
                var landVO;
                var len = LandModel.landArr.length;
                var i;
                for (i = 0; i < len; i++) {
                    landVO = LandModel.landArr[i];
                    if (landId == landVO.id)
                        return landVO;
                }
                return null;
            };
            /**
             * 通过地块 id 获取好友地块数据
             */
            LandModel.getFriendLandVOByLandId = function (landId) {
                var landVO;
                var len = LandModel.friendLanArr.length;
                var i;
                for (i = 0; i < len; i++) {
                    landVO = LandModel.friendLanArr[i];
                    if (landId == landVO.id)
                        return landVO;
                }
                return null;
            };
            /** 土地等级, 0：普通土地，1：红土地， 2：黑土地*/
            LandModel.prototype.getLevelByLandId = function (landId) {
                var landLvlMsg;
                var landVO = LandModel.getLandVOByLandId(landId);
                if (!landVO)
                    landLvlMsg = undefined;
                if (landVO.level == 0)
                    landLvlMsg = "普通土地";
                else if (landVO.level == 1)
                    landLvlMsg = "红土地";
                else if (landVO.level == 2)
                    landLvlMsg = "黑土地";
                return landLvlMsg;
            };
            LandModel.eventDispatcher = new EventDispatcher();
            LandModel.DATA_HANDLED = "data_handled";
            return LandModel;
        }());
        teaRoom.LandModel = LandModel;
    })(teaRoom = models.teaRoom || (models.teaRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=LandModel.js.map