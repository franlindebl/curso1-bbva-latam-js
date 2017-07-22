class App {
    constructor() {
        this._navigationController = new NavigationController();
        this.crearPaginas();
        this._navigationController.navigateToHome();

        //var bebidas = new PageBebidas("PageBebidas", "127.0.0.1");
    }


    crearPaginas() {
    	var pageHome = new PageHome1("Home", "#Home");
        var pageBebidas = new PageBebidas("Bebidas", "#Bebidas");
        var pageComidas = new PageComidas("Comidas", "#Comidas");
        var pageUsuarios = new PageUsuarios("Usuarios", "#Usuarios");
        var pageLogin = new LoginPage("Login", "#Login");
     

  		this._navigationController.addPage(pageHome);
        this._navigationController.addPage(pageBebidas);
        this._navigationController.addPage(pageComidas);
        this._navigationController.addPage(pageUsuarios);
        this._navigationController.addPage(pageLogin);
      

    }


}


class NavigationController {
    constructor() {
        this.pages = [];
    }

    addPage(page) {
        console.log("entro");
        page._navigationController = this;
        this.pages.push(page);
    }


    navigateToUrl(url) {
        for (let i = 0; i < this.pages.length; i++) {
            if (this.pages[i]._urlPage == url) {
                console.log(this.pages[i]._urlPage);
                let pgs = this.pages[i];
                this.addEstado(pgs);
                pgs.pintar();
            }
       
        }
    }
    navigateToHome() {
        this.navigateToUrl("#Login");
    }


    addEstado(pgs) {
        history.pushState(pgs, pgs._urlname, pgs._urlPage);
        // this._updateState(pgs);
    }

    pintarPagina(pgs) {
        page.pintar();
    }


}


window.onload = () => {
	var app = new App();
};

