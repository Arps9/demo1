const express=require("express");
const app=express();

const { v4: uuidv4 } = require("uuid");
const path=require("path");
const mysql=require("mysql2");


const port=3000;
const methodOverride=require("method-override");
app.use(express.urlencoded({extended:true}));
app.use (methodOverride("_method"));
app.set("view engine ", "ejs");
app.set("views" ,path.join(__dirname,"views"));


app.use(express.static(path.join(__dirname,"public")));


const connection =mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    database:'college',
    password:'Shreyash@413201',
});



app.get("/home",(req,res)=>{
    let q="select count(*) from users";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count=result[0]["count(*)"];
            res.render("home.ejs",{count});
        });
    } catch(err){
        console.log("error occure");
        res.render("error.ejs");

    }
})


app.get("/home/table",(req,res)=>{
    let q = "select * from users";
    try {
      connection.query(q,(err,result)=>{
        if (err) throw err;
        res.render("table.ejs",{result});
        console.log(result);
      });
    }catch(err){
        res.render("error.ejs");
    }
     
});

app.get("/home/edit/:id",(req,res)=>{
       let {id}=req.params;
       let q = "select * from users where id=?";
       let up=[id];
    try {
      connection.query(q,up,(err,result)=>{
        if (err) throw err;
        let u=result[0];
       
        res.render("edit.ejs",{u});

       
      });
    }catch(err){
        res.render("error.ejs");
    }
     
});

app.patch("/home/edit/:id",(req,res)=>{
    let{id}=req.params;
    let{username,email}=req.body;
  
  try {
      let q="update users set username=?, email=? where id=?";
      let info=[username,email,id];
      connection.query(q,info,(err,result)=>{
        if (err) throw err;
        res.redirect("/home/table");

    });
    }catch(err){
        res.render("error.ejs");
    }
     
});

app.delete("/home/delete/:id",(req,res)=>{
    let {id}=req.params;
    try{
        let q="delete from users where id=?";
        let user=[id];
        connection.query(q,user,(err,result)=>{
            if (err) throw err;
            res.redirect("/home/table");

        });
    } catch(err){
        res.render("error.ejs");
    }

});

app.listen(port,()=>{
    console.log("server on the port 3000");
});