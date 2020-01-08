## Management System
Material UI App Bar, icons Library, Korean Font Apply chap17<br/>
본 프로젝트는 React 고객 관리 시스템(Client Management System)입니다.<br>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Hangul(Korean) 폰트 적용
다양한 블로그에서 기본 글씨체로 사용되는 한글 폰트

import{MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles';

const theme=createMuiTheme({
    typography:{
        fontFamily:'"Noto Sans KR",serif'
    }
});

ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>, document.getElementById('root'));

# icons installation
Material UI App Bar 사용에 필요한 icons 라이브러리
npm install --save @material-ui/icons

# multer installation
파일처리 라이브러리
npm install --save multer

## axios installation
axios(엑시오스) - 서버와의 통신 목적의 라이브러리
npm install --save axios

## mysql library installation
npm install --save mysql

## etc
일반적으로 리액트에서는 비동기 통신을 이용해서 서버에 접근하여 데이터를 가져오도록 코딩
,props는 변경할 수 없는 데이터를 명시할 때 사용

npm install -g react-scripts

## to run npm run dev()
npm install concurrently -g

## nodemon, body-parser, express Installation(한꺼번에 설치) + 노드몬 실행
npm install -g nodemon body-parser express => nodemon server.js || npm run server 로 시작

## body-parser Installation(설치)
npm install --save body-parser

## Material UI Installation
npm install @material-ui/core

## First Uploading vscode code to github 
CHANGES + + 
=> commit massage + V 
=> git remote add origin https://github.com/kimja7045/React-Management-Tutorial.git <br/>
=> git push --set-upstream origin master

## Uploading vscode code to github 
CHANGES + + 
=> commit massage + V 
=> MANAGEMENT … PUSH