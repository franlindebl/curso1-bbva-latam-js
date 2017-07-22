class App {
    constructor() {
            this._paginaActual = "";
            //1 paso
            this._navega = new NavigationController();
            this._contextoApp = new ContextoControler();
            this._modalCtrl = new ModalController();
        }
        //2 paso
    iniciaNavegacion() {
        this._navega.creaPaginas(this._contextoApp, this._modalCtrl);
        this._navega.navegarPrimerPagina("/login");

    }
}

class NavigationController {
    constructor() {
            this._paginas = [];
            this._contextoApp = null;
        }
        //3 paso
    creaPaginas(contextoApp, modalCtrl) {
        this._contextoApp = contextoApp;
        let inicio = new Inicio("Inicio", "/inicio", this, contextoApp, modalCtrl);
        let gestionComida = new GestionComida("Gestion de Comidas", "/gestionComida", this, contextoApp, modalCtrl);
        let gestionBebida = new GestionBebida("Gestion de Bebidas", "/gestionBebida", this, contextoApp, modalCtrl);
        let perfil = new Perfil("Perfil", "/perfil", this, contextoApp, modalCtrl);
        let login = new Login("Login", "/login", this, contextoApp, modalCtrl);
        this._paginas.push(login);
        this._paginas.push(inicio);
        this._paginas.push(gestionComida);
        this._paginas.push(gestionBebida);
        this._paginas.push(perfil);
    }

    navegarPrimerPagina(paginaIni) {

        for (let pagina = 0; pagina < this._paginas.length; pagina++) {

            if (this._paginas[pagina]._ruta == paginaIni) {
                document.getElementsByClassName("containerBody")[0].innerHTML = "";
                this._paginas[pagina]._contexto.getContextoLogin();
                if (!this._contextoApp._usuarioContexto) {
                    this._paginaActual = this._paginas[pagina]._ruta;
                    window.history.pushState("", "", paginaIni);

                    this._paginas[pagina].pinta();

                } else {

                    if (this._paginas[pagina]._ruta == "/login") {
                        this.navegarPrimerPagina("/inicio");
                    } else {
                        window.history.pushState("", "", paginaIni);
                        this._paginas[pagina].pinta();
                    }

                }
            }
        }
    }
}

class ContextoControler {
    constructor() {
        this._usuarioContexto = "";
    }

    getContextoLogin() {

        return this._usuarioContexto = localStorage.getItem("Nombre");
    }
    setContextoLogin() {
        //this._usuario =
    }
}

class Pagina {
    constructor(nombre, ruta, navega, contexto) {
        this._id = "";
        this._nombre = nombre;
        this._root = "";
        this._estado = "";
        this._ruta = ruta;
        this._navega = navega;
        this._contexto = contexto;

    }

    pintaContexto() {
        let padreCabeceraContexto = document.getElementsByClassName('panel-heading')[0];
        let parrafo = document.createElement("p");
        padreCabeceraContexto.appendChild(parrafo);

        let texParrafo = document.createTextNode("Bienvenido  " + this._contexto._usuarioContexto);
        parrafo.appendChild(texParrafo);

    }
}


class InnerPagina extends Pagina {
    constructor(nombre, ruta, app, contexto) {
        super(nombre, ruta, app, contexto);
    }

