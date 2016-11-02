/**
 * Created by zxf111 on 2016/9/28.
 */




/**页面*/
var index = 1;
window.onload=function() {
    //音乐
    /*others*/
    /*将拿到的jQuery元素转换成dom元素*/

    var $video = $('#music');
    var video = $video[0];//播放的音频id
    console.log(video);
    var $musicBtn = $('#musicBtn');//停止播放按钮
    var musicBtn = $musicBtn[0];
    console.log(musicBtn);
//console.log($('#smallIcon'));
//var index=1;

//点击音乐按钮的点击事件
    musicBtn.onclick=function(){
        //判断播放音频的状态( 暂停?actionPause():noactionPause() )
        video.paused?actionPause():noactionPause();
        //判断点击按钮是否旋转( 旋转?actionAuto():noactionAuto() )
        if(video.paused==true)
        {
           actionAuto();
        }
        else{
           noactionAuto();
        }
    };

//定时器timer生成小音符飘呀飘  你是a飘
    var timer = setInterval(function(){
        var random = Math.ceil(Math.random()*10+5);
        var deg = Math.ceil(Math.random()*360);
        var smallIcon = document.getElementById('smallIcon');
        var ele = document.createElement('div');
        ele.style.width = random+'px';
        ele.style.height = random+'px';
        ele.style.transform = 'rotate('+deg+'deg)';
        ele.className = 'create'+' smallMusic';
        smallIcon.appendChild(ele);
        if($('.create').length>3){
            //console.log('大于3啦!');
            //console.log($('.create')[0]);
            smallIcon.removeChild($('.create')[0]);
            //console.log('现在还剩下'+$('.create').length+'个节点');
        }
        //console.log(ele.style.width+'角度'+deg);
    },500);

//播放音乐
    function actionPause(){
        video.play();
        check(true);
        timer = setInterval(function(){
            var random = Math.ceil(Math.random()*10+5);
            var deg = Math.ceil(Math.random()*360);
            var smallIcon = document.getElementById('smallIcon');
            var ele = document.createElement('div');
            ele.style.width = random+'px';
            ele.style.height = random+'px';
            ele.style.transform = 'rotate('+deg+'deg)';
            ele.className = 'create'+' smallMusic';
            smallIcon.appendChild(ele);
            if($('.create').length>3){
                //console.log('大于3啦!');
                //console.log($('.create')[0]);
                smallIcon.removeChild($('.create')[0]);
                //console.log('现在还剩下'+$('.create').length+'个节点');
            }
            //console.log(ele.style.width+'角度'+deg);
        },500);
    }
//暂停音乐
    function noactionPause(){
        video.pause();
        check(false);
        //clearInterval(timer);
    }
//图标停止旋转
    function actionAuto(){
        $musicBtn.removeClass('auto');
    }
//图标开始旋转
    function noactionAuto(){
        $musicBtn.addClass('auto');
    }
//根据音乐播放状态判断定时器的clear or set
    function check(value){
        if(!value){
            clearInterval(timer);
        }else {
            console.log('音乐已在播放');
        }

    }

    /*mtself*/
    //function music(){
//    if ($('#musicA').hasClass('on'))
//    {
//        $('#audio').get(0).pause();
//        $('#musicA').attr('class','stop');
//    }
//    else
//    {
//        $('#musicA audio').get(0).play();
//        $('#musicA').attr('class','on');
//    }
//    event.preventDefault(); //阻止冒泡
//}



    setTimeout(function () {
        index++;
        changePage();
    }, 3000)
    var carMove = document.getElementById('carMove');
    carMove.onclick = function () {
        this.classList.add('carMove1');
        var that = this;
        setTimeout(function () {
            $('.pages').css('left', -200 + '%');

        },3000);
        setTimeout(function () {
            $('.pages').css('left', -200 + '%');
            that.classList.remove('carMove1');
        },4000);

    };



    var angle = 0;
    touch.on('.fangxiangpan', 'touchstart', function (ev) {
        console.log('1111');
        ev.startRotate();
        ev.preventDefault();
    });
    touch.on('.fangxiangpan', 'rotate', function (ev) {
        console.log('2222');
        var totalAngle = angle + ev.rotation;
        this.style.webkitTransform = 'translate(-50%,0) rotate(' + totalAngle + 'deg)';
        this.style.transform = 'translate(-50%,0) rotate(' + totalAngle + 'deg)';
        this.style.webkitTransformOrigin = 'center';
        if (ev.fingerStatus === 'end') {
            angle = 0;
            if (ev.direction == "left") {
                index = index - 1 < 2 ? 2 : index - 1;
            } else if (ev.direction == "right") {
                index = index + 1 > 8 ? 8 : index + 1;
            }
            changePage();
            this.style.webkitTransform = 'translate(-50%,0) rotate(' + angle + 'deg)';
            this.style.transform = 'translate(-50%,0) rotate(' + angle + 'deg)';
        }

    });
    function changePage() {
        $('.pages').css('left', -(index - 1) * 100 + '%');
        var pages = document.querySelector('pages');
        $('.pages>.page').removeClass('active');
        $('.page' + (index)).addClass('active');

    }

};