class App {
    constructor() {
        this._navController = new NavigationController();

        this._navController._addPage(new LoginPage(), false);
        this._navController._addPage(new PerfilPage(), false);
        this._navController._addPage(new HomePage(), true);
        this._navController._addPage(new ComidaPage(), true);
        this._navController._addPage(new BebidaPage(), true);

        this._navController._inicializa();
    }
}

var app = new App();