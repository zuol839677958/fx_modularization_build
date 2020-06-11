import React, { Component, Dispatch, Fragment } from 'react'
import { connect } from 'react-redux'
import { Action } from 'redux'
import { ITemplateModel, IPageState } from '../../store/data'
import { TemplateType } from './store/state'

//模板
import IconTitleText from '../../template/IconTitleText'

import './index.less'

interface IEditorContainerProps {
  allTempData?: ITemplateModel[]
}

class EditorContainer extends Component<IEditorContainerProps> {
  render() {
    const { allTempData } = this.props

    return (
      <div className="editor-content" style={{paddingLeft:340}}>
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
  allTempData: state.editorContainerReducer.allTempData
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer)
