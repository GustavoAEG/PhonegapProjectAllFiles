 /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var db = null;
var db2 = null;
var db3 = null;
var dbUser = null;
var dbName = "estudos.db";

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');




        // OPERACOES BD - inicio

        //banco de dados local - aceite de termos e outras coisas
        dbUser = window.sqlitePlugin.openDatabase({
            name: 'user.db',
            location: 'default'
        });
        dbUser.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Users (flg_aceite, flg_valid_bd)');
        }, function(error) {
            alert('Transaction ERROR: ' + error.message);
        }, function() {
            console.log('Database OK');
        });

        //copia do banco de dados de estudos
        window.plugins.sqlDB.copy(dbName, 0, copysuccess, copyerror);
        // OPERACOES BD - fim
    }
};

app.initialize();

//---------------------------------------------------------------

function copysuccess() {
    //primeira versão deste banco de dados. o comando anterior.
    //provavelmente realizou a cópia, abro o BD.
    db = window.sqlitePlugin.openDatabase({
        name: dbName
    });
    //preciso verificar se existem versões anteriores deste BD. Deleto por precaucao
    dropTable();
    fts_table();
}

function copyerror(e) {
    //esta versao do banco de dados ja existe.
    //abro o BD
    db = window.sqlitePlugin.openDatabase({
        name: dbName
    });
    //db3 = window.sqlitePlugin.openDatabase({name: "vtestudos"});
    //alert("copyerror" + JSON.stringify(e));
}


//---------------------------------------------------------------

function fts_table() {
    db.transaction(function(tx) {
        tx.executeSql('CREATE VIRTUAL TABLE vtestudos USING FTS3(titulo, texto)', [], function(tx, res) {
            //alert("nao deu erro");
            //db = window.sqlitePlugin.openDatabase({name: "vtestudos"});
            //alert("uai. deu pra abrir");

            db.transaction(function(tx) {
                tx.executeSql('INSERT INTO vtestudos(titulo, texto) SELECT titulo, texto FROM estudos', [], function(tx, res) {
                    //db3 = window.sqlitePlugin.openDatabase({name: "vtestudos"});
                    console.log('insert ok');
                });
            }, function(err) {
                alert(err.message);
            });

        });
    }, function(err) {
        alert(err.message);
    });
}

//---------------------------------------------------------------

function dropTable() {
    window.plugins.sqlDB.remove("estudosprev1", 0, rmsuccess, rmerror);
    window.plugins.sqlDB.remove("estudosprev2", 0, rmsuccess, rmerror);
}

function rmsuccess() {
    //existe versão anterior
    //alert("removesuccess");
    console.log('existe versão anterior');
}

function rmerror(e) {
    //não existe versão anterior. ignoro.
    //alert("removeerror" + JSON.stringify(e));
    console.log('n existe versão anterior. ignoro.');
}

//---------------------------------------------------------------

/*
function displayNote(name)
{
db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM estudos', [], function(tx,res){
          alert(res.rows.item(0).titulo);
          //alert(res.rows.item(0).texto);

    });
}, function(err){
    alert(err.message);
    alert("An error occured while displaying the note");
});
}
*/





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



                    //var_div_retorno += "<td> <a href='outra_pagina.html?id_titulo="+res.rows.item(i).id_titulo+"'>"+res.rows.item(i).id_titulo+"</td>";


                    var_div_retorno += "<td> <a href='outra_page.html'>" + res.rows.item(i).id_titulo + "</td>";
                    

                    var_div_retorno += "<td>" + res.rows.item(i).titulo + "|" + "</td>"
                    var descricao = res.rows.item(i).texto;
                    var_div_retorno += "<td>" + descricao.substring(0, 25);
                    var id_titulo_texto = parseInt(res.rows.item(i).id_titulo);


                    var_div_retorno += "<tr>";


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




$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}






