
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui.gameUI.common {
    export class BagGridItemUI extends View {
		public box:Laya.Box;
		public imgContainer:Laya.Image;
		public lvl:Laya.Label;
		public nums:Laya.Label;
		public typeIcon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":66,"height":66},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"box","mouseThrough":true,"mouseEnabled":true,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"skin":"gameUI/common/icon/girdIconBg.png","mouseEnabled":false}},{"type":"Image","props":{"y":8,"x":7,"width":50,"var":"imgContainer","height":50}},{"type":"Label","props":{"y":4,"x":4,"var":"lvl","mouseEnabled":false,"color":"#362d7a"}},{"type":"Label","props":{"y":50,"x":46,"var":"nums","mouseEnabled":false,"color":"#362d7a"}},{"type":"Image","props":{"y":0,"x":33,"var":"typeIcon","mouseEnabled":false}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.common.BagGridItemUI.uiView);
        }
    }
}

module ui.gameUI.common {
    export class BaseBorderUI extends Dialog {
		public bgImg:Laya.Image;
		public titleImg:Laya.Image;
		public closeBtn:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":600,"height":400,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":2,"x":0,"width":597,"var":"bgImg","skin":"gameUI/common/imgs/bg.png","height":395}},{"type":"Image","props":{"y":10,"x":150,"var":"titleImg","name":"titleImg"}},{"type":"Button","props":{"y":11,"x":531,"width":31,"var":"closeBtn","stateNum":1,"skin":"gameUI/common/icon/close.png","sizeGrid":"0,0,0,0","name":"closeBtn","height":31}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.common.BaseBorderUI.uiView);
        }
    }
}

module ui.gameUI.common {
    export class GridItemUI extends View {
		public box:Laya.Box;
		public imgBg:Laya.Image;
		public imgContainer:Laya.Image;
		public typeIcon:Laya.Image;
		public lvl:Laya.Label;
		public nums:Laya.Label;
		public nameTxt:Laya.Label;
		public salePrice:Laya.TextInput;
		public priceIcon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":75,"height":110},"child":[{"type":"Image","props":{"y":0,"x":0,"width":75,"skin":"gameUI/common/icon/gridBg.png","height":110}},{"type":"Box","props":{"y":2,"x":4,"var":"box","mouseThrough":true,"mouseEnabled":true},"child":[{"type":"Image","props":{"width":66,"var":"imgBg","skin":"gameUI/common/icon/girdIconBg.png","mouseEnabled":false,"height":66}},{"type":"Image","props":{"y":8,"x":8,"width":50,"var":"imgContainer","height":50}},{"type":"Image","props":{"y":0,"x":33,"var":"typeIcon","mouseEnabled":false}},{"type":"Label","props":{"y":4,"x":4,"var":"lvl","mouseEnabled":false,"color":"#362d7a"}},{"type":"Label","props":{"y":50,"x":46,"var":"nums","mouseEnabled":false,"color":"#362d7a"}},{"type":"Label","props":{"y":70,"x":0,"width":67,"var":"nameTxt","height":18,"color":"#441918","bold":true,"align":"center"}},{"type":"TextInput","props":{"y":88,"x":7,"width":59,"var":"salePrice","skin":"comp/textinput.png","height":15,"align":"center"}},{"type":"Image","props":{"y":87,"x":-1,"var":"priceIcon","skin":"gameUI/common/icon/money.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.common.GridItemUI.uiView);
        }
    }
}

module ui.gameUI.common {
    export class LoadingUI extends View {
		public bg:Laya.Image;
		public progressBar:Laya.ProgressBar;
		public progressTxt:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":1000,"height":600},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg","skin":"gameUI/common/loading/bg.jpg"}},{"type":"ProgressBar","props":{"y":479,"x":436,"var":"progressBar","skin":"comp/progressBar.png"}},{"type":"Label","props":{"y":500,"x":447,"width":82,"var":"progressTxt","valign":"middle","height":23,"fontSize":12,"bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.common.LoadingUI.uiView);
        }
    }
}

module ui.gameUI.common {
    export class TabItemUI extends View {
		public selectBg:Laya.Image;
		public unSelectBg:Laya.Image;
		public tabName:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":92,"height":73},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"var":"selectBg","skin":"gameUI/common/icon/select.png"}},{"type":"Image","props":{"y":3,"x":5,"var":"unSelectBg","skin":"gameUI/common/icon/unselectBg.png"}},{"type":"Image","props":{"y":10,"x":11,"var":"tabName","skin":"gameUI/common/icon/seedTabBg.png"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.common.TabItemUI.uiView);
        }
    }
}

module ui.gameUI.exam {
    export class ExamDialogUI extends Dialog {
		public examBtn1:Laya.Image;
		public examBtn2:Laya.Image;
		public examBtn3:Laya.Image;
		public examBtn4:Laya.Image;
		public gradeImg1:Laya.Image;
		public gradeImg2:Laya.Image;
		public gradeImg3:Laya.Image;
		public gradeImg4:Laya.Image;
		public imgIcon1:Laya.Image;
		public imgIcon2:Laya.Image;
		public imgIcon3:Laya.Image;
		public imgIcon4:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":540,"height":388},"child":[{"type":"Image","props":{"y":105,"x":28,"width":238,"skin":"gameUI/exam/background.png","height":109}},{"type":"Image","props":{"y":105,"x":274,"width":238,"skin":"gameUI/exam/background.png","height":109}},{"type":"Image","props":{"y":228,"x":28,"width":238,"skin":"gameUI/exam/background.png","height":109}},{"type":"Image","props":{"y":228,"x":274,"width":238,"skin":"gameUI/exam/background.png","height":109}},{"type":"Image","props":{"y":183,"x":134,"var":"examBtn1","skin":"gameUI/exam/font_btn.png","name":"examBtn1"}},{"type":"Image","props":{"y":181,"x":382,"var":"examBtn2","skin":"gameUI/exam/font_btn.png","name":"examBtn2"}},{"type":"Image","props":{"y":305,"x":134,"var":"examBtn3","skin":"gameUI/exam/font_btn.png","name":"examBtn3"}},{"type":"Image","props":{"y":305,"x":382,"var":"examBtn4","skin":"gameUI/exam/font_btn.png","name":"examBtn4"}},{"type":"Image","props":{"y":125,"x":136,"width":104,"var":"gradeImg1","name":"gradeImg1","height":53}},{"type":"Image","props":{"y":125,"x":380,"width":104,"var":"gradeImg2","name":"gradeImg2","height":53}},{"type":"Image","props":{"y":249,"x":136,"width":104,"var":"gradeImg3","name":"gradeImg3","height":53}},{"type":"Image","props":{"y":249,"x":380,"width":104,"var":"gradeImg4","name":"gradeImg4","height":53}},{"type":"Image","props":{"y":114,"x":35,"width":95,"var":"imgIcon1","skin":"gameUI/exam/grading_one.png","name":"imgIcon1","height":90}},{"type":"Image","props":{"y":115,"x":283,"width":95,"var":"imgIcon2","skin":"gameUI/exam/grading_two.png","name":"imgIcon2","height":90}},{"type":"Image","props":{"y":238,"x":35,"width":95,"var":"imgIcon3","skin":"gameUI/exam/grading_three.png","name":"imgIcon3","height":90}},{"type":"Image","props":{"y":238,"x":283,"width":95,"var":"imgIcon4","skin":"gameUI/exam/grading_four.png","name":"imgIcon4","height":90}},{"type":"Box","props":{"y":102,"x":90},"child":[{"type":"Label","props":{"y":256,"x":78,"text":"相关知识请查看道具介绍或茶百科！","fontSize":15,"color":"#783910","bold":true}},{"type":"Label","props":{"y":10,"x":106,"text":"铜牌茶艺师","fontSize":12,"font":"SimSun"}},{"type":"Label","props":{"y":10,"x":352,"text":"银牌茶艺师","fontSize":12,"font":"SimSun"}},{"type":"Label","props":{"y":132,"x":106,"text":"金牌茶艺师","fontSize":12,"font":"SimSun"}},{"type":"Label","props":{"y":132,"x":352,"text":"白金茶艺师","fontSize":12,"font":"SimSun"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.exam.ExamDialogUI.uiView);
        }
    }
}

module ui.gameUI.exam {
    export class TestTopicsUI extends Dialog {
		public result:Laya.Image;
		public title:Laya.TextArea;
		public option1:Laya.Label;
		public option2:Laya.Label;
		public option3:Laya.Label;
		public option4:Laya.Label;
		public score:Laya.Label;
		public nums:Laya.Label;
		public timeRemain:Laya.Label;
		public testIndex:Laya.Label;
		public affirmBtn:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":540,"height":388},"child":[{"type":"Image","props":{"y":239,"x":402,"var":"result"}},{"type":"TextArea","props":{"y":85,"x":104,"width":332,"var":"title","type":"text","name":"title","leading":4,"height":76,"fontSize":15,"color":"#53270B","bold":true}},{"type":"Label","props":{"y":172,"x":186,"width":106,"var":"option1","height":21,"color":"#734D0E"}},{"type":"Label","props":{"y":204,"x":186,"width":106,"var":"option2","color":"#734D0E"}},{"type":"Label","props":{"y":236,"x":186,"width":106,"var":"option3","color":"#734D0E"}},{"type":"Label","props":{"y":264,"x":186,"width":106,"var":"option4","color":"#734D0E"}},{"type":"Label","props":{"y":337,"x":85,"text":"当前得分：","fontSize":15,"color":"#53270B","bold":true}},{"type":"Label","props":{"y":337,"x":170,"width":24,"var":"score","height":15,"fontSize":15,"font":"SimHei","color":"#53270B","bold":true}},{"type":"Label","props":{"y":337,"x":248,"text":"共：","fontSize":15,"font":"SimHei","color":"#53270B","bold":true}},{"type":"Label","props":{"y":337,"x":280,"width":22,"var":"nums","text":10,"height":15,"fontSize":15,"font":"SimHei","color":"#53270B","bold":true}},{"type":"Label","props":{"y":337,"x":307,"text":"题","fontSize":15,"font":"SimHei","color":"#53270B","bold":true}},{"type":"Label","props":{"y":329,"x":366,"width":27,"var":"timeRemain","text":30,"height":39,"fontSize":30,"font":"SimHei","color":"#f30c08","bold":true}},{"type":"Label","props":{"y":87,"x":80,"var":"testIndex","fontSize":15,"font":"SimHei","color":"#53270B","bold":true}},{"type":"Button","props":{"y":333,"x":419,"width":79,"var":"affirmBtn","stateNum":1,"skin":"gameUI/exam/yes.png","height":26}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.exam.TestTopicsUI.uiView);
        }
    }
}

module ui.gameUI.friendList {
    export class FriendListUI extends View {
		public closeBtn:Laya.Button;
		public searchBtn:Laya.Button;
		public freshBtn:Laya.Button;
		public lastPageBtn:Laya.Button;
		public nextPageBtn:Laya.Button;
		public firstPage:Laya.Label;
		public pageNums:Laya.Label;
		public topLeftBtn:Laya.Box;
		public topBg1:Laya.Image;
		public expLove:Laya.Image;
		public expOrderTitle:Laya.Image;
		public topRightBtn:Laya.Box;
		public topBg2:Laya.Image;
		public topGold:Laya.Image;
		public goldOrderTitle:Laya.Image;
		public personList:Laya.Box;
		public leftBg1:Laya.Button;
		public personManage:Laya.Box;
		public leftBg2:Laya.Button;
		public addPersonBtn:Laya.Box;
		public addPersonBg:Laya.Image;
		public addPersonTitle:Laya.Image;
		public gridContainer:Laya.Panel;
		public serchName:Laya.TextInput;

