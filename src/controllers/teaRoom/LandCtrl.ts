namespace controllers.teaRoom
{
	import LandModel = models.teaRoom.LandModel;
	import LandVO = models.teaRoom.LandVO;
	import CropVO = models.base.CropVO;
	import PlayerInfoModel = models.player.PlayerInfoModel;
	import SceneLayerManager = managers.SceneLayerManager;
	import TipLayerManager = managers.TipLayerManager;
	import BagCtrl = controllers.teaRoom.bag.BagCtrl;
	import Event = laya.events.Event;

	/**
	 * 土地相关的控制类
	 */
	export class LandCtrl
	{
		static landModel: LandModel;
		static landView: views.teaRoom.LandView;
		static friendLandView: views.friendList.FriendLandView;

		private static instance:LandCtrl;

		constructor()
		{
			LandCtrl.landModel = LandModel.getInstance();

			if(!LandCtrl.landView)
				LandCtrl.landView = new views.teaRoom.LandView();
			if(!LandCtrl.friendLandView)
			{
				LandCtrl.friendLandView=new views.friendList.FriendLandView();
				LandCtrl.friendLandView.name = "friendLandView";
			}
			// 准备开垦
			LandCtrl.landView.on(views.teaRoom.LandView.WILL_ASSART_EVENT,this,this.willAssartFun);
			// 种植
			LandCtrl.landView.on(views.teaRoom.LandView.GROWTH_EVENT,this,this.growthFn);
		}

		static getInstance():LandCtrl
		{
			if(!LandCtrl.instance)
				LandCtrl.instance = new LandCtrl();
			return LandCtrl.instance;
		}

		/** 请求土地接口 */
		request_getFarmLand(): void
		{
			LandModel.callback = this.getFarmLandOver;
			LandCtrl.landModel.request_getFarmLand();
		}

		/** 请求好友土地接口 */
		request_getFriendFarmLand(): void
		{
			LandModel.callback = this.getFriendFarmLandOver;
			LandCtrl.landModel.request_getFriendFarmLand();
		}

		getFarmLandOver(): void
		{
			LandCtrl.landView.landSprite.removeChildren();	// test
			LandCtrl.landView.fillLand(LandModel.landArr);
			// 请求作物数据
			controllers.teaRoom.crop.CropCtrl.getInstance().request_getCrop();
		}

		getFriendFarmLandOver(): void
		{
			LandCtrl.friendLandView.landSprite.removeChildren();
			LandCtrl.friendLandView.fillLand(LandModel.friendLanArr);
			// 请求作物数据
			controllers.teaRoom.crop.CropCtrl.getInstance().request_getFriendCrop();
		}

		/** 点击 “未开垦” 图标，准备开垦 */
		willAssartFun(landId:number):void
		{
			if(!landId)
				return;
			if(landId<1 || landId>24)
				return;

			LandModel.callback = this.getAssartLandInfoOver;
			LandCtrl.landModel.request_getAssartLandInfo(landId);
		}

		/** 开垦土地 */
		request_actAssartLand():void
		{
			LandModel.callback = this.actAssartLandOver;
			LandCtrl.landModel.request_actAssartLand(LandCtrl.landView.curLandVO);
		}

		getAssartLandInfoOver(takeData?:LandVO):void
		{
			if(takeData)
				console.info("== LandCtrl, takeData:"+takeData);

			// 开垦提示
			let tipInfo:string = "开启一块土地需要：金币"+LandModel.receiveData["nm"]+"枚，等级"+LandModel.receiveData["nl"]+"级 你确定要开启新土地么？";
			// LandCtrl.instance.assartLandFn == LandCtrl.prototype.assartLandFn
			TipLayerManager.tipLayer.showYesNoTip(tipInfo,LandCtrl.prototype.assartLandFn);
		}

		/**
		 * 确认开垦
		 */
		private assartLandFn():void
		{
			LandCtrl.getInstance().request_actAssartLand();
		}

		/**
		 * 开垦完成
		 */
		actAssartLandOver(takeData?:any):void
		{
			// 更新土地状态
			LandCtrl.landView.updateLandGrid();
		}

		/**
		 * 土地升级
		 */
		request_getLandLevelUpInfo(landId:number):void
		{
			LandModel.callback = this.willLandLevelUpOver;
			LandCtrl.landModel.request_getLandLevelUpInfo(landId);
		}

		willLandLevelUpOver(takeData:Object):void
		{
			// {"_c":"1","errMsg":" ","_api":"getLandLevelUpInfo_84874","nm":51100,"ny":0,"nl":37,"_cmd":"","_g":"","_e":""}
			let landLvlMsg:string = LandCtrl.landModel.getLevelByLandId(takeData["landId"]);
			takeData["landLvlMsg"] = landLvlMsg;

			LandCtrl.prototype.showLandLevelupTip(takeData);
		}

		/**
		 * 弹出土地升级提示
		 */
		showLandLevelupTip(infoObj: Object): void
		{
			if (!infoObj)
				return;

			let canSubmit:boolean = true;
			let info: string = "升级到" + infoObj["landLvlMsg"] + "需要：金币";
			info += (infoObj["needMoney"] ? infoObj["needMoney"] : 0) + "枚，钻石";
			info += (infoObj["needDiamond"] ? infoObj["needDiamond"] : 0) + "枚，等级";
			info += infoObj["needLevel"] + "级";

			if (PlayerInfoModel.playerInfo.level < infoObj["needLevel"] ||
				PlayerInfoModel.playerInfo.money < infoObj["needMoney"] ||
				PlayerInfoModel.playerInfo.diamond < infoObj["needDiamond"])
			{
				info += "\n当前等级不足或金币、钻石不足，不能升级！";
				canSubmit = false;
			}
			else
			{
				info += "！";
			}
			TipLayerManager.tipLayer.showYesNoTip(info,LandCtrl.prototype.confirmLevelUp,infoObj["landId"],canSubmit);
		}

		/**
		 * 确认土地升级
		 */
		confirmLevelUp(landId: number): void
		{
			if (!landId)
				return;

			LandModel.callback = LandCtrl.prototype.landLevelUpOver;
			LandCtrl.landModel.request_actLandLevelUp(landId);
		}

		/**
		 * 更新地块的显示状态
		 */
		landLevelUpOver(takeData:Object):void
		{
			let landId:number = takeData["landId"];
			let curLandVO:models.teaRoom.LandVO = LandModel.getLandVOByLandId(landId);
			if(!curLandVO)
				return;
			LandCtrl.landView.updateLandGridState(landId,curLandVO);
		}

		/** 点击某块土地开始种植 */
		growthFn(landId:number):void
		{
			if(!landId)
				return;

			if(configs.GameConfig.curOperateType == "plant")
			{
				let seedId:number = parseInt(views.teaRoom.toolBar.DownToolBarView.curShowCursor.name);
				if(!seedId)
					return;

				controllers.teaRoom.crop.CropCtrl.getInstance().request_doGrow(landId,seedId);
			}
		}

		/**
		 * 清除特定地块上的作物
		 */
		removeCropViewByLandId(landId:number):void
		{
			let landGrid:views.teaRoom.LandGridView = LandCtrl.landView.getLandGridById(landId);
			if(landGrid.cropView)
			{
				// 移除作物
				landGrid.removeChildByName(landGrid.cropView.name);
				// landGrid.cropView.destroy(false);
				landGrid.cropView.destroy(true);
				landGrid.cropView = null;

				// 更新数据
				controllers.teaRoom.crop.CropCtrl.cropModel.removeCropVOFromArr(landId);
			}
		}

	}
}