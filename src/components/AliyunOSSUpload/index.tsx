import React, { PureComponent, Fragment } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload, message, Checkbox } from 'antd'
import { UploadProps, RcFile, UploadChangeParam } from 'antd/lib/upload'
import { RcCustomRequestOptions } from 'antd/lib/upload/interface'
import { uploadImage } from '../../axios/api'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'

interface IAliyunOSSUploadProps {
  preImageUrl?: string
  isUploadMultiple?: boolean
  accept?: string
  uploadTip?: string
  handleUploadImageChange?: (imageUrl: string) => void
}

interface IAliyunOSSUploadState {
  imageUrl: string
  loading: boolean
  hasWatermark: boolean
}

class AliyunOSSUpload extends PureComponent<IAliyunOSSUploadProps, IAliyunOSSUploadState> {
  state: IAliyunOSSUploadState = {
    imageUrl: '',
    loading: false,
    hasWatermark: false
  }

  render() {
    const { preImageUrl, isUploadMultiple, accept, uploadTip } = this.props
    const { imageUrl, loading, hasWatermark } = this.state
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text" style={{ marginTop: 5 }}>{loading ? '正在上传中...' : `${uploadTip || '上传'}`}</div>
      </div>
    )
    const uploadProps: UploadProps = {
      listType: 'picture-card',
      accept: accept || 'image/png,image/jpeg,image/gif',
      showUploadList: !!isUploadMultiple,
      beforeUpload: file => this.handleBeforeUpload(file),
      onChange: info => this.handleUploadChange(info),
      customRequest: options => this.handleUploadFile(options)
    }

    return (
      <Fragment>
        <Upload {...uploadProps}>
          {
            (preImageUrl || imageUrl) && !loading
              ? <img src={preImageUrl || imageUrl} alt="" style={{ width: '100%' }} />
              : uploadButton
          }
        </Upload>
        <Checkbox style={{ marginBottom: 10 }}
          checked={hasWatermark}
          onChange={this.handleHasWatermark}
        >是否显示水印</Checkbox>
      </Fragment>
    )
  }

  handleBeforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < 0.5
    if (!isLt2M) {
      message.warning('上传的图片必须小于500KB！');
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
    const { hasWatermark } = this.state
    this.getBase64(options.file, imageUrl => {
      uploadImage(imageUrl, hasWatermark ? 1 : 0).then(resImageUrl => {
        this.setState({
          imageUrl: resImageUrl,
          loading: false
        })
        handleUploadImageChange!(resImageUrl)
      })
    })
  }

  handleHasWatermark = (e: CheckboxChangeEvent) => {
    this.setState({ hasWatermark: e.target.checked })
  }

  getBase64 = (img: Blob, callback: (imageUrl: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }
}

export default AliyunOSSUpload