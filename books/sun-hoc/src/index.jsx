import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './routes';
import './index.less';

class App extends React.Component {
    render() {
        return (
            <div>
                <h2>Welcome to Hangzhou!</h2>
                <Router>
                    <div>
                        <div className="menu">
                            <Link to='usual'>属性代理</Link>
                            <Link to='form'>抽离state</Link>
                            <Link to='inheritance'>反向代理</Link>
                            <Link to='container'>container</Link>
                            <Link to='hoc-usual'>跟container对比</Link>
                            <Link to='pass-state'>父子组件通信</Link>
                            <Link to='react-context'>react中的context</Link>
                            <Link to='event-emitter'>观察者模式</Link>
                        </div>
                        <Routes />
                    </div>
                </Router>
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));

