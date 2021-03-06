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

const multer=require('multer'); // multer 라이브러리를 불러와서 multer 객체 생성
const upload=multer({dest:'./upload'}); // upload폴더에 사용자의 파일이 업로드

app.get('/api/customers',(req,res)=>{
    connection.query(
      "select * from customer where isDeleted=0",
      (err,rows,fields)=>{ // 모든 고객 데이터가 포함되어있는 rows 변수를
        if(err) throw err;
        res.send(rows);    // 그대로 사용자에게 보여줄 수 있도록
      }
    )
})

app.use('/image',express.static('./upload')); //사용자가 접근해서 확인할 수 있도록 upload 폴더 공유
//이미지 경로로 접근하는데 우리의 실제 upload 폴더와 매핑? 이 됨

app.post('/api/customers',upload.single('image'),(req,res)=>{
  let sql='insert into customer values (null, ?,?,?,?,?,now(),0)';
  let image='/image/'+req.file.filename;
  let name=req.body.name;
  let birthday=req.body.birthday;
  let gender=req.body.gender;
  let job=req.body.job;
  let params=[image,name,birthday,gender,job];

  connection.query(sql,params,
    (err,rows,fields)=>{
      res.send(rows);
    });
})

app.delete('/api/customers/:id',(req,res)=>{
  let sql='update customer set isDeleted=1 where id=?';
  let params=[req.params.id];
  connection.query(sql,params,
      (err,rows,fields)=>{
        res.send(rows);
      }
    )
});

app.listen(port,()=>console.log(`Listening on port ${port}`));

// app.get('./api/hello',(req,res)=>{ //서버에 접속하는 사용자가 hello경로로 접속하면 
//     res.send({message:'Hello Express!'}); //사용자에게 하나의 메세지를 출력
// });