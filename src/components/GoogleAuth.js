import React, { Component } from 'react'
import {connect} from 'react-redux';
import { signIn, signOut } from '../actions'

class GoogleAuth extends Component {
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '190148619530-na1iaiu9nc6rj69b699r446um3blhov7.apps.googleusercontent.com',
                scope:'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                // this.setState({
                //     isSignedIn: this.auth.isSignedIn.get()
                // })
                this.onAuthChange(this.auth.isSignedIn.get());
                // state currentlly
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }
    onAuthChange = ( isSignedIn ) => {
        // this.setState({
        //     isSignedIn: this.auth.isSignedIn.get()
        // })
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }
    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton(){
        const { isSignedIn } = this.props;
        if(isSignedIn === null) {
            return null;
        }
        else if(isSignedIn){
            return(
                <button onClick = {this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        }
        else{
            return(
                <button onClick = {this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            )
        }
    }
  render() {
    return (
      <div>
        { this.renderAuthButton()}
      </div>
    )
  }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}
export default connect(mapStateToProps,{ signIn, signOut })(GoogleAuth);