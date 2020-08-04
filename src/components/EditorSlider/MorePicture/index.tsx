import React, { PureComponent, Dispatch, Fragment } from 'react'
import { ITemplateModel, IPageState, IMorePictureModel } from '../../../store/data'
import { changeTempData } from '../../EditorContainer/store/actions'
import { Action } from 'redux'
import { connect } from 'react-redux'
import { updateCurrentTempData } from '../../../utils/utils'
import { Row, Slider } from 'antd'

import TitleBack from '../commonEditorComponent/titleBack'
import AliyunOSSUpload from '../../AliyunOSSUpload'

import './index.less'

interface IEditorMorePictureProps {
  data: ITemplateModel<IMorePictureModel[]>
  allTempData?: ITemplateModel<any>[]
  changeTempData?: (allTempData: ITemplateModel<any>[]) => void
}

interface IEditorMorePictureState { }

class EditorMorePicture extends PureComponent<IEditorMorePictureProps, IEditorMorePictureState> {
  render() {
    const { data } = this.props

    return (
      <Fragment>
        <TitleBack titleArrow={false} title='双图模板编辑' />
        <div className="editor_content">
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>模板间距(像素)</p>
            <Slider
              style={{ width: '100%' }}
              min={0}
              max={200}
              value={data.spacing}
              onChange={this.changeTempSpacing}
            />
          </Row>
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>更换左图</p>
            <AliyunOSSUpload
              preImageUrl={data.tempData[0].picUrl}
              handleUploadImageChange={imageUrl => this.changePictureUrl(imageUrl, 0)}
            />
          </Row>
          <Row style={{ flexDirection: 'column' }}>
            <p>更换右图</p>
            <AliyunOSSUpload
              preImageUrl={data.tempData[1].picUrl}
              handleUploadImageChange={imageUrl => this.changePictureUrl(imageUrl, 1)}
            />
          </Row>
        </div>
      </Fragment>
    )
  }

  // 更改模板间距
  changeTempSpacing = (spacing: number) => {
    const { data, allTempData, changeTempData } = this.props
    data.spacing = spacing
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更换图片
  changePictureUrl = (picUrl: string, index: number) => {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData
    tempData[index].picUrl = picUrl
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorMorePictureProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel<any>[]) {
    dispatch(changeTempData(allTempData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorMorePicture)