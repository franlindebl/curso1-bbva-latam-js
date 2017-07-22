class App {
	constructor() {
		localStorage.setItem("estaAutenticado", "truem");

		this._nc = new NavigatorController();

		this._nc.addPagina(new PaginaLogin(this._nc));
		this._nc.addPagina(new PaginaHome(this._nc));
		this._nc.addPagina(new PaginaComidas(this._nc));
		this._nc.addPagina(new PaginaBebidas(this._nc));
		this._nc.addPagina(new PaginaUsuarios(this._nc));
	}

	ejecutar() {
		for (var i = 0; i < this._nc._paginas.length; i++) {
			this._nc.getPagina(i).setNavigatorController(this._nc);
		}

		if(localStorage.getItem("estaAutenticado") ==  "true" ) {
			this._nc.navigateToHome();
		} else {
			this._nc.NavigateToUrl('/login');
		}
	}
}