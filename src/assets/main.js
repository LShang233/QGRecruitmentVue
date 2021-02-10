import Vue from '@/main'
/*
  method : get 或者 post 方法
  url    ：上传地址
  data   ：上传的数据集合
  success：成功的回调函数
  error  ：失败的回调函数
*/
let $ajax = function ({ method = "get", url, data, success, error }) {
    //生成对象
    let xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.withCredentials = true;
    if (data) {
        let str = "";
        for (let attr in data) {
            str += attr + "=" + data[attr] + "&";
        }
        data = str.substring(0, str.length - 1);
    }

    if (method == "get" && data) {
        url += "?" + data;
    }

    //建立连接
    xhr.open(method, url, true);

    //发送请求
    if (method == "get") {
        xhr.send();
    } else {
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=utf-8");
        xhr.setRequestHeader("QGer", "I am a Qger");
        xhr.send(data);
    }

    //响应
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //回调函数
                if (success)
                    success(xhr.responseText);
            } else {
                if (error)
                    error(xhr.responseText);
            }
        }
    }
}

export {
    $ajax
} 