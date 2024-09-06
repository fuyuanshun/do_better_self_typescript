import './css/index.scss'

import Food from './modules/Food';
import ScorePanel from './modules/ScorePanel';
import Snake from './modules/Snake';

//移动方向
let direction: String;
//食物
const food : Food = new Food();
//蛇
const snake: Snake = new Snake();
//计分板
const scorePanel: ScorePanel = new ScorePanel();
//定时器
let interval: ReturnType<typeof setInterval>;
//游戏结束时提示信息
let infos = document.getElementById("infos");

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
        if(snake.X === food.X && snake.Y === food.Y){
            food.random();
            snake.addNode(direction, scorePanel);
        }
    }, 500-(40*scorePanel.level))
}

init();


/**
 * 重新开始游戏
 */
function restart(){
    document.removeEventListener("keydown", KeyDownRestartHandler);

    infos.innerHTML = '';
    infos.className = 'hide';
    direction = '';
    
    snake.reset();
    scorePanel.reset();
    init();
}

/**
 * 游戏结束
 */
function gameOver(){
    //移除定时器
    clearInterval(interval);
    //移除按键监听
    document.removeEventListener("keydown", KeyDownHandler);
    document.addEventListener("keydown", KeyDownRestartHandler);
    
    infos.className = '';
    infos.innerHTML = '游戏结束！分数：' + scorePanel.score;
}

/**
 * 键盘事件
 * @param event 
 */
function KeyDownHandler(event:KeyboardEvent){
    //两节身子，不能反方向调头
    if(snake.bodies.length > 1){
        //当前为向左移动，不能向右移动
        if(direction === 'ArrowLeft' && event.key === 'ArrowRight'){
            return;
        }
        //当前为向左移动，不能向右移动
        if(direction === 'ArrowRight' && event.key === 'ArrowLeft'){
            return;
        }
        //当前为向上移动，不能向下移动
        if(direction === 'ArrowUp' && event.key === 'ArrowDown'){
            return;
        }
        //当前为向下移动，不能向上移动
        if(direction === 'ArrowDown' && event.key === 'ArrowUp'){
            return;
        }
    }
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

/**
 * 游戏结束后重新开始
 * @param event 
 * @returns 
 */
function KeyDownRestartHandler(event:KeyboardEvent){
    switch(event.key){
        case ' ':
            restart();
            return;
    }
}
