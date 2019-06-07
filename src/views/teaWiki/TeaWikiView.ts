
namespace views.teaWiki
{
	import Event = laya.events.Event;
	import Image = laya.ui.Image;
	import Box = laya.ui.Box;
	import TeaWikiInfoVO = models.teaWiki.TeaWikiInfoVO;
	import ToolVO = models.base.ToolVO;
	import TeaWikiCtrl=controllers.teaWiki.TeaWikiCtrl;

	/**
	 * 茶百科弹出面板
	 */
	export class TeaWikiView extends ui.gameUI.teaWiki.TeaWikiDialogUI
	{
		// 当前选中对象的名称
		curSelectedTabName:string;
        // 图片路径
        imgPath:string="gameUI/fireTea/";
        //图片后缀名
        imgSuffix:string=".png";
		//用于播放swf动画的对象
		mc:Laya.MovieClip;
		// 左侧茶叶分类按钮数组
		tabArr:Laya.Box[] = [this.tab1,this.tab2,this.tab3,this.tab4,this.tab5,this.tab6,this.tab7,this.tab8];

		constructor()
		{
			super();
			this.cacheAs = "bitmap";
			this.dragArea = `0,0,${this.width},60`;
			this.mc=new Laya.MovieClip();
			this.selectTab(this.tab1);
            for(let i:number=1;i<9;i++){
                (this.getChildByName("tab"+i) as Laya.Box).on(Event.CLICK,this,this.setStatus);
            }
			this.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
		}

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
        }

        selectTab(tab:Laya.Box):void
        {
            (tab.getChildByName("selectBg") as Image).visible = false;
			(tab.getChildByName("unSelectBg") as Image).visible = true;
        }
        unSelectTab(tab:Laya.Box):void
        {
            (tab.getChildByName("selectBg") as Image).visible = true;
			(tab.getChildByName("unSelectBg") as Image).visible = false;
        }

		/**
		 * 右侧列表填充
		 */
		addFireTeaWikiGrids(voArr:Array<models.teaWiki.TeaWikiInfoVO>):void
		{
			if(!voArr || !voArr.length)
				return;
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);

			let i:number;
			let len:number=voArr.length;
			let teaWikiInfoVO:TeaWikiInfoVO;
			for(i=0;i<len;i++)
			{
				let gridItem:ui.gameUI.teaWiki.TeaWikiGridItemUI = new ui.gameUI.teaWiki.TeaWikiGridItemUI();
				teaWikiInfoVO=voArr[i];
				gridItem.name=teaWikiInfoVO.id+"";
				gridItem.itemName.text=teaWikiInfoVO.name;
				gridItem.gridItemBg.skin=this.imgPath+"border_1"+this.imgSuffix;
				gridItem.y = i*(gridItem.height+8);
				// 请求第一项的详细介绍
				if(i==0){
					gridItem.gridItemBg.skin=this.imgPath+"border_2"+this.imgSuffix;
					TeaWikiCtrl.getInstance().itemClkedFn(teaWikiInfoVO);
				}
				this.gridContainer.addChild(gridItem);
				gridItem.on(Event.CLICK,this,function():void{
					gridItem.gridItemBg.skin=this.imgPath+"border_2"+this.imgSuffix;
					this.imgContainer.removeChildren();
					TeaWikiCtrl.getInstance().itemTauchFn(parseInt(gridItem.name),teaWikiInfoVO);
				});
			}
		}

		/**
		 * 每项的详细介绍
		 */
		addFireTeaWikiImgs(voArr:Array<models.teaWiki.TeaWikiInfoVO>):void
		{
			if(!voArr || !voArr.length)
			return;
			let i:number;
			let icon:string;
			let len:number=voArr.length;
			let teaWikiInfoVO:models.teaWiki.TeaWikiInfoVO;
			for(i=0;i<len;i++)
			{
				teaWikiInfoVO=voArr[i];
				this.mc.url =teaWikiInfoVO.icon;
				this.mc.size(700,403);
				this.mc.scale(0.95,0.95);
				this.imgContainer.addChild(this.mc);
				if(teaWikiInfoVO.pre==0){
					this.pre.visible=false;
					this.pre.mouseEnabled=false;
				}else{
					this.pre.visible=true;
					this.pre.mouseEnabled=true;
				}
			}
		}

		closeBtnFn():void
		{
			this.removeSelf();
		}

	}
}