namespace views.friedRoom.toolBar
{
	import Event = laya.events.Event;
	import Timer = laya.utils.Timer;
	import GameConfig = configs.GameConfig;
	import FireTeaHome_DownToolBarUI = ui.gameUI.toolBar.FireTeaHome_DownToolBarUI;
	import Image = laya.ui.Image;
	import FireTeaBagCtrl = controllers.friedRoom.bag.FireTeaBagCtrl;
	import UpGradePotCtrl=controllers.friedRoom.pot.UpGradePotCtrl;
	import IntensifyPotCtrl=controllers.friedRoom.pot.IntensifyPotCtrl;

	/**
	 * 下部工具条视图
	 */
	export class FireTeaHome_DownToolBarView extends FireTeaHome_DownToolBarUI
	{
		/** 当前显示的光标 */
		static curCursor:Image;
		static commonMouse:Laya.Button;
		private static _instance:FireTeaHome_DownToolBarView;

		constructor()
		{
			super();
			FireTeaHome_DownToolBarView.commonMouse=this.hand1;
			FireTeaHome_DownToolBarView.curCursor = new Image();
			// FireTeaHome_DownToolBarView.curCursor.name = "fireTeaCursor";

			this.mouseThrough = true;
			this.on(Event.CLICK,this,this.toolBarClkedFn);
		}

		static get instance():FireTeaHome_DownToolBarView
		{
			if(!FireTeaHome_DownToolBarView._instance)
				FireTeaHome_DownToolBarView._instance = new FireTeaHome_DownToolBarView();
			return FireTeaHome_DownToolBarView._instance;
		}

		/**
		 * 点击工具条上的各个功能按钮
		 */
		toolBarClkedFn(event:Event):void
		{
			let curName:string = event.target.name;

			// 普通手型光标
			if(curName =="hand1")
			{
				this.setShowTypeAndState2("hand1",this.hand1);

			} // 炒锅升级
			else if(curName =="pot_1")
			{
				this.setShowTypeAndState2("pot-1", this.pot_1);
				UpGradePotCtrl.getInstance().showUpGradeDialog();
				this.setShowTypeAndState2("hand1",this.hand1);

			} // 刷子
			else if(curName =="brush")
			{
				this.setShowTypeAndState2("brush", this.brush);

			} // 背包
			else if(curName === "bag")
			{
				FireTeaBagCtrl.getInstance().showFireTeaBagDialog();
				this.setShowTypeAndState2("hand1",this.hand1);

			 } // 炒锅强化
			else if(curName === "pot_2")
			{
                this.setShowTypeAndState2("pot-1", this.pot_1);
				IntensifyPotCtrl.getInstance().showPotIntensifyDialog();
				this.setShowTypeAndState2("hand1",this.hand1);

			} // 收获
			else if(curName === "hand2")
			{
				this.setShowTypeAndState2("hand2", this.hand2);
			} // 自动收获
			else if(curName =="hand3")
			{
				this.setShowTypeAndState2("hand3", this.hand3);

			}
		}

		/**
		 * 设置当前光标的类型和状态
		 * @param type 操作类型
		 * @param btnOrImg 图标对象，如 Button/Image
		 */
		setShowTypeAndState2(type:string,btnOrImg:any):void
		{
			configs.GameConfig.curOperateType = type;
			FireTeaHome_DownToolBarView.curCursor.skin = btnOrImg.skin;
			FireTeaHome_DownToolBarView.curCursor.name = btnOrImg.name;
			FireTeaHome_DownToolBarView.curCursor.x = btnOrImg.x;
			FireTeaHome_DownToolBarView.curCursor.y = btnOrImg.y - 50;

			if(btnOrImg.name == "hand1")
			{
				FireTeaHome_DownToolBarView.curCursor.pivotX = 5;
				FireTeaHome_DownToolBarView.curCursor.pivotY = 5;
			}
			else
			{
				FireTeaHome_DownToolBarView.curCursor.pivotX = 5;
				FireTeaHome_DownToolBarView.curCursor.pivotY = FireTeaHome_DownToolBarView.curCursor.height/2+10;
			}
		}


	}
}