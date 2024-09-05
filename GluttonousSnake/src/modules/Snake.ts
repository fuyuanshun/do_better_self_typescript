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

    constructor(){
        this.element = <HTMLElement>document.getElementById("snake");
        this.head = <HTMLElement>document.querySelector("#snake > div");
        this.bodies = this.element.getElementsByTagName("div");
    }

    /**
     * 添加蛇身体
     */
    addNode(){
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    /**
     * 移动
     */
    move(direction:String){
        switch(direction){
            case 'ArrowLeft':
                this.element.style.left = this.element.offsetLeft - 10 + "px";
                break;
            case 'ArrowRight':
                this.element.style.left = this.element.offsetLeft + 10 + "px";
                break;
            case 'ArrowUp':
                this.element.style.top = this.element.offsetTop - 10 + "px";
                break;
            case 'ArrowDown':
                this.element.style.top = this.element.offsetTop + 10 + "px";
                break;
        }
    }

    /**
     * 获取蛇的X坐标
     * @returns 
     */
    X(){
        return this.head.offsetLeft;
    }

    /**
     * 获取蛇的Y坐标
     * @returns 
     */
    Y(){
        return this.head.offsetTop;
    }

}

export default Snake;