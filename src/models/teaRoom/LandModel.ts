 namespace models.teaRoom
{
	import Dictionary = laya.utils.Dictionary;
	import EventDispatcher = laya.events.EventDispatcher;
	import TweenUtil = utils.TweenUtil;
	// import PlayerInfoModel = models.player.PlayerInfoModel;

	/**
	 * 土地相关的数据模型
	 */
	export class LandModel
	{
		/** 服务器返回的数据 */
		static receiveData: any;
		/** 请求前自带的数据 */
		static takeData: any;

		/** 存放24个地块数据的容器 */
		static landArr:Array<LandVO>;
		static friendLanArr:Array<LandVO>;

		private static instance: LandModel;

		static eventDispatcher: EventDispatcher = new EventDispatcher();
		static DATA_HANDLED: string = "data_handled";

		/** 响应数据处理完毕回调 */
		static callback:Function;

		constructor()
		{
			if(!LandModel.landArr)
				LandModel.landArr = new Array<LandVO>();
			if(!LandModel.friendLanArr)
				LandModel.friendLanArr = new Array<LandVO>();
		}

		static getInstance(): LandModel
		{
			if(!LandModel.instance)
				LandModel.instance = new LandModel();
			return LandModel.instance;
		}

		/** 请求土地接口 */
		request_getFarmLand(): void
		{
			HttpServiceProxy.request("getFarmLand",null, this.getFarmLandFn);
		}

		/** 请求好友土地接口 */
		request_getFriendFarmLand() :void
		{
			HttpServiceProxy.request("getFarmLand", {"_f":models.player.PlayerInfoModel.friendInfo.userId}, this.getFriendFarmLandFn);
		}

		/** 请求开垦土地所需条件接口 */
		request_getAssartLandInfo(landId:number):void
		{
			HttpServiceProxy.request("getAssartLandInfo",{"li":landId},this.getAssartLandInfoFn);
		}

		/** 请求开垦土地接口 */
		request_actAssartLand(curLandVO:LandVO):void
		{
			HttpServiceProxy.request("actAssartLand",{"li":curLandVO.id},this.actAssartLandFn);
		}

		/**
		 * 土地升级
		 */
		request_getLandLevelUpInfo(landId:number):void
		{
			HttpServiceProxy.request("getLandLevelUpInfo",{"li":landId},this.getLandLevelUpFn,{"landId":landId});
		}

		/**
		 * 确认土地升级
		 */
		request_actLandLevelUp(landId:number):void
		{
			HttpServiceProxy.request("actLandLevelUp",{"li":landId},this.actLandLevelUpFn,{"landId":landId});
		}

		private getFarmLandFn(receiveData?: any, takeData?: any): void
		{
			if (!receiveData)
				return;

			LandModel.receiveData = receiveData;
			if (takeData)
				LandModel.takeData = takeData;

			LandModel.landArr.length=0;
			if(!LandModel.landArr)
				LandModel.landArr = new Array<LandVO>();

			LandModel.landArr.length=0;
			// LandModel.landArr.splice(0,LandModel.landArr.length);

			// 搜索结果失败
			let allLandObj:Object = LandModel.receiveData["_d"];
			var tempObj:Object;
			let index:number;
			for(index = 0; index<24; index++)
			{
				tempObj = allLandObj[index];
				if(!tempObj)
					continue;
				LandModel.landArr.push(new LandVO(tempObj["li"],tempObj["ls"],tempObj["ll"]));
			}

			// 在 View 中更新土地
			LandModel.instance.handleCallback(takeData);
		}

		private getFriendFarmLandFn(receiveData?: any, takeData?: any): void
		{
			if (!receiveData)
				return;

			LandModel.receiveData = receiveData;
			if (takeData)
				LandModel.takeData = takeData;

			LandModel.friendLanArr.length=0;
			if(!LandModel.friendLanArr)
				LandModel.friendLanArr = new Array<LandVO>();

			let allLandObj:Object = LandModel.receiveData["_d"];

			var tempObj:Object;
			let index:number;
			for(index = 0; index<24; index++)
			{
				tempObj = allLandObj[index];
				if(!tempObj)
					continue;
				LandModel.friendLanArr.push(new LandVO(tempObj["li"],tempObj["ls"],tempObj["ll"]));  //
			}

			// 在 View 中更新土地
			LandModel.instance.handleCallback(takeData);
		}
		private getAssartLandInfoFn(receiveData?: any, takeData?: any): void
		{
			if(!receiveData)
				return;
			LandModel.receiveData = receiveData;
			takeData && (LandModel.takeData = takeData);

			LandModel.instance.handleCallback(takeData);
		}

		/**
		 * 点击开垦土地后的回调
		 */
		private actAssartLandFn(receiveData?:any,takeData?:any):void
		{
			if(!receiveData)
				return;
			console.log("如下写法需完善！");

			// 开垦失败
			if(receiveData.hasOwnProperty("_cmsg"))
			{
				// TipLayerManager.tipLayer.showCommonTip(receiveData["_cmsg"]);
				TipLayerManager.tipLayer.showDrawBgTip(receiveData["_cmsg"]);
				return;
			}	// 开垦成功
			else
			{
				controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			}
			LandModel.instance.handleCallback(takeData);
		}

		private getLandLevelUpFn(receiveData:any,takeData:any):void
		{
			// {"_c":"1","errMsg":" ","_api":"getLandLevelUpInfo_84874","nm":51100,"ny":0,"nl":37,"_cmd":"","_g":"","_e":""}
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
				LandModel.instance.handleCallback(takeData);
			}
		}

		/**
		 * 土地升级成功
		 */
		private actLandLevelUpFn(receiveData:any,takeData:any):void
		{
			if(!receiveData)
				return;

			if(receiveData["errMsg"])
			{
				TipLayerManager.tipLayer.showDrawBgTip(receiveData["errMsg"]);
			}
			else
			{
				TipLayerManager.tipLayer.showDrawBgTip("土地升级成功！");
				LandModel.instance.updateLandGridLevel(takeData["landId"]);
				LandModel.instance.handleCallback(takeData);
				controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			}
		}

		/**
		 * 更新土地等级数据
		 */
		updateLandGridLevel(landId:number):void
		{
			let i:number;
			let len:number = LandModel.landArr.length;
			let curLandVO:LandVO;
			for(i=0; i<len; i++)
			{
				curLandVO = LandModel.landArr[i];
				if(curLandVO.id == landId)
				{
					curLandVO.level += 1;
					break;
				}
			}
		}

		handleCallback(takeData?:any):void
		{
			if(LandModel.callback)
			{
				if(takeData)
					LandModel.callback(takeData);
				else
					LandModel.callback();
			}
		}

		/**
		 * 通过地块 id 获取地块数据
		 */
		static getLandVOByLandId(landId:number):LandVO
		{
			let landVO:LandVO;
			let len:number = LandModel.landArr.length;
			let i:number;
			for(i=0; i<len; i++)
			{
				landVO = LandModel.landArr[i];
				if(landId == landVO.id)
					return landVO;
			}
			return null;
		}

		/**
		 * 通过地块 id 获取好友地块数据
		 */
		static getFriendLandVOByLandId(landId:number):LandVO
		{
			let landVO:LandVO;
			let len:number = LandModel.friendLanArr.length;
			let i:number;
			for(i=0; i<len; i++)
			{
				landVO = LandModel.friendLanArr[i];
				if(landId == landVO.id)
					return landVO;
			}
			return null;
		}
		/** 土地等级, 0：普通土地，1：红土地， 2：黑土地*/
		getLevelByLandId(landId:number):string
		{
			let landLvlMsg:string;
			let landVO:LandVO = LandModel.getLandVOByLandId(landId);
			if(!landVO)
				landLvlMsg = undefined;
			if(landVO.level == 0)
				landLvlMsg = "普通土地";
			else if(landVO.level == 1)
				landLvlMsg = "红土地";
			else if(landVO.level == 2)
				landLvlMsg = "黑土地";
			return landLvlMsg;
		}


	}
}