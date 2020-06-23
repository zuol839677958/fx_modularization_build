import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IPageState } from '../../store/data'
import { Dispatch, Action } from 'redux'

import './index.less'

interface IAddTemplateProps {

}

interface IAddTemplateState {

}

class AddTemplate extends Component<IAddTemplateProps, IAddTemplateState> {
  render() {

    return (
      <div className="add-silder-model">

      </div>
    )
  }
}

const mapStateToProps = (state: IPageState, ownProps: IAddTemplateProps) => ({

})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AddTemplate)