import { Message, MessageBox } from "element-ui";

function handleError(data) {
  Message({
    // 格式待定
    message: data.errMsg,
    type: "warning",
    duration: 10000,
    showClose: true
  });
}

function handleException({ status, message, stack }) {
  MessageBox({
    title: message || "系统提示",
    message: `<div style='max-height: 250px; overflow: auto;'>${stack}</div>`,
    type: "error",
    showClose: true,
    dangerouslyUseHTMLString: true,
    callback(action, instance) {}
  });
}

function netErrorTips(time) {
  Message({
    message: "您的网络异常，请检查网络后重试!",
    type: "warning",
    duration: time,
    showClose: true,
  })
  setTimeout(Message.closeAll,time)
}

// 全局错误处理
export default {
  options: {
    errorHandle401: false,
    // 全局错误处理器
    errorHandle(error, opts) {
      if (error.response == null) {
        handleException({
          status: 500,
          message: error.message,
          stack: error.stack
        });
      } else if (error.response.status === 401) {
        if (
          window.parent &&
          window.parent !== window &&
          window.parent.postMessage
        ) {
          window.parent.postMessage(
            JSON.stringify({
              name: "error-401",
              data: error
            }),
            "*"
          );
        } else if (typeof opts.errorHandle401 === "function") {
          opts.errorHandle401(error);
        } else {
          handleException({
            status: error.response.status,
            message: error.message,
            stack: error.stack
          });
        }
      } else if (
        error.response.data == null ||
        typeof error.response.data !== "object"
      ) {
        handleException({
          status: error.response.status,
          message: error.message,
          stack: error.stack
        });
      } else if (error.config.handleError !== false) {
        handleError(error.response.data);
      }
    }
  },
  install(requestInterceptor, responseInterceptor, opts = {}) {
    opts = Object.assign({}, this.options, opts);
    responseInterceptor.use(
      response => response,
      error => {
        if (error.config && error.config.errorHandle !== false) {
          if (!error.response) {
            netErrorTips(this.opts.netErrorColseTime||3000)
          } else {
            opts.errorHandle(error, opts);
          }
        }
        return Promise.reject(error);
      }
    );
  }
};
