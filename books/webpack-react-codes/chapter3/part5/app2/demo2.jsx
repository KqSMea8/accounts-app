var MyForm = React.createClass({
    getInitialState: function () {
        return {username: "", gender: "man", checked: true};
    },
    handleUsernameChange: function (event) {
        this.setState({username: event.target.value});
    },
    handleGenderChange: function (event) {
        this.setState({gender: event.target.value});
    },
    handleCheckboxChange: function (event) {
        this.setState({checked: event.target.checked});
    },
    submitHandler: function () {
        event.preventDefault();
        console.log(this.state);
    },
    render: function () {
        return(
            <form onSubmit={this.submitHandler}>
                <label htmlFor="username">请输入用户名:</label>
                <input id="username" type="text" value={this.state.username} onChange={this.handleUsernameChange}/><br/>
                <select value={this.state.gender} onChange={this.handleGenderChange}>
                    <option value="man">男</option>
                    <option value="woman">女</option>
                </select><br/>
                <label htmlFor="checkbox">同意用户协议:</label>
                <input id="checkbox" type="checkbox" value="agree" checked={this.state.checked} onChange={this.handleCheckboxChange}/>
                <button type="submit">注册</button>
            </form>
        )
    }
});
React.render(<MyForm/>, document.body);