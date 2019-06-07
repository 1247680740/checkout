namespace models.makeRoom
{
	// import SeedVO=models.base.SeedVO;

	/**
	 * 泡茶室相关数据
	 */
	export class MakeTeaHomeModel
	{
		/** 初始化泡茶室权限数据 */
		static makeTeaPowerVOArr:Array<models.base.SeedVO>;
		/** 停止烧水产生的数据 */
		static firedWaterVOArr: Array<models.base.SeedVO>;
		/** 开始泡茶产生的数据 */
		static startMakeTeaVOArr:Array<models.base.SeedVO>;

		receiveData: any;
		takeData:any;
		static callback: Function;

		private static instance: MakeTeaHomeModel;

		constructor()
		{
			MakeTeaHomeModel.makeTeaPowerVOArr = new Array<models.base.SeedVO>();
			MakeTeaHomeModel.firedWaterVOArr = new Array<models.base.SeedVO>();
			MakeTeaHomeModel.startMakeTeaVOArr=new Array<models.base.SeedVO>();
		}

		static getInstance(): MakeTeaHomeModel
		{
			if (!MakeTeaHomeModel.instance)
				MakeTeaHomeModel.instance = new MakeTeaHomeModel();
			return MakeTeaHomeModel.instance;
		}


		/** 初始化泡茶室获取泡茶权限 */
		request_MakeTeaPower():void{
			HttpServiceProxy.request("Paoinit",null,this.getMakeTeaPowerData);
		}
		/** 停止加热获取得分（需要参数：温度temp  前端获取） */
		request_stopFire(temp:number):void{
		    HttpServiceProxy.request("stopFire",{"temp":temp}, this.stopFire);
		}
		/** 开始泡茶产生的数据 */
		request_startMakeTea(): void
		{
			HttpServiceProxy.request("startDunk",null, this.startMakeTea);
		}
		/** 出售泡的茶 */
		request_saleTea():void{
			HttpServiceProxy.request("sellTea",null,this.saleTea);
		}
		/** 倒掉烧好的水/将茶叶放回仓库 */
		request_getWater():void{
			HttpServiceProxy.request("pourWater",null,this.pourWater);
		}


		/** 泡茶权限数据 */
		getMakeTeaPowerData(receiveData?:any):void{
			if(receiveData)
				this.receiveData=receiveData;
			let powerVOArr:Array<any>=receiveData["_cmd"];
			MakeTeaHomeModel.makeTeaPowerVOArr.splice(0,MakeTeaHomeModel.makeTeaPowerVOArr.length);
			let i:number;
			let key:string;
			let len:number=powerVOArr.length;
			let powerVO:models.base.SeedVO;
			if(len<=0){
				powerVO=new models.base.SeedVO();
				powerVO.symbolNums=receiveData["xtf"];
				powerVO.name="";
				MakeTeaHomeModel.makeTeaPowerVOArr.push(powerVO);
			}else{
				powerVO=new models.base.SeedVO();
				for (i=0;i<len;i++){
					let powerObj:Object=powerVOArr[i];
					powerVO.name=powerObj["name"];
					powerVO.symbolNums=receiveData["xtf"];
					let dataObj:Object=powerObj["param"];
					powerVO.teaSet=dataObj["potType"];
					powerVO.quality=dataObj["quality"];
					if(powerVO.name=="finishDunkTea"){
						powerVO.teaPrice=dataObj["price"];
						powerVO.teaSetNums=dataObj["nums"];
						MakeTeaHomeModel.makeTeaPowerVOArr.push(powerVO);
					}else{
						powerVO.quality=dataObj["quality"];
						powerVO.temperature=dataObj["temperature"];
						let tempObj:Object=dataObj["fitTemperature"];
						for (key in tempObj) {
							if(key=="0")
								powerVO.tempBottom= tempObj[key];
							else
								powerVO.tempTop=tempObj[key];
						}
						MakeTeaHomeModel.makeTeaPowerVOArr.push(powerVO);
					}
				}
			}
			MakeTeaHomeModel.instance.handleCallback(MakeTeaHomeModel.makeTeaPowerVOArr);

		}

        /** 停止加热获取得分 */
		private stopFire(receiveData?: any): void
		{
			if (receiveData)
				this.receiveData=receiveData;

			let firedWaterObj:Object= receiveData;
			MakeTeaHomeModel.firedWaterVOArr.splice(0, MakeTeaHomeModel.firedWaterVOArr.length);
			let teaVO: models.base.SeedVO= new models.base.SeedVO();
            teaVO.quality=firedWaterObj["quality"];  //茶水品质
            teaVO.waterStatus=firedWaterObj["waterstatus"]; //水温的品质
            MakeTeaHomeModel.firedWaterVOArr.push(teaVO);
            MakeTeaHomeModel.instance.handleCallback(MakeTeaHomeModel.firedWaterVOArr);
		}

        /** 开始泡茶数据 */
		private startMakeTea(receiveData?: any): void
		{
			if (receiveData)
				this.receiveData=receiveData;
			let teaShowObj:Object= receiveData;
			MakeTeaHomeModel.startMakeTeaVOArr.splice(0, MakeTeaHomeModel.startMakeTeaVOArr.length);
			let teaShowVO: models.base.SeedVO= new models.base.SeedVO();
			teaShowVO.teaPrice = teaShowObj["price"];		// 泡好的茶叶单价
			MakeTeaHomeModel.startMakeTeaVOArr.push(teaShowVO);
			// MakeTeaHomeModel.instance.handleCallback(MakeTeaHomeModel.startMakeTeaVOArr);
		}

		/**  出售泡的茶 */
		private saleTea(receiveData?: any): void
		{
			if(receiveData)
				this.receiveData=receiveData;
			let takeData: Object = {};
			// 出售失败
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
				MakeTeaHomeModel.startMakeTeaVOArr.length = 0;
				MakeTeaDialogModel.friedWaterVOArr.length = 0;
				MakeTeaHomeModel.makeTeaPowerVOArr.length=0;
				let PowerVO:models.base.SeedVO=new models.base.SeedVO();
				PowerVO.name="";
				MakeTeaHomeModel.makeTeaPowerVOArr.push(PowerVO);
			}
			// MakeTeaHomeModel.instance.handleCallback(takeData);
		}

		/** 倒掉烧好的水 */
		private pourWater(receiveData?:any):void
		{
			if(receiveData)
				this.receiveData=receiveData;
            let takeData: Object = {};
			// 接收数据
			if (receiveData["_cmsg"] && (receiveData["_cmsg"] as string).length > 2)
			{
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			MakeTeaHomeModel.startMakeTeaVOArr.length = 0;
			MakeTeaDialogModel.friedWaterVOArr.length = 0;
			MakeTeaHomeModel.makeTeaPowerVOArr.length=0;
			let PowerVO:models.base.SeedVO=new models.base.SeedVO();
			PowerVO.name="";
			MakeTeaHomeModel.makeTeaPowerVOArr.push(PowerVO);
            // MakeTeaHomeModel.instance.handleCallback(takeData);

		}


		handleCallback(takeData?:any):void
		{
			if (MakeTeaHomeModel.callback)
			{
				if (takeData)
					MakeTeaHomeModel.callback(takeData);
				else
					MakeTeaHomeModel.callback();
			}
		}

	}
}
