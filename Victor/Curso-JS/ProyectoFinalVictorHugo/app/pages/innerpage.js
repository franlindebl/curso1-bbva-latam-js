class InnerPage extends Page {
    constructor(namePage, urlPage, title) {
        super(namePage, urlPage, title);
    }

    pintarEstructura(navBar, namePage) {
        let body = document.querySelector('body');
        body.innerHTML = "";

        let divContainer = document.createElement("DIV");
        divContainer.className = 'divPagePrincipal container-fluid';
        divContainer.appendChild

        this.pintarHeader(divContainer);
        this.pintarContent(divContainer, navBar, namePage);
        this.pintarFooter(divContainer);

        body.appendChild(divContainer);

        navBar.forEach((navBarItem) => {
            let nameMenu = "#menu" + navBarItem._name;
            document.querySelector(nameMenu).addEventListener("click", this._navController.navigateToUrl.bind(this._navController, navBarItem._name));
        });
        document.querySelector("#btnPerfilUsuario").addEventListener("click", this._navController.navigateToUrl.bind(this._navController, "Perfil"));
    }

    pintarHeader(divContainer) {
        let div = document.createElement("DIV");
        div.className = 'row';

        let divCol = document.createElement("DIV");
        divCol.className = 'divHeader col-xs-12';

        div.appendChild(divCol);

        divContainer.appendChild(div);
    }

    pintarContent(divContainer, navBar, namePage) {
        let div = document.createElement("DIV");
        div.className = 'row';

        let divCol = document.createElement("DIV");
        divCol.className = 'divContent col-xs-12';

        let menu = '';
        menu += '<nav class="navbar navbar-inverse">';
        menu += '<div class="container-fluid">';
        menu += '<div class="navbar-header">';
        menu += '<a class="navbar-brand" href="http://127.0.0.1:8080/">Restaurante Fran</a>';
        menu += '</div>';
        menu += '<ul class="nav navbar-nav">';

        navBar.forEach((navBarItem) => {
            menu += `<li ${(navBarItem._name == namePage ? 'class="active"' : '')}><a id="menu${navBarItem._name}">${navBarItem._title}</a></li>`;
        });

        menu += '</ul>';
        menu += '</li>';
        menu += '</ul>';
        menu += '<ul class="nav navbar-nav navbar-right">';
        menu += `<li ${('Perfil' == namePage ? 'class="active"' : '')}><a id="btnPerfilUsuario"><span class="glyphicon glyphicon-user"></span> Cuenta</a></li>`;
        menu += '<li><a href="."><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>';
        menu += '</ul>';
        menu += '</div>';
        menu += '</nav>';

        divCol.innerHTML = menu;

        div.appendChild(divCol);

        divContainer.appendChild(div);
    }

    pintarFooter(divContainer) {
        let div = document.createElement("DIV");
        div.className = 'row';

        let divCol = document.createElement("DIV");
        divCol.className = 'divFooter col-xs-12';

        div.appendChild(divCol);

        divContainer.appendChild(div);
    }
}