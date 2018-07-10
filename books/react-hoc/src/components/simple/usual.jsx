import React, { Component } from 'react';
import simpleHoc from './simple-hoc';
import propsProxyHoc from './props-proxy-hoc';
import refHoc from './ref-hoc';
import { compose } from '../../utils';

// 注意我这里写的顺序。
//@simpleHoc
//@propsProxyHoc
@refHoc
export default class Usual extends Component {

    constructor() {
        super();
        this.state = {
            usual: 'usual',
        }
    }

    componentDidMount() {
        console.log('didMount')
    }

    render() {
        console.log(this.props, this.state, 'props');
        let { handleClick } = this.props;
        return (
            <div onClick={handleClick}>
                Usual
      </div>
        )
    }
}

// export default compose(simpleHoc, propsProxyHoc, refHoc)(Usual);