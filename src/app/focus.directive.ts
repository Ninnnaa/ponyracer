import { AfterViewInit, Directive, ElementRef, ViewChild } from '@angular/core';

@Directive({
    selector: '[prFocus]'
})
export class FocusDirective implements AfterViewInit {
    ngAfterViewInit(): void {
        this.element.nativeElement.focus();
    }

    constructor(private element: ElementRef<HTMLElement>) {}
}
