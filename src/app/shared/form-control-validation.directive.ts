import { Directive, AfterContentInit, ContentChild } from '@angular/core';
import { NgControl } from '@angular/forms';

import { FormLabelDirective } from './form-label.directive';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '.form-group'
})
export class FormControlValidationDirective {

    @ContentChild(NgControl) ngControl: NgControl;

    @ContentChild(FormLabelDirective) label: FormLabelDirective;

    ngAfterContentInit(): void {
        if (this.ngControl && this.label) {
            this.setLabelValidity();
            this.ngControl.statusChanges.subscribe(() => this.setLabelValidity());
        }
    }

    private setLabelValidity(): void {
        this.label.isInvalid = this.ngControl.invalid && this.ngControl.dirty;
    }

}
