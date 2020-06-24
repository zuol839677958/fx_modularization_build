import React, { Component, Fragment } from 'react'
import { IPageState, ITemplateModel, IPictureTextModel, ITitleTextModel } from '../../../store/data'
import { Dispatch, Action } from 'redux'
import { changeTempData } from '../../EditorContainer/store/actions'
import { connect } from 'react-redux'
import { updateIconTitleTextItemShow, updateCurrentTempData, swapArray, deleteIconTitleTextItem, updateIconTitleTextItemTitle, updateIconTitleTextItemText, updateIconTitleTextItemTitleFontColor, updateIconTitleTextItemTextFontColor, updateIconTitleTextItemTitleBgType, updateIconTitleTextItemTitleBgColor, deepClone } from '../../../utils/utils'
import { InputNumber, message, Input, Row, Button, Radio } from 'antd'
import { BackgroundSetType } from '../../BackgroundSet/store/state'
import { SketchPicker } from 'react-color'

import TitleBack from '../commonEditorComponent/titleBack'
import Draggable from '../commonEditorComponent/draggable'
import RichTextEditor from '../../RichTextEditor'
import FontColorSet from '../../FontColorSet'

import './index.less'

interface IEditorPictureTextProps {
  data: ITemplateModel
  allTempData?: ITemplateModel[]
  changeTempData?: (allTempData: ITemplateModel[]) => void
  changeEditorSlideShow?: (isShow: boolean) => void
}

interface IEditorPictureTextState {
  tabTypeIndex: number
  tabTitle: string
  editItemData?: ITitleTextModel
  richTextEditorModalVisible: boolean
  currentFontColor: string
  fontColorSelectModalVisible: boolean
  fontColorChangeType?: FontColorChangeType
}

enum FontColorChangeType {
  Titile = 1,
  Text
}

class EditorPictureText extends Component<IEditorPictureTextProps, IEditorPictureTextState> {
  state: IEditorPictureTextState = {
    tabTypeIndex: 0,
    tabTitle: '图文模板编辑',
    richTextEditorModalVisible: false,
    currentFontColor: '',
    fontColorSelectModalVisible: false
  }

  render() {
    const { data } = this.props
    const {
      tabTypeIndex,
      tabTitle,
      editItemData,
      richTextEditorModalVisible,
      currentFontColor,
      fontColorSelectModalVisible
    } = this.state

    return (
      <Fragment>
        <TitleBack
          titleArrow={tabTypeIndex === 1}
          title={tabTitle}
          changeTypeIndex={(index) => this.changeTabTypeIndex(index)}
        />
        <div className="editor_box" style={{ display: tabTypeIndex === 0 ? "block" : "none" }}>
          <p>图文间距</p>
          <div className="spacing-box">
            <InputNumber
              value={(data.tempData as IPictureTextModel).spacingPercent}
              onChange={(value) => this.changePictureTextSpacing(value as number)}
            />
            <span>%</span>
          </div>
          <p>条目管理</p>
          <Draggable
            data={(data.tempData as IPictureTextModel).titleTextList}
            handleEditItem={(itemData) => this.initEditDetails(itemData as ITitleTextModel)}
            handleDeleteItem={(itemSort) => this.deleteTxtListItem(itemSort)}
            handleIsShowItem={(checked, itemSort) => this.checkedTxtListItem(checked, itemSort)}
            handleDraggableItemChange={(dragItemStartIndex, dragItemEndIndex) =>
              this.changeTxtListItemSort(dragItemStartIndex, dragItemEndIndex)}
          />
          <Row style={{ justifyContent: "center" }}>
            <Button type="primary" shape="round"
              style={{ marginTop: '50px', width: 200 }}
              onClick={() => this.addTemplateItem()}
              disabled={(data.tempData as IPictureTextModel).titleTextList.length >= 6}
            >加一栏</Button>
          </Row>
        </div>
        <div className="details_box" style={{ display: tabTypeIndex === 1 ? "block" : "none" }}>
          <Row className="inputAndColor_wrap">
            <p>修改标题</p>
            <div className="inputAndColor_box">
              <Input placeholder="请输入标题" maxLength={10} value={editItemData?.title}
                onChange={(e) => this.changeItemTitle(e.target.value)}
              />
              <div className="fontColorSelect"
                style={{ background: editItemData?.titleFontColor }}
                onClick={() => this.initFontColorSelectModal(FontColorChangeType.Titile, editItemData!.titleFontColor!)}
              ></div>
            </div>
          </Row>
          <Row style={{ marginBottom: 20, flexDirection: 'column' }}>
            <p>修改标题背景色</p>
            <div style={{ marginBottom: 10 }}>
              <Radio.Group
                value={editItemData?.background?.bgType}
                onChange={(e) => this.changeTitleBgType(e.target.value)}
              >
                <Radio value={BackgroundSetType.PureColor}>纯色</Radio>
                <Radio value={BackgroundSetType.BackgroundImage}>背景图</Radio>
              </Radio.Group>
            </div>
            {this.renderEditItemTitleBackgroundSet()}
          </Row>
          <Row className="inputAndColor_wrap">
            <p>修改文字</p>
            <div className="inputAndColor_box">
              <Button type="primary" shape="round"
                onClick={() => this.handleRichTextEditorModalVisible(true)}
              >编辑内容</Button>
              <div className="fontColorSelect"
                style={{ background: editItemData?.textFontColor }}
                onClick={() => this.initFontColorSelectModal(FontColorChangeType.Text, editItemData!.titleFontColor!)}
              ></div>
            </div>
          </Row>
          <RichTextEditor
            modalVisible={richTextEditorModalVisible}
            richTextContent={editItemData?.text as string}
            handleModalVisible={(flag) => this.handleRichTextEditorModalVisible(flag)}
            saveContent={(content) => this.changeItemText(content)}
          />
        </div>
        <FontColorSet
          modalVisible={fontColorSelectModalVisible}
          fontColor={currentFontColor}
          handleModalVisible={flag => this.handleFontColorSelectModalVisible(flag)}
          handleChangeFontColor={color => this.handleChangeFontColor(color)}
        />
      </Fragment>
    )
  }

  // 加载正在编辑条目标题背景
  renderEditItemTitleBackgroundSet(): JSX.Element {
    const { editItemData } = this.state
    switch (editItemData?.background?.bgType) {
      case BackgroundSetType.PureColor:
        return <SketchPicker
          color={editItemData?.background?.bgColor}
          onChange={color => this.changeTitleBackgroundColor(color.hex)}
        />
      case BackgroundSetType.BackgroundImage:
      default:
        return <Fragment></Fragment>
    }
  }

  // 更改标题文本
  changeItemTitle(title: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    updateIconTitleTextItemTitle(title, editItemData!.sort, (data.tempData as IPictureTextModel).titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 处理富文本编辑弹窗显示隐藏
  handleRichTextEditorModalVisible(richTextEditorModalVisible: boolean) {
    this.setState({ richTextEditorModalVisible })
  }

  // 更改文字内容文本
  changeItemText(text: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    updateIconTitleTextItemText(text, editItemData!.sort, (data.tempData as IPictureTextModel).titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleRichTextEditorModalVisible(false)
  }

  // 更改图文间距
  changePictureTextSpacing(spacing: number) {
    if (!Number(spacing)) return
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData as IPictureTextModel
    tempData.spacingPercent = spacing
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 关闭侧滑栏编辑窗
  closeEditorSlider() {
    const { changeEditorSlideShow } = this.props
    changeEditorSlideShow!(false)
  }

  // 切换页面tab
  changeTabTypeIndex(tabTypeIndex: number) {
    this.setState({
      tabTypeIndex
    })
    if (tabTypeIndex === 0) {
      this.setState({ tabTitle: '图文模板编辑' })
    }
  }

  // 进入条目编辑详情页
  initEditDetails(itemData: ITitleTextModel) {
    this.setState({
      tabTypeIndex: 1,
      tabTitle: '修改详情页',
      editItemData: itemData
    })
  }

  // 删除条目
  deleteTxtListItem(itemSort: number) {
    const { data, allTempData, changeTempData } = this.props
    const tempData = data.tempData as IPictureTextModel
    if (tempData.titleTextList.length === 1) return message.warning('最后一条请勿删除')
    tempData.titleTextList = deleteIconTitleTextItem(itemSort, tempData.titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 切换条目显示隐藏
  checkedTxtListItem(checked: boolean, itemSort: number) {
    const { data, allTempData, changeTempData } = this.props
    updateIconTitleTextItemShow(checked, itemSort, (data.tempData as IPictureTextModel).titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改条目排序
  changeTxtListItemSort(dragItemStartIndex: number, dragItemEndIndex: number) {
    const { data, allTempData, changeTempData } = this.props
    swapArray((data.tempData as IPictureTextModel).titleTextList, dragItemStartIndex, dragItemEndIndex)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 加载颜色选择弹窗
  initFontColorSelectModal(fontColorChangeType: FontColorChangeType, currentFontColor: string) {
    this.setState({
      currentFontColor,
      fontColorChangeType
    })
    this.handleFontColorSelectModalVisible(true)
  }

  // 处理颜色选择弹窗显示隐藏
  handleFontColorSelectModalVisible(fontColorSelectModalVisible: boolean) {
    this.setState({ fontColorSelectModalVisible })
  }

  // 更改字体颜色
  handleChangeFontColor(color: string) {
    const { data, allTempData, changeTempData } = this.props
    const { fontColorChangeType, editItemData } = this.state
    if (!fontColorChangeType) return

    switch (fontColorChangeType) {
      case FontColorChangeType.Titile:
        updateIconTitleTextItemTitleFontColor(color, editItemData!.sort, (data.tempData as IPictureTextModel).titleTextList)
        break
      case FontColorChangeType.Text:
        updateIconTitleTextItemTextFontColor(color, editItemData!.sort, (data.tempData as IPictureTextModel).titleTextList)
        break
      default:
        break
    }
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
    this.handleFontColorSelectModalVisible(false)
  }

  // 更改标题背景类型
  changeTitleBgType(titleBgType: BackgroundSetType) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    updateIconTitleTextItemTitleBgType(titleBgType, editItemData!.sort, (data.tempData as IPictureTextModel).titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 更改标题背景色
  changeTitleBackgroundColor(color: string) {
    const { data, allTempData, changeTempData } = this.props
    const { editItemData } = this.state
    updateIconTitleTextItemTitleBgColor(color, editItemData!.sort, (data.tempData as IPictureTextModel).titleTextList)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }

  // 添加条目
  addTemplateItem() {
    const { data, allTempData, changeTempData } = this.props
    const { titleTextList } = (data.tempData as IPictureTextModel)
    const copyItem = deepClone(titleTextList[0]) as ITitleTextModel
    copyItem.sort = titleTextList.length + 1
    titleTextList.push(copyItem)
    updateCurrentTempData(data, allTempData!)
    changeTempData!(allTempData!)
  }
}

const mapStateToProps = (state: IPageState, ownProps: IEditorPictureTextProps) => ({
  allTempData: state.editorContainerReducer.allTempData,
})

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  changeTempData(allTempData: ITemplateModel[]) {
    dispatch(changeTempData(allTempData))
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(EditorPictureText)