const fs=require('fs');
const express=require('express'); //익스프레스 불러옴
const bodyParser=require('body-parser'); // 서버 모듈을 위한 기능까지 다 선언
const app=express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data=fs.readFileSync('./database.json');
const conf=JSON.parse(data);
const mysql=require('mysql');

const connection=mysql.createConnection({
  host:conf.host,
  user:conf.user,
  password:conf.password,
  port:conf.port,
  database:conf.database
});
connection.connect();

app.get('/api/customers',(req,res)=>{
    connection.query(
      "select * from customer",
      (err,rows,fields)=>{ // 모든 고객 데이터가 포함되어있는 rows 변수를
        if(err) throw err;
        res.send(rows);    // 그대로 사용자에게 보여줄 수 있도록
      }
    )
})

// app.get('./api/hello',(req,res)=>{ //서버에 접속하는 사용자가 hello경로로 접속하면 
//     res.send({message:'Hello Express!'}); //사용자에게 하나의 메세지를 출력
// });

app.listen(port,()=>console.log(`Listening on port ${port}`));