
export function getAddressBookShareFilePath(type: string) {
    return `${process.cwd()}/addresses/${type}.json`;
}
