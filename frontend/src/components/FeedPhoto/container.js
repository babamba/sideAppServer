import React ,{ Component } from "react"
import FeedPhoto from "./presenter"

class Container extends Component {
     state = {
          seeingLikes : false
     };

     // 피드 포토에 open/close의 function 을 전달.

     render(){
          return(
               <FeedPhoto 
                    {...this.props} 
                    {...this.state}
                    openLikes= {this._openLikes}
                    closeLikes= {this._closeLikes}
               />
          );
     }

     _openLikes = () => {
          const { getPhotoLikes, likes } = this.props;
          this.setState({
               seeingLikes: true   
          });
          if(!likes){
               getPhotoLikes();
          }
     };

     _closeLikes = () => {
          this.setState({
               seeingLikes: false
          });
     };
}

export default Container;