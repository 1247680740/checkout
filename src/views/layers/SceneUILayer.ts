namespace views.layers
{
	import PlayerInfoView = views.player.PlayerInfoView;
	import BaseView = views.base.BaseView;
	import GameConfig = configs.GameConfig;
	/**
	 * 茶园场景UI层
	 */
	export class SceneUILayer extends BaseView
	{

		/** 底部工具栏 */
        downToolBarView: views.teaRoom.toolBar.DownToolBarView;
        /** 右下角工具栏 */
        rightDownToolBarView: views.teaRoom.toolBar.RightDownToolBarView;

		private static _instance:SceneUILayer;

		constructor()
		{
			super();

			this.downToolBarView = views.teaRoom.toolBar.DownToolBarView.instance;
			this.downToolBarView.name="downToolBarView";
            this.downToolBarView.x = (GameConfig.GAME_WINDOW_WIDTH - this.downToolBarView.width >> 1) >> 1;
			this.downToolBarView.x -= 50;
            this.downToolBarView.y = 570;
            this.addChild(this.downToolBarView);

            this.rightDownToolBarView = new views.teaRoom.toolBar.RightDownToolBarView();
			this.rightDownToolBarView.name="rightDownToolBarView";
            this.rightDownToolBarView.x = this.downToolBarView.x + this.downToolBarView.width + 20;
            this.rightDownToolBarView.y = 550;
            this.addChild(this.rightDownToolBarView);

			// 光标设置
            this.resetCursorState();
            Laya.timer.loop(100,this,this.updateCursorPosFn);
		}

		static get instance():SceneUILayer
		{
			if(!SceneUILayer._instance)
				SceneUILayer._instance = new SceneUILayer();
			return SceneUILayer._instance;
		}
		/**
         * 复位光标状态（普通鼠标类型）
         */
        resetCursorState():void
        {
			if(TipLayerManager.tipLayer)
			{
				if(!TipLayerManager.tipLayer.getChildByName("sceneCursor"))
					TipLayerManager.tipLayer.addChild(views.teaRoom.toolBar.DownToolBarView.curShowCursor);
			}
            this.downToolBarView.setShowTypeAndState("commonMouse",this.downToolBarView.commonMouse);
        }
        /**
		 * 更新光标位置
		 */
		private updateCursorPosFn()
		{
			views.teaRoom.toolBar.DownToolBarView.curShowCursor.x = Laya.stage.mouseX;
			views.teaRoom.toolBar.DownToolBarView.curShowCursor.y = Laya.stage.mouseY;
		}

	}
}