import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {Columns, Column} from 're-bulma'
import styles from './../../styles/grid.sass'
import Paper from 'material-ui/Paper'
import {connect } from 'react-redux'
import {loadEmployee} from '../../actions/GridActions'
import Dialog from 'material-ui/Dialog';


const customContentStyle = {
    width: '35%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
};

class Grid extends PureComponent {
    
    state = {
        activeUser: null,
        modal: false
    }

    componentDidMount() {
        this.props.loadEmployee();
    }

    babgen(user){
       console.log(user)
        this.setState({
        
            modal: true,
            activeUser: user
        }, () => {
            console.log('state', this.state)
            
        })

        
    }

      handleClose = () => {
    this.setState({activeUser:null});
  };

    render(){

        if (!this.props.users) {
            return (<div>There are no user...</div>)
        }

        return(          
            <div>
                <div className='columns is-multiline '>
                {this.props.users.map((user, i) => 
                    <div key={i} className='gridContainer column  is-one-quarter-desktop is-one-third-tablet is-half-mobile  '>
                        <div className='ImageCountainer'>
                            <img className='circularImage' src={user.picture}  onClick={()=> this.babgen(user)} />
                            <a href={user.fbLink} target="_blank"><img src="https://www.rtic-thai.info/tsquare/wp-content/uploads/2016/06/facebook.png" className='circularFacebook'/></a>
                        </div>
                        <div className='name'><b>{`${user.firstName} ${user.lastName}`}</b></div>
                        <div className='position'>{user.position}</div>
                    </div>)}
                
                </div>
                {
                    this.state.activeUser ?
                    <Dialog
                        title="Dialog With Actions"
                        modal={false}
                        contentStyle={customContentStyle}
                        open={this.state.modal}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}>
                        <div className='modalContainer'>
                            <div className='ImageModalCountainer' onClick={()=> this.babgen(this.state.activeUser)}>
                                <img className='circularModalImage' src={this.state.activeUser.picture} />
                            </div>
                            <div className='nameModal'>
                                <b>
                                    {this.state.activeUser.firstName} {this.state.activeUser.lastName}
                                </b>
                                <br/>{this.state.activeUser.position}
                                <br/>{this.state.activeUser.email}

                            </div>
                        </div>
                        <div className='Hobbies'>
                            <b>Hobbies</b>
                            <div className='HobbyInfo'>
                                {this.state.activeUser.hobbies.map((hobby)=>
                                       `${hobby.label} `
                                    )}
                            </div>
                        </div>
                        <div className='Education'>
                            <b>Education</b>
                            <div className='EduInfo'>
                                BS in American University of Armenia

                            </div>
                        </div>
                        <div className='JobDescription'>
                            <b>Job Description</b>
                            <div className='DescribeJob'>
                                It is very interesting to work in Simply Technologies and I am very happy tobtbtbtbtbtbtbtbtbtbbtbtbtbtbtbtbtbbtbt
                                btbtbtbtbtbbtbtbtbbtajfaalsjf;lkdl;dkf;dlkl
                                ajf;ladkdlfjl;kf

                            </div>
                        </div>
                        

                        
                    </Dialog> :
                    null
                }
            </div>
            
        )
    }

    
}
function mapStateToProps(state){
    return {
        users: state.grid.users,
        modal: state.grid.modal
    }
}

function mapDispatchToProps(dispatch){
    return{
        loadEmployee: () => dispatch(loadEmployee())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Grid);