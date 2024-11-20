import type { IApi } from 'umi';
import { mkdirSync, readdirSync, renameSync } from 'fs';
import { join } from 'path';

export default (compiler: IApi) => {
    // 监听事件
    compiler.onDevCompileDone(() => {
        if(compiler.config.publicPath !== '/') {
            // 创建文件夹
            mkdirSync(join(compiler.paths.absOutputPath, compiler.config.publicPath), {
                recursive: true,
            });
            // 复制文件
            readdirSync(compiler.paths.absOutputPath, { withFileTypes: true }).forEach(
                (file) => {
                    if (file.isFile()) {
                        renameSync(
                            join(compiler.paths.absOutputPath, file.name),
                            join(
                                compiler.paths.absOutputPath,
                                compiler.config.publicPath,
                                file.name,
                            ),
                        );
                    }
                },
            );
        }
    });
};
