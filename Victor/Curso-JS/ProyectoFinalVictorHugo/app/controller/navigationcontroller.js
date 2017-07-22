class NavigationController {
    constructor() {
        this.pages = [];

        this.navBar = [];
        this.usuario = {};
    }

    _inicializa() {
        window.addEventListener('popstate', (event) => this._updateState(event.state));

        this._updateState(this.pages[0]);

        window.history.replaceState(this.pages[0], this.pages[0].name, this.pages[0].url);
    }

    _addPage(objPage, pintarMenu) {
        objPage._navController = this;
        this.pages.push(objPage);
        if (pintarMenu) {
            this.navBar.push(new NavBarItems(objPage._name, objPage._title, objPage._url));
        }
    }

    _addUsuario(objUsuario){
        this.pages.forEach((page) => {
            page._usuario = objUsuario;
        });
    }

    _updateState(objPage) {
        objPage.pintar(this.navBar);
    }

    _addState(objPage) {
        history.pushState(objPage, objPage._name, objPage._url);
        this._updateState(objPage);
    }

    _initPage(stateObj) {
        window.addEventListener('popstate', (event) => _updateContent(event.state));

        this._updateContent(stateObj);

        window.history.replaceState(stateObj, stateObj.title, '');
    }

    navigateToUrl(namePage) {
        let encontrado = false;
        for (let p = 0; (p < this.pages.length || !encontrado); p++) {
            if (this.pages[p]._name == namePage) {
                encontrado = true;
                console.info('Cambiando Estado...');
                this._addState(this.pages[p]);
            }
        }

        if (!encontrado) {
            console.error('Pagina no encontrada.');
        }
    }

    navigateToHome() {
        this.navigateToUrl("Home");
    }
}

class NavBarItems {
    constructor(name, title, url) {
        this._name = name;
        this._title = title;
        this._url = url;
    }
}