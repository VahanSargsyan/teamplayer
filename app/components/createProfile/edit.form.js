import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import {Motion, Spring} from 'react-motion';
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
            user: {},
            style: {

            }
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
    educationState = () => this.state.education.lengt > 2
    handleChangeEducation = (education) => {
        // this.animation()
        const educationDisabled = this.educationState()
        this.setState({
            education: education,
            educationDisabled: educationDisabled })
    }
    animation = () => {
        const div = document.getElementById(`eduDiv`)
        const animation = setInterval(() => {
            if (this.div.style.height >= 300) {
                clearInterval(animation);
            } else {
                this.div.style.height += 1;
            }
        },50)
    }
    submit = () => {
        const { pictures, firstName,  lastName, position, hobbies, fblink, jobDescription} = this.state
        fetch(`${FETCH_URL}/api/createProfile`, {
                method:'post',
                headers: new Headers({
                    'Content-Type' : 'application/json',

                }),
                'body' : JSON.stringify({ pictures, firstName,  lastName, position, hobbies, fblink, jobDescription}),
                credentials: 'include'

        })
            .then(result => result.json())
            .then(result => {
                if (result.added === true) {
                    this.props.history.replace("/training");
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
        this.setState({pictures})};

    render() {
        return (
            <ValidatorForm
            onSubmit={this.submit}
            >
                <div className='test-style'>
                    <UploadPreview
                        title="Picture"
                        label="Add"
                        initialItems={this.state.pictures}
                        onChange={this.onChange}
                        type={`*.jpg`}
                    />


                    <TextValidator
                        name = 'First Name'
                        floatingLabelText='First Name'
                        //defaultValue={this.state.firstName}
                        onChange = {e => {this.handleChangeFirstName(e.target.value)}}
                        value = {this.state.firstName}
                        validators={['required', 'matchRegexp:^[a-zA-Z]+$', 'matchRegexp:^[a-zA-Z]{2,16}$']}
                        errorMessages={['This field is required', 'Name can contain only latin letters', 'Name must be between 2 and 16 characters']}
                    />
                    <br />
                    <TextValidator
                        name = "Last Name"
                        floatingLabelText='Last Name'
                        //defaultValue={this.state.lastName}
                        onChange = {e => {this.handleChangeLastName(e.target.value)}}
                        value = {this.state.lastName}
                        validators={['required', 'matchRegexp:^[a-zA-Z]+$', 'matchRegexp:^[a-zA-Z]{2,16}$']}
                        errorMessages={['This field is required', 'Last Name can contain only latin letters', 'Last Name must be between 2 and 16 characters']}
                    />
                    <br />
                    <TextValidator
                        name = "position"
                        floatingLabelText='Position'
                        onChange = {e => {this.handleChangePosition(e.target.value)}}
                        value = {this.state.position}validators={['required', 'matchRegexp:^[a-zA-Z]+$', 'matchRegexp:^[a-zA-Z]{2,16}$']}
                        errorMessages={['This field is required', 'Position can contain only latin letters', 'Position must be between 2 and 16 characters']}
                    />
                    <br />
                    <TextValidator
                        name = "Fb link"
                        floatingLabelText='Fb link'
                        onChange = {e => {this.handleChangeFblink(e.target.value)}}
                        value = {this.state.fblink}
                        validators={[ 'matchRegexp:(?:http://|https://)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?']}
                        errorMessages={['Wrong Facebook link']}
                    />
                    <br />

                    <div className="education" id="eduDiv" >
                        <TextField
                            name = "education_1"
                            floatingLabelText='Last Education'
                            onChange = {e => {this.handleChangeEducation(e.target.value)}}
                            value = {this.state.education}
                        />
                        <br/>
                        <TextField
                            name = "education_2"
                            floatingLabelText='Faculty'
                            disabled = { this.state.educationDisabled }
                        />
                        <br/>
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
                        rows={1}
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
            </ValidatorForm>
        );
    }
}

export default Form;
