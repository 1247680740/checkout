namespace models.teaRoom.crop
{
	import CropVO = models.base.CropVO;
	// import CropCtrl = controllers.teaRoom.crop.CropCtrl;
	// import PlayerInfoModel = models.player.PlayerInfoModel;

	/**
	 * 作物相关数据模型
	 */
	export class CropModel
	{
		static receiveData:any;
		static takeData:any;

		/** 存放作物数据的容器 */
		static cropVOArr:Array<models.base.CropVO>;
		static friendCropVOArr:Array<models.base.CropVO>;
		/** 当前种植成功的作物数据（暂未用到） */
		curPlantCropVO:models.base.CropVO;

		private static instance:CropModel;

		static callback:Function;
		/**
		 * 干旱作物数组
		 */
		static dryCropVOsArr:Array<CropVO>;
		static dryCropVOsArr1:Array<CropVO>;
		/**
		 * 有草作物数组
		 */
		static grassCropVOsArr:Array<CropVO>;
		static grassCropVOsArr1:Array<CropVO>;
		/**
		 * 有虫作物数组
		 */
		static wormCropVOsArr:Array<CropVO>;
		static wormCropVOsArr1:Array<CropVO>;

		constructor()
		{
			CropModel.cropVOArr = new Array<models.base.CropVO>();
			CropModel.friendCropVOArr = new Array<models.base.CropVO>();
			CropModel.dryCropVOsArr = new Array<CropVO>();
			CropModel.grassCropVOsArr = new Array<CropVO>();
			CropModel.wormCropVOsArr = new Array<CropVO>();
			CropModel.dryCropVOsArr1 = new Array<CropVO>();
			CropModel.grassCropVOsArr1 = new Array<CropVO>();
			CropModel.wormCropVOsArr1 = new Array<CropVO>();
		}

		static getInstance():CropModel
		{
			if(!CropModel.instance)
				CropModel.instance = new CropModel();
			return CropModel.instance;
		}

		/** 种植 */
		request_doGrow(landId:number,seedId:number):void
		{
			if(!landId || !seedId)
				return;

			HttpServiceProxy.request("doGrow",{"li":landId,"si":seedId},this.doGrowFn,{"landId":landId,"seedId":seedId});
		}

		/** 种植是否成功 */
		private doGrowFn(receiveData:any, takeData:any):void
		{
			if(!receiveData)
				return;
			CropModel.receiveData = receiveData;
			takeData && (CropModel.takeData = takeData);

			// takeData = {};
			if(receiveData["_cmsg"])
			{
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			else
			{
				// 经验 + _e 个
				let exp:number = parseInt(receiveData["_e"]);
				takeData["exp"] = exp;
				controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			}

			CropModel.instance.handleCallback(takeData);
		}

		/** 种植成功或状态更新后请求作物状态等相关数据 */
		request_initCrop(landId:number, seedId:number):void
		{
			if(!landId || !seedId)
				return;

			HttpServiceProxy.request("initCrop",{"li":landId,"si":seedId},this.initCropFn,{"landId":landId,"seedId":seedId});
		}

		request_initFriendCrop(landId:number, seedId:number):void
		{
			if(!landId || !seedId)
				return;

			HttpServiceProxy.request("initCrop",{"_f":models.player.PlayerInfoModel.friendInfo.userId,"li":landId,"si":seedId},this.initFriendCropFn,{"landId":landId,"seedId":seedId});
		}

		/**
		 * 除草
		 */
		 request_actWipeGrass(cropVO:CropVO,isFarmer:boolean=false,curCoordinate?:Laya.Point):void
		 {
			if(isFarmer)
				HttpServiceProxy.request("actWipeGrass",{"li":cropVO.landId},this.removeOneGrassOverFn,{"landId":cropVO.landId,"isFarmer":"removeGrass","curCoordinate":curCoordinate});
			else
				HttpServiceProxy.request("actWipeGrass",{"li":cropVO.landId},this.removeOneGrassOverFn,{"landId":cropVO.landId});
		 }

		 request_actFriendWipeGrass(cropVO:CropVO):void
		 {
			HttpServiceProxy.request("actWipeGrass",{"_f":models.player.PlayerInfoModel.friendInfo.userId,"li":cropVO.landId},this.removeOneGrassOverFn,{"landId":cropVO.landId});
		 }

		/**
		 * 除虫
		 */
		request_actPesticide(cropVO:CropVO,isFarmer:boolean=false,curCoordinate?:Laya.Point):void
		{
			if(isFarmer)
				HttpServiceProxy.request("actPesticide",{"li":cropVO.landId},this.removeOneWormOverFn,{"landId":cropVO.landId,"isFarmer":"killWrom","curCoordinate":curCoordinate});
			else
				HttpServiceProxy.request("actPesticide",{"li":cropVO.landId},this.removeOneWormOverFn,{"landId":cropVO.landId});
		}

		request_actFriendPesticide(cropVO:CropVO):void
		{
			HttpServiceProxy.request("actPesticide",{"_f":models.player.PlayerInfoModel.friendInfo.userId,"li":cropVO.landId},this.removeOneWormOverFn,{"landId":cropVO.landId});
		}

		/**
		 * 浇水
		 */
		request_actWater(cropVO:CropVO,isFarmer:boolean=false,curCoordinate?:Laya.Point):void
		{
			if(isFarmer)
				HttpServiceProxy.request("actWater",{"li":cropVO.landId},this.waterOverFn,{"landId":cropVO.landId,"isFarmer":"water","curCoordinate":curCoordinate});
			else
				HttpServiceProxy.request("actWater",{"li":cropVO.landId},this.waterOverFn,{"landId":cropVO.landId});

		}
		request_actFriendWater(cropVO:CropVO):void
		{
			HttpServiceProxy.request("actWater",{"_f":models.player.PlayerInfoModel.friendInfo.userId,"li":cropVO.landId},this.waterOverFn,{"landId":cropVO.landId});
		}

		/**
		 * 放草
		 */
		request_putGrass(cropVO:CropVO):void
		{
			HttpServiceProxy.request("actPutGrass",{"_f":models.player.PlayerInfoModel.friendInfo.userId,"li":cropVO.landId},this.putGrassOverFn,{"landId":cropVO.landId});
		}

		/**
		 * 放虫
		 */
		request_putWorm(cropVO:CropVO):void
		{
			HttpServiceProxy.request("actWorm",{"_f":models.player.PlayerInfoModel.friendInfo.userId,"li":cropVO.landId},this.putWormOverFn,{"land":cropVO});
		}

		/**
		 * 获取作物（游戏初始化时）
		 */
		request_getCrop():void
		{
			HttpServiceProxy.request("getCrop",null,this.getCropFn);
		}

		/**
		 *  获取好友游戏作物
		 */
		request_getFriendCrop():void
		{
			HttpServiceProxy.request("getCrop",{"_f":models.player.PlayerInfoModel.friendInfo.userId},this.getFriendCropFn);
		}

		private getCropFn(receiveData?: any, takeData?: any): void
		{
			if(!receiveData)
				return;
			CropModel.receiveData = receiveData;
			if (takeData)
				CropModel.takeData = takeData;

			CropModel.cropVOArr.length=0;
			let allObj:Object = receiveData["_d"];
			if(!allObj)
				return;

			CropModel.cropVOArr.length = 0;
			let cropVO:models.base.CropVO;
			let landId:string;
			let cropObj:Object;
			for(landId in allObj)
			{
				cropObj = allObj[landId];
				cropVO = new models.base.CropVO();
				cropVO.landId = parseInt(landId);

				// {"1":{,"gt":113306328,"hc":0,"ll":0,"cp":3,"s":1,"die":0,"th":0,"lc":15,"o":"26","c":1}
				cropVO.id = cropObj["si"];	// 此处是种子id，注意与 SeedVO 的关系！
				cropVO.totalGrowthTime = cropObj["gt"];
				// cropVO. = cropObj["hc"];	// harvest count
				// cropVO. = cropObj["ll"];	// land level
				cropVO.growthStatus = cropObj["cp"];
				cropVO.worm = cropObj["vc"]?cropObj["vc"]:0;
				cropVO.grass = cropObj["wc"]?cropObj["wc"]:0;
				cropVO.dry = cropObj["dr"]?cropObj["dr"]:0;
				// cropVO.debuff["worm"] = cropObj["vc"]?cropObj["vc"]:0;
				// cropVO.debuff["grass"] = cropObj["wc"]?cropObj["wc"]:0;
				// cropVO.debuff["dry"] = cropObj["dr"]?cropObj["dr"]:0;
				cropVO.season = cropObj["s"];
				cropVO.isDeath = cropObj["die"];
				cropVO.isSteal = cropObj["th"];
				cropVO.remnantOutput = cropObj["lc"];
				cropVO.growthTime = cropObj["nt"]?cropObj["nt"]:0;
				CropModel.cropVOArr.push(cropVO);
			}

			CropModel.cropVOArr.sort(CropModel.instance.sortCropVOArr);
			CropModel.instance.saveCropVOsByDebuffType();	// 2017-08-07 hsx
			CropModel.instance.handleCallback(takeData);
		}

		private getFriendCropFn(receiveData?: any, takeData?: any):void
		{
			if(!receiveData)
				return;
			CropModel.receiveData = receiveData;
			if (takeData)
				CropModel.takeData = takeData;

			CropModel.friendCropVOArr.length=0;
			let allObj:Object = receiveData["_d"];
			if(!allObj)
				return;

			let cropVO:models.base.CropVO;
			let landId:string;
			let cropObj:Object;
			for(landId in allObj)
			{
				cropObj = allObj[landId];
				cropVO = new models.base.CropVO();
				cropVO.landId = parseInt(landId);

				cropVO.id = cropObj["si"];
				cropVO.totalGrowthTime = cropObj["gt"];
				cropVO.growthStatus = cropObj["cp"];
				cropVO.worm = cropObj["vc"]?cropObj["vc"]:0;
				cropVO.grass = cropObj["wc"]?cropObj["wc"]:0;
				cropVO.dry = cropObj["dr"]?cropObj["dr"]:0;
				cropVO.season = cropObj["s"];
				cropVO.isDeath = cropObj["die"];
				cropVO.isSteal = cropObj["th"];
				cropVO.remnantOutput = cropObj["lc"];
				cropVO.growthTime = cropObj["nt"]?cropObj["nt"]:0;
				CropModel.friendCropVOArr.push(cropVO);
			}

			CropModel.friendCropVOArr.sort(CropModel.instance.sortCropVOArr);
			CropModel.instance.saveFriendCropVOsByDebuffType();	// 2017-10-23 hsx
			CropModel.instance.handleCallback(takeData);
		}

		/**
		 * 种植成功、施肥、收获完毕或其它状态更新后的作物数据
		 */
		private initCropFn(receiveData?:any, takeData?:any):void
		{
			if(!receiveData)
				return;
			CropModel.receiveData = receiveData;
			CropModel.takeData = takeData;

			if(receiveData["_cmsg"])
			{
				takeData = {};
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			else
			{
				let cropVO:models.base.CropVO = CropModel.instance.getCropVOByLandIdAndSeedId(takeData);
				if(!cropVO)
				{
					cropVO = new models.base.CropVO();
					CropModel.cropVOArr.push(cropVO);
				}

				CropModel.instance.fillVO(cropVO,receiveData);

				// 自带数据赋值
				cropVO.id = takeData["seedId"];
				cropVO.landId = takeData["landId"];

				CropModel.instance.curPlantCropVO = cropVO;

				// 按 landId 排序
				CropModel.cropVOArr.sort(CropModel.instance.sortCropVOArr);
			}

			CropModel.instance.handleCallback(takeData);
		}


		private initFriendCropFn(receiveData?:any, takeData?:any):any
		{
			if(!receiveData)
				return;
			CropModel.receiveData = receiveData;
			CropModel.takeData = takeData;

			if(receiveData["_cmsg"])
			{
				takeData = {};
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			else
			{
				let cropVO:models.base.CropVO = CropModel.instance.getFriendCropVOByLandIdAndSeedId(takeData);
				if(!cropVO)
				{
					cropVO = new models.base.CropVO();
					CropModel.friendCropVOArr.push(cropVO);
				}

				CropModel.instance.fillVO(cropVO,receiveData);

				// 自带数据赋值
				cropVO.id = takeData["seedId"];
				cropVO.landId = takeData["landId"];

				CropModel.instance.curPlantCropVO = cropVO;

				// 按 landId 排序
				CropModel.friendCropVOArr.sort(CropModel.instance.sortCropVOArr);
		}

		CropModel.instance.handleCallback(takeData);
		}


		/**
		 * 先判断相应地块是否已种植特定作物，若有，则在其基础上更新数据
		 */
		getCropVOByLandIdAndSeedId(takeData:Object):CropVO
		{
			if(!takeData["landId"] || !takeData["seedId"])
				return null;

			let cropVO:models.base.CropVO = null;
			if(CropModel.cropVOArr && CropModel.cropVOArr.length)
			{
				let len:number = CropModel.cropVOArr.length;
				let i:number;
				for(i=0; i<len; i++)
				{
					cropVO = CropModel.cropVOArr[i];
					// 若当前地块上已有此作物
					if(cropVO.id == takeData["seedId"] && cropVO.landId == takeData["landId"])
					{
						// CropModel.cropVOArr.splice(i,1);
						// break;
						return cropVO;
					}
				}
			}
			return null;
		}

		/** (好友) 先判断相应地块是否已种植特定作物，若有，则在其基础上更新数据 */
		getFriendCropVOByLandIdAndSeedId(takeData:Object):CropVO
		{
			if(!takeData["landId"] || !takeData["seedId"])
				return null;

			let cropVO:models.base.CropVO = null;
			if(CropModel.friendCropVOArr && CropModel.friendCropVOArr.length)
			{
				let len:number = CropModel.friendCropVOArr.length;
				let i:number;
				for(i=0; i<len; i++)
				{
					cropVO = CropModel.friendCropVOArr[i];
					// 若当前地块上已有此作物
					if(cropVO.id == takeData["seedId"] && cropVO.landId == takeData["landId"])
					{
						// CropModel.cropVOArr.splice(i,1);
						// break;
						return cropVO;
					}
				}
			}
			return null;
		}

		/**
		 * 填充VO数据，供 initCrop / actCollect 通用
		 */
		fillVO(cropVO:CropVO,receiveData:any):void
		{
			cropVO.levelText = receiveData["cpn"];
			cropVO.season = receiveData["s"];
			cropVO.name = receiveData["sn"];
			// let isDeath:boolean = false;
			cropVO.isDeath = receiveData["die"]?receiveData["die"]:false;
			// receiveData["die"];
			cropVO.isSteal = receiveData["th"];
			cropVO.iconUrl = receiveData["simg"];
			cropVO.remnantOutput = receiveData["lc"];

			// 未成熟
			cropVO.nextLevelText = receiveData["npn"]?receiveData["npn"]:"";
			cropVO.growthTime = receiveData["nt"]?receiveData["nt"]:0;	// "nt" 与 "et" 的区别
			cropVO.totalGrowthTime = receiveData["et"]?receiveData["et"]:0;

			// 成熟
			cropVO.totalOutput = receiveData["o"]?receiveData["o"]:0;
		}

		/**
		 * 施肥
		 */
		request_actProp(paramObj:Object):void
		{
			let landId:number = paramObj["landId"];
			let seedId:number = paramObj["seedId"];
			let toolId:number = paramObj["toolId"];
			HttpServiceProxy.request("actProp",{"li":landId,"si":seedId,"ti":toolId},this.fertilizeOver,{"landId":landId,"seedId":seedId});
		}

		fertilizeOver(receiveData:any,takeData:Object):void
		{
			if(!receiveData)
				return;
			CropModel.receiveData = receiveData;

			if(receiveData["_cmsg"])
			{
				takeData = {};
				takeData["errMsg"] = receiveData["_cmsg"];
			}

			CropModel.instance.handleCallback(takeData);
		}

		/**
		 * 收获单个作物
		 */
		request_actCollect(landId:number,seedId:number):void
		{
			HttpServiceProxy.request("actCollect",{"li":landId,"si":seedId},this.harvestCropOver,{"landId":landId,"seedId":seedId});
		}

		/**
		 * 单个作物收获完成(与收益相关的东西确认是否还需完善！！！)
		 */
		private harvestCropOver(receiveData:any,takeData:Object):void
		{
			if(!receiveData)
				return;
			CropModel.receiveData = receiveData;

			if(receiveData["_cmsg"])
			{
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			else
			{
				CropModel.instance.harvestSingleCropHandler(receiveData,takeData);
			}
			CropModel.instance.handleCallback(takeData);

			// 会调用接口：getUserLevel，确认什么情况下调用 ！！！

		}

		/** 单个作物收获后的处理 */
		private harvestSingleCropHandler(cropObj:Object,takeData:Object):void
		{
			controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(cropObj);

			takeData["exp"] = parseInt(cropObj["exp"]);
			let cropVO:CropVO = CropModel.instance.getCropVOByLandIdAndSeedId(takeData);
			if(!cropVO)
				return;
			CropModel.instance.fillVO(cropVO,cropObj);
			// cropVO.   = receiveData["hc"];
			// 			   receiveData["_t"];
		}

		/** 偷茶单个作物收获后的处理 */
		private harvestFriendSingleCropHandler(cropObj:Object,takeData:Object):void
		{
			controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(cropObj);

			takeData["exp"] = parseInt(cropObj["exp"]);
			let cropVO:CropVO = CropModel.instance.getFriendCropVOByLandIdAndSeedId(takeData);
			if(!cropVO)
				return;
			CropModel.instance.fillVO(cropVO,cropObj);
			// cropVO.   = receiveData["hc"];
			// 			   receiveData["_t"];
		}

		/** 一键收获 */
		request_actAllCollect():void
		{
			HttpServiceProxy.request("actAllCollect",null,this.harvestAllCropOver);

		}

		/** 偷茶（一键收获） */
		request_actFriendAllCollect():void
		{
			HttpServiceProxy.request("actAllCollect",{"_f":models.player.PlayerInfoModel.friendInfo.userId},this.harvestFriendAllCropOver);
		}

		private harvestAllCropOver(receiveData:any):void
		{
			if(!receiveData)
				return;
			CropModel.receiveData = receiveData;

			let takeData:Object = {};
			let cropObjArr:Array<Object> = new Array<Object>();
			if(receiveData["_cmsg"])
			{
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			else
			{
				let landId:string;
				let cropObj:Object;
				let curCropVO:CropVO;
				for(landId in receiveData["_d"])
				{
					cropObj = receiveData["_d"][landId];
					curCropVO = CropModel.getCropVOByLandId(cropObj["li"]);
					if(!curCropVO)
						continue;
					let _takeData:Object = {};
					_takeData["seedId"] = curCropVO.id;
					_takeData["landId"] = parseInt(landId);
					cropObjArr.push(_takeData);
					// 结果处理
					CropModel.instance.harvestSingleCropHandler(cropObj,_takeData);
				}

				takeData["cropObjArr"] = cropObjArr;
			}
			CropModel.instance.handleCallback(takeData);
		}

		harvestFriendAllCropOver(receiveData:any):void
		{
			if(!receiveData)
				return;
			CropModel.receiveData = receiveData;

			let takeData:Object = {};
			let friendCropObjArr:Array<Object> = new Array<Object>();
			if(receiveData["_cmsg"])
			{
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			else
			{
				let landId:string;
				let cropObj:Object;
				let curCropVO:CropVO;
				for(landId in receiveData["_d"])
				{
					cropObj = receiveData["_d"][landId];
					// cropObjArr.push(cropObj);

					curCropVO = CropModel.getFriendCropVOByLandId(cropObj["li"]);
					if(!curCropVO)
						continue;
					let _takeData:Object = {};
					_takeData["seedId"] = curCropVO.id;
					_takeData["landId"] = parseInt(landId);
					friendCropObjArr.push(_takeData);
					// 结果处理
					CropModel.instance.harvestFriendSingleCropHandler(cropObj,_takeData);
				}

				takeData["friendCropObjArr"] = friendCropObjArr;
			}
			CropModel.instance.handleCallback(takeData);
		}

		/**
		 * 铲除作物
		 */
		request_deleteCrop(landId:number,seedId:number):void
		{
			HttpServiceProxy.request("deleteCrop",{"li":landId,"si":seedId},this.deleteCropOver,{"landId":landId});
		}

		deleteCropOver(receiveData:any,takeData:Object):void
		{
			if(!receiveData)
				return;
			CropModel.receiveData = receiveData;

			if(receiveData["_cmsg"])
			{
				takeData["errMsg"] = receiveData["_cmsg"];

			}
			else
			{	// 有 exp 奖励
				let exp:number = receiveData["_e"]?receiveData["_e"]:0;
				if(exp)
					takeData["exp"] = exp;
				controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			}
			CropModel.instance.handleCallback(takeData);
		}

		private removeOneGrassOverFn(receiveData:any, takeData:any):void
		{
			if(!receiveData)
				return;

			// "_t"（针对好友）:  0:正常;1:可偷;2:可浇水;3:可除草;4:可除虫;  => 由后端源码推测，优先级由高到低依次为：1、2、3、4、0
			CropModel.instance.resultHandler(receiveData,takeData);
		}

		private removeOneWormOverFn(receiveData:any, takeData:any):void
		{
			if(!receiveData)
				return;

			// "_t":  0:正常;1:可偷;2:可浇水;3:可除草;4:可除虫;
			// {"_e":2,"_t":2,"_c":1,"_cmd":[],"_api":"actPesticide_78925"}
			CropModel.instance.resultHandler(receiveData,takeData);
		}

		private waterOverFn(receiveData:any, takeData:any):void
		{
			if(!receiveData)
				return;
			// "_t"   "_e"
			takeData["newStatus"] = receiveData["_t"];
			CropModel.instance.resultHandler(receiveData,takeData);
		}

		private putGrassOverFn(receiveData:any, takeData:any) :void
		{
			if(!receiveData)
				return;
			// takeData["newStatus"] = receiveData["_c"];
			CropModel.instance.resultHandler(receiveData,takeData);
		}

		private putWormOverFn(receiveData:any, takeData:any) :void
		{
			if(!receiveData)
				return;
			// takeData["newStatus"] = receiveData["_c"];
			CropModel.instance.resultHandler(receiveData,takeData);
		}

		/**
		 * 根据服务器返回的结果做相应的后续处理
		 */
		private resultHandler(receiveData:Object, takeData:Object):void
		{
			if(receiveData["_cmsg"])
			{
				takeData["errMsg"] = receiveData["_cmsg"];
			}
			else
			{
				let exp:number = receiveData["_e"]?receiveData["_e"]:0;
				if(exp)
				{
					takeData["exp"] = exp;
				}
				controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
			}
			CropModel.instance.handleCallback(takeData);
		}

		handleCallback(takeData?:any):void
		{
			if(CropModel.callback)
			{
				if(takeData)
					CropModel.callback(takeData);
				else
					CropModel.callback();
			}
		}

		/**
		 * 调用回调（备用！）
		 */
		handleCallback2(receiveData?:Object,takeData?:Object):void
		{
			if(CropModel.callback)
			{
				if(receiveData)
				{
					if(takeData)
						CropModel.callback(receiveData,takeData);
					else
						CropModel.callback(receiveData);
				}
				else
				{
					if(takeData)
						CropModel.callback(takeData);
					else
						CropModel.callback();
				}
			}
		}

		/**
		 * 对作物数据数组按 landId 排序
		 */
		sortCropVOArr(a:CropVO,b:CropVO):number
		{
			if(a.landId > b.landId)
				return 1;
			else if(a.landId < b.landId)
				return -1;
			else
				return 0;
		}

		/**
		 * 移除特定地块所对应作物的数据
		 */
		removeCropVOFromArr(landId:number):void
		{
			let i:number;
			let len:number = CropModel.cropVOArr.length;
			let curCropVO:models.base.CropVO;
			for(i=0; i<len; i++)
			{
				curCropVO = CropModel.cropVOArr[i];
				if(curCropVO.landId == landId)
				{
					CropModel.cropVOArr.splice(i,1);
					break;
				}
			}
		}

		/**
		 * 通过地块 id 获得其上对应的作物数据
		 */
		static getCropVOByLandId(landId:number):CropVO
		{
			let cropNum:number = CropModel.cropVOArr.length;
			let curCropVO:models.base.CropVO;
			let i:number;
			for(i=0; i<cropNum; i++)
			{
				curCropVO = CropModel.cropVOArr[i];
				if(curCropVO.landId == landId)
				{
					return curCropVO;
				}
			}
			return null;
		}

		/**
		 * 通过地块 id 获得好友土地上对应的作物数据
		 */
		static getFriendCropVOByLandId(landId:number):CropVO
		{
			let cropNum:number = CropModel.friendCropVOArr.length;
			let curCropVO:models.base.CropVO;
			let i:number;
			for(i=0; i<cropNum; i++)
			{
				curCropVO = CropModel.friendCropVOArr[i];
				if(curCropVO.landId == landId)
				{
					return curCropVO;
				}
			}
			return null;
		}

		/**
		 * 判断特定的土地上是否有作物
		 */
		static isHasCropInLandGrid(landId:number):boolean
		{
			if(CropModel.getCropVOByLandId(landId))
				return true;
			else
				return false;
		}

		/**
		 * 判断特定好友的土地上是否有作物
		 */
		static isHasFriendCropInLandGrid(landId:number):boolean
		{
			if(CropModel.getFriendCropVOByLandId(landId))
				return true;
			else
				return false;
		}
		/**
		 * 所有作物是否有不良状态存在
		 */
		static isHasDebuff():boolean
		{
			let cropNum:number = CropModel.cropVOArr.length;
			let curCropVO:models.base.CropVO;
			let i:number;
			for(i=0; i<cropNum; i++)
			{
				curCropVO = CropModel.cropVOArr[i];
				if(curCropVO.isHasDebuff)
				{
					return true;
				}
			}
			return false;
		}

		/**
		 * 好友所有作物是否有不良状态存在
		 */
		static isHasFriendDebuff():boolean
		{
			let cropNum:number = CropModel.friendCropVOArr.length;
			let curCropVO:models.base.CropVO;
			let i:number;
			for(i=0; i<cropNum; i++)
			{
				curCropVO = CropModel.friendCropVOArr[i];
				if(curCropVO.isHasDebuff)
				{
					return true;
				}
			}
			return false;
		}

		/**
		 * 按是否有干旱、草、虫情况依次存储所对应的作物数据（也可按作物显示顺序依次判断进行处理！）
		 */
		saveCropVOsByDebuffType():void
		{
			let cropNum:number = CropModel.cropVOArr.length;
			let curCropVO:models.base.CropVO;
			let i:number;
			CropModel.dryCropVOsArr = new Array<CropVO>();
			CropModel.grassCropVOsArr = new Array<CropVO>();
			CropModel.wormCropVOsArr = new Array<CropVO>();
			for(i=0; i<cropNum; i++)
			{
				curCropVO = CropModel.cropVOArr[i];
				if(curCropVO.dry)
					CropModel.dryCropVOsArr.push(curCropVO);
				if(curCropVO.grass)
					CropModel.grassCropVOsArr.push(curCropVO);
				if(curCropVO.worm)
					CropModel.wormCropVOsArr.push(curCropVO);
			}
		}

		saveFriendCropVOsByDebuffType():void
		{
			let cropNum:number = CropModel.friendCropVOArr.length;
			let curCropVO:models.base.CropVO;
			let i:number;
			CropModel.dryCropVOsArr1 = new Array<CropVO>();
			CropModel.grassCropVOsArr1 = new Array<CropVO>();
			CropModel.wormCropVOsArr1 = new Array<CropVO>();
			for(i=0; i<cropNum; i++)
			{
				curCropVO = CropModel.friendCropVOArr[i];
				if(curCropVO.dry)
					CropModel.dryCropVOsArr1.push(curCropVO);
				if(curCropVO.grass)
					CropModel.grassCropVOsArr1.push(curCropVO);
				if(curCropVO.worm)
					CropModel.wormCropVOsArr1.push(curCropVO);
			}
		}
	}
}