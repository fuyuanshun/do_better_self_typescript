import './css/index.scss'
import Food from './modules/Food';
import ScorePannel from './modules/ScorePanel';
import Snake from './modules/Snake';


class Controler{

    // direction: string;
    food: Food;
    snake: Snake;
    scorePannel: ScorePannel;

    constructor(){
        this.food = new Food();
        this.snake = new Snake();
        this.scorePannel = new ScorePannel();
    }

    initGame(){
        //初始化食物
        this.food.random();
    }
}
new Controler().initGame();

