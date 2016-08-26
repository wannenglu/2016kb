window.onload = function(){
	function ajax(url,callback){//封装了ajax
		var xmlhttp = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp.open("GET",url,true);//建立请求
		xmlhttp.send();//发送请求
		xmlhttp.onreadystatechange = function(){//监听请求的变化
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){//请求已完毕，服务器响应继续（服务器返回数据）
				if(typeof callback == "function")
					callback(xmlhttp);//callback回调函数
			}
		}
	}
	
	var selNode = document.getElementById("sel");
	
	ajax("classname.xml",function(xmlhttp){//打开页面的时候触发一次ajax请求
//				console.log(xmlhttp);
		var xmlDom = xmlhttp.responseXML;
		var names = xmlDom.getElementsByTagName("name");
		var urlNames = xmlDom.getElementsByTagName("urlName");
		
		var frag = document.createDocumentFragment();
		for(var i=0;i<names.length;i++){
			var option = document.createElement("option");
			option.value = names[i].innerHTML;
			option.innerHTML = names[i].innerHTML;
			frag.appendChild(option);
			if(i == 0){//第一个对应的信息写入div
				var iframeNode = document.getElementById("iframe");
				var urlName = urlNames[0].innerHTML;
				console.log(urlName);
				iframeNode.setAttribute("src",urlName);
			}
		}
		selNode.appendChild(frag);
	});
	
	selNode.onchange = function(){
		var val = this.value;//得到当前下拉菜单的值
		ajax("classname.xml",function(xmlhttp){//打开页面的时候触发一次ajax请求
			var xmlDom = xmlhttp.responseXML;
			var names = xmlDom.getElementsByTagName("name");
			var urlNames = xmlDom.getElementsByTagName("urlName");
			for(var i=0;i<names.length;i++){
				if(names[i].innerHTML == val){
					var iframeNode = document.getElementById("iframe");
					var urlName = urlNames[i].innerHTML;
					console.log(urlName);
					iframeNode.setAttribute("src",urlName);
					return;//跳出函数
				}
			}
		});		
	}
}