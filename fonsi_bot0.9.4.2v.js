<script type="text/javascript">

	var input = document.createElement("input");
	input.type = "file";
	input.id = "fileInput";
	document.body.appendChild(input);

	var pre = document.createElement("pre");
	pre.id = "fileDisplayArea1";
	document.body.appendChild(pre);

	var pre2 = document.createElement("pre");
	pre2.id = "fileDisplayArea2";
	document.body.appendChild(pre2);

	var fileDisplayArea = document.getElementById('fileDisplayArea1');
	
	var archivo = document.createElement("pre");
		window.onload = function() {
		    var fileInput = document.getElementById('fileInput');
		    var fileDisplayArea = document.getElementById('fileDisplayArea2');
		    fileInput.addEventListener('change', function(e) {
		        var file = fileInput.files[0];
		        console.log(file);
		        var textType = /text.*/;
		        if (file.type.match(textType)) {
		            var reader = new FileReader();
		            reader.onload = function(e) {
		                archivo.innerText = reader.result;
		                BOT0_9();
		            }
		            reader.readAsText(file);    
		        } else {
		            fileDisplayArea.innerText = "File not supported!"
		        }
		    });
	};

	function findRespuesta(R){// R = la pregunta del html
		var respuesta_tmp = '';
		var p = 0;
		var respuesta_sin_n = archivo.innerText.indexOf( R.replace("\r\n","") );
		var respuesta_sin_rn = archivo.innerText.indexOf( R.replace(/(?:\r\n|\r|\n)/g, '') );
		if (archivo.innerText.indexOf(R) != -1){
			p = archivo.innerText.indexOf("--->" ,archivo.innerText.indexOf(R))+4;
			while(	archivo.innerText[p]+archivo.innerText[p+1]+archivo.innerText[p+2] !=  "?-?"  ) 
			{
				if (archivo.innerText[p] === '\r\n') {break;}
				if (archivo.innerText[p] === '\n') {break;}
				respuesta_tmp += archivo.innerText[p];
				p++;
			}
			return respuesta_tmp;
		}
				
	};

	function BOT0_9(){
		var qq = 1 ;
		var countings = 0 ;
		var countingm = 0 ;
		var countingt = 0 ;
		var pregunta = '';
		var respEncontrada = '';
		var doc = '';
		while(document.getElementById("q"+qq)){

			pregunta = document.getElementById("q"+qq).children[1].children[0].children[2].textContent;
			respEncontrada = findRespuesta(pregunta);
			doc = document.getElementById("q"+qq).childNodes[1];
			if (document.getElementById("q"+qq).classList[1] == "shortanswer") 
			{	
				childrens(doc , respEncontrada);
				countings ++;
			}
			else if (document.getElementById("q"+qq).classList[1] == "multichoice") 
			{
				childrenm(doc, respEncontrada);
				countingm ++;
			}
			else if (document.getElementById("q"+qq).classList[1] == "truefalse") 
			{
				childrenm(doc, respEncontrada);
				countingt ++;
			}
			qq++;
		}
			function clean_response(r){return r.slice(3);}
			function childrens(q,r){
				for (var i = 0; i <q.children.length; i++) 
				{
					if (q.children[i].tagName.toLowerCase() == 'input' &&
						q.children[i].id != '' ) 
						{ 						
							document.getElementById(q.children[i].id).value = r;
						}
					if (q.children[i].children.length > 0 ) 
					{	
						var ch1 = q.children[i].children;
						childrens(q.children[i],r);
					}				
				}
			};
			function childrenm(q,r){
				for (var i = 0; i <q.children.length; i++) 
				{
					
					if (q.children[i].tagName.toLowerCase() == 'label' &&
						q.children[i].hasAttribute("for")					) 
						{ 
						if (r == q.children[i].textContent || clean_response(q.children[i].textContent) == r ){
								document.getElementById(q.children[i].getAttribute("for")).checked = true;
							}
						}
					if (q.children[i].children.length > 0 ) 
					{	
						var ch1 = q.children[i].children;
						childrenm(q.children[i],r);
					}					
				}
			};		
	}
	
</script>
