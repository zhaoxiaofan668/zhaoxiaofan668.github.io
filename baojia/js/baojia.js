/**
 * Created by zxf111 on 2016/9/28.
 */




/**ҳ��*/
var index = 1;
window.onload=function() {
    //����
    /*others*/
    /*���õ���jQueryԪ��ת����domԪ��*/

    var $video = $('#music');
    var video = $video[0];//���ŵ���Ƶid
    console.log(video);
    var $musicBtn = $('#musicBtn');//ֹͣ���Ű�ť
    var musicBtn = $musicBtn[0];
    console.log(musicBtn);
//console.log($('#smallIcon'));
//var index=1;

//������ְ�ť�ĵ���¼�
    musicBtn.onclick=function(){
        //�жϲ�����Ƶ��״̬( ��ͣ?actionPause():noactionPause() )
        video.paused?actionPause():noactionPause();
        //�жϵ����ť�Ƿ���ת( ��ת?actionAuto():noactionAuto() )
        if(video.paused==true)
        {
           actionAuto();
        }
        else{
           noactionAuto();
        }
    };

//��ʱ��timer����С����ƮѽƮ  ����aƮ
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
            //console.log('����3��!');
            //console.log($('.create')[0]);
            smallIcon.removeChild($('.create')[0]);
            //console.log('���ڻ�ʣ��'+$('.create').length+'���ڵ�');
        }
        //console.log(ele.style.width+'�Ƕ�'+deg);
    },500);

//��������
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
                //console.log('����3��!');
                //console.log($('.create')[0]);
                smallIcon.removeChild($('.create')[0]);
                //console.log('���ڻ�ʣ��'+$('.create').length+'���ڵ�');
            }
            //console.log(ele.style.width+'�Ƕ�'+deg);
        },500);
    }
//��ͣ����
    function noactionPause(){
        video.pause();
        check(false);
        //clearInterval(timer);
    }
//ͼ��ֹͣ��ת
    function actionAuto(){
        $musicBtn.removeClass('auto');
    }
//ͼ�꿪ʼ��ת
    function noactionAuto(){
        $musicBtn.addClass('auto');
    }
//�������ֲ���״̬�ж϶�ʱ����clear or set
    function check(value){
        if(!value){
            clearInterval(timer);
        }else {
            console.log('�������ڲ���');
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
//    event.preventDefault(); //��ֹð��
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