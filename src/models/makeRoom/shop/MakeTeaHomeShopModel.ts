namespace models.makeRoom.shop
{
	import SeedVO = models.base.SeedVO;
	import ToolVO = models.base.ToolVO;

	/**
	 * 泡茶室商店数据模型
	 */
	export class MakeTeaHomeShopModel
	{
		private static _instance:MakeTeaHomeShopModel;

		/** 服务器返回的数据 */
		static receiveData: any;
		/** 请求前自带的数据 */
		static takeData: any;

		/** 种子数据 */
		seedVOsArr:Array<SeedVO>;
		/** 道具数据 */
		toolVOsArr:Array<ToolVO>;
		/** 配置表对应的种子数据 */
		teaLeafObjArr:Array<Object>;
		/** 配置表对应的道具数据 */
		toolObjArr:Array<Object>;

		/** 右侧描述信息 */
		rightContentObj:Object;

		/** 响应数据处理完毕回调 */
		static callback:Function;

		constructor()
		{
			this.teaLeafObjArr = managers.ResourceManager.tealeafObjArr;
			this.toolObjArr = managers.ResourceManager.toolsObjArr;
		}

		static get instance():MakeTeaHomeShopModel
		{
			if(!MakeTeaHomeShopModel._instance)
				MakeTeaHomeShopModel._instance = new MakeTeaHomeShopModel();
			return MakeTeaHomeShopModel._instance;
		}

		/**
		 * 获取原料数据
		 */
        request_getChaoMaterial():void
		{
            HttpServiceProxy.request("getPaoMaterial",null,this.getAllSeedData);
        }

        private getAllSeedData(receiveData?:any):void
		{
            if(!receiveData)
				return;
            let objsArr:Object= receiveData["_d"];
			if(!objsArr)
				return;
			MakeTeaHomeShopModel.instance.seedVOsArr = [];

			let curObj:Object;
			let tempObj:Object;
            let seedVO:models.base.SeedVO;
			let j:number;
			let key:string;
			let len:number = MakeTeaHomeShopModel.instance.teaLeafObjArr.length;
            for (key in objsArr) {
				curObj = objsArr[key];
				seedVO = new models.base.SeedVO();
                seedVO.id = curObj["si"];
                seedVO.name = curObj["sn"];
                seedVO.icon = curObj["simg"];
                seedVO.seedBuyPrice = curObj["yb"];
                seedVO.lvl = curObj["l"];
                seedVO.type = curObj["ty"];
				for(j=0; j<len; j++)
				{
					tempObj = MakeTeaHomeShopModel.instance.teaLeafObjArr[j];
					if(parseInt(tempObj["id"])==seedVO.id)
					{
						seedVO.seedDes = tempObj["desc"];
						seedVO.fruitNums=parseInt(tempObj["yb"]);

						if(!seedVO.seedDes)
							seedVO.seedDes = "无";
					}
				}
                MakeTeaHomeShopModel.instance.seedVOsArr.push(seedVO);
			}

			MakeTeaHomeShopModel.instance.handleCallback(MakeTeaHomeShopModel.instance.seedVOsArr);
        }

		/** 道具项（返回已购买的道具id） */
		request_getShopScroll():void
		{
			HttpServiceProxy.request("getWater",null,this.getShopScrollOver);
		}

		private getShopScrollOver(receiveData:any):void
		{
			if(!receiveData)
				return;
			let objsArr:Array<Object> = receiveData["_d"];
			if(!objsArr)
				return;
			MakeTeaHomeShopModel.instance.toolVOsArr = [];

			let curObj:Object;
			let tempObj:Object;
            let toolVO:models.base.ToolVO;
			let i:number;
			let j:number;
			let len:number = objsArr.length;
			let len2:number = MakeTeaHomeShopModel.instance.toolObjArr.length;
			let index:number = 0;
            for(i=0; i<len; i++)
			{
				curObj = objsArr[i];
				toolVO = new models.base.ToolVO();
                toolVO.id = curObj["ti"];
                toolVO.name = curObj["tn"];
                toolVO.icon = curObj["timg"];
				toolVO.price = curObj["yb"]?curObj["yb"]:(curObj["p"]?curObj["p"]:0);
                toolVO.lvl = curObj["l"];
                toolVO.type = curObj["ty"];
				for(j=0; j<len2; j++)
				{
					tempObj = MakeTeaHomeShopModel.instance.toolObjArr[j];
					if(toolVO.id == parseInt(tempObj["id"]))
					{
						index++;
						toolVO.des = tempObj["desc"];
					}
				}
				// 注意：部分无说明（tools.xml和Tencent不同步，缺少内容！）
				if(!toolVO.des)
					toolVO.des = "无";
                MakeTeaHomeShopModel.instance.toolVOsArr.push(toolVO);
			}
			MakeTeaHomeShopModel.instance.handleCallback(MakeTeaHomeShopModel.instance.toolVOsArr);
		}

		/**
		 * 购买物品
		 */
		request_buySingleGoods(obj:Object):void
		{
			HttpServiceProxy.request("buySingleGoods",obj,this.buySingleGoodsOver);
		}

		buySingleGoodsOver(receiveData:any):void
		{
			if(!receiveData)
				return;

			let spendObj:Object;
			if(receiveData["_g"])
				spendObj = {"type":"金币","nums":receiveData["_g"]};
			else if(receiveData["_y"])
				spendObj = {"type":"钻石","nums":receiveData["_y"]};
			if(spendObj)
				TipLayerManager.tipLayer.showDrawBgTip("购买成功，花费："+Math.abs(spendObj["nums"])+"个"+spendObj["type"]+"！");

			// 更新玩家信息
			controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
		}

		/**
		 * 获取右侧内容数据
		 */
		request_getShopRightContentData(obj:Object):void
		{
			// HttpServiceProxy.request("getShopRightContentData",{"si":，"st":},this.getShopRightContentDataFn);

		}

		getShopRightContentDataFn(receiveData:any,takeData:any):void
		{
			if(!receiveData)
				return;

			this.rightContentObj = {};
			this.rightContentObj["errMsg"] = receiveData["_cmsg"];
			this.rightContentObj["exp"] = receiveData["_e"];
			this.rightContentObj["gold"] = receiveData["_g"];

			this.rightContentObj["d"] = receiveData["d"];
			this.rightContentObj["ext"] = receiveData["ext"];
		}

		handleCallback(takeData?:any):void
		{
			if(MakeTeaHomeShopModel.callback)
			{
				if(takeData)
					MakeTeaHomeShopModel.callback(takeData);
				else
					MakeTeaHomeShopModel.callback();
			}
		}
	}
}