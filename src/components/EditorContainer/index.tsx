import React, { Component, Dispatch, Fragment } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ITemplateModel, IPageState } from '../../store/data'
import { TemplateType } from './store/state'
import { changeSlideShow } from '../EditorSlide/store/actions'

//模板
import IconTitleText from '../../template/IconTitleText'

import './index.less'

interface IEditorContainerProps {
  allTempData?: ITemplateModel[]
  isShow?: boolean
}

class EditorContainer extends Component<IEditorContainerProps> {
  render() {
    const { allTempData, isShow } = this.props

    return (
      <div className="editor-content" style={{ paddingLeft: isShow ? "340px" : "0px" }}>
        <div className="editor-wrap">
          {this.renderAllTemplate(allTempData as ITemplateModel[])}
        </div>
      </div>


    )
  }

  renderAllTemplate(allTempData: ITemplateModel[]): JSX.Element {
    if (!allTempData) return <Fragment></Fragment>
    return (
      <Fragment>
        {
          allTempData.map(tempData => {
            switch (tempData.type) {
              case TemplateType.IconTitleText:
                return <IconTitleText key={tempData.id} iconTitleTextTempData={tempData} />
              default:
                return <Fragment></Fragment>
            }
          })
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorContainerProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
  isShow: state.editorSlideReducer.isShow
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeEditorSlideShow(isShow: boolean) {
    dispatch(changeSlideShow(isShow))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)
