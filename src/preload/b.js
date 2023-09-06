var g = {
    nm: document.title,
    fr: "",
    fn: "",
    vw: document.querySelector('video')?.videoWidth || 0,
    vh: document.querySelector('video')?.videoHeight || 0,
    lo: location.origin,
    lp: location.pathname,
    ls: decodeURI(location.search),
    times: {
        s: 0,
        e: 9999,
        r: []
    }
}


