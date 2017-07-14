import React, {PureComponent} from 'react'
const uuid = require('uuid')



class Canvas extends PureComponent {

    canvasWidth = 600
    canvasHeight = 300
    draw = false
    rect = {width: 0, height: 0}
    componentDidMount() {
        this.defaultText()
    }
    onMouseDown = (e) => {
        if(this.props.imageLoaded) {
            const canvasRect = this.topCanvas.getBoundingClientRect()
            this.rect.startX = e.clientX - canvasRect.left
            this.rect.startY = e.clientY - canvasRect.top
            this.draw = true
        }
    }
    drawCountNumber = (rect, number) => {
        this.topContext.fillStyle = 'black'
        this.topContext.beginPath()
        // this.topContext.arc(rect.startX + 11, rect.startY + 11, 12, 0 ,2*Math.PI)
        this.topContext.fillRect(rect.startX, rect.startY, 16, 16)
        this.topContext.fillStyle = 'white'
        this.topContext.textBaseline = "top"
        this.topContext.font = "12px"
        this.topContext.fillText(number, rect.startX + 5, rect.startY)
    }
    onMouseUp = () => {
        if(this.props.imageLoaded) {
            this.draw = false
            if(this.rect.width > 0 && this.rect.height > 0) {
                this.rect.id = uuid()
                this.drawCountNumber(this.rect, this.props.tags.length + 1)
                this.rect.name = ''
                this.props.addTags(this.rect)
            }


            this.rect = {width: 0, height: 0}
        }
    }
    removeAndRedrawTags = () => {
        this.topContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        for(let index in this.props.tags) {
            const tag = this.props.tags[index]
            this.topContext.strokeRect(tag.startX, tag.startY, tag.width, tag.height)
            this.drawCountNumber(tag, +index + 1)
        }
    }

    onMouseMove = (e) => {
        const canvasRect = this.topCanvas.getBoundingClientRect()
        if(this.draw && this.props.imageLoaded) {
            this.topContext.imageSmoothingEnabled = false
            this.topContext.clearRect(this.rect.startX, this.rect.startY, this.rect.width, this.rect.height)
            const x = e.clientX - canvasRect.left
            const y = e.clientY - canvasRect.top

            let newWidth = x - this.rect.startX
            let newHeight = y - this.rect.startY
            if(newWidth > this.rect.width) {
                this.rect.width = newWidth
            }
            if(newHeight > this.rect.height) {
                this.rect.height = newHeight
            }
            this.topContext.strokeStyle = 'blue'
            this.topContext.strokeRect(this.rect.startX, this.rect.startY, this.rect.width, this.rect.height)
        }
    }
    drawImage = (img) => {
        // scale the image to fit without stretching
        const newHeight = this.canvasWidth * img.height / img.width
        this.canvas.height = this.topCanvas.height = newHeight
        this.context.drawImage(img, 0, 0, this.canvasWidth, newHeight)
    }
    defaultText = () => {
        this.topContext.fillStyle = 'black'
        this.topContext.font = "20px Raleway, sans-serif"
        this.topContext.fillText('Please upload a photo to preview', 150, 150)
    }
    clearCanvas = () => {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvas.height)
        this.topContext.clearRect(0, 0, this.canvasWidth, this.canvas.height)
        this.defaultText()
    }
    getFinalImage = () => {
        this.context.drawImage(this.topCanvas, 0,0)
        return this.canvas.toDataURL('image/jpeg')
    }
    render() {
        return (
            <div className='left-part'>
                <div className='canvas-block'>
                    <canvas width={this.canvasWidth} height={this.canvasHeight} className='pic-canvas'
                        ref={(c) => {
                            if(c != null){
                                this.canvas = c
                                this.context = c.getContext('2d')
                            }
                        }}
                        ></canvas>
                        <canvas width={this.canvasWidth} height={this.canvasHeight} className='tag-canvas'
                            onMouseDown = {this.onMouseDown}
                            onMouseMove = {this.onMouseMove}
                            onMouseUp = {this.onMouseUp}
                            ref={(cTop) => {
                                if(cTop != null){
                                    this.topCanvas = cTop
                                    this.topContext = cTop.getContext('2d')
                                }
                            }}/>
                </div>
            </div>
        );
    }
}

export default Canvas
