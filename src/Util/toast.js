const mainToast = (status, options, callback) => {
    const {
        content,
        duration = 500
    } = options;

    M.toast({
        html: content,
        inDuration: 150,
        outDuration: 300,
        displayLength: duration,
        classes: `${status}`,
        completeCallback: callback
    })
}

export default {
    success: (options, callback) => { mainToast('success', options, callback) },
    warning: (options, callback) => { mainToast('warning', options, callback) },
    error: (options, callback) => { mainToast('error', options, callback) },
    primary: (options, callback) => { mainToast('primary', options, callback) }
};