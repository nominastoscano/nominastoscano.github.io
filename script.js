function send() {

    let DNI = document.getElementById('DNI').value;

    DNI = DNI.replace(/\D/g,'');

    const url_string = location.href;
    const url = new URL(url_string);
    const key = url.searchParams.get("key");
    const mail = url.searchParams.get("mail");

    const keyUser = {
        key: key,
        DNI: DNI,
        mail: mail
    }

    doLogin(keyUser)

}

function serverSideUrl() {
    return 'https://script.google.com/macros/s/AKfycbwLy72sDsxcJySPvSFuoXLM_nX3DHKiEYtq3ES5ARvgnt8LZeMiW8dLCK9hXm5Tyvrj/exec';
}

function doLogin(keyUser) {

    console.log(keyUser);

    const key = `key=${keyUser.key}`;
    const DNI = `DNI=${keyUser.DNI}`;
    const mail = `mail=${keyUser.mail}`;
    const params = `?${key}&${DNI}&${mail}`;

    let url = serverSideUrl();
    url += params;
    console.log(url);

    fetch(url)
        .then(nominaURL => nominaURL.json())
        .then(nominaURL => {
            
            openNomina(nominaURL);
        })
        // .catch(window.alert('CONTRASEÑA INCORRECTA'))

}

function openNomina(nominaURL) {
    console.log(nominaURL);

    // window.location.replace(nominaURL);
    // window.location.href = nominaURL;
    window.open(nominaURL ,"_self");
}