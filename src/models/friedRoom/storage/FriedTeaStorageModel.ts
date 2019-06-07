namespace models.friedRoom.storage
{
	/**
	 * 炒茶室仓库相关数据模型
	 */
	export class FriedTeaStorageModel
	{
		/** 种子数据 */
		seedVOArr: Array<models.base.SeedVO>;
		/** 工具数据 */
		toolVOArr: Array<models.base.ToolVO>;

		/** 首个种子的参数数据（获取首个种子的描述信息） */
		firstObj: Object;

		/** 当前选中的对象所对应的 VO 数据，格式：{"type", "vo" } */
		static curSelectedObjVO: any = {};

		static receiveData: any;

		static callback: Function;

		private static instance: FriedTeaStorageModel;

		constructor()
		{
			this.seedVOArr = new Array<models.base.SeedVO>();
			this.toolVOArr = new Array<models.base.ToolVO>();

		}

		static getInstance(): FriedTeaStorageModel
		{
			if (!FriedTeaStorageModel.instance)
				FriedTeaStorageModel.instance = new FriedTeaStorageModel();
			return FriedTeaStorageModel.instance;
		}

		/**
		 * 获取种子（原料）数据
		 */
		request_getMaterial(): void
		{
			HttpServiceProxy.request("getMaterial", null, this.getMaterialOverFn);
		}

		/**
		 * 获取首个种子的描述信息
		 */
		request_getDepotRightContentData(paraObj?: Object): void
		{
			if (paraObj)
			{
				HttpServiceProxy.request("getDepotRightContentData", paraObj, this.getFirstSeedContentFn, paraObj);
			}
			else
			{
				HttpServiceProxy.request("getDepotRightContentData", this.firstObj, this.getFirstSeedContentFn, this.firstObj);
			}
		}

		/**
		 * 获取道具数据
		 */
		request_getScroll(): void
		{
			HttpServiceProxy.request("getScroll", null, this.getScrollOverFn);
		}

		/**
		 * 获取果实数据（茶叶）
		 */
		request_getDepottea(): void
		{
			HttpServiceProxy.request("getDepottea", null, this.getDepotteaOverFn);
		}

		/**
		 * 卖出
		 * paraObj: {"si": id,"st": 类型,"sct": 卖出数量}
		 */
		request_sellSingle(paraObj: Object): void
		{
			HttpServiceProxy.request("sellSingle", { "si": paraObj["si"], "st": paraObj["st"], "sct": paraObj["sct"],"q":paraObj["q"]}, this.sellSingleOverFn);
		}

		private sellSingleOverFn(receiveData: any): void
		{
			if (!receiveData)
				return;
			FriedTeaStorageModel.receiveData = receiveData;

			let takeData: Object = {};
			// 卖出失败
			if (receiveData["_cmsg"] && (receiveData["_cmsg"] as string).length > 2)
			{
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			else
			{	// 经验、金币
				if (receiveData["_e"] > 0)
				{
					takeData["exp"] = receiveData["_e"];
				}
				if (receiveData["_g"] > 0)
				{
					takeData["money"] = receiveData["_g"];
				}
				controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			}
			FriedTeaStorageModel.instance.handleCallback(takeData);
		}

		private getDepotteaOverFn(receiveData: any): void
		{
			if (!receiveData)
				return;

			let teaObjArr:Object[] = receiveData["_d"];
			let len: number = teaObjArr.length;
			let teaObj:Object;
			let seedVO: models.base.SeedVO;
			let i: number, j: number;
			FriedTeaStorageModel.instance.seedVOArr.splice(0, FriedTeaStorageModel.instance.seedVOArr.length);
			for (i = 0; i < len; i++)
			{
				teaObj = teaObjArr[i];
				seedVO = new models.base.SeedVO();
				seedVO.id = teaObj["li"];
				seedVO.name = teaObj["ln"];
				seedVO.icon = teaObj["limg"];
				seedVO.lvl = teaObj["l"];
				seedVO.quality = teaObj["q"];  // 茶叶品质
				seedVO.qualityName = teaObj["qn"]; // 茶叶品质名称
				seedVO.fruitNums = teaObj["lc"];
				seedVO.fruitSalePrice = teaObj["lp"];
				seedVO.type = teaObj["ty"];
				// console.log("茶叶类型："+seedVO.type);
				FriedTeaStorageModel.instance.seedVOArr.push(seedVO);
			}

			if(FriedTeaStorageModel.instance.seedVOArr.length > 0)
			{
				// FriedTeaStorageModel.instance.seedVOArr.sort(FriedTeaStorageModel.instance.sortFn);
				FriedTeaStorageModel.instance.firstObj = {"si":FriedTeaStorageModel.instance.seedVOArr[0]["id"],"st":FriedTeaStorageModel.instance.seedVOArr[0]["type"]};
				FriedTeaStorageModel.instance.request_getDepotRightContentData();
			}
		}

		private getMaterialOverFn(receiveData: any): void
		{
			if (!receiveData)
				return;
			// 种子：{0:{l:1,p:39,sc:"1",si:11,sn:"普通绿茶种子",simg:"http://... fruit_11.swf",ty:teaseed}, 1:{...} }
            // 原料：{"0":{"si":11,"sn":"普通绿茶鲜叶","hc":1238,"fp":"6","simg":"http://... /fruit_11.swf","l":1,"ty":"material"}
			let seedsObj: Object = receiveData["_d"];
			if (!seedsObj)
				return;

			let seedObj: Object;
			let seedVO: models.base.SeedVO;
			let key: string;
			FriedTeaStorageModel.instance.seedVOArr.splice(0, FriedTeaStorageModel.instance.seedVOArr.length);
			for (key in seedsObj)
			{
				seedObj = seedsObj[key];
				// 排除 seedObj 上层对象中的属性
				if (seedObj.hasOwnProperty("si"))
				{
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
			if (FriedTeaStorageModel.instance.seedVOArr.length > 0)
			{
				// FriedTeaStorageModel.instance.seedVOArr.sort(FriedTeaStorageModel.instance.sortFn);
				FriedTeaStorageModel.instance.firstObj = { "si": FriedTeaStorageModel.instance.seedVOArr[0]["id"], "st": FriedTeaStorageModel.instance.seedVOArr[0]["type"] };
				FriedTeaStorageModel.instance.request_getDepotRightContentData();
			}
		}

		/**
		 * 按种子等级排序
		 */
		sortFn(a: models.base.SeedVO, b: models.base.SeedVO): number
		{
			if (a.lvl > b.lvl)
				return 1;
			else if (a.lvl < b.lvl)
				return -1;
			else
				return 0;
		}

		/**
		 * 将首个种子的描述信息加入对应的作物数据中（在作为种子、道具等的统一处理入口……）
		 */
		private getFirstSeedContentFn(receiveData: any, obj: Object): void
		{
			if (!receiveData || !obj)
				return;

			let len: number;
			let i: number;
			let seedVO: models.base.SeedVO;

			switch (obj["st"])
			{
				case "material":
					len = FriedTeaStorageModel.instance.seedVOArr.length;
					for (i = 0; i < len; i++)
					{
						seedVO = FriedTeaStorageModel.instance.seedVOArr[i];
						if (seedVO.id == obj["si"])
						{
							seedVO.seedFruitDes = receiveData["d"];
							FriedTeaStorageModel.curSelectedObjVO = seedVO;
							break;
						}
					}
					break;
				case "book":
				case "saute_tool":
					len = FriedTeaStorageModel.instance.toolVOArr.length;
					let toolVO: models.base.ToolVO;
					for (i = 0; i < len; i++)
					{
						toolVO = FriedTeaStorageModel.instance.toolVOArr[i];
						if (toolVO.id == obj["si"])
						{
							toolVO.des = receiveData["d"];
							FriedTeaStorageModel.curSelectedObjVO = toolVO;
							break;
						}
					}
					break;
				case "leaf":
					len = FriedTeaStorageModel.instance.seedVOArr.length;
					for (i = 0; i < len; i++)
					{
						seedVO = FriedTeaStorageModel.instance.seedVOArr[i];
						if (seedVO.id == obj["si"])
						{
							seedVO.seedFruitDes = receiveData["d"];
							FriedTeaStorageModel.curSelectedObjVO = seedVO;
							break;
						}
					}
					break;
			}
			FriedTeaStorageModel.instance.handleCallback();
		}

		private getScrollOverFn(receiveData: any): void
		{
			if (!receiveData)
				return;

			let toolObjArr: Object[] = receiveData["_d"];
			let toolObj: Object;
			let toolVO: models.base.ToolVO;
			let key: string;
			let i:number;
			let len:number = toolObjArr.length;
			FriedTeaStorageModel.instance.toolVOArr.splice(0, FriedTeaStorageModel.instance.toolVOArr.length);
			for (i=0; i<len; i++)
			{
				toolObj = toolObjArr[i];
				if (toolObj.hasOwnProperty("ti"))
				{
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

			if (FriedTeaStorageModel.instance.toolVOArr.length > 0)
			{
				// FriedTeaStorageModel.instance.toolVOArr.sort(FriedTeaStorageModel.instance.sortFn2);
				FriedTeaStorageModel.instance.firstObj = { "si": FriedTeaStorageModel.instance.toolVOArr[0]["id"], "st": FriedTeaStorageModel.instance.toolVOArr[0]["type"] };
				FriedTeaStorageModel.instance.request_getDepotRightContentData();
			}
		}

		/**
		 * 按道具等级排序
		 */
		sortFn2(a: models.base.ToolVO, b: models.base.ToolVO): number
		{
			if (a.lvl > b.lvl)
				return 1;
			else if (a.lvl < b.lvl)
				return -1;
			else
				return 0;
		}

		handleCallback(takeData?: any): void
		{
			if (FriedTeaStorageModel.callback)
			{
				if (takeData)
					FriedTeaStorageModel.callback(takeData);
				else
					FriedTeaStorageModel.callback();
			}
		}

	}
}