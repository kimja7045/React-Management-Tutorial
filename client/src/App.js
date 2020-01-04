// 웹사이트의 화면에 대한 내용 출력 담당

import React, { Component } from 'react';
// import logo from './logo.svg';
import Customer from './components/Customer.js'
import './App.css';
import Paper from '@material-ui/core/Paper'; //어떠한 컴포넌트의 외부를 감싸기 위해 사용
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody'; //각각의 고객에 대한 정보를 등록
import TableRow from '@material-ui/core/TableRow'; //각각의 고객에 대한 정보를 등록
import TableCell from '@material-ui/core/TableCell'; //각각의 고객에 대한 정보를 등록
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit + 3, //여백을 3의 가중치만큼
    overflowX: "auto" //x축으로 overflow가 발생할 수 있도록 처리
  },
  table: {
    minWidth: 1080 //최소 1080px 이상을 유지, 이로 인해 가로 스크롤바가 생성
  }
});



class App extends Component {

  state={
    customers:""
  }

  componentDidMount(){
    this.callApi()
    .then(res=>this.setState({customers:res}))
    .catch(err=>console.log(err));
  }

  // 비동기적으로 내용을 수행할 수 있도록
  callApi=async()=>{
    const response =await fetch('/api/customers'); //접속하고자 하는 주소를 넣기, 지금은 테스트하기위한 목적으로 
    const body=await response.json(); // 고객목록이 json 형태로 출력되면 그것을 body변수에 담음 
    return body;
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
             this.state.customers? this.state.customers.map(c => {
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
            :""}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);