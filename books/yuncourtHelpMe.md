查询 select * from lassen_legal_case where case_number in ('010304');
更新 update lassen_legal_case where case_number = '006778' set batch_number = '2017000015';

smkwap00202050

# 修改本地ip,95行末尾增加一句: -Dhsf.server.ip=30.10.6.60
```
D:\alibaba-web\lassen\deploy\tools\tomcat\bin\catalina.bat
```

# 线上转线下,将meta文件第2行:'## 线上访问的地址'去掉一个'#'
```
D:\alibaba-web\lassen\deploy\templates\common\templates\control\meta.vm
```
图片若是引用线上地址,需找到screen引入的页面,将
```
##<link rel="stylesheet" type="text/css" href="$assets.render()/assets/css/helpCenter.css" />
```
改成
```
<link rel="stylesheet" type="text/css" href="http://127.0.0.1:8001/src/assets/css/helpCenter.css"/>
```

##修改tomcat内存大小,最外层的catalina.bat文件
```
set JAVA_OPTS=-server -Xms1024m -Xmx1024m -Xss8m -XX:PermSize=128M -XX:MaxPermSize=256M -Djavax.net.ssl.trustStore=%cd%\..\..\..\conf\ssl\keystore
```

# 修改本地文本路径:注意将\换成/(D:\alibaba-web\lassen)
```
D:\alibaba-web\lassen\antx_win.properties
```

# 线上样式出错的话,需要修改antx_win.properties的render配置:
```
render:https://g-assets.daily.taobao.net/platform/legal_online_court/1.2.76
```

# 从网上下载的builder-alinw是存在问题的,需要手动替换sea.js文件
```
        '!'+sourcePath+"/assets/**/*.js",
        '!'+sourcePath+"/hephaistos/**/*.js",
        // sourcePath + "/**/*.jsx", 把这个暂时限制掉
```

# render线上地址需要自己手动更换
```
antx_win.properties第239行将版本号修改为当前的版本号
```

# 若测试环境登录失败,尝试登录以下链接
```
https://login-openaccount.daily.taobao.net/login/logout.htm?appKey=4272&redirectUrl=https://sven.alibaba.net/portal/main/domain/index.htm
```

# 合并组干
```
git fetch --all
git reset --hard origin/master
```

# mock也无法登入
```
需要修改
D:\alibaba-web\20170518_859341_offlinepay_1\commonservice\src\main\resources\META-INF\autoconf下的component-lava.xml.vm文件,在54行加一句
<value><![CDATA[^/login/mock.json[p]?$]]></value>
```


持久使用淘宝npm镜像
npm config set registry https://registry.npm.taobao.org

通过cnpm使用
npm install -g cnpm --registry=https://registry.npm.taobao.org

华理学生平台 账号：26182994

重装系统之后，

JAVA jdk 1.8.152
环境变量路径要设置
系统变量：
JAVA_HOME	C:\Program Files\Java\jdk1.8.0_152

CLASSPATH	%JAVA_HOME%\bin\dt.jar;%JAVA_HOME%\jre\bin\tools.jar

MAVEN_HOME	D:\apache-maven-3.0.5

Path 	%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;%MAVEN_HOME%\bin;

还要修改一下maven的setting文件

还要设置	git config user.name --global
			git config user.email --global

git 报警告:
warning: LF will be replaced by CRLF in file
The file will have its original line endings in your working directory.

Linux平台下的换行符是 LF，而Windows下则是 CRLF，所以当你再 Windows 保存文件时候，换行符会被保存为 CRLF
建议：统一换行符为 LF.Git 命令行输入如下命令，禁止自动转换换行符
```
git config --global core.autocrlf false
```
transition过度动画
```
.page-gongdao-head-fixed{
	transition:all .2s ease-out 0s;
	position: fixed;
	background-color: #006bad;
	opacity: 1;
	top: -66px;
	.gongdao-head-container{
		.gongdao-head-logo{
			background: url('../../../../imgs/gongdao/main.png') no-repeat 0 0;
		}
	}

}
.page-gongdao-head-show{
	top: 0;
}
```

