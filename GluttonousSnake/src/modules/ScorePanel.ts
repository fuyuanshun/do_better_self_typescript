/**
 * 计分板
 */
class ScorePanel{
    score = 0;
    level = 1;

    scoreEle: Element;
    levelEle: Element;

    constructor(){
        this.scoreEle = <Element>document.getElementById("scorePannel")!.firstElementChild;
        this.levelEle = <Element>document.getElementById("scorePannel")!.lastElementChild;
    }

    /**
     * 增加分数
     */
    incrementScore(){
        this.score++;
        this.scoreEle.getElementsByTagName("strong")[0].innerHTML = this.score+'';
    }
}

export default ScorePanel;