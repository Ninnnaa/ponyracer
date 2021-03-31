import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[prHasError]'
})
export class HasErrorDirective implements OnChanges {

    @Input() prHasError: boolean|undefined|'' = undefined;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {
        this.detectError();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.detectError();
    }

    detectError(): void {
        if (this.prHasError === undefined || this.prHasError === '' || this.prHasError) {
            this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
            this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
        } else {
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        }
    }
}
