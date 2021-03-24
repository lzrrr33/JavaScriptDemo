/**
 * @Author： faizer
 * @date： 2021/3/23
 */

'use strict';

window.onload = function () {
    Game.init();
}

var JumpState= true;
var time1; // 定义一堆定时器
var time2;
var time3;
var time4;
var time5;
var time6;
var mario;

var Game = {
    data : {
    //各类参数定义
        stone : {
            speed: 10,
        },
        bird : {
            speed: 10,
        },
        Mario : {
            speed_y : 25,  //起跳速度
            accelerate : 1, //重力加速度
        }
    },

    init : function (){
        this.createMario();
    },


    // 创建马里奥
    createMario : function (){
        mario = $("<div>").attr('class', 'mario');
        mario.appendTo('#layout');
        time1 = setInterval(function (){ // 定时产生石头
            Game.createStone();
        },4000);

        time2 = setInterval(function (){  // 定时产生乌鸦
            time6 = setInterval(function (){
                Game.createBird();
            },8000);
            clearTimeout(time2);
        },5000);


    },
    //创建石头
    createStone : function (){
        var stone = $("<div>").attr('class', 'stone');
        stone.appendTo('#layout');
        var offsetLeft = parseInt(stone.css('left'));
        time3 = setInterval(function () {  // 石头运动
            if(offsetLeft<=-100){
                stone.remove();
                clearInterval(time3);
            }
            if(Game.TC(stone, mario)){
                console.log('1111')
                Game.gameover();
            }
            offsetLeft = offsetLeft-parseInt(Game.data.stone.speed);
            stone.css('left', offsetLeft+'px');


        },20);

    },
    // 产生乌鸦
    createBird : function (){
        var bird = $("<div>").attr('class', 'bird');
        bird.appendTo('#layout');
        var offsetLeft = parseInt(bird.css('left'));
        time4 = setInterval(function () { // 乌鸦运动
            if(offsetLeft<=-120){
                bird.remove();
                clearInterval(time4);
            }

            if(Game.TC(bird, mario)){
                console.log('2222')
                Game.gameover();
            }

            offsetLeft = offsetLeft-parseInt(Game.data.bird.speed);
            bird.css('left', offsetLeft+'px');
        },20);
    },

    TC : function (obj, mario){  // 碰撞检测
        var t1 = parseInt(obj.css('top')),
            l1 = parseInt(obj.css('left')),
            r1 = parseInt(obj.css('left'))+parseInt(obj.css('width')),
            b1 = parseInt(obj.css('top'))+parseInt(obj.css('height')),


            r2 = parseInt(mario.css('left'))+parseInt(mario.css('width')),
            b2 = parseInt(mario.css('top'))+parseInt(mario.css('height')),
            l2 = parseInt(mario.css('left')),
            t2 = parseInt(mario.css('top'));

        if(b2<t1 || l2>r1 || r2<l1 || t2>b1){
            return false;
        }else{
            console.log(b2+":"+t1+"  "+l2+":"+r1+"  "+r2+":"+l1);
            return true;
        }
    },

    gameover  : function () {  // 游戏结束
        clearTimeout(time1);
        clearTimeout(time2);
        clearTimeout(time3);
        clearTimeout(time4);
        clearTimeout(time5);
        clearTimeout(time6);
        $("#start").css('display', 'block')

    }

}



$(window).keydown(function (e) {  // 跳跃事件
    var keycode = e.keyCode;
    if(keycode==32 && JumpState){
        JumpState = false;  // 跳跃中不可起跳
        var mario = $('.mario');
        mario.css('background','url(\'img/mario3.png\') 50% no-repeat');
        var offsettop = parseInt(mario.css('top'));
        var rawtop = offsettop;
        var speed = Game.data.Mario.speed_y;
        time5 = setInterval(function () {
            offsettop = offsettop - speed;
            speed = speed-parseInt(Game.data.Mario.accelerate);
            if(offsettop==rawtop){
                JumpState = true;
                mario.css('background','url(\'img/mario1.png\') 50% no-repeat');
                clearInterval(time5);
            }
            mario.css('top',offsettop+'px');

        }, 20);

    }
});

$('#startBtn').click(function () { // 重新开始
    location.reload();
});