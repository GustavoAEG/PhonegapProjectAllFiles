/*function pesquisarTexto(){


   var var_texto = document.getElementById("texto").value;
   var var_id_titulo = document.getElementById("id_titulo").value;

       //var var_id_titulo =document.getElementById("id_titulo").value;

    //var var_query = "SELECT * FROM estudos WHERE titulo like '%"+var_texto+"%' ";
var var_query = "SELECT * FROM vtestudos WHERE vtestudos MATCH '*" + var_texto + "*' ";
var get_id_titulo ="select * from vtestudos where vtestudos match '*"+ id_titulo+"*' ";
var var_search ="select titulo from vtestudos where id_titulo=5";
var var_search_texto="select texto from vtestudos where id_titulo=5";

    //var var_query = "SELECT * FROM vtestudos WHERE vtestudos MATCH 'teste' ";
    //alert(var_query);

    //var var_query = "SELECT count(*) as qtd FROM vtestudos";

    db.transaction(function(tx) {
        tx.executeSql(var_query, [], function(tx, res) {
            //alert(res.rows.length);
            //alert(res.rows.item(0).qtd);

            if (res.rows.length > 0) {
                var var_div_retorno = "<table style='border:1px solid black' width='100%'>";
                for (var i = 0; i < res.rows.length; i++) {

                    
                    var_div_retorno += "<tr>";
                    var_div_retorno += "<td>" + res.rows.item(i).titulo + "|" + "</td></tr>";
                    
                    var_div_retorno += "<tr>";
                    var_div_retorno += "<td>" + res.rows.item(i).texto + "|" + "</td></tr>";
                    

                    var_div_retorno += "<tr>";
                    var descricao = res.rows.item(i).texto;





var_div_retorno+= "<td><a href='#' id='titulo' value='1' name='dados' onclick='pesquisarTexto();'></a></td>";
                    var_div_retorno += "</tr>";



                    
                     '<a target="_blank" href="#display" class="ui-btn ui-icon-home ui-btn-icon-left">All</a>'

 /* <a href='#' class='FuncaoMais' value='1' name='dados'>ilçiççlç
    <input type='hidden' class='linkDados' value='1' name='dados'> 
  </a>
*/

/*
<a href='#' class='FuncaoMais' value='1' name='dados' id='Mais' onclick='Mostrar();'>
Mais... 
<input type='hidden' class='linkDados' value='1' name='dados'></a> </td>";

*/




/*if variable title clickable clicked so show all text*/


/*if any link variable == short text so show all text
                }

    var var_div_retorno = var_div_retorno + "</table>";

            }

            /*if ($("Mais").click() == "true") {
 
alert("teste click");

}*
/            //alert(var_div_retorno);
            document.getElementById("div_retorno").innerHTML = var_div_retorno;

        });
    }, function(err) {
        alert(err.message);
    });


}

       /* $(document).on('click', '.FuncaoMais', function () {
            var input = $(this).find('.LinkDados');
            alert(input.val())
        });*/



function pesquisar() {


  var var_texto = document.getElementById("texto").value;

       //var var_id_titulo =document.getElementById("id_titulo").value;

    //var var_query = "SELECT * FROM estudos WHERE titulo like '%"+var_texto+"%' ";
    var var_query = "SELECT * FROM vtestudos WHERE vtestudos MATCH '*" + var_texto + "*' ";



    //v v_query = "SELECT * FROM vtestudos WHERE vtestudos MATCH 'teste' ";
    //alert(var_query);

    //var var_query = "SELECT count(*) as qtd FROM vtestudos";

 

    db.transaction(function(tx) {
        tx.executeSql(var_query, [], function(tx, res) {
            //alert(res.rows.length);
            //alert(res.rows.item(0).qtd);

            if (res.rows.length > 0) {
                var var_div_retorno = "<table style='border:1px solid black' width='100%'>";
                for (var i = 0; i < res.rows.length; i++) {


                    var_div_retorno += "<tr>";


                    var_div_retorno += "</td></tr>";

                    var_div_retorno += "<td> <a href='outra_pagina.html?id_titulo="+res.rows.item(i).id_titulo+"'>"+res.rows.item(i).id_titulo+"</td>";
                    var_div_retorno += "<td>" + res.rows.item(i).titulo + "|" + "</td>"
                    var descricao = res.rows.item(i).texto;
                    var_div_retorno+= "<td>" + descricao.substring(0,25);
                    var id_titulo_texto = parseInt(res.rows.item(i).id_titulo);
                    

                    var_div_retorno += "<tr>";
                   

                    /*
                    var id=1,2,3,4,5,6
                    
                    if(id=1   TITULO ==="TDAH" 2 TITULO ==="GENETICA" TITULO===3"GLAUCOMA")
                    
if(this.id_titulo_texto == clickedElement)

if($(this).is('#' + clickedElement))
$(document).ready(function() {
  var clickedElement;
  $(".testdiv").click(function() {
    if (this.titulo_id_texto == clickedElement) {
      alert("Victory"); 
      clickedElement = null; 
    } else {
      clickedElement = this.id; /
    }
  });
});
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<div class="testdiv" id="titulo_id_texto">Bananarama</div>



if(i==1){


}
*/


                    

/*
                    if(i==1){

alert("1");
                 }else if (i==2){

                    alert("2");
                 }
*/
                     '<a target="_blank" href="#display" class="ui-btn ui-icon-home ui-btn-icon-left">All</a>'

 /* <a href='#' class='FuncaoMais' value='1' name='dados'>ilçiççlç
    <input type='hidden' class='linkDados' value='1' name='dados'> 
  </a>
*/

/*
<a href='#' class='FuncaoMais' value='1' name='dados' id='Mais' onclick='Mostrar();'>
Mais... 
<input type='hidden' class='linkDados' value='1' name='dados'></a> </td>";

*/




/*if variable title clickable clicked so show all text*/


/*if any link variable == short text so show all text*/
                }

    var var_div_retorno = var_div_retorno + "</table>";

            }

            /*if ($("Mais").click() == "true") {
 
alert("teste click");

}*/



            //alert(var_div_retorno);
            document.getElementById("div_retorno").innerHTML = var_div_retorno;

        });
    }, function(err) {
        alert(err.message);
    });




}

function Mostrar() {




    alert("Mostrar");
window.open('../www/Mostrar.html');




/**/




}
function Localizar(){



}


