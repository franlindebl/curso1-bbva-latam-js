class Pagina {
	constructor(url) {
		this._url = url;
		this._id = null;
		this._navigatorController = null;
		this._botonSave = null;
	}

	pintarCabecera() {
		document.getElementById("idBody").innerHTML = "";
		var texto = "";

		var nav = document.createElement("nav");
		nav.setAttribute("class", "navbar navbar-default");
		document.getElementById("idBody").appendChild(nav);

		var contenedorDiv = document.createElement("div");
		contenedorDiv.setAttribute("class", "navbar navbar-default");
		nav.appendChild(contenedorDiv);

		var headerDiv = document.createElement("div");
		headerDiv.setAttribute("class", "navbar-header");
		contenedorDiv.appendChild(headerDiv);

		var menuMain = document.createElement("button");
		menuMain.setAttribute("class", "navbar-brand");
		contenedorDiv.appendChild(menuMain);

		texto = document.createTextNode("HOME");
        menuMain.appendChild(texto);

        var ul = document.createElement("ul");
        ul.setAttribute("class", "nav navbar-nav");
        contenedorDiv.appendChild(ul);
        //
        var li1 = document.createElement("li");
        li1.setAttribute("class", "active");
        ul.appendChild(li1);

        var boton1 =  document.createElement('button');
        boton1.setAttribute("class", "navbar-brand");
        boton1.setAttribute("id", "boton1");
        li1.appendChild(boton1);

        texto = document.createTextNode("Comidas");
        boton1.appendChild(texto);
        //
        var li2 = document.createElement("li");
        li2.setAttribute("class", "active");
        ul.appendChild(li2);

        var boton2 =  document.createElement('button');
        boton2.setAttribute("class", "navbar-brand");
        boton2.setAttribute("id", "boton2");
        li2.appendChild(boton2);

        texto = document.createTextNode("Bebidas");
        boton2.appendChild(texto);

        //
        var li3 = document.createElement("li");
        li3.setAttribute("class", "active");
        ul.appendChild(li3);

        var boton3 =  document.createElement('button');
        boton3.setAttribute("class", "navbar-brand");
        boton3.setAttribute("id", "boton3");
        li3.appendChild(boton3);

        texto = document.createTextNode("Personas");
        boton3.appendChild(texto);

        
        this._button1 = document.getElementById('boton1');
		this._button1.addEventListener('click',(event) => {
			this._navigatorController.NavigateToUrl('/comidas');
		});

		this._button2 = document.getElementById('boton2');
		this._button2.addEventListener('click',(event) => {
			this._navigatorController.NavigateToUrl('/bebidas');
		});

		this._button3 = document.getElementById('boton3');
		this._button3.addEventListener('click',(event) => {
			this._navigatorController.NavigateToUrl('/usuarios');
		});

	}

	setNavigatorController(navigatorController) {
		this._navigatorController = navigatorController;
	}
}