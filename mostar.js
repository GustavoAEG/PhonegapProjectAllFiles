     
       $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results == null) {
                return null;
            } else {
                return results[1] || 0;
            }
        }
var id_titulo_busca = $.urlParam('id_titulo');  

   carrega_descricao(id_titulo_busca);
    if(id_titulo_busca !== 'null'){
  carrega_descricao(id_titulo_busca);


    }

    


function mostrar(){
alert(id_titulo_busca);




        var var_query= "select texto from vtestudos where id_titulo="+id_titulo_busca+"";

//var var_search ="select titulo from vtestudos where id_titulo=5";
//alert("antes");
    db.transaction(function(tx) {
        tx.executeSql(teste, [], function(tx, res) {
//alert("dasdasd");

          var_query.getSettings().setDomStorageEnabled(true);

            document.getElementById("div_descricao").innerHTML = var_div_retorno;

        });
    }, function(err) {
        alert(err.message);
    });




}

    