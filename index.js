var express=require('express');
var mysql=require('mysql');
var cors=require('cors');
var app=express();
var cors=require('cors');
//var http = require("http");
//var bodyparse=require('body-parse');

app.use(cors());
app.use(express.json());




var con=mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'',
    database:'priya'
    

})

// app.get('/verify',(req,res)=>{
//     //id=req.body.id;
//     //email=req.body.email;
//     if(email){
//         con.query(`select *from sathiya`,(error,results,fields)=>{
//             if(error) throw error;
//             if(results){
//                 res.send({msg:"sucess"},results);

//             }else{
//                 res.send({msg:"error"})
//             }
//         })
//     }
    
// })


app.post('/register',(req,res)=>{
    console.log(req.body);
     var email=req.body.email ; 
    
    var password=req.body.password;
    // console.log(password);

//    const  email=req.body.email;
//    const password=req.body.password;
    if(email && password){
        con.query(`insert into sathiya(email,password) values(?,?)`,[email,password],(error,results,fields)=>{
            if(error) throw error;
            if(results){
                res.send({msg:"sucess"});
            }else{
                res.send({msg:"error"})
            }
            res.send("inserted values sucessfully");
        })
           
        
        
    }else{
        con.query(`select *from sathiya`,(error,results,fields)=>{
            if(error) throw error;
            if(results){
                res.send({msg:"sucess"},results);
            }else{
                res.send({msg:"error"})
            }
            res.send("shows data sucessfully")
        })
    }
    
}
)




app.get('/login',(req,res)=>{
    //var id=req.body.id;
    //var email=req.body.email;
    //var password=req.body.password;
    //if(email && password){
        //if(id>0){
    con.query(`SELECT * FROM sathiya`,(error,results,fields)=>{
        if(error) throw error;
        console.log(error);
            if(results){
                // con.query(`insert into sathiya(email,password) values (?,?,?)`,[email,password],(error,results,fields)=>{
                //     res.send('sucess');

                // })
                res.send("sucess");
            }else{
                
                res.send({msg:"error"})
            }
        res.send("sucess",results)
    })

}
//}
//}
)



//crud operation


app.post('/adduser',(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    if(email && password){
    
    con.query(`insert into sathiya(email,password) values (?,?)`[email,password],(error,results,fields)=>{
        if(error) throw error;
            if(results){
                res.send({msg:"sucess"});
            }else{
                res.send({msg:"error"})
            }
        res.send("add values sucessfully..")

    })
}
}
)


app.put('/editUser',(req,res)=>{
  var   id=req.body.id;
    if(id){
        con.query(`UPDATE sathiya SET email='',password='' where id=1`,(error,results,fields)=>{
            if(error) throw error;
            if(results){
                res.send({msg:"sucess"});
                res.send(results);
            }else{
                res.send({msg:"error"})
            }
            res.send("edit details sucessfullyy..")
        })
    }else{
        con.query(`select *from sathiya`,(error,results,fields)=>{
            res.send('show details for edit user')
        })
    }
})

app.delete('/deleteuser',(req,res)=>{
    var id=req.body.id;
    if(id){
        con.query(`DELETE from sathiya where id=?`,(error,results,fields)=>{
            if(error) throw error;
            if(results){
                res.send({msg:"sucess"},results);
            }else{
                res.send({msg:"error"})
            }
        })
    }

})


app.get('logout',(req,res)=>{
    req.logout();
})



app.post('/loginUser', (req, res, next) => {
    var email=req.body.email;
    console.log(email);
    if(email>0){
    con.query(
      `SELECT * FROM sathiya WHERE email = ${con.escape(req.body.email)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
         
         
        }
        if (!result.length) {
          return res.status(401).send({
            msg: 'Email or password is incorrect!'
          });
        }
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
             
            }
            if (bResult) {
              const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
              con.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
        );
      }
    );
    }
  });
  

  






app.listen(3000, (err)=>{
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3000);
})
