import md5 from 'md5';

const makeMd5 = (password) => {
    let ts = new Date().toLocaleDateString().replace(/\//g, '-');
    return md5(password + ts);
}

export default makeMd5;