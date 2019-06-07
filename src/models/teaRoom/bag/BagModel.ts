namespace models.teaRoom.bag
{
	// import SeedVO = models.base.SeedVO;
	// import ToolVO = models.base.ToolVO;

	/**
	 * 背包相关数据
	 */
	export class BagModel
	{
		/** 所有种子 */
		seedVOArr:Array<models.base.SeedVO>;
		/** 所有道具 */
		toolVOArr:Array<models.base.ToolVO>;

		private static instance:BagModel;

		receiveData:any;
		takeData:any;

		static callback:Function;

		// static self:BagModel;

		constructor()
		{
			this.seedVOArr = new Array<models.base.SeedVO>();
			this.toolVOArr = new Array<models.base.ToolVO>();
			// BagModel.self = this;
		}

		static getInstance():BagModel
		{
			if(!BagModel.instance)
				BagModel.instance = new BagModel();
			return BagModel.instance;
		}

		/**
		 * 请求背包种子数据
		 */
		request_getBagSeed():void
		{
			HttpServiceProxy.request("getBagSeed",null,this.getBagSeedOverFn);
		}

		/** 此处需向老版本确认具体写法，待修改 */
		private getBagSeedOverFn(receiveData?:any, takeData?:any):void
		{
			if(receiveData)
				this.receiveData = receiveData;
			if(takeData)
				this.takeData = takeData;

			let tempArr:Array<Object> = receiveData["_d"];
			let tempArrLen:number = tempArr.length;
			let i:number;
			let seedVO:models.base.SeedVO;
			let tempObj:Object;
			BagModel.instance.seedVOArr.splice(0,BagModel.instance.seedVOArr.length);
			for(i=0; i<tempArrLen; i++)
			{
				// {si:1,sn="普通红茶种子",sc:49,simg:"http://kaixins.app100712594.twsap.com/static/fruit_17.swf",l:2,d:"一季作物，6小时成熟"}
				tempObj = tempArr[i];
				seedVO = new models.base.SeedVO();
				seedVO.id = tempObj["si"];		// 种子Id
				seedVO.name = tempObj["sn"];	// 种子名称
				seedVO.type = tempObj["ty"];	// 类型
				seedVO.seedNums = tempObj["sc"];// 种子数量
				// ============ 此处已将原swf暂换成了 png 图片 =============
				let iconUrl:string = tempObj["simg"];
				iconUrl = iconUrl.substring(0,iconUrl.lastIndexOf("."));
				seedVO.icon = iconUrl + ".png";	// 种子图标路径
				// seedVO.icon = tempObj["simg"];
				seedVO.lvl = tempObj["l"];
				seedVO.seedFruitDes = tempObj["d"];

				// this.seedVOArr.push(seedVO);
				BagModel.instance.seedVOArr.push(seedVO);
			}

			if(BagModel.callback)
			{
				if(this.takeData)
					BagModel.callback(takeData);
				else
					BagModel.callback();
			}

		}

		/**
		 * 种植完后更新特定种子的数量
		 * @returns {"isSuccess":是否更新成功,"remain":当前种子剩余数量}
		 */
		updateSeedNums(seedId:number):Object
		{
			if(! seedId || this.seedVOArr.length==0)
				return;

			let resultObj:Object = {};
			let isSuccess:boolean = false;
			let remain:number = 0;
			let i:number;
			let len:number = this.seedVOArr.length;
			let seedVO:models.base.SeedVO;
			for(i=0; i<len; i++)
			{
				seedVO = this.seedVOArr[i];
				if(seedId == seedVO.id)
				{
					if(seedVO.seedNums>0)
					{
						seedVO.seedNums--;
						isSuccess = true;
						remain = seedVO.seedNums;
					}
					break;
				}
			}
			resultObj["isSuccess"] = isSuccess;
			resultObj["remain"] = remain;
			return resultObj;
		}

		/** 请求背包道具数据 */
		request_getBagProp():void
		{
			HttpServiceProxy.request("getBagProp",null,this.getBagPropOverFn);
		}

		private getBagPropOverFn(receiveData:any, takeData?:any):void
		{
			if(receiveData)
				this.receiveData = receiveData;
			if(takeData)
				this.takeData = takeData;

			let tempArr:Array<Object> = receiveData["_d"];
			let tempArrLen:number = tempArr.length;
			let i:number;
			let toolVO:models.base.ToolVO;
			let tempObj:Object;
			BagModel.instance.toolVOArr.splice(0,BagModel.instance.toolVOArr.length);
			for(i=0; i<tempArrLen; i++)
			{
				tempObj = tempArr[i];
				toolVO = new models.base.ToolVO();
				toolVO.id = tempObj["ti"];
				toolVO.name = tempObj["tn"];
				toolVO.nums = tempObj["tc"];
				// ============ 此处已将原swf暂换成了 png 图片 =============
				let iconUrl:string = tempObj["timg"];
				iconUrl = iconUrl.substring(0,iconUrl.lastIndexOf("."));
				toolVO.icon = iconUrl + ".png";	// tempObj["timg"];
				toolVO.des = tempObj["d"];
				toolVO.type = tempObj["ty"];
				toolVO.lvl = tempObj["l"];

				if(tempObj["ti"] == 1)
					toolVO.helpTime = 1;
				else if(tempObj["ti"] == 2)
					toolVO.helpTime = 2.5;

				BagModel.instance.toolVOArr.push(toolVO);
			}

			if(BagModel.callback)
			{
				if(this.takeData)
					BagModel.callback(takeData);
				else
					BagModel.callback();
			}
		}


	}
}