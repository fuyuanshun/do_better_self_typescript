import './css/index.scss'

import Food from './modules/Food';
import ScorePanel from './modules/ScorePanel';
import Snake from './modules/Snake';
import GameConstant from './ts/constants/GameConstant';
import FoodType from './ts/enums/FoodType';

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
let propInterval: ReturnType<typeof setInterval>;
let propTimeOut: ReturnType<typeof setInterval>;
//提示信息框
let infos = document.getElementById("infos");
//游戏结束时提示信息
let msg = document.getElementById("msg");
let tip = document.getElementById("tip");
//
let propInfos = document.getElementById("prop_infos");
//
let propTimes:number = 0;
//调用定时器的频率，也就是移动的速度
let moveSpeed:number = 300-(20*scorePanel.level);


let items = localStorage.getItem('snakeDatas');
if(items){
    let datas:[] = JSON.parse(items);
    setRankInfos(datas)
}

/**
 * 游戏启动入口
 */
function init(){
    snake.X = Math.round(GameConstant.INIT_LOCATION_X/10)*10;
    snake.Y = Math.round(GameConstant.INIT_LOCATION_Y/10)*10;
    //生成食物
    randomFood();
    //绑定键盘事件
    document.addEventListener("keydown", KeyDownHandler);
    //开启定时任务
    openInterval(moveSpeed);
}
//初始化游戏
init();

function openInterval(speed:number){
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
            console.log("吃到的食物类型为：", food.foodType)
            //加速
            if(food.foodType === FoodType.FAST_FOOD){
                clearInterval(interval);
                if(propTimeOut){
                    clearTimeout(propTimeOut);
                }
                openInterval(GameConstant.PROPS_FAST_FOOD_SPEED);
                propTimeOut = setTimeout(function(){
                    clearInterval(interval);
                    openInterval(moveSpeed);
                }, GameConstant.PROPS_ALIVE_TIME*1000)
                setPropInfo('加速', GameConstant.PROPS_ALIVE_TIME);
            }
            //减速
            if(food.foodType === FoodType.SLOW_FOOD){
                clearInterval(interval);
                if(propTimeOut){
                    clearTimeout(propTimeOut);
                }
                openInterval(GameConstant.PROPS_SLOW_FOOD_SPEED);
                setTimeout(function(){
                    clearInterval(interval);
                    openInterval(moveSpeed);
                }, GameConstant.PROPS_ALIVE_TIME*1000)
                setPropInfo('减速', GameConstant.PROPS_ALIVE_TIME);
            }
            randomFood();
            snake.addNode(direction, scorePanel);
        }
    }, speed)
}

function setPropInfo(type:string, time:number){
    if(propInterval){
        clearInterval(propInterval);
    }
    propTimes = time;
    propInfos.innerHTML = `<span>${type}时间：<strong>${time}</strong>秒</span>`
    propInterval = setInterval(() => {
        propTimes--;
        if(propTimes < 0){
            clearInterval(propInterval);
            propInfos.innerHTML = ''
        } else {
            propInfos.innerHTML = `<span>${type}时间：<strong>${propTimes}</strong>秒</span>`
        }
    }, 1000);
}

/**
 * 1.生成食物，当生成的食物在蛇身上时，重新生成
 */
function randomFood(){
    //生成食物
    food.random();
    //判断是否和蛇重叠
    for(let i = 0; i < snake.bodies.length; i++){
        let body = (<HTMLElement>snake.bodies[i]);
        while(food.X === body.offsetLeft && food.Y === body.offsetTop){
            food.random();
        }
    }
}

/**
 * 键盘事件
 * @param event 
 */
function KeyDownHandler(event:KeyboardEvent){
    //两节身子，不能反方向调头
    if(snake.bodies.length > 1){
        let firstBody = <HTMLElement>snake.bodies[1];
        //当前为向左移动，不能向右移动
        if(event.key === 'ArrowLeft' && firstBody.offsetLeft === snake.X-10){
            return;
        }
        //当前为向右移动，不能向左移动
        if(event.key === 'ArrowRight' && firstBody.offsetLeft === snake.X+10){
            return;
        }
        //当前为向上移动，不能向下移动
        if(event.key === 'ArrowUp' && firstBody.offsetTop === snake.Y-10){
            return;
        }
        //当前为向下移动，不能向上移动
        if(event.key === 'ArrowDown' && firstBody.offsetTop === snake.Y+10){
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
 * 游戏结束后重新开始监听事件
 * @param event 
 * @returns 
 */
function KeyDownRestartHandler(event:KeyboardEvent){
    switch(event.key){
        case 'Enter':
        case ' ':
            restart();
            return;
    }
}

/**
 * 重新开始游戏
 */
function restart(){
    document.removeEventListener("keydown", KeyDownRestartHandler);

    infos.className = 'hide';
    msg.innerHTML = '';
    tip.innerHTML = '按空格键重新开始游戏';
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
    if(propTimeOut){
        clearTimeout(propTimeOut)
    }
    if(propInterval){
        clearInterval(propInterval)
    }
    //移除按键监听
    document.removeEventListener("keydown", KeyDownHandler);
    document.addEventListener("keydown", KeyDownRestartHandler);
    
    infos.className = '';
    propInfos.innerHTML = ''
    
    msg.innerHTML = '游戏结束！分数：' + scorePanel.score;
    tip.innerHTML = '按空格键重新开始游戏';

    const name = prompt('游戏结束.您可以输入您的名字记录分数');
    if(!name){
        return;
    }
    let snakeDatas = localStorage.getItem('snakeDatas');
    if(snakeDatas){
        let snakeDatasStr = localStorage.getItem('snakeDatas');
        let snakeDatas =  JSON.parse(snakeDatasStr);
        console.log(snakeDatas);
        let exists:boolean = false;
        for(let i = 0; i < snakeDatas; i++){
            if(snakeDatas[i].name === name){
                snakeDatas[i].score = scorePanel.score;
                return;
            }
        }
        if(!exists){
            snakeDatas.push({
                name:name,
                score:scorePanel.score
            })
        }
        localStorage.setItem('snakeDatas', JSON.stringify(snakeDatas));
        setRankInfos(snakeDatas);
    } else {
        let data = [
            {'name':name,'score':scorePanel.score}
        ]
        localStorage.setItem('snakeDatas', JSON.stringify(data))
        setRankInfos(<[]>data);
    }
}

function setRankInfos(datas:[]){
    console.log(datas);
    const rank = document.getElementById("rank");
    let arr:string = '';
    datas.sort((a,b)=>b['score']-a['score']);
    for(let i = 0; i < datas.length; i++){
        let name = datas[i]['name'];
        let score = datas[i]['score'];
        let fontSize:string;
        if(i == 0){
            fontSize = '24px'
        } else if(i == 1){
            fontSize = '18px'
        } else if(i == 2){
            fontSize = '16px'
        }
        arr += `<li class="rank_detail">第<strong style="font-size:${fontSize}">${i+1}</strong>名<span class="name">${name}</span><span class="score">${score}</span>分</li>`;
    }
    rank.innerHTML = arr
}

