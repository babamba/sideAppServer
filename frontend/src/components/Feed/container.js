import React , { Component }from "react";
import PropTypes from "prop-types";
import Feed from "./presenter";


class Container extends Component{
    state = {
        loading: true
    };

    static propTypes = {
        getFeed : PropTypes.func.isRequired,
        feed: PropTypes.array
    };
    componentDidMount(){
        const { getFeed } = this.props;
        //persistence 작업 props 에 feed가 존재하면 로딩하지않도록 api 요청 줄임
        if(!this.props.feed){
            getFeed();
        } else {
            this.setState({
                loading:false
            });
        }
    }

    componentWillReceiveProps = (nextProps) => {
       if(nextProps.feed){
           this.setState({
               loading:false
           })
       }
    };
    

    render(){
        const { feed } = this.props;
        return <Feed {...this.state}  feed={feed} />;
    }
}


export default Container;
