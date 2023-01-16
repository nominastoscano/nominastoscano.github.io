function send() {

    console.log('hola');

    const DNI = document.getElementById('DNI').value;

    const url_string = location.href;
    const url = new URL(url_string);
    const test = url.searchParams.get("key");
    console.log(test, DNI);

}

function dbUrl() {
    return 'https://script.google.com/macros/s/AKfycbzPNUO9tVWkQiu0606kiurqVapQwFx9XYcVt9EpINY/dev';
}

function doLogin(e) {

    e.preventDefault();

    console.log('BUTTON CLICKED');

    let data = Object.fromEntries(new FormData(document.getElementById('userpass')).entries());
    // console.log(data);
    const param0 = `${Object.keys(data)[0]}=${Object.values(data)[0]}`;
    const param1 = `${Object.keys(data)[1]}=${Object.values(data)[1]}`;
    const params = `?${param0}&${param1}`;

    let url = dbUrl();
    url += params;
    // console.log(params)

    fetch(url)
        .then(r => r.json())
        .then(r => {
            console.log("Promise solved");
            // console.log(r.tempID);
            // console.log(r.status);
            document.getElementById('fetchResponse').textContent = r.status;
            if (r.status === 'logging') {
                window.location.href = `/home.html?tempID=${r.tempID}`;
            }
        })

    document.getElementById('userpass').reset();
}

async function afterLoad() {

    let url = dbUrl();

    const queryString = window.location.search;
    // console.log(queryString);
    // const tempID = new URLSearchParams(window.location.search).get('tempID');
    url += queryString

    // console.log(tempID);

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log('data', data.userDB);

            // addData(data.userDB);

            manageHeader(data.userDB.userPersonal)

            document.getElementById("beautifiedV").innerHTML = JSON.stringify(data.userDB.registroVacaciones, undefined, 2);


        })
        .catch(error => console.log(error));

}

function openNomina(nominaURL) {
    console.log(nominaURL);

    // window.location.replace(nominaURL);
    // window.location.href = nominaURL;
    window.open(nominaURL, '_blank');
}