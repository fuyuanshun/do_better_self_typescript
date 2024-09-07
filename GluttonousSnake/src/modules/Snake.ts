import GameConstant from "../ts/constants/GameConstant";
import FoodType from "../ts/enums/FoodType";
import ScorePanel from "./ScorePanel";

/**
 * 蛇
 */
class Snake{
    //蛇的容器
    element: HTMLElement;
    //蛇头
    head: HTMLElement;
    //蛇身体（包括头节点）
    bodies: HTMLCollectionOf<HTMLElement>;
    //蛇的存活状态 true存活 false死亡
    isAlive: Boolean = true;
    //当前生效的道具
    currProp:number;

    constructor(){
        this.element = document.getElementById("snake");
        this.head = document.querySelector("#snake > div");
        this.bodies = this.element.getElementsByTagName("div");
    }

    /**
     * 添加蛇身体
     * 添加位置:
     *      向左移动时，最后一节身体的右侧
     *      向右移动时，最后一节身体的左侧
     *      向上移动时，最后一节身体的下方
     *      向下移动时，最后一节身体的上方
     */
    addNode(direction:String, scorePanel:ScorePanel){
        let div = document.createElement('div');
        let lastDiv = this.bodies[this.bodies.length-1];
        if(direction === 'ArrowLeft'){
            div.style.left = lastDiv.offsetLeft + 10 + "px";
            div.style.top = lastDiv.offsetTop + "px";
        } else if(direction === 'ArrowRight'){
            div.style.left = lastDiv.offsetLeft - 10 + "px";
            div.style.top = lastDiv.offsetTop + "px";
        } else if(direction === 'ArrowUp'){
            div.style.left = lastDiv.offsetLeft + "px";
            div.style.top = lastDiv.offsetTop + 10 + "px";
        } else if(direction === 'ArrowDown'){
            div.style.left = lastDiv.offsetLeft + "px";
            div.style.top = lastDiv.offsetTop - 10 + "px";
        }
        if(this.currProp){
            if(this.currProp == FoodType.FAST_FOOD){
                div.style.backgroundColor = 'red';
            } else if(this.currProp === FoodType.SLOW_FOOD){
                div.style.backgroundColor = 'gray';
            }
        }
        this.element.insertAdjacentElement('beforeend', div);
        //增加分数
        scorePanel.incrementScore();
    }

    /**
     * 移动
     */
    move(direction:String){
        //移动后的X轴位置
        let x:number;
        //移动后的Y轴位置
        let y:number;
        switch(direction){
            //向左移动
            case 'ArrowLeft':
                x = this.head.offsetLeft - 10;
                break;
            //向右移动
            case 'ArrowRight':
                x = this.head.offsetLeft + 10;
                break;
            //向上移动
            case 'ArrowUp':
                y = this.head.offsetTop - 10;
                break;
            //向下移动
            case 'ArrowDown':
                y = this.head.offsetTop + 10;
                break;
        }
        this.X = x;
        this.Y = y;
    }

    /**
     * 获取蛇的X坐标
     * @returns 
     */
    get X(){
        return this.head.offsetLeft;
    }

    /**
     * 获取蛇的Y坐标
     * @returns 
     */
    get Y(){
        return this.head.offsetTop;
    }

    /**
     * 设置蛇的X坐标
     * @returns 
     */
    set X(left:number){
        //X轴没有变化，不处理
        if(left === undefined || left === this.head.offsetLeft){
            return;
        }
        //超过边界
        if(left < 0 || left > GameConstant.MAX_GAME_WIDTH){
            this.isAlive = false;
            return;
        }
        //移动
        this.moveHeadAndBody(left, this.head.offsetTop)
    }

    /**
     * 设置蛇的Y坐标
     * @returns 
     */
    set Y(top:number){
        //Y轴没有变化，不处理
        if(top === undefined || top === this.head.offsetTop){
            return;
        }
        //超过边界
        if(top < 0 || top > GameConstant.MAX_GAME_HEIGHT){
            this.isAlive = false;
            return;
        }
        
        this.moveHeadAndBody(this.head.offsetLeft, top)
    }

    setColor(color:string){
        if(!color){
            return;
        }
        for(let i = 0 ; i < this.bodies.length; i++){
            let body = this.bodies[i];
            body.style.backgroundColor = color;
        }
    }

    clearColor(){
        for(let i = 0 ; i < this.bodies.length; i++){
            let body = this.bodies[i];
            body.style.backgroundColor = '';
        }
        this.currProp = FoodType.NORMAL_FOOD;
    }

    /**
     * 蛇头和身体移动的具体实现方法
     * @param left 
     * @param top 
     * @returns 
     */
    moveHeadAndBody(left:number, top:number){
        //蛇头移动前的位置，也就是下一节身体要移动的位置
        //每循环一次，将更新为前一节身体的位置
        let x:number = left;
        let y:number = top;
        //移动蛇的每一个部分（包括蛇头）
        for(let i = 0; i < this.bodies.length; i++){
            let div = <HTMLElement>this.bodies[i];
            let eLeft = div.offsetLeft
            let eTop = div.offsetTop;
            //蛇头移动.需要判断是否撞到自身
            //蛇不可能撞到第1、2、3节身体（不包括头）
            if(div['id'] === 'snake_head' && this.bodies.length > 3){
                for(let j = 3; j < this.bodies.length; j++){
                    let body = <HTMLElement>this.bodies[j];
                    //x蛇要移动到的X轴 y蛇要移动到的Y轴
                    if(x === body.offsetLeft && y === body.offsetTop){
                        this.isAlive = false;
                        return;
                    }
                }
            }
            div.style.left = x + "px";
            div.style.top = y + "px";
            x = eLeft
            y = eTop
        }
    }

    /**
     * 重置
     *  循环删除数组中的元素时，由于下标变化可能会导致异常，可以从后往前删除
     */
    reset(){
        this.isAlive = true;
        this.head.style.left = '0px';
        this.head.style.top = '0px';
        for(let i = this.bodies.length - 1; i > 0; i--){
            let div = (<HTMLElement>this.bodies[i])
            if(div['id'] !== 'snake_head'){
                div.parentNode.removeChild(div)
            }
        }
    }
}

export default Snake;