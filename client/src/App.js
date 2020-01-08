// 웹사이트의 화면에 대한 내용 출력 담당

import React, { Component } from 'react';
// import logo from './logo.svg';
import Customer from './components/Customer.js'
import CustomerAdd from './components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper'; //어떠한 컴포넌트의 외부를 감싸기 위해 사용
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody'; //각각의 고객에 대한 정보를 등록
import TableRow from '@material-ui/core/TableRow'; //각각의 고객에 대한 정보를 등록
import TableCell from '@material-ui/core/TableCell'; //각각의 고객에 대한 정보를 등록
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// App Bar
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing(3), //여백을 3의 가중치만큼
    // overflowX: "auto", //x축으로 overflow가 발생할 수 있도록 처리
    flexGrow:1
    // minWidth:1080
  },
  menu:{
    marginTop:15,
    marginBottom:15,
    display:'flex',
    justifyContent:'center'
  },
  paper: {
    marginLeft: 18,
    marginRught: 18
  },
  // table: {
  //   minWidth: 1080 //최소 1080px 이상을 유지, 이로 인해 가로 스크롤바가 생성
  // },
  progress: {
    margin: theme.spacing(2) //위쪽으로
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tableHead: {
    fontSize: "1.0rem"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: '',
      completed: 0,
      searchKeyword:''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0,
      searchKeyword:''
    });
    this.callApi() //고객 데이터를 불러오는 부분
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20); //0.02초마다 progress함수가 실행
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  // 비동기적으로 내용을 수행할 수 있도록
  callApi = async () => {
    const response = await fetch('/api/customers'); //접속하고자 하는 주소를 넣기, 지금은 테스트하기위한 목적으로 
    const body = await response.json(); // 고객목록이 json 형태로 출력되면 그것을 body변수에 담음 
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  // 추가,검색에 사용
  handleValueChange=(e)=>{ // 입력값을 상태변화로 감지해서 리액트 내부에 해당 데이터를 가지고 있도록 해야
    let nextState={};
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
  }

  render() {

    const filteredComponents=(data)=>{
      data=data.filter((c)=>{
        return c.name.indexOf(this.state.searchKeyword)>-1;    
      });

      return data.map((c)=>{
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id}
                          image={c.image} name={c.name} birthday={c.birthday} 
                          gender={c.gender} job={c.job}/>
      })
    }

    const { classes } = this.props;
    const cellList = ["번호", "프로필 이미지", "이름", "생년월일", "성별", "직업", "설정"];
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객 관리 시스템
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="검색"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={this.state.searchKeyword}
                onChange={this.handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.menu}>
          <CustomerAdd stateRefresh={this.stateRefresh} />
        </div>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map(c => {
                  return <TableCell className={classes.tableHead}>{c}</TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {
                // this.state.customers.map(c => {
                //   return (
                //     <Customer
                //       stateRefresh={this.stateRefresh}
                //       key={c.id}
                //       id={c.id}
                //       image={c.image}
                //       name={c.name}
                //       birthday={c.birthday}
                //       gender={c.gender}
                //       job={c.job}
                //     />
                //   );
                //}):

                this.state.customers ?  
                filteredComponents(this.state.customers)     
                :
                  <TableRow>
                    <TableCell colSpan="6" align="center">
                      <CircularProgress className={classes.progress} variant="determinate"
                        value={this.state.completed} />
                    </TableCell>
                  </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>

      </div>
    );
  }
}

export default withStyles(styles)(App);