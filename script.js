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
    return 'https://script.google.com/macros/s/AKfycbz3Lv4_fYbnIDiwmfjDGTNegTUJkZYYokUo0pD0YcvSH4tOtzaT4EsUzY_CIzHZBs82/exec';
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

    // GENERAR BOTÓN PARA DESCARGAR LA NÓMINA

    console.log(nominaURL);

    // window.location.replace(nominaURL);
    // window.location.href = nominaURL;
    window.open(nominaURL ,"_self");
}

// AL PULSAR EN EL BOTÓN DE DESCARGAR NÓMINA PODRÍA ABRIRSE UN IFRAME CON UNA FUNCIÓN ASYNC QUE MUESTRE EL IFRAME Y PUEDE QUE UNA CUENTA ATRÁS PARA DESCARGAR EL PDF. SI SE PASA LA CUENTA, EL IFRAME SE CIERRA Y SE MANDA UN FETCH CON EL key VUELVA A REVOCAR EL ACCESO DE LA NÓMINA A PRIVADO. VOLVERÍA A APARECER EL INPUT PARA INTRODUCIR EL DNI