import { Component, useState, useRef, useImperativeHandle, useCallback, useContext, useReducer, Dispatch, useLayoutEffect } from "react";
import React from "react";
import { createContext } from 'react';
import useMemo from 'react';


class SSS extends Component {
  count = 1;
  constructor(props: any) {

    super(props);
    console.log(123123)
    this.count = 0;
    // this.changeData = this.changeData.bind(this)
  }

  changeData = (e: any) => {
    console.log(e.target.value)
    this.count = e.target.value;
    this.setState({})
  }

  render() {
    return (

      <input value={this.count} onChange={this.changeData} />
    )
  }
}

const FancyInput = React.forwardRef((props, ref) => {
  const [fresh, setFresh] = useState(false)
  const attRef = useRef(0);
  useImperativeHandle(ref, () => ({
    attRef,
    fresh
  }), [fresh]);

  const handleClick = useCallback(() => {
    attRef.current++;
  }, []);

  return (
    <div>
      {attRef.current}
      <button onClick={handleClick}>Fancy</button>
      <button onClick={() => setFresh(!fresh)}>刷新</button>
    </div>
  )
});

interface ss {
  "a": string,
  dispatch?: Dispatch<any>;
}

interface f {
  "cn": ss;
  "en": ss;
}

export const l: f = {
  "cn": { "a": "中文" },
  "en": { "a": "en" }
}

function reducer(state: ss, action: any) {

  switch (action) {
    case 'cn':
      return { ...state, ...l.cn }
    case 'en':

      return { ...state, ...l.en }
      let g: ss = { dispatch: state.dispatch, a: l.en.a };
      // g.dispatch = state.dispatch;
      // g.a = l.en.a;
      return g
    default:
      return { ...state, ...l.cn }
  }
}


export let c = createContext(l.cn);

function Pr(props: any) {
  const [state, dispatch] = useReducer(reducer, props.locale == "cn" ? l.cn : l.en);

  const [st, setst] = useState(() => {
    return 11
  });




  const ssf: ss = { ...state, dispatch }

  return (
    <c.Provider value={ssf}>
      {props.children}
    </c.Provider>
  )
}

export const Prs = Pr;





export default FancyInput;