        public static  uiView:any ={"type":"View","props":{"width":280,"height":523},"child":[{"type":"Image","props":{"y":0,"x":8,"width":276,"skin":"gameUI/friendList/bigDialogBg.png","height":523}},{"type":"Button","props":{"y":8,"x":238,"width":49,"var":"closeBtn","stateNum":1,"skin":"gameUI/friendList/close_Btn.png","name":"closeBtn","height":46}},{"type":"Image","props":{"y":11,"x":49,"skin":"gameUI/friendList/friendTitle.png"}},{"type":"Image","props":{"y":92,"x":44,"skin":"gameUI/friendList/serchBg.png"}},{"type":"Button","props":{"y":92,"x":211,"width":20,"var":"searchBtn","stateNum":1,"skin":"gameUI/friendList/search.png","name":"searchBtn","height":20}},{"type":"Button","props":{"y":92,"x":237,"width":20,"var":"freshBtn","stateNum":1,"skin":"gameUI/friendList/fresh.png","name":"freshBtn","height":20}},{"type":"Image","props":{"y":149,"x":26,"width":235,"skin":"gameUI/friendList/centerBg.png","height":319}},{"type":"Button","props":{"y":490,"x":64,"width":31,"var":"lastPageBtn","stateNum":1,"skin":"gameUI/friendList/btn_-1.png","pivotY":-3,"pivotX":-6,"name":"lastPageBtn","height":26}},{"type":"Button","props":{"y":490,"x":180,"width":31,"var":"nextPageBtn","stateNum":1,"skin":"gameUI/friendList/btn_+1.png","name":"nextPageBtn","height":26}},{"type":"Label","props":{"y":495,"x":115,"width":20,"var":"firstPage","valign":"middle","overflow":"scroll","name":"firstPage","height":20,"fontSize":18,"font":"SimHei","align":"center"}},{"type":"Label","props":{"y":500,"x":130,"width":20,"valign":"middle","text":"/","height":13,"fontSize":18,"font":"SimHei","align":"center"}},{"type":"Label","props":{"y":495,"x":145,"width":20,"var":"pageNums","valign":"middle","overflow":"scroll","name":"pageNums","height":20,"fontSize":18,"font":"SimHei","align":"center"}},{"type":"Box","props":{"y":118,"x":39,"var":"topLeftBtn"},"child":[{"type":"Image","props":{"var":"topBg1","skin":"gameUI/friendList/topBg1.png","name":"topBg1"}},{"type":"Image","props":{"y":4,"x":3,"var":"expLove","skin":"gameUI/friendList/love.png","name":"expLove"}},{"type":"Image","props":{"y":8,"x":25,"var":"expOrderTitle","skin":"gameUI/friendList/experience.png","name":"expOrderTitle"}}]},{"type":"Box","props":{"y":118,"x":144,"var":"topRightBtn"},"child":[{"type":"Image","props":{"width":102,"var":"topBg2","skin":"gameUI/friendList/topBg2.png","name":"topBg2","height":27}},{"type":"Image","props":{"y":4,"x":3,"var":"topGold","skin":"gameUI/friendList/goldPic.png","name":"topGold"}},{"type":"Image","props":{"y":8,"x":25,"var":"goldOrderTitle","skin":"gameUI/friendList/gold.png","name":"goldOrderTitle"}}]},{"type":"Box","props":{"y":168,"x":0,"var":"personList","name":"personList"},"child":[{"type":"Button","props":{"width":28,"var":"leftBg1","stateNum":1,"skin":"gameUI/friendList/leftBg.png","name":"leftBg1","height":122}},{"type":"Image","props":{"y":15,"x":7,"skin":"gameUI/friendList/friList.png"}}]},{"type":"Box","props":{"y":289,"x":0,"var":"personManage","name":"personManage"},"child":[{"type":"Button","props":{"width":28,"var":"leftBg2","stateNum":1,"skin":"gameUI/friendList/leftBg1.png","name":"leftBg2","height":122}},{"type":"Image","props":{"y":15,"x":7,"skin":"gameUI/friendList/friManage.png"}}]},{"type":"Box","props":{"y":90,"x":205,"visible":false,"var":"addPersonBtn","name":"addPersonBtn"},"child":[{"type":"Image","props":{"width":57,"var":"addPersonBg","skin":"gameUI/friendList/addPersonBg.png","name":"addPersonBg","height":22}},{"type":"Image","props":{"y":6,"x":6,"width":46,"var":"addPersonTitle","skin":"gameUI/friendList/addPersonTitle.png","name":"addPersonTitle","height":12}}]},{"type":"Panel","props":{"y":149,"x":26,"width":235,"var":"gridContainer","name":"gridContainer","height":318}},{"type":"TextInput","props":{"y":92,"x":44,"width":160,"var":"serchName","valign":"middle","type":"text","overflow":"scroll","name":"serchName","height":20,"fontSize":13,"font":"SimSun","align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.friendList.FriendListUI.uiView);
        }
    }
}

module ui.gameUI.friendList {
    export class SearchPalsUI extends Dialog {
		public listTitleBg:Laya.Image;
		public listTitle:Laya.Image;
		public dialogTitle:Laya.Image;
		public closeBtn:Laya.Button;
		public lastPageBtn:Laya.Button;
		public nextPageBtn:Laya.Button;
		public firstPage:Laya.Label;
		public line:Laya.Label;
		public pageNums:Laya.Label;
		public gridContainer:Laya.Panel;
		public addAllBtn:Laya.Box;
		public addAllBtnBg:Laya.Button;
		public addAllBtn1:Laya.Box;
		public botoom:Laya.TextArea;

        public static  uiView:any ={"type":"Dialog","props":{"width":300,"height":445},"child":[{"type":"Image","props":{"y":0,"x":0,"width":270,"skin":"gameUI/friendList/samllBg.png","height":444}},{"type":"Image","props":{"y":57,"x":32,"var":"listTitleBg","skin":"gameUI/friendList/applyTopBg.png","name":"listTitleBg"}},{"type":"Image","props":{"y":61,"x":50,"var":"listTitle","skin":"gameUI/friendList/applyTip.png","name":"listTitle"}},{"type":"Image","props":{"y":21,"x":96,"var":"dialogTitle","skin":"gameUI/friendList/searchPalTitle.png","name":"dialogTitle"}},{"type":"Button","props":{"y":14,"x":211,"width":40,"var":"closeBtn","stateNum":1,"skin":"gameUI/friendList/close_Btn.png","name":"closeBtn","height":40}},{"type":"Image","props":{"y":95,"x":26,"width":221,"skin":"gameUI/friendList/centerBg.png","height":281}},{"type":"Button","props":{"y":377,"x":80,"var":"lastPageBtn","stateNum":1,"skin":"gameUI/friendList/btn_-1.png","name":"lastPageBtn"}},{"type":"Button","props":{"y":377,"x":172,"var":"nextPageBtn","stateNum":1,"skin":"gameUI/friendList/btn_+1.png","name":"nextPageBtn"}},{"type":"Label","props":{"y":378,"x":113,"width":14,"var":"firstPage","valign":"middle","overflow":"scroll","name":"firstPage","height":15,"fontSize":15,"font":"Microsoft YaHei","color":"#2d2c2c","align":"center"}},{"type":"Label","props":{"y":377,"x":131,"width":12,"var":"line","valign":"middle","text":"/","name":"line","height":15,"fontSize":15,"font":"Microsoft YaHei","color":"#272626","bold":true,"align":"center"}},{"type":"Label","props":{"y":378,"x":143,"width":14,"var":"pageNums","valign":"middle","overflow":"scroll","name":"pageNums","height":15,"fontSize":15,"font":"Microsoft YaHei","color":"#2d2c2c","align":"center"}},{"type":"Panel","props":{"y":95,"x":26,"width":258,"var":"gridContainer","vScrollBarSkin":"comp/vscroll.png","name":"gridContainer","height":281}},{"type":"Box","props":{"y":399,"x":92,"var":"addAllBtn","name":"addAllBtn"},"child":[{"type":"Image","props":{"skin":"gameUI/friendList/agreeAllBg.png"}},{"type":"Button","props":{"y":6,"x":6,"var":"addAllBtnBg","stateNum":1,"skin":"gameUI/friendList/addAllTip.png"}}]},{"type":"Box","props":{"y":398,"x":31,"var":"addAllBtn1","name":"addAllBtn1"},"child":[{"type":"Image","props":{"width":59,"skin":"gameUI/friendList/agreeAllBg.png","height":25}},{"type":"Button","props":{"y":6,"x":8,"width":44,"stateNum":1,"skin":"gameUI/friendList/addAllTip.png","height":14}}]},{"type":"TextArea","props":{"y":399,"x":95,"width":138,"var":"botoom","text":"每天系统会向您推荐一次好友好友越多，快乐越多呦！","name":"botoom","height":28,"fontSize":10,"font":"Microsoft YaHei","color":"#b19484","bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.friendList.SearchPalsUI.uiView);
        }
    }
}

module ui.gameUI.friendList {
    export class SinglePersonUI extends View {
		public orderBg:Laya.Image;
		public orderNum:Laya.Label;
		public headPic:Laya.Image;
		public personName:Laya.Label;
		public statusPic:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":210,"height":43},"child":[{"type":"Image","props":{"skin":"gameUI/friendList/singleBg.png"}},{"type":"Image","props":{"y":13,"x":5,"width":20,"var":"orderBg","name":"orderBg","height":20}},{"type":"Label","props":{"y":13,"x":5,"width":20,"var":"orderNum","valign":"middle","overflow":"scroll","name":"orderNum","height":20,"font":"SimSun","color":"#000000","bgColor":"#ffffff","align":"center"}},{"type":"Image","props":{"y":4,"x":31,"width":38,"var":"headPic","name":"headPic","height":38}},{"type":"Label","props":{"y":12,"x":74,"width":103,"var":"personName","valign":"middle","overflow":"scroll","name":"personName","height":21,"font":"SimSun","color":"#000000","align":"center"}},{"type":"Image","props":{"y":12,"x":181,"width":20,"var":"statusPic","name":"statusPic","height":20}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.friendList.SinglePersonUI.uiView);
        }
    }
}

module ui.gameUI.land {
    export class LandGridUI extends View {
		public commonLand:Laya.Image;
		public blackLand:Laya.Image;
		public redLand:Laya.Image;
		public dryBlackLand:Laya.Image;
		public dryRedLand:Laya.Image;
		public dryCommonLand:Laya.Image;
		public disableLand:Laya.Image;
		public disableTip:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":140,"height":77,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":0,"x":0,"visible":false,"var":"commonLand","skin":"gameUI/land/commonLandBg.png"}},{"type":"Image","props":{"y":0,"x":0,"visible":false,"var":"blackLand","skin":"gameUI/land/blackLandBg.png"}},{"type":"Image","props":{"y":0,"x":0,"visible":false,"var":"redLand","skin":"gameUI/land/redLandBg.png"}},{"type":"Image","props":{"y":0,"x":0,"visible":false,"var":"dryBlackLand","skin":"gameUI/land/dryBlackLandBg.png"}},{"type":"Image","props":{"y":0,"x":0,"visible":false,"var":"dryRedLand","skin":"gameUI/land/dryRedLandBg.png"}},{"type":"Image","props":{"y":0,"x":0,"visible":false,"var":"dryCommonLand","skin":"gameUI/land/dryCommonLandBg.png"}},{"type":"Image","props":{"y":0,"x":0,"visible":false,"var":"disableLand","skin":"gameUI/land/unUseLandBg.png"}},{"type":"Button","props":{"y":0,"x":35,"visible":false,"var":"disableTip","stateNum":1,"skin":"gameUI/land/unUseLandTipBg.png","mouseEnabled":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.land.LandGridUI.uiView);
        }
    }
}

module ui.gameUI.makeTea {
    export class MakeTeaDialogUI extends Dialog {
		public right_top:Laya.Box;
		public teaSet:Laya.Label;
		public water:Laya.Label;
		public remtemp:Laya.Label;
		public optimal:Laya.Label;
		public curTeam:Laya.Label;
		public btn:Laya.Box;
		public btn_affirm:Laya.Button;
		public btn_cancel:Laya.Button;
		public btn_buy1:Laya.Button;
		public btn_buy2:Laya.Button;
		public btn_buy3:Laya.Button;
		public btn_sub:Laya.Button;
		public btn_add:Laya.Button;
		public numBtn_sub:Laya.Button;
		public numBtn_add:Laya.Button;
		public btn_direction_down:Laya.Button;
		public btn_direction_top:Laya.Button;
		public sub1:Laya.Button;
		public add1:Laya.Button;
		public sub2:Laya.Button;
		public add2:Laya.Button;
		public sub3:Laya.Button;
		public add3:Laya.Button;
		public tab1:Laya.Box;
		public whiteBg:Laya.Image;
		public grayBg:Laya.Image;
		public tab2:Laya.Box;
		public tab3:Laya.Box;
		public tab4:Laya.Box;
		public tab5:Laya.Box;
		public tab6:Laya.Box;
		public tab7:Laya.Box;
		public tab8:Laya.Box;
		public tab9:Laya.Box;
		public need1:Laya.Label;
		public lock1:Laya.Label;
		public need2:Laya.Label;
		public lock2:Laya.Label;
		public note:Laya.Label;
		public teaName_top:Laya.Label;
		public teacher:Laya.Label;
		public symbom:Laya.Label;
		public makeTeaNums:Laya.Label;
		public iconImg:Laya.Image;
		public data1:Laya.Image;
		public data2:Laya.Image;
		public data3:Laya.Image;
		public teaNums:Laya.TextInput;
		public data1Name:Laya.Label;
		public data2Name:Laya.Label;
		public data3Name:Laya.Label;
		public gridContainer:Laya.Panel;

        public static  uiView:any ={"type":"Dialog","props":{"width":768,"height":470},"child":[{"type":"Image","props":{"y":78,"x":12,"skin":"gameUI/fireTea/left_background.png"}},{"type":"Image","props":{"y":84,"x":211,"width":545,"skin":"gameUI/fireTea/logbag_border.png","height":376}},{"type":"Image","props":{"y":108,"x":501,"skin":"gameUI/fireTea/bag_border.png"}},{"type":"Image","props":{"y":105,"x":232,"width":197,"skin":"gameUI/fireTea/top_back.png","height":138}},{"type":"Image","props":{"y":213,"x":252,"width":165,"skin":"gameUI/fireTea/plate.png","height":39}},{"type":"Image","props":{"y":293,"x":232,"skin":"gameUI/common/icon/girdIconBg.png"}},{"type":"Image","props":{"y":313,"x":309,"skin":"gameUI/fireTea/symbol.png"}},{"type":"Image","props":{"y":293,"x":346,"skin":"gameUI/common/icon/girdIconBg.png"}},{"type":"Image","props":{"y":313,"x":428,"skin":"gameUI/fireTea/symbol.png"}},{"type":"Image","props":{"y":293,"x":471,"skin":"gameUI/common/icon/girdIconBg.png"}},{"type":"Image","props":{"y":313,"x":542,"skin":"gameUI/fireTea/symbol.png"}},{"type":"Image","props":{"y":103,"x":268,"skin":"gameUI/fireTea/font_border.png"}},{"type":"Image","props":{"y":258,"x":308,"skin":"gameUI/fireTea/small_border.png"}},{"type":"Image","props":{"y":363,"x":241,"width":60,"skin":"gameUI/fireTea/small_border.png","height":20}},{"type":"Image","props":{"y":363,"x":350,"width":65,"skin":"gameUI/fireTea/small_border.png","height":20}},{"type":"Image","props":{"y":363,"x":478,"width":60,"skin":"gameUI/fireTea/small_border.png","height":20}},{"type":"Image","props":{"y":393,"x":601,"skin":"gameUI/fireTea/small_border.png"}},{"type":"Box","props":{"y":170,"x":593,"var":"right_top","name":"right_top"},"child":[{"type":"Label","props":{"y":-17,"x":-25,"var":"teaSet","name":"teaSet"}},{"type":"Label","props":{"y":4,"x":-25,"var":"water","name":"water"}},{"type":"Label","props":{"y":25,"x":-25,"var":"remtemp","name":"remtemp"}},{"type":"Label","props":{"y":46,"x":-25,"var":"optimal","name":"optimal"}},{"type":"Label","props":{"y":69,"x":-25,"var":"curTeam","name":"curTeam","color":"#f80c08"}}]},{"type":"Box","props":{"y":88,"x":108,"width":583,"var":"btn","name":"btn","height":379},"child":[{"type":"Button","props":{"y":339,"x":401,"var":"btn_affirm","stateNum":1,"skin":"gameUI/common/icon/btn_affirm.png","name":"btn_affirm"}},{"type":"Button","props":{"y":338,"x":515,"var":"btn_cancel","stateNum":1,"skin":"gameUI/common/icon/btn_cancel.png","name":"btn_cancel"}},{"type":"Button","props":{"y":330,"x":128,"var":"btn_buy1","stateNum":1,"skin":"gameUI/common/icon/btn_buy_small.png","name":"btn_buy1"}},{"type":"Button","props":{"y":330,"x":244,"var":"btn_buy2","stateNum":1,"skin":"gameUI/common/icon/btn_buy_small.png","name":"btn_buy2"}},{"type":"Button","props":{"y":174,"x":332,"var":"btn_buy3","stateNum":1,"skin":"gameUI/common/icon/btn_buy_small.png","name":"btn_buy3"}},{"type":"Button","props":{"y":305,"x":467,"var":"btn_sub","stateNum":1,"skin":"gameUI/common/icon/btn_-1.png","name":"btn_sub"}},{"type":"Button","props":{"y":305,"x":563,"var":"btn_add","stateNum":1,"skin":"gameUI/common/icon/btn_+1.png","name":"btn_add"}},{"type":"Button","props":{"y":169,"x":182,"var":"numBtn_sub","stateNum":1,"skin":"gameUI/common/icon/btn_-1.png","name":"numBtn_sub"}},{"type":"Button","props":{"y":169,"x":273,"var":"numBtn_add","stateNum":1,"skin":"gameUI/common/icon/btn_+1.png","name":"numBtn_add"}},{"type":"Button","props":{"y":355,"var":"btn_direction_down","stateNum":1,"skin":"gameUI/fireTea/btn_bottom.png","name":"btn_direction_down"}},{"type":"Button","props":{"var":"btn_direction_top","stateNum":1,"skin":"gameUI/fireTea/btn_top.png","name":"btn_direction_top"}},{"type":"Button","props":{"y":274,"x":113,"var":"sub1","stateNum":1,"skin":"gameUI/common/icon/btn_-1.png","name":"sub"}},{"type":"Button","props":{"y":274,"x":191,"var":"add1","stateNum":1,"skin":"gameUI/common/icon/btn_+1.png","name":"add"}},{"type":"Button","props":{"y":274,"x":222,"var":"sub2","stateNum":1,"skin":"gameUI/common/icon/btn_-1.png","name":"sub2"}},{"type":"Button","props":{"y":274,"x":305,"var":"add2","stateNum":1,"skin":"gameUI/common/icon/btn_+1.png","name":"add2"}},{"type":"Button","props":{"y":274,"x":351,"var":"sub3","stateNum":1,"skin":"gameUI/common/icon/btn_-1.png","name":"sub3"}},{"type":"Button","props":{"y":274,"x":430,"var":"add3","stateNum":1,"skin":"gameUI/common/icon/btn_+1.png","name":"add3"}}]},{"type":"Box","props":{"y":86,"x":16,"var":"tab1","name":"tab1"},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"whiteBg","skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"var":"grayBg","skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"y":3,"x":12,"skin":"gameUI/fireTea/all.png"}},{"type":"Image","props":{"y":14,"x":37,"skin":"gameUI/fireTea/font_all.png"}}]},{"type":"Box","props":{"y":127,"x":16,"var":"tab2","name":"tab2"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"y":2,"x":12,"skin":"gameUI/fireTea/greenTea.png"}},{"type":"Image","props":{"y":18,"x":37,"skin":"gameUI/fireTea/font_green.png"}}]},{"type":"Box","props":{"y":168,"x":16,"var":"tab3","name":"tab3"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"y":0,"x":12,"skin":"gameUI/fireTea/redTea.png"}},{"type":"Image","props":{"y":17,"x":37,"skin":"gameUI/fireTea/font_rid.png"}}]},{"type":"Box","props":{"y":209,"x":16,"var":"tab4","name":"tab4"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"x":12,"skin":"gameUI/fireTea/greenTeapng.png"}},{"type":"Image","props":{"y":19,"x":27,"skin":"gameUI/fireTea/font_gray.png"}}]},{"type":"Box","props":{"y":249,"x":16,"var":"tab5","name":"tab5"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"y":0,"x":12,"width":33,"skin":"gameUI/fireTea/whiteTea.png","height":33}},{"type":"Image","props":{"y":18,"x":35,"skin":"gameUI/fireTea/font_white.png"}}]},{"type":"Box","props":{"y":292,"x":16,"var":"tab6","name":"tab6"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"x":12,"skin":"gameUI/fireTea/yellowTea.png"}},{"type":"Image","props":{"y":19,"x":37,"skin":"gameUI/fireTea/font_yellow.png"}}]},{"type":"Box","props":{"y":334,"x":15,"var":"tab7","name":"tab7"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"x":12,"skin":"gameUI/fireTea/blankTea.png"}},{"type":"Image","props":{"y":18,"x":37,"skin":"gameUI/fireTea/font_blank.png"}}]},{"type":"Box","props":{"y":376,"x":16,"var":"tab8","name":"tab8"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"x":12,"skin":"gameUI/fireTea/flowerTea.png"}},{"type":"Image","props":{"y":18,"x":37,"skin":"gameUI/fireTea/font_flower.png"}}]},{"type":"Box","props":{"y":418,"x":16,"var":"tab9","name":"tab9"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"y":-1,"x":12,"skin":"gameUI/fireTea/tonicTea.png"}},{"type":"Image","props":{"y":19,"x":27,"skin":"gameUI/fireTea/font_tonic.png"}}]},{"type":"Box","props":{"y":368,"x":235},"child":[{"type":"Label","props":{"y":20,"x":-1,"width":24,"text":"需要","height":13,"font":"SimSun","color":"#474040"}},{"type":"Label","props":{"y":19,"x":30,"var":"need1","name":"need1","fontSize":12,"color":"#c8110e","bold":true}},{"type":"Label","props":{"y":36,"x":9,"width":12,"text":"缺","height":12,"font":"SimSun","color":"#474040"}},{"type":"Label","props":{"y":33,"x":30,"var":"lock1","name":"lock1","fontSize":12,"color":"#e01511","bold":true}},{"type":"Label","props":{"y":20,"x":122,"text":"需要","font":"SimSun","color":"#474040"}},{"type":"Label","props":{"y":18,"x":153,"var":"need2","name":"need2","fontSize":12,"color":"#ec1814","bold":true}},{"type":"Label","props":{"y":36,"x":132,"text":"缺","font":"SimSun","color":"#474040"}},{"type":"Label","props":{"y":33,"x":153,"var":"lock2","name":"lock2","fontSize":12,"color":"#ea130f","bold":true}}]},{"type":"Box","props":{"y":120,"x":511},"child":[{"type":"Label","props":{"y":34,"text":"推荐茶具：","color":"#5d4a4a"}},{"type":"Label","props":{"y":54,"text":"推荐用水：","color":"#5d4a4a"}},{"type":"Label","props":{"y":75,"text":"推荐水温：","height":15,"color":"#5d4a4a"}},{"type":"Label","props":{"y":96,"text":"最优组合：","color":"#5d4a4a"}},{"type":"Label","props":{"y":118,"text":"当前组合：","color":"#5d4a4a"}},{"type":"Label","props":{"y":0,"x":-4,"width":234,"text":"小贴士：泡好的茶叶可以去斗茶室进行斗茶","height":19,"fontSize":12,"font":"SimSun","color":"#5d4a4a"}}]},{"type":"Label","props":{"y":443,"x":287,"var":"note","name":"note","color":"#5d4a4a"}},{"type":"Label","props":{"y":112,"x":311,"var":"teaName_top","name":"teaName_top","align":"center"}},{"type":"Label","props":{"y":396,"x":606,"width":65,"var":"teacher","text":"普通斗茶师","name":"teacher","height":16,"font":12,"color":"#4c2705"}},{"type":"Label","props":{"y":243,"x":443,"width":43,"var":"symbom","name":"symbom","height":18,"color":"#f80d09"}},{"type":"Label","props":{"y":260,"x":239,"width":48,"var":"makeTeaNums","text":"泡茶份数","name":"makeTeaNums","height":16}},{"type":"Image","props":{"y":109,"x":432,"width":69,"skin":"gameUI/makeTea/symbomBg.png","height":109}},{"type":"Image","props":{"y":109,"x":432,"width":69,"skin":"gameUI/makeTea/spell.png","height":109}},{"type":"Image","props":{"y":189,"x":625,"width":116,"skin":"gameUI/makeTea/makeTeaTeacher.png","height":202}},{"type":"Image","props":{"y":138,"x":306,"var":"iconImg","name":"iconImg"}},{"type":"Image","props":{"y":300,"x":237,"width":55,"var":"data1","name":"data1","height":55}},{"type":"Image","props":{"y":300,"x":352,"width":55,"var":"data2","name":"data2","height":55}},{"type":"Image","props":{"y":299,"x":476,"width":55,"var":"data3","name":"data3","height":55}},{"type":"TextInput","props":{"y":258,"x":309,"width":72,"var":"teaNums","skin":"comp/textinput.png","name":"teaNums","height":19,"bold":true,"align":"center"}},{"type":"Label","props":{"y":364,"x":238,"width":60,"var":"data1Name","name":"data1Name","height":20,"fontSize":13,"align":"center"}},{"type":"Label","props":{"y":364,"x":346,"width":76,"var":"data2Name","name":"data2Name","height":20,"fontSize":13,"align":"center"}},{"type":"Label","props":{"y":364,"x":477,"width":60,"var":"data3Name","name":"data3Name","height":20,"fontSize":13,"align":"center"}},{"type":"Panel","props":{"y":107,"x":103,"width":103,"var":"gridContainer","height":335}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.makeTea.MakeTeaDialogUI.uiView);
        }
    }
}

