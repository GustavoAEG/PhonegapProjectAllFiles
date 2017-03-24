     
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

    


function carrega_descricao(){
alert(id_titulo_busca);





}

    