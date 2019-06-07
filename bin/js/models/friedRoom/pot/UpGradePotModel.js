var models;
(function (models) {
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot) {
            /**
             * 炒锅升级相关的数据层（包括购买炒锅升级材料，及炒锅升级两部分数据）
             */
            var UpGradePotModel = /** @class */ (function () {
                // static PotVO:PotVO;
                function UpGradePotModel() {
                    this.potVOArr = new Array();
                    if (!UpGradePotModel.potArr)
                        UpGradePotModel.potArr = new Array();
                }
                UpGradePotModel.getInstance = function () {
                    if (!UpGradePotModel.instance)
                        UpGradePotModel.instance = new UpGradePotModel();
                    return UpGradePotModel.instance;
                };
                // 请求所有炒锅状态
                UpGradePotModel.prototype.request_getFarmPot = function () {
                    HttpServiceProxy.request("getCauldron", null, this.getFarmPotFn);
                };
                // 请求炒锅所有状态接口后的回调
                UpGradePotModel.prototype.getFarmPotFn = function (receiveData, takeData) {
                    if (!receiveData)
                        return;
                    this.receiveData = receiveData;
                    if (takeData)
                        this.takeData = takeData;
                    UpGradePotModel.potArr = new Array();
                    var allPotArr = this.receiveData["_d"];
                    var tempObj;
                    var index;
                    for (index = 0; index < allPotArr.length; index++) {
                        tempObj = allPotArr[index];
                        if (!tempObj)
                            continue;
                        UpGradePotModel.potArr.push(new pot.PotVO(tempObj["hi"], tempObj["hl"], tempObj["status"], tempObj["hs"], tempObj["li"], tempObj["lc"]));
                    }
                    // 在 View 中更新炒锅
                    UpGradePotModel.instance.handleCallback(takeData);
                };
                // 请求炒锅升级所需要的数据
                UpGradePotModel.prototype.request_UPDate = function (id, level) {
                    HttpServiceProxy.request("getHollowareUpgradeInfo", { "hi": id }, this.getUpDataOverFn, { "hi": id, "hl": level });
                };
                UpGradePotModel.prototype.getUpDataOverFn = function (receiveData, takeData) {
                    if (receiveData)
                        this.receiveData = receiveData;
                    if (takeData)
                        this.takeData = takeData;
                    var potsObj = this.receiveData["materials"];
                    var potObj;
                    var toolObj;
                    var potVO;
                    var key;
                    UpGradePotModel.instance.potVOArr.splice(0, UpGradePotModel.instance.potVOArr.length);
                    for (key in potsObj) {
                        if (key == "money") {
                            potObj = potsObj[key];
                            potVO = new models.base.PotVO();
                            potVO.needMoney = potObj["need"];
                            potVO.lockMoney = potObj["less"];
                            potVO.potId = takeData["hi"];
                            UpGradePotModel.instance.potVOArr.push(potVO);
                        }
                        if (key == "tools") {
                            potObj = potsObj[key];
                            for (key in potObj) {
                                if (key == "51001") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    // UpGradePotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51003") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    // UpGradePotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51004") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    // UpGradePotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51007") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    // UpGradePotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51010") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    // UpGradePotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51011") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    // UpGradePotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51005") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    // UpGradePotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51012") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    // UpGradePotModel.instance.potVOArr.push(potVO);
                                }
                                if (key == "51013") {
                                    toolObj = potObj[key];
                                    potVO = new models.base.PotVO();
                                    potVO.toolId = parseInt(key);
                                    potVO.toolNums = toolObj["need"] + " ";
                                    potVO.lockToolNums = toolObj["less"] + " ";
                                    // UpGradePotModel.instance.potVOArr.push(potVO);
                                }
                                if (potVO) {
                                    potVO.potId = takeData["hi"];
                                    UpGradePotModel.instance.potVOArr.push(potVO);
                                }
                            }
                        }
                        console.log("==========获取到的数据:" + JSON.stringify(UpGradePotModel.instance.potVOArr) + "====" + UpGradePotModel.instance.potVOArr.length);
                    }
                    if (UpGradePotModel.callback) {
                        if (this.takeData)
                            UpGradePotModel.callback(takeData);
                        else
                            UpGradePotModel.callback();
                    }
                };
                // 升级炒锅
                UpGradePotModel.prototype.request_UpGrade = function (id) {
                    HttpServiceProxy.request("hollowareUpgrade", { "hi": id }, this.getGrade, { "potId": id });
                };
                UpGradePotModel.prototype.getGrade = function (receiveData, takeData) {
                    if (receiveData) {
                        this.receiveData = receiveData;
                    }
                    if (takeData) {
                        this.takeData = takeData;
                    }
                    var spendsObj = this.receiveData;
                    var potVO = new models.base.PotVO();
                    var key;
                    potVO.needMoney = spendsObj["_g"]; //强化用去的金钱
                    potVO.potLvl = spendsObj["l"]; //炒锅等级
                    potVO.potId = spendsObj["hi"]; //炒锅ID
                    potVO.strengthLv1 = spendsObj["hs"]; // 强化等级
                    var newVO = UpGradePotModel.instance.updatePotLvl(potVO);
                    this.takeData["potVO"] = newVO;
                    // UpGradePotModel.instance.potVOArr.push(potVO);   // old
                    if (UpGradePotModel.callback) {
                        if (this.takeData)
                            UpGradePotModel.callback(takeData);
                        else
                            UpGradePotModel.callback();
                    }
                };
                /**
                 * 确认购买升级材料
                 */
                UpGradePotModel.prototype.request_ConfirmBuy = function (potVO) {
                    HttpServiceProxy.request("buySingleGoods", { "st": "saute_tool", "si": potVO.toolId, "bct": potVO.lockToolNums }, this.buyUpDateOverFn, { "toolId": potVO.toolId });
                };
                UpGradePotModel.prototype.buyUpDateOverFn = function (receiveData, takeData) {
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
                        // UpGradePotModel.upGradeview.showInitCenter(this.potVOArr,id,);
                    }
                    UpGradePotModel.instance.handleCallback(takeData);
                };
                UpGradePotModel.prototype.handleCallback = function (takeData) {
                    if (UpGradePotModel.callback) {
                        if (takeData)
                            UpGradePotModel.callback(takeData);
                        else
                            UpGradePotModel.callback();
                    }
                };
                /**
                 * 通过炒锅 id 获取炒锅数据
                 */
                UpGradePotModel.getPotVOByPotId = function (potId) {
                    var potVO;
                    var len = UpGradePotModel.instance.potVOArr.length;
                    var i;
                    for (i = 0; i < len; i++) {
                        potVO = UpGradePotModel.instance.potVOArr[i];
                        if (potId == potVO.potId)
                            return potVO;
                    }
                    return null;
                };
                /**
                 * 更新炒锅等级，并返回数据
                 */
                UpGradePotModel.prototype.updatePotLvl = function (potVo) {
                    var i;
                    var len = UpGradePotModel.instance.potVOArr.length;
                    var curPotVO;
                    for (i = 0; i < len; i++) {
                        curPotVO = UpGradePotModel.instance.potVOArr[i];
                        if (curPotVO.potId == potVo.potId) {
                            curPotVO.potLvl = potVo.potLvl;
                            return curPotVO;
                        }
                    }
                    return null;
                };
                /**
                 * 购买材料后更新相关数据
                 */
                UpGradePotModel.prototype.updatePotVOArr = function (toolId) {
                    if (!toolId)
                        return;
                    if (!UpGradePotModel.instance.potVOArr.length)
                        return;
                    var i;
                    var len = UpGradePotModel.instance.potVOArr.length;
                    var potVO;
                    for (i = 0; i < len; i++) {
                        potVO = UpGradePotModel.instance.potVOArr[i];
                        if (toolId == potVO.toolId) {
                            potVO.lockToolNums = "0";
                            break;
                        }
                    }
                };
                return UpGradePotModel;
            }());
            pot.UpGradePotModel = UpGradePotModel;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = models.friedRoom || (models.friedRoom = {}));
})(models || (models = {}));
//# sourceMappingURL=UpGradePotModel.js.map