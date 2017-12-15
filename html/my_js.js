﻿var a;
a=new QWebChannel(qt.webChannelTransport, function (channel) {
	window.handler = channel.objects.handler;;
	send=function(str){window.handler.rec(str);};
});

$(function(){
	send('获得环境')
})

function 准备(){
	//if(test_mode)
	//	alert('现在是测试模式。')
	send('go')
}


var data,pos;
function set_data(rec_data){
	data= rec_data
	pos = Math.ceil(Math.random() * 4)
	//alert(JSON.stringify(data))
	for(i=1;i<=4;i++){
		if(i<pos){
			$('#'+i).html(data[String(i-1)]['chinese']);
			$('#c'+i).html(data[String(i-1)]['spell'])
		}
		if(i==pos)
			$('#'+i).html(data['senkai']['chinese']);
		if(i>pos){
			$('#'+i).html(data[String(i-2)]['chinese']);
			$('#c'+i).html(data[String(i-2)]['spell'])
		}
	}
	$('#单词').html(data['senkai']['word']);
	
	$('#单词').fadeIn(600);
	$('.认识').slideDown(500);
}

function select(x){
	if(x==pos){
		回收()
		清屏更新()
	} else {
		$('#c'+x).fadeIn(300)
		$('#c'+x).fadeOut(1500)
	}
}

function 更新切数(all_kiri){
	$('#切数').html(all_kiri);
}
function know(){
	$('.认识').fadeOut(300);
	$('.选项').fadeIn(300);
}
function not_know(){
	回收(false);
	if(test_mode)
		清屏更新(0);
	else
		清屏更新(1000);
}
function 回收(pass=true){
		$('.完成').hide(250);
		pre_data=data
		setTimeout(function(){
								$('#上个单词').html(pre_data['senkai']['word']);
								$('#上个拼写').html(pre_data['senkai']['spell']);
								if(pre_data['senkai']['词性'])
									$('#上个词性').html('【'+pre_data['senkai']['词性']+'】');
								$('#上个解释').html(pre_data['senkai']['chinese']);
								$('#上个例句').html(pre_data['mon']);
								if(pass)
									$('#kiri').show(0)
								else 
									$('#kiri').hide(0)
								$('.完成').show(200)
								}
		, 250);
}
function 清屏更新(delay=0){
	$('.选项').slideUp(150);
	$('#单词').fadeOut(150);
	setTimeout(function(){send('go')}, delay+150);
}

function kiri(){
	send('切');
	$('.完成').hide(250);
}