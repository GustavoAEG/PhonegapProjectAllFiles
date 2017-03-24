/*Line 43 error*/

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
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');


        // OPERACOES BD - inicio

        //banco de dados local - aceite de termos e outras coisas
        dbUser = window.sqlitePlugin.openDatabase({name: 'user.db', location: 'default'});
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

function copysuccess()
{
    //primeira versão deste banco de dados. o comando anterior.
    //provavelmente realizou a cópia, abro o BD.
    db = window.sqlitePlugin.openDatabase({name: dbName});
    //preciso verificar se existem versões anteriores deste BD. Deleto por precaucao
    dropTable();
    fts_table();
}

function copyerror(e)
{
    //esta versao do banco de dados ja existe.
    //abro o BD
    db = window.sqlitePlugin.openDatabase({name: dbName});
    //db3 = window.sqlitePlugin.openDatabase({name: "vtestudos"});
    //alert("copyerror" + JSON.stringify(e));
}


//---------------------------------------------------------------

function fts_table(){
    db.transaction(function(tx) {
    tx.executeSql('CREATE VIRTUAL TABLE vtestudos USING FTS3(titulo, texto, id_titulo)', [], function(tx,res){
          //alert("nao deu erro");
          //db = window.sqlitePlugin.openDatabase({name: "vtestudos"});
          //alert("uai. deu pra abrir");

          db.transaction(function(tx) {
          tx.executeSql('INSERT INTO vtestudos(titulo, texto, id_titulo) SELECT titulo, texto, id_titulo FROM estudos', [], function(tx,res){
              //db3 = window.sqlitePlugin.openDatabase({name: "vtestudos"});
               console.log('insert ok');
          });
          }, function(err){
              alert(err.message);
          });

    });
    }, function(err){
        alert(err.message);
    });
}

//---------------------------------------------------------------

function dropTable()
{
    window.plugins.sqlDB.remove("estudosprev1", 0, rmsuccess,rmerror); 
    window.plugins.sqlDB.remove("estudosprev2", 0, rmsuccess,rmerror);  
}

function rmsuccess()
{
    //existe versão anterior
    //alert("removesuccess");
    console.log('existe versão anterior');
}

function rmerror(e)
{
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


