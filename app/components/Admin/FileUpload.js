
import React, {PureComponent} from 'react'


class FileUpload extends PureComponent {

    handleFileChange = (e) => {
        const file = e.target.files[0]
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

    render() {
        return (
            <div className='file-upload'>
                <input type='file' onChange={this.handleFileChange} id="file-upload" style={{display: 'none'}}/>
                <label htmlFor='file-upload'>Upload</label><br/>
            </div>
        );
    }
}

export default FileUpload
