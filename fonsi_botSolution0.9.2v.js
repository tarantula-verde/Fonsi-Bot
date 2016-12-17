<script type="text/javascript">
	var qq = 1 ;
	var countings = 0 ;
	var countingm = 0 ;
	var countingt = 0 ;
	while(document.getElementById("q"+qq)){

		console.log(document.getElementById("q"+qq).children[1].children[0].children[2].textContent);
		function childrens(q){
			var respuesta = '';
			//    console.log();
			for (var i = 0; i <q.children.length; i++) 
			{
				if (q.children[i].tagName.toLowerCase() == 'div' && 
					q.children[i].classList[0] == "rightanswer" ) 
					{ 
						respuesta = q.children[i].textContent.replace("The correct answer is: ","---->");
						console.log(respuesta);
					}
				if (q.children[i].tagName.toLowerCase() == 'input' &&
					q.children[i].id != '' ) 
					{ 
						//console.log(q.children[i].id);
					}
				if (q.children[i].children.length > 0 ) 
				{	
					var ch1 = q.children[i].children;
					childrens(q.children[i]);
				}				
			}
		};


		function childrenm(q){
			var respuesta = '';
			for (var i = 0; i <q.children.length; i++) 
			{
				if (q.children[i].tagName.toLowerCase() == 'div' && 
					q.children[i].classList[0] == "rightanswer" ) 
					{ 
						respuesta = q.children[i].textContent.replace("The correct answer is: ","---->");
						respuesta = respuesta.replace("The correct answer is 'True'.","---->True");
						respuesta = respuesta.replace("The correct answer is 'False'.","---->False");
						console.log(respuesta);
					}
				if (q.children[i].tagName.toLowerCase() == 'label' &&
					q.children[i].hasAttribute("for")					) 
					{ 
						//console.log(q.children[i].getAttribute("for"));
						//console.log(q.children[i].textContent);
					}
				if (q.children[i].children.length > 0 ) 
				{	
					var ch1 = q.children[i].children;
					childrenm(q.children[i]);
				}
				
			}
		};


		if (document.getElementById("q"+qq).classList[1] == "shortanswer") 
		{	
			childrens(document.getElementById("q"+qq).childNodes[1]);
			countings ++;
		}
		else if (document.getElementById("q"+qq).classList[1] == "multichoice") 
		{
			childrenm(document.getElementById("q"+qq).childNodes[1]);
			countingm ++;
		}
		else if (document.getElementById("q"+qq).classList[1] == "truefalse") 
		{
			childrenm(document.getElementById("q"+qq).childNodes[1]);
			countingt ++;
		}
		console.log("?-?"+qq);
		qq++;
	}
	//console.log(countings+' shortanswer');
	//console.log(countingm+' multichoice');
	//console.log(countingt+' truefalse');
	</script>