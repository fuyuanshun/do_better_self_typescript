import GameConstant from "../ts/constants/GameConstant";
import FoodType from "../ts/enums/FoodType";

/**
 * 食物
 */
class Food {
    element : HTMLElement;
    //用于修改食物颜色
    els: HTMLCollection;
    //食物类型
    type:FoodType = FoodType.NORMAL_FOOD;

    constructor(){
        this.element = <HTMLElement>document.getElementById("food");
        this.els = document.getElementsByClassName("food");
    }

    /**
     * 随机食物的位置 width：300 height：300 食物大小10px
     * 随机位置为0~290
     */
    random(){
        //根据生成的随机数判断是否生成特殊食物
        let randomNum = Math.random();
        //食物颜色由四个颜色组成
        let color:string[]=['black','black','black','black'];
        let rType:FoodType = 0;
        //根据配置计算生成道具的概率
        if(randomNum > 1 - GameConstant.PROPS_PROBABILITY){
            //过滤掉枚举数组中的字符
            let foodTypeArr = Object.values(FoodType).filter(e=> typeof e === 'number')
            //穿墙食物 0.1概率
            if(randomNum > 0.9){
                color = ['red','yellow','blue','green']
                rType = foodTypeArr[foodTypeArr.length-1]
            //跑的更快
            } else if(randomNum > 0.7){
                color = ['red','red','red','red']
                rType = foodTypeArr[foodTypeArr.length-2]
            //跑的更慢
            } else {
                color = ['gray','gray','gray','gray']
                rType = foodTypeArr[foodTypeArr.length-3]
            }
        }
        //修改食物颜色
        for(let i = 0; i < this.els.length; i++){
            let e = <HTMLElement>this.els[i];
            e.style.backgroundColor = color[i];
        }
        //食物类型
        this.type = rType;
        this.element.style.left = Math.round(Math.random() * 29) * 10 + "px"
        this.element.style.top = Math.round(Math.random() * 29) * 10  + "px"
    }

    /**
     * 获取食物的X轴坐标
     * @returns 
     */
    get X(){
        return this.element.offsetLeft;
    }

    /**
     * 获取食物的Y轴坐标
     * @returns 
     */
    get Y(){
        return this.element.offsetTop;
    }

    get foodType(){
        return this.type;
    }
}

export default Food;