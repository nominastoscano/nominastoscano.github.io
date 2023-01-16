function send() {

    let DNI = document.getElementById('DNI').value;

    DNI = DNI.replace(/\D/g,'');

    const url_string = location.href;
    const url = new URL(url_string);
    const key = url.searchParams.get("key");

    const keyUser = {
        key: key,
        DNI: DNI
    }

    doLogin(keyUser)

}

function dbUrl() {
    return 'https://script.google.com/macros/s/AKfycbxnPCeofehndGWH4_IF-GCYUsrHvLBv3S0voaW7w9waVbSSaHl38loeazamtPw1w_8x/exec';
}

function doLogin(keyUser) {

    console.log(keyUser);

    const key = `key=${keyUser.key}`;
    const DNI = `DNI=${keyUser.DNI}`;
    const params = `?${key}&${DNI}`;

    let url = dbUrl();
    url += params;
    console.log(url);

    fetch(url)
        .then(nominaURL => nominaURL.json())
        .then(nominaURL => {
            console.log("Promise solved");
            
            openNomina(nominaURL);
        })

}

function openNomina(nominaURL) {
    console.log(nominaURL);

    // window.location.replace(nominaURL);
    // window.location.href = nominaURL;
    window.open(nominaURL, '_blank');
}