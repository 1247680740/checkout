namespace views.makeRoom
{
	import BaseView = views.base.BaseView;
	import MakeTeaDialogCtrl = controllers.makeRoom.MakeTeaDialogCtrl;
	import MakeTeaHomeModel = models.makeRoom.MakeTeaHomeModel;
	import MakeTeaDialogModel = models.makeRoom.MakeTeaDialogModel;
	import Animation = laya.display.Animation;
	import MovieClip = laya.ani.swf.MovieClip;
	import Point = laya.maths.Point;

	/**
	 * 泡茶室场景
	 */
	export class MakeTeaHomeLayer extends BaseView
	{
		private bgUrl: string = "res/gameAssets/imgs/";
        // 地图尺寸：1000*600,分成4*3的尺寸为250*200的小图
        /**
         * 小地图块宽
         */
        private pieceW:number = 250;
        /**
         * 小地图块高
         */
		private pieceH:number = 200;

		/**
		* 妹妹图集
		*/
		sisterUrlArr: Array<string>;
		/**
		 * 姐姐图集
		 */
		elderSisterUrlArr: Array<string>;
		/**
		 * 烧水图集
		 */
		heatUpWaterArr: Array<string>;
		/**
		 * 水烧好
		 */
		waterBoilingArr: Array<string>;
		/**
		 * 倒水
		 */
		pourWaterArr: Array<string>;
		/**
		 * 倒水完毕
		 */
		pourWaterOverArr: Array<string>;
		/**
		 * 倒废水
		 */
		pourWasteWaterArr: Array<string>;
		/**
		 * 点我泡茶 按钮
		 */
		makeTeaBtnArr: Array<string>;
		/**
		 * 泡茶
		 */
		makeTeaArr: Array<string>;
		/**
		 * 泡茶完成
		 */
		makeTeaOverArr: Array<string>;
		/**
		 * 玻璃壶（现已改，图待筛选处理）
		 */
		glassPotArr: Array<string>;
		/**
		 * 玻璃杯
		 */
		glassCupArr: Array<string>;
		/**
		 * 紫砂壶（换成swf动画）
		 */
		redPotArr: Array<string>;
		/**
		 * 紫砂杯（换成swf动画）
		*/
		redCupArr: Array<string>;
		/**
		 * 白瓷壶
		 */
		redFlowerPotArr: Array<string>;
		/**
		 * 白瓷杯
		 */
		redFlowerCupArr: Array<string>;
		/**
		 * 温度计
		 */
		tempArr: Array<string>;

		SISTER: string = "sister";
		ELDERS_SISTER: string = "eldersSister";
		HEAT_UP_WATER: string = "heatUP";
		WATER_BOILING: string = "waterBoiling";
		POUR_WATER: string = "pourWater";
		POUR_WATER_OVER: string = "pourWaterOver";
		POUR_WASTE_WATER: string = "pourWasteWater";
		MAKE_TEA_BTN: string = "makeTeaBtn";
		MAKE_TEA: string = "makeTea";
		MAKE_TEA_OVER: string = "makeTeaOver";
		GLASS_POT: string = "glassPot";
		GLASS_CUP: string = "glassCup";
		RED_POT: string = "redPot";
		RED_CUP: string = "redCup";
		REDFLOWER_POT: string = "redFlowerPot";
		REDFLOWER_CUP: string = "redFlowerCup";
		TEMP: string = "temp";

		static instance: MakeTeaHomeLayer;
		/** 温度计动画起始帧数 */
		static index: number = 0;
		/** 开始泡茶获取的温度 */
		static temperature: number;
		/** 得分 */
		static score: number;
		/** 玄天符状态 */
		static xtfStatus:number=0;
		/** 茶壶动画路径 */
		potMcPath: string;
		/** 茶杯动画路径 */
		cupMcPath: string;
		/** 泡茶按钮动画 */
		makeTeaBtnAni: Laya.Animation;
		/** 温度计动画 */
		tempAni: Laya.Animation;
		/** 烧水动画 */
		heatWaterAni: Laya.Animation
		/** 倒水空炉 */
		heatWaterImg: Laya.Image;
		/** 水沸动画 */
		waterBoilingAni: Laya.Animation;
		/** 茶壶动画 */
		potMc: Laya.MovieClip;
		/** 茶杯动画 */
		cupMc: Laya.MovieClip;
		/** 倒水动画 */
		pourWaterAni: Laya.Animation;
		/** 泡茶提示框 */
		// tipView:ui.gameUI.tips.ConfirmCancelTipUI;
		/** 提示框内容 */
		tipContent: string;
		constructor()
		{
			super();
			this.name = "makeTeaHome";
			MakeTeaHomeLayer.instance = this;
			this.mouseThrough = true;
			// this.loadBg();
			// this.tipView=new ui.gameUI.tips.ConfirmCancelTipUI;
		}


		pauseTemp(event: Laya.Event): void
		{
			this.tempAni.gotoAndStop(MakeTeaHomeLayer.index);
			Laya.timer.clearAll(this);
			// MakeTeaHomeLayer.temperature=MakeTeaHomeLayer.index*4+20;
			MakeTeaHomeLayer.temperature = MakeTeaHomeLayer.index * 4;
			console.log("当前温度为：" + MakeTeaHomeLayer.temperature);
			MakeTeaDialogCtrl.getInstance().stopFriedWater(MakeTeaHomeLayer.temperature);
		}

		initStopFriedWaterData(): void
		{
			let powerVO: models.base.SeedVO = MakeTeaHomeModel.makeTeaPowerVOArr[0];
			if (powerVO.name == "askDunk" || powerVO.name == "hotUpWater")
			{
				let powerVO: models.base.SeedVO = MakeTeaHomeModel.makeTeaPowerVOArr[0];
				if (powerVO.temperature < powerVO.tempBottom || powerVO.temperature > powerVO.tempTop)
				{
					this.tipContent = "你壶里面的水不满足泡茶的基本要求！这会严重影响茶水的品质！是否用此水泡茶？选择<确认>按钮进行泡茶,否则水将被倒掉";
					this.showCancleBtn(this.tipContent);
				} else
				{
					this.tipContent = "目前水温:" + powerVO.temperature + "度;预计茶水评分：" + powerVO.quality + "分；是否用此水泡茶？选择<确认>按钮进行泡茶,否则水将被倒掉";
					this.showCancleBtn(this.tipContent);
				}
			} else
			{
				let scoreVO: models.base.SeedVO = MakeTeaHomeModel.firedWaterVOArr[0];
				MakeTeaHomeLayer.score = scoreVO.quality;
				let friedWaterVO: models.base.SeedVO = MakeTeaDialogModel.friedWaterVOArr[0];
				if (friedWaterVO.name == "hotUpWater")
				{
					if (MakeTeaHomeLayer.temperature < friedWaterVO.tempBottom || MakeTeaHomeLayer.temperature > friedWaterVO.tempTop)
					{
						this.tipContent = "你壶里面的水不满足泡茶的基本要求！这会严重影响茶水的品质！是否用此水泡茶？选择<确认>按钮进行泡茶,否则水将被倒掉";
						this.showCancleBtn(this.tipContent);
					} else
					{
						this.tipContent = "目前水温:" + MakeTeaHomeLayer.temperature + "度;预计茶水评分：" + MakeTeaHomeLayer.score + "分；是否用此水泡茶？选择<确认>按钮进行泡茶,否则水将被倒掉";
						this.showCancleBtn(this.tipContent);
					}
				}
			}
		}

		/** 是否开始倒水 */
		isStartDropWater: boolean = false;
		showCancleBtn(content: string): void
		{
			let makeTeaTipView: ui.gameUI.tips.ConfirmCancelTipUI = new ui.gameUI.tips.ConfirmCancelTipUI();
			makeTeaTipView.contentTxt.text = content;
			makeTeaTipView.x = configs.GameConfig.GAME_WINDOW_WIDTH - makeTeaTipView.width >> 1;
			makeTeaTipView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - makeTeaTipView.height >> 1;
			makeTeaTipView.visible = true;
			this.addChild(makeTeaTipView);
			this.heatWaterAni.visible = false;
			this.heatWaterImg.visible = true;
			this.addChild(this.heatWaterImg);
			makeTeaTipView.confirmBtn.on(Laya.Event.CLICK, this, function (): void
			{
				MakeTeaDialogCtrl.getInstance().startMakeTea();
				this.isStartDropWater = true;

				this.potMc.gotoAndStop(0);
				this.potMc.play();
				if (this.cutPotType == "glass")
				{
					this.potMc.on(Laya.Event.FRAME, this, function ()
					{
						if (this.potMc.index == 100)	// 118
						{
							this.stopFrame();
						}
					});
				}
				else if (this.cutPotType == "zihua")
				{
					this.potMc.on(Laya.Event.FRAME, this, function ()
					{
						if (this.potMc.index == 66)	// 98
						{
							this.stopFrame();
						}
					});
				}
				else
				{
					this.potMc.on(Laya.Event.FRAME, this, function ()
					{
						if (this.potMc.index == 60)
						{
							this.stopFrame();
						}
					});
				}

				this.cupMc.on(Laya.Event.LOADED, this, function (): void
				{
					this.cupMc.stop();
				});
				this.cupMc.on(Laya.Event.COMPLETE, this, function (): void
				{
					this.potMc.visible = true;
					this.cupMc.gotoAndStop(0);
					this.isStartDropWater = false;
					TipLayerManager.tipLayer.showDrawBgTip("点击左侧小妹开始出售茶叶吧！");

				});
				this.removeChild(this.tempAni.parent);
				this.removeChild(this.makeTeaBtnAni);
				makeTeaTipView.removeSelf();
			});
			makeTeaTipView.cancelBtn.on(Laya.Event.CLICK, this, function (): void
			{
				MakeTeaDialogCtrl.getInstance().dropWater();
				this.isStartDropWater == false;
				this.removeChild(this.potMc);
				this.removeChild(this.cupMc);
				this.removeChild(this.makeTeaBtnAni);
				this.removeChild(this.tempAni.parent);
				this.pourWasteWater();
				this.removeChild(makeTeaTipView);
				makeTeaTipView.removeSelf();
			});
			makeTeaTipView.closeBtn.on(Laya.Event.CLICK, this, function (): void
			{
				this.isStartDropWater == false;
				this.heatWaterAni.visible = true;
				this.heatWaterImg.visible = false;
				makeTeaTipView.removeSelf();
			});
		}

		loadBg(): void
		{
			let imgsArr: string[] = [];
            let index: number;
            for (index = 1; index <= 12; index++)
            {
                imgsArr[index - 1] = this.bgUrl + "makeRoom/bg_" + index + ".png";
            }
            for (index = 0; index < imgsArr.length; index++)
            {
                let m: number =  Math.floor(index / 4);
                let n: number =  index % 4;
                this.loadImage(imgsArr[index], n * this.pieceW, m * this.pieceH, this.pieceW, this.pieceH);
            }

			this.request_MakeTeaPower();  //初始化泡茶室获取泡茶权限
			this.myInit();
			this.heatWaterImg = new Laya.Image();
			this.heatWaterImg.skin = "res/gameAssets/ani/heatUpWater/stopState.png";
			this.heatWaterImg.scale(0.8, 0.8);
			this.heatWaterImg.pos(755, 340);
		}

		private stopFrame(): void
		{
			this.potMc.stop();
			this.potMc.visible = false;
			this.heatWaterImg.visible = false;
			this.heatWaterAni.visible = true;
			this.heatWaterAni.stop();
			this.cupMc.play();
		}


		request_MakeTeaPower(): void
		{
			MakeTeaDialogCtrl.getInstance().request_MakeTeaPower();
		}

		/** 出售茶叶 */
		saleTea(event: Laya.Event): void
		{
			let i: number;
			let powerLen: number = MakeTeaHomeModel.makeTeaPowerVOArr.length;
			let len: number = MakeTeaHomeModel.startMakeTeaVOArr.length;
			let powerVO: models.base.SeedVO;
			let startMakeTeaVO: models.base.SeedVO;
			for (i = 0; i < powerLen; i++)
			{
				powerVO = MakeTeaHomeModel.makeTeaPowerVOArr[i];
				if (powerVO.name == "finishDunkTea" || len > 0)
				{
					if (MakeTeaHomeModel.startMakeTeaVOArr.length > 0)
					{
						startMakeTeaVO = MakeTeaHomeModel.startMakeTeaVOArr[0];
						this.tipContent = "泡好的茶水卖给我，你会得到" + startMakeTeaVO.teaPrice + "金币，确定要卖出吗？";
						this.showSaleTeaTip(this.tipContent);
					} else
					{
						this.tipContent = "泡好的茶水卖给我，你会得到" + powerVO.teaPrice + "金币，确定要卖出吗？";
						this.showSaleTeaTip(this.tipContent);
					}
				} else
				{
					TipLayerManager.tipLayer.showDrawBgTip("你当前还没有现成的茶叶，请先泡茶！");
				}
			}
			// if(powerLen==0 || len==0)
			// 	TipLayerManager.tipLayer.showCommonTip("你当前还没有现成的茶叶，请先泡茶！");
		}


		showSaleTeaTip(tipContent: string): void
		{
			let saleTeaTipView: ui.gameUI.tips.ConfirmCancelTipUI = new ui.gameUI.tips.ConfirmCancelTipUI();
			saleTeaTipView.contentTxt.text = tipContent;
			console.log("1============ saleTeaTipView, w:" + saleTeaTipView.width);
			saleTeaTipView.x = configs.GameConfig.GAME_WINDOW_WIDTH - saleTeaTipView.width >> 1;
			saleTeaTipView.y = configs.GameConfig.GAME_WINDOW_HEIGHT - saleTeaTipView.height >> 1;
			saleTeaTipView.visible = true;
			this.addChild(saleTeaTipView);
			saleTeaTipView.confirmBtn.on(Laya.Event.CLICK, this, function (): void
			{
				MakeTeaDialogCtrl.getInstance().saleTea();
				this.removeChild(this.potMc);
				this.removeChild(this.cupMc);
				this.cupMc.destroy();
				this.potMc.destroy();
				this.heatWaterAni.gotoAndStop(0);
				saleTeaTipView.removeSelf();
			});
			saleTeaTipView.cancelBtn.on(Laya.Event.CLICK, this, function (): void
			{
				saleTeaTipView.removeSelf();
			});
			saleTeaTipView.closeBtn.on(Laya.Event.CLICK, this, function (): void
			{
				saleTeaTipView.removeSelf();
			});
		}

		initMakeTeaHome(powerVOArr: Array<any>): void
		{
			if (!powerVOArr)
				return;
			let i: number;
			let len: number = powerVOArr.length;
			let powerVO: models.base.SeedVO;

			for (i = 0; i < len; i++)
			{
				powerVO = powerVOArr[i];
				if (powerVO.name == "")
				{
					// this.heatWaterAni=this.heatUpWater();
					// // ========================== 新加，动画在此时可能已加载完成，故需监听 COMPLETE; 共调用了4次 heatUpWater(),要注意动画加载顺序！
					// this.heatWaterAni.on(Laya.Event.LOADED,this,function():void{
					// 	this.heatWaterAni.gotoAndStop(0);
					// });
				} else
				{
					this.initTypeAnimation(powerVO.teaSet, powerVO.name);
				}
			}
		}

		initTypeAnimation(teaSet: string, statusName: string): void
		{
			switch (teaSet)
			{
				case "glass":
					this.potMcPath = "res/gameAssets/ani/glassPot.swf";
					this.cupMcPath = "res/gameAssets/ani/glassCup.swf";
					this.initHomeAni(statusName);
					break;
				case "zisha":
					this.potMcPath = "res/gameAssets/ani/redPot.swf";
					this.cupMcPath = "res/gameAssets/ani/redCup.swf";
					this.initHomeAni(statusName);
					break;
				case "zihua":
					this.potMcPath = "res/gameAssets/ani/redFlowerPot.swf";
					this.cupMcPath = "res/gameAssets/ani/redFlowerCup.swf";
					this.initHomeAni(statusName);
					break;
			}
		}

		cupPotIndex: number = 1;
		teaSetShow(): void
		{
			let potName: string = "potMc";
			this.potMc = this.commonMc(this.potMcPath, potName);
			let cupName: string = "cupName";
			this.cupMc = this.commonMc(this.cupMcPath, cupName);
			this.cupMc.on(Laya.Event.COMPLETE, this, function (): void
			{
				this.potMc.gotoAndStop(0);
				this.cupPotIndex = 3;
			});
			this.potMc.on(Laya.Event.LOADED, this, function (): void
			{
				this.potMc.gotoAndStop(0);
			});
			this.cupMc.on(Laya.Event.LOADED, this, function (): void
			{
				this.cupMc.gotoAndStop(0);
				this.cupPotIndex = 2;
			});
			if (this.cupPotIndex == 1)
			{
				this.potMc.gotoAndStop(0);
				this.cupMc.gotoAndStop(0);
			}
		}

		initHomeAni(statusName: string): void
		{
			if (statusName == "hotUpWater")
			{
				this.teaSetShow();
				this.heatWaterAni.play();
				this.makeTeaBtnAni = this.makeTeaBtn();
				this.tempAni = this.temp();
			} else if (statusName == "finishDunkTea")
			{
				this.finishDukeTeaAni();
			} else if (statusName == "askDunk")
			{
				this.teaSetShow();
				this.heatWaterAni.play();
				this.makeTeaBtnAni = this.makeTeaBtn();
				this.tempAni = this.temp();
				this.tempAni.on(Laya.Event.LOADED, this, function (): void
				{
					let i: number;
					let len: number = MakeTeaHomeModel.makeTeaPowerVOArr.length;
					let powerVO: models.base.SeedVO;
					for (i = 0; i < len; i++)
					{
						powerVO = MakeTeaHomeModel.makeTeaPowerVOArr[i];
						let index: number = Math.ceil((powerVO.temperature) / 4);
						this.tempAni.gotoAndStop(index);
						this.tempAni.stop();
						break;
					}
				});
				this.initStopFriedWaterData();
			}
		}

		finishDukeTeaAni(): void
		{
			this.teaSetShow();
			this.heatWaterAni.on(Laya.Event.LOADED, this, function (): void
			{
				this.heatWaterAni.gotoAndStop(0);
			});
			this.heatWaterAni.stop();
			this.potMc.on(Laya.Event.LOADED, this, function (): void
			{
				this.potMc.gotoAndStop(this.cupMc.count - 1);
			});
			this.cupMc.on(Laya.Event.LOADED, this, function (): void
			{
				this.cupMc.gotoAndStop(this.cupMc.count - 1);
			});
		}

		cutPotType: string = "";
		startMakeTea(friedWaterVOArr: Array<any>): void
		{
			if (!friedWaterVOArr)
				return
			let len: number = friedWaterVOArr.length;
			let i: number;
			if (len <= 0)
			{
				this.initMakeTeaHome(MakeTeaHomeModel.makeTeaPowerVOArr);

			} else
			{
				this.tempAni = this.temp();  //温度计动画
				this.tempAni.gotoAndStop(0);
				MakeTeaHomeLayer.index = 0;
				this.tempAni.play();
				this.makeTeaBtnAni = this.makeTeaBtn(); //点我泡茶按钮
				this.heatWaterAni.play();
				let i: number;
				let len: number = MakeTeaDialogModel.friedWaterVOArr.length;
				let friedWaterVO: models.base.SeedVO;
				for (i = 0; i < len; i++)
				{
					friedWaterVO = MakeTeaDialogModel.friedWaterVOArr[i];
					switch (friedWaterVO.teaSet)
					{
						case "glass":
							this.cutPotType = "glass";
							this.potMcPath = "res/gameAssets/ani/glassPot.swf";
							this.cupMcPath = "res/gameAssets/ani/glassCup.swf";
							this.teaSetShow();
							break;
						case "zisha":
							this.cutPotType = "zisha";
							this.potMcPath = "res/gameAssets/ani/redPot.swf";
							this.cupMcPath = "res/gameAssets/ani/redCup.swf";
							this.teaSetShow();
							break;
						case "zihua":
							this.cutPotType = "zihua";
							this.potMcPath = "res/gameAssets/ani/redFlowerPot.swf";
							this.cupMcPath = "res/gameAssets/ani/redFlowerCup.swf";
							this.teaSetShow();
							break;
					}
				}
			}
		}

		myInit()
		{
			// 还差动画：白瓷茶杯/茶壶、紫砂茶杯/茶壶
			this.sisterUrlArr = this.getAniUrlArr("res/gameAssets/ani/sister/", 2);
			this.elderSisterUrlArr = this.getAniUrlArr("res/gameAssets/ani/elderSister/", 2);
			this.heatUpWaterArr = this.getAniUrlArr("res/gameAssets/ani/heatUpWater/", 2);
			this.waterBoilingArr = this.getAniUrlArr("res/gameAssets/ani/waterBoiling/", 2);
			this.pourWaterArr = this.getAniUrlArr("res/gameAssets/ani/pourWater/", 5);
			this.pourWaterOverArr = this.getAniUrlArr("res/gameAssets/ani/pourWaterOver/", 4);
			this.pourWasteWaterArr = this.getAniUrlArr("res/gameAssets/ani/pourWasteWater/", 12);
			this.makeTeaBtnArr = this.getAniUrlArr("res/gameAssets/ani/makeTeaBtn/", 4);
			this.makeTeaArr = this.getAniUrlArr("res/gameAssets/ani/makeTea/", 5);
			this.makeTeaOverArr = this.getAniUrlArr("res/gameAssets/ani/makeTeaOver/", 4);
			this.glassPotArr = this.getAniUrlArr("res/gameAssets/ani/glassPot/", 33);
			this.glassCupArr = this.getAniUrlArr("res/gameAssets/ani/glassCup/", 30);
			this.redFlowerPotArr = this.getAniUrlArr("res/gameAssets/ani/redFlowerPot/", 33);
			this.redFlowerCupArr = this.getAniUrlArr("res/gameAssets/ani/redFlowerCup/", 30);
			this.tempArr = this.getAniUrlArr("res/gameAssets/ani/temp/", 20);
			this.sisterLoaded();
			this.elderSisterLoaded();
			this.addXTF();
			this.heatWaterAni = this.heatUpWater();
			// ========================== 新加，动画在此时可能已加载完成，故需监听 COMPLETE; 共调用了4次 heatUpWater(),要注意动画加载顺序！
			this.heatWaterAni.on(Laya.Event.LOADED, this, function (): void
			{
				this.heatWaterAni.gotoAndStop(0);
			});
		}

        /**
		 * 妹妹
		 */
		private sisterLoaded(): void
		{

			let sister: Animation = this.addAnimation(this.sisterUrlArr, this.SISTER, 800, new Point(390, 110));
			let sRect: Laya.Rectangle = new Laya.Rectangle(0, 0, 105, 180);
			sister.hitArea = sRect;
			sister.on(Laya.Event.CLICK, this, this.saleTea);
		}

		/**
		 * 姐姐
		 */
		private elderSisterLoaded(): void
		{
			let ani: Animation = new Animation();
			ani.interval = 900;
			ani.loadImages(this.elderSisterUrlArr);
			ani.play();
			this.addChild(ani);
			ani.pos(560, 90);
		}


		private huLoaded(): void
		{
			let mc: MovieClip = new MovieClip();
			mc.url = "res/gameAssets/ani/stove.swf";
			mc.once(Laya.Event.LOADED, this, function (): void
			{
				// mc.gotoAndStop(1);
			});
			this.addChild(mc);
			mc.pos(200, 0);
		}

		/**
		 * 添加玄天符动画
		 */
		private addXTF(): void
		{
			if(MakeTeaHomeLayer.xtfStatus==0){
				let mc: MovieClip = new MovieClip();
				mc.url = "res/gameAssets/ani/XuanTianFu.swf";
				mc.on(Laya.Event.LOADED, this, function (): void
				{
					console.log("-- XuanTianFu end...");
				});
				this.addChild(mc);
				mc.pos(70, 420);
				MakeTeaHomeLayer.xtfStatus=1;
			}
		}

		/**
		 * 烧水
		 */
		private heatUpWater(): Laya.Animation
		{
			let heatUp: Animation = this.addAnimation(this.heatUpWaterArr, this.HEAT_UP_WATER, 600, new Point(0, 150));   //750, 300
			heatUp.scale(0.7, 0.7, true);
			heatUp.pos(765, 345);
			return heatUp;
		}

		/**
		 * 水烧好（水沸）
		 */
		private waterBoiling(): Laya.Animation
		{
			let waterBoiling: Animation = this.addAnimation(this.waterBoilingArr, this.WATER_BOILING, 200, new Point(765, 210));  //100, 150  750, 300
			this.addChild(waterBoiling);
			waterBoiling.scale(0.7, 0.7, true);
			// waterBoiling.pos(765,345);
			return waterBoiling;
		}

		/**
		 * 倒水
		 */
		private pourWater(): Laya.Animation
		{
			let pourWater: Animation = this.addAnimation(this.pourWaterArr, this.POUR_WATER, 200, new Point(200, 150));
			pourWater.on(Laya.Event.COMPLETE, this, function (): void
			{
				pourWater.stop();
			});
			return pourWater;
		}

		/**
		 * 倒水完毕
		 */
		private pourWaterOver(): void
		{
			let pourWaterOver: Animation = this.addAnimation(this.pourWaterOverArr, this.POUR_WATER_OVER, 150, new Point(400, 150));
			pourWaterOver.on(Laya.Event.COMPLETE, this, function (): void
			{
				console.log("-- pour water over end");
				pourWaterOver.gotoAndStop(pourWaterOver.frames.length - 1);
			});
		}

		/**
		 * 倒废水
		 */
		private pourWasteWater(): Laya.Animation
		{
			let pourWasteWater: Animation = this.addAnimation(this.pourWasteWaterArr, this.POUR_WASTE_WATER, 200, new Point(100, 250));
			pourWasteWater.scale(0.7, 0.7, true);
			pourWasteWater.on(Laya.Event.COMPLETE, this, function (): void
			{
				pourWasteWater.stop();
				pourWasteWater.visible = false;
				this.heatWaterAni.visible = true;
				this.heatWaterImg.visible = false;
			});

			return pourWasteWater;
		}

		/**
		 * 点我泡茶 按钮
		 */
		private makeTeaBtn(): Laya.Animation
		{
			let makeTeaBtn: Animation = this.addAnimation(this.makeTeaBtnArr, this.MAKE_TEA_BTN, 150, new Point(875, 410));   //875,410
			makeTeaBtn.scale(0.7, 0.7, true);
			let mRect: Laya.Rectangle = new Laya.Rectangle(0, 0, 250, 100);
			makeTeaBtn.hitArea = mRect;
			makeTeaBtn.on(Laya.Event.CLICK, this, this.pauseTemp);
			return makeTeaBtn;
		}

		/**
		 * 泡茶
		 */
		private makeTea(): void
		{
			let makeTea: Animation = this.addAnimation(this.makeTeaArr, this.MAKE_TEA, 200, new Point(600, 0));
			makeTea.on(Laya.Event.COMPLETE, this, function (): void
			{
				makeTea.gotoAndStop(makeTea.frames.length - 1);
			});
		}

		/**
		 * 泡茶完成
		 */
		private makeTeaOver(): void
		{
			let makeTeaOver: Animation = this.addAnimation(this.makeTeaOverArr, this.MAKE_TEA_OVER, 200, new Point(800, 0));
			makeTeaOver.on(Laya.Event.COMPLETE, this, function (): void
			{
				makeTeaOver.gotoAndStop(makeTeaOver.frames.length - 1);
			});
		}

		/**
		 * 玻璃茶壶
		 */
		private glassPot(): Laya.Animation
		{
			let glassPot: Animation = this.addAnimation(this.glassPotArr, this.GLASS_POT, 200, new Point(600, 150));
			glassPot.on(Laya.Event.COMPLETE, this, function (): void
			{
				glassPot.gotoAndStop(glassPot.frames.length - 1);
			});

			return glassPot;
		}

		/**
		 * 玻璃杯
		 */
		private glassCup(): Laya.Animation
		{
			let glassCup: Animation = this.addAnimation(this.glassCupArr, this.GLASS_CUP, 250, new Point(800, 150));
			glassCup.on(Laya.Event.COMPLETE, this, function (): void
			{
				glassCup.gotoAndStop(glassCup.frames.length - 1);
			});

			return glassCup;
		}

		/**
		 *  紫砂茶壶
		 */
		private redPot(): void
		{
			let redPot: Animation = this.addAnimation(this.redPotArr, this.RED_POT, 200, new Point(600, 150));
			redPot.on(Laya.Event.COMPLETE, this, function (): void
			{
				redPot.gotoAndStop(redPot.frames.length - 1);
			});
		}

		/**
		 * 紫砂茶杯
		 */

		private redCup(): void
		{
			let redCup: Animation = this.addAnimation(this.redCupArr, this.RED_CUP, 250, new Point(800, 150));
			redCup.on(Laya.Event.COMPLETE, this, function (): void
			{
				redCup.gotoAndStop(redCup.frames.length - 1);
			});
		}

		private commonMc(url: string, teasetName: string): Laya.MovieClip
		{
			this.cupPotIndex = 1;

			if (this.getChildByName(teasetName))
			{
				return this.getChildByName(teasetName) as Laya.MovieClip;
			} else
			{
				let mc: MovieClip = new MovieClip();
				mc.url = url;
				mc.name = teasetName;
				mc.once(Laya.Event.LOADED, this, function (): void
				{
					mc.gotoAndStop(0);
				});
				this.addChild(mc);
				mc.scale(0.8, 0.8);
				if (teasetName == "potMc")
				{
					mc.pos(400, 110);
				} else
				{
					mc.pos(210, 280);
				}
				return mc;
			}
		}

		/**
		 * 白瓷茶壶
		 */

		private redFlowerPot(): void
		{
			let redFlowerPot: Animation = this.addAnimation(this.redFlowerPotArr, this.REDFLOWER_POT, 200, new Point(600, 150));
			redFlowerPot.on(Laya.Event.COMPLETE, this, function (): void
			{
				redFlowerPot.gotoAndStop(redFlowerPot.frames.length - 1);
			});
		}

		/**
		 * 白瓷茶杯
		 */
		private redFlowerCup(): void
		{
			let redFlowerCup: Animation = this.addAnimation(this.redFlowerCupArr, this.REDFLOWER_CUP, 250, new Point(800, 150));
			redFlowerCup.on(Laya.Event.COMPLETE, this, function (): void
			{
				redFlowerCup.gotoAndStop(redFlowerCup.frames.length - 1);
			});
		}

		/**
		 * 温度计
		 */
		private temp(): Laya.Animation
		{
			// 水银柱
			let temp: Animation = new Animation();
			temp.loadImages(this.tempArr, this.TEMP);
			temp.on(Laya.Event.COMPLETE, this, function (): void
			{
				temp.gotoAndStop(temp.frames.length - 1);
			});
			temp.interval = 100;
			// temp.play();
			temp.pos(15, 20);
			// 数字刻度
			let numTip: Laya.Image = new Laya.Image();
			numTip.skin = "res/gameAssets/ani/temp/numTip.png";
			numTip.pos(65, 10);
			// 相关容器
			let bg: Laya.Image = new Laya.Image();
			let count: number = temp.frames.length - 1;
			bg.skin = "res/gameAssets/ani/temp/bg.png";
			bg.addChild(temp);
			bg.addChild(numTip);
			this.addChild(bg);
			bg.pos(920, 230);
			bg.scale(0.7, 0.7, true);
			temp.timerLoop(1000, this, this.timeOut, [count, temp]);
			if (this.cupPotIndex == 1)
			{
				temp.gotoAndStop(5);
				temp.play();
			}
			return temp;
		}

		timeOut(count: number, temp: Laya.Animation): void
		{
			temp.mouseEnabled = false;
			MakeTeaHomeLayer.index++;
			temp.gotoAndStop(MakeTeaHomeLayer.index);
			if (MakeTeaHomeLayer.index == count)
			{
				Laya.timer.clearAll(this);
				temp.timerOnce(4000, this, function (): void
				{
					temp.mouseEnabled = true;
					temp.timerLoop(1000, this, function (): void
					{
						MakeTeaHomeLayer.index--;
						temp.gotoAndStop(MakeTeaHomeLayer.index);
						if (MakeTeaHomeLayer.index == 0)
						{
							Laya.timer.clearAll(this);
							return;
						}
					});
				});
			}
		}

		/**
		 * 添加并播放动画
		 * @param aniArr 动画图集
		 * @param aniCacheName 动画模板
		 * @param interval 帧间隔(毫秒)
		 * @param pos 动画位置
		 */
		addAnimation(aniArr: Array<string>, aniCacheName: string, interval: number, pos: Point): Animation
		{
			if (this.getChildByName(aniCacheName))
			{
				return this.getChildByName(aniCacheName) as Animation;
			}
			else
			{
				let ani: Animation = new Animation();
				ani.loadImages(aniArr, aniCacheName);
				// ani.on(Laya.Event.COMPLETE,this,function():void{
				// });
				ani.interval = interval;
				ani.play();
				this.addChild(ani);
				ani.pos(pos.x, pos.y);
				return ani;
			}
		}

		/**
		 * 填充并返回动画图集数组
		 * @param prefix 图集前缀
		 * @param urlRange 图集数量范围
		 */
		getAniUrlArr(prefix: string, urlRange: number): Array<string>
		{
			let arr: Array<string> = new Array<string>();
			let i: number;
			for (i = 1; i <= urlRange; i++)
			{
				arr.push(prefix + i + ".png");
				// console.log(prefix+i+".png");
			}
			return arr;
		}

	}
}