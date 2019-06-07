var models;
(function (models) {
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot) {
            // import IntensifyPotCtrl = controllers.friedRoom.pot.IntensifyPotCtrl;
            /**
             * 炒锅升级相关的数据层（包括购买炒锅升级材料，及炒锅升级两部分数据）
             */
            var IntensifyPotModel = /** @class */ (function () {
                // static PotVO:PotVO;
                function IntensifyPotModel() {
                    this.potVOArr = new Array();
                    if (!IntensifyPotModel.potArr)
                        IntensifyPotModel.potArr = new Array();
                }
                IntensifyPotModel.getInstance = function () {
                    if (!IntensifyPotModel.instance)
                        IntensifyPotModel.instance = new IntensifyPotModel();
                    return IntensifyPotModel.instance;
                };
                // 请求所有炒锅状态
                IntensifyPotModel.prototype.request_getFarmPot = function () {
                    HttpServiceProxy.request("getCauldron", null, this.getFarmPotFn);
                };
                // 请求炒锅所有状态接口后的回调
                IntensifyPotModel.prototype.getFarmPotFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    this.receiveData = receiveData;
                    if (takeData)
                        this.takeData = takeData;
                    IntensifyPotModel.potArr = new Array();
                    var allPotArr = this.receiveData["_d"];
                    var tempObj;
                    var index;
                    for (index = 0; index < allPotArr.length; index++) {
                        tempObj = allPotArr[index];
                        if (!tempObj)
                            continue;
                        IntensifyPotModel.potArr.push(new pot.PotVO(tempObj["hi"], tempObj["hl"], tempObj["status"], tempObj["hs"], tempObj["li"], tempObj["lc"]));
                    }
                    // 在 View 中更新炒锅
                    IntensifyPotModel.instance.handleCallback(takeData);
                };
                // 请求强化炒锅所需要的数据
                IntensifyPotModel.prototype.request_UPDate = function (id, level) {
                    HttpServiceProxy.request("getHollowareStrengthenInfo", { "hi": id }, this.getUpDataOverFn, { "hi": id, "hl": level });
                };
                IntensifyPotModel.prototype.getUpDataOverFn = function (receiveData, takeData) {
                    if (receiveData)
                        this.receiveData = receiveData;
                    if (takeData)
                        this.takeData = takeData;
                    var potsObj = this.receiveData["materials"];
                    var potObj;
                    var toolObj;
                    var potVO;
                    var key;
                    IntensifyPotModel.instance.potVOArr.splice(0, IntensifyPotModel.instance.potVOArr.length);
                    for (key in potsObj) {
                        if (key == "money") {
                            potObj = potsObj[key];
                            potVO = new models.base.PotVO();
                            potVO.needMoney = potObj["need"];
                            potVO.lockMoney = potObj["less"];
                            potVO.potId = takeData["hi"];
                            potVO.potLvl = takeData["hl"];
                            IntensifyPotModel.instance.potVOArr.push(potVO);
                        }
                        if (key == "tools") {
                            potObj = potsObj[key];
                            for (key in potObj) {
                                if (key == "51002") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    IntensifyPotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51003") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    IntensifyPotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51004") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    IntensifyPotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51007") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    IntensifyPotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51010") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    IntensifyPotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51011") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    IntensifyPotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51001") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    IntensifyPotModel.instance.potVOArr.push(potVO);
                                }
                            }
                        }
                        // console.log("==========获取到的数据:"+JSON.stringify(IntensifyPotModel.instance.potVOArr)+"===="+IntensifyPotModel.instance.potVOArr.length);
                    }
                    if (IntensifyPotModel.callback) {
                        if (this.takeData)
                            IntensifyPotModel.callback(takeData);
                        else
                            IntensifyPotModel.callback();
                    }
                };
                // 强化炒锅
                IntensifyPotModel.prototype.request_strengthPot = function (id) {
                    HttpServiceProxy.request("hollowareStrengthen", { "hi": id }, this.getStrength);
                };
                IntensifyPotModel.prototype.getStrength = function (receiveData, takeData) {
                    if (receiveData) {
                        this.receiveData = receiveData;
                    }
                    var spendsObj = this.receiveData;
                    var potVO;
                    var key;
                    for (key in spendsObj) {
                        if (spendsObj.hasOwnProperty("_g")) {
                            potVO.potId = spendsObj["hi"];
                            potVO.potLvl = spendsObj["l"];
                            potVO.strengthLv1 = spendsObj["hs"];
                            potVO.needMoney = spendsObj["_g"];
                            potVO.literStatus = spendsObj["ok"];
                            IntensifyPotModel.instance.potVOArr.push(potVO);
                        }
                    }
                    if (IntensifyPotModel.callback) {
                        if (this.takeData)
                            IntensifyPotModel.callback(takeData);
                        else
                            IntensifyPotModel.callback();
                    }
                };
                // 确认购买强化材料
                IntensifyPotModel.prototype.request_ConfirmBuy = function (id, nums) {
                    HttpServiceProxy.request("buySingleGoods", { "st": "saute_tool", "si": id, "bct": nums }, this.buyStrengthOverFn);
                };
                IntensifyPotModel.prototype.buyStrengthOverFn = function (receiveData, takeData) {
                    if (receiveData) {
                        this.receiveData = receiveData;
                    }
                    // 花费的金币、钻石: "_g"  "_y"
                    var spendObj;
                    // 花费返回的是负数，需在原值基础上加上花费值
                    if (receiveData["_g"]) {
                        models.player.PlayerInfoModel.playerInfo.money += receiveData["_g"];
                        spendObj = { "type": "金币", "nums": receiveData["_g"] };
                    }
                    else if (receiveData["_y"]) {
                        models.player.PlayerInfoModel.playerInfo.diamond += receiveData["_y"];
                        spendObj = { "type": "钻石", "nums": receiveData["_y"] };
                    }
                    if (spendObj) {
                        if (receiveData["_c"] == 1) {
                            TipLayerManager.tipLayer.showDrawBgTip("购买成功！花费：" + receiveData["_y"] + "个钻石！");
                        }
                        else {
                            TipLayerManager.tipLayer.showDrawBgTip("购买成功！花费：" + receiveData["_g"] + "个金币！");
                        }
                        // 更新玩家信息
                        controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                        // 更新材料数量及显示
                        console.log("=======当前更新材料状态获取的信息：" + JSON.stringify(this.potVOArr));
                        controllers.friedRoom.pot.IntensifyPotCtrl.getInstance().request_getUPDate();
                    }
                };
                IntensifyPotModel.prototype.handleCallback = function (takeData) {
                    if (IntensifyPotModel.callback) {
                        if (takeData)
                            IntensifyPotModel.callback(takeData);
                        else
                            IntensifyPotModel.callback();
                    }
                };
                return IntensifyPotModel;
            }());
            pot.IntensifyPotModel = IntensifyPotModel;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = models.friedRoom || (models.friedRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=IntensifyPotModel.js.map