/**
 * 食物
 */
class Food {
    element : HTMLElement;
    constructor(){
        this.element = <HTMLElement>document.getElementById("food");
    }

    /**
     * 随机食物的位置 width：300 height：300 食物大小8px
     * 随机位置为1~
     */
    random(){
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
}

export default Food;