module ui.gameUI.player {
    export class PlayerInfoUI extends View {
		public lvlProgress:Laya.ProgressBar;
		public lvlProgressTxt:Laya.Label;
		public lvl:Laya.Box;
		public item0:Laya.Clip;
		public item1:Laya.Clip;
		public money:Laya.Label;
		public diamond:Laya.Label;
		public playerName:Laya.Label;
		public defaultIcon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":171,"height":87},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"gameUI/player/allBg.png","name":"bg"}},{"type":"ProgressBar","props":{"y":19,"x":90,"width":77,"var":"lvlProgress","value":0.5,"skin":"gameUI/player/progress.png","name":"lvlProgress","height":14}},{"type":"Label","props":{"y":19,"x":114,"width":53,"var":"lvlProgressTxt","name":"lvlProgressTxt","height":17,"color":"#a33d3b","bold":true,"align":"center"}},{"type":"Box","props":{"y":810,"x":160,"var":"lvl","name":"lvl"},"child":[{"type":"Clip","props":{"y":-807,"x":-76,"var":"item0","skin":"gameUI/player/clip_num.png","name":"item0","clipX":10}},{"type":"Clip","props":{"y":-808,"x":-59,"var":"item1","skin":"gameUI/player/clip_num.png","name":"item1","clipX":10}}]},{"type":"Label","props":{"y":39,"x":94,"width":74,"var":"money","text":"128778","name":"money","height":15,"color":"#a33d3b","bold":true,"align":"center"}},{"type":"Label","props":{"y":60,"x":94,"width":74,"var":"diamond","text":"1246668773","name":"diamond","height":15,"color":"#a33d3b","bold":true,"align":"center"}},{"type":"Label","props":{"y":1,"x":104,"width":61,"var":"playerName","text":"张三李四","name":"playerName","height":15,"color":"#a33d3b","bold":true,"align":"center"}},{"type":"Image","props":{"y":26,"x":4,"var":"defaultIcon","skin":"gameUI/player/defaultBg.png","name":"defaultIcon"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.player.PlayerInfoUI.uiView);
        }
    }
}

module ui.gameUI.pot {
    export class FriedDialogGridLeftUI extends View {
		public check:Laya.Image;
		public teaName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":108,"height":37,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":1,"x":8,"width":108,"skin":"gameUI/fireTea/left_font.png","height":37}},{"type":"Image","props":{"y":0,"x":29,"var":"check","skin":"gameUI/fireTea/symbol_1.png","name":"check"}},{"type":"Label","props":{"y":8,"x":20,"width":70,"var":"teaName","valign":"middle","name":"teaName","height":25,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.pot.FriedDialogGridLeftUI.uiView);
        }
    }
}

module ui.gameUI.pot {
    export class FriedTeaDialogUI extends Dialog {
		public potLvlNotEnough:Laya.Image;
		public right_top:Laya.Box;
		public friedTeaTime:Laya.Label;
		public hireprice:Laya.Label;
		public costprice:Laya.Label;
		public yield:Laya.Label;
		public teaPirce:Laya.Label;
		public imgIcon:Laya.Box;
		public iconImg:Laya.Image;
		public data1:Laya.Image;
		public data2:Laya.Image;
		public btn:Laya.Box;
		public btn_affirm:Laya.Button;
		public btn_cancel:Laya.Button;
		public btn_buy1:Laya.Button;
		public btn_buy2:Laya.Button;
		public btn_sub:Laya.Button;
		public btn_add:Laya.Button;
		public numBtn_sub:Laya.Button;
		public numBtn_add:Laya.Button;
		public btn_direction_down:Laya.Button;
		public btn_direction_top:Laya.Button;
		public tab1:Laya.Box;
		public whiteBg:Laya.Image;
		public grayBg:Laya.Image;
		public tab2:Laya.Box;
		public tab3:Laya.Box;
		public tab4:Laya.Box;
		public tab5:Laya.Box;
		public tab6:Laya.Box;
		public tab7:Laya.Box;
		public tab8:Laya.Box;
		public tab9:Laya.Box;
		public note:Laya.Label;
		public teaName_top:Laya.Label;
		public teaNums:Laya.TextInput;
		public gridContainer:Laya.Panel;
		public input_teaName:Laya.Label;
		public input_teaNums:Laya.Label;
		public input_teaLock:Laya.Label;
		public input_bookName:Laya.Label;
		public input_bookNums:Laya.Label;
		public input_bookLock:Laya.Label;
		public teacher:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":800,"height":500,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":95,"x":46,"skin":"gameUI/fireTea/left_background.png"}},{"type":"Image","props":{"y":101,"x":245,"skin":"gameUI/fireTea/logbag_border.png"}},{"type":"Image","props":{"y":122,"x":494,"skin":"gameUI/fireTea/bag_border.png"}},{"type":"Image","props":{"y":212,"x":595,"skin":"gameUI/fireTea/person.png"}},{"type":"Image","props":{"y":122,"x":266,"skin":"gameUI/fireTea/top_back.png"}},{"type":"Image","props":{"y":230,"x":286,"skin":"gameUI/fireTea/plate.png"}},{"type":"Image","props":{"y":309,"x":274,"skin":"gameUI/common/icon/girdIconBg.png"}},{"type":"Image","props":{"y":330,"x":357,"skin":"gameUI/fireTea/symbol.png"}},{"type":"Image","props":{"y":310,"x":400,"skin":"gameUI/common/icon/girdIconBg.png"}},{"type":"Image","props":{"y":330,"x":480,"skin":"gameUI/fireTea/symbol.png"}},{"type":"Image","props":{"y":120,"x":307,"skin":"gameUI/fireTea/font_border.png"}},{"type":"Image","props":{"y":410,"x":635,"skin":"gameUI/fireTea/small_border.png","name":"teacher"}},{"type":"Image","props":{"y":275,"x":345,"skin":"gameUI/fireTea/small_border.png"}},{"type":"Image","props":{"y":190,"x":430,"visible":false,"var":"potLvlNotEnough","skin":"gameUI/common/icon/panLvlNoEnougn.png"}},{"type":"Box","props":{"y":180.5,"x":597.5,"var":"right_top","name":"right_top"},"child":[{"type":"Label","props":{"y":-0.5,"x":-27,"var":"friedTeaTime","name":"friedTeaTime"}},{"type":"Label","props":{"y":23.5,"x":-0.5,"var":"hireprice","name":"hireprice"}},{"type":"Label","props":{"y":41.5,"x":-0.5,"var":"costprice","name":"costprice"}},{"type":"Label","props":{"y":60,"x":-27,"var":"yield","name":"yield"}},{"type":"Label","props":{"y":80.5,"x":-0.5,"var":"teaPirce","name":"teaPirce"}}]},{"type":"Box","props":{"y":194.5,"x":282.5,"var":"imgIcon","name":"imgIcon"},"child":[{"type":"Image","props":{"y":-11,"x":64,"var":"iconImg","name":"iconImg"}},{"type":"Image","props":{"y":121,"x":-3,"width":55,"var":"data1","name":"data1","height":55}},{"type":"Image","props":{"y":121,"x":123,"width":55,"var":"data2","name":"data2","height":55}}]},{"type":"Box","props":{"y":105,"x":145,"var":"btn","name":"btn"},"child":[{"type":"Button","props":{"y":335,"x":330,"var":"btn_affirm","stateNum":1,"skin":"gameUI/common/icon/btn_affirm.png","name":"btn_affirm"}},{"type":"Button","props":{"y":335,"x":460,"var":"btn_cancel","stateNum":1,"skin":"gameUI/common/icon/btn_cancel.png","name":"btn_cancel"}},{"type":"Button","props":{"y":305,"x":136,"var":"btn_buy1","stateNum":1,"skin":"gameUI/common/icon/btn_buy_small.png","name":"btn_buy1"}},{"type":"Button","props":{"y":305,"x":261,"var":"btn_buy2","stateNum":1,"skin":"gameUI/common/icon/btn_buy_small.png","name":"btn_buy2"}},{"type":"Button","props":{"y":305,"x":467,"var":"btn_sub","stateNum":1,"skin":"gameUI/common/icon/btn_-1.png","name":"btn_sub"}},{"type":"Button","props":{"y":305,"x":563,"var":"btn_add","stateNum":1,"skin":"gameUI/common/icon/btn_+1.png","name":"btn_add"}},{"type":"Button","props":{"y":170,"x":170,"var":"numBtn_sub","stateNum":1,"skin":"gameUI/common/icon/btn_-1.png","name":"numBtn_sub"}},{"type":"Button","props":{"y":170,"x":280,"var":"numBtn_add","stateNum":1,"skin":"gameUI/common/icon/btn_+1.png","name":"numBtn_add"}},{"type":"Button","props":{"y":355,"var":"btn_direction_down","stateNum":1,"skin":"gameUI/fireTea/btn_bottom.png","name":"btn_direction_down"}},{"type":"Button","props":{"var":"btn_direction_top","stateNum":1,"skin":"gameUI/fireTea/btn_top.png","name":"btn_direction_top"}}]},{"type":"Box","props":{"y":103,"x":50,"var":"tab1","name":"tab1"},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"whiteBg","skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"var":"grayBg","skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"y":3,"x":12,"skin":"gameUI/fireTea/all.png"}},{"type":"Image","props":{"y":14,"x":37,"skin":"gameUI/fireTea/font_all.png"}}]},{"type":"Box","props":{"y":144,"x":50,"var":"tab2","name":"tab2"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"y":2,"x":12,"skin":"gameUI/fireTea/greenTea.png"}},{"type":"Image","props":{"y":18,"x":37,"skin":"gameUI/fireTea/font_green.png"}}]},{"type":"Box","props":{"y":185,"x":50,"var":"tab3","name":"tab3"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"y":0,"x":12,"skin":"gameUI/fireTea/redTea.png"}},{"type":"Image","props":{"y":17,"x":37,"skin":"gameUI/fireTea/font_rid.png"}}]},{"type":"Box","props":{"y":226,"x":50,"var":"tab4","name":"tab4"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"x":12,"skin":"gameUI/fireTea/greenTeapng.png"}},{"type":"Image","props":{"y":19,"x":27,"skin":"gameUI/fireTea/font_gray.png"}}]},{"type":"Box","props":{"y":266,"x":50,"var":"tab5","name":"tab5"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"y":0,"x":12,"width":33,"skin":"gameUI/fireTea/whiteTea.png","height":33}},{"type":"Image","props":{"y":18,"x":35,"skin":"gameUI/fireTea/font_white.png"}}]},{"type":"Box","props":{"y":309,"x":50,"var":"tab6","name":"tab6"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"x":12,"skin":"gameUI/fireTea/yellowTea.png"}},{"type":"Image","props":{"y":19,"x":37,"skin":"gameUI/fireTea/font_yellow.png"}}]},{"type":"Box","props":{"y":351,"x":49,"var":"tab7","name":"tab7"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"x":12,"skin":"gameUI/fireTea/blankTea.png"}},{"type":"Image","props":{"y":18,"x":37,"skin":"gameUI/fireTea/font_blank.png"}}]},{"type":"Box","props":{"y":393,"x":50,"var":"tab8","name":"tab8"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"x":12,"skin":"gameUI/fireTea/flowerTea.png"}},{"type":"Image","props":{"y":18,"x":37,"skin":"gameUI/fireTea/font_flower.png"}}]},{"type":"Box","props":{"y":435,"x":50,"var":"tab9","name":"tab9"},"child":[{"type":"Image","props":{"skin":"gameUI/fireTea/tea_border.png","name":"whiteBg"}},{"type":"Image","props":{"skin":"gameUI/fireTea/tea_background.png","name":"grayBg"}},{"type":"Image","props":{"y":-1,"x":12,"skin":"gameUI/fireTea/tonicTea.png"}},{"type":"Image","props":{"y":19,"x":27,"skin":"gameUI/fireTea/font_tonic.png"}}]},{"type":"Box","props":{"y":200,"x":570},"child":[{"type":"Image","props":{"skin":"gameUI/common/icon/money.png"}},{"type":"Image","props":{"y":20,"skin":"gameUI/common/icon/money.png"}},{"type":"Image","props":{"y":60,"skin":"gameUI/common/icon/money.png"}}]},{"type":"Box","props":{"y":128,"x":505},"child":[{"type":"Label","props":{"y":52,"text":"加工时间：","color":"#5d4a4a"}},{"type":"Label","props":{"y":72,"text":"雇佣价格：","color":"#5d4a4a"}},{"type":"Label","props":{"y":92,"text":"配料成本：","color":"#5d4a4a"}},{"type":"Label","props":{"y":112,"text":"加工产量：","color":"#5d4a4a"}},{"type":"Label","props":{"y":132,"text":"物品价格：","color":"#5d4a4a"}},{"type":"Label","props":{"text":"炒茶需要的原料要在茶园中获得，工艺书","color":"#5d4a4a"}},{"type":"Label","props":{"y":18,"text":"可以直接在商店中购买，一次性炒茶份数","color":"#5d4a4a"}},{"type":"Label","props":{"y":34,"text":"越多越划算！","color":"#5d4a4a"}}]},{"type":"Label","props":{"y":450,"x":285,"var":"note","name":"note","color":"#5d4a4a"}},{"type":"Label","props":{"y":130,"x":354,"width":0,"var":"teaName_top","name":"teaName_top","height":0}},{"type":"TextInput","props":{"y":275,"x":347,"width":72,"var":"teaNums","skin":"comp/textinput.png","name":"teaNums","height":19,"bold":true,"align":"center"}},{"type":"Panel","props":{"y":124,"x":137,"width":103,"var":"gridContainer","height":335}},{"type":"Label","props":{"y":382,"x":344,"width":10,"text":"X","height":12,"font":"SimSun"}},{"type":"Label","props":{"y":396,"x":300,"text":"缺 X","font":"SimSun","color":"#0a0404"}},{"type":"Label","props":{"y":396,"x":413,"text":"缺 X","font":"SimSun"}},{"type":"Label","props":{"y":381,"x":442,"text":"X"}},{"type":"Box","props":{"y":381,"x":270},"child":[{"type":"Label","props":{"width":62,"var":"input_teaName","name":"input_teaName","height":12,"color":"#060404"}},{"type":"Label","props":{"y":1,"x":83,"width":15,"var":"input_teaNums","name":"input_teaNums","height":12,"fontSize":11,"color":"#c8110e"}},{"type":"Label","props":{"y":15,"x":60,"var":"input_teaLock","name":"input_teaLock","color":"#e01511"}},{"type":"Label","props":{"x":132,"var":"input_bookName","name":"input_bookName","color":"#0f0302"}},{"type":"Label","props":{"x":184,"var":"input_bookNums","name":"input_bookNums","color":"#ea130f"}},{"type":"Label","props":{"y":15,"x":170,"var":"input_bookLock","name":"input_bookLock","color":"#ec1814"}}]},{"type":"Label","props":{"y":413,"x":640,"width":65,"var":"teacher","text":"普通炒茶师","name":"teacher","height":16,"font":"12","color":"#4c2705"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.pot.FriedTeaDialogUI.uiView);
        }
    }
}

module ui.gameUI.pot {
    export class FriedTeaPotUI extends View {
		public gossip:Laya.Image;
		public pot:Laya.Button;
		public lock:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":150,"height":120},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":17,"var":"gossip","skin":"gameUI/gossip/gossip-1.png","name":"gossip"}},{"type":"Button","props":{"y":-10,"x":18,"width":115,"var":"pot","stateNum":1,"skin":"gameUI/pot/pot_1.png","name":"pot","height":105,"alpha":0}},{"type":"Image","props":{"y":-22,"x":28,"var":"lock","skin":"gameUI/fireTea/lock.png","name":"lock"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.pot.FriedTeaPotUI.uiView);
        }
    }
}

module ui.gameUI.pot {
    export class PotIntensifyDialogUI extends Dialog {
		public gridContainer:Laya.Panel;
		public strength:Laya.Image;
		public pot:Laya.Box;
		public pot1:Laya.Image;
		public pot2:Laya.Image;
		public btn:Laya.Box;
		public posBg:Laya.Image;
		public metal:Laya.Image;
		public wood:Laya.Image;
		public water:Laya.Image;
		public fire:Laya.Image;
		public earth:Laya.Image;
		public way:Laya.Image;
		public lebelText:Laya.Box;
		public potName1:Laya.Label;
		public potLevel1:Laya.Label;
		public friedTeaTime1:Laya.Label;
		public friedTeaLevel1:Laya.Label;
		public potName2:Laya.Label;
		public potLevel2:Laya.Label;
		public friedTeaTime2:Laya.Label;
		public friedTeaLevel2:Laya.Label;
		public centerShow:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":700,"height":500,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":96,"x":53,"width":601,"skin":"gameUI/pot/top_bg.png","height":48}},{"type":"Image","props":{"y":91,"x":36,"width":19,"skin":"gameUI/pot/frame.png","height":65}},{"type":"Image","props":{"y":91,"x":651,"width":19,"skin":"gameUI/pot/frame.png","height":65}},{"type":"Image","props":{"y":150,"x":477,"width":169,"skin":"gameUI/pot/gossip.png","height":142}},{"type":"Image","props":{"y":150,"x":64,"width":169,"skin":"gameUI/pot/gossip.png","height":142}},{"type":"Image","props":{"y":295,"x":26,"width":649,"skin":"gameUI/pot/bottomBg.png","height":199}},{"type":"Image","props":{"y":304,"x":30,"width":222,"skin":"gameUI/pot/padding-border.png","height":190}},{"type":"Image","props":{"y":306,"x":247,"width":209,"skin":"gameUI/pot/padding-border.png","height":190},"child":[{"type":"Panel","props":{"y":23,"x":34,"width":158,"var":"gridContainer","name":"gridContainer","height":143},"child":[{"type":"VScrollBar","props":{"y":-3,"x":126,"width":15,"skin":"comp/vscroll.png","height":130}}]}]},{"type":"Image","props":{"y":306,"x":451,"width":222,"skin":"gameUI/pot/padding-border.png","height":190}},{"type":"Image","props":{"y":162,"x":301,"width":97,"var":"strength","skin":"gameUI/pot/intensifyBtn.png","name":"strength","height":119}},{"type":"Box","props":{"y":126,"x":50,"width":0,"var":"pot","name":"pot","height":0},"child":[{"type":"Image","props":{"y":48,"x":40,"width":113,"var":"pot1","name":"pot1","height":102}},{"type":"Image","props":{"y":39,"x":448,"width":130,"var":"pot2","name":"pot2","height":116}}]},{"type":"Box","props":{"y":118,"x":223,"var":"btn","name":"btn"},"child":[{"type":"Image","props":{"y":-26,"x":-124,"width":60,"var":"posBg","skin":"gameUI/pot/padding-border.png","height":60}},{"type":"Image","props":{"y":-17,"x":-115,"width":35,"var":"metal","name":"metal","height":35}},{"type":"Image","props":{"y":-17,"x":-28,"width":35,"var":"wood","name":"wood","height":35}},{"type":"Image","props":{"y":-17,"x":60,"width":35,"var":"water","name":"water","height":35}},{"type":"Image","props":{"y":-17,"x":153,"width":35,"var":"fire","name":"fire","height":35}},{"type":"Image","props":{"y":-17,"x":237,"width":35,"var":"earth","name":"earth","height":35}},{"type":"Image","props":{"y":-17,"x":328,"width":35,"var":"way","name":"way","height":35}}]},{"type":"Box","props":{"y":242,"x":88,"var":"lebelText","name":"lebelText"},"child":[{"type":"Label","props":{"y":98,"x":40,"width":86,"var":"potName1","name":"potName1","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#f61915"}},{"type":"Label","props":{"y":132,"x":40,"width":86,"var":"potLevel1","name":"potLevel1","height":24,"fontSize":15,"font":"Microsoft YaHei","color":"#f31b18"}},{"type":"Label","props":{"y":163,"x":58,"width":65,"var":"friedTeaTime1","name":"friedTeaTime1","height":24,"fontSize":15,"font":"Microsoft YaHei","color":"#f4120e"}},{"type":"Label","props":{"y":202,"x":30,"width":90,"var":"friedTeaLevel1","text":"三品茶叶三品茶叶三品茶叶","name":"friedTeaLevel1","height":28,"fontSize":10,"font":"Microsoft YaHei","color":"#ec1814"}},{"type":"Label","props":{"y":98,"x":470,"width":86,"var":"potName2","name":"potName2","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#e81411"}},{"type":"Label","props":{"y":132,"x":470,"width":86,"var":"potLevel2","name":"potLevel2","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#ef0b07"}},{"type":"Label","props":{"y":164,"x":484,"width":72,"var":"friedTeaTime2","name":"friedTeaTime2","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#e7130f"}},{"type":"Label","props":{"y":205,"x":452,"width":104,"var":"friedTeaLevel2","text":"三品茶叶三品茶叶三品茶叶","name":"friedTeaLevel2","height":28,"fontSize":10,"color":"#f11310"}}]},{"type":"Box","props":{"y":213,"x":24},"child":[{"type":"Label","props":{"y":81,"x":56,"width":120,"text":"当前属性状态","height":23,"fontSize":15,"font":"Microsoft YaHei","color":"#8F572A"}},{"type":"Label","props":{"y":82,"x":276,"width":135,"var":"centerShow","name":"centerShow","height":23,"fontSize":15,"font":"Microsoft YaHei","color":"#8F572A"}},{"type":"Label","props":{"y":82,"x":466,"width":149,"text":"强化完成属性状态","height":23,"fontSize":15,"font":"Microsoft YaHei","color":"#8F572A"}},{"type":"Label","props":{"y":126,"x":26,"width":79,"text":"炒锅名称：","height":21,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":162,"x":26,"width":92,"text":"强化等级：","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":195,"x":26,"width":92,"text":"炒茶时间减少:","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":229,"x":26,"width":124,"text":"炒茶品质:","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":126,"x":450,"width":81,"text":"炒锅名称：","height":24,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":158,"x":450,"width":76,"text":"强化等级：","height":23,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":195,"x":450,"width":78,"text":"炒茶时间减少:","height":23,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":229,"x":450,"width":150,"text":"炒茶品质:","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.pot.PotIntensifyDialogUI.uiView);
        }
    }
}

module ui.gameUI.pot {
    export class PotIntensifyGrideUI extends View {
		public buy_btn:Laya.Box;
		public btn_buy2:Laya.Button;
		public btn_buy3:Laya.Button;
		public needData:Laya.Box;
		public need1:Laya.Label;
		public lock1:Laya.Label;
		public need2:Laya.Label;
		public lock2:Laya.Label;
		public need3:Laya.Label;
		public lock3:Laya.Label;
		public img_Iron:Laya.Box;
		public iron1:Laya.Image;
		public iron2:Laya.Image;
		public iron3:Laya.Image;
		public t_need1:Laya.Label;
		public t_lock1:Laya.Label;
		public t_need2:Laya.Label;
		public t_lock2:Laya.Label;
		public t_need3:Laya.Label;
		public t_lock3:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":140,"height":143,"cacheAs":"bitmap"},"child":[{"type":"Box","props":{"y":8,"x":89,"var":"buy_btn","name":"buy_btn"},"child":[{"type":"Button","props":{"y":55,"x":8,"width":43,"var":"btn_buy2","stateNum":1,"skin":"gameUI/pot/btn_buy.png","name":"btn_buy2","height":19}},{"type":"Button","props":{"y":107,"x":8,"width":43,"var":"btn_buy3","stateNum":1,"skin":"gameUI/pot/btn_buy.png","name":"btn_buy3","height":19}}]},{"type":"Box","props":{"y":4,"x":67,"var":"needData","name":"needData"},"child":[{"type":"Label","props":{"width":17,"var":"need1","name":"need1","height":12,"color":"#f31310"}},{"type":"Label","props":{"y":14,"width":17,"var":"lock1","name":"lock1","height":12,"color":"#f80d09"}},{"type":"Label","props":{"y":55,"x":2,"width":17,"var":"need2","name":"need2","height":12,"color":"#fb0905"}},{"type":"Label","props":{"y":71,"x":2,"width":17,"var":"lock2","name":"lock2","height":12,"color":"#ef120e"}},{"type":"Label","props":{"y":143,"x":4,"width":17,"var":"need3","pivotY":35,"pivotX":3,"name":"need3","height":12,"color":"#f61410"}},{"type":"Label","props":{"y":157,"x":4,"width":17,"var":"lock3","pivotY":35,"pivotX":2,"name":"lock3","height":12,"color":"#f81410"}}]},{"type":"Box","props":{"y":6,"x":2,"var":"img_Iron","name":"img_Iron"},"child":[{"type":"Image","props":{"y":-5,"x":2,"width":25,"var":"iron1","skin":"gameUI/common/icon/money.png","name":"iron1","height":20}},{"type":"Image","props":{"y":52,"x":3,"width":25,"var":"iron2","name":"iron2","height":22}},{"type":"Image","props":{"y":105,"x":5,"width":21,"var":"iron3","name":"iron3","height":19}}]},{"type":"Box","props":{"y":4,"x":37},"child":[{"type":"Label","props":{"var":"t_need1","text":"需要","name":"t_need1","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":14,"x":1,"var":"t_lock1","text":"缺少","name":"t_lock1","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":54,"x":2,"var":"t_need2","text":"需要","name":"t_need2","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":69,"x":2,"var":"t_lock2","text":"缺少","name":"t_lock2","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":106,"x":2,"var":"t_need3","text":"需要","name":"t_need3","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":121,"x":2,"var":"t_lock3","text":"缺少","name":"t_lock3","font":"Microsoft YaHei","color":"#271406"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.pot.PotIntensifyGrideUI.uiView);
        }
    }
}

