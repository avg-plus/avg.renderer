export class i18n {
  public static lang = {
    INPUT_OK_BUTTON_TEXT: "确认",
    INPUT_CANCEL_BUTTON_TEXT: "取消",


    ERROR_HANDLER_ERROR: "ERROR",
    ERROR_HANDLER_ADDITION_INFOS: "附加信息",

    SCRIPTING_TRANSPILER_EXCEPTION: "脚本解释器错误",
    SCRIPTING_AVS_RUNTIME_EXCEPTION: "脚本运行时错误",
    SCRIPTING_API_IVALID_ARGUMENTS: "非法 API 参数",
  };

  public static load(lang) {
    this.lang = lang;
  }

  public static get(key: string) {
    return this.lang[key];
  }
}
