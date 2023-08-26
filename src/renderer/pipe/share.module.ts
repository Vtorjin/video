// shared-pipes.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatPipe } from './format.pipe';
import { FileSizePipe } from './fileSize.pipe';


@NgModule({
    declarations: [FormatPipe, FileSizePipe],
    exports: [FormatPipe, FileSizePipe] // 导出管道以供其他模块使用
})
export class SharedPipesModule { }