# 如果你想忽略.idea/workspace.xml
```
一般在.gitignore文件里面加入
.idea/workspace.xml 即可
```

但是如果你这样做之前已经将此文件提交到了git远程仓库，那就需要执行以下命令了：
```
git rm -r --cached .idea/workspace.xml
git rm -r --cached .idea/
```

配置git的最低速度和最低速度时间：
```
git config --global http.lowSpeedLimit 0

git config --global http.lowSpeedTime 999999         单位 秒
```
--global配置对当前用户生效，如果需要对所有用户生效，则用--system

# 卸载已安装到全局的 node/npm
1. npm ls -g --depth=0 #查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装
2. sudo rm -rf /usr/local/lib/node_modules #删除全局 node_modules 目录
3. sudo rm /usr/local/bin/node #删除 node
4. cd /usr/local/bin && ls -l | grep "../lib/node_modules/" | awk '{print $9}'| xargs rm #删除全局 node 模块注册的软链


# 字符串模板中不能使用逻辑与判空，否则会返回undefined

# 那个编译之前 在项目的  deploy\framework\tools\tomcat\bin  下的catalina.bat (mac catalina.sh) 中新增下启动参数：
或者这个文件\deploy\target\web-deploy\bin\catalina.bat
```
-Dunit.routerule.group=UNITBRAIN_BAK_GROUP 
```

#修改vm不生效替换以下文件内容12行
- F:\alibaba-web\20180604_2341271_hzems_1\bundle\src\main\webapp\META-INF\autoconf\resources.xml.vm
```
<resource-alias pattern="/templates" name="/webroot/templates" />
<resource pattern="/templates">
	<res-loaders:file-loader basedir="${app.template.root}"/>
</resource>
改成
#if($curDevMode == "server")
	<resource-alias pattern="/templates" name="/webroot/templates" />
#end
#if($curDevMode == "dev")
	<resource pattern="/templates">
		<res-loaders:file-loader basedir="${app.template.root}"/>
	</resource>
#end
```

#Auto packing the repository in background for optimum performance.
```
查资料，原来是自己本地一些 “悬空对象”太多(git删除分支或者清空stash的时候，这些其实还没有真正删除，成为悬空对象，我们可以使用merge命令可以从中恢复一些文件)

解决： 
1.输入命令：git fsck --lost-found，可以看到好多“dangling commit” 
2.清空他们：git gc --prune=now，完成
```


# 四种this的类型：
- 默认绑定
- 隐式绑定
- 显示绑定
- new绑定
其中，默认绑定就是什么都匹配不到的情况下，非严格模式this绑定到全局对象window或者global,严格模式绑定到undefined;隐式绑定就是函数作为对象的属性，通过对象属性的方式调用，这个时候this绑定到对象;显示绑定就是通过apply和call调用的方式;new绑定就是通过new操作符时将this绑定到当前新创建的对象中，它们的匹配有限是是从小到大的。

# viva内存溢出
node_modules/.bin/webpack.cmd
--max_old_space_size=8192

# js优化技巧
- if弹框确认框后续语句提前return，避免后续执行
- JSON.parse异常处理
- 三目运算改成与运算
- 简单循环使用for语法片段，而不是优先用forEach（堆栈内存）
- 参数传递，需减少潜在的闭包调用，可先进行缓存，或类似状态管理方式
- 对下标的方法引用需要先判断是否存在

# Medium Start
104.16.120.127  medium.com
104.16.120.145  api.medium.com
104.16.120.145  cdn-static-1.medium.com
104.16.120.145  cdn-images-1.medium.com
104.16.120.145  cdn-images-2.medium.com
# Medium End
```
刷新DNS解析缓存
ipconfig /flushdns
```

# 新建分支必须要从master上面切

# react声明周期：
								start
								getDefaultProps
								getInitialState
								componentWillMount
								render
								componentDidMount

								running

	props changed				state changed					unmount
