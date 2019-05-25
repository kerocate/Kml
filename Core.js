 // "use strict"; //开启严格模式
// /** @type {Document} */ 类型声明

/**
 * 
 * @param {Number} range 
 * @returns {Number}
 */
function randomInt(range) {
    return Math.floor(Math.random() * range);
}

/**
 * 
 * @param {URL} scriptsrc 
 */
function _include(scriptsrc = 'undefined') {
    let appendScript = document.createElement('script'); //创建script元素
    wanna('html').appendChild(appendScript); //新建的script元素在html内
    try { //try catch 错误处理
        appendScript.src = scriptsrc; //新script元素的src是输入的scriptsrc
        if (scriptsrc == undefined) throw 'Illegal include src!'; //抛出指定情况的错误提示
        return console.log('Include' + ': ' + scriptsrc); //打印正常导入后的信息
    } catch (err) {
        console.log(err); //catch不大会用
    }
}

/**
 * 
 * @param {String} cssSrc 
 */
function _link(cssSrc = 'undifined') {
    let appendCss = document.createElement('link');
    wanna('head').appendChild(appendCss);
    try {
        appendCss.href = cssSrc;
        appendCss.rel = "stylesheet";
        if (cssSrc == undefined) throw 'Illegal link src!';
        return console.log('Include' + ': ' + cssSrc); //打印正常导入后的信息
    } catch (err) {
        console.log(err);
    }
}

/** 
 * @param {HTMLElement} Element
 * @returns {HTMLElement}
*/
function wanna(Element) {
    return document.querySelector(Element); //返回一个以css选择器为表示的元素
}

/**
 * 
 * @param {HTMLElement} Element 
 * @returns {HTMLElement}
 */
function wannaID(Element) {
    return document.getElementById(Element);
}

/**
 * 
 * @param {HTMLCanvasElement} canvas 
 * @returns {WebGLRenderingContext}
 */
function wannaGl(canvas) {
    glTest(wanna(canvas).getContext('webgl'));                           //对webGL支持进行检测
    return wanna(canvas).getContext('webgl'); //返回一个以css选择器为表示的元素(webgl渲染上下文)
}

/**
 * 
 * @param {HTMLCanvasElement} glElement 
 */
function glTest(glElement) {
    if (!glElement) {
        alert("Unable to initialize WebGL.");
        return;
    } else {
        console.log('WebGL support!');
    }
}

// 创建着色器方法，输入参数：渲染上下文，着色器类型，数据源
//WebGLRenderingContext webGL渲染上下文（渲染内容）
/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {Number} type 
 * @param {String} source 
 */
function createShader(gl, type, source) {
    let shader = gl.createShader(type); // 创建指定类型的着色器对象
    gl.shaderSource(shader, source); // 提供数据源
    gl.compileShader(shader); // 编译 -> 生成着色器

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return console.log('createShader error!');
}

/**
 * 
 * @param {WebGLRenderingContext} gl 
 * @param {WebGLShader} vertexShader 
 * @param {WebGLShader} fragmentShader 
 */
function createProgram(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram(); //创建一个名为program的着色程序
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program); //将追加的两个shader link到一个program（着色程序）

    let success = gl.getProgramParameter(program, gl.LINK_STATUS); //获取link的状态
    if (success) {
        return program; //正常link之后提前退出函数
    }

    console.log(gl.getProgramInfoLog(program)); //打印错误
    gl.deleteProgram(program); //删除着色器程序
    return console.log('createProgram error!'); //自己加的返回log（没啥卵用）
}

function setupShaderProgram(/** @type {WebGLRenderingContext} */gl, /** @type {WebGLShader} */vertexShaderSource, /** @type {WebGLShader} */fragmentShaderSource) {
    let vertex = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    let fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    console.log('Shader program already setup!');
    return createProgram(gl, vertex, fragment);
}

function glResize(/** @type {WebGLRenderingContext} */gl) {
    // 获取浏览器中画布的显示尺寸
    var displayWidth = gl.canvas.clientWidth;
    var displayHeight = gl.canvas.clientHeight;

    // 检尺寸是否相同
    if (gl.canvas.width != displayWidth ||
        gl.canvas.height != displayHeight) {

        // 设置为相同的尺寸
        gl.canvas.width = displayWidth;
        gl.canvas.height = displayHeight;
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height); //重设视域与画布大小匹配
}

function colorAndClear(/** @type {WebGLRenderingContext} */gl, a, b, c, d,/** @type {Number} */e) {
    gl.clearColor(a, b, c, d);      //用于清空画布的颜色
    gl.clear(e);  //指定要清除的缓冲区，其值可能有：gl.COLOR_BUFFER_BIT, gl.DEPTH_BUFFER_BIT, gl.STENCIL_BUFFER_BIT
    return console.log('Colored and buffer clean!');
}

_include('./main.js'); //避免在HTML中声明main.js
_link('./base0.1.css');