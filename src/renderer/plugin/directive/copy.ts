import { HostListener, ElementRef, Renderer2, HostBinding, Directive, Input } from '@angular/core';

@Directive({
    selector: "[copyText]"
})
export class CopyTextDirective {
    // @Input('copyText')

    constructor(private el: ElementRef, private render: Renderer2) {
        console.log(this.el,'自定义指令')
    }

    @HostListener('click')
    writeCopy() {
       navigator.clipboard.writeText(this.el.nativeElement.title).then(()=>{
        this.el.nativeElement.style.backgroundColor = window.randomColor();
       })
    }
}
