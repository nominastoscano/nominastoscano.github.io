function send() {

    let DNI = document.getElementById('DNI').value;

    DNI = DNI.replace(/\D/g, '');

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
    return 'https://script.google.com/macros/s/AKfycbypQsps0F1E5dM-ff2cjao0ScSOX3qlP_eJIQX6qAQ-KuPSnlKgfJ7AmQF_cG1-NQwm/exec';
}

function doLogin(keyUser) {

    console.log(keyUser);

    const key = `key=${keyUser.key}`;
    const DNI = `DNI=${keyUser.DNI}`;
    const mail = `mail=${keyUser.mail}`;
    let params = `?${key}&${DNI}`;

    let url = serverSideUrl();
    url += params;
    console.log(url);

    addLoader();

    fetch(url)
        .then(fileID => fileID.json())
        .then(fileID => {

            manageFileId(fileID);
            hideInputField(key, DNI);

        })
        .catch(err => {
            wrongDNI();
        })
}

async function manageFileId(fileID) {
    removeLoader();
    const nominaFrame = document.getElementById('nominaFrame');
    nominaFrame.src = `https://drive.google.com/file/d/${fileID}/preview`;

    nominaFrame.style.boxShadow = 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px';
}

async function wrongDNI() {
    removeLoader();
    const input = document.getElementById('DNI');
    input.value = '';
    const boton = document.getElementById('boton');
    boton.style.transform = 'translateX(.2rem)';
    await timeout(50);
    for (ii = 0; ii < 3; ii++) {
        boton.style.transform = 'translateX(.2rem)';
        await timeout(50);
        boton.style.transform = 'translateX(-.2rem)';
        await timeout(50);
    }
    boton.style.transform = 'translateX(0rem)';
}

function addLoader() {
    const botonDiv = document.getElementById('botonTexto');
    botonDiv.style.display = 'none';
    const loader = document.getElementById('loader');
    loader.style.display = 'block';
    const input = document.getElementById('DNI');
    input.disabled = true;
}

function removeLoader() {
    const botonDiv = document.getElementById('botonTexto');
    botonDiv.style.display = 'block';
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
    const input = document.getElementById('DNI');
    input.disabled = false;
}

// AL PULSAR EN EL BOTÓN DE DESCARGAR NÓMINA PODRÍA ABRIRSE UN IFRAME CON UNA FUNCIÓN ASYNC QUE MUESTRE EL IFRAME Y PUEDE QUE UNA CUENTA ATRÁS PARA DESCARGAR EL PDF. SI SE PASA LA CUENTA, EL IFRAME SE CIERRA Y SE MANDA UN FETCH CON EL key VUELVA A REVOCAR EL ACCESO DE LA NÓMINA A PRIVADO. VOLVERÍA A APARECER EL INPUT PARA INTRODUCIR EL DNI

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function hideInputField(key, DNI) {
    console.log('changeUI');

    const input = document.getElementById('DNI');
    input.disabled = true;

    const accessTime = 20; //secs
    await timeout(accessTime * 1000);

    params = `?${key}&${DNI}&revokeAccess=1`;
    let url = serverSideUrl();
    url += params;
    revokeAccess(url);
}

function revokeAccess(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log('Access revoked');
                showInputField();
            }
        })
        .catch(err => {
            console.log('error');
        })
}

function showInputField() {
    const input = document.getElementById('DNI');
    input.disabled = false;
    input.value = '';

    const nominaFrame = document.getElementById('nominaFrame');
    nominaFrame.src = '';

    nominaFrame.style.boxShadow = 'none';
}