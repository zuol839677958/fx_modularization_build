import React, { Component } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload, message } from 'antd'
import { UploadProps, RcFile, UploadChangeParam } from 'antd/lib/upload'
import { RcCustomRequestOptions } from 'antd/lib/upload/interface'
import { uploadImage } from '../../axios/api'

interface IAliyunOSSUploadProps {
  preImageUrl?: string
  isUploadMultiple?: boolean
  accept?: string
  handleUploadImageChange?: (imageUrl: string) => void
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
    const { preImageUrl, isUploadMultiple, accept } = this.props
    const { imageUrl, loading } = this.state
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text" style={{ marginTop: 5 }}>{loading ? '正在上传中...' : '上传'}</div>
      </div>
    )
    const uploadProps: UploadProps = {
      listType: 'picture-card',
      accept: accept || 'image/png,image/jpeg',
      showUploadList: !!isUploadMultiple,
      beforeUpload: file => this.handleBeforeUpload(file),
      onChange: info => this.handleUploadChange(info),
      customRequest: options => this.handleUploadFile(options)
    }

    return (
      <Upload {...uploadProps}>
        {preImageUrl || imageUrl ? <img src={preImageUrl || imageUrl} alt="" style={{ width: '100%' }} /> : uploadButton}
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
    if (info.file.status === 'error') {
      message.error('上传图片失败！')
      this.setState({ loading: false })
    }
  }

  handleUploadFile = async (options: RcCustomRequestOptions) => {
    const { handleUploadImageChange } = this.props
    this.getBase64(options.file, imageUrl => {
      uploadImage(imageUrl).then(resImageUrl => {
        this.setState({
          imageUrl: resImageUrl,
          loading: false
        })
        handleUploadImageChange!(resImageUrl)
      })
    })
  }

  getBase64 = (img: Blob, callback: (imageUrl: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }
}

export default AliyunOSSUpload