module ui.gameUI.pot {
    export class PotTipUI extends View {
		public potName:Laya.Label;
		public potLvl:Laya.Label;
		public intensifyLvl:Laya.Label;
		public outputTopNums:Laya.Label;
		public teaName:Laya.Label;
		public leftTime:Laya.Label;
		public potPos:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":130,"height":110,"cacheAs":"bitmap"},"child":[{"type":"Box","props":{"y":3,"x":8},"child":[{"type":"Label","props":{"x":1,"width":58,"text":"炒锅名称：","height":16}},{"type":"Label","props":{"y":15,"width":58,"text":"炒锅等级：","height":16}},{"type":"Label","props":{"y":30,"x":2,"width":58,"text":"强化等级：","height":16}},{"type":"Label","props":{"y":45,"width":58,"text":"炒茶上限：","height":16}},{"type":"Label","props":{"y":61,"x":1,"width":58,"text":"炒制茶叶：","height":16}},{"type":"Label","props":{"y":75,"x":1,"width":58,"text":"剩余时间：","height":16}},{"type":"Label","props":{"y":90,"x":1,"width":58,"text":"炒锅位置：","height":16}}]},{"type":"Label","props":{"y":3,"x":67,"width":58,"var":"potName","height":16,"align":"left"}},{"type":"Label","props":{"y":18,"x":66,"width":58,"var":"potLvl","height":16,"align":"left"}},{"type":"Label","props":{"y":33,"x":68,"width":58,"var":"intensifyLvl","height":16,"align":"left"}},{"type":"Label","props":{"y":48,"x":66,"width":58,"var":"outputTopNums","height":16,"align":"left"}},{"type":"Label","props":{"y":64,"x":67,"width":58,"var":"teaName","height":16,"align":"left"}},{"type":"Label","props":{"y":78,"x":67,"width":58,"var":"leftTime","height":16,"align":"left"}},{"type":"Label","props":{"y":93,"x":67,"width":58,"var":"potPos","height":16,"align":"left"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.pot.PotTipUI.uiView);
        }
    }
}

module ui.gameUI.pot {
    export class UpGradePotDialogUI extends Dialog {
		public gridContainer:Laya.Panel;
		public upgrade:Laya.Button;
		public pot:Laya.Box;
		public pot1:Laya.Image;
		public pot2:Laya.Image;
		public btn:Laya.Box;
		public posBg:Laya.Image;
		public metal:Laya.Image;
		public wood:Laya.Image;
		public water:Laya.Image;
		public fire:Laya.Image;
		public earth:Laya.Image;
		public way:Laya.Image;
		public lebelText:Laya.Box;
		public potName1:Laya.Label;
		public potLevel1:Laya.Label;
		public friedTeaNums1:Laya.Label;
		public friedTeaTopLevel1:Laya.Label;
		public potName2:Laya.Label;
		public potLevel2:Laya.Label;
		public friedTeaNums2:Laya.Label;
		public friedTeaTopLevel2:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"y":0,"x":0,"width":700,"height":500,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":96,"x":53,"width":601,"skin":"gameUI/pot/top_bg.png","height":48}},{"type":"Image","props":{"y":91,"x":36,"width":19,"skin":"gameUI/pot/frame.png","height":65}},{"type":"Image","props":{"y":91,"x":651,"width":19,"skin":"gameUI/pot/frame.png","height":65}},{"type":"Image","props":{"y":150,"x":477,"width":169,"skin":"gameUI/pot/gossip.png","height":142}},{"type":"Image","props":{"y":150,"x":64,"width":169,"skin":"gameUI/pot/gossip.png","height":142}},{"type":"Image","props":{"y":295,"x":26,"width":649,"skin":"gameUI/pot/bottomBg.png","height":199}},{"type":"Image","props":{"y":304,"x":30,"width":222,"skin":"gameUI/pot/padding-border.png","height":190}},{"type":"Image","props":{"y":306,"x":247,"width":209,"skin":"gameUI/pot/padding-border.png","height":190},"child":[{"type":"Panel","props":{"y":23,"x":34,"width":158,"var":"gridContainer","name":"gridContainer","height":143},"child":[{"type":"VScrollBar","props":{"y":-3,"x":126,"width":15,"skin":"comp/vscroll.png","height":130}}]}]},{"type":"Image","props":{"y":306,"x":451,"width":222,"skin":"gameUI/pot/padding-border.png","height":190}},{"type":"Button","props":{"y":162,"x":296,"width":107,"var":"upgrade","stateNum":1,"skin":"gameUI/pot/center.png","name":"upgrade","height":135}},{"type":"Box","props":{"y":126,"x":50,"width":0,"var":"pot","name":"pot","height":0},"child":[{"type":"Image","props":{"y":48,"x":40,"width":113,"var":"pot1","name":"pot1","height":102}},{"type":"Image","props":{"y":39,"x":448,"width":130,"var":"pot2","name":"pot2","height":116}}]},{"type":"Box","props":{"y":118,"x":223,"var":"btn","name":"btn"},"child":[{"type":"Image","props":{"y":-26,"x":-124,"width":60,"var":"posBg","skin":"gameUI/pot/padding-border.png","height":60}},{"type":"Image","props":{"y":-17,"x":-115,"width":35,"var":"metal","skin":"gameUI/pot/font_1.png","name":"metal","height":35}},{"type":"Image","props":{"y":-17,"x":-28,"width":35,"var":"wood","skin":"gameUI/pot/font_2.png","name":"wood","height":35}},{"type":"Image","props":{"y":-17,"x":60,"width":35,"var":"water","skin":"gameUI/pot/font_3.png","name":"water","height":35}},{"type":"Image","props":{"y":-17,"x":153,"width":35,"var":"fire","skin":"gameUI/pot/font_4.png","name":"fire","height":35}},{"type":"Image","props":{"y":-17,"x":237,"width":35,"var":"earth","skin":"gameUI/pot/font_5.png","name":"earth","height":35}},{"type":"Image","props":{"y":-17,"x":328,"width":35,"var":"way","skin":"gameUI/pot/font_6.png","name":"way","height":35}}]},{"type":"Box","props":{"y":242,"x":88,"var":"lebelText","name":"lebelText"},"child":[{"type":"Label","props":{"y":98,"x":40,"width":86,"var":"potName1","name":"potName1","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#f61915"}},{"type":"Label","props":{"y":132,"x":40,"width":86,"var":"potLevel1","name":"potLevel1","height":24,"fontSize":15,"font":"Microsoft YaHei","color":"#f31b18"}},{"type":"Label","props":{"y":164,"x":40,"width":50,"var":"friedTeaNums1","name":"friedTeaNums1","height":24,"fontSize":15,"font":"Microsoft YaHei","color":"#f4120e"}},{"type":"Label","props":{"y":199,"x":85,"width":40,"var":"friedTeaTopLevel1","name":"friedTeaTopLevel1","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#ec1814"}},{"type":"Label","props":{"y":98,"x":470,"width":86,"var":"potName2","name":"potName2","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#e81411"}},{"type":"Label","props":{"y":132,"x":470,"width":86,"var":"potLevel2","name":"potLevel2","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#ef0b07"}},{"type":"Label","props":{"y":164,"x":470,"width":86,"var":"friedTeaNums2","name":"friedTeaNums2","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#e7130f"}},{"type":"Label","props":{"y":202,"x":515,"width":43,"var":"friedTeaTopLevel2","name":"friedTeaTopLevel2","height":28,"fontSize":15,"color":"#f11310"}}]},{"type":"Box","props":{"y":213,"x":24},"child":[{"type":"Label","props":{"y":81,"x":56,"width":120,"text":"当前属性状态","height":23,"fontSize":15,"font":"Microsoft YaHei","color":"#8F572A"}},{"type":"Label","props":{"y":82,"x":261,"width":135,"text":"升级所需要素材","height":23,"fontSize":15,"font":"Microsoft YaHei","color":"#8F572A"}},{"type":"Label","props":{"y":82,"x":466,"width":149,"text":"升级完成属性状态","height":23,"fontSize":15,"font":"Microsoft YaHei","color":"#8F572A"}},{"type":"Label","props":{"y":126,"x":26,"width":79,"text":"炒锅名称：","height":21,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":162,"x":26,"width":92,"text":"炒锅等级：","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":195,"x":26,"width":92,"text":"炒茶数量：","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":229,"x":26,"width":124,"text":"可炒茶叶等级上限","height":22,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":126,"x":450,"width":81,"text":"炒锅名称：","height":24,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":158,"x":450,"width":76,"text":"炒锅等级：","height":23,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":195,"x":450,"width":78,"text":"炒茶数量：","height":23,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":229,"x":450,"width":150,"text":"可炒茶叶等级上限","height":28,"fontSize":15,"font":"Microsoft YaHei","color":"#271406"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.pot.UpGradePotDialogUI.uiView);
        }
    }
}

