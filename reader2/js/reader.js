/**
 * Created by lihualong on 2016/10/4.
 */
(function () {
    $(function () {
       /* window.addEventListener('touchmove',function (e) {
            e.preventDefault();
        })*/
        showMenu();
        loadConfig();
        bindFooter();
        initFont();
        initPage();
    })

    /*处理顶部和底部事件*/
    function showMenu() {
        /*内容区域点击显示菜单和标题*/
        var doc_hammer=new Hammer(document.querySelector('.main'));
        doc_hammer.on('tap',function () {
            $('#header,#footer').toggleClass('show');
        })
    }

    /*加载本地存储*/
    function loadConfig() {
        var bg=getProperty($('body')[0],'background-color');
        var color=localStorage.getItem('color');
        var size=localStorage.getItem('size');
        var day=localStorage.getItem('day');
        if(color){
            $('.main').css('color',color);
        }
        if(size){
            $('.main').css('font-size',size);
            $('.range-slider').val(parseInt(size));
        }
        if(day=='night'){
            changeStyle('body','background-color','#666');
            $('.bg').addClass('night');
        }
        else{
            changeStyle('body','background-color',bg);
            $('.bg').addClass('day');
        }
    }

    /*字体处理方法*/
    function initFont() {
        var colors=['red','blue','green','pink','black']
        var chtml='';
        colors.forEach(function (item) {
            chtml+='<a href="javascript:;" style="background-color: '+item+'" ></a>';
        })

        $('.colors').html(chtml);
        $('.colors a').click(function () {
            var c=getProperty(this,'background-color');
            changeStyle('.main','color',c);
            localStorage.setItem('color',c);
        });
        $('.range-slider').jRange({
            from: 12,
            to: 40,
            step: 1,
            format: '%s',
            width: 200,
            showLabels: true,
            isRange : false,
            ondragend:function (e) {
               $('.main').css('font-size',e+'px');
                localStorage.setItem('size',e+'px');
            }
        });
    }

    /*底部操作*/
    function bindFooter() {
        $('#footer .list').click(function () {
        });
        $('#footer .font').click(function () {
            $('.panel').toggleClass('open');
        });
        $('#footer .bg').click(function () {
            $(this).toggleClass('day');
            $(this).toggleClass('night');
            if($(this).hasClass('day')){
                changeStyle('body','background-color',getProperty(this,'background-color'));
                localStorage.setItem('day','day')
            }
            else{
                changeStyle('body','background-color','#666');
                localStorage.setItem('day','night')
            }
        });
    }

    function  getProperty(ele,prop){
        if(ele.currentStyle){
            return ele.currentStyle[prop];
        }else{
            return window.getComputedStyle(ele,null)[prop];
        }
    }

    function changeStyle(ele,pro,value) {
        $(ele).css(pro,value);
    }

    function getParameter(name){
        var match=new RegExp('[?&]'+name+'=([^&]*)').exec(location.search);
        return match&&decodeURIComponent(match[1]);
    }

    function initPage() {
        var id=getParameter('id');
        if(id){
                var ids=[];
                if($.cookie('ids'))
                    ids=$.cookie('ids').split(',');
                if(ids.indexOf(id)<0)
                    ids.push(id);
                $.cookie('ids',ids.toString(),{expires:10});
        }



    }

})()
