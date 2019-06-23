import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'input-error-message',
    templateUrl: './input-error-message.component.html',
    styleUrls: ['./input-error-message.component.scss'],
})
export class InputErrorMessageComponent {
    @Input() private control: AbstractControl;
    @Input() private multiple = false;
    @Input() customMessage: string;

    readonly errorMessages = {
        required: () => 'Este campo es obligatorio.',
        invalidEmail: () => 'El correo electrónico es incorrecto.',
        whitespace: params => `${params}`,
        email: () => 'Ingrese un correo electrónico válido',
        phone: () => 'Número telefónico inválido.',
        amount: () => 'Solo se admiten montos con 2 decimales como máximo.',
        number: () => 'Solo se admiten números',
        letter: () => 'Solo se admiten letras',
        ruc: () => 'Número de RUC inválido',
        minlength: params => `El número mínimo de caracteres es ${params.requiredLength}.`,
        maxlength: params => `El número máximo de caracteres es ${params.requiredLength}.`,
        min: params => `El valor mínimo es ${params.min}.`,
        max: params => `El valor máximo es ${params.max}.`,
        pattern: () => `El formato ingresado es incorrecto.`,
        uniquePhone: () => 'Ya existe otro usuario con este celular, por favor use otro.',
        uniqueEmail: () => 'Ya existe otro usuario con este email, por favor use otro.',
        uniqueDNI: () => 'Ya existe otro usuario con este DNI. Si el problema persiste, ' +
            'llame a su ejecutivo de SmartBeauty para que resuelva el problema.',
        clientPhoneExist: () => 'Ya existe este celular registrado con otro usuario.',
        userFailed: () => 'Este email ya existe',
        dateMonth: () => 'Formato de dia y mes inválido',
        invalidAddress: () => 'Se debe seleccionar una opción de la lista.'
    };

    trackByFn = index => index;

    constructor() {
    }

    shouldShowErrors(): boolean {
        return this.control && this.control.errors && (this.control.dirty || this.control.touched);
    }

    listErrors(): Array<string> {
        let errors: Array<any> = [];
        if (this.control.errors) {
            errors = Object.keys(this.control.errors)
                .map(field => this.getMessage(field, this.control.errors[field]));
        }

        return errors.length ? [errors[errors.length - 1]] : [];
    }

    protected getMessage(type: string, params: any): string {
        return type in this.errorMessages ? this.errorMessages[type](params) : this.customMessage || '';
    }

}
