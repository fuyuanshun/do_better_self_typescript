import { SCORE_STAGE, MAX_LEVEL } from "../ts/constants/GameConstant";

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
        //根据配置每增加指定分数，增加一阶段速度
        if(this.score % SCORE_STAGE === 0){
            //
            if(this.level >= MAX_LEVEL){
                return;
            }
            this.level++;
            this.levelEle.getElementsByTagName("strong")[0].innerHTML = this.level+'';
        }
    }

    /**
     * 重置计分板
     */
    reset(){
        this.score = 0;
        this.level = 1;
        this.scoreEle.getElementsByTagName("strong")[0].innerHTML = this.score+'';
        this.levelEle.getElementsByTagName("strong")[0].innerHTML = this.level+'';
    }
}

export default ScorePanel;