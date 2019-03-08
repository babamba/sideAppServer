import React , { Component }from "react";
import PropTypes from "prop-types";
import Explore from "./presenter";


class Container extends Component{
    state = {
        loading: true
    };

    static propTypes = {
        getExplore : PropTypes.func.isRequired,
        userList:PropTypes.array
    };
    componentDidMount(){
        const { getExplore } = this.props;
        //persistence 작업 props 에 feed가 존재하면 로딩하지않도록 api 요청 줄임
        if(!this.props.userList){
            getExplore();
        } else {
            this.setState({
                loading:false
            });
        }
    }

    componentWillReceiveProps = (nextProps) => {
       if(nextProps.userList){
           this.setState({
               loading:false
           })
       }
    };
    

    render(){
        const { userList } = this.props;
        return <Explore {...this.state}  userList={userList} />;
    }
}


export default Container;
