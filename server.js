const express=require('express'); //익스프레스 불러옴
const bodyParser=require('body-parser'); // 서버 모듈을 위한 기능까지 다 선언
const app=express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    res.send([
        {
          'id': 1,
          'image': 'https://placeimg.com/64/64/1', // 이미지 크기=64*64
          'name': '김재훈',
          'birthday': '950201',
          'gender': '남자',
          'job': '대학생'
        },
        {
          'id': 2,
          'image': 'https://placeimg.com/64/64/2', // 이미지 크기=64*64
          'name': '홍길동',
          'birthday': '960201',
          'gender': '남자',
          'job': '개발자'
        }, {
          'id': 3,
          'image': 'https://placeimg.com/64/64/3', // 이미지 크기=64*64
          'name': '이순신',
          'birthday': '130201',
          'gender': '남자',
          'job': '장군'
        },
      ]);
})

// app.get('./api/hello',(req,res)=>{ //서버에 접속하는 사용자가 hello경로로 접속하면 
//     res.send({message:'Hello Express!'}); //사용자에게 하나의 메세지를 출력
// });

app.listen(port,()=>console.log(`Listening on port ${port}`));