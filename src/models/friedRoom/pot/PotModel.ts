namespace models.friedRoom.pot
{
	import Dictionary = laya.utils.Dictionary;
	import EventDispatcher = laya.events.EventDispatcher;
	import TweenUtil = utils.TweenUtil;
	import PlayerInfoModel = models.player.PlayerInfoModel;
	import seedVO=models.base.SeedVO;

	/**
	 * 炒锅相关的数据模型
	 */
	export class PotModel
	{
		/** 服务器返回的数据 */
		static receiveData: any;
		/** 请求前自带的数据 */
		static takeData: any;

		/** 存放6个炒锅数据的容器 */
		static potArr:Array<PotVO>;	// = new Array<PotVO>();
		/** 茶叶数据集 */
		static teaArr:Array<seedVO>;
		private static instance: PotModel;

		static eventDispatcher: EventDispatcher = new EventDispatcher();
		static DATA_HANDLED: string = "data_handled";

		/** 响应数据处理完毕回调 */
		static callback:Function;

		constructor()
		{
			if(!PotModel.potArr)
				PotModel.potArr = new Array<PotVO>();
			if(!PotModel.teaArr)
				PotModel.teaArr=new Array<seedVO>();
		}

		static getInstance(): PotModel
		{
			if(!PotModel.instance)
				PotModel.instance = new PotModel();
			return PotModel.instance;
		}

		/** 请求所有炒锅数据 */
		request_getCauldron(): void
		{
			HttpServiceProxy.request("getCauldron", null, this.getFarmPotFn);
		}

		/** 请求激活炒锅所需条件接口 */
		request_getAssartPotInfo(id:number):void
		{
			HttpServiceProxy.request("getCauldronBuyInfo",{"hi":id},this.getAssartPotInfoFn,{"hi":id});	// ,curLandVO
		}

		/** 请求激活炒锅接口 */
		request_actAssartPot(id:number):void
		{
			HttpServiceProxy.request("actBuyCauldron",{"hi":id},this.actAssartPotFn,id);
		}
		/** 请求单个收获的接口 */
		request_reapTeaInfo(potId:number){
			HttpServiceProxy.request("actChaoCollect",{"hi":potId},this.getTeaFruitInfo,{"potId":potId});
		}
		/** 请求清除炒锅的接口 */
		request_brushPotInfo(potId:number){
			HttpServiceProxy.request("brushTea",{"hi":potId},this.getBrushPotInfo,{"potId":potId});
		}

		/**
		 * 使用火把道具
		 */
		request_sauteUseTool(potId:number,toolId:number)
		{
			HttpServiceProxy.request("sauteUseTool",{"hi":potId,"tid":toolId},this.useToolOver,{"potId":potId});
		}

		/** 请求炒锅所有状态接口后的回调 */
		private getFarmPotFn(receiveData?: any, takeData?: any): void
		{
			if (!receiveData)
				return;

			PotModel.receiveData = receiveData;
			if (takeData)
				PotModel.takeData = takeData;

			// if(!PotModel.potArr)
				PotModel.potArr = new Array<PotVO>();

			// "_d":[{"pi":0,"hi":1,"hl":1,"hw":["生铁锅",{"tealeaf_max_level":20,"max_count":5}],"hs":0,"status":0}]
			let allPotArr:Object[] = PotModel.receiveData["_d"];

			var tempObj:Object;
			let index:number;
			let potVO:PotVO;
			for(index = 0; index<allPotArr.length; index++)
			{
				tempObj = allPotArr[index];
				if(!tempObj)
					continue;

				potVO = new PotVO(tempObj["hi"],tempObj["hl"],tempObj["status"]);
				potVO.intensifyLvl = tempObj["hs"];
				potVO.posId = tempObj["pi"];

				if(potVO.status == 0)
				{
					if(tempObj["hw"] != null)
					{
						let tempArr:any[] = tempObj["hw"];
						let obj:Object = tempArr[1];
						potVO.name = tempArr[0];
						potVO.friedTeaMaxLvl = obj["tealeaf_max_level"];
						potVO.friedTeaMaxNums = obj["max_count"];
					}
				}
				else if(potVO.status == 1)
				{
					potVO.teaId = tempObj["li"];
					potVO.friedTeaNums =  tempObj["lc"];
					potVO.friedTeaRemainTime =  tempObj["lt"];
					potVO.friedTeaTime =  tempObj["nt"];
				}
				else if(potVO.status == 2)
				{
					potVO.teaId = tempObj["li"];
					potVO.friedTeaNums =  tempObj["lc"];
				}
				PotModel.potArr.push(potVO);
			}

			// 在 View 中更新炒锅
			PotModel.instance.handleCallback(takeData);
		}

		private getAssartPotInfoFn(receiveData?: any, takeData?: any): void
		{
			if(!receiveData)
				return;
			if(takeData){
				PotModel.takeData=takeData;
			}
			PotModel.receiveData = receiveData;
			PotModel.instance.handleCallback(receiveData);
		}

		/**
		 * 点击激活炒锅后的回调
		 */
		private actAssartPotFn(receiveData?:any,takeData?:any):void
		{
			if(!receiveData)
				return;

			// 激活失败
			if(receiveData.hasOwnProperty("_cmsg"))
			{
				TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
				return;
			}	// 激活成功
			else
			{

			}

			console.log("=================receiveData接收到的值为"+JSON.stringify(receiveData));
			PotModel.instance.handleCallback(takeData);
		}


		private getPotLevelUpFn(receiveData:any,takeData:any):void
		{
			// {"_c":"1","errMsg":" ","_api":"getPotLevelUpInfo_84874","nm":51100,"ny	":0,"nl":37,"_cmd":"","_g":"","_e":""}
			if(!receiveData)
				return;

			if(receiveData["errMsg"])
			{
				// TipLayerManager.tipLayer.showCommonTip(receiveData["errMsg"]);
				TipLayerManager.tipLayer.showDrawBgTip(receiveData["errMsg"]);
			}
			else
			{
				takeData["needMoney"] = receiveData["nm"];
				takeData["needDiamond"] = receiveData["ny"];
				takeData["needLevel"] = receiveData["nl"];
				PotModel.instance.handleCallback(takeData);
			}
		}

		/**
		 * 炒锅升级成功
		 */
		private actPotLevelUpFn(receiveData:any,takeData:any):void
		{
			if(!receiveData)
				return;

			if(!receiveData["errMsg"])
			{
				TipLayerManager.tipLayer.showDrawBgTip("炒锅升级成功！");
				PotModel.instance.updatePotLvl(takeData["potId"]);
				PotModel.instance.handleCallback(takeData);
			}
		}

		/**
		 * 更新炒锅等级数据
		 */
		updatePotLvl(potId:number):void
		{
			let i:number;
			let len:number = PotModel.potArr.length;
			let curPotVO:PotVO;
			for(i=0; i<len; i++)
			{
				curPotVO = PotModel.potArr[i];
				if(curPotVO.id == potId)
				{
					curPotVO.level += 1;
					break;
				}
			}
		}

		handleCallback(takeData?:any):void
		{
			if(PotModel.callback)
			{
				if(takeData)
					PotModel.callback(takeData);
				else
					PotModel.callback();
			}
		}

		/**
		 * 通过炒锅 id 获取炒锅数据
		 */
		static getPotVOByPotId(potId:number):PotVO
		{
			let potVO:PotVO;
			let len:number = PotModel.potArr.length;
			let i:number;
			for(i=0; i<len; i++)
			{
				potVO = PotModel.potArr[i];
				if(potId == potVO.id)
					return potVO;
			}
			return null;
		}

		/** 炒锅等级, 0：普通炒锅，1：青色炒锅，2：金色炒锅，3：紫色炒锅，4：金黄色炒锅*/
		getLevelByPotId(potId:number):string
		{
			let potLvlMsg:string;
			let potVO:PotVO = PotModel.getPotVOByPotId(potId);
			if(!potVO)
				potLvlMsg = undefined;
			if(potVO.level == 0)
				potLvlMsg = "普通炒锅";
			else if(potVO.level == 1)
				potLvlMsg = "青色炒锅";
			else if(potVO.level == 2)
				potLvlMsg = "金色炒锅";
			else if(potVO.level == 3)
				potLvlMsg = "紫色炒锅";
			else if(potVO.level == 4)
				potLvlMsg = "金黄色炒锅";
			return potLvlMsg;
		}

		/** 获取炒茶后的成品 */
		getTeaFruitInfo(receiveData:any,takeData:Object):void{
			if(receiveData){
				PotModel.receiveData=receiveData;
			}
			let infoObj:Object;
			let key:string;
			let seedVO:models.base.SeedVO=new models.base.SeedVO();
			infoObj=receiveData["_d"]
			for (key in infoObj) {
				if (infoObj.hasOwnProperty("count")) {
					seedVO.yield=infoObj["count"];
					seedVO.Tealvl=infoObj["quality"];
					PotModel.teaArr.push(seedVO);
				}
			}
			PotModel.instance.handleCallback(takeData);
		}

		/** 获取清除炒锅的数据 */
		getBrushPotInfo(receiveData?:any,takeData?:Object){
			if(receiveData){
				PotModel.receiveData=receiveData;
			}
			// TipLayerManager.tipLayer.showCommonTip("炒锅已清理完成！");
			PotModel.instance.handleCallback(takeData);
		}

		private useToolOver(receiveData:Object,takeData:Object):void
		{
			takeData["left"] = receiveData["left"];
			PotModel.instance.handleCallback(takeData);
		}

	}
}