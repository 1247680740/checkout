namespace controllers.makeRoom
{
	import MakeTeaDialogModel=models.makeRoom.MakeTeaDialogModel;
	import MakeTeaHomeModel = models.makeRoom.MakeTeaHomeModel;
	import PotVO = models.friedRoom.pot.PotVO;
	import Event = laya.events.Event;
	// import MakeTeaHomeLayer =  views.makeRoom.MakeTeaHomeLayer;
	/**
	* 泡茶相关控制器
	*/
	export class MakeTeaDialogCtrl
	{
		// 泡茶弹窗界面
		static model:models.makeRoom.MakeTeaDialogModel;
		static model1:models.makeRoom.MakeTeaHomeModel;
		static potView:views.friedRoom.pot.PotGridView;
		static view:views.makeRoom.MakeTeaDialogView;
		static makeTeaHomeLayer:views.makeRoom.MakeTeaHomeLayer;
		private static instance: MakeTeaDialogCtrl;

		/** 当前点击的的左侧某个茶叶位置 */
		private curTeaId:number;
		constructor()
		{
			if (!MakeTeaDialogCtrl.model)
				MakeTeaDialogCtrl.model = MakeTeaDialogModel.getInstance();
			if (!MakeTeaDialogCtrl.model1)
				MakeTeaDialogCtrl.model1 = MakeTeaHomeModel.getInstance();
			if (!MakeTeaDialogCtrl.view)
				MakeTeaDialogCtrl.view = new views.makeRoom.MakeTeaDialogView();
			if (!MakeTeaDialogCtrl.makeTeaHomeLayer){
				MakeTeaDialogCtrl.makeTeaHomeLayer = SceneLayerManager.makeTeaSceneLayer;//new views.makeRoom.MakeTeaHomeLayer();
				// MakeTeaDialogCtrl.makeTeaHomeLayer = managers.SceneLayerManager.makeTeaSceneLayer;
			}
			MakeTeaDialogCtrl.view.tab1.on(Event.CLICK,this,this.request_getClassify,[null]);
			MakeTeaDialogCtrl.view.tab2.on(Event.CLICK,this,this.request_getClassify,["green"]);
			MakeTeaDialogCtrl.view.tab3.on(Event.CLICK,this,this.request_getClassify,["red"]);
			MakeTeaDialogCtrl.view.tab4.on(Event.CLICK,this,this.request_getClassify,["uron"]);
			MakeTeaDialogCtrl.view.tab5.on(Event.CLICK,this,this.request_getClassify,["white"]);
			MakeTeaDialogCtrl.view.tab6.on(Event.CLICK,this,this.request_getClassify,["yellow"]);
			MakeTeaDialogCtrl.view.tab7.on(Event.CLICK,this,this.request_getClassify,["black"]);
			MakeTeaDialogCtrl.view.tab8.on(Event.CLICK,this,this.request_getClassify,["flower"]);
			MakeTeaDialogCtrl.view.tab9.on(Event.CLICK,this,this.request_getClassify,["flower"]);
		}

		static getInstance(): MakeTeaDialogCtrl
		{
			if (!MakeTeaDialogCtrl.instance)
				MakeTeaDialogCtrl.instance = new MakeTeaDialogCtrl();
			return MakeTeaDialogCtrl.instance;
		}

		/** 点击泡茶向导显示泡茶界面 */
		showMakeTeaDialog(): void
		{
			// ======================= 调整 泡茶面板 的层级 -- 暂用
			// UILayerManager.makeTealayer.addChild(MakeTeaDialogCtrl.view.bgUI);
			SceneLayerManager.makeTeaSceneLayer.addChild(MakeTeaDialogCtrl.view.bgUI);
			MakeTeaDialogCtrl.view.bgUI.visible = true;
			MakeTeaDialogCtrl.view.bgUI.x = configs.GameConfig.GAME_WINDOW_WIDTH - MakeTeaDialogCtrl.view.bgUI.width >> 1;
			MakeTeaDialogCtrl.view.bgUI.y = configs.GameConfig.GAME_WINDOW_HEIGHT - MakeTeaDialogCtrl.view.bgUI.height >> 1;
			//获取全部茶叶种类
			this.request_getClassify(null);
		}

		request_MakeTeaPower():void {
			MakeTeaHomeModel.callback=this.initMakeTeaHome;
            MakeTeaDialogCtrl.model1.request_MakeTeaPower();
		}

		initMakeTeaHome():void{
			MakeTeaDialogCtrl.makeTeaHomeLayer.initMakeTeaHome(MakeTeaHomeModel.makeTeaPowerVOArr);
		}

		/** 获取分类茶叶 */
		 request_getClassify(type:string):void
		 {
			 MakeTeaDialogModel.callback = this.getTeaOverFn;
			 MakeTeaDialogCtrl.model.request_getClassify(type);
		 }

		getTeaOverFn():void
		{
			MakeTeaDialogCtrl.view.addStorageGrids(MakeTeaDialogModel.allTeaVOArr);
		}

		/** 请求右侧茶叶详情信息 */
		itemClkedFn(seedVO:models.base.SeedVO):void
		{
			MakeTeaDialogModel.callback=this.getRrightContent;
			MakeTeaDialogCtrl.model.request_getDepotRightContentData(seedVO.id);
		}

		getRrightContent(takeData:Object):void
		{
			MakeTeaDialogCtrl.view.updateRightContent(MakeTeaDialogModel.teaShowVOArr);
		}

		/**请求右侧泡茶所需茶叶材料 */
		itemClkedMaterial(teaId:number):void
		{
		   MakeTeaDialogModel.callback=this.getRightMaterContent;
		   MakeTeaDialogCtrl.model.request_getMaterRightContentData(teaId);
		}

		getRightMaterContent(takeData:any):void
		{
			MakeTeaDialogCtrl.view.loadMakeTeaSecret(MakeTeaDialogModel.dataShowVOArr);
		}

		/** 请求泡茶所需要的水资源 */
		itemClkedWater():void{
			MakeTeaDialogModel.callback=this.setWaterData;
			MakeTeaDialogCtrl.model.request_getWater();
		}

		setWaterData(takeData?:any):void{
			MakeTeaDialogCtrl.view.loadWaterData(MakeTeaDialogModel.waterVOArr);
		}

		/** 请求泡茶所需要的茶具资源 */
		itemClkedTeaSet():void{
			MakeTeaDialogModel.callback=this.setTeaSetData;
			MakeTeaDialogCtrl.model.request_getTeaSet();
		}

		setTeaSetData():void{
			MakeTeaDialogCtrl.view.getCurMakeTeaScore();
		}

		/** 请求当前泡茶组合的得分 */
		itemClkedScore(teaId:number,waterId:number,teaSetId:number):void{
			MakeTeaDialogModel.callback=this.setScore;
			MakeTeaDialogCtrl.model.request_getScore(teaId,waterId,teaSetId);
		}

		setScore():void{
			MakeTeaDialogCtrl.view.loadScore(MakeTeaDialogModel.curScore);
		}

		/** 请求购买玄天符接口 */
		getBuyXTF(st:string,si:number,bct:number):void{
			MakeTeaDialogModel.callback=this.resetXTFStatus;
			MakeTeaDialogCtrl.model.request_getXTF(st,si,bct);
		}

		resetXTFStatus():void{
			MakeTeaDialogCtrl.view.initXTFStatus(MakeTeaDialogModel.waterVOArr);
		}
		/** 请求购买水源接口 */
		getBuyWater(st:string,si:number,bct:number):void{
			MakeTeaDialogModel.callback=this.resetWaterNums;
			MakeTeaDialogCtrl.model.request_getBuyWater(st,si,bct);
		}

		/** 重置水源数量 */
		resetWaterNums():void{
			MakeTeaDialogCtrl.view.initWaterLockNums(parseInt(MakeTeaDialogCtrl.view.teaNums.text));
		}

		/** 购买单一茶叶 */
		getBuyLeaf(st:string,si:number,bct:number,nums:number):void
		{
			MakeTeaDialogModel.callback = this.resetLeafNums;
			MakeTeaDialogCtrl.model.request_buyleaf(st,si,bct,nums);
		}
		/** 重置茶叶数量 */
		resetLeafNums():void{
			MakeTeaDialogCtrl.view.initTeaLockNums(parseInt(MakeTeaDialogCtrl.view.teaNums.text));
		}

		/** 开始烧水请求 */
		friedWater(teaId:number,teaLvl:string,waterId:number,teaSetId:number,makeTeaNums:number,useToolFn:number):void{
			MakeTeaDialogModel.callback=this.setFriedWaterData;
			MakeTeaDialogCtrl.model.request_friedWater(teaId,teaLvl,waterId,teaSetId,makeTeaNums,useToolFn);
		}

		setFriedWaterData():void{
			MakeTeaDialogCtrl.makeTeaHomeLayer.startMakeTea(MakeTeaDialogModel.friedWaterVOArr);
		}

		/** 停止加热获取分数 */
		stopFriedWater(temp:number):void{
			MakeTeaHomeModel.callback=this.stopFriedWaterData;
			MakeTeaDialogCtrl.model1.request_stopFire(temp);
		}

		/** 停止加热 */
		stopFriedWaterData():void{
			MakeTeaDialogCtrl.makeTeaHomeLayer.initStopFriedWaterData();
		}
		/** 开始泡茶 */
		startMakeTea():void{
			MakeTeaDialogCtrl.model1.request_startMakeTea();
		}
		/** 出售茶叶 */
		saleTea():void{
			MakeTeaDialogCtrl.model1.request_saleTea();
		}
		/** 倒掉茶水 */
		dropWater():void{
			MakeTeaDialogCtrl.model1.request_getWater();
		}
	}
}