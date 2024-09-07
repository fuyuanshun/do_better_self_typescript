class GameConstant{
    //蛇头初始位置-X轴 必须是10的整数
    static INIT_LOCATION_X:number = 140;

    //蛇头初始位置-Y轴 必须是10的整数
    static INIT_LOCATION_Y:number = 140;

    //游戏界面宽度
    static MAX_GAME_WIDTH:number = 290;

    //游戏界面高度
    static MAX_GAME_HEIGHT:number = 290;

    //每多少分增加一阶段速度
    static SCORE_STAGE:number = 2;

    //生成道具食物的概率
    static PROPS_PROBABILITY:number = 0.5;

    //吃到加速食物后的移动速度倍数（越小跑的越快）
    static PROPS_FAST_FOOD_SPEED:number = 0.5;

    //吃到减速食物后的移动速度倍数（越大跑的越慢）
    static PROPS_SLOW_FOOD_SPEED:number = 1.5;

    //道具持续时间，单位s
    static PROPS_ALIVE_TIME:number = 10;

    //最大速度阶段数
    static MAX_LEVEL:number = 10;
}


export default GameConstant;