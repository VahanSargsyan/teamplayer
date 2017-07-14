
import React, {PureComponent} from 'react'
import Canvas from './Canvas'
import TaggedNames from './TaggedNames'
import FileUpload from './FileUpload'
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css'



class TagQuestion extends PureComponent {

    state = {
        image: "",
        imageLoaded: false,
        tags: [],
        dataSource: [],
        showAlert: false,
        showSuccess: false
    }

    componentDidMount() {
        fetch(`${FETCH_URL}/api/autocomplete/employeeNames`).then(result=>result.json())
            .then(result=>{
                console.log(result, "resultttt")
                this.setState({dataSource: result})
            })
            .catch(err=>err)
    }

    removeTagHandler = (e) => {
        const index = this.state.tags.findIndex(tag => {
            return tag.id == e.target.id
        })
        this.setState({
            tags: [...this.state.tags.slice(0, index), ...this.state.tags.slice(index + 1)]
        }, ()=>{
            this.refs.canvasComponent.removeAndRedrawTags()
        })
    }

    handleInputChange = (id, value) => {
        const index = this.state.tags.findIndex(tag => {
            return tag.id == id
        })
        this.setState({
            tags: [...this.state.tags.slice(0, index),
                    {...this.state.tags[index], name: value},
                ...this.state.tags.slice(index + 1)]
        })
    }

    uploadImage = (img) => {
        this.refs.canvasComponent.drawImage(img)
        this.setState({image: img.src, tags: [], imageLoaded: true})
    }

    addTags = (rect) => {
        this.setState({tags: [...this.state.tags, rect]})
    }

    submit = () => {
        const index = this.state.tags.findIndex(tag=>{
            return tag.name === ''
        })
        if(index === -1) {
            const answers = this.state.tags.map(tag=>{
                return tag.name
            })
            const picture = this.refs.canvasComponent.getFinalImage()
            const data = {type: 'tag',who: {picture},answers}
            const initObj = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
                credentials: 'include'
            }
            fetch(`${FETCH_URL}/api/question`, initObj).then(result => result.json()).then(result => {
                this.setState({showSuccess: true})
            }).catch(error => error)
        } else {
            this.setState({showAlert: true})
        }
    }
    confirmSuccess = () => {
        this.refs.canvasComponent.clearCanvas()
        this.setState({
            showSuccess: false,
            tags: [],
            image: "",
            imageLoaded: false
        })
    }
    render() {
        return (
            <div className='tag-question'>
                <FileUpload
                    uploadImage={this.uploadImage}
                />
                <Canvas
                    ref='canvasComponent'
                    tags = {this.state.tags}
                    imageLoaded = {this.state.imageLoaded}
                    addTags={this.addTags}
                />
                <TaggedNames
                    dataSource={this.state.dataSource}
                    tags={this.state.tags}
                    onNewRequest={this.onNewRequest}
                    removeTagHandler={this.removeTagHandler}
                    handleInputChange={this.handleInputChange}
                    submit={this.submit}
                />
                <SweetAlert
                  show={this.state.showAlert}
                  html
                  title="<p style='font-size:22px'>Tag names cannot be empty</p>"
                  type="warning"
                  onConfirm={() => this.setState({ showAlert: false })}
                />
                <SweetAlert
                  show={this.state.showSuccess}
                  html
                  title="<p style='font-size:22px'>Submitted successfully</p>"
                  type="success"
                  onConfirm={this.confirmSuccess}
                />
            </div>
        );
    }
}

export default TagQuestion
