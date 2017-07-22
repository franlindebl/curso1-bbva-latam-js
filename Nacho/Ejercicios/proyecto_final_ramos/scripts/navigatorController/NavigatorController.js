class NavigatorController {
	constructor() {
		this._paginas = [];
	}

	addPagina(pagina) {
		this._paginas.push(pagina);
	}

	getPagina(numero) {
		return this._paginas[numero];
	}

	NavigateToUrl(string) {
	
		for (var i = 0; i < this._paginas.length; i++) {
			if(this._paginas[i]._url == string) {
				this._paginas[i].pintar();
				window.history.pushState("", "", this._paginas[i]._url);
				//break;
				console.log("pag "+this._paginas[i]._url);
			}
		}
	}

	navigateToHome() {
		this._paginas[1].pintar(); //elemento 1 es home

		var home =  this._paginas[1];
		window.history.pushState("", "", home._url);
		
	}
}