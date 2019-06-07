namespace managers
{
    // import SceneLayer = views.layers.SceneLayer;
    import FriendListView = views.friendList.FriendListView;

    /**
     * 场景层管理器
     */
    export class SceneLayerManager
    {
        /**
         * 茶园层
         */
        static sceneLayer: views.layers.SceneLayer;

        /**
         * 好友茶园层
         */
        static friendSceneLayer:views.layers.FriendSceneLayer;

        /**
         * 炒茶室层
         */
        static friedTeaSceneLayer: views.layers.FriedTeaHomeLayer;
        /**
         * 泡茶室层
         */
        static makeTeaSceneLayer: views.makeRoom.MakeTeaHomeLayer;

        /**
         * 层容器
         */
        private layersArr: views.base.BaseView[] = [];

        /**
         * 是否为首次显示
         */
        private isFirstShow: boolean = false;

        static instance: SceneLayerManager;

        constructor(interCls: InternalClass)
        {
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("SceneLayerManager is singleton, not allow to use constructor!");
        }

        static getInstance(): SceneLayerManager
        {
            if (!SceneLayerManager.instance)
                SceneLayerManager.instance = new SceneLayerManager(new InternalClass());
            return SceneLayerManager.instance;
        }

        /**
         * 茶园场景
         */
        initTeaGardenScene(): void
        {
            if (!SceneLayerManager.sceneLayer)
            {
                SceneLayerManager.sceneLayer = new views.layers.SceneLayer();
                SceneLayerManager.sceneLayer.name = "sceneLayer";
                SceneLayerManager.sceneLayer.addLandView();
                SceneLayerManager.sceneLayer.addTeaGardenView();
                this.layersArr.push(SceneLayerManager.sceneLayer);
            }
            this.switchSceneState(SceneLayerManager.sceneLayer);

            // 游戏初始化时若有活动则自动弹出活动窗口一次
            if (ResourceManager.activityObjArr)
            {
                if (!UILayerManager.uiLayer)
                    UILayerManager.getInstance();

                if (this.isFirstShow)
                {
                    this.isFirstShow = false;
                    UILayerManager.uiLayer.loadActivityTip();
                }
            }
        }

        /**
         * 炒茶场景
         */
        friedTeaScene(): void
        {
            if (!SceneLayerManager.friedTeaSceneLayer)
            {
                SceneLayerManager.friedTeaSceneLayer = new views.layers.FriedTeaHomeLayer();
                SceneLayerManager.friedTeaSceneLayer.name = "friedTeaSceneLayer";
                SceneLayerManager.friedTeaSceneLayer.addFriedTeaView();
                this.layersArr.push(SceneLayerManager.friedTeaSceneLayer);
            }
            this.switchSceneState(SceneLayerManager.friedTeaSceneLayer);
        }

        /**
         * 泡茶场景
         */
        makeTeaScene(): void
        {
            if (!SceneLayerManager.makeTeaSceneLayer)
            {
                SceneLayerManager.makeTeaSceneLayer = new views.makeRoom.MakeTeaHomeLayer();
                SceneLayerManager.makeTeaSceneLayer.name = "makeTeaSceneLayer";
                SceneLayerManager.makeTeaSceneLayer.loadBg();
                Laya.stage.addChildAt(SceneLayerManager.makeTeaSceneLayer, 0);

                this.layersArr.push(SceneLayerManager.makeTeaSceneLayer);
            }
            else
            {
                SceneLayerManager.makeTeaSceneLayer.loadBg();
            }
            this.switchSceneState(SceneLayerManager.makeTeaSceneLayer);
        }

        /**
         * 好友茶园场景
         */
        friendGardenScene() :void
        {
            if (!SceneLayerManager.friendSceneLayer)
            {
                SceneLayerManager.friendSceneLayer = new views.layers.FriendSceneLayer();
                SceneLayerManager.friendSceneLayer.name = "friendSceneLayer";
                Laya.stage.addChildAt(SceneLayerManager.friendSceneLayer,0);
                // Laya.stage.addChild(SceneLayerManager.friendSceneLayer);
                SceneLayerManager.friendSceneLayer.addFriendLandView();
                SceneLayerManager.friendSceneLayer.addTeaGardenView();
                this.layersArr.push(SceneLayerManager.friendSceneLayer);
            }
            else
            {
                SceneLayerManager.friendSceneLayer.graphics.clear();
                SceneLayerManager.friendSceneLayer.resetLoadBg(models.teaRoom.TeaGardenModel.decorationVOArr);
                SceneLayerManager.friendSceneLayer.addFriendLandView();
                SceneLayerManager.friendSceneLayer.addTeaGardenView();
            }

            this.switchSceneState(SceneLayerManager.friendSceneLayer);
        }

        /**
         * 切换场景间的显示状态
         * @param curLayer 需显示的场景，其它的隐藏
         */
        private switchSceneState(curLayer: views.base.BaseView): void
        {
            if (this.layersArr.length == 0)
                return;
            if (!curLayer)
                return;
            let i: number;
            let len: number = this.layersArr.length;
            let view: views.base.BaseView;
            for (i = 0; i < len; i++)
            {
                view = this.layersArr[i];
                if (!view)
                    continue;

                if (curLayer.name == view.name)
                    curLayer.visible = true;
                else
                    view.visible = false;
            }
        }
    }

    class InternalClass
    {

    }
}