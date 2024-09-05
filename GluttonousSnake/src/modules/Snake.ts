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
        switch(direction){
            //向左移动
            case 'ArrowLeft':
                if(this.head.offsetLeft - 10 < 0){
                    this.isAlive = false;
                    return;
                }
                this.head.style.left = this.head.offsetLeft - 10 + "px";
                break;
            //向右移动
            case 'ArrowRight':
                if(this.head.offsetLeft + 10 > MAX_GAME_WIDTH){
                    this.isAlive = false;
                    return;
                }
                this.head.style.left = this.head.offsetLeft + 10 + "px";
                break;
            //向上移动
            case 'ArrowUp':
                if(this.head.offsetTop - 10 < 0){
                    this.isAlive = false;
                    return;
                }
                this.head.style.top = this.head.offsetTop - 10 + "px";
                break;
            //向下移动
            case 'ArrowDown':
                if(this.head.offsetTop + 10 > MAX_GAME_HEIGHT){
                    this.isAlive = false;
                    return;
                }
                this.head.style.top = this.head.offsetTop + 10 + "px";
                break;
        }
        if(this.bodies.length > 1){
            // debugger
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
    getX(){
        return this.head.offsetLeft;
    }

    /**
     * 获取蛇的Y坐标
     * @returns 
     */
    getY(){
        return this.head.offsetTop;
    }

}

export default Snake;