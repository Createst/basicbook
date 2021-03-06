
(function($){

	$.extend({
	
		/*此函数有两个参数，conClass表示放歌词的块元素的class名，
		index代表解析对应歌曲的索引（0,1,2......）。
		结果：向块元素增加<section>标签**************************************(1)*/
		getLrc:function(conClass,index)
			{
				var value=$("#"+index).val();//获得歌词
				//下面是分解歌词获得时间
				var reses=value.split("[");	
				$("."+conClass).html("");
				for(var i=0;i<reses.length;i++)
				{
					if(reses[i]!="")
					{
						var res=reses[i].split("]");		
						if(res[1]!="\n")
						{								
							var time=res[0];
							var val=res[1];		
							var timer=time.split(":");
							var second=parseInt(timer[0])*60+parseInt(timer[1])*1;
							//把歌词添加到显示区
							$("."+conClass).append("<section class="+second+">"+val+"</section>")
					
						}
					}
				}			
			},
				
		/*该函数是禁止浏览器默认的右击菜单***************************************(2)*/
		stoprClick:function(){	
				//禁止浏览器默认右击菜单
					document.oncontextmenu=function(){					
						return false;
					}
				},
		/*该函数是实现拖拽功能，参数selector1是要被拖拽的选择器且（绝对定位）,selector2是拖拽的手柄**********(3)*/
		dragBlock:function(selector1,selector2){
			
			//拖动皮肤库
			$(selector1+" "+selector2).on("mousedown",function(event){
				if(event.which!=1)//如果不是点击左键，则返回false
				{
					return false;
				}
				$(this).css("cursor","move");//改变鼠标指针为移动
				var offet=$(this).offset();//获得皮肤库距离页面上 左的距离
				var left1=offet.left;
				var top1=offet.top;

				var xx=event.pageX;//获得鼠标左击的坐标
				var yy=event.pageY;
				//给皮肤库绑定移动事件
				$(selector1).on("mousemove",function(e){
				e.preventDefault();
				var _x=e.pageX-xx+left1+5;//得到移动后的坐标
				var _y=e.pageY-yy+top1+5;
				$(selector1).css({"left":_x,"top":_y});//改变坐标
				})
					
					
			})
			//当鼠标松开，鼠标指针为默认。
			$(selector1+" "+selector2).on("mouseup",function(){
				$(this).css("cursor","default");
				$(selector1).unbind("mousemove");//解除移动事件
			})
		
		},

		/*该函数实现弹窗功能***************************************(4)*/
		
			/*弹窗函数
			使用方法：$.popBox(params);
			*/	
			popBox:function(params){
				
				var defaults={	//默认属性				
				titleContent:"请输入标题",//标题
				titlePosition:"left",//标题的位置
				titleColor:"white",//标题的颜色
				titleBack:"#009900",//标题背景色
				content:"请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容请输入内容",//弹框的内容
				contentColor:"black",//内容颜色
				confirmHref:"",//确定链接地址
				popWay:"slide",//弹框的方式 slide|fade
				popSpeed:"slow"//弹框的速度slow|fast 或者是秒数eg:1000
			};
			
				var param=$.extend(defaults,params);//如果有实参则覆盖默认，否则是默认
			
				var bigbx=$("<div></div>");//遮罩
				bigbx.addClass("bigbox").css("display","none");

				var smallbx=$("<section></section>");//弹框
				smallbx.addClass("smallbox").css("display","none");
				
				var title=$("<p></p>");//标题
				title.text(param.titleContent);
				title.css({textAlign:param.titlePosition,color:param.titleColor,background:param.titleBack});
				
				var content=$("<div></div>");//内容
				content.addClass("text");
				content.css({color:param.contentColor}).text(param.content);


				var foot=$("<footer></footer>");
				var confirm=$("<a href=''>确定</a>");//按钮
				confirm.addClass("btok").attr("href",param.confirmHref);
				
				var concel=$("<a href=''>取消</a>");
				concel.addClass("btconcel");

				foot.append(confirm).append(concel);
				smallbx.append(title).append(content).append(foot);
				bigbx.append(smallbx);
				
				$("body").append(bigbx);
				$.dragBlock(".smallbox","p");//可拖拽
				show();//显示
				
				
				concel.on("mousedown",function(e){
				
					if(e.which==1){
						e.preventDefault();					
						concel.off("mousedown");
						show();
					}
				})

				confirm.on("mousedown",function(e){				
					if(e.which==1){
						confirm.off("mousedown");
						show();
					}
				})
				//显示弹框函数
				function show(){
					
					switch(param.popWay){
					
						case "slide":
							smallbx.slideToggle(param.popSpeed);//显示弹框
							bigbx.slideToggle(param.popSpeed);
							break;
						case "fade":
							smallbx.fadeIn(param.popSpeed);//显示弹框
							bigbx.fadeToggle(param.popSpeed);
							break;
						}
				}			
			}
		/****************************************************************************(end)*/
		})

	$.fn.extend({
	
	})

})(jQuery)



