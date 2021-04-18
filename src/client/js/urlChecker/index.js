function checkForUrl(inputUrl) {
    const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)
    
    if (inputUrl.match(regex)) {
        return true
    }
    else {
        return false
    }
}

export { checkForUrl }
