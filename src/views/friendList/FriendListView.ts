namespace views.friendList
{
	import Image = laya.ui.Image;
	import Box = laya.ui.Box;
	import SinglePersonUI = ui.gameUI.friendList.SinglePersonUI;
	import FriendListCtrl = controllers.friendList.FriendListCtrl;
	import AddFriendDialogCtrl = controllers.friendList.AddFriendDialogCtrl;
	import FriendListModel = models.friendList.FriendListModel;
	/**
	 * 好友列表视图
	 */
	export class FriendListView extends ui.gameUI.friendList.FriendListUI
	{

		/** 存放好友具体信息的 Tab */
		gridItemsArr:SinglePersonUI[];
		imgPath:string="gameUI/friendList/";
		imgPath1:string="gameUI/toolBar/";
        imgSuffix:string=".png";
		// 当前点击事件触发按钮的名称
		curTageName:string
		// 好友显示数量
		gridItemIndex:number=7;
		// 页码
		static pageIndex:number=1;

		// 当前选中的顶部工具栏名称
		static topBtnName:string;
		// 当前选中的左侧工具栏名称
		static leftBtnName:string;
		tipView:ui.gameUI.tips.ConfirmCancelTipUI;
		constructor()
		{
			super();
			this.gridItemsArr = [];
			this.tipView=new ui.gameUI.tips.ConfirmCancelTipUI;
			this.initFriendView();

			this.mouseThrough = true;
			// this.nextPageBtn.mouseThrough=true;
			this.closeBtn.on(Laya.Event.CLICK,this,this.closeBtnFn);
			(this.personList as Laya.Box).on(Laya.Event.CLICK,this,this.resetListView);
			(this.personManage as Laya.Box).on(Laya.Event.CLICK,this,this.resetListView);
			this.topLeftBtn.on(Laya.Event.CLICK,this,this.getExpList);
			this.topRightBtn.on(Laya.Event.CLICK,this,this.getExpList);
			this.searchBtn.on(Laya.Event.CLICK,this,this.findPals);
			this.freshBtn.on(Laya.Event.CLICK,this,this.freshPals);
			this.addPersonBtn.on(Laya.Event.CLICK,this,this.searchPals);
			this.lastPageBtn.on(Laya.Event.CLICK,this,this.direction_left);
			this.nextPageBtn.on(Laya.Event.CLICK,this,this.direction_right);
		}

		initFriendView():void{
			FriendListView.leftBtnName ="leftBg1";
			FriendListView.topBtnName = "expBtn";
			this.topBg1.skin=this.imgPath+"topBg1"+this.imgSuffix;
			this.topBg2.skin=this.imgPath+"topBg2"+this.imgSuffix;
			this.leftBg1.skin=this.imgPath+"leftBg"+this.imgSuffix;
			this.leftBg2.skin=this.imgPath+"leftBg1"+this.imgSuffix;
			this.topLeftBtn.name="expBtn";
			this.topRightBtn.name="goldBtn";
			this.addPersonBtn.visible=false;
			this.addPersonBtn.mouseEnabled=false;
			this.serchName.prompt="输入好友QQ号";
		}

		setPageInfo(pageNums:number):void{
			this.firstPage.text=FriendListView.pageIndex+"";
			this.pageNums.text=pageNums+"";
			// 请求好友列表
			let curPage:number=parseInt(this.firstPage.text);
			FriendListCtrl.getInstance().request_getUserList(curPage,"exp",null);
		}

		addPerson(personInfoVOArr:Array<any>):void{
			if(!personInfoVOArr)
				return;
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren-1);
			let len:number = personInfoVOArr.length;
			let i:number;
			let userVO:models.friendList.FriendInfoVO;
			this.gridItemsArr = [];
			for(i=0; i<len; i++)
			{
				userVO = personInfoVOArr[i];
				let gridItem:SinglePersonUI = new SinglePersonUI();
				gridItem.name = (i+1)+"";
				gridItem.orderBg.skin="";
				gridItem.orderNum.text=userVO.ranking+"";
				gridItem.headPic.skin=userVO.imgurl;
				gridItem.personName.text=userVO.userName;
				switch(userVO.status){
					case 0:
						gridItem.statusPic.skin="";
					break;
					case 1:
						gridItem.statusPic.skin=this.imgPath1+"harvestAll"+this.imgSuffix;
					break;
					case 2:
						gridItem.statusPic.skin=this.imgPath1+"water"+this.imgSuffix;
					break;
					case 3:
						gridItem.statusPic.skin=this.imgPath1+"grass"+this.imgSuffix;
					break;
					case 4:
						gridItem.statusPic.skin=this.imgPath1+"killWorm"+this.imgSuffix;
					break;

				}

				gridItem.x =10;
				gridItem.y=i*(gridItem.height+3);
				// 最多显示7小项
				if(i < 7)
					this.gridContainer.addChild(gridItem);
				this.gridItemsArr.push(gridItem);

				// 点击每一项进入好友茶园
				gridItem.on(Laya.Event.CLICK,this,this.gridItemClked,[userVO]);
			}
		}

		addManageUser(personInfoVOArr:Array<any>):void{
			if(personInfoVOArr.length<=0){
				this.gridContainer.removeChildren(0,this.gridContainer.numChildren-1);
			}else{
				let len:number = personInfoVOArr.length;
				let i:number;
				let userVO:models.friendList.FriendInfoVO;
				this.gridItemsArr = [];
				this.gridContainer.removeChildren(0,this.gridContainer.numChildren-1);
				for(i=0; i<len; i++)
				{
					userVO = personInfoVOArr[i];
					let gridItem:SinglePersonUI = new SinglePersonUI();
					gridItem.name = (i+1)+"";
					gridItem.orderBg.skin=this.imgPath+"love"+this.imgSuffix;
					gridItem.orderNum.text=userVO.level+"";
					gridItem.headPic.skin=userVO.imgurl;
					gridItem.personName.text=userVO.userName;
					gridItem.statusPic.skin=this.imgPath+"deletePic"+this.imgSuffix;
					gridItem.x =10;
					gridItem.y=i*(gridItem.height+3);
					// 最多显示7小项
					if(i < 7)
						this.gridContainer.addChild(gridItem);
					this.gridItemsArr.push(gridItem);
					// 点击删除按钮进行删除好友操作
					gridItem.statusPic.on(Laya.Event.CLICK,this,this.deletePals,[userVO]);
				}
			}

		}

		// 搜索已有好友
		findPals():void{
			let findPalNum:number=parseInt(this.serchName.text);
			if(FriendListView.topBtnName = "expBtn"){
				FriendListCtrl.getInstance().request_getUserList(1,"exp",findPalNum);
			}else if(FriendListView.topBtnName="goldBtn"){
				FriendListCtrl.getInstance().request_getUserList(1,"gold",findPalNum);
			}
		}

		// 刷新好友
		freshPals():void{
			FriendListView.pageIndex=1;
			this.firstPage.text=FriendListView.pageIndex+"";
			if(FriendListView.leftBtnName=="leftBg1" && FriendListView.topBtnName=="expBtn"){
				FriendListCtrl.getInstance().request_getUserList(FriendListView.pageIndex,"exp",null);
			}else if(FriendListView.leftBtnName=="leftBg1" && FriendListView.topBtnName=="goldBtn"){
				FriendListCtrl.getInstance().request_getUserList(FriendListView.pageIndex,"gold",null);
			}
		}

		deletePals(userVO:models.friendList.FriendInfoVO):void{
			this.tipView.contentTxt.text="你确定要删除好友"+userVO.userName+"吗？";
            this.tipView.x = GameConfig.GAME_WINDOW_WIDTH - this.tipView.width>>1;
			this.tipView.y = GameConfig.GAME_WINDOW_HEIGHT - this.tipView.height>>1;
			this.tipView.name="tipView";
            UILayerManager.teaGardenUI.addChild(this.tipView);
            this.tipView.visible=true;
            this.tipView.confirmBtn.on(Laya.Event.CLICK,this,function():void{
				FriendListCtrl.getInstance().request_deletePal(userVO.userId);
				this.cancleBtnFn();
            });
            this.tipView.closeBtn.on(Laya.Event.CLICK,this,this.cancleBtnFn);
            this.tipView.cancelBtn.on(Laya.Event.CLICK,this,this.cancleBtnFn);
		}

		getExpList(event:laya.events.Event):void{
			this.curTageName=event.target.name;
			if(this.curTageName=="expBtn"){
				this.firstPage.text="1";
				FriendListView.topBtnName="expBtn";
				this.topBg1.skin=this.imgPath+"topBg1.png";
				this.topBg2.skin=this.imgPath+"topBg2.png";
				FriendListCtrl.getInstance().request_getUserList(1,"exp",null);
			}else if(this.curTageName=="goldBtn"){
				this.firstPage.text="1";
				FriendListView.topBtnName="goldBtn";
				this.topBg1.skin=this.imgPath+"topBg2.png";
				this.topBg2.skin=this.imgPath+"topBg1.png";
				FriendListCtrl.getInstance().request_getUserList(1,"gold",null);
			}else if(this.curTageName == "recomBtn"){
				AddFriendDialogCtrl.getInstance().request_getRecommonList();
			}else if(this.curTageName == "applyBtn"){
				FriendListCtrl.getInstance().request_getPalsApply(1);
			}
		}

		resetListView(event:laya.events.Event):void{
			this.curTageName=event.target.name;
			if(this.curTageName=="leftBg1"){
				this.serchName.prompt="输入好友QQ号";
				FriendListView.leftBtnName="leftBg1";
				FriendListView.pageIndex=1;
				this.firstPage.text=FriendListView.pageIndex+"";
				this.topLeftBtn.name="expBtn";
				this.topRightBtn.name="goldBtn";
				this.leftBg1.skin=this.imgPath+"leftBg.png";
				this.leftBg2.skin=this.imgPath+"leftBg1.png";
				this.topBg1.skin=this.imgPath+"topBg1.png";
				this.topBg2.skin=this.imgPath+"topBg2.png";
				this.searchBtn.visible=true;
				this.searchBtn.mouseEnabled=true;
				this.freshBtn.visible=true;
				this.freshBtn.mouseEnabled=true;
				this.addPersonBtn.visible=false;
				this.addPersonBtn.mouseEnabled=false;
				this.expLove.visible=true;
				this.topGold.visible=true;
				this.expOrderTitle.skin=this.imgPath+"experience.png";
				this.goldOrderTitle.skin=this.imgPath+"gold.png";

			}else if(this.curTageName=="leftBg2"){
				this.serchName.prompt="输入好友昵称";
				FriendListView.leftBtnName="leftBg2";
				FriendListView.pageIndex=1;
				this.firstPage.text=FriendListView.pageIndex+"";
				this.topLeftBtn.name="recomBtn";
				this.topRightBtn.name="applyBtn";
				this.leftBg1.skin=this.imgPath+"leftBg1.png";
				this.leftBg2.skin=this.imgPath+"leftBg.png";
				this.topBg1.skin=this.imgPath+"topBg2.png";
				this.topBg2.skin=this.imgPath+"topBg2.png";
				this.searchBtn.visible=false;
				this.searchBtn.mouseEnabled=false;
				this.freshBtn.visible=false;
				this.freshBtn.mouseEnabled=false;
				this.addPersonBtn.visible=true;
				this.addPersonBtn.mouseEnabled=true;
				this.expLove.visible=false;
				this.topGold.visible=false;
				this.expOrderTitle.skin=this.imgPath+"recommon.png";
				this.goldOrderTitle.skin=this.imgPath+"apply.png";
			}
		}

		searchPals():void{
			let palName:string=this.serchName.text;
			FriendListCtrl.getInstance().request_addFriend(palName,1);
		}

		/** 上一页好友信息 */
		direction_left():void{
			console.log("==============>测试上一页按钮点击事件");
			if(parseInt(this.firstPage.text)<2)
				return;
			FriendListView.pageIndex--;
			if(FriendListView.pageIndex<1){
				FriendListView.pageIndex=1;
				this.firstPage.text=FriendListView.pageIndex+"";
			}else{
				this.firstPage.text=FriendListView.pageIndex+""
				if(FriendListView.leftBtnName=="leftBg2"){
					FriendListCtrl.getInstance().request_ManageUser();
				}else if(FriendListView.leftBtnName=="leftBg1" && FriendListView.topBtnName=="expBtn"){
					FriendListCtrl.getInstance().request_getUserList(FriendListView.pageIndex,"exp",null);
				}else if(FriendListView.leftBtnName=="leftBg1" && FriendListView.topBtnName=="goldBtn"){
					FriendListCtrl.getInstance().request_getUserList(FriendListView.pageIndex,"gold",null);
				}
			}
		}

		/** 下一页好友信息 */
		direction_right():void{
			console.log("==============>测试下一页按钮点击事件");
			if(FriendListModel.pageNums<2)
				return;
			FriendListView.pageIndex++;
			if(FriendListView.pageIndex>parseInt(this.pageNums.text)){
				FriendListView.pageIndex=parseInt(this.pageNums.text);
				this.firstPage.text=FriendListView.pageIndex+"";
			}else{
				this.firstPage.text=FriendListView.pageIndex+"";
				if(FriendListView.leftBtnName=="leftBg2"){
					FriendListCtrl.getInstance().request_ManageUser();
				}else if(FriendListView.leftBtnName=="leftBg1" && FriendListView.topBtnName=="expBtn"){
					FriendListCtrl.getInstance().request_getUserList(FriendListView.pageIndex,"exp",null);
				}else if(FriendListView.leftBtnName=="leftBg1" && FriendListView.topBtnName=="goldBtn"){
					FriendListCtrl.getInstance().request_getUserList(FriendListView.pageIndex,"gold",null);
				}
			}
		}

		gridItemClked(userVO:models.friendList.FriendInfoVO):void{
			// 好友信息
			if(parseInt(IdentityConfig.uid)==parseInt(userVO.userId)){
				TipLayerManager.tipLayer.showDrawBgTip("对方与您已经解除了好友关系，无法拜访对方的茶园！");
					return;
			}else{
				controllers.player.PlayerInfoCtrl.instance.request_getFriendInfo(userVO.userId);
			}
		}

		cancleBtnFn():void{
			this.tipView.visible=false;
			UILayerManager.teaGardenUI.removeChild(this.tipView);
        }
		closeBtnFn():void
		{
			this.tipView.visible=false;
			this.removeChild(this.tipView);
		    this.removeSelf();
		}
	}
}