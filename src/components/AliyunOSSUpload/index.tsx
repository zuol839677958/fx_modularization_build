import React, { Component } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload, message } from 'antd'
import { UploadProps, RcFile, UploadChangeParam } from 'antd/lib/upload'

interface IAliyunOSSUploadProps {
  isUploadMultiple?: boolean
}

interface IAliyunOSSUploadState {
  imageUrl: string
  loading: boolean
}

class AliyunOSSUpload extends Component<IAliyunOSSUploadProps, IAliyunOSSUploadState> {
  state: IAliyunOSSUploadState = {
    imageUrl: '',
    loading: false
  }

  render() {
    const { isUploadMultiple } = this.props
    const { imageUrl, loading } = this.state
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text" style={{ marginTop: 5 }}>{loading ? '正在上传中...' : '上传'}</div>
      </div>
    )
    const uploadProps: UploadProps = {
      action: '//www.mocky.io/v2/5cc8019d300000980a055e76',
      listType: 'picture-card',
      accept: 'image/png,image/jpeg',
      showUploadList: !!isUploadMultiple,
      beforeUpload: file => this.handleBeforeUpload(file),
      onChange: info => this.handleUploadChange(info)
    }

    return (
      <Upload {...uploadProps}>
        {imageUrl ? <img src={imageUrl} alt="" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    )
  }

  handleBeforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.warning('上传的图片必须小于2MB！');
    }
    return isLt2M
  }

  handleUploadChange = (info: UploadChangeParam) => {
    console.log(info.file.status)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
    }
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj as Blob, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      )
    }
    if (info.file.status === 'error') {
      message.error('上传图片失败！')
      this.setState({ loading: false })
    }
  }

  getBase64 = (img: Blob, callback: (imageUrl: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }
}

export default AliyunOSSUpload