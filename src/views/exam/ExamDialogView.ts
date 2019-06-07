namespace views.exam
{
	import Image = laya.ui.Image;
    import Stage = Laya.Stage;
    import Button=laya.ui.Button;
	import Box = laya.ui.Box;
	import Event = laya.events.Event;
	import ExamDialogUI = ui.gameUI.exam.ExamDialogUI;
    import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
    import questionDialogCtrl=controllers.exam.QuestionDialogCtrl;
    import examDialogCtrl=controllers.exam.ExamDialogCtrl;
    import examDialogModel=models.exam.ExamDialogModel;
    import examInfoVO = models.exam.ExamInfoVO;
    import playerInfoVO=models.player.PlayerInfoVO;

	/**
	 * 考试弹出面板
	 */
	export class ExamDialogView extends ExamDialogUI
	{
        /**
		 * Dialog底部边框
		 */
		bgUI:BaseBorderUI;
		// 图片路径
        imgPath:string="gameUI/exam/";
        //图片后缀名
        imgSuffix:string=".png";
        // 声明模糊滤镜
		blurFilter:Laya.BlurFilter=new Laya.BlurFilter();
        // 底部工具栏的高度
		private toolBarH: number = 30;
        examTipUI:ui.gameUI.tips.ExamTipUI;
        tipView:ui.gameUI.tips.ConfirmCancelTipUI;
        // 当前选中的标签名称
        curSelectTabName:string;
        curSelectTabId:number;
        examDialogCtrl:examDialogCtrl;
        examDialogModel:examDialogModel;

		constructor()
		{
			super();
            this.cacheAs = "bitmap";
            this.dragArea = `0,0,${this.width},60`;

            ////////// =>
			this.bgUI = new BaseBorderUI();
			this.bgUI.bgImg.size(540,388);
			this.bgUI.size(540,388);
			this.bgUI.addChild(this);

			this.bgUI.titleImg.skin = "gameUI/common/icon/examName.png";
			this.bgUI.titleImg.x = this.width-this.bgUI.titleImg.width>>1;
			this.bgUI.titleImg.y += 3;

			this.mouseThrough = true; // 解除closeBtn事件屏蔽
			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (540-600)/600;
			let hRate:number = (388-400)/400;
			this.bgUI.closeBtn.x += this.bgUI.closeBtn.x*wRate;
			this.bgUI.closeBtn.y -= this.bgUI.closeBtn.y*hRate;
			this.bgUI.closeBtn.scale(1.3,1.3);
			this.bgUI.closeBtn.on(Event.CLICK,this,this.closeView);
			////////// <=

            this.blurFilter.strength=2;
            this.examTipUI=new ui.gameUI.tips.ExamTipUI();
            this.tipView=new ui.gameUI.tips.ConfirmCancelTipUI;
            // this.closeBtn.on(Event.CLICK,this,this.closeView);
            for(let i:number=1;i<5;i++){
                (this.getChildByName("gradeImg"+i) as Image).skin=this.imgPath+"noPass_btn"+this.imgSuffix;
                (this.getChildByName("examBtn"+i) as Image).skin=this.imgPath+"font_btn"+this.imgSuffix;
                (this.getChildByName("imgIcon"+i) as Laya.Image).on(Event.MOUSE_OVER,this,this.showTip);
                (this.getChildByName("imgIcon"+i) as Laya.Image).on(Event.MOUSE_OUT,this,this.initTip);
                (this.getChildByName("examBtn"+i) as Laya.Image).on(Event.CLICK,this,this.startExam);
            }
		}

        /** 点击开始考试 */
        startExam(event:Event):void{
            let name:string=event.target.name;
            let lvl:string=name.substring(name.length-1);
            examDialogCtrl.getInstance().request_startExam(lvl);
        }
        showTip(event:Event):void{
            let name:string=event.target.name;
            this.curSelectTabName=name;
            this.curSelectTabId=parseInt(name.substring(name.length-1));
            // examDialogCtrl.getInstance().request_getTipInfo();
            this.showExamInfo(examDialogModel.instance.playerInfoVOArr);
        }
        initTip():void{
            this.examTipUI.visible=false;
        }

        showExamInfo(playInfoVOArr:Array<examInfoVO>):void{
            if(!playInfoVOArr){
                return;
            }
            let i:number;
            let len:number=playInfoVOArr.length;
            let userInfoVO:examInfoVO=new models.exam.ExamInfoVO();
            if(this.curSelectTabName==("imgIcon"+this.curSelectTabId)){
                let levelIcon:Image=this.getChildByName("imgIcon"+this.curSelectTabId) as Image;
                if(this.curSelectTabId==1){
                    this.examTipUI.examName.text="茶艺师铜牌资格考试";
                    this.examTipUI.examQualify1.text="角色等级达到11级";
                    this.examTipUI.examQualify2.text="";
                    this.examTipUI.passQualify.text="考试分数达到60分";
                    this.examTipUI.award.text="激活11~25级商城道具";
                }else if(this.curSelectTabId==2){
                    this.examTipUI.examName.text="茶艺师银牌资格考试";
                    this.examTipUI.examQualify1.text="角色等级达到26级";
                    this.examTipUI.examQualify2.text="已通过铜牌茶艺师考试";
                    this.examTipUI.passQualify.text="考试分数达到60分";
                    this.examTipUI.award.text="激活26~40级商城道具";
                }else if(this.curSelectTabId==3){
                    this.examTipUI.examName.text="茶艺师金牌资格考试";
                    this.examTipUI.examQualify1.text="角色等级达到41级";
                    this.examTipUI.examQualify2.text="已通过银牌茶艺师考试";
                    this.examTipUI.passQualify.text="考试分数达到60分";
                    this.examTipUI.award.text="激活41~60级商城道具";
                }else if(this.curSelectTabId==4){
                    this.examTipUI.examName.text="茶艺师白金资格考试";
                    this.examTipUI.examQualify1.text="角色等级达到61级";
                    this.examTipUI.examQualify2.text="已通过金牌茶艺师考试";
                    this.examTipUI.passQualify.text="考试分数达到60分";
                    this.examTipUI.award.text="激活61~80级商城道具";
                }
                if(len<this.curSelectTabId){
                    this.examTipUI.examScore.text="0分";
                }else{
                    userInfoVO=playInfoVOArr[this.curSelectTabId-1];
                    this.examTipUI.examScore.text=userInfoVO.examScore+"分";
                }
                this.examTipUI.visible=true;
                this.examTipUI.graphics.clear();
                this.examTipUI.graphics.drawRect(0,0,this.examTipUI.width,this.examTipUI.height,"#ffffe1");
                this.addChild(this.examTipUI);
                this.examTipUI.x=levelIcon.x+levelIcon.width+5;
                this.examTipUI.y=levelIcon.y-5;
            }
        }

        /** 判断得分显示相应分数图片 */
        setUserExamInfo(playInfoVOArr:Array<examInfoVO>):void{
            let i:number;
            let len:number=playInfoVOArr.length;
            let userInfoVO:examInfoVO=new models.exam.ExamInfoVO();
            let playerLvl:number= models.player.PlayerInfoModel.playerInfo.level;
            for(i=0;i<len;i++){
                userInfoVO=playInfoVOArr[i];
                let index:number=i+1;
                if(userInfoVO.examScore=="100"){
                    (this.getChildByName("gradeImg"+index) as Image).skin=this.imgPath+"perfect_btn"+this.imgSuffix;
                    (this.getChildByName("examBtn"+index) as Image).skin="";
                }else{
                    if(userInfoVO.examScore=="90"){
                    (this.getChildByName("gradeImg"+index) as Image).skin=this.imgPath+"ninety"+this.imgSuffix;
                    }else if(userInfoVO.examScore=="80"){
                        (this.getChildByName("gradeImg"+index) as Image).skin=this.imgPath+"eighty"+this.imgSuffix;
                    }else if(userInfoVO.examScore=="70"){
                        (this.getChildByName("gradeImg"+index) as Image).skin=this.imgPath+"seventy"+this.imgSuffix;
                    }else if(userInfoVO.examScore=="60"){
                        (this.getChildByName("gradeImg"+index) as Image).skin=this.imgPath+"sixty"+this.imgSuffix;
                    }else if(parseInt(userInfoVO.examScore)<60){
                        (this.getChildByName("gradeImg"+index) as Image).skin=this.imgPath+"noPass_btn"+this.imgSuffix;
                    }
                    (this.getChildByName("examBtn"+index) as Image).skin=this.imgPath+"testfont_btn"+this.imgSuffix;
                }
            }
            if(len==0){
                if(playerLvl>10){
                    (this.getChildByName("examBtn1") as Image).filters=[];
                    (this.getChildByName("examBtn1") as Image).mouseEnabled=true;
                    for(i=2;i<5;i++){
                        (this.getChildByName("examBtn"+i) as Image).disabled=true;
                    }
                }else{
                   for(i=1;i<5;i++){
                        (this.getChildByName("examBtn"+i) as Image).disabled=true;
                   }
                }
            }else if(len==4){
                for(i=1;i<5;i++){
                  (this.getChildByName("examBtn"+i) as Image).filters=[];
                  (this.getChildByName("examBtn"+i) as Image).mouseEnabled=true;
                }
            }else{
                for(i=4;i>len;i--){
                    (this.getChildByName("examBtn"+i) as Image).disabled=true;
                }
                if(parseInt(playInfoVOArr[len-1].examScore)>=60){
                    let index:number=len+1;
                    switch (len) {
                        case 1:
                                if(playerLvl>25){
                                    (this.getChildByName("examBtn"+index) as Image).filters=[];
                                    (this.getChildByName("examBtn"+index) as Image).mouseEnabled=true;
                                }else{
                                    (this.getChildByName("examBtn"+index) as Image).disabled=true;
                                }
                            break;
                        case 2:
                                if(playerLvl>40){
                                    (this.getChildByName("examBtn"+index) as Image).filters=[];
                                    (this.getChildByName("examBtn"+index) as Image).mouseEnabled=true;
                                }else{
                                    (this.getChildByName("examBtn"+index) as Image).disabled=true;
                                }
                            break;
                        case 3:
                                if(playerLvl>60){
                                    (this.getChildByName("examBtn"+index) as Image).filters=[];
                                    (this.getChildByName("examBtn"+index) as Image).mouseEnabled=true;
                                }else{
                                    (this.getChildByName("examBtn"+index) as Image).disabled=true;
                                }
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        /** 显示考试提示框 */
        setExamTip(receiveData:Object,takeData?:any):void{
            let examLvl:string=takeData["examLvl"]; //茶艺师等级“Id”
            this.tipView.contentTxt.text="参加本次考试需要支付"+ Math.abs(receiveData["_y"]) +"钻石，你确定参加吗";
            this.tipView.x = configs.GameConfig.GAME_WINDOW_WIDTH>>1 - this.tipView.width/2;
            this.tipView.y = configs.GameConfig.GAME_WINDOW_HEIGHT>>1- this.tipView.width/2;
            this.addChild(this.tipView);
            this.tipView.visible=true;
            this.tipView.confirmBtn.on(Event.CLICK,this,function():void{
                this.curSelectTabName="confirmBtn";
                (this.getChildByName("examBtn"+examLvl) as Image).skin=this.imgPath+"testfont_btn"+this.imgSuffix;
                models.player.PlayerInfoModel.playerInfo.diamond += receiveData["_y"];
                // 更新玩家信息
                controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                this.cancleBtnFn(this.curSelectTabName);
                // 请求考题,显示考题页面
                UILayerManager.uiLayer.removeChild(this);
                questionDialogCtrl.getInstance().showQuestionView(examLvl);

            });
            this.tipView.closeBtn.on(Event.CLICK,this,this.cancleBtnFn);
            this.tipView.cancelBtn.on(Event.CLICK,this,this.cancleBtnFn);
        }
        cancleBtnFn(curSelectTabName:string):void{
            this.tipView.visible=false;
            if(curSelectTabName=="confirmBtn"){
                this.bgUI.removeSelf();
            }
        }

        closeView():void{
            this.bgUI.removeSelf();
        }

	}
}