
function getContractAddressBookByType(type: string) {
    if(type == "pixie")
        return "pixie";
    else if(type == "pixie_test")
        return "pixie_test";
    else if(type == "polygon_test")
        return "polygon_test";    
    else if(type == "heco")
        return "heco";
    else if(type == "bsc")
        return "bsc";
    else if(type == "hard")
        return "hard";
    else
        return "hard";
}

export function getAddressBookShareFilePath(type: string) {
    return `${process.cwd()}/addresses/${getContractAddressBookByType(getContractAddressBookByType(type))}.json`;
}
