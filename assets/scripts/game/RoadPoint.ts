import { _decorator, Component, Node, Vec3, Prefab, Enum } from "cc";
const { ccclass, property } = _decorator;

enum ROAD_POINT_TYPE{
    NORMAL=1,
    START,
    GREETING,
    GOODBYE,
    END,
    AI_START
}
Enum(ROAD_POINT_TYPE);

enum ROAD_MOVE_TYPE{
    LINE=1,
    CURVE
}
Enum(ROAD_MOVE_TYPE);

@ccclass("RoadPoint")
export class RoadPoint extends Component {
    //@property序列化
    @property({
        type:ROAD_POINT_TYPE,
        displayOrder:1,
        displayName:"结点类型",
        tooltip:"小车路上转折结点类型"
    }) 
    type =ROAD_POINT_TYPE.NORMAL;

    @property({
        type:cc.Node,
        displayOrder:2,
        visible:function(this:RoadPoint){
            return this.type !==ROAD_POINT_TYPE.END;
        }
    }) 
    nextStation:Node=null;

    @property({
        type:ROAD_MOVE_TYPE,
        displayOrder:3,
        displayName:"移动方式",
        tooltip:"小车移动方式",
        visible:function(this:RoadPoint){
            return this.type !==ROAD_POINT_TYPE.END;
        }
    }) 
    moveType=ROAD_MOVE_TYPE.LINE;

    @property({
        displayOrder:4,
        visible:function(this:RoadPoint){
            return this.type !==ROAD_POINT_TYPE.END && this.moveType===ROAD_MOVE_TYPE.CURVE;
        }
    })
    clockwise=true;

    @property({
        type:Vec3,
        visible:function(this:RoadPoint){
            return this.type ===ROAD_POINT_TYPE.GREETING || this.type === ROAD_POINT_TYPE.GOODBYE;
        }
    })
    direction=new Vec3(1,0,0);

    @property({
        visible:function(this:RoadPoint){
            return this.type === ROAD_POINT_TYPE.AI_START;
        }
    })
    interval = 3;

    @property({
        visible:function(this:RoadPoint){
            return this.type === ROAD_POINT_TYPE.AI_START;
        }
    })
    delayTime=0;

    @property({
        visible:function(this:RoadPoint){
            return this.type === ROAD_POINT_TYPE.AI_START;
        }
    })
    speed=0.05;

    //car201 car202
    @property({
        visible:function(this:RoadPoint){
            return this.type === ROAD_POINT_TYPE.AI_START;
        }
    })
    car='car201';

}
