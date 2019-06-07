var nets;
(function (nets) {
    var Hash = utils.Hash;
    // import GameConfig = configs.GameConfig;
    /**
     * 通信服务的代理
     */
    var HttpServiceProxy = /** @class */ (function () {
        function HttpServiceProxy(interCls) {
            if (interCls === null || interCls instanceof InternalClass === false)
                throw new Error("HttpServiceProxy is singleton, not allow to use constructor!");
        }
        HttpServiceProxy.getInstance = function () {
            if (this.instance === undefined)
                this.instance = new HttpServiceProxy(new InternalClass());
            this._apiRecord = {};
            this.httpService = new nets.HttpService();
            this.httpService.init(HttpConfig.host, HttpConfig.port, HttpConfig.path);
            this.httpService.callback = this.callback;
            return this.instance;
        };
        /**
         * 发送请求
         * 调用API接口并自定义回调函数获取结果,发送数据的格式为 {'数据名称':'数据值'}
         * @param apiName:String API名字
         * @param paramData:Object 要传递给API端的数据,
         * @param callback:Function 回调函数
         * @param selfData:any 回调函数的数据
         */
        HttpServiceProxy.request = function (apiName, _sendData, callback, selfData) {
            //解析api信息
            var apiInfo = this.parseApiInfo(apiName);
            var sendData = apiInfo["sendData"];
            var randomNums = Hash.createRandomNumber("5");
            sendData["_api"] = this.saveApiRecord(apiName + '_' + randomNums, callback, selfData);
            sendData["_u"] = IdentityConfig.uid;
            sendData["_pwd"] = IdentityConfig.pwd;
            sendData["_pkey"] = Hash.createPrivateKey(sendData["_m"] + sendData["_a"] + randomNums, configs.GameConfig.PRIVATE_KEY);
            /*
                try
                {
                    if (_wyxParam == null)
                    {
                        _wyxParam = Object(ExternalInterface.call("originalData"));
                        console.log("===== ??? =====> ApiProxy.run(), _wyxParam: "+ _wyxParam);
                    }

                    var key:string;
                    for (key in _wyxParam)
                    {
                        sendData[key]=_wyxParam[key];
                    }
                }
                catch(e:Error)
                {
                    console.log(e.message);
                }
            */
            if (IdentityConfig.friend != 0) {
                sendData["_f"] = IdentityConfig.friend;
            }
            else {
                sendData["_f"] = -1;
            }
            if (_sendData != null) {
                var index;
                for (index in _sendData) {
                    sendData[index] = _sendData[index];
                }
            }
            this.httpService.request(this.handleJsonObject(sendData));
        };
        /**
         * 将JSON数据处理成 LayaAir 中能正常使用的 key=value&key=value... 样式。如将：
         * {"_m":"user","_a":"info","_api":"getUserInfo_15041","_u":"1","_pwd":"09cca18a30bc34727b0254943811239a","_pkey":5708,"_f":-1,"sf":"1"}
         * 换成： _m=user&_a=info&_api=getUserInfo_46152&_u=1&_pwd=09cca18a30bc34727b0254943811239a&_pkey=5707&_f=-1&sf=1
         */
        HttpServiceProxy.handleJsonObject = function (jsonObj) {
            if (!jsonObj)
                return "";
            var tarStr = "", tarStrArr = [], tempStr = JSON.stringify(jsonObj);
            tempStr = tempStr.slice(1, tempStr.length - 1);
            tarStrArr = tempStr.split(",");
            var i = 0, arrLen = tarStrArr.length;
            var tempEle = "", tempEleArr = [];
            for (var i_1 = 0; i_1 < arrLen; i_1++) {
                tempEle = tarStrArr[i_1];
                tempEleArr = tempEle.split(":");
                tarStr += tempEleArr[0] + "=" + tempEleArr[1];
                if (i_1 < arrLen - 1)
                    tarStr += "&";
            }
            tarStr = tarStr.replace(/"/g, '');
            return tarStr;
        };
        /**
         * 存储记录
         * @param apiName
         * @param callback
         * @param selfData
         */
        HttpServiceProxy.saveApiRecord = function (apiName, callback, selfData) {
            var recordKey = apiName;
            this._apiRecord[recordKey] = { 'callback': callback, 'takeData': selfData };
            return recordKey;
        };
        /**
         * 从api配置信息中解析出要调用的api对象配置数据
         * @param apiName API的名字
         * @return API的配置信息对象
         */
        HttpServiceProxy.parseApiInfo = function (apiName) {
            if (!apiName)
                throw new Error('apiName param is empty!');
            if (HttpConfig.isset(apiName) == false)
                throw new Error("ApiName(" + apiName + ") is not found!");
            return { "sendData": HttpConfig.getSendData(apiName) };
        };
        /**
         * 注册的回调函数
         */
        HttpServiceProxy.callback = function (receiveData) {
            console.info("HttpServiceProxy, 响应回调成功...");
            // {"_cmsg":"对不起，你的等级不足。","_c":-1,"_cmd":[],"_api":"actAssartLand_14736"}
            if (!receiveData)
                return;
            if (!receiveData.hasOwnProperty("_api"))
                return;
            var recordKey = receiveData._api;
            if (recordKey != null && HttpServiceProxy._apiRecord[recordKey] != null) {
                var callback = HttpServiceProxy._apiRecord[recordKey]['callback'];
                var takeData = HttpServiceProxy._apiRecord[recordKey]['takeData'];
                if (callback !== null) {
                    if (takeData === null) {
                        callback(receiveData);
                    }
                    else {
                        callback(receiveData, takeData);
                    }
                }
                //清空记录
                HttpServiceProxy._apiRecord[recordKey]['callback'] = null;
                HttpServiceProxy._apiRecord[recordKey]['takeData'] = null;
                HttpServiceProxy._apiRecord[recordKey] = null;
                delete HttpServiceProxy._apiRecord[recordKey];
            }
        };
        return HttpServiceProxy;
    }());
    nets.HttpServiceProxy = HttpServiceProxy;
    var InternalClass = /** @class */ (function () {
        function InternalClass() {
        }
        return InternalClass;
    }());
})(nets || (nets = {}));
//# sourceMappingURL=HttpServiceProxy.js.map