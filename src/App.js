import React, { Component } from 'react';
import logo from './logo.svg';
import Customer from './components/Customer.js'
import './App.css';

// 웹사이트의 화면에 대한 내용 출력 담당

const customers = [
  {
    'id': 1,
    'image': 'https://placeimg.com/64/64/any', // 이미지 크기=64*64
    'name': '김재훈',
    'birthday': '950201',
    'gender': '남자',
    'job': '대학생'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/any', // 이미지 크기=64*64
    'name': '홍길동',
    'birthday': '960201',
    'gender': '남자',
    'job': '개발자'
  }, {
    'id': 3,
    'image': 'https://placeimg.com/64/64/any', // 이미지 크기=64*64
    'name': '이순신',
    'birthday': '130201',
    'gender': '남자',
    'job': '장군'
  },
]
class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            );
          })
        }
      </div>
    );
  }
}

export default App;
