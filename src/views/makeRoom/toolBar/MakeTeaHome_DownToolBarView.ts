namespace views.makeRoom.toolBar
{
	import Event = laya.events.Event;
	import Timer = laya.utils.Timer;
	import GameConfig = configs.GameConfig;
	import MakeTeaHome_DownToolBarUI = ui.gameUI.toolBar.MakeTeaHome_DownToolBarUI;
	import MakeTeaDialogCtrl=controllers.makeRoom.MakeTeaDialogCtrl;
	import Image = laya.ui.Image;
	import MakeTeaDialogModel = models.makeRoom.MakeTeaDialogModel;
	import MakeTeaHomeModel = models.makeRoom.MakeTeaHomeModel;


	/**
	 * 下部工具条视图
	 */
	export class MakeTeaHome_DownToolBarView extends MakeTeaHome_DownToolBarUI
	{

		/** 当前显示的光标 */
		static curCursor:Image;
		static commonMouse:Laya.Button;
		private static _instance:MakeTeaHome_DownToolBarView;

		constructor()
		{
			super();
			MakeTeaHome_DownToolBarView.commonMouse=this.hand1;
			MakeTeaHome_DownToolBarView.curCursor = new Image();

			this.on(Event.CLICK,this,this.toolBarClkedFn);
		}

		static get instance():MakeTeaHome_DownToolBarView
		{
			if(!MakeTeaHome_DownToolBarView._instance)
				MakeTeaHome_DownToolBarView._instance = new MakeTeaHome_DownToolBarView();
			return MakeTeaHome_DownToolBarView._instance;
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

			} // 泡茶向导
			else if(curName =="guide")
			{
				let powerVO:models.base.SeedVO;
				let i:number;
				let len:number=MakeTeaHomeModel.makeTeaPowerVOArr.length;
				for(i=0;i<len;i++){
					powerVO=MakeTeaHomeModel.makeTeaPowerVOArr[i]
					if(powerVO.name=="hotUpWater" || powerVO.name=="finishDunkTea" || powerVO.name=="askDunk"){
						TipLayerManager.tipLayer.showDrawBgTip("正在泡茶过程中不能重复泡茶");

					}else if(MakeTeaDialogModel.friedWaterVOArr.length>0){
						TipLayerManager.tipLayer.showDrawBgTip("正在泡茶过程中不能重复泡茶");
					}else{
						MakeTeaDialogCtrl.getInstance().showMakeTeaDialog();
					}
				}
				this.setShowTypeAndState2("hand1",this.hand1);
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
			MakeTeaHome_DownToolBarView.curCursor.skin = btnOrImg.skin;
			MakeTeaHome_DownToolBarView.curCursor.name = btnOrImg.name;
			MakeTeaHome_DownToolBarView.curCursor.x = btnOrImg.x;
			MakeTeaHome_DownToolBarView.curCursor.y = btnOrImg.y - 50;

			console.info("当前选中 id："+btnOrImg.name+", skin:"+btnOrImg.skin);
		}

	}
}