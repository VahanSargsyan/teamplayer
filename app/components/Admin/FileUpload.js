
import React, {PureComponent} from 'react'
import SweetAlert from 'sweetalert-react'
import 'sweetalert/dist/sweetalert.css'

class FileUpload extends PureComponent {

    state = {
        sizeErr: false
    }
    handleFileChange = (e) => {
        const file = e.target.files[0]
        if(file.size > 1024*1024*2) {
            this.setState({sizeErr: true})
        } else {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                // upload image to canvas
                const img = new Image()
                img.src = reader.result
                img.onload = () => {
                    this.props.uploadImage(img)
                }
            }
        }
    }

    render() {
        return (
            <div className='file-upload'>
                <input type='file' onChange={this.handleFileChange} id="file-upload" style={{display: 'none'}}/>
                <label htmlFor='file-upload'>Upload</label><br/>
                <SweetAlert
                  show={this.state.sizeErr}
                  html
                  title="<p style='font-size:22px'>File size is too large</p>"
                  type="warning"
                  onConfirm={() => this.setState({sizeErr: false })}
                />
            </div>
        );
    }
}

export default FileUpload
