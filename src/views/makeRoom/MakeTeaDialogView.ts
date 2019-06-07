namespace views.makeRoom
{
	import Event = laya.events.Event;
	import Image = laya.ui.Image;
	import Box = laya.ui.Box;
	import SeedVO = models.base.SeedVO;
	import ToolVO = models.base.ToolVO;
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
	import MakeTeaDialogCtrl=controllers.makeRoom.MakeTeaDialogCtrl;
	import MakeTeaDialogModel=models.makeRoom.MakeTeaDialogModel;
	import PotGridView=views.friedRoom.pot.PotGridView;
	import FriedDialogGridLeftUI = ui.gameUI.pot.FriedDialogGridLeftUI;
	import PlayerInfoModel = models.player.PlayerInfoModel;

	/**
	 * 泡茶面板
	 */
	export class MakeTeaDialogView extends ui.gameUI.makeTea.MakeTeaDialogUI
	{
		/**
		 * Dialog底部边框
		 */
		bgUI:BaseBorderUI;
		/** 当前选中的 Tab 选项卡的名称 */
		curSelectedTabName:string;
		/** 左侧 Tab 栏的所有项 */
		tabArr:Box[] = [this.tab1,this.tab2,this.tab3,this.tab4,this.tab5,this.tab6,this.tab7,this.tab8,this.tab9];
		/** 用水图片资源数据 */
		waterImgArr:Array<string>=["tabWater","greenWater","redWater"];
		/** 提示框 */
		tipView:ui.gameUI.tips.ConfirmCancelTipUI;
		/** 茶具图片资源数据 */
		teaSetImgArr:Array<string>=["reaWare","glass","ceramic"];
		/** 茶叶品级名称数组 */
		teaNameArr:Array<string>=["三品","二品","一品","精品","极品","贡品"];
		/** 水源名称数组 */
		waterNameArr:Array<string>=["自来水","天然矿泉水","纯净水"];
		/** 茶具名称数据 */
		teaSetNameArr:Array<string>=["紫砂茶具","玻璃茶具","白瓷茶具"];
		/** 当前水源角标\id */
		static curWaterindex:number=0;
		static waterId:number;
		static buyWaterMoney:number;
		static buyWaterNums:number;
		/** 当前茶叶角标 */
		static curTeaIndex:number=0;
		/** 当前茶具角标 */
		static curTeaSetIndex:number=0;
		static teaSetId:number;
		/** 是否使用玄天符 */
		static useTool:number;
		/** 类型前缀 */
		private imgPath:string = "gameUI/makeTea/";
		/** 类型后缀 */
		private imgSuffix:string = ".png";
		/** 图片路径 */
		private path:string="http://kaixin.maimaicha.com/static/";
		/** 泡茶的总量 */
		yieldNums:number=0;
		/** 用于播放swf动画的对象 */
		mc:Laya.MovieClip;
		/** 存放茶叶具体名称的 Tab */
		gridItemsArr:FriedDialogGridLeftUI[];
		/** 与 gridItemsArr 配合使用，默认为8） */
		gridItemIndex:number = 8;
		/** 确认泡茶后的回调 */
		static callback:Function;
		cb:Laya.CheckBox;

		constructor()
		{
			super();
			this.dragArea = `0,0,${this.width},60`;
			this.mc=new Laya.MovieClip();
			this.teaNums.restrict = "0-9";
			this.teaNums.text="1" //默认是1

			////////// =>
			this.bgUI = new BaseBorderUI();
			this.bgUI.bgImg.size(768,490);
			this.bgUI.size(768,490);
			this.bgUI.addChild(this);
			this.y = 25;

			this.bgUI.titleImg.skin = "gameUI/common/icon/makeTeaName.png";
			this.bgUI.titleImg.x = this.width-this.bgUI.titleImg.width>>1;
			this.bgUI.titleImg.y += 3;

			this.mouseThrough = true; // 解除closeBtn事件屏蔽
			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (768-600)/600;
			let hRate:number = (490-400)/400;
			this.bgUI.closeBtn.x += this.bgUI.closeBtn.x*wRate;
			this.bgUI.closeBtn.y += this.bgUI.closeBtn.y*hRate;
			this.bgUI.closeBtn.scale(1.5,1.5);
			this.bgUI.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
			////////// <=

			this.gridItemsArr = [];
			this.tipView=new ui.gameUI.tips.ConfirmCancelTipUI;
			this.selectTab(this.tab1);
			this.cb=this.createCheckBox();
            for(let i:number=1;i<10;i++){
                (this.getChildByName("tab"+i) as Laya.Box).on(Event.CLICK,this,this.setStatus);
            }
			this.numBtn_add.on(Event.CLICK,this,this.addOneBtnFn);
			this.numBtn_sub.on(Event.CLICK,this,this.reduceOneBtnFn);
			this.sub1.on(Event.CLICK,this,this.reduceTea);
			this.add1.on(Event.CLICK,this,this.addTea);
			this.sub2.on(Event.CLICK,this,this.reduceWater);
			this.add2.on(Event.CLICK,this,this.addWater);
			this.sub3.on(Event.CLICK,this,this.reduceTeaSet);
			this.add3.on(Event.CLICK,this,this.addTeaSet);
			this.btn_buy1.on(Event.CLICK,this,this.buyTeaLeaf);  //MakeTeaDialogView.prototype
			this.btn_buy2.on(Event.CLICK,this,this.buyWater);
			this.btn_buy3.on(Event.CLICK,this,this.buyXTFTip);
			this.btn_direction_top.on(Event.CLICK,this,this.direction_top);
			this.btn_direction_down.on(Event.CLICK,this,this.direction_down);
			this.btn_affirm.on(Event.CLICK,this,this.startMakeTea);
			// this.btn_close.on(Event.CLICK,this,this.closeBtnFn);
			this.btn_cancel.on(Event.CLICK,this,this.closeBtnFn);
			this.teaNums.on(Event.INPUT,this,this.saleNumsInputOverFn);
			this.teaNums.on(Event.BLUR,this,this.saleNumsInputOverFn);
			this.cb.on(Event.CLICK,this,this.selectXTF,[this.cb]);
			let test1:number=parseInt(this.lock1.text);
			let test2:number=parseInt(this.lock2.text);
			if (test1<0||test2<0) {
				this.btn_affirm.disabled=true;
			}else{
				this.btn_affirm.disabled=false;
			}
		}

		/**将原素材的 swf 格式转换成 png 格式 */
		translateSwfTypeToPngType(swfUrl:string):string
		{
			let pngUrl:string;
			if(!swfUrl)
				return null;

			pngUrl = swfUrl.substring(0,swfUrl.lastIndexOf("."));
			pngUrl += ".png";
			return pngUrl;
		}

		/** 点击玄天符复选框后的事件 */
		selectXTF(cb:Laya.CheckBox):void
		{
			if(cb.selected==true){
				MakeTeaDialogView.useTool=1;
				if(MakeTeaDialogModel.waterVOArr[3].symbolNums<=0){
					this.buyXTFTip();
				}else{
					this.teaNums.text=100+"";
					this.yieldNums = parseInt(this.teaNums.text);
					this.initNumsData(this.yieldNums);
				}
			}else{
				MakeTeaDialogView.useTool=0;
				this.teaNums.text=10+"";
				this.yieldNums = parseInt(this.teaNums.text);
				this.initNumsData(this.yieldNums);
			}
		}
		/** 向左切换茶叶种类 */
		reduceTea():void
		{
			let len:number=this.teaNameArr.length;
			MakeTeaDialogView.curTeaIndex--;
			if(MakeTeaDialogView.curTeaIndex<0){
				MakeTeaDialogView.curTeaIndex=len-1;
				this.data1Name.text=this.teaNameArr[MakeTeaDialogView.curTeaIndex];
			}else{
				this.data1Name.text=this.teaNameArr[MakeTeaDialogView.curTeaIndex];
			}
			this.initTeaId();
			this.initTeaLockNums(parseInt(this.teaNums.text));
			this.getCurMakeTeaScore();
		}
		/** 向右切换茶叶种类 */
		addTea():void
		{
			let len:number=this.teaNameArr.length;
			MakeTeaDialogView.curTeaIndex++;
			let nums:number=MakeTeaDialogView.curTeaIndex;
			this.data1Name.text=this.teaNameArr[MakeTeaDialogView.curTeaIndex];
			if(nums==len){
				MakeTeaDialogView.curTeaIndex=0;
				this.data1Name.text=this.teaNameArr[MakeTeaDialogView.curTeaIndex];
			}
			this.initTeaId();
			this.initTeaLockNums(parseInt(this.teaNums.text));
			this.getCurMakeTeaScore();
		}
		/** 向左切换水源种类 */
		reduceWater():void
		{
			let len:number=this.waterNameArr.length;
			MakeTeaDialogView.curWaterindex--;
			if(MakeTeaDialogView.curWaterindex<0){
				MakeTeaDialogView.curWaterindex=len-1;
				this.data2.skin=this.imgPath+this.waterImgArr[MakeTeaDialogView.curWaterindex]+this.imgSuffix;
				this.data2Name.text=this.waterNameArr[MakeTeaDialogView.curWaterindex];
			}else{
				this.data2.skin=this.imgPath+this.waterImgArr[MakeTeaDialogView.curWaterindex]+this.imgSuffix;
				this.data2Name.text=this.waterNameArr[MakeTeaDialogView.curWaterindex];
			}
			this.initWaterId();
			this.initWaterLockNums(parseInt(this.teaNums.text));
			this.getCurMakeTeaScore();
		}
		/** 向右切换水源种类 */
		addWater():void
		{
			let len:number=this.waterNameArr.length;
			MakeTeaDialogView.curWaterindex++;
			let nums:number=MakeTeaDialogView.curWaterindex;
			this.data2.skin=this.imgPath+this.waterImgArr[MakeTeaDialogView.curWaterindex]+this.imgSuffix;
			this.data2Name.text=this.waterNameArr[MakeTeaDialogView.curWaterindex];
			if(nums==len){
				MakeTeaDialogView.curWaterindex=0;
				this.data2.skin=this.imgPath+this.waterImgArr[MakeTeaDialogView.curWaterindex]+this.imgSuffix;
				this.data2Name.text=this.waterNameArr[MakeTeaDialogView.curWaterindex];
			}
			this.initWaterId();
			this.initWaterLockNums(parseInt(this.teaNums.text));
			this.getCurMakeTeaScore();
		}
		/** 向左切换茶具种类 */
		reduceTeaSet():void
		{
			let len:number=this.teaSetNameArr.length;
			MakeTeaDialogView.curTeaSetIndex--;
			if(MakeTeaDialogView.curTeaSetIndex<0){
				MakeTeaDialogView.curTeaSetIndex=len-1;
				this.data3.skin=this.imgPath+this.teaSetImgArr[MakeTeaDialogView.curTeaSetIndex]+this.imgSuffix;
				this.data3Name.text=this.teaSetNameArr[MakeTeaDialogView.curTeaSetIndex];
			}else{
				this.data3.skin=this.imgPath+this.teaSetImgArr[MakeTeaDialogView.curTeaSetIndex]+this.imgSuffix;
				this.data3Name.text=this.teaSetNameArr[MakeTeaDialogView.curTeaSetIndex];
			}
			this.initTeaSetId();
			this.getCurMakeTeaScore();
		}
		/** 向右切换茶具种类 */
		addTeaSet():void
		{
			let len:number=this.teaSetNameArr.length;
			MakeTeaDialogView.curTeaSetIndex++;
			let nums:number=MakeTeaDialogView.curTeaSetIndex;
			this.data3.skin=this.imgPath+this.teaSetImgArr[MakeTeaDialogView.curTeaSetIndex]+this.imgSuffix;
			this.data3Name.text=this.teaSetNameArr[MakeTeaDialogView.curTeaSetIndex];
			if(nums==len){
				MakeTeaDialogView.curTeaSetIndex=0;
				this.data3.skin=this.imgPath+this.teaSetImgArr[MakeTeaDialogView.curTeaSetIndex]+this.imgSuffix;
				this.data3Name.text=this.teaSetNameArr[MakeTeaDialogView.curTeaSetIndex];
			}
			this.initTeaSetId();
			this.getCurMakeTeaScore();
		}
		/** 创建一个checkBox组件 */
		createCheckBox():Laya.CheckBox
		{
			let cbSkin:string=this.imgPath+"checkbox"+this.imgSuffix;
			let cb:Laya.CheckBox=new Laya.CheckBox(cbSkin);
			this.addChild(cb);
			cb.pos(445,239);
			cb.label="选用";
			cb.labelSize=13;
			cb.size(16,16);
			cb.selected=false;
			return cb;
		}

		/** 左侧选项卡的状态切换 */
		setStatus(event:Event):void{
			let i:number;
			let len:number=this.tabArr.length;
			let tempBox:Laya.Box;
			this.curSelectedTabName=event.target.name;
			let eventBox:Laya.Box=this.getChildByName(this.curSelectedTabName) as Laya.Box;
			for(i=0;i<len;i++){
				tempBox=this.tabArr[i];
				if(eventBox==tempBox)
					this.selectTab(eventBox);
				else
					this.unSelectTab(tempBox);
			}
			this.addStorageGrids([]);
		}
		selectTab(tab:Box):void
		{
			(tab.getChildByName("whiteBg") as Laya.Image).visible = true;
			(tab.getChildByName("grayBg") as Laya.Image).visible = false;
		}

		unSelectTab(tab:Box):void
		{
			(tab.getChildByName("whiteBg") as Laya.Image).visible = false;
			(tab.getChildByName("grayBg") as Laya.Image).visible = true;
		}

		private itemClked(event:Event):void
		{
			let gridItem:FriedDialogGridLeftUI;
			let childNums:number = this.gridContainer.numChildren;
			let i:number;
			this.resetCurId();
			for (i=0; i<childNums; i++)
			{
				gridItem = this.gridContainer.getChildAt(i) as FriedDialogGridLeftUI;
				if(!gridItem)
					continue;
				gridItem.check.visible = false;
			}
			(event.target.getChildByName("check") as Laya.Image).visible=true;
		}

		/** 填充茶叶种类格子（茶叶） */
		addStorageGrids(voArr:Array<any>):void
		{
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
			if(!voArr || !voArr.length)
				return;

			this.initShowTea(voArr);
		}

		/** 点击左侧茶叶种类Tab后填充其下茶子项 */
		initShowTea(voArr:Array<any>):void
		{
			let len:number = voArr.length;
			let i:number;
			let seedVO:SeedVO;
			this.gridItemsArr = [];
			this.gridItemIndex=8;
			this.resetCurId();
			for(i=0; i<len; i++)
			{
				seedVO = voArr[i];
				let gridItem:FriedDialogGridLeftUI = new FriedDialogGridLeftUI();
				gridItem.check.visible=false;
				gridItem.name = (i+1)+"";
				gridItem.teaName.text=seedVO.Teaname+"";
				gridItem.y=i*(gridItem.height+5);
				// 请求第一个茶叶的详细信息
				if(i==0)
				{
					gridItem.check.visible=true;
					MakeTeaDialogCtrl.getInstance().itemClkedFn(seedVO);
				}

				// 最多显示8小项
				if(i <= 7)
					this.gridContainer.addChild(gridItem);
				this.gridItemsArr.push(gridItem);

				// 点击每一项请求获取详细信息
				gridItem.on(Event.CLICK,this,this.itemClked);
				gridItem.on(Event.CLICK,this,this.gridItemClked,[seedVO]);
			}
		}

		private gridItemClked(seedVO:SeedVO):void
		{
			if(!seedVO)
				return;
			MakeTeaDialogCtrl.getInstance().itemClkedFn(seedVO);

		}

		/** 加载右侧茶叶详细信息介绍 */
		updateRightContent(voShowArr:Array<any>):void
		{
			if(!voShowArr || !voShowArr.length)
				return;

			let len:number = voShowArr.length;
			let i:number;
			let teaShowVO:SeedVO;
			let tealeafObjArr:Object[] =  ResourceManager.tealeafObjArr;
			let tempObj:Object;
			let len2:number = tealeafObjArr.length;
			let teaId:number=voShowArr[0].id;
			for(i=0; i<len2; i++)
			{
				tempObj = tealeafObjArr[i];
				if(teaId == parseInt(tempObj["id"]))
				{
					let newPath:string=HttpConfig.serverResUrl+tempObj["res"];
					this.data1.skin=this.translateSwfTypeToPngType(newPath);
					break;
				}
			}
			for(i=0; i<len; i++)
			{
				teaShowVO = voShowArr[i];
				this.teaName_top.text=teaShowVO.Teaname;
				this.iconImg.skin=this.translateSwfTypeToPngType(teaShowVO.teaIcon);
				this.cb.selected=false;
				this.teaSet.text=teaShowVO.teaSet;
				this.water.text=teaShowVO.water;
				this.remtemp.text=teaShowVO.remtemp;
				this.optimal.text=teaShowVO.optimal;
				this.need1.text=parseInt(this.teaNums.text)*3+"";
				this.need2.text=this.teaNums.text;
				this.data1Name.text=this.teaNameArr[MakeTeaDialogView.curTeaIndex];
				this.data2Name.text=this.waterNameArr[MakeTeaDialogView.curWaterindex];
				this.data3Name.text=this.teaSetNameArr[MakeTeaDialogView.curTeaSetIndex];
				this.data2.skin=this.imgPath+this.waterImgArr[0]+this.imgSuffix;
				this.data3.skin=this.imgPath+this.teaSetImgArr[0]+this.imgSuffix;
				// 获取泡茶所需茶叶材料
				MakeTeaDialogCtrl.getInstance().itemClkedMaterial(teaShowVO.id);
			}
		}

		/** 加载泡茶所需茶叶信息 */
		loadMakeTeaSecret(teaDataArr:Array<any>):void
		{
			let teaNums:number=parseInt(this.teaNums.text);
			this.initTeaLockNums(teaNums);
			// 获取泡茶所需水源材料
			MakeTeaDialogCtrl.getInstance().itemClkedWater();
		}

		/** 加载泡茶所需用水资源 */
		loadWaterData(waterArr:Array<any>):void
		{
			if(!waterArr){
				return;
			}
			this.initWaterLockNums(parseInt(this.teaNums.text));
			// 获取泡茶所需茶具材料
			MakeTeaDialogCtrl.getInstance().itemClkedTeaSet();
		}

		/**加载当前泡茶组合分数 */
		loadScore(score:number):void
		{
			this.curTeam.text=score+"分";
		}

		/** 输入框输入后 */
		private saleNumsInputOverFn(event:Event):void
		{
			if(parseInt(this.teaNums.text) > 10)
				this.yieldNums = 10;
			else if(parseInt(this.teaNums.text) < 1)
				this.yieldNums = 1;
			else
				this.yieldNums = parseInt(this.teaNums.text);
			this.initNumsData(this.yieldNums);
		}

		/** 泡茶数量+1 */
		private addOneBtnFn(event:Event):void
		{
			let yieldNums:number=parseInt(this.teaNums.text);
			if(isNaN(yieldNums)){
				yieldNums=0;
				yieldNums++;
				// 泡茶总数
				this.teaNums.text = yieldNums+"";
				// 茶叶需要数量
				this.need1.text =yieldNums*3+"";
				// 茶水需要数量
				this.need2.text=yieldNums+"";
				this.initTeaLockNums(yieldNums);
				this.initWaterLockNums(yieldNums);
			}else{
				if(yieldNums > 10)
					return;
				yieldNums++;
				// 泡茶总数
				this.teaNums.text = yieldNums+"";
				// 茶叶需要数量
				this.need1.text =yieldNums*3+"";
				// 茶水需要数量
				this.need2.text=yieldNums+"";
				this.initWaterLockNums(yieldNums);
				this.initTeaLockNums(yieldNums);
			}
		}

		/** 泡茶数量-1 */
		private reduceOneBtnFn(event:Event):void
		{
			let yieldNums:number=parseInt(this.teaNums.text);
			if(isNaN(yieldNums)){
				yieldNums=2;
				yieldNums--;
				// 泡茶总数
				this.teaNums.text = yieldNums+"";
				// 茶叶需要数量
				this.need1.text=yieldNums*3+"";
				// 茶水需要数量
				this.need2.text=yieldNums+"";
				this.initTeaLockNums(yieldNums);
				this.initWaterLockNums(yieldNums);
			}else{
				if(yieldNums==1)
					return;
				yieldNums--;
				// 泡茶总数
				this.teaNums.text = yieldNums+"";
				// 茶叶需要数量
				this.need1.text=yieldNums*3+"";
				// 茶水需要数量
				this.need2.text=yieldNums+"";
				this.initWaterLockNums(yieldNums);
				this.initTeaLockNums(yieldNums);
			}
		}

		/** 上一个茶叶 Tab */
		direction_top():void
		{
			if(this.gridItemsArr.length <= this.gridItemIndex)
				return;
			if(this.gridItemIndex <= 8)
				return;
			this.gridContainer.removeChildByName(this.gridItemIndex+"") as View;
			this.gridItemIndex--;

			let downNums:number = this.gridItemIndex-8;
			let i:number;
			for(i=downNums+2; i<=downNums+8; i++)
			{
				(this.gridContainer.getChildByName(i+"") as View).y += 42;
			}
			let curGrid:FriedDialogGridLeftUI = this.gridItemsArr[downNums];
			curGrid.name = (downNums+1)+"";
			curGrid.y = 0;
			this.gridContainer.addChild(curGrid);
		}

		/** 下一个茶叶 Tab */
		direction_down():void
		{
			if(this.gridItemsArr.length <= this.gridItemIndex)
				return;
			this.gridItemIndex++;

			let upNums:number = this.gridItemIndex-8;
			let i:number;
			for(i=1; i<=upNums; i++)
			{
				this.gridContainer.removeChildByName(i+"");
			}
			for(i=upNums+1; i<=upNums+7; i++)
			{
				(this.gridContainer.getChildByName(i+"") as View).y -= 42;
			}

			let curGrid:FriedDialogGridLeftUI = this.gridItemsArr[this.gridItemIndex-1];
			curGrid.name = this.gridItemIndex+"";
			curGrid.y = 294;
			this.gridContainer.addChild(curGrid);
		}

		/** 初始化材料的数量 */
		initNumsData(yieldNums:number):void
		{
			if(isNaN(yieldNums)){
				yieldNums=1;
				// 茶叶需要数量
				this.need1.text =yieldNums*3+"";
				// 茶水需要数量
				this.need2.text=yieldNums+"";
				this.initTeaLockNums(yieldNums);
				this.initWaterLockNums(yieldNums);
			}else{
				//泡茶总量
				this.teaNums.text=yieldNums+"";
				// 茶叶需要数量
				this.need1.text = yieldNums*3+"";
				// 茶水需要数量
				this.need2.text=yieldNums+"";
				this.initTeaLockNums(yieldNums);
				this.initWaterLockNums(yieldNums);
			}
		}
		/** 初始化泡茶用水缺少的数量 */
		initWaterLockNums(teaNums:number):void
		{
			this.tipView.visible=false;
			let i:number;
			let len:number=MakeTeaDialogModel.waterVOArr.length;
			let waterVO:models.base.SeedVO;
			waterVO=MakeTeaDialogModel.waterVOArr[MakeTeaDialogView.curWaterindex];
			if(waterVO.waterNums-teaNums>=0){
				this.lock2.text=0+"";
				this.btn_buy2.visible=false;
				this.btn_buy2.mouseEnabled=false;
			}else{
				let lockTeaNums:number=parseInt(this.lock1.text);
				let lock2Nums:number=Math.abs(waterVO.waterNums-teaNums);
				this.lock2.text=lock2Nums+"";
				this.btn_buy2.visible=true;
				this.btn_buy2.mouseEnabled=true;
				if(lockTeaNums<=0){
					this.note.text="泡茶所需要的水不足";
				}
			}
		}

		/** 初始化泡茶材料中茶叶的缺少数量 */
		initTeaLockNums(teaNums:number):void
		{
			this.tipView.visible=false;
			let status:string;  //茶叶数据中茶叶的标识（1：三品；2：二品；3：一品；4：精品；5：极品；6：贡品）
			if(MakeTeaDialogModel.dataShowVOArr.length<=0){
				this.lock1.text=teaNums*3+"";
				this.note.text="当前材料不足，请凑齐以后再来";
				this.initBtnBuy1Status();
			}else{
				this.note.text = "";
				status=(MakeTeaDialogView.curTeaIndex+1).toString();
				this.initLockTeaStatus(status,teaNums);
			}
		}

		initLockTeaStatus(status:string,teaNums:number):void
		{
			let teaObj:Object=MakeTeaDialogModel.dataShowVOArr[0];
			let key:string=status;
			if(teaObj.hasOwnProperty(key)){
					let lockNums:number=teaObj[key]-teaNums*3;
					if(lockNums>=0){
						this.lock1.text=0+"";
						this.btn_buy1.visible=false;
						this.btn_buy1.mouseEnabled=false;
						this.btn_affirm.disabled = false;
					}else{
						this.btn_affirm.disabled = true;
						this.lock1.text=Math.abs(lockNums)+"";
						this.note.text="当前材料不足，请凑齐以后再来";
						this.initBtnBuy1Status();
					}
			}else{
				this.btn_affirm.disabled = true;
				this.lock1.text=teaNums*3+"";
				this.note.text="当前材料不足，请凑齐以后再来";
				this.initBtnBuy1Status();
			}
		}

		initBtnBuy1Status():void
		{
			if(MakeTeaDialogView.curTeaIndex==0){
				this.btn_buy1.visible=true;
				this.btn_buy1.mouseEnabled=true;
			}else{
				this.btn_buy1.visible=false;
				this.btn_buy1.mouseEnabled=false;
			}
		}

		/** 获取当前泡茶组合的得分 */
		getCurMakeTeaScore():void
		{
			let i:number;
			let len:number=MakeTeaDialogModel.teaShowVOArr.length;
			let seedVO:SeedVO;
			for (i=0;i<len;i++) {
				seedVO=MakeTeaDialogModel.teaShowVOArr[i];
				MakeTeaDialogCtrl.getInstance().itemClkedScore(seedVO.id,MakeTeaDialogModel.waterVOArr[MakeTeaDialogView.curWaterindex].waterId,MakeTeaDialogModel.teaSetVOArr[MakeTeaDialogView.curTeaSetIndex].teaSetId); //55001,56001
				break;
			}
		}
		/** 初始化当前茶叶材料Id */
		initTeaId():void
		{
			switch (this.data1Name.text) {
				case "三品":
						MakeTeaDialogView.curTeaIndex=0;
					break;
				case "二品":
						MakeTeaDialogView.curTeaIndex=1;
					break;
				case "一品":
						MakeTeaDialogView.curTeaIndex=2;
					break;
				case "精品":
						MakeTeaDialogView.curTeaIndex=3;
					break;
				case "极品":
						MakeTeaDialogView.curTeaIndex=4;
					break;
				case "贡品":
						MakeTeaDialogView.curTeaIndex=5;
					break;
			}
		}
		/** 初始化当前水源材料Id */
		initWaterId():void
		{
			MakeTeaDialogView.buyWaterNums=parseInt(this.lock2.text);
			switch(this.data2Name.text){
				case "自来水":
					MakeTeaDialogView.curWaterindex=0;
					MakeTeaDialogView.waterId=55001;
					MakeTeaDialogView.buyWaterMoney=MakeTeaDialogView.buyWaterNums*10;
				break;
				case "天然矿泉水":
					MakeTeaDialogView.curWaterindex=1;
					MakeTeaDialogView.waterId=55002;
					MakeTeaDialogView.buyWaterMoney=MakeTeaDialogView.buyWaterNums*30;
				break;
				case "纯净水":
					MakeTeaDialogView.curWaterindex=2;
					MakeTeaDialogView.waterId=55003;
					MakeTeaDialogView.buyWaterMoney=MakeTeaDialogView.buyWaterNums*40;
				break;
			}
		}
		/** 初始化当前材料Id */
		initTeaSetId():void
		{
			switch(this.data3Name.text){
				case "紫砂茶具":
					MakeTeaDialogView.curTeaSetIndex=0;
					MakeTeaDialogView.teaSetId=56001;
				break;
				case "玻璃茶具":
					MakeTeaDialogView.curTeaSetIndex=1;
					MakeTeaDialogView.teaSetId=56002;
				break;
				case "白瓷茶具":
					MakeTeaDialogView.curTeaSetIndex=2;
					MakeTeaDialogView.teaSetId=56003;
				break;
			}
		}
		/** 重置当前所选材料ID */
		resetCurId():void
		{
			this.teaNums.text=1+"";
			MakeTeaDialogView.curTeaIndex=0;
			MakeTeaDialogView.curWaterindex=0;
			MakeTeaDialogView.curTeaSetIndex=0;
		}

		/** 初始化当前玄天符状态 */
		initXTFStatus(waterArr:Array<any>):void
		{
			this.tipView.visible=false;
			let waterVO:models.base.SeedVO;
			waterVO=waterArr[3];
			if(waterVO.symbolNums>0){
				this.symbom.text="";
				this.cb.selected=true;
				this.teaNums.text=100+"";
				this.teaNums.restrict = "1-100";
				this.yieldNums = parseInt(this.teaNums.text);
				this.initNumsData(this.yieldNums);
			}else{
				this.cb.selected=false;
				this.symbom.text="无此道具";
			}
		}

		/** 初始化弹出框 */
		initTipView():void
		{
			this.tipView.visible=true;
			this.addChild(this.tipView);
			this.tipView.x = configs.GameConfig.GAME_WINDOW_WIDTH-this.tipView.width>>1;
			this.tipView.y = configs.GameConfig.GAME_WINDOW_HEIGHT-this.tipView.height>>1;
			this.tipView.closeBtn.on(Event.CLICK,this,this.cancleBtnFn);
			this.tipView.cancelBtn.on(Event.CLICK,this,this.cancleBtnFn);
		}

		/** 购买玄天符页面 */
		buyXTFTip():void
		{
			this.tipView.contentTxt.text="你确定要花费20钻石购买1挂玄天符吗？";
			this.initTipView();
			this.tipView.confirmBtn.on(Event.CLICK,this,function():void{
				let curSelectedName:string="confirmBtn";
				let diffNums:number=PlayerInfoModel.playerInfo.diamond-20;
				if(diffNums>=0){
					MakeTeaDialogCtrl.getInstance().getBuyXTF("water",55100,1);
				}else{
					// this.btn_buy3.disabled=true;
					TipLayerManager.tipLayer.showDrawBgTip("你的钻石不够，请充值！");
					this.tipView.removeSelf();
				}
			});
		}

		/** 购买单一茶叶 */
		buyTeaLeaf():void
		{
			let tealeafObjArr:Object[] =  ResourceManager.tealeafObjArr;
			let i:number;
			let len:number = tealeafObjArr.length;
			let tempObj:Object;
			let teaId:number=MakeTeaDialogModel.teaShowVOArr[0].id;
			let teaName:string=MakeTeaDialogModel.teaShowVOArr[0].Teaname;
			let lockNums:number=parseInt(this.lock1.text);
			let singleNums:number;
			for (i= 0;i<len;i++) {
				tempObj = tealeafObjArr[i];
				if(teaId==parseInt(tempObj["id"])){
					singleNums = parseInt(tempObj["yb"]);
					let needMoney:number=Math.ceil(lockNums/singleNums);
					let buyNums:number=needMoney*singleNums;
					this.tipView.contentTxt.text="你确定要花费"+needMoney+"钻石购买"+buyNums+"份"+teaName+"吗？";
					this.initTipView();
					this.tipView.confirmBtn.on(Event.CLICK,this,function():void{
						let differNums:number=PlayerInfoModel.playerInfo.diamond-needMoney;
						let curSelectedName:string="confirmBtn";
						if(differNums>=0){
							MakeTeaDialogCtrl.getInstance().getBuyLeaf("leaf",teaId,needMoney,buyNums);
						}else{
							TipLayerManager.tipLayer.showDrawBgTip("你的钻石不够，请充值！");
							this.tipView.removeSelf();
						}

					});
				}
			}
		}

		/** 购买单一水源 */
		buyWater():void
		{
			let differMoney:number;
			this.initTipView();
			this.initWaterId();
			this.tipView.contentTxt.text="你确定要花费"+MakeTeaDialogView.buyWaterMoney+"金币购买"+MakeTeaDialogView.buyWaterNums+"桶"+this.data2Name.text+"吗？";
			this.tipView.confirmBtn.on(Event.CLICK,this,function():void{
				differMoney=PlayerInfoModel.playerInfo.money-MakeTeaDialogView.buyWaterMoney;
				if(differMoney>=0){
					MakeTeaDialogCtrl.getInstance().getBuyWater("water",MakeTeaDialogView.waterId,MakeTeaDialogView.buyWaterNums);
				}else{
					TipLayerManager.tipLayer.showDrawBgTip("你的金币不够，抓紧去赚些金币吧！");
					this.tipView.removeSelf();
				}
		    });
		}

		/** 开始烧水 */
		startMakeTea():void{
			this.initWaterId();
			this.initTeaSetId();
			if(this.cb.selected==true)
				MakeTeaDialogView.useTool=1;
			else
				MakeTeaDialogView.useTool=0;
			let lockTeaNums:number=parseInt(this.lock1.text);
			let lockWaterNums:number=parseInt(this.lock2.text);
			if (lockTeaNums<0||lockWaterNums<0) {
				this.btn_affirm.disabled=true;
			}else{
				let teaId:number=MakeTeaDialogModel.teaShowVOArr[0].id;  //茶叶索引
				let teaLvl:string=(MakeTeaDialogView.curTeaIndex+1).toString(); //茶叶品质
				let waterId:number=MakeTeaDialogView.waterId; //水源索引
				let teaSetId:number=MakeTeaDialogView.teaSetId; //茶具索引
				let makeTeaNums:number=parseInt(this.teaNums.text);  //泡茶分数
				let useToolFn:number=MakeTeaDialogView.useTool;  //是否使用道具
				console.log("烧水需要的参数：茶叶的索引："+teaId+"；茶叶品质："+teaLvl+"；水的索引："+waterId+"；茶具索引："+teaSetId+"；炒茶的数量："+makeTeaNums+"；是否使用茶具："+useToolFn);
				MakeTeaDialogCtrl.getInstance().friedWater(teaId,teaLvl,waterId,teaSetId,makeTeaNums,useToolFn);
				this.closeBtnFn();
			}
		}
		/** 取消购买 */
		cancleBtnFn():void
		{
			if(MakeTeaDialogModel.waterVOArr[3].symbolNums>0)
				this.cb.selected=true;
			else
				this.cb.selected=false;

            this.tipView.visible=false;
        }

		closeBtnFn():void
		{
			this.resetCurId();
			this.bgUI.removeSelf();
		}
	}
}