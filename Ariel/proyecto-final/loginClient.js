class LoginClient {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users/login";
        this._apiClient = new APIClient();
    }
    postLogin(data) {
        let urlCompleta = this._urlBase;

        let promise = this._apiClient.post(urlCompleta, data);
        return promise;
    }
}

class BodyLogin {
    constructor() {
        this._loginClient = new LoginClient();
    }
    getDatosDelForm() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        let login = {
            username: username,
            password: password
        }
        return login;
    }
    postLoginDelForm (nav) {
        let login = this.getDatosDelForm();
        let promise = this._loginClient.postLogin(login).then(
            (data) => {
                if (!data.message){
                    this.setLocalStorage(data);
                    let body = document.body || document.getElementsByTagName('body')[0];
                    body.removeChild(body.childNodes[0])
                    nav.navigateToUrl("/home/");
                } else {
                    let alertusercreado = document.getElementById('alertusercreado');
                    alertusercreado.classList.add('btn-deactive');
                    let alertlogin = document.getElementById('alertlogin');
                    alertlogin.classList.remove('btn-deactive');
                    alertlogin.innerHTML = data.message;
                }
            }
        );
    }
    setLocalStorage(data) {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("remember", document.getElementById('remember').checked);
    }

}
