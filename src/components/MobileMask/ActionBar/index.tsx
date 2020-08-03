import React, { FC } from 'react'
import { Button } from 'antd'
import { CopyFilled, DeleteFilled, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import { IPageState, ITemplateModel } from '../../../store/data'
import { Dispatch, Action } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

import './index.less'

interface IActionBarProps {
  mobileActiveTempId?: string
  mobileAllTempData?: ITemplateModel<any>[]
}

const ActionBar: FC<IActionBarProps> = props => {
  const { mobileActiveTempId, mobileAllTempData } = props
  const tempIndex = _.findIndex(mobileAllTempData, item => item.id === mobileActiveTempId)

  return (
    <div className="mobile-action">
      <Button type="primary" shape="round" icon={<CopyFilled />}
        style={{ marginBottom: 10 }}
      >复制</Button>
      <Button type="primary" shape="round" danger icon={<DeleteFilled />}
        style={{ marginBottom: 30 }}
      >删除</Button>
      <Button type="default" shape="round"
        style={{ marginBottom: 10 }}
      >背景</Button>
      <div className="sort-box">
        <Button type="primary" shape="circle" icon={<ArrowUpOutlined />}
          disabled={tempIndex === 0}
          style={{ marginRight: 20 }}
        ></Button>
        <Button type="primary" shape="circle" icon={<ArrowDownOutlined />}
          disabled={tempIndex === mobileAllTempData!.length - 1}
        ></Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: IPageState, ownProps: IActionBarProps) => ({
  mobileActiveTempId: state.editorContainerMobileReducer.activeTempId,
  mobileAllTempData: state.editorContainerMobileReducer.allTempData
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar)