        var tikuList = [];
        var tikuMother= [];
        var currenTimu = {};
        var score = 0;
        var total = 0;
        var right = 0;
        var speed = 0;
        var myRank = 0;
        var correct = "0";
        var wrong = "0";
        
        //是否还能继续选择
        var isChoose = false;
        
        //设置答题数量
        var num = 10;

        // 倒计时时间，按秒计算
        var maxtime = 5; 

        //用户微博ID
        //get the cookies (aygGameId & aygGameName) 
        var gameId = 0;
        var inputName = "";

        //audio flag
        var hasAudio = false;

     
        //check if 
        function checkfirst(){

            $("#id01").hide();
            $("#id02").hide();
        

            //get cookeies
            gameId = parseInt(getCookie ("AYGgameId"),10);
            inputName = getCookie ("AYGgameName");
            console.log ("GameId:"+gameId+", Input Name:"+inputName);

            if (gameId > 0) {
                //if yes, go to pop up box 2
                //$("#section01").hide();
                //Everything jQuery to be included in this section
                $("#inputName").val(inputName);  //set user Name
                document.getElementById("inputName").disabled = true;  //set user Name
                $("#iisNew").val("0");
                $("#id02").show();
            }else {
                //if no, go to pop up box 1
                $("#id01").show();
                $("#section01").show();
            }
        }

        //--------------------------------------
        // PART 4: Utility Functions 
        //--------------------------------------
        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }


        $(document).ready(function(){

                
            //--------------------------------------
            // PART 1: For Controlling the flow 
            //--------------------------------------
            //close the 1st modal message box (birthday Message)
            $("#id01btn").click(function(){
                $("#id01").hide();
            });

            //close the 2nd modal message box (user name)
            $("#id02btn").click(function(){
                $("#id02").hide();
            });

            $("#id02btnCancel").click(function(){
                $("#id02").hide();
            });

            //Go to 2nd modal message box (user name)
            $("#s01btnGo").click(function(){
                $("#id02").show();

            });

            //Go to show quiz questions
            $("#id02btnGo").click(function(){

                $("#section01").hide();	

                //set cookies
                if ($("#iisNew").val()==1) {			
                    //setCookie("aygGameId", $("#inputName").val(), 30); //set user name id
                    //! need to set user id cookies!
                }

                //close the user name message box
                $("#id02").hide();
                $("#section03").hide();
                $("#section02").show();

                //initialize the game logic
                //initGame();
                randomRender();
                //显示并开始倒计时
                timer = setInterval(function(){
                    if (maxtime > 0) {
                        msg = "你还有" + maxtime + "秒";
                        $('#timer').html(msg);
                        --maxtime;
                        ++speed;
                    } else{
                        clearInterval(timer);
                        //alert("时间到，结束!");
                        //跳转结束页面
                        endGame();        
                    }
                }, 1000);
            });

            $("#id03btnGo").click(function(){
                location.reload();
            });

            //--------------------------------------
            // PART 2: For controls in popup boxes 
            //--------------------------------------

            //Add To disable the input box 
            //choice of zsns 
            $("#imgNS").click(function(){
                //alert ($("#idunion").val());
                if ($("#idunion").val() == "1"){
                    //remove opacity from NS related items & add to ZS items
                    $("#imgNS").removeClass("w3-opacity-max w3-hover-opacity-off");
                    $("#idunion").val("2");
                    $("#imgZS").addClass("w3-opacity-max w3-hover-opacity-off");
                }
            });

            $("#imgZS").click(function(){
                if ($("#idunion").val() == "2"){
                    //remove opacity from NS related items & add to ZS items
                    $("#imgZS").removeClass("w3-opacity-max w3-hover-opacity-off");
                    $("#idunion").val("1");
                    $("#imgNS").addClass("w3-opacity-max w3-hover-opacity-off");
                }
            });


            //--------------------------------------
            // PART 3: Game Logic 
            //--------------------------------------

            //ajax获取题目内容
            //$.get("dati.json",function(res){

            var xhttp = new XMLHttpRequest();
            var pstr = "?q=1";


         //ajax获取题目内容
//$.get("dati.json",function(res){
$.get("test.json",function(res){
	//用了jquery相当于res = JSON.parse(res.responseText)
	//自动获取响应数据以字符串形式返回，不用自己多写这一句
	console.log(res)
	//把获取到的所有数据放入数组中
	tikuList = res
})
            //randomly pick a q from the json file
            function randomRender(){
                
                total +=1;

                console.log(tikuList);

                //获取题库数组中，随机出的整数(pasetInt)索引值		parseInt方法       返回由字符串转换得到的整数。
                var randomIndex = parseInt(Math.random()*tikuList.length);

                //每次拿出一个题目放到一个对象里，并把这个题目从数组中删除
                //这个题目对象是一个数组，所以写个0获取当前对象
                //alert ("RI:" + randomIndex + "tikuList:" + tikuList.length );
                currentTimu = tikuList.splice(randomIndex,1)[0];
                console.log(currentTimu);
                //获取页面标签题目，并把对象字符串中的quiz（题目）设置显示在页面上
                $("#timu").html(currentTimu.quiz);

                //alert($("#timu").html());

                //文本题默认隐藏图片和音频
                $(".qimg").hide();
                $(".qaudio").hide();

                //获取图片链接，如果不为空则显示在页面上
                if (currentTimu.qimage!="")
                {
                    $(".qimg").attr('src',currentTimu.qimage);
                    $(".qimg").show();
                }
                //获取音频链接，如果不为空则显示在页面上
                if (currentTimu.qaudio!="")
                {
                    $(".qaudio").attr('src',currentTimu.qaudio);
                    $(".qaudio").show();
                    hasAudio = true;
                }else{
                    hasAudio = false;
                }

                //每次执行清空一次
                $(".options").html("");

                //遍历题目对象字符串中的选择options内容           	   内容        索引
                currentTimu.options.forEach(function(item,index){
                    $(".options").append(`<div class="w3-panel w3-border w3-light-grey w3-round-large" data-index="${index}">${index+1}.${item}</div>`)
                });
            }

            //选项的点击事件
            $(".options").click(function(e){
                if(!isChoose){
                    //把索引值转成数字		parseInt方法       返回由字符串转换得到的整数。
                    var index = parseInt(e.target.dataset.index);
                    //题目权重
		            var qs = currentTimu.qstatus;
                    console.log(index+1);
                    
                    //stop music on click
                    if (hasAudio) {
                        document.getElementById("qaudio").pause();
                    }
                    

                    //题目中的index是0开始,answer是1开始,所以要加一
                    $("[data-index="+index+"]").removeClass("w3-light-grey "); //remove grey color
                    //$("[data-index="+index+"]").removeClass("w3-hover-yellow"); //remove yellow

                    //若答案与点击按钮的索引一致
                    if(currentTimu.qans==(index+1)){
                        correct = correct + ","+currentTimu.qid;    // to record the correct and wrong 
                        score += 10*qs;
                        right += 1;
                        //把获取的索引添加正确的背景颜色
                        $("[data-index="+index+"]").addClass("w3-green");
                        //alert ("[data-index="+index+"] correct");
                    }else{
                        var corectindex = currentTimu.qans-1;   // to record the correct and wrong
                        wrong = wrong + ","+currentTimu.qid;
                        //若点击的索引不对,把正确的背景颜色和错误的背景颜色都显示出来
                        //$("[data-index="+corectindex+"]").addClass("correct")
                        $("[data-index="+index+"]").addClass("w3-red");
                        //alert ("[data-index="+index+"] wrong");
                    }

                    isChoose = true;

                    //每点击一次,答题的数量减1
                    num --;


                    //延迟0,25秒进行切换
                    setTimeout(function(){
                        //答题数量结束了,切换到结束页面,否则切换到下一题
                        if(num==0){				
                            endGame();            
                        }else{
                            isChoose = false;
                            randomRender();
                        }
                    },250)
                }

            })

            function endGame(){

                var str="";

                //stop music on click
                if (hasAudio) {
                    document.getElementById("qaudio").pause();
                }

                //get the ranking 
                pstr = "?q=2&name="+ encodeURIComponent($("#inputName").val())+"&score="+score+"&total="+total+"&right="+right+"&speed="+speed+"&union="+$("#idunion").val();
                console.log (pstr);
                
                if ($("#iisNew").val()==1){
                    pstr = pstr + "&isNew=1";
                }else{
                    pstr = pstr + "&isNew=0&id=" + gameId;
                }

                $.get("./quizprocess.php" + pstr,function(res){
                    var myObj = JSON.parse(res);
                    

                    //document.getElementById("demo").innerHTML = myObj[0].quiz;
                    gameId = myObj.id;
                    myRank = myObj.rank;
                    console.log ("game id:" + gameId+ ",myRank:"+ myRank);
                    //获取得分标签,把上面累计的得分设置显示到页面上
                    var unionStr = "最帥黨";
                    if ($("#idunion").val() == "2"){
                        unionStr = "最美黨";
                    }

                    $("#fenshu").html ($("#inputName").val() + "共答了" + total +"题, 其中" + right + "题正确, 共得到了 " +score+"分! 排名第"+ myRank +"<br>" +unionStr+" 得 " +score+"分! <br>");
                    //alert ($("#inputName").val() + " 得到了多少 " +score+"分");
                    //获取用户名,把用户名显示到页面上				
                    //reset the status of everything
                    
                    //set cookie
                    setCookie("AYGgameId", gameId);
                    setCookie("AYGgameName", $("#inputName").val());
                
                });

                //get the table 
                pstr = "?q=3";
               
                $.get("./quizprocess.php" + pstr,function(res){
                    var myObj = JSON.parse(res);
                    console.log (res);

                    //decipher the json 
                    for (var i=0; i<myObj.ranks.length; i++){
                        
                        str = str + myObj.ranks[i].rank+","+ myObj.ranks[i].uname +","+ myObj.ranks[i].score +","+ myObj.ranks[i].utotal +","+ myObj.ranks[i].uright +","+ myObj.ranks[i].uspeed+","+ myObj.ranks[i].uunion+"<br>";
            
                    }
                    str = str +"最帥,"+ myObj.unions[0].TOTALSCORE +","+ myObj.unions[0].TOTALQ +","+ myObj.unions[0].TOTALRIGHT +","+ myObj.unions[0].TOTALSPEED +","+ myObj.unions[0].TOTALRNDS+"<br>";        
                    str = str +"最美,"+ myObj.unions[1].TOTALSCORE +","+ myObj.unions[1].TOTALQ +","+ myObj.unions[1].TOTALRIGHT +","+ myObj.unions[1].TOTALSPEED +","+ myObj.unions[1].TOTALRNDS+"<br>";
                
                    $("#scoreboard").html (str);
                    
                })

                

                //$(".endGame").addClass("active")
                

                $(".timu").html("");	//clear all the timu
                $(".options").html("");	//clear all the options
                $("#section02").hide();
                //document.getElementById("section3").className = "d-block";

                $("#section03").show();
                isChoose = false;    

                //insert the game record
                pstr = "?q=5&correct=" + correct + "&wrong=" + wrong;
               
                $.get("./quizprocess.php" + pstr,function(res){
                    console.log (res);                    
                })            
            }

        });