module ui.gameUI.pot {
    export class UpGradePotGrideUI extends View {
		public buy_btn:Laya.Box;
		public btn_buy2:Laya.Button;
		public btn_buy3:Laya.Button;
		public btn_buy4:Laya.Button;
		public needData:Laya.Box;
		public need1:Laya.Label;
		public lock1:Laya.Label;
		public need2:Laya.Label;
		public lock2:Laya.Label;
		public need3:Laya.Label;
		public lock3:Laya.Label;
		public need4:Laya.Label;
		public lock4:Laya.Label;
		public img_Iron:Laya.Box;
		public money:Laya.Image;
		public book:Laya.Image;
		public iron3:Laya.Image;
		public iron4:Laya.Image;
		public t_need1:Laya.Label;
		public t_lock1:Laya.Label;
		public t_need2:Laya.Label;
		public t_lock2:Laya.Label;
		public t_need3:Laya.Label;
		public t_lock3:Laya.Label;
		public t_need4:Laya.Label;
		public t_lock4:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":140,"height":143,"cacheAs":"bitmap"},"child":[{"type":"Box","props":{"y":8,"x":89,"var":"buy_btn","name":"buy_btn"},"child":[{"type":"Button","props":{"y":34,"x":8,"width":43,"var":"btn_buy2","stateNum":1,"skin":"gameUI/pot/btn_buy.png","name":"btn_buy2","height":19}},{"type":"Button","props":{"y":70,"x":8,"width":43,"var":"btn_buy3","stateNum":1,"skin":"gameUI/pot/btn_buy.png","name":"btn_buy3","height":19}},{"type":"Button","props":{"y":105,"x":8,"width":43,"var":"btn_buy4","stateNum":1,"skin":"gameUI/pot/btn_buy.png","name":"btn_buy4","height":19}}]},{"type":"Box","props":{"y":4,"x":67,"var":"needData","name":"needData"},"child":[{"type":"Label","props":{"var":"need1","name":"need1","color":"#f31310"}},{"type":"Label","props":{"y":14,"var":"lock1","name":"lock1","color":"#f80d09"}},{"type":"Label","props":{"y":33,"width":17,"var":"need2","name":"need2","height":12,"color":"#fb0905"}},{"type":"Label","props":{"y":48,"var":"lock2","name":"lock2","color":"#ef120e"}},{"type":"Label","props":{"y":70,"var":"need3","name":"need3","color":"#f61410"}},{"type":"Label","props":{"y":85,"var":"lock3","name":"lock3","color":"#f81410"}},{"type":"Label","props":{"y":105,"var":"need4","name":"need4","color":"#f3100c"}},{"type":"Label","props":{"y":120,"var":"lock4","name":"lock4","color":"#fb0905"}}]},{"type":"Box","props":{"y":6,"x":2,"var":"img_Iron","name":"img_Iron"},"child":[{"type":"Image","props":{"y":0,"x":-3,"width":25,"var":"money","skin":"gameUI/common/icon/money.png","name":"money","height":20}},{"type":"Image","props":{"y":33,"x":-3,"width":25,"var":"book","skin":"gameUI/pot/book.png","name":"book","height":22}},{"type":"Image","props":{"y":73,"x":-3,"width":21,"var":"iron3","name":"iron3","height":19}},{"type":"Image","props":{"y":105,"x":-3,"width":19,"var":"iron4","name":"iron4","height":20}}]},{"type":"Box","props":{"y":4,"x":37},"child":[{"type":"Label","props":{"var":"t_need1","text":"需要","name":"t_need1","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":14,"x":1,"var":"t_lock1","text":"缺少","name":"t_lock1","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":33,"var":"t_need2","text":"需要","name":"t_need2","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":48,"x":1,"var":"t_lock2","text":"缺少","name":"t_lock2","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":70,"var":"t_need3","text":"需要","name":"t_need3","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":85,"x":1,"var":"t_lock3","text":"缺少","name":"t_lock3","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":105,"var":"t_need4","text":"需要","name":"t_need4","font":"Microsoft YaHei","color":"#271406"}},{"type":"Label","props":{"y":120,"var":"t_lock4","text":"缺少","name":"t_lock4","font":"Microsoft YaHei","color":"#271406"}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.pot.UpGradePotGrideUI.uiView);
        }
    }
}

module ui.gameUI.ranklist {
    export class RankListUI extends Dialog {
		public titleBox:Laya.Box;
		public lineBg:Laya.Image;
		public dataRowsBox:Laya.Box;
		public closeBtn:Laya.Button;
		public pageBox:Laya.Box;

        public static  uiView:any ={"type":"Dialog","props":{"width":740,"height":540,"cacheAs":"bitmap"},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"gameUI/ranklist/bg.png"}},{"type":"Image","props":{"y":112,"x":25,"width":686,"skin":"gameUI/ranklist/childBg.png","height":389}}]},{"type":"Box","props":{"y":120,"x":41,"var":"titleBox"},"child":[{"type":"Image","props":{"y":1,"x":0,"var":"lineBg","skin":"gameUI/ranklist/lineBg2.png"}},{"type":"Label","props":{"y":7,"x":44,"width":70,"text":"玩家排行","height":28,"fontSize":15,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":6,"x":167,"width":70,"text":"玩家头像","height":28,"fontSize":15,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":7,"x":292,"width":70,"text":"玩家名称","height":28,"fontSize":15,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":7,"x":425,"width":70,"text":"玩家等级","height":28,"fontSize":15,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":7,"x":536,"width":70,"text":"玩家经验","height":28,"fontSize":15,"font":"Microsoft YaHei","bold":true,"align":"center"}}]},{"type":"Box","props":{"y":161,"x":39,"width":663,"var":"dataRowsBox","height":259}},{"type":"Button","props":{"y":58,"x":678,"var":"closeBtn","stateNum":1,"skin":"gameUI/ranklist/close.png"}},{"type":"Box","props":{"y":423,"x":120,"width":500,"var":"pageBox","height":30}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.ranklist.RankListUI.uiView);
        }
    }
}

module ui.gameUI.ranklist {
    export class RowBarUI extends View {
		public rankOrder:Laya.Label;
		public pName:Laya.Label;
		public lvl:Laya.Label;
		public exp:Laya.Label;
		public rankIcon:Laya.Image;
		public headIcon:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":660,"height":37,"cacheAs":"bitmap"},"child":[{"type":"Box","props":{"y":0,"x":0,"width":660,"height":37},"child":[{"type":"Image","props":{"y":1,"x":-3,"skin":"gameUI/ranklist/lineBg1.png"}},{"type":"Label","props":{"y":7,"x":44,"width":70,"var":"rankOrder","text":"2","height":28,"fontSize":15,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":7,"x":292,"width":70,"var":"pName","height":28,"fontSize":15,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":7,"x":425,"width":70,"var":"lvl","height":28,"fontSize":15,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Label","props":{"y":7,"x":536,"width":70,"var":"exp","height":28,"fontSize":15,"font":"Microsoft YaHei","bold":true,"align":"center"}},{"type":"Image","props":{"y":6,"x":34,"visible":false,"var":"rankIcon","skin":"gameUI/ranklist/no1.png"}},{"type":"Image","props":{"y":2,"x":184,"width":35,"var":"headIcon","skin":"gameUI/player/defaultBg.png","height":35}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.ranklist.RowBarUI.uiView);
        }
    }
}

module ui.gameUI.shop {
    export class ShopRightContentUI extends View {
		public rightContent:Laya.Box;
		public iconImg:Laya.Image;
		public lvlNoEnougnImg:Laya.Image;
		public priceIcon:Laya.Image;
		public buyPrice:Laya.Label;
		public buyNumTxt:Laya.TextInput;
		public reduceOneBtn:Laya.Button;
		public addOneBtn:Laya.Button;
		public desTxt:Laya.TextInput;
		public priceOne:Laya.Label;
		public priceAll:Laya.Label;
		public nameTxt:Laya.Label;
		public contentArea:Laya.TextArea;
		public buyBtn:Laya.Button;
		public preViewBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":340,"height":360,"cacheAs":"bitmap"},"child":[{"type":"Box","props":{"y":0,"x":0,"width":340,"var":"rightContent","name":"rightContent","height":360},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":1,"x":0,"skin":"gameUI/common/icon/rightBg.png"}},{"type":"Image","props":{"y":8,"x":13,"width":100,"skin":"gameUI/common/icon/rightIcon.png","height":100}},{"type":"Image","props":{"y":35,"x":35,"var":"iconImg"}},{"type":"Image","props":{"y":55,"x":60,"visible":false,"var":"lvlNoEnougnImg","skin":"gameUI/common/icon/lvlNoEnougn.png"}},{"type":"Image","props":{"y":114,"x":41,"var":"priceIcon","skin":"gameUI/common/icon/money.png"}},{"type":"Label","props":{"y":115,"x":61,"width":50,"var":"buyPrice","height":15}},{"type":"TextInput","props":{"y":136,"x":36,"width":65,"var":"buyNumTxt","text":"1","skin":"comp/textinput.png","mouseThrough":true,"mouseEnabled":true,"height":16,"editable":true,"bold":true,"align":"center"}},{"type":"Button","props":{"y":134,"x":10,"var":"reduceOneBtn","stateNum":1,"skin":"gameUI/common/icon/btn_-1.png","mouseThrough":true,"mouseEnabled":true}},{"type":"Button","props":{"y":134,"x":106,"var":"addOneBtn","stateNum":1,"skin":"gameUI/common/icon/btn_+1.png"}},{"type":"TextInput","props":{"y":177,"x":6,"wordWrap":true,"width":233,"var":"desTxt","valign":"top","text":"请选择物品！","skin":"comp/textinput.png","multiline":true,"mouseEnabled":false,"height":79,"bold":false}},{"type":"Label","props":{"y":43,"x":212,"width":39,"var":"priceOne","height":12,"bold":true}},{"type":"Label","props":{"y":65,"x":212,"width":39,"var":"priceAll","height":12,"bold":true}},{"type":"Label","props":{"y":0,"x":132,"width":100,"var":"nameTxt","valign":"middle","text":"名称","height":28,"fontSize":15,"bold":true,"align":"left"}},{"type":"Label","props":{"y":158,"x":19,"width":100,"text":"购买数量（1~99）","height":16,"bold":false}},{"type":"TextArea","props":{"y":29,"x":131,"width":133,"var":"contentArea","text":"内容","name":"contentArea","mouseEnabled":false,"height":144}}]},{"type":"Box","props":{"y":0,"x":0,"mouseThrough":true,"mouseEnabled":true},"child":[{"type":"Image","props":{"y":272,"x":60,"skin":"gameUI/common/imgs/shop_flag1.png"}},{"type":"Image","props":{"y":180,"x":171,"width":165,"skin":"gameUI/common/imgs/shop_flag2.png","height":174}}]},{"type":"Box","props":{"mouseThrough":true,"mouseEnabled":true},"child":[{"type":"Button","props":{"y":283,"x":13,"width":96,"var":"buyBtn","stateNum":1,"skin":"gameUI/common/icon/btn_buy.png","height":42}},{"type":"Button","props":{"y":279,"x":6,"width":111,"var":"preViewBtn","stateNum":1,"skin":"gameUI/common/icon/btn_preview.png","height":54}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.shop.ShopRightContentUI.uiView);
        }
    }
}

module ui.gameUI.storage {
    export class StorageDialogUI extends Dialog {
		public iconImg:Laya.Image;
		public desTxt:Laya.TextInput;
		public gridContainer:Laya.Panel;
		public seedTab:Laya.Box;
		public toolTab:Laya.Box;
		public fruitTab:Laya.Box;
		public decorateTab:Laya.Box;
		public saleBtn:Laya.Button;
		public addOneBtn:Laya.Button;
		public reduceOneBtn:Laya.Button;
		public priceOne:Laya.Label;
		public priceAll:Laya.Label;
		public saleNumTxt:Laya.TextInput;
		public nameTxt:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":788,"height":450,"cacheAs":"bitmap"},"child":[{"type":"Box","props":{"y":0,"x":0},"child":[{"type":"Image","props":{"y":82,"x":96,"skin":"gameUI/common/icon/bg.png"}},{"type":"Image","props":{"y":87,"x":449,"skin":"gameUI/common/icon/rightBg.png"}},{"type":"Image","props":{"y":94,"x":458,"skin":"gameUI/common/icon/rightIcon.png"}},{"type":"Image","props":{"y":127,"x":490,"var":"iconImg"}},{"type":"Image","props":{"y":349,"x":520,"skin":"gameUI/common/imgs/storage_flag1.png"}},{"type":"TextInput","props":{"y":236,"x":455,"wordWrap":true,"width":233,"var":"desTxt","valign":"top","text":"请选择物品！","skin":"comp/textinput.png","multiline":true,"mouseEnabled":false,"height":95,"bold":false}},{"type":"Image","props":{"y":247,"x":598,"width":187,"skin":"gameUI/common/imgs/storage_flag2.png","height":202}}]},{"type":"Panel","props":{"y":88,"x":104,"width":333,"var":"gridContainer","vScrollBarSkin":"comp/vscroll.png","height":333}},{"type":"Box","props":{"y":80,"x":12,"var":"seedTab","name":"seedTab"},"child":[{"type":"Image","props":{"skin":"gameUI/common/icon/select.png","name":"selectBg"}},{"type":"Image","props":{"y":3,"x":5,"skin":"gameUI/common/icon/unselectBg.png","name":"unSelectBg"}},{"type":"Image","props":{"y":9,"x":14,"skin":"gameUI/common/icon/seedTabBg.png","name":"tabIcon"}}]},{"type":"Box","props":{"y":156,"x":12,"var":"toolTab","name":"toolTab"},"child":[{"type":"Image","props":{"skin":"gameUI/common/icon/select.png","name":"selectBg"}},{"type":"Image","props":{"y":3,"x":5,"skin":"gameUI/common/icon/unselectBg.png","name":"unSelectBg"}},{"type":"Image","props":{"y":12,"x":19,"skin":"gameUI/common/icon/toolTabBg.png","name":"tabIcon"}}]},{"type":"Box","props":{"y":232,"x":12,"var":"fruitTab","name":"fruitTab"},"child":[{"type":"Image","props":{"skin":"gameUI/common/icon/select.png","name":"selectBg"}},{"type":"Image","props":{"y":3,"x":5,"skin":"gameUI/common/icon/unselectBg.png","name":"unSelectBg"}},{"type":"Image","props":{"y":14,"x":23,"skin":"gameUI/common/icon/fruitTabBg.png","name":"tabIcon"}}]},{"type":"Box","props":{"y":308,"x":12,"var":"decorateTab","name":"decorateTab"},"child":[{"type":"Image","props":{"skin":"gameUI/common/icon/unselectBg.png","name":"selectBg"}},{"type":"Image","props":{"y":3,"x":5,"skin":"gameUI/common/icon/unselectBg.png","name":"unSelectBg"}},{"type":"Image","props":{"y":11,"x":23,"skin":"gameUI/common/icon/decorateTabBg.png","name":"tabIcon"}}]},{"type":"Button","props":{"y":354,"x":447,"width":121,"var":"saleBtn","stateNum":1,"skin":"gameUI/common/icon/btn_sale.png","name":"saleBtn","height":58}},{"type":"Button","props":{"y":185,"x":688,"var":"addOneBtn","stateNum":1,"skin":"gameUI/common/icon/btn_+1.png","name":"reduceOneBtn"}},{"type":"Button","props":{"y":185,"x":587,"var":"reduceOneBtn","stateNum":1,"skin":"gameUI/common/icon/btn_-1.png","name":"reduceOneBtn"}},{"type":"Label","props":{"y":140,"x":586,"text":"物品单价","bold":true}},{"type":"Label","props":{"y":162,"x":586,"text":"物品总价","bold":true}},{"type":"Image","props":{"y":138,"x":651,"skin":"gameUI/common/icon/money.png"}},{"type":"Image","props":{"y":161,"x":652,"skin":"gameUI/common/icon/money.png"}},{"type":"Label","props":{"y":139,"x":671,"width":39,"var":"priceOne","height":12,"bold":true}},{"type":"Label","props":{"y":161,"x":671,"width":39,"var":"priceAll","height":12,"bold":true}},{"type":"TextInput","props":{"y":187,"x":613,"width":65,"var":"saleNumTxt","skin":"comp/textinput.png","name":"saleNumTxt","height":16,"bold":true,"align":"center"}},{"type":"Label","props":{"y":96,"x":591,"width":100,"var":"nameTxt","valign":"middle","height":28,"fontSize":15,"bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.storage.StorageDialogUI.uiView);
        }
    }
}

