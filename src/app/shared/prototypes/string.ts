interface String {
    format(...args): string;
}

String.prototype.format = function(): string {
    const args = arguments;
    let i = 0;
    return this.replace(/{}/g, function(): string {
        return typeof args[i] !== 'undefined' ? args[i++] : '';
    });
};
