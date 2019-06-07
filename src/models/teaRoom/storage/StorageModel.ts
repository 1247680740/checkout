namespace models.teaRoom.storage
{
	// import SeedVO = models.base.SeedVO;
	// import ToolVO = models.base.ToolVO;
	// import PlayerInfoModel = models.player.PlayerInfoModel;

	/**
	 * 仓库相关数据模型
	 */
	export class StorageModel
	{
		// 果实数据（现统一用 “种子数据” 代替）
		// fruitArr:Array<any>;

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

		private static instance: StorageModel;

		constructor()
		{
			this.seedVOArr = new Array<models.base.SeedVO>();
			this.toolVOArr = new Array<models.base.ToolVO>();

		}

		static getInstance(): StorageModel
		{
			if (!StorageModel.instance)
				StorageModel.instance = new StorageModel();
			return StorageModel.instance;
		}

		/**
		 * 获取种子数据
		 */
		request_getSeed(): void
		{
			HttpServiceProxy.request("getSeed", null, this.getSeedOverFn);
		}

		/**
		 * 获取首个种子的描述信息（点击其它种子时数据的请求方式待看！）
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
		request_getProp(): void
		{
			HttpServiceProxy.request("getProp", null, this.getToolOverFn);
		}

		/**
		 * 获取果实数据（仓库、商店的通用接口）
		 */
		request_getFruit(): void
		{
			HttpServiceProxy.request("getFruit", null, this.getFruitOverFn);
		}

		request_getDecorate(): void
		{
			HttpServiceProxy.request("getDecorate", null, this.getDecorateOverFn);
		}

		/**
		 * 卖出
		 * paraObj: {"si": id,"st": 类型,"sct": 卖出数量}
		 */
		request_sellSingle(paraObj: Object): void
		{
			HttpServiceProxy.request("sellSingle", { "si": paraObj["si"], "st": paraObj["st"], "sct": paraObj["sct"] }, this.sellSingleOverFn);
		}

		private sellSingleOverFn(receiveData: any): void
		{
			if (!receiveData)
				return;
			StorageModel.receiveData = receiveData;

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
			StorageModel.instance.handleCallback(takeData);
		}

		private getFruitOverFn(receiveData: any): void
		{
			if (!receiveData)
				return;

			// [[11,556],[17,603]...] // [作物id,数量]
			let fruitsArr: Array<Array<number>> = receiveData["_d"];
			let fruitLen: number = fruitsArr.length;
			let fruitArr: Array<number>;
			let seedVO: models.base.SeedVO;
			let i: number, j: number;
			StorageModel.instance.seedVOArr.splice(0, StorageModel.instance.seedVOArr.length);
			for (i = 0; i < fruitLen; i++)
			{
				// 没有返回等级数据，但仓库中有等级显示？！
				fruitArr = fruitsArr[i];
				seedVO = new models.base.SeedVO();
				seedVO.id = fruitArr[0];
				seedVO.fruitNums = fruitArr[1];
				StorageModel.instance.seedVOArr.push(seedVO);
			}

			// 右侧信息不是请求的接口，是读的配置表！
			/*			if(StorageModel.instance.seedVOArr.length > 0)
						{
							StorageModel.instance.seedVOArr.sort(StorageModel.instance.sortFn);
							StorageModel.instance.firstObj = {"si":StorageModel.instance.seedVOArr[0]["id"],"st":StorageModel.instance.seedVOArr[0]["type"]};
							StorageModel.instance.request_getDepotRightContentData();
							// StorageModel.instance.handleCallback();
						}
			*/
			console.log("getFruitOver");

			StorageModel.instance.handleCallback();
		}

		private getSeedOverFn(receiveData: any): void
		{
			if (!receiveData)
				return;
			// {0:{l:1,p:39,sc:"1",si:11,sn:"普通绿茶种子",simg:"http://... fruit_11.swf",ty:teaseed}, 1:{...} }
			let seedsObj: Object = receiveData["_d"];
			if (!seedsObj)
				return;

			let seedObj: Object;
			let seedVO: models.base.SeedVO;
			let key: string;
			StorageModel.instance.seedVOArr.splice(0, StorageModel.instance.seedVOArr.length);
			// for(seedObj of seedsObj)	// "of" is wrong
			for (key in seedsObj)
			{
				// console.log("object's key is: "+key);
				seedObj = seedsObj[key];
				// 排除 seedObj 上层对象中的属性
				if (seedObj.hasOwnProperty("si"))
				{
					seedVO = new models.base.SeedVO();
					seedVO.id = seedObj["si"];
					seedVO.name = seedObj["sn"];
					seedVO.lvl = seedObj["l"];
					seedVO.seedNums = parseInt(seedObj["sc"]);
					seedVO.fruitSalePrice = seedObj["p"];
					seedVO.icon = seedObj["simg"];
					seedVO.type = seedObj["ty"];
					StorageModel.instance.seedVOArr.push(seedVO);
				}
			}
			if (StorageModel.instance.seedVOArr.length > 0)
			{
				StorageModel.instance.seedVOArr.sort(StorageModel.instance.sortFn);
				StorageModel.instance.firstObj = { "si": StorageModel.instance.seedVOArr[0]["id"], "st": StorageModel.instance.seedVOArr[0]["type"] };
				StorageModel.instance.request_getDepotRightContentData();
				// StorageModel.instance.handleCallback();
			}
		}

		private getDecorateOverFn(receiveData: any): void
		{
			if (!receiveData)
				return;
			let allObjs: Object = receiveData["_d"];
			let obj:string;
			let objsArr:Array<Object> = new Array<Object>();
			for (obj in allObjs)
			{
				objsArr.push(allObjs[obj]);
			}

			StorageModel.instance.handleCallback(objsArr);

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

			// 种子	// 数字种子：numberseed
			// if(obj["st"] == "teaseed")
			if (obj["st"].indexOf("seed") > 0)
			{
				len = StorageModel.instance.seedVOArr.length;
				let seedVO: models.base.SeedVO;
				for (i = 0; i < len; i++)
				{
					seedVO = StorageModel.instance.seedVOArr[i];
					if (seedVO.id == obj["si"])
					{
						seedVO.seedFruitDes = receiveData["d"];
						StorageModel.curSelectedObjVO = seedVO;
						// StorageModel.curSelectedObjVO = {"type":obj["st"],"vo":seedVO};
						break;
					}
				}
			} // 道具
			else if (obj["st"] == "prop")
			{
				len = StorageModel.instance.toolVOArr.length;
				let toolVO: models.base.ToolVO;
				for (i = 0; i < len; i++)
				{
					toolVO = StorageModel.instance.toolVOArr[i];
					if (toolVO.id == obj["si"])
					{
						toolVO.des = receiveData["d"];
						StorageModel.curSelectedObjVO = toolVO;
						break;
					}
				}
			}

			StorageModel.instance.handleCallback();
		}

		private getToolOverFn(receiveData: any): void
		{
			// data: {0:{l:1,p:0,tc:"3",ti:1,timg:"http://.../shop/prop_1.swf",tn:"普通有机肥",ty:"prop"}}
			if (!receiveData)
				return;

			let toolsObj: Object = receiveData["_d"];
			let toolObj: Object;
			let toolVO: models.base.ToolVO;
			let key: string;
			StorageModel.instance.toolVOArr.splice(0, StorageModel.instance.toolVOArr.length);
			for (key in toolsObj)
			{
				toolObj = toolsObj[key];
				if (toolObj.hasOwnProperty("ti"))
				{
					toolVO = new models.base.ToolVO();
					toolVO.id = toolObj["ti"];
					toolVO.name = toolObj["tn"];
					toolVO.lvl = toolObj["l"];
					toolVO.nums = parseInt(toolObj["tc"]);
					toolVO.price = toolObj["p"];
					toolVO.icon = toolObj["timg"];
					toolVO.type = toolObj["ty"];
					StorageModel.instance.toolVOArr.push(toolVO);
				}
			}

			if (StorageModel.instance.toolVOArr.length > 0)
			{
				StorageModel.instance.toolVOArr.sort(StorageModel.instance.sortFn2);
				StorageModel.instance.firstObj = { "si": StorageModel.instance.toolVOArr[0]["id"], "st": StorageModel.instance.toolVOArr[0]["type"] };
				StorageModel.instance.request_getDepotRightContentData();
				// StorageModel.instance.handleCallback();
			}

			// StorageModel.instance.handleCallback();
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
			if (StorageModel.callback)
			{
				if (takeData)
					StorageModel.callback(takeData);
				else
					StorageModel.callback();
			}
		}

	}
}