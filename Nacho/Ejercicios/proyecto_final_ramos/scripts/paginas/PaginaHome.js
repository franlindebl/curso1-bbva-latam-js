class PaginaHome extends Pagina {

	constructor() {
		super('/home');
		this._boton1;
		this._boton2;
		this._boton3;
		this._boton4;
	}

	pintar() {
		this.pintarCabecera();
	}
}