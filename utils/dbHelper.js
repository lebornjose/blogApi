const mysql = require('mysql');
const config = require('../config/default');

const config_file = config.database;
function DBhelper (table) {
  //default s
  this.table = table;
  this.config = config_file;
};

DBhelper.prototype.connectHelper = function(sql,callback) {
  const connection = mysql.createConnection({
    host : this.config.host,
    user : this.config.user,
    password : this.config.password,
    database: this.config.database
  });
  connection.query(sql,callback);

  connection.end();
};

//@param col(string) default is "*"
//@param where(string) as same as SQL and the default is null
DBhelper.prototype.selectWhere = function (callback) {
  switch(arguments.length){
    case 1:
      this.connectHelper(`SELECT * FROM ${this.table} limit 0,20`,function (err, results, fields) {
        if(!err){
          callback(results);}
        else
          callback(err)
          console.log(err);
      });
      break;
    case 3:
      this.connectHelper("SELECT "+ col +" FROM "+this.table+" WHERE "+where,function (err, results, fields) {
        if(!err)
          callback(results);
        else
          console.log(err);
      });
      break;
    default:
      throw new Error("param error");
      break;

  }
};

//@param data the map which you want to insert into table
DBhelper.prototype.add = function(data,callback) {
  var col = "";
  var value = "";

  for(var key in data){
    col+="`"+key+"`,";
    value+="'"+data[key]+"',";
  }
  col = col.substr(0,col.length-1);
  value =value.substr(0,value.length-1);
  console.log("INSERT INTO `"+this.table+"` ("+col+") VALUES ( "+value+");");

  this.connectHelper("INSERT INTO `"+this.table+"` ("+col+") VALUES ( "+value+");",function (err, results, fields) {
    if(!err)
      callback(true);
    else{
      console.log(err);
      callback(false);
    }

  });
  console.log(col+value);
}

DBhelper.prototype.save = function(data,where,callback) {
  let set= "";
  for(const key in data){
    set+="`"+key+"` = "+"'"+data[key]+"',";
  }
  set = set.substr(0,set.length-1);
  console.log(set);
  this.connectHelper("UPDATE `"+this.table+"` SET "+set+" WHERE "+where+";",function (err, results, fields) {
    if(!err)
      callback(true);
    else{
      console.log(err);
      callback(false);
    }
  });
};


DBhelper.prototype.delete = function(where,callback) {
  this.connectHelper("DELETE FROM `"+this.table+"` WHERE "+where+" ;",function (err, results, fields) {
    if(!err)
      callback(true);
    else{
      console.log(err);
      callback(false);
    }
  });
};

module.exports.DBhelper = DBhelper;
