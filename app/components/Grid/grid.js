import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {Columns, Column} from 're-bulma'
import styles from './../../styles/grid.sass'
import Paper from 'material-ui/Paper'
import {connect } from 'react-redux'
import {loadEmployee} from '../../actions/GridActions'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Modal} from 'antd';

const customContentStyle = {
    width: '35%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
};

class Grid extends PureComponent {
    state = {
        activeUser: null
    }

    componentDidMount() {
        this.props.loadEmployee();
    }

    activateUser(activeUser){ 
        this.setState({ activeUser });
    }
    handleRedirect = (e) => {
        e.stopPropagation()
    }

    render(){
        return(          
            <div>		
                <div className='UnderHeader columns is-multiline'>
                {this.props.users.map((user, i) => 
                    <div key={i} className='Container column is-one-quarter-desktop is-one-third-tablet is-full-mobile'>
                        <div  className='gridContainer ' onClick={()=> this.activateUser(user)}>
                            <div className='ImageCountainer'>
                                <img className='circularImage' src={user.picture}  />
                                {user.fbLink ? 
                                <a onClick={this.handleRedirect} href={user.fbLink} target="_blank"><img src="https://www.rtic-thai.info/tsquare/wp-content/uploads/2016/06/facebook.png" className='circularFacebook'/></a>
                                :null
                                }
                            </div>
                            <div className='name'><b>{`${user.firstName} ${user.lastName}`}</b></div>
                            <div className='position'>{user.position}</div>
                        </div>
                    </div>)}
                </div>
                {
                    this.state.activeUser ?
                    
                    <Modal
                        
                        visible={this.state.activeUser !== null}
                        wrapClassName="vertical-center-modal"
                        onOk={() => this.activateUser(null)}
                        onCancel={() => this.activateUser(null)}
                        autoScrollBodyContent={true}
                        footer={null}          
                        okText='ok'>
                        <div className='modalContainer'>
                            <div className='ImageModalCountainer' onClick={()=> this.activateUser(this.state.activeUser)}>
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
                        {this.state.activeUser.hobbies.length ? <div className='Hobbies'>
                            <b>Hobbies</b>
                            <div className='wrapInfo'>
                                {this.state.activeUser.hobbies.map((hobby)=>
                                       `${hobby.label} `
                                    )}
                            </div>
                        </div> : null}
                        {this.state.activeUser.education ? <div className='Education'>
                            <b>Education</b>
                            <div className='wrapInfo'>
                                {this.state.activeUser.education}
                            </div>
                        </div> : null}
                        {this.state.activeUser.jobDescription ? <div className='JobDescription'>
                            <b>Job Description</b>
                            <div className='wrapInfo'>
                                {this.state.activeUser.jobDescription}
                            </div>
                        </div> : null}
                    </Modal> :
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