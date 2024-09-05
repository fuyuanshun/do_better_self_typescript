import './css/index.scss'

import Food from './modules/Food';
import ScorePannel from './modules/ScorePanel';
import Snake from './modules/Snake';


let direction: String;
const food : Food = new Food();
const snake: Snake = new Snake();
const scorePannel: ScorePannel = new ScorePannel();

/**
 * 游戏启动入口
 */
function init(){
    //生成食物
    food.random();
    //绑定键盘事件
    document.addEventListener("keydown", KeyDownHandler);
    //开启定时任务
    setInterval(function(){
        snake.move(direction);
        
    }, 1000)
}

init();



/**
 * 键盘事件
 * @param event 
 */
function KeyDownHandler(event:KeyboardEvent){
    console.log(event.key);
    switch(event.key){
        case 'ArrowLeft':
            direction = 'ArrowLeft';
            break;
        case 'ArrowRight':
            direction = 'ArrowRight';
            break;
        case 'ArrowUp':
            direction = 'ArrowUp';
            break;
        case 'ArrowDown':
            direction = 'ArrowDown';
            break;
        default:
            break;
    }
}
