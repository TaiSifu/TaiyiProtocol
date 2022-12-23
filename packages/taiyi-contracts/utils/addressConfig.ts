
export function getAddressBookShareFilePath(type: string) {
    return `${process.cwd()}/addresses/${type}.json`;
}

export function getConstructorArgumentsBookShareFilePath(type: string) {
    return `${process.cwd()}/addresses/${type}_const_args.json`;
}
