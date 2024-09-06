import { MAX_GAME_WIDTH, MAX_GAME_HEIGHT } from "../ts/constants/GameConstant";
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
    bodies: HTMLCollection;
    //蛇的存活状态 true存活 false死亡
    isAlive: Boolean = true;

    constructor(){
        this.element = <HTMLElement>document.getElementById("snake");
        this.head = <HTMLElement>document.querySelector("#snake > div");
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
        let lastDiv = (<HTMLElement>this.bodies[this.bodies.length-1]);
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
        
        this.element.insertAdjacentElement('beforeend', div);
        //增加分数
        scorePanel.incrementScore();
    }

    /**
     * 移动
     */
    move(direction:String){
        let left = this.head.style.left;
        let top = this.head.style.top;
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

        //移动身体
        if(this.isAlive && this.bodies.length > 1){
            for(let i = 1; i < this.bodies.length; i++){
                let tempLeft = (<HTMLElement>this.bodies[i]).style.left
                let tempTop = (<HTMLElement>this.bodies[i]).style.top;
                (<HTMLElement>this.bodies[i]).style.left = left;
                (<HTMLElement>this.bodies[i]).style.top = top;
                left = tempLeft
                top = tempTop
            }
        }
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
        if(left === this.head.offsetLeft){
            return;
        }
        //超过边界
        if(left < 0 || left > MAX_GAME_WIDTH){
            this.isAlive = false;
            return;
        }
        //蛇头是否碰到身体
        Array.prototype.forEach.call(this.bodies, (div:HTMLElement)=>{
            if(div['id'] !== 'snake_head'){
                if(div.offsetLeft === this.head.offsetLeft && div.offsetTop === this.head.offsetTop){
                    this.isAlive = false;
                    return;
                }
            }
        })
        // if(this.head.style.left === ){

        // }
        this.head.style.left = left + "px";
    }

    /**
     * 设置蛇的Y坐标
     * @returns 
     */
    set Y(top:number){
        //Y轴没有变化，不处理
        if(top === this.head.offsetTop){
            return;
        }
        //超过边界
        if(top < 0 || top > MAX_GAME_HEIGHT){
            this.isAlive = false;
            return;
        }
        //是否碰到身体
        Array.prototype.forEach.call(this.bodies, (div:HTMLElement)=>{
            if(div['id'] !== 'snake_head'){
                if(div.offsetLeft === this.head.offsetLeft && div.offsetTop === this.head.offsetTop){
                    this.isAlive = false;
                    return;
                }
            }
        })
        this.head.style.top = top + "px";
    }

    /**
     * 重置
     */
    reset(){
        this.isAlive = true;
        this.head.style.left = '0px';
        this.head.style.top = '0px';
        Array.prototype.forEach.call(this.element.children, (div:HTMLElement)=>{
            if(div['id'] !== 'snake_head'){
                div.parentNode.removeChild(div);
            }
        })
    }
}

export default Snake;