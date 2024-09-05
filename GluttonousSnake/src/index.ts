import './css/index.scss'

import Food from './modules/Food';
import ScorePanel from './modules/ScorePanel';
import Snake from './modules/Snake';


let direction: String;
const food : Food = new Food();
const snake: Snake = new Snake();
const scorePanel: ScorePanel = new ScorePanel();
//定时器
let interval;

/**
 * 游戏启动入口
 */
function init(){
    //生成食物
    food.random();
    //绑定键盘事件
    document.addEventListener("keydown", KeyDownHandler);
    //开启定时任务
    interval = setInterval(function(){
        if(!direction){
            return;
        }
        snake.move(direction);
        //移动后蛇超过边界或者碰到自己的身体，游戏结束
        if(!snake.isAlive){
            gameOver();
        }
        if(snake.getX() === food.getX() && snake.getY() === food.getY()){
            food.random();
            snake.addNode(direction, scorePanel);
        }
    }, 500-(40*scorePanel.level))
}

init();


/**
 * 游戏结束
 */
function gameOver(){
    //移除定时器
    clearInterval(interval);
    //移除按键监听
    document.removeEventListener("keydown", KeyDownHandler);
    alert("游戏结束，分数：" + scorePanel.score);
}

/**
 * 键盘事件
 * @param event 
 */
function KeyDownHandler(event:KeyboardEvent){
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