componentWillReceiveProps 	shouldComponentUpdate false		componentWillMount
								true							end
								componentWillUpdate
								render
								ComponentDidUpdate

# for究极循环优化
```
console.time('three');
for (let i = 0, item; item = arr[i++];) {
    // item
}
console.timeEnd('three');
```

# 箭头函数带来方便的同事，以下这些地方不能使用箭头函数
- 在对象上定义函数
- 定义原型方法
- 定义事件回调函数
- 定义构造函数

# JavaScript 函数表达式
在使用函数表达式的时候可能会碰到*函数提升*的过程
```
console.log(add(1,2));   //"3"
console.log(sub(5,3));   //"unexpected identifier"，报错
function add(a1,a2){
    return a1+a2;
}
var sub = function(a1,a2){
    return a1-a2;
}
```

```
var sub = function f(a1,a2){
    console.log(typeof f);  //"function"
    return a1-a2;
}
console.log(typeof f);   //"Uncaught ReferenceError: f is not defined(…)"
```
通过上面的例子可以看到，函数名称f只能在函数对象内部使用，函数表达式的函数名称并不存在于变量对象中。

# 使用场景
- *函数递归*
```
function factorial(num){
    if(num <= 1){
         return 1; 
    }else{
         return num * factorial(num - 1);
    }
}
```
这是一个经典的阶乘函数，但是这个例子存在的一个问题是函数名称factorial与函数体紧密耦合在一起，执行下面的语句就会报错：
```
var anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(5));   //"Uncaught TypeError: factorial is not a function"
```
报错的原因在于在函数体*内部会调用factorial函数，而变量factorial对函数的引用已经被解除*所以报错。这种情况的解决方法一般可以使用arguments.callee来解决，arguments.callee始终指向当前的函数，例如：
```
function factorial(num){
    if(num <= 1){
         return 1; 
    }else{
         return num * arguments.callee(num - 1);
    }
}
```
这样在此执行anotherFactorial函数就可以得到正确结果了。但是在严格模式"strict"下，arguments.callee是不能通过脚本访问的，这是就可以使用函数表达式来解决这个问题了，例如：
```
var factorial = (function f(num){
    if(num <= 1){
         return 1; 
    }else{
         return num * f(num - 1);
    }
});
console.log(factorial(5));   //"120"
```
- *代码模块化*
JavaScript中没有块级作用域，但我们可以使用函数表达式模块化JavaScript代码。模块化代码中可以封装不必让使用者知道的细节，只暴露给使用者相关接口，同时可以避免对全局环境的污染，例如：
```
var person = (function(){
    var _name = "";
    return{
        getName:function(){
             return _name;
        },
        setName:function(newname){
             _name = newname;
        }
    };
}());
person.setName("John");
person.getName();   //"John"
```
这个例子中创建了一个匿名函数表达式，这个函数表达式中包含了模块自身的私有变量和函数；这个函数表达式的执行结果返回一个对象，对象中包含了模块暴露给使用者的公共接口。代码模块化的具体形式还有很多，例如在一些常用的JavaScript库中通常都会使用类似下面例子的立即执行函数：
```
(function(){
    var _name = "";
    var root = this;
    var person = {
        getName: function(){
            return _name;
        },
        setName: function(newname){
            _name = newname;
        }
    };
    root.person = person;
}.call(this));
person.setName("John");
person.getName();   //"John"
```
这种方式直接将包含模块公共接口的对象作为全局对象的一个属性，这样在其它地方直接可以使用全局对象的这个属性来使用这个模块了。

# CORS
```
//必须的，表示接受任意域名的请求
res.header("Access-Control-Allow-Origin", "*");
//必须的，允许请求跨域的http方法
res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
res.header("Content-Type", "application/json;charset=utf-8");
```

# 提示Enter passphrase for key '/Users/MYNAME/.ssh/id_rsa':
```
ssh-add ~/.ssh/id_rsa 
```

# 安装 Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# 卸载
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"