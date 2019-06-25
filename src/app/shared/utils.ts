import { FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';

export function slugify(text): string {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

export class FormHelper {
    static triggerErrors(form: FormGroup | Array<FormGroup>): void {
        if (form instanceof Array) {
            form.forEach(f => {
                Object.keys(f.controls).forEach(k => f.get(k).markAsTouched());
            });
        } else {
            Object.keys(form.controls).forEach(k => form.get(k).markAsTouched());
        }
    }

    static parseToFormData(obj: any): FormData {
        const formData = new FormData();
        for (const k in obj) {
            if (k) {

                if (typeof obj[k] === 'boolean') {
                    formData.append(k, `${(+obj[k])}`);
                } else if (obj[k] === 0) {
                    formData.append(k, `${(obj[k])}`);
                }
                if (obj[k] !== '' && !!obj[k]) {
                    formData.append(k, obj[k]);
                }
            }
        }

        return formData;
    }

    static disableExcept(form: FormGroup | Array<FormGroup>, controls: Array<string>): void {
        if (form instanceof Array) {
            form.forEach(f => {
                Object.keys(f.controls)
                    .filter(k => !(controls.indexOf(k) > -1))
                    .forEach(k => {
                        f.get(k).disable();
                    });
            });
        } else {
            Object.keys(form.controls)
                .filter(k => !(controls.indexOf(k) > -1))
                .forEach(k => {
                    form.get(k).disable();
                });
        }
    }

    static resetExcept(form: FormGroup | Array<FormGroup>, controls: Array<string>): void {
        if (form instanceof Array) {
            form.forEach(f => {
                Object.keys(f.controls)
                    .filter(k => !(controls.indexOf(k) > -1))
                    .forEach(k => {
                        f.get(k).reset();
                    });
            });
        } else {
            Object.keys(form.controls)
                .filter(k => !(controls.indexOf(k) > -1))
                .forEach(k => {
                    form.get(k).reset();
                });
        }
    }

    static enableExcept(form: FormGroup | Array<FormGroup>, controls: Array<string>, required?: boolean): void {
        if (form instanceof Array) {
            form.forEach(f => {
                Object.keys(f.controls)
                    .filter(k => !!!(controls.indexOf(k) > -1))
                    .forEach(k => {
                        f.get(k).enable();
                        if (required) {
                            f.get(k).setValidators(Validators.required);
                        }
                    });
            });
        } else {
            Object.keys(form.controls)
                .filter(k => !!!(controls.indexOf(k) > -1))
                .forEach(k => {
                    form.get(k).enable();
                    if (required) {
                        form.get(k).setValidators(Validators.required);
                    }
                });
        }
    }

    static disableOnly(form: FormGroup | Array<FormGroup>, controls: Array<string>, removeRequired?: boolean): void {
        if (form instanceof Array) {
            form.forEach(f => {
                Object.keys(f.controls)
                    .filter(k => controls.indexOf(k) > -1)
                    .forEach(k => {
                        // f.get(k).reset();
                        f.get(k).disable();
                        if (removeRequired) {
                            f.get(k).setValidators(null);
                        }
                    });
            });
        } else {
            Object.keys(form.controls)
                .filter(k => controls.indexOf(k) > -1)
                .forEach(k => {
                    // form.get(k).reset();
                    form.get(k).disable();
                    if (removeRequired) {
                        form.get(k).setValidators(null);
                    }
                });
        }
    }

    static enableOnly(form: FormGroup | Array<FormGroup>, controls: Array<string>, required?: boolean): void {
        if (form instanceof Array) {
            form.forEach(f => {
                Object.keys(f.controls)
                    .filter(k => controls.indexOf(k) > -1)
                    .forEach(k => {
                        f.get(k).enable();
                        if (required) {
                            f.get(k).setValidators(Validators.required);
                        }
                    });
            });
        } else {
            Object.keys(form.controls)
                .filter(k => controls.indexOf(k) > -1)
                .forEach(k => {
                    form.get(k).enable();
                });
        }
    }

    static resetOnly(form: FormGroup | Array<FormGroup>, controls: Array<string>, removeRequired?: boolean): void {
        if (form instanceof Array) {
            form.forEach(f => {
                Object.keys(f.controls)
                    .filter(k => controls.indexOf(k) > -1)
                    .forEach(k => {
                        f.get(k).reset();
                    });
            });
        } else {
            Object.keys(form.controls)
                .filter(k => controls.indexOf(k) > -1)
                .forEach(k => {
                    form.get(k).reset();
                });
        }
    }
}

export const generateMapBoxStaticImage = (longitude: number, latitude: number, zoom?: number) => {
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${zoom},0.00,0.00/300x200@2x?access_token=${environment.mapboxKey}`;
};
