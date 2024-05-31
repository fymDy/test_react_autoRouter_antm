/*
 * @Author: Mark
 * @Date: 2024-05-30 16:16:03
 * @LastEditTime: 2024-05-30 16:43:36
 * @LastEditors: MarkMark
 * @Description: 佛祖保佑无bug
 * @FilePath: /mobile/test-react-app-antm/src/typings/index.d.ts
 */

declare const require: NodeRequire;
  
interface NodeRequire {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ): {
    (key: string): any;
    keys(): string[];
  };
}