module ui.gameUI.storage {
    export class StorageRightContentUI extends View {
		public rightContent:Laya.Box;
		public desTxt:Laya.TextInput;
		public addOneBtn:Laya.Button;
		public reduceOneBtn:Laya.Button;
		public saleNumTxt:Laya.TextInput;
		public priceOne:Laya.Label;
		public priceAll:Laya.Label;
		public nameTxt:Laya.Label;
		public saleBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":331,"height":353,"cacheAs":"bitmap"},"child":[{"type":"Box","props":{"y":0,"x":1,"width":331,"var":"rightContent","name":"rightContent","height":353},"child":[{"type":"Box","props":{"y":-96,"x":-454},"child":[{"type":"Image","props":{"y":97,"x":459,"skin":"gameUI/common/icon/rightBg.png"}},{"type":"Image","props":{"y":104,"x":468,"skin":"gameUI/common/icon/rightIcon.png"}},{"type":"TextInput","props":{"y":246,"x":465,"wordWrap":true,"width":233,"var":"desTxt","valign":"top","text":"请选择物品！","skin":"comp/textinput.png","multiline":true,"mouseEnabled":false,"height":95,"bold":false}},{"type":"Button","props":{"y":185,"x":688,"var":"addOneBtn","stateNum":1,"skin":"gameUI/common/icon/btn_+1.png"}},{"type":"Button","props":{"y":185,"x":587,"var":"reduceOneBtn","stateNum":1,"skin":"gameUI/common/icon/btn_-1.png"}},{"type":"TextInput","props":{"y":187,"x":613,"width":65,"var":"saleNumTxt","skin":"comp/textinput.png","height":16,"bold":true,"align":"center"}},{"type":"Label","props":{"y":140,"x":586,"text":"物品单价","bold":true}},{"type":"Label","props":{"y":162,"x":586,"text":"物品总价","bold":true}},{"type":"Image","props":{"y":138,"x":651,"skin":"gameUI/common/icon/money.png"}},{"type":"Image","props":{"y":161,"x":652,"skin":"gameUI/common/icon/money.png"}},{"type":"Label","props":{"y":139,"x":671,"width":39,"var":"priceOne","height":12,"bold":true}},{"type":"Label","props":{"y":161,"x":671,"width":39,"var":"priceAll","height":12,"bold":true}},{"type":"Label","props":{"y":96,"x":591,"width":100,"var":"nameTxt","valign":"middle","height":28,"fontSize":15,"bold":true,"align":"center"}}]},{"type":"Box","props":{"y":-96,"x":-454},"child":[{"type":"Image","props":{"y":349,"x":520,"skin":"gameUI/common/imgs/storage_flag1.png"}},{"type":"Image","props":{"y":247,"x":598,"width":187,"skin":"gameUI/common/imgs/storage_flag2.png","height":202}}]},{"type":"Button","props":{"y":268,"width":121,"var":"saleBtn","stateNum":1,"skin":"gameUI/common/icon/btn_sale.png","height":58}}]}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.storage.StorageRightContentUI.uiView);
        }
    }
}

module ui.gameUI.teaWiki {
    export class TeaWikiDialogUI extends Dialog {
		public closeBtn:Laya.Button;
		public gridContainer:Laya.Panel;
		public next:Laya.Button;
		public pre:Laya.Button;
		public tab1:Laya.Box;
		public tab2:Laya.Box;
		public tab3:Laya.Box;
		public tab4:Laya.Box;
		public tab5:Laya.Box;
		public tab6:Laya.Box;
		public tab7:Laya.Box;
		public tab8:Laya.Box;
		public imgContainer:Laya.Panel;

        public static  uiView:any ={"type":"Dialog","props":{"width":950,"height":555},"child":[{"type":"Image","props":{"y":38,"x":128,"width":716,"skin":"gameUI/teaWiki/tea_background.png","height":500}},{"type":"Image","props":{"y":458,"x":115,"width":99,"skin":"gameUI/teaWiki/down_left.png","height":52}},{"type":"Image","props":{"y":456,"x":744,"width":99,"skin":"gameUI/teaWiki/down_right.png","height":52}},{"type":"Button","props":{"y":51,"x":800,"width":30,"var":"closeBtn","stateNum":1,"skin":"gameUI/common/icon/closeBtnBg.png","name":"closeBtn","height":30}},{"type":"Panel","props":{"y":50,"x":839,"width":85,"var":"gridContainer","height":404}},{"type":"Button","props":{"y":475,"x":776,"width":55,"var":"next","name":"next","label":"下一页","height":30}},{"type":"Button","props":{"y":480,"x":138,"width":55,"var":"pre","name":"pre","label":"上一页","height":30}},{"type":"Box","props":{"y":53,"x":59,"var":"tab1","name":"tab1"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_border.png","name":"unSelectBg","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_background.png","name":"selectBg","height":25}},{"type":"Image","props":{"y":3,"x":3,"width":28,"skin":"gameUI/fireTea/all.png","height":20}},{"type":"Image","props":{"y":9,"x":37,"width":30,"skin":"gameUI/fireTea/font_all.png","height":15}}]},{"type":"Box","props":{"y":84,"x":59,"var":"tab2","name":"tab2"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_border.png","name":"unSelectBg","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_background.png","name":"selectBg","height":25}},{"type":"Image","props":{"y":3,"x":2,"width":28,"skin":"gameUI/fireTea/greenTea.png","height":20}},{"type":"Image","props":{"y":8,"x":35,"width":30,"skin":"gameUI/fireTea/font_green.png","height":15}}]},{"type":"Box","props":{"y":117,"x":59,"var":"tab3","name":"tab3"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_border.png","name":"unSelectBg","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_background.png","name":"selectBg","height":25}},{"type":"Image","props":{"y":3,"x":3,"width":28,"skin":"gameUI/fireTea/redTea.png","height":20}},{"type":"Image","props":{"y":9,"x":37,"width":30,"skin":"gameUI/fireTea/font_rid.png","height":15}}]},{"type":"Box","props":{"y":149,"x":59,"var":"tab4","name":"tab4"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_border.png","name":"unSelectBg","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_background.png","name":"selectBg","height":25}},{"type":"Image","props":{"y":3,"x":3,"width":28,"skin":"gameUI/fireTea/greenTeapng.png","height":20}},{"type":"Image","props":{"y":9,"x":37,"width":30,"skin":"gameUI/fireTea/font_gray.png","height":15}}]},{"type":"Box","props":{"y":180,"x":59,"var":"tab5","name":"tab5"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_border.png","name":"unSelectBg","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_background.png","name":"selectBg","height":25}},{"type":"Image","props":{"y":3,"x":3,"width":28,"skin":"gameUI/fireTea/whiteTea.png","height":20}},{"type":"Image","props":{"y":9,"x":37,"width":30,"skin":"gameUI/fireTea/font_white.png","height":15}}]},{"type":"Box","props":{"y":210,"x":59,"var":"tab6","name":"tab6"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_border.png","name":"unSelectBg","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_background.png","name":"selectBg","height":25}},{"type":"Image","props":{"y":3,"x":3,"width":28,"skin":"gameUI/fireTea/yellowTea.png","height":20}},{"type":"Image","props":{"y":9,"x":37,"width":30,"skin":"gameUI/fireTea/font_yellow.png","height":15}}]},{"type":"Box","props":{"y":241,"x":59,"var":"tab7","name":"tab7"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_border.png","name":"unSelectBg","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_background.png","name":"selectBg","height":25}},{"type":"Image","props":{"y":3,"x":3,"width":28,"skin":"gameUI/fireTea/blankTea.png","height":20}},{"type":"Image","props":{"y":9,"x":37,"width":30,"skin":"gameUI/fireTea/font_blank.png","height":15}}]},{"type":"Box","props":{"y":272,"x":59,"var":"tab8","name":"tab8"},"child":[{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_border.png","name":"unSelectBg","height":25}},{"type":"Image","props":{"y":0,"x":0,"width":76,"skin":"gameUI/fireTea/tea_background.png","name":"selectBg","height":25}},{"type":"Image","props":{"y":3,"x":3,"width":28,"skin":"gameUI/fireTea/flowerTea.png","height":20}},{"type":"Image","props":{"y":9,"x":37,"width":30,"skin":"gameUI/fireTea/font_flower.png","height":15}}]},{"type":"Panel","props":{"y":81,"x":134,"width":700,"var":"imgContainer","name":"imgContainer","height":403}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.teaWiki.TeaWikiDialogUI.uiView);
        }
    }
}

module ui.gameUI.teaWiki {
    export class TeaWikiGridImgUI extends View {
		public lvl:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"width":690,"height":470,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":5,"x":6,"width":680,"var":"lvl","height":460}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.teaWiki.TeaWikiGridImgUI.uiView);
        }
    }
}

module ui.gameUI.teaWiki {
    export class TeaWikiGridItemUI extends View {
		public gridItemBg:Laya.Image;
		public itemName:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":85,"height":22},"child":[{"type":"Image","props":{"y":0,"x":0,"width":85,"var":"gridItemBg","height":22}},{"type":"Label","props":{"y":0,"x":0,"width":85,"var":"itemName","valign":"middle","name":"itemName","height":22,"fontSize":15,"font":"SimHei","color":"#734D0E","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.teaWiki.TeaWikiGridItemUI.uiView);
        }
    }
}

module ui.gameUI.tips {
    export class AssartPotTipUI extends Dialog {
		public needMoney:Laya.Label;
		public open_btn:Laya.Button;
		public open_lock:Laya.Image;

        public static  uiView:any ={"type":"Dialog","props":{"width":437,"height":344,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":69,"x":22,"skin":"gameUI/fireTea/openpotbg.png"}},{"type":"Label","props":{"y":229,"x":181,"width":74,"var":"needMoney","name":"needMoney","height":22,"fontSize":16}},{"type":"Image","props":{"y":90,"x":123,"skin":"gameUI/fireTea/circleBg.png"}},{"type":"Image","props":{"y":266,"x":22,"width":394,"skin":"gameUI/fireTea/bottom.png","height":70}},{"type":"Button","props":{"y":283,"x":142,"var":"open_btn","stateNum":1,"skin":"gameUI/fireTea/font_Btn.png","name":"open_btn"}},{"type":"Image","props":{"y":116,"x":195,"var":"open_lock","skin":"gameUI/fireTea/tipLock.png","name":"open_lock"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.tips.AssartPotTipUI.uiView);
        }
    }
}

module ui.gameUI.tips {
    export class BuyUpDataTipUI extends Dialog {
		public tipInfoBox:Laya.Box;
		public needMoney:Laya.Label;
		public buyNums:Laya.Label;
		public needData:Laya.Label;
		public okBtn:Laya.Button;
		public closeBtn:Laya.Button;
		public cancelBtn:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":351,"height":120,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"gameUI/common/icon/tipBg.png"}},{"type":"Box","props":{"y":32,"x":16,"var":"tipInfoBox"},"child":[{"type":"Label","props":{"wordWrap":true,"width":303,"text":"你确定要花费    钻石购买    个                      吗？","height":44,"fontSize":15,"color":"#582f2e","bold":true,"align":"left"}},{"type":"Label","props":{"y":1,"x":96,"width":16,"var":"needMoney","valign":"middle","name":"needMoney","height":13,"fontSize":13,"color":"#1b71a1","align":"left"}},{"type":"Label","props":{"y":2,"x":177,"width":19,"var":"buyNums","valign":"middle","name":"buyNums","height":13,"fontSize":13,"color":"#1b71a1","align":"left"}},{"type":"Label","props":{"y":0,"x":210,"width":87,"var":"needData","text":"强化工艺书","name":"needData","height":18,"fontSize":15,"color":"#582f2e","bold":true,"align":"left"}}]},{"type":"Button","props":{"y":86,"x":175,"var":"okBtn","stateNum":1,"skin":"gameUI/common/icon/btn_affirm.png"}},{"type":"Button","props":{"y":8,"x":313,"var":"closeBtn","stateNum":1,"skin":"gameUI/common/icon/closeBtnBg.png"}},{"type":"Button","props":{"y":86,"x":260,"var":"cancelBtn","stateNum":1,"skin":"gameUI/common/icon/btn_cancel.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.tips.BuyUpDataTipUI.uiView);
        }
    }
}

module ui.gameUI.tips {
    export class ConfirmCancelTipUI extends Dialog {
		public tipInfoBox:Laya.Box;
		public contentTxt:Laya.TextArea;
		public confirmBtn:Laya.Button;
		public closeBtn:Laya.Button;
		public cancelBtn:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":351,"height":120,"cacheAs":"bitmap"},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"gameUI/common/icon/tipBg.png"}},{"type":"Box","props":{"y":24,"x":16,"width":303,"var":"tipInfoBox","height":50,"cacheAs":"bitmap"},"child":[{"type":"TextArea","props":{"y":0,"x":0,"wordWrap":true,"width":296,"var":"contentTxt","mouseEnabled":false,"height":59,"fontSize":13,"editable":false,"color":" #582f2e","cacheAs":"bitmap","bold":true,"align":"left"}}]},{"type":"Button","props":{"y":86,"x":175,"var":"confirmBtn","stateNum":1,"skin":"gameUI/common/icon/btn_affirm.png"}},{"type":"Button","props":{"y":8,"x":313,"var":"closeBtn","stateNum":1,"skin":"gameUI/common/icon/closeBtnBg.png"}},{"type":"Button","props":{"y":86,"x":260,"var":"cancelBtn","stateNum":1,"skin":"gameUI/common/icon/btn_cancel.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.tips.ConfirmCancelTipUI.uiView);
        }
    }
}

module ui.gameUI.tips {
    export class CropInfoTipUI extends View {
		public cropName:Laya.Label;
		public state:Laya.Label;
		public phase:Laya.Label;
		public progress:Laya.ProgressBar;