//---------------------------------------------------------------
function pesquisarTela() {

    var recebe = $.urlParam('id_titulo');

    alert("id= " + recebe);


    // var var_texto = document.getElementById("texto").value;
    //var var_query = "SELECT * FROM estudos WHERE titulo like '%"+var_texto+"%' ";
    // var var_query = "SELECT * FROM vtestudos WHERE vtestudos MATCH '*"+var_texto+"*' ";

    var teste = "select titulo,texto from vtestudos where id_titulo=" + recebe;
    //var teste = "select * from vtestudos";
    //var var_query = "SELECT * FROM vtestudos WHERE vtestudos MATCH 'teste' ";
    //alert(var_query);

    //var var_query = "SELECT count(*) as qtd FROM vtestudos";

    db.transaction(function(tx) {
        tx.executeSql(teste, [], function(tx, res) {
            //alert(res.rows.length);
            //alert(res.rows.item(0).qtd);

            if (res.rows.length > 0) {
                var var_div_retorno = "<table width='100%'>";
                for (var i = 0; i < res.rows.length; i++) {

                    var var_div_retorno = var_div_retorno + "<tr><td>";
                    var var_div_retorno = var_div_retorno + res.rows.item(i).titulo;
                    var var_div_retorno = var_div_retorno + "</td></tr>";

                    var var_div_retorno = var_div_retorno + "<tr><td>";
                    var var_div_retorno = var_div_retorno + res.rows.item(i).texto;
                    var var_div_retorno = var_div_retorno + "</td></tr>";

                    var var_div_retorno = var_div_retorno + "<tr><td>"
                    var var_div_retorno = var_div_retorno + "<hr>"
                    var var_div_retorno = var_div_retorno + "</td></tr>"


                }
                var var_div_retorno = var_div_retorno + "</table>";
            }

            //alert(var_div_retorno);
            document.getElementById("div_retorno").innerHTML = var_div_retorno;

        });
    }, function(err) {
        alert(err.message);
    });

}

//
//
//
//
//

//$.urlParam = function(name) {
//            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//            if (results == null) {
//                return null;
//            } else {
//                return results[1] || 0;
//            }
//        }
//var id_titulo_busca = $.urlParam('id_titulo');  //

//   
//    if(id_titulo_busca !== 'null'){//

//  //carrega_descricao(id_titulo_busca);//

//alert(id_titulo_busca);//

//    }
//  
//  
//$("pesquisar").click(function() {
//    console.log( "ready!" );//

//    alert("test");
//});//
//

//  
//  
//  //

//  //var var_query = "SELECT * FROM estudos WHERE titulo like '%"+var_texto+"%' ";
//  //var var_query = "SELECT * FROM vtestudos WHERE vtestudos MATCH '*"+var_texto+"*' ";
//  var var_query="select id_titulo from vtestudos where id_titulo="+id_titulo_busca;
//  //var var_query = "SELECT * FROM vtestudos WHERE vtestudos MATCH 'teste' ";
//  //alert(var_query);
//alert(id_titulo_busca);
//  //var var_query = "SELECT count(*) as qtd FROM vtestudos";//

//  db.transaction(function(tx) {
//      tx.executeSql(var_query, [], function(tx,res){
//        //alert(res.rows.length);
//        //alert(res.rows.item(0).qtd);//

//            if(res.rows.length > 0)
//            {
//              var var_div_retorno = "<table width='100%'>";
//              for (var i = 0; i < res.rows.length; i++){//

//                var var_div_retorno = var_div_retorno + "<tr><td>";
//          var var_div_retorno = var_div_retorno + res.rows.item(i).titulo;
//          var var_div_retorno = var_div_retorno + "</td></tr>";//

//                var var_div_retorno = var_div_retorno + "<tr><td>";
//          var var_div_retorno = var_div_retorno + res.rows.item(i).texto;
//          var var_div_retorno = var_div_retorno + "</td></tr>";//

//                var var_div_retorno = var_div_retorno + "<tr><td>"
//          var var_div_retorno = var_div_retorno + "<hr>"
//          var var_div_retorno = var_div_retorno + "</td></tr>"//

//            }
//            var var_div_retorno = var_div_retorno + "</table>";
//          }//

//          //alert(var_div_retorno);
//          document.getElementById("div_retorno").innerHTML = var_div_retorno;//

//      });
//  }, function(err){
//      alert(err.message);
//  });


//---------------------------------------------------------------



//---------------------------------------------------------------
