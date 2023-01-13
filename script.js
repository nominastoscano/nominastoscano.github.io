function send() {
    const DNI = document.getElementById('DNI').value;

    // google.script.url.getLocation(function (location) {
    //     const key = location.parameters.key[0];
    //     userKey = {
    //         key: key,
    //         DNI: DNI
    //     }
    //     console.log(userKey);

    //     google.script.run
    //         .withSuccessHandler(openNomina)
    //         .decodeS(userKey)
    // })

}

function openNomina(nominaURL) {
    console.log(nominaURL);

    // window.location.replace(nominaURL);
    // window.location.href = nominaURL;
    window.open(nominaURL, '_blank');
}