    pintaEstructuraBasePagina() {
        let navegacionPadre = document.getElementsByClassName("containerBody")[0];
        //Crea nav para barra de Navegacion

        let divMenu = document.createElement("div");
        let divNombre = document.createElement("div");
        navegacionPadre.appendChild(divMenu);
        divMenu.appendChild(divNombre);
        //divMenu.className = 'menu';
        let nombre = document.createElement("div");
        divNombre.appendChild(nombre);
        divNombre.className = 'panel panel-primary';
        nombre.className = 'panel-heading';

        let textNombre = document.createTextNode(this._nombre);
        nombre.appendChild(textNombre);


        let navNavegacion = document.createElement("nav");
        navegacionPadre.appendChild(navNavegacion);
        navNavegacion.className = 'navbar navbar-inverse';
        //Crea Div para barra de Navegacion
        let divNavegacion = document.createElement("div");
        navNavegacion.appendChild(divNavegacion);
        divNavegacion.className = 'container-fluid';

        //crea Div de navegacion de Header
        let divNavegacionHeader = document.createElement("div");
        divNavegacion.appendChild(divNavegacionHeader);
        divNavegacionHeader.className = 'navbar-header';

        let botonNavegacionHeader = document.createElement("button");
        let textButton = document.createTextNode("Inicio Pagina");
        botonNavegacionHeader.appendChild(textButton);
        divNavegacionHeader.appendChild(botonNavegacionHeader);

        botonNavegacionHeader.className = 'navbar-toggle';
        botonNavegacionHeader.setAttribute("data-toggle", "collapse");
        botonNavegacionHeader.setAttribute("data-target", "#myNavbar");

        let spanNavegacion1 = document.createElement("span");
        divNavegacionHeader.appendChild(spanNavegacion1);
        spanNavegacion1.className = 'icon-bar';

        let spanNavegacion2 = document.createElement("span");
        divNavegacionHeader.appendChild(spanNavegacion2);
        spanNavegacion2.className = 'icon-bar';

        let spanNavegacion3 = document.createElement("span");
        divNavegacionHeader.appendChild(spanNavegacion3);
        spanNavegacion3.className = 'icon-bar';

        let linkNavegacionA = document.createElement("a");
        divNavegacionHeader.appendChild(linkNavegacionA);
        linkNavegacionA.className = 'navbar-brand';
        let textLinkNav = document.createTextNode("");
        linkNavegacionA.appendChild(textLinkNav);

        //Div de ID miNavBar
        let divmyNavbar = document.createElement("div");
        divNavegacion.appendChild(divmyNavbar);
        divmyNavbar.className = 'collapse navbar-collapse';

        //Creacion de lista dentro de DIV miNavBar
        let listasMyNavbar = document.createElement("ul");
        divmyNavbar.appendChild(listasMyNavbar);
        listasMyNavbar.className = 'nav navbar-nav';

        //Creacion de las listas dentro de ListaMyNavBar
        let listaMyNavbar1 = document.createElement("li");
        listasMyNavbar.appendChild(listaMyNavbar1);
        let listaMyNavbarLink1 = document.createElement("a");
        listaMyNavbar1.appendChild(listaMyNavbarLink1);
        listaMyNavbarLink1.setAttribute("href", "#");
        let textlistaMyNavbarLink1 = document.createTextNode("Inicio");

        listaMyNavbarLink1.addEventListener('click', () => this._navega.navegarPrimerPagina("/inicio"));

        listaMyNavbarLink1.appendChild(textlistaMyNavbarLink1);

        let listaMyNavbar2 = document.createElement("li");
        listasMyNavbar.appendChild(listaMyNavbar2);
        let listaMyNavbarLink2 = document.createElement("a");
        listaMyNavbar2.appendChild(listaMyNavbarLink2);
        listaMyNavbarLink2.setAttribute("href", "#");
        listaMyNavbarLink2.addEventListener('click', () => this._navega.navegarPrimerPagina("/gestionComida"));

        let textlistaMyNavbarLink2 = document.createTextNode("Gestion de Comidas");
        listaMyNavbarLink2.appendChild(textlistaMyNavbarLink2);

        let listaMyNavbar3 = document.createElement("li");
        listasMyNavbar.appendChild(listaMyNavbar3);
        let listaMyNavbarLink3 = document.createElement("a");
        listaMyNavbar3.appendChild(listaMyNavbarLink3);
        listaMyNavbarLink3.setAttribute("href", "#");
        listaMyNavbarLink3.addEventListener('click', () => this._navega.navegarPrimerPagina("/gestionBebida"));

        let textlistaMyNavbarLink3 = document.createTextNode("Gestion de Bebidas");
        listaMyNavbarLink3.appendChild(textlistaMyNavbarLink3);

        let listaMyNavbar4 = document.createElement("li");
        listasMyNavbar.appendChild(listaMyNavbar4);
        let listaMyNavbarLink4 = document.createElement("a");
        listaMyNavbar4.appendChild(listaMyNavbarLink4);
        listaMyNavbarLink4.setAttribute("href", "#");
        listaMyNavbarLink4.addEventListener('click', () => this._navega.navegarPrimerPagina("/perfil"));

        let textlistaMyNavbarLink4 = document.createTextNode("Perfil");
        listaMyNavbarLink4.appendChild(textlistaMyNavbarLink4);

        //Creacion de lista derecha
        let listasMyNavbarDer = document.createElement("ul");
        divmyNavbar.appendChild(listasMyNavbarDer);
        listasMyNavbarDer.className = 'nav navbar-nav navbar-right';

        //Creacion de las listas dentro de ListaMyNavBar
        let listaMyNavbar1Der = document.createElement("li");
        listasMyNavbarDer.appendChild(listaMyNavbar1Der);
        let listaMyNavbarLink1Der = document.createElement("a");
        listaMyNavbar1Der.appendChild(listaMyNavbarLink1Der);
        listaMyNavbarLink1Der.setAttribute("href", "#");
        listaMyNavbarLink1Der.setAttribute("class", "glyphicon glyphicon-log-in");
        let textlistaMyNavbarLink1Der = document.createTextNode("Logon");
        listaMyNavbarLink1Der.appendChild(textlistaMyNavbarLink1Der);

        //Creacion de Div de contenido Central
        let divContenidoPadre = document.createElement("div");
        navegacionPadre.appendChild(divContenidoPadre);
        divContenidoPadre.className = 'container-fluid text-center';

        let divContenido = document.createElement("div");
        divContenidoPadre.appendChild(divContenido);
        divContenido.className = 'row content';

        let divContenido1 = document.createElement("div");
        divContenido.appendChild(divContenido1);
        divContenido1.className = 'col-sm-2 sidenav';

        let divContenido2 = document.createElement("div");
        divContenido.appendChild(divContenido2);
        divContenido2.className = 'col-sm-8 text-left';

        let divContenidoMod = document.createElement("div");
        divContenido.appendChild(divContenidoMod);
        divContenidoMod.setAttribute("id", "htmlModal");

        let divContenido3 = document.createElement("div");
        divContenido.appendChild(divContenido3);
        divContenido3.className = 'col-sm-2 sidenav';

        //Pintado de Footer
        let footerApp = document.createElement("footer");
        navegacionPadre.appendChild(footerApp);
        footerApp.className = 'container-fluid text-center';
    }

}





let appNes = null;
window.onload = () => {
    appNes = new App();
    appNes.iniciaNavegacion();
}