        public static  uiView:any ={"type":"View","props":{"width":120,"height":70},"child":[{"type":"Label","props":{"y":0,"x":0,"var":"cropName","text":"xxxxxx（第x季）","color":"#f4ecec","bold":true}},{"type":"Label","props":{"y":18,"x":0,"var":"state","text":"状态（xx）","color":"#f4ecec","bold":true}},{"type":"Label","props":{"y":36,"x":0,"var":"phase","text":"种子（x小时幼苗期）","color":"#f4ecec","bold":true}},{"type":"ProgressBar","props":{"y":55,"x":0,"var":"progress","value":0.6,"skin":"gameUI/player/progress.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.tips.CropInfoTipUI.uiView);
        }
    }
}

module ui.gameUI.tips {
    export class ExamTipUI extends Dialog {
		public examName:Laya.Label;
		public examQualify1:Laya.Label;
		public examQualify2:Laya.Label;
		public passQualify:Laya.Label;
		public examScore:Laya.Label;
		public award:Laya.Label;

        public static  uiView:any ={"type":"Dialog","props":{"width":303,"height":222,"cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":25,"x":31,"text":"考试名称：","color":"#000000","bold":true}},{"type":"Label","props":{"y":54,"x":31,"text":"考试资格：","color":"#000000","bold":true}},{"type":"Label","props":{"y":144,"x":31,"text":"通过资格：","color":"#000000","bold":true}},{"type":"Label","props":{"y":168,"x":31,"text":"当前记录：","color":"#000000","bold":true}},{"type":"Label","props":{"y":190,"x":31,"text":"通过奖励：","color":"#000000","bold":true}},{"type":"Label","props":{"y":25,"x":105,"var":"examName","color":"#000000"}},{"type":"Label","props":{"y":52,"x":105,"width":143,"var":"examQualify1","height":15,"color":"#ea110e"}},{"type":"Label","props":{"y":70,"x":105,"var":"examQualify2","name":"examQualify2","color":"#f41f1b"}},{"type":"Label","props":{"y":144,"x":105,"var":"passQualify","color":"#000000"}},{"type":"Label","props":{"y":169,"x":105,"var":"examScore","color":"#000000"}},{"type":"Label","props":{"y":190,"x":105,"var":"award","color":"#000000"}},{"type":"Label","props":{"y":88,"x":105,"width":141,"text":"周六、日免费参加一次考试","height":12,"color":"#f60d09"}},{"type":"Label","props":{"y":106,"x":105,"width":153,"text":"周一~周五支付25钻石参加一","height":12,"color":"#000000"}},{"type":"Label","props":{"y":125,"x":105,"text":"次","color":"#000000"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.tips.ExamTipUI.uiView);
        }
    }
}

module ui.gameUI.tips {
    export class LimitTipUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":140,"height":143,"cacheAs":"bitmap"},"child":[{"type":"Label","props":{"y":25,"x":6,"width":129,"text":"炒锅等级必须大于","height":24,"fontSize":16,"font":"Helvetica","color":"#8F582B","bold":true}},{"type":"Label","props":{"y":56,"x":6,"width":131,"text":"四级才可以开启强","height":16,"fontSize":16,"font":"Helvetica","color":"#8F582B","bold":true}},{"type":"Label","props":{"y":86,"x":6,"text":"化功能！","fontSize":16,"font":"Helvetica","color":"#8F582B","bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.tips.LimitTipUI.uiView);
        }
    }
}

module ui.gameUI.toolBar {
    export class DownToolBarUI extends View {
		public bag:Laya.Button;
		public toolBox:Laya.Button;
		public spade:Laya.Button;
		public landUpgrade:Laya.Button;
		public commonMouse:Laya.Button;
		public harvestOne:Laya.Button;
		public harvestAll:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":547,"height":30},"child":[{"type":"Image","props":{"y":0,"x":0,"width":547,"skin":"gameUI/toolBar/bg.png","height":30}},{"type":"Button","props":{"y":-44,"x":235,"var":"bag","stateNum":1,"skin":"gameUI/toolBar/bag.png","name":"bag"}},{"type":"Button","props":{"y":-47,"x":314,"var":"toolBox","stateNum":1,"skin":"gameUI/toolBar/toolBox.png","name":"toolBox"}},{"type":"Button","props":{"y":-43,"x":162,"var":"spade","stateNum":1,"skin":"gameUI/toolBar/spade.png","name":"spade"}},{"type":"Button","props":{"y":-53,"x":73,"var":"landUpgrade","stateNum":1,"skin":"gameUI/toolBar/landUpgrade.png","name":"landUpgrade"}},{"type":"Button","props":{"y":-44,"x":-9,"var":"commonMouse","stateNum":1,"skin":"gameUI/toolBar/commonMouse.png","name":"commonMouse"}},{"type":"Button","props":{"y":-48,"x":389,"var":"harvestOne","stateNum":1,"skin":"gameUI/toolBar/harvestOne.png","name":"harvestOne"}},{"type":"Button","props":{"y":-48,"x":469,"var":"harvestAll","stateNum":1,"skin":"gameUI/toolBar/harvestAll.png","name":"harvestAll"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.toolBar.DownToolBarUI.uiView);
        }
    }
}

module ui.gameUI.toolBar {
    export class DownToolBoxUI extends View {
		public killWorm:Laya.Button;
		public removeGrass:Laya.Button;
		public water:Laya.Button;
		public grass:Laya.Button;
		public worm:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":200,"height":60},"child":[{"type":"Button","props":{"y":-9,"x":-6,"var":"killWorm","stateNum":1,"skin":"gameUI/toolBar/killWorm.png","name":"killWorm"}},{"type":"Button","props":{"y":-7,"x":68,"var":"removeGrass","stateNum":1,"skin":"gameUI/toolBar/removeGrass.png","name":"removeGrass"}},{"type":"Button","props":{"y":-9,"x":139,"var":"water","stateNum":1,"skin":"gameUI/toolBar/water.png","name":"water"}},{"type":"Button","props":{"y":-12,"x":205,"var":"grass","stateNum":1,"skin":"gameUI/toolBar/grass.png","name":"grass"}},{"type":"Button","props":{"y":-8,"x":274,"var":"worm","stateNum":1,"skin":"gameUI/toolBar/worm.png","name":"worm"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.toolBar.DownToolBoxUI.uiView);
        }
    }
}

module ui.gameUI.toolBar {
    export class FireTeaHome_DownToolBarUI extends View {
		public hand1:Laya.Button;
		public brush:Laya.Button;
		public pot_1:Laya.Button;
		public pot_2:Laya.Button;
		public hand2:Laya.Button;
		public hand3:Laya.Button;
		public bag:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":543,"height":30},"child":[{"type":"Image","props":{"y":0,"x":0,"width":543,"skin":"gameUI/toolBar/bg.png","height":30}},{"type":"Button","props":{"y":-44,"x":-12,"var":"hand1","stateNum":1,"skin":"gameUI/toolBar/commonMouse.png","name":"hand1"}},{"type":"Button","props":{"y":-37,"x":71,"var":"brush","stateNum":1,"skin":"gameUI/toolBar/brush.png","name":"brush"}},{"type":"Button","props":{"y":-42,"x":146,"var":"pot_1","stateNum":1,"skin":"gameUI/toolBar/pot_1.png","name":"pot_1"}},{"type":"Button","props":{"y":-38,"x":228,"var":"pot_2","stateNum":1,"skin":"gameUI/toolBar/pot_2.png","name":"pot_2"}},{"type":"Button","props":{"y":-47,"x":309,"var":"hand2","stateNum":1,"skin":"gameUI/toolBar/harvestOne.png","name":"hand2"}},{"type":"Button","props":{"y":-48,"x":382,"var":"hand3","stateNum":1,"skin":"gameUI/toolBar/harvestAll.png","name":"hand3"}},{"type":"Button","props":{"y":-44,"x":457,"var":"bag","stateNum":1,"skin":"gameUI/toolBar/bag.png","name":"bag"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.toolBar.FireTeaHome_DownToolBarUI.uiView);
        }
    }
}

module ui.gameUI.toolBar {
    export class FireTeaHome_RightDownToolBarUI extends View {
		public storage:Laya.Button;
		public shop:Laya.Button;
		public teaWiki:Laya.Button;
		public exam:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":330,"height":45},"child":[{"type":"Button","props":{"y":-19,"x":-1,"var":"storage","stateNum":1,"skin":"gameUI/toolBar/storage.png","name":"storage"}},{"type":"Button","props":{"y":-19,"x":80,"var":"shop","stateNum":1,"skin":"gameUI/toolBar/shop.png","name":"shop"}},{"type":"Button","props":{"y":-19,"x":165,"width":75,"var":"teaWiki","stateNum":1,"skin":"gameUI/toolBar/teaWiki.png","name":"teaWiki","height":75}},{"type":"Button","props":{"y":-19,"x":250,"width":75,"var":"exam","stateNum":1,"skin":"gameUI/toolBar/exam.png","name":"exam","height":75}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.toolBar.FireTeaHome_RightDownToolBarUI.uiView);
        }
    }
}

module ui.gameUI.toolBar {
    export class FriendList_DownToolBarUI extends View {
		public commonMouse:Laya.Button;
		public myHome:Laya.Button;
		public toolBox:Laya.Button;
		public harvestAll:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":368,"height":75},"child":[{"type":"Image","props":{"y":41,"x":0,"width":368,"skin":"gameUI/toolBar/bg.png","height":33}},{"type":"Button","props":{"y":0,"x":1,"var":"commonMouse","stateNum":1,"skin":"gameUI/toolBar/commonMouse.png","name":"commonMouse"}},{"type":"Button","props":{"y":-3,"x":99,"var":"myHome","stateNum":1,"skin":"gameUI/toolBar/myHomeBg.png","name":"myHome"}},{"type":"Button","props":{"y":-6,"x":194,"var":"toolBox","stateNum":1,"skin":"gameUI/toolBar/toolBox.png","name":"toolBox"}},{"type":"Button","props":{"y":-5,"x":278,"var":"harvestAll","stateNum":1,"skin":"gameUI/toolBar/harvestAll.png","name":"harvestAll"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.toolBar.FriendList_DownToolBarUI.uiView);
        }
    }
}

module ui.gameUI.toolBar {
    export class LeftToolBarUI extends View {
		public ranklist:Laya.Button;
		public activity:Laya.Button;
		public useExplain:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":70,"height":200},"child":[{"type":"Button","props":{"y":126,"x":5,"width":75,"var":"ranklist","stateNum":1,"skin":"gameUI/toolBar/ranklist.png","name":"ranklist","height":75}},{"type":"Button","props":{"y":58,"x":5,"width":75,"var":"activity","stateNum":1,"skin":"gameUI/toolBar/activityIcon.png","name":"activity","height":75}},{"type":"Button","props":{"y":-26,"x":0,"width":75,"var":"useExplain","stateNum":1,"skin":"gameUI/toolBar/btn_useExplain.png","name":"useExplain","height":75}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.toolBar.LeftToolBarUI.uiView);
        }
    }
}

module ui.gameUI.toolBar {
    export class LeftTopToolBarUI extends View {
		public teaRoom:Laya.Button;
		public friedTea:Laya.Button;
		public makeTea:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":220,"height":60},"child":[{"type":"Button","props":{"y":-13,"x":-3,"var":"teaRoom","stateNum":1,"skin":"gameUI/toolBar/tea_graden.png","name":"teaRoom"}},{"type":"Button","props":{"y":-10,"x":68,"var":"friedTea","stateNum":1,"skin":"gameUI/toolBar/friedTeaHome.png","name":"friedTea"}},{"type":"Button","props":{"y":-14,"x":146,"var":"makeTea","stateNum":1,"skin":"gameUI/toolBar/makeTeaHome.png","name":"makeTea"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.toolBar.LeftTopToolBarUI.uiView);
        }
    }
}

module ui.gameUI.toolBar {
    export class MakeTeaHome_DownToolBarUI extends View {
		public hand1:Laya.Button;
		public guide:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":230,"height":60},"child":[{"type":"Image","props":{"y":23,"x":0,"width":230,"skin":"gameUI/toolBar/bg.png","height":36}},{"type":"Button","props":{"y":-8,"x":3,"var":"hand1","stateNum":1,"skin":"gameUI/toolBar/commonMouse.png","name":"hand1"}},{"type":"Button","props":{"y":-17,"x":103,"var":"guide","stateNum":1,"skin":"gameUI/toolBar/guide.png","name":"guide"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.toolBar.MakeTeaHome_DownToolBarUI.uiView);
        }
    }
}

module ui.gameUI.toolBar {
    export class MakeTeaHome_RightDownToolBarUI extends View {
		public storage:Laya.Button;
		public shop:Laya.Button;
		public teaWiki:Laya.Button;
		public exam:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":330,"height":45},"child":[{"type":"Button","props":{"y":-19,"x":-1,"var":"storage","stateNum":1,"skin":"gameUI/toolBar/storage.png","name":"storage"}},{"type":"Button","props":{"y":-19,"x":80,"var":"shop","stateNum":1,"skin":"gameUI/toolBar/shop.png","name":"shop"}},{"type":"Button","props":{"y":-19,"x":165,"width":75,"var":"teaWiki","stateNum":1,"skin":"gameUI/toolBar/teaWiki.png","name":"teaWiki","height":75}},{"type":"Button","props":{"y":-19,"x":250,"width":75,"var":"exam","stateNum":1,"skin":"gameUI/toolBar/exam.png","name":"exam","height":75}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.toolBar.MakeTeaHome_RightDownToolBarUI.uiView);
        }
    }
}

module ui.gameUI.toolBar {
    export class RightDownToolBarUI extends View {
		public storage:Laya.Button;
		public shop:Laya.Button;
		public teaWiki:Laya.Button;
		public exam:Laya.Button;
		public friendBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":400,"height":75},"child":[{"type":"Button","props":{"var":"storage","stateNum":1,"skin":"gameUI/toolBar/storage.png","name":"storage"}},{"type":"Button","props":{"x":78,"var":"shop","stateNum":1,"skin":"gameUI/toolBar/shop.png","name":"shop"}},{"type":"Button","props":{"x":157,"width":75,"var":"teaWiki","stateNum":1,"skin":"gameUI/toolBar/teaWiki.png","name":"teaWiki","height":75}},{"type":"Button","props":{"x":239,"width":75,"var":"exam","stateNum":1,"skin":"gameUI/toolBar/exam.png","name":"exam","height":75}},{"type":"Button","props":{"x":319,"width":75,"var":"friendBtn","stateNum":1,"skin":"gameUI/toolBar/friendBtn.png","name":"friendBtn","height":75}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.gameUI.toolBar.RightDownToolBarUI.uiView);
        }
    }
}
