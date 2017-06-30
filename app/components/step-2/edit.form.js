import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import change from '../../actions/test.action';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';

import UploadPreview from 'material-ui-upload/UploadPreview';

/////
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
////

 
class Form extends PureComponent {
   constructor(props) {
        super(props);
        this.state = {
            pictures: {},
            firstName: "",
            lastName: "",
            position: "",
            currentHobby: "",
            hobbies: [
            ],
            submitIsDisabled: true,
            jobDescription: "",
            fbLink: "",
            education: "",
            educationDisabled: true,
            user: {}
        };
        this.styles = {
          chip: {
            margin: 4,
            display: 'inline-block',
            float: 'left'
      },
          wrapper: {
            width: '60%',
            margin: 'auto',  
            display: 'flex',
            flexWrap: 'wrap',
      },

    };
    this.handleChange = this.handleChange.bind(this);
}
 findHobby = (array, key) => {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i].key == key) {
            return i;
        }
    }
    return -1;
}
handleChange(event) {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }
 
 handleRequestDelete = (key) => {
    const hobbies = this.state.hobbies
    const index = this.findHobby(hobbies, key)
    console.log(index)
    const before = this.state.hobbies.slice(0,index)
    const after =   this.state.hobbies.slice(index + 1)
    
    const newHobbis = [...before, ...after];
    this.setState({ hobbies: newHobbis})



  };
    renderChip = (hobby) => {
    return (
      <Chip
        key={hobby.key}
        onRequestDelete={() => this.handleRequestDelete(hobby.key)}
        style={this.styles.chip}
      >
        {hobby.label}
      </Chip>
    );
  }


    handleChangeHobby = (hobby) => {
        
        this.setState({ currentHobby: hobby })
    }
    
    handleChangeFirstName = (name) => {
        const state = this.state;
        const disabled = this.state.firstName != "" && state.lastName != "" && state.position != "" ? false : true
        this.setState({ firstName: name, submitIsDisabled: disabled  })
    }
    handleChangeLastName = (name) => {
        const state = this.state;
        const disabled = this.state.firstName != "" && state.lastName != "" && state.position != "" ? false : true
        this.setState({ lastName: name, submitIsDisabled: disabled  })
    }
    handleChangePosition = (position) => {
        const state = this.state;
        const disabled = this.state.firstName != "" && state.lastName != "" && state.position != "" ? false : true
        this.setState({ position, submitIsDisabled: disabled  })
    }    
    handleChangeJobDescription = (description) => {
        this.setState({ jobDescription: description })
    }
    handleChangeFblink = (fblink) => {
        this.setState({ fblink })
    }
    handleChangeEducation = (education) => {
        this.animation()
        const educationDisabled = this.state.education.lengt > 0 ? true : false
        console.log(education, educationDisabled)
        this.setState({ 
            education: education, 
            educationDisabled: educationDisabled })
    }
    animation = () => {
        const div = document.getElementById(`eduDiv`)
        const animation = setInterval(() => {
            console.log(this.div.style.height, `pdi vor me&ana`)
            if (this.div.style.height >= 300) {
                            console.log(div.style.height, `if i nersum`)
                clearInterval(animation);
            } else {
                this.div.style.height += 1;
            }
        },50)








    }
    submit = () => {
        const { pictures, firstName,  lastName, position, hobbies} = this.state
        fetch('http://localhost:3000/api/createProfile', {
                method:'post',
                headers: new Headers({
                    'Content-Type' : 'application/json',
                    
                }),
                'body' : JSON.stringify({ pictures, firstName,  lastName, position, hobbies})
                
        })
            .then(result => result.json())
            .then(result => {
                if (result === `new user added`) {
                    window.location.replace("/api/traning")
                }
            })
    }    

  addChip(e) {
      const code = e.keyCode ? e.keyCode : e.which;
      if (code === 13) {
          const hobby = this.state.currentHobby;
          if (this.state.hobbies.includes(hobby)) {
              alert('this hobby exist')
          } else {
            this.setState({
                hobbies: [...this.state.hobbies, {key: hobby, label: hobby}],
                currentHobby: ''
            })
          }
            
      }
  }

    onChange = (pictures) => {
        console.log(pictures)
        this.setState({pictures})};
 





    render() {
        return (
                <div className='test-style'>
                   <UploadPreview
                        title="Picture"
                        label="Add"
                        initialItems={this.state.pictures}
                        onChange={this.onChange}
                        type={`*.jpg`}
                        />


                    <TextField 
                        name = 'First Name'
                        floatingLabelText='First Name'
                        //defaultValue={this.state.firstName}
                        onChange = {e => {this.handleChangeFirstName(e.target.value)}}
                        value = {this.state.firstName}   
                        errorText="This field is required"                 
                        />
                    <br />
                    <TextField 
                        name = "Last Name"
                        floatingLabelText='Last Name'
                        //defaultValue={this.state.lastName}
                        onChange = {e => {this.handleChangeLastName(e.target.value)}}
                        value = {this.state.lastName}
                        errorText="This field is required"                    
                        />
                    <br />
                    <TextField 
                        name = "position"
                        floatingLabelText='Position'
                        onChange = {e => {this.handleChangePosition(e.target.value)}}
                        value = {this.state.position} 
                        errorText="This field is required"                   
                        
                    />
                    <br />
                    <TextField 
                        name = "Fb link"
                        floatingLabelText='Fb link'
                        onChange = {e => {this.handleChangeFblink(e.target.value)}}
                        value = {this.state.fblink}                    
                        
                        />
                    <br />
                   
                    <div className="education" id="eduDiv" >
                        <TextField 
                            name = "education_1"
                            floatingLabelText='Last Education'
                            onChange = {e => {this.handleChangeEducation(e.target.value)}}
                            value = {this.state.education}        
                              
                            />
                        <TextField 
                            name = "education_2"
                            floatingLabelText='Faculty'
                            disabled = { this.state.educationDisabled }
                            
                            />
                            
                        <TextField 
                            name = "education_3"
                            floatingLabelText ='Specialization'
                            disabled = { this.state.educationDisabled }
                            />        
                    </div>
                    <br />
                    <div style={this.styles.wrapper}> 
                        {this.state.hobbies.map(hobby => this.renderChip(hobby))}
                    </div> 
                    <TextField 
                        name = "hobbies"
                        hintText="After typing hit Enter"
                        floatingLabelText='Hobbies'
                        onChange = {e => {this.handleChangeHobby(e.target.value)}}
                        value = {this.state.currentHobby}
                        onKeyPress = { e => this.addChip(e) }
                        
                        />
                    <br />    
                    <TextField
                        floatingLabelText="Job Description"
                        multiLine={true}
                        rows={3}
                        onChange = {e => {this.handleChangeJobDescription(e.target.value)}}
                        value = {this.state.jobDescription}
                        
                        />
                    <br /> 
                    <br />   
                    <br />   
                    


                    <RaisedButton 
                    label="Submit" 
                    primary = { true } 
                    disabled = { this.state.submitIsDisabled }
                    onClick = { this.submit}
                    />
                </ div>    
        );
    }
}

export default Form;