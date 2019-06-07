namespace controllers.friedRoom.pot
{
	import IntensifyPotModel = models.friedRoom.pot.IntensifyPotModel;
	import Event = laya.events.Event;
	import BuyUpDataTipUI = ui.gameUI.tips.BuyUpDataTipUI;

	/**
	* 炒茶相关控制器
	*/
	export class IntensifyPotCtrl
	{
		static model: IntensifyPotModel;
		// 炒锅强化整体界面
		static intensifyview: views.friedRoom.pot.IntensifyPotView;
		// 购买升级材料弹窗界面
		static dataView: BuyUpDataTipUI;
		// 强化界面控制层
		private static instance: IntensifyPotCtrl;
		// 当前点击的购买对象名称
		curBuyName: string;

		constructor()
		{
			if (!IntensifyPotCtrl.model)
				IntensifyPotCtrl.model = IntensifyPotModel.getInstance();
			if (!IntensifyPotCtrl.intensifyview)
				IntensifyPotCtrl.intensifyview = new views.friedRoom.pot.IntensifyPotView();
			IntensifyPotCtrl.intensifyview.bgUI.closeBtn.on(Event.CLICK, this, this.closeBtnFn);
			IntensifyPotCtrl.intensifyview.metal.on(Event.CLICK, this, this.request_getUPDate);
			IntensifyPotCtrl.intensifyview.wood.on(Event.CLICK, this, this.request_getUPDate);
			IntensifyPotCtrl.intensifyview.water.on(Event.CLICK, this, this.request_getUPDate);
			IntensifyPotCtrl.intensifyview.fire.on(Event.CLICK, this, this.request_getUPDate);
			IntensifyPotCtrl.intensifyview.earth.on(Event.CLICK, this, this.request_getUPDate);
			IntensifyPotCtrl.intensifyview.way.on(Event.CLICK, this, this.request_getUPDate);
		}

		static getInstance(): IntensifyPotCtrl
		{
			if (!IntensifyPotCtrl.instance)
				IntensifyPotCtrl.instance = new IntensifyPotCtrl();
			return IntensifyPotCtrl.instance;
		}

		/** 显示炒锅强化弹窗 */
		showPotIntensifyDialog(): void
		{
			// 2017-09-20
			// UILayerManager.uiLayer.addChildAt(IntensifyPotCtrl.intensifyview.bgUI, UILayerManager.uiLayer.numChildren - 1);
			if (!UILayerManager.friedTeaLayer.getChildByName("intensifyview"))
			{
				IntensifyPotCtrl.intensifyview.bgUI.name = "intensifyview";
				UILayerManager.friedTeaLayer.addChild(IntensifyPotCtrl.intensifyview.bgUI);
			}
			IntensifyPotCtrl.intensifyview.bgUI.visible = true;
			IntensifyPotCtrl.intensifyview.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - IntensifyPotCtrl.intensifyview.bgUI.width >> 1;
			IntensifyPotCtrl.intensifyview.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - IntensifyPotCtrl.intensifyview.bgUI.height >> 1;
			this.request_getUPDate();
		}
		closeBtnFn(): void
		{
			// 2017-09-20
			// IntensifyPotCtrl.intensifyview.bgUI.removeSelf();
			// IntensifyPotCtrl.intensifyview.destroy(false);
			// IntensifyPotCtrl.intensifyview = null;
			IntensifyPotCtrl.intensifyview.bgUI.visible = false;
		}

		/** 请求炒锅全部状态信息 */
		request_getUPDate(): void
		{
			IntensifyPotModel.callback = IntensifyPotCtrl.instance.getUpDateOver;
			IntensifyPotCtrl.model.request_getFarmPot();
		}
		getUpDateOver(): void
		{
			IntensifyPotCtrl.intensifyview.fillUpData(IntensifyPotModel.potArr);
		}

		/**  请求获取炒锅强化成功后的状态变化数据*/
		request_FinishData(id: number): void
		{
			IntensifyPotModel.callback = IntensifyPotCtrl.instance.getFinishData;
			IntensifyPotCtrl.model.request_strengthPot(id);
		}
		getFinishData(): void
		{
			IntensifyPotCtrl.intensifyview.finishUpGrade(IntensifyPotModel.getInstance().potVOArr);
		}

		/** 请求获取中部材料数量并加载 */
		request_needUpData(id: number, level: number): void
		{
			IntensifyPotModel.callback = IntensifyPotCtrl.instance.fillMidData;
			IntensifyPotCtrl.model.request_UPDate(id, level);
		}
		fillMidData(takeData): void
		{
			IntensifyPotCtrl.intensifyview.addUpDate(IntensifyPotModel.getInstance().potVOArr);
		}
		willBuyDataOver(potsArr, curBuyName): void
		{
			TipLayerManager.tipLayer.showIntensifyPotTip(potsArr, curBuyName);
		}
		/** 确认购买强化材料 */
		request_confirmBuy(potVO: models.base.PotVO): void
		{
			IntensifyPotCtrl.model.request_ConfirmBuy(potVO.toolId, parseInt(potVO.lockToolNums));
		}
		/** 取消购买，强化 */
		cancelBtnClkFn(): void
		{
			IntensifyPotCtrl.intensifyview.removeChild(IntensifyPotCtrl.dataView);
			IntensifyPotCtrl.dataView = null;
		}
	}
}