namespace models.friedRoom.pot
{
	import PotVO = models.friedRoom.pot.PotVO;

	/**
	 * 炒茶相关数据
	 */
	export class FriedTeaDialogModel
	{
		/** 全部茶叶数据 */
		allTeaVOArr: Array<models.base.SeedVO>;
		/** 茶叶详情数据集 */
		teaShowVOArr:Array<models.base.SeedVO>;
		/** 炒茶材料数据集 */
		dataShowVOArr:Array<models.base.SeedVO>;
		/** 炒茶时产生的数据 */
		infoShowVOArr:Array<models.base.SeedVO>;

		receiveData: any;
		takeData:any;

		static callback: Function;

		private static instance: FriedTeaDialogModel;

		constructor()
		{
			this.allTeaVOArr = new Array<models.base.SeedVO>();
			this.teaShowVOArr=new Array<models.base.SeedVO>();
			this.dataShowVOArr=new Array<models.base.SeedVO>();
			this.infoShowVOArr=new Array<models.base.SeedVO>();
		}

		static getInstance(): FriedTeaDialogModel
		{
			if (!FriedTeaDialogModel.instance)
				FriedTeaDialogModel.instance = new FriedTeaDialogModel();
			return FriedTeaDialogModel.instance;
		}

		/**
		 * 获取全部茶叶数据
		 */
		request_getAllTea(): void
		{
			HttpServiceProxy.request("getTeaTypeList", null, this.getAllTeaOverFn);	// ,{"potId":potId,"potLevel":potLevel,"potStatus":potStatus});
		}

		/**
		 * 获取分类茶叶数据
		 */
		request_getClassify(type:string):void{
		    HttpServiceProxy.request("getTeaTypeList",{"tt":type}, this.getClassFyOverFn);
		}

		/**
		 * 获取茶叶描述信息
		 */
		request_getDepotRightContentData(teaId:number): void
		{
			HttpServiceProxy.request("getFryTeaOtherInfo",{"li":teaId}, this.getFirstTeaContentFn,{"teaId":teaId});
		}

		/** 获取炒茶所需材料信息 */
		request_getMaterRightContentData(teaId:number):void{
			HttpServiceProxy.request("getFryTeaConditionData",{"li":teaId},this.getFirstTeamaterContent,{"teaId":teaId});
		}

		/** 购买炒茶所需材料 */
		request_buySingleGoods(type:string,teaId:number,locknum:number):void{
			HttpServiceProxy.request("buySingleGoods",{"st":type,"si":teaId,"bct":locknum},this.buyGoodsOver,{"si":teaId});
		}

		/**
		 * 开始炒茶
		 * "mi": 炒茶师的索引，默认为1
		 */
		request_startFriedTea(teaid:number,potid:number,teaNums:number,potStatus:number){
			HttpServiceProxy.request("startUpProcess",{"hi":potid,"li":teaid,"lc":teaNums,"mi":1},this.getFriedTeaResult,{"potStatus":potStatus});
		}

		private getAllTeaOverFn(receiveData?: any,takeData?:any): void
		{
			if (receiveData)
				this.receiveData=receiveData;
			if(takeData)
				this.takeData=takeData;

			let teasObjArr:Array<Object>= receiveData["_d"];
			let teaObjArrLen:number=teasObjArr.length;
			let i:number;
			let teaVO: models.base.SeedVO;
			let teaObj: Object;
			FriedTeaDialogModel.instance.allTeaVOArr.splice(0, FriedTeaDialogModel.instance.allTeaVOArr.length);
			for(i=0; i<teaObjArrLen; i++)
			{
				teaObj = teasObjArr[i];
				teaVO = new models.base.SeedVO();
				teaVO.id = teaObj["id"];		// 茶叶Id
				teaVO.Teaname = teaObj["ln"];	// 茶叶名称
				FriedTeaDialogModel.instance.allTeaVOArr.push(teaVO);
			}
			if(FriedTeaDialogModel.callback)
			{
				if(this.takeData)
					FriedTeaDialogModel.callback(takeData);
				else
					FriedTeaDialogModel.callback();
			}
		}

