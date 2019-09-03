import { AVGEngineError } from "../core/engine-errors";
// import * as fs from "fs";
import * as esprima from "esprima";
import * as escodegen from "escodegen";
import { i18n } from "engine/core/i18n";
import { APIManager } from "./api-manager";
import { AwaitExpression, CallExpression } from "estree";
import * as recast from "recast";

export enum TranspilerError {
  None
}

export class Transpiler {
  private static _file: string = "";
  static Error = {
    UnexpectedReservedKeyword: "UnexpectedReservedKeywordError: "
  };

  public static async transpile(file: string) {
    this._file = file;
    const raw = await this._read(file);
    if (raw) {
      let compiled = this._preprocesser(raw);
    }
  }

  public static transpileFromCode(code: string, fromFile?: string): string {
    return this._preprocesser(code);
  }

  private static _preprocesser(code: string) {
    // if (code.indexOf("await ") >= 0) {
    //   throw Transpiler.Error.UnexpectedReservedKeyword + "await";
    // }

    // if (code.indexOf("async ") >= 0) {
    //   throw Transpiler.Error.UnexpectedReservedKeyword + "async";
    // }

    return this._transpile(code);
  }

  private static _transpile(code: string) {
    if (!code) {
      return "";
    }

    let generated = code;
    let loc_pos: number[] = [];

    try {
      const isAPICall = node => {
        const callee = node.callee;
        const calleeObj = (<any>callee).object;

        let isRegisteredCallee = false;
        let isAsyncAPICall = false;

        var BreakException = {};

        try {
          APIManager.Instance.registeredClasses().forEach((value, key) => {
            if (key === calleeObj.name) {
              isRegisteredCallee = true;

              throw BreakException;
            }
          });
        } catch (error) {}

        // TODO: Deprecate
        // if (calleeObj && calleeObj.name === "api") {
        //   isRegisteredCallee = true;
        // }

        if (isRegisteredCallee) {
          return (
            calleeObj &&
            node.type === "CallExpression" &&
            calleeObj.name &&
            isRegisteredCallee
          );
        }

        return false;
      };

      // Fix esprima bug that leads to an error with wrong character index
      // I dont know why this issue will appear
      // code = "if(1) {" + code + "\n}";

      // 'async' keyword transform
      console.time("Compile Script Elapsed");
      console.log("Starting async keyword transform AST generate ...");
      let asyncTransformAST = esprima.parse(
        code,
        { range: false, attachComment: false },
        (node, meta) => {
          if (node.type === "ArrowFunctionExpression") {
            // 默认把所有 API 调用全部设为 async
            node.async = true;
          }

          if (node && node.type === "CallExpression") {
            const callee = node.callee;
            if (callee) {
              const property = callee["property"];

              // 处理异步版本的 API 调用
              const asyncSymbol = "_async";
              if (property && property.name.endsWith(asyncSymbol)) {
                property.name = property.name.replace(asyncSymbol, "");

                node.arguments.push({
                  value: "__async_call__",
                  type: "Literal"
                });
              }
            }
          }
        }
      );

      console.log("Regenerating async keyword transform code ...");
      let asyncTransformCode = escodegen.generate(asyncTransformAST, {
        // comment: false,
        format: {
          compact: false,
          quotes: "double",
          newline: "\n",
          semicolons: true,
          space: "",
          preserveBlankLines: false,
          safeConcatenation: true,
          indent: {
            style: "                     " // Dont remove this, it fix something strange
          }
        }
      });

      // 递归查找CallExpression
      const searchCallExpression = node => {
        if (
          (node.type === "CallExpression" &&
            node.callee.constructor.name === "StaticMemberExpression") ||
          node.type === "AwaitExpression"
        ) {
          // 调用表达式
          // const callExpr = node.callee;
          const newNode: CallExpression = { ...(<CallExpression>node.callee) };

          // 构造 await 表达式
          let awaitExpr: AwaitExpression = {
            type: "AwaitExpression",
            argument: newNode
          };

          // node = awaitExpr;
          // 插入到 arguments
          // node.arguments.push(awaitExpr);

          // node = awaitExpr;

          // console.log("await transpile: ", JSON.stringify(node));
          console.log("await transpile: ", node);
        }

        if (node.type === "CallExpression" && isAPICall(node) && node.callee) {
          // 获取API调用
          if (node.callee && node.callee.object) {
            // const pos = node.callee.object.range[0];

            // loc_pos.push(pos);

            // 遍历参数
            if (node.arguments) {
              const functionArguments = node.arguments;
              functionArguments.map(argNode => {
                searchCallExpression(argNode);
              });
            }
          }

          // 创建一个 await 表达式
          // const newNode: CallExpression = { ...(<CallExpression>node) };
          // let awaitExpr: AwaitExpression = {
          //   type: "AwaitExpression",
          //   argument: newNode
          // };

          // node = { ...awaitExpr };
        }
      };

      // Add 'await' keyword before every api calls
      let program = esprima.parse(
        asyncTransformCode,
        {
          range: false,
          attachComment: false
        },
        (node, meta) => {}
      );

      // 搜索树
      console.log(program.body);


      // Let's turn this function declaration into a variable declaration.
      const scode = [
        "function add(a, b) {",
        "  return a +",
        "    // Weird formatting, huh?",
        "    b;",
        "}"
      ].join("\n");
      
      // Parse the code using an interface similar to require("esprima").parse.
      const ast = recast.parse(scode);
      console.log("ast", ast);
      

      // program.body.forEach(n => {
      //   searchCallExpression(n);
      // });

      const keyword = "await ";
      for (let pos of loc_pos.reverse()) {
        if (pos > 0) {
          const a_part = asyncTransformCode.slice(0, pos);
          const b_part = asyncTransformCode.slice(pos);

          asyncTransformCode = [a_part, keyword, b_part].join("");

          console.log("keyword", a_part, keyword, b_part);
        } else {
          asyncTransformCode = [keyword, asyncTransformCode].join("");
        }
      }

      // let cur = 0;
      // for (let pos of loc_pos) {
      //   if (pos > 0) {
      //     const a_part = asyncTransformCode.slice(0, pos);
      //     const b_part = asyncTransformCode.slice(pos);

      //     cur += pos;
      //     asyncTransformCode = [a_part, keyword, b_part].join("");

      //     console.log("keyword", a_part, keyword, b_part);
      //   } else {
      //     asyncTransformCode = [keyword, asyncTransformCode].join("");
      //   }
      // }

      console.log("generted", escodegen.generate(program));

      console.timeEnd("Compile Script Elapsed");

      generated = `
        +(async() => {
          try { 
            ${asyncTransformCode}
            
            window.done();
          } catch (err) {
            console.log(err);
            window.AVGEngineError.emit("${i18n.lang.SCRIPTING_AVS_RUNTIME_EXCEPTION}", err, {
              file: "${this._file}"
            });
          }
        })();`;

      console.log(generated);

      return generated;
    } catch (err) {
      AVGEngineError.emit(
        i18n.lang.SCRIPTING_TRANSPILER_EXCEPTION,
        err.description,
        {
          code: generated,
          index: err.index,
          lineNumber: err.lineNumber
        }
      );
    }
  }

  private static async _read(file: string): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      //   let data = AVGNativeFS.readFileSync(file, { encoding: "utf8" });
      //   resolve(data);
      //   fs.readFile(file, "utf8", (err, data) => {
      //     if (err) reject(err);
      //     resolve(data);
      //   });
    });
  }

  private static async _write(file: string, data: string) {
    return await new Promise((resolve, reject) => {
      //   fs.writeFile(file, data, err => {
      //     if (err) reject(err);
      //     resolve();
      //   });
    });
  }

  private static _compile_error() {}
}
