import React , { Component }from "react";
import Navigation from "./presenter";
import PropTypes from "prop-types"

class Container extends Component {
    state = {
      term: "",
      notification:false
    };
    static propTypes = {
      goToSearch: PropTypes.func.isRequired
    };
    render() {
      const { term } = this.state;
      return (
        <Navigation
          onSubmit={this._onSubmit}
          onInputChange={this._onInputChange}
          onNotification={this._onNotification}
          closeNotification={this._closeNotification}
          value={term}
        />
      );
    }
    _onInputChange = event => {
      const { target: { value } } = event;
      this.setState({
        term: value
      });
    };
    _onSubmit = event => {
      const { goToSearch } = this.props;
      const { term } = this.state;
      event.preventDefault();
      goToSearch(term);
      this.setState({
        term: ""
      });
    };

    _onNotification = () => {
        const { notification } = this.state;
        const { getNotifications } = this.props;
        console.log(notification)
        if(notification) {
            this.setState({
                notification: false
            });
        } else {
            this.setState({
                notification: true
            });
            getNotifications();
        }
    }

    _closeNotification = event => {
        this.setState({
            notification: false
        })
    }

  }

export default Container;