		private getClassFyOverFn(receiveData?: any,takeData?:any): void
		{
			if (receiveData)
				this.receiveData=receiveData;
			if(takeData)
				this.takeData=takeData;

			let teasObjArr:Array<Object>= receiveData["_d"];
			let teaObjArrLen:number=teasObjArr.length;
			let i:number;
			let teaVO: models.base.SeedVO;
			let teaObj: Object;
			FriedTeaDialogModel.instance.allTeaVOArr.splice(0, FriedTeaDialogModel.instance.allTeaVOArr.length);
			for(i=0; i<teaObjArrLen; i++)
			{
				teaObj = teasObjArr[i];
				teaVO = new models.base.SeedVO();
				teaVO.id = teaObj["id"];		// 茶叶Id
				teaVO.Teaname = teaObj["ln"];	// 茶叶名称
				if(takeData)
				{
					teaVO.potID=takeData["potId"];  //炒锅ID
					teaVO.potLevel=takeData["potLevel"];//炒锅等级
				}
				FriedTeaDialogModel.instance.allTeaVOArr.push(teaVO);
			}
			if(FriedTeaDialogModel.callback)
			{
				if(this.takeData)
					FriedTeaDialogModel.callback(takeData);
				else
					FriedTeaDialogModel.callback();
			}
		}
		/**
		 * 将首个茶叶的描述信息加入对应的茶叶数据中
		 */
		private getFirstTeaContentFn(receiveData?: any, takeData?: any): void
		{
			if (receiveData)
				this.receiveData=receiveData;
			if(takeData)
				this.takeData=takeData;
			let teaShowObjArr:Array<Object>= receiveData["_d"];
			let teaShowObjArrLen:number=teaShowObjArr.length;
			let j:number;
			let teaShowVO: models.base.SeedVO;
			let teaShowObj: Object;

			for(j=0; j<teaShowObjArrLen; j++)
			{
				teaShowObj = teaShowObjArr[j];
				teaShowVO = new models.base.SeedVO();
				teaShowVO.id = teaShowObj["li"];		// 茶叶Id
				teaShowVO.Teaname = teaShowObj["ln"];	// 茶叶名称
				teaShowVO.friedteanum=teaShowObj["lc"]; // 炒茶数量
				teaShowVO.teaPrice=teaShowObj["lp"];    //茶叶单价
				teaShowVO.friedTeaTime=teaShowObj["st"] //炒茶所需时间
				teaShowVO.teaIcon=teaShowObj["limg"]    //茶叶图片
				// teaShowVO.potID=takeData["potId"];      //炒锅ID
				// teaShowVO.potLevel=takeData["potLevel"];//炒锅等级
				// teaShowVO.potStatus=takeData["potStatus"];//炒锅状态
				FriedTeaDialogModel.instance.teaShowVOArr.push(teaShowVO);
			}
			if(FriedTeaDialogModel.callback)
			{
				if(this.takeData)
					FriedTeaDialogModel.callback(takeData);
				else
					FriedTeaDialogModel.callback();
			}
		}

		/**
		 * 将首个茶叶的所需材料信息加入对应的茶叶数据中
		 */
		private getFirstTeamaterContent(receiveData?: any,takeData?:any): void
		{
			if (!receiveData)
				return;
			if(receiveData){
				this.receiveData=receiveData;
			}
			if(takeData){
				this.takeData=takeData;
			}
			let seedsObj: Object = receiveData["_d"];
			let seedObj: Object;
			let seedVO: models.base.SeedVO;
			let key: string;
			FriedTeaDialogModel.instance.teaShowVOArr.splice(0, FriedTeaDialogModel.instance.teaShowVOArr.length);

			for(key in seedsObj)
			{
				// 普通绿茶鲜叶
				if(key=="0"){
					seedObj=seedsObj[key];
					if(seedObj.hasOwnProperty("si")){
						seedVO=new models.base.SeedVO();
						seedVO.id = seedObj["si"];	 // 鲜叶Id
						seedVO.name = seedObj["sn"];	 // 鲜叶名称
						seedVO.seedNums=seedObj["sic"];	// 鲜叶数量
						seedVO.teaPrice=seedObj["p"];  // 鲜叶单价
						seedVO.type=seedObj["sy"]; 	 	// 鲜叶类型
						seedVO.icon=seedObj["simg"];    // 果实图片
						seedVO.storageNums=seedObj["sc"];//仓库中存在的数量
						seedVO.lockNums=seedObj["lc"]; //缺少的数量
						seedVO.unit=seedObj["ybp"]; //购买的单价数/单价
						// seedVO.Teaid=takeData["teaId"];//茶叶ID
						// seedVO.potID=takeData["potId"];//炒锅ID
						// seedVO.potLevel=takeData["potLevel"];//炒锅等级
						// seedVO.potStatus=takeData["potStatus"];//炒锅状态
						FriedTeaDialogModel.instance.teaShowVOArr.push(seedVO);
					}
				} // 工艺书
				if(key=="1"){
					seedObj=seedsObj[key];
					if(seedObj.hasOwnProperty("si")){
						seedVO=new models.base.SeedVO();
						seedVO.id = seedObj["si"];
						seedVO.name = seedObj["sn"];
						seedVO.seedNums=seedObj["sic"];	// 工艺书数量
						seedVO.teaPrice=seedObj["p"];  	// 工艺书单价
						seedVO.type=seedObj["sy"]; 	 	// 工艺书类型
						seedVO.icon=seedObj["simg"];
						seedVO.storageNums=seedObj["sc"];//仓库中存在的数量
						seedVO.lockNums=seedObj["lc"]; //缺少的数量
						seedVO.unit=seedObj["ybp"]; 	//购买的单价数/单价
						// seedVO.Teaid=takeData["teaId"];//茶叶ID
						// seedVO.potID=takeData["potId"];//炒锅ID
						// seedVO.potLevel=takeData["potLevel"];//炒锅等级
						// seedVO.potStatus=takeData["potStatus"];//炒锅状态
						FriedTeaDialogModel.instance.teaShowVOArr.push(seedVO);
					}
				}

			}
			FriedTeaDialogModel.instance.handleCallback(takeData);
		}

		private buyGoodsOver(receiveData:Object,takeData:Object):void
		{
			controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);

			let teaId:number = takeData["si"];
			FriedTeaDialogModel.instance.request_getMaterRightContentData(teaId);
		}

		/**
		 * 点击开始炒茶后的响应结果
		 */
		private getFriedTeaResult(receiveData?:any,takeData?:any):void{
			if (receiveData)
				this.receiveData=receiveData;
			if (takeData)
				this.takeData=takeData;
				console.log(JSON.stringify(receiveData));

			let infoObj:Object= receiveData["_d"];
			if(!infoObj)
				return;

			let potVo:PotVO = controllers.friedRoom.pot.PotCtrl.friedPotView.potsArr[infoObj["hi"]-1];
			potVo.teaId = infoObj["li"];
			potVo.teaName = infoObj["ln"];
			potVo.friedTeaTime = infoObj["nt"];
			potVo.friedTeaRemainTime = infoObj["lt"];
			potVo.status = 1;

			TipLayerManager.tipLayer.showDrawBgTip("花费："+receiveData["_g"]+"个金币，开始炒茶！");
			controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);

			FriedTeaDialogModel.instance.handleCallback(potVo);
		}

		handleCallback(takeData?:any): void
		{
			if (FriedTeaDialogModel.callback)
			{
				if (takeData)
					FriedTeaDialogModel.callback(takeData);
				else
					FriedTeaDialogModel.callback();
			}
		}

	}
}
