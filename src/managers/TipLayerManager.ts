namespace managers
{
	// import TipLayer = views.layers.TipLayer;

	/**
	 * 弹出层管理器（最上层的弹出框）
	 */
	export class TipLayerManager
	{
		static tipLayer: views.layers.TipLayer;
		private static instance:TipLayerManager;

		/**
		 * 弹出层管理器
		 */
		constructor()
		{
			TipLayerManager.tipLayer = new views.layers.TipLayer();
			TipLayerManager.tipLayer.showMainSceneCursor();
		}

		static getInstance():TipLayerManager
		{
			if(!TipLayerManager.instance)
				TipLayerManager.instance = new TipLayerManager();
			return TipLayerManager.instance;
		}


		initTip():void
		{
		}

	}
}