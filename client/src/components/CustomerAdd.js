import React from 'react';
import { post } from 'axios';

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
            fileName: '' 
        });
    }

    handleFileChange = (e) => {
        this.setState({
            file:e.target.files[0], // e.target= 이벤트가 발생한 인풋값 자체를 의미
            fileName:e.target.value
        });
    }

    handleValueChange=(e)=>{
        let nextState={};
        nextState[e.target.name]=e.target.value;
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

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} 
                    value={this.state.fileName} onChange={this.handleFileChange} /><br />
                이름: <input type="text" name="userName" value={this.state.userName}
                    onChange={this.handleValueChange} /><br />
                생년월일: <input type="text" name="birthday" value={this.state.birthday}
                    onChange={this.handleValueChange} /><br />
                성별: <input type="text" name="gender" value={this.state.gender}
                    onChange={this.handleValueChange} /><br />
                직업: <input type="text" name="job" value={this.state.job}
                    onChange={this.handleValueChange} /><br />
                <button type="submit">추가하기</button>
            </form>
        );
    }
}

export default CustomerAdd;