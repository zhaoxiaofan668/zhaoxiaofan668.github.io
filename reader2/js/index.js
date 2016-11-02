/**
 * Created by lihualong on 2016/10/5.
 */
(function () {
    var alllist=[];
    $(function () {
       getAll();
       $('.all').click(function () {
           getAll();
       })
        $('.history').click(function () {
            getRead();
        })

        /*点击编辑状态的a，取消删除*/
        $('.list').on('click','a',function () {
            if($(this).hasClass('edit')){
                $(this).css({'transform':'translateX(0px)','-webkit-transform':'translateX(0px)'});
                $(this).removeClass('edit');
                return false;
            }
        })

        /*删除事件*/
        $('.list').on('click','.delete',function () {
            deleteRecord($(this).data('id'))
            $(this).parents('li').remove();
        })
    })

    /*删除记录*/
    function deleteRecord(id) {
        var ids=[];
        if($.cookie('ids'))
            ids=$.cookie('ids').split(',');
        ids.splice(ids.indexOf(id+''),1);
        $.cookie('ids',ids.toString(),{expires:10})

    }
    
    function getAll() {
        $.getJSON('data.json',function (data) {
            alllist=data;
            $('.list').html(template('temp',{list:data}));
        })
    }

    function  getRead() {
        var ids=[];
        if($.cookie('ids'))
            ids=$.cookie('ids').split(',');
        var array=alllist.filter(function (item) {
            return ids.indexOf(item.id.toString())>-1;
        })
        $('.list').html(template('temp',{list:array}))
        var list=document.querySelectorAll('.list a');
        for(var i=0;i<list.length;i++){
            (function (ele) {
                var hammer=Hammer(ele);
                hammer.on('panstart panmove panend',function (e) {
                    if(e.type=='panend'){
                        if(e.deltaX<=-80){
                            $(ele).addClass('edit');
                            $(ele).css({'transform':'translateX(-80px)','-webkit-transform':'translateX(-80px)'});
                        }
                        else{
                            $(ele).removeClass('edit')
                            $(ele).css({'transform':'translateX(0px)','-webkit-transform':'translateX(0px)'});
                        }
                    }
                    else if(e.type=='panmove'){
                        $(ele).css({'transform':'translateX('+e.deltaX+'px)','-webkit-transform':'translateX('+e.deltaX+'px)'});
                    }

                })
            })(list[i]);
        }

    }
    
})()