var tikuList = [];
var currenTimu = {};
var score = 0;
//是否还能继续选择
var isChoose = false;
//设置答题数量
var num = 10;
// 倒计时时间，按秒计算
var maxtime = 12; 
//用户微博ID
var inputName = "";

$(".startGame").hide();
$(".endGame").hide();
$(".gaming").hide();

//ajax获取题目内容
//$.get("dati.json",function(res){
$.get("test.json",function(res){
	//用了jquery相当于res = JSON.parse(res.responseText)
	//自动获取响应数据以字符串形式返回，不用自己多写这一句
	console.log(res)
	//把获取到的所有数据放入数组中
	tikuList = res
})

//首页图片淡出
$(".firstImg").click(function(){
	$(".firstImg").fadeOut(1000);
	});

//点击准备好了按钮切换页面
$(".readyBtn").click(function(e){
	$(".startGame").show();
	$(".startGame").addClass("active")
})

//点击开始答题按钮切换页面
$(".startBtn").click(function(e){
	$(".gaming").show();
	$(".gaming").addClass("active");
	$(".startGame").hide();
	$(".startGame").removeClass("active");
	//每次点击随机出个题目并显示在页面上
	randomRender()
	//显示并开始倒计时
    	timer = setInterval("CountDown()", 1000)
})

function randomRender(){
	//获取题库数组中，随机出的整数(pasetInt)索引值		parseInt方法       返回由字符串转换得到的整数。
	var randomIndex = parseInt(Math.random()*tikuList.length);
	//每次拿出一个题目放到一个对象里，并把这个题目从数组中删除
	//这个题目对象是一个数组，所以写个0获取当前对象
	currentTimu = tikuList.splice(randomIndex,1)[0];
	console.log(currentTimu);
	//获取页面标签题目，并把对象字符串中的quiz（题目）设置显示在页面上
	$(".timu").html(currentTimu.quiz);
	
	//文本题默认隐藏图片和音频
    	$(".qimg").hide();
    	$(".qaudio").hide();
    	
	//获取图片链接，如果不为空则显示在页面上
    	if (currentTimu.qimage!="")
    	{
      	$(".qaudio").hide();
      	$(".qimg").attr('src',currentTimu.qimage);
      	$(".qimg").show();
    	}
    	//获取音频链接，如果不为空则显示在页面上
   	if (currentTimu.qaudio!="")
   	{
        $(".qimg").hide();
      	$(".qaudio").attr('src',currentTimu.qaudio);
        $(".qaudio").show();
    	}
	
	//每次执行清空一次
	$(".options").html("");
	//遍历题目对象字符串中的选择options内容           	   内容        索引
	currentTimu.options.forEach(function(item,index){
		$(".options").append(`<div data-index="${index}">${index+1}.${item}</div>`)
	})		
}

//倒计时
function CountDown() {
                if (maxtime >= 0) {
                  msg = "你还有" + maxtime + "秒";
                  document.all["timer"].innerHTML = msg;
                       --maxtime;
                } else{
                  clearInterval(timer);
                  //alert("时间到，结束!");
                  //跳转结束页面
		  $(".endGame").show() 
                  $(".endGame").addClass("active")
		  //获取得分标签,把上面累计的得分设置显示到页面上
		  $(".score").html(score);
                  //获取用户名,把用户名显示到页面上
		  inputName = $("#inputName").val();
                  $(".inputName").html(inputName);
                }
            }


//选项的点击事件
$(".options").click(function(e){
	if(!isChoose){
		//把索引值转成数字		parseInt方法       返回由字符串转换得到的整数。
		var index = parseInt(e.target.dataset.index);
		//题目权重
		var qs = 1;
		console.log(index+1);
		//题目中的index是0开始,answer是1开始,所以要加一
		//若答案与点击按钮的索引一致
		if(currentTimu.qans==(index+1)){
			qs = currentTimu.qstatus;
			score += 10*qs;
			//把获取的索引添加正确的背景颜色
			$("[data-index="+index+"]").addClass("correct")
		}else{
			var corectindex = currentTimu.qans-1;
			//若点击的索引不对,把错误的背景颜色显示出来
			//$("[data-index="+corectindex+"]").addClass("correct")
			$("[data-index="+index+"]").addClass("error")
		}
		
		isChoose = true;
		
		//每点击一次,答题的数量减1
		num --;
			
		//延迟0.25s进行切换
		setTimeout(function(){
			//答题数量结束了,切换到结束页面,否则切换到下一题
			if(num==0){
				$(".endGame").show() 
				$(".endGame").addClass("active")
				//获取得分标签,把上面累计的得分设置显示到页面上
				$(".score").html(score);
				//获取用户名,把用户名显示到页面上
				inputName = $("#inputName").val();
               			$(".inputName").html(inputName);
			}else{
				isChoose = false;
				randomRender()
			}
		},250)
	}
	
})

//结束歌曲图片淡出
$(".endImg").click(function(){
	$(".endImg").fadeOut(1000);
	});

//点击重新答题按钮后,重新刷新页面进行重新答题
$(".reStart").click(function(){
	//location.reload()	DOM方法	刷新页面
	location.reload()
})
