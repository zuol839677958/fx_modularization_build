import * as EditorState from './editor.state'
import * as AddTemplateState from './addTemplate.state'
import * as EditorMobileState from './editor.mobile.state'
import * as EditorSliderState from './editor.slider.state'
import * as BackgroundSetState from './backgroundSet.state'
import * as BaseState from './base.state'
export default {
  ...BaseState
}
export {
  AddTemplateState,
  EditorMobileState,
  EditorSliderState,
  BackgroundSetState,
  EditorState
}
