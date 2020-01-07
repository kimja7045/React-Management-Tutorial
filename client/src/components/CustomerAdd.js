import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle'; // 타이틀 영역이 따로 존재
import DialogContent from '@material-ui/core/DialogContent'; // dialog 내용, 고객 추가 입력창
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null, // 사용자의 프로필 이미지를 파일형태로 보낼 수 있도록 해야되기 때문에 null
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '' // 파일명
        }
    }

    handleFormSubmit = (e) => { // 이벤트 변수 전달
        e.preventDefault()  // 데이터가 서버로 전달됨에 있어서 오류가 발생하지 않도록 하나의 함수를 불러옴 
        this.addCustomer().then((response) => { // 서버로부터 res가 왔을 때 건너 온 데이터를 콘솔창에 출력
            console.log(response.data);
            this.props.stateRefresh(); // 비동기적인 수행이라 순서를 보장하지 못함
        });
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }

    handleFileChange = (e) => { // 자동 바인딩 처리
        this.setState({
            file: e.target.files[0], // e.target= 이벤트가 발생한 인풋값 자체를 의미
            fileName: e.target.value
        });
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        const config = {// 파일이 포함되어 있는 데이터를 서버로 전송하고자 할 때는 웹 표준에 맞는 헤더를 추가해야 함
            headers: {
                'content-type': 'multipart/form-data' // 보내고자 하는 데이터가 multipart/form-data 다
            }
        }
        return post(url, formData, config);
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }
    handleClickClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary"
                    onClick={this.handleClickOpen}>고객 추가하기</Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file}
                            value={this.state.fileName} onChange={this.handleFileChange} /><br />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName}
                            onChange={this.handleValueChange} /><br />
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday}
                            onChange={this.handleValueChange} /><br />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender}
                            onChange={this.handleValueChange} /><br />
                        <TextField label="직업" type="text" name="job" value={this.state.job}
                            onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(CustomerAdd);