const makeMask = (type) => {
    let html = document.getElementsByTagName('body')[0];
    let _mask = document.createElement('DIV');
    _mask.id = 'loading-mask-fixed';
    switch (type) {
        case 'circle':
            _mask.innerHTML = `<div class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>`
            break;
        default:
            _mask.innerHTML = `<div class="progress"><div class="indeterminate"></div></div>`
            break;
    }
    html.appendChild(_mask);
}

const destroyMask = () => {

}

export default {
    makeMask,
    destroyMask
}