import React, { Component } from 'react'

export interface IMasterTemplateProps { }

export interface IMasterTemplateState { }

class MasterTemplate<P, S = {}> extends Component<P, S> {
  renderMask() {
    return <div></div>
  }
}

export default MasterTemplate