class App {
    constructor() {
        this._navigation = new NavigationController();
    }
    appInit() {
        this._navigation.routes();
        if (localStorage.getItem("remember") == "true") {
            this._navigation.navigateToHome();
        }
        else {
            this._navigation.navigateToUrl("/login/");
        }
    }
}

class NavigationController {
    constructor() {
        this._pages = [];
    }
    routes() {
        this._pages.push(new Login(this));
        this._pages.push(new SignUp(this));
        this._pages.push(new Home(this));
        this._pages.push(new Pag1(this));
        this._pages.push(new Pag2(this));
        this._pages.push(new Pag3(this));
    }
    navigateToUrl(url) {

        for (var i = 0; i < this._pages.length; i++) {
            let pag = this._pages[i];
            if (pag._url == url) {
                this._pages[i].pintar();
            }
        }
    }
    navigateToHome() {
        let body = document.body || document.getElementsByTagName('body')[0];
        body.removeChild(body.childNodes[0])
        this._pages[2].pintar();
    }
}

class Page {
    constructor(nav) {
        this._nav = nav;
    }
}

class InnerPages extends Page {
    constructor(nav) {
        super(nav);
    }
    pintarEstructura() {
        let newDivNav = document.createElement('nav');
        newDivNav.className = 'navbar navbar-inverse';

        let newDivCont1 = document.createElement('div');
        newDivCont1.className = 'container-fluid';

        let newDivNavH1 = document.createElement('div');
        newDivNavH1.className = 'navbar-header';

        let newANavH1 = document.createElement('a');
        newANavH1.className = 'navbar-brand';
        newANavH1.href = '#/home/';
        newANavH1.textContent = 'WebSiteAriel';

        newDivNavH1.appendChild(newANavH1);

        newDivCont1.appendChild(newDivNavH1);
        newDivNav.appendChild(newDivCont1);


        let newUl1 = document.createElement('ul');
        newUl1.className = 'nav navbar-nav';

        let newLi1 = document.createElement('li');
        newLi1.id = 'nhome';

        let newANav1 = document.createElement('a');
        newANav1.href = '#/home/';
        newANav1.textContent = 'Home';

        let newLi2 = document.createElement('li');
        newLi2.id = 'npag1';

        let newANav2 = document.createElement('a');
        newANav2.href = '#/pag1/';
        newANav2.textContent = 'Comidas';

        let newLi3 = document.createElement('li');
        newLi3.id = 'npag2';

        let newANav3 = document.createElement('a');
        newANav3.href = '#/pag2/';
        newANav3.textContent = 'Bebidas';

        let newLi4 = document.createElement('li');
        newLi4.id = 'npag3';

        let newANav4 = document.createElement('a');
        newANav4.href = '#/pag3/';
        newANav4.textContent = 'Perfil';

        let clickHome = () => {
            let content = document.getElementById('content');
            content.removeChild(content.childNodes[0]);
            this._nav.navigateToHome();
        }

        let click1 = () => {
            let content = document.getElementById('content');
            content.removeChild(content.childNodes[0]);
            this._nav.navigateToUrl("/home/");
        }

        let click2 = () => {
            let content = document.getElementById('content');
            content.removeChild(content.childNodes[0]);
            this._nav.navigateToUrl("/pag1/");
        }

        let click3 = () => {
            let content = document.getElementById('content');
            content.removeChild(content.childNodes[0]);
            this._nav.navigateToUrl("/pag2/");
        }

        let click4 = () => {
            let content = document.getElementById('content');
            content.removeChild(content.childNodes[0]);
            this._nav.navigateToUrl("/pag3/");
        }

        newANavH1.addEventListener("click", clickHome);
        newANav1.addEventListener("click", click1);
        newANav2.addEventListener("click", click2);
        newANav3.addEventListener("click", click3);
        newANav4.addEventListener("click", click4);

        newLi4.appendChild(newANav4);
        newLi3.appendChild(newANav3);
        newLi2.appendChild(newANav2);
        newLi1.appendChild(newANav1);

        newUl1.appendChild(newLi1);
        newUl1.appendChild(newLi2);
        newUl1.appendChild(newLi3);
        newUl1.appendChild(newLi4);

        newDivCont1.appendChild(newUl1);
        

        let newDivCont = document.createElement('div');
        newDivCont.className = 'container';

        let newDivCont2 = document.createElement('div');
        newDivCont2.className = 'container-fluid';
        newDivCont2.id = 'content';

        let newDivCont3 = document.createElement('div');
        newDivCont3.innerHTML = '<hr> <footer> <p class="pull-right"><a href="#">Ir arriba</a></p> <p> Solo para su uso didactico. <a href="https://bitbucket.org/areynag/proyecto-final/overview"> Creado por Ariel Reyna </a></p> </footer>'

        newDivCont.appendChild(newDivNav);
        newDivCont.appendChild(newDivCont2);
        newDivCont.appendChild(newDivCont3);

        let body = document.body || document.getElementsByTagName('body')[0];
        body.insertBefore(newDivCont, body.childNodes[0]);

        return newDivCont;
    }
    pintar() {
        var contentObj = document.getElementById('content');

        if(!contentObj){
            var estructura = this.pintarEstructura();
            contentObj = estructura.querySelector("#content");
        }
        
        contentObj.innerHTML = "";
        contentObj.innerHTML = this.getContent();
    }
}

class Home extends InnerPages {
    constructor(nav) {
        super(nav);
        this._url = "/home/";
        this._bodyComida = new BodyComida();
        this._bodyBebida = new BodyBebida();
    }
    getContent(){
        let newDivCont = '<h1>Gestion Productos</h1> <div id="myCarousel" class="carousel slide"> <ol class="carousel-indicators"> <li data-target="#myCarousel" data-slide-to="0" class="active"></li> <li data-target="#myCarousel" data-slide-to="1"></li> </ol> <div class="carousel-inner"> <div class="item active"> <img src="https://s-media-cache-ak0.pinimg.com/originals/86/9b/79/869b79d4910260fa74f606b5d9424246.jpg" style="width:100%" class="img-responsive"> <div class="container"> <div class="carousel-caption"> </div> </div> </div> <div class="item"> <img src="http://static.vix.com/es/sites/default/files/imj/elgrancatador/l/las-6-bebidas-con-menor-graduacion-alcoholica_0.jpg" class="img-responsive"> <div class="container"> <div class="carousel-caption"> </div> </div> </div> </div> <a class="left carousel-control" href="#myCarousel" data-slide="prev"> <span class="icon-prev"></span> </a> <a class="right carousel-control" href="#myCarousel" data-slide="next"> <span class="icon-next"></span> </a> </div> <div class="container marketing"> <div class="row"> <div class="col-md-4 text-center"> <div id="grafComida" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div></div> <div class="col-md-4 text-center"> <div id="grafBebida" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div></div> </div>';
        this._bodyComida.grafComida();
        this._bodyBebida.grafBebida();
        return newDivCont;
    }
}

class Pag1 extends InnerPages {
    constructor(nav) {
        super(nav);
        this._url = "/pag1/";
        this._bodyComida = new BodyComida();
    }
    getContent(){

        let newDivCont = this._bodyComida.pintarEstructura();

        return newDivCont;
    }
}

class Pag2 extends InnerPages{
    constructor(nav) {
        super(nav);
        this._url = "/pag2/";
        this._bodyBebida = new BodyBebida();
    }
    getContent(){
 
        let newDivCont = this._bodyBebida.pintarEstructura();

        return newDivCont;
    }
}

class Pag3 extends InnerPages{
    constructor(nav) {
        super(nav);
        this._url = "/pag3/";
        this._bodyUsuario = new BodyUsuario();

    }
    getContent(){
 
        let newDivCont = this._bodyUsuario.pintarEstructura();

        return newDivCont;
    }
}

class Login extends Page{
    constructor(nav) {
        super(nav);
        this._url = "/login/";
        this._bodyLogin = new BodyLogin();

    }
    pintar() {
        let newDivCont = document.createElement('div');
        newDivCont.className = 'container';

        let newDiv1 = document.createElement('div');
        newDiv1.className = 'row';

        let newDiv2 = document.createElement('div');
        newDiv2.className = 'col-md-4 col-md-offset-4';

        let newDiv3 = document.createElement('div');
        newDiv3.className = 'panel panel-default';

        let newDiv4 = document.createElement('div');
        newDiv4.className = 'panel-heading';

        let newH3 = document.createElement('h3');
        newH3.className = 'panel-title';
        newH3.textContent = 'Login Ariel';

        newDivCont.appendChild(newDiv1);
        newDiv1.appendChild(newDiv2);
        newDiv2.appendChild(newDiv3);
        newDiv3.appendChild(newDiv4);
        newDiv4.appendChild(newH3);


        let newDiv5 = document.createElement('div');
        newDiv5.className = 'panel-body';
        newDiv5.innerHTML= '<div class="alert alert-danger btn-deactive" id="alertlogin"></div> <div class="alert alert-success btn-deactive" id="alertusercreado"></div>'

        let newDivF1 = document.createElement('div');
        newDivF1.className = 'form-group';

        let newInput1 = document.createElement('input');
        newInput1.type = 'text';
        newInput1.className = 'form-control';
        newInput1.id = 'username';
        newInput1.placeholder = 'Your username';

        newDiv3.appendChild(newDiv5);
        newDiv5.appendChild(newDivF1);
        newDivF1.appendChild(newInput1);


        let newDivF2 = document.createElement('div');
        newDivF2.className = 'form-group';

        let newInput2 = document.createElement('input');
        newInput2.type = 'password';
        newInput2.className = 'form-control';
        newInput2.id = 'password';
        newInput2.placeholder = 'Your Password';

        newDiv5.appendChild(newDivF2);
        newDivF2.appendChild(newInput2);


        let newDivCh = document.createElement('div');
        newDivCh.className = 'checkbox';
        newDivCh.innerHTML = '<label><input id="remember" type="checkbox"> Remember Me</label>'

        newDiv5.appendChild(newDivCh);


        let newBut1 = document.createElement('button');
        newBut1.className = 'btn btn-lg btn-success btn-block';
        newBut1.textContent = 'Login Now';

        let click1 = () => {
            this._bodyLogin.postLoginDelForm(this._nav);
            
        };
        newBut1.addEventListener("click", click1);

        newDiv5.appendChild(newBut1);


        let newCenter = document.createElement('center');
        newCenter.innerHTML = '<h4>OR</h4>';

        newDiv5.appendChild(newCenter);


        let newBut2 = document.createElement('button');
        newBut2.className = 'btn btn-lg btn-primary btn-block';
        newBut2.textContent = 'SignUp';

        let click2 = () => {
            let body = document.body || document.getElementsByTagName('body')[0];
            body.removeChild(body.childNodes[0])
            this._nav.navigateToUrl("/singup/");
        };
        newBut2.addEventListener("click", click2);

        newDiv5.appendChild(newBut2);


        let body = document.body || document.getElementsByTagName('body')[0];
        body.insertBefore(newDivCont, body.childNodes[0]);
    }
}

class SignUp extends Page{
    constructor(nav) {
        super(nav);
        this._url = "/singup/";
        this._bodyUsuario = new BodyUsuario();

    }
    pintar() {
        let newDivCont = document.createElement('div');
        newDivCont.className = 'container';

        let newDiv1 = document.createElement('div');
        newDiv1.className = 'row';

        let newDiv2 = document.createElement('div');
        newDiv2.className = 'col-md-6 col-md-offset-3';

        let newDiv3 = document.createElement('div');
        newDiv3.className = 'panel panel-default';

        let newDiv4 = document.createElement('div');
        newDiv4.className = 'panel-heading';

        let newH3 = document.createElement('h3');
        newH3.className = 'panel-title';
        newH3.textContent = 'SignUp Ariel';

        newDivCont.appendChild(newDiv1);
        newDiv1.appendChild(newDiv2);
        newDiv2.appendChild(newDiv3);
        newDiv3.appendChild(newDiv4);
        newDiv4.appendChild(newH3);


        let newDiv5 = document.createElement('div');
        newDiv5.className = 'panel-body';
        newDiv5.innerHTML= '<div class="alert alert-danger btn-deactive" id="alertsingup"></div>'

        let newDivF1 = document.createElement('div');
        newDivF1.className = 'form-group';

        let newInput1 = document.createElement('input');
        newInput1.type = 'text';
        newInput1.className = 'form-control';
        newInput1.id = 'name';
        newInput1.placeholder = 'Your Name';

        newDiv3.appendChild(newDiv5);
        newDiv5.appendChild(newDivF1);
        newDivF1.appendChild(newInput1);


        let newDivF2 = document.createElement('div');
        newDivF2.className = 'form-group';

        let newInput2 = document.createElement('input');
        newInput2.type = 'text';
        newInput2.className = 'form-control';
        newInput2.id = 'lastname';
        newInput2.placeholder = 'Your Last Name';

        newDiv5.appendChild(newDivF2);
        newDivF2.appendChild(newInput2);


        let newDivF3 = document.createElement('div');
        newDivF3.className = 'form-group';

        let newInput3 = document.createElement('input');
        newInput3.type = 'text';
        newInput3.className = 'form-control';
        newInput3.id = 'username';
        newInput3.placeholder = 'Your Username';

        newDiv5.appendChild(newDivF3);
        newDivF3.appendChild(newInput3);


        let newDivF4 = document.createElement('div');
        newDivF4.className = 'form-group';

        let newInput4 = document.createElement('input');
        newInput4.type = 'text';
        newInput4.className = 'form-control';
        newInput4.id = 'email';
        newInput4.placeholder = 'Your Email';

        newDiv5.appendChild(newDivF4);
        newDivF4.appendChild(newInput4);

        let newDivF5 = document.createElement('div');
        newDivF5.className = 'form-group';

        let newInput5 = document.createElement('input');
        newInput5.type = 'password';
        newInput5.className = 'form-control';
        newInput5.id = 'password';
        newInput5.placeholder = 'Your Password';

        newDiv5.appendChild(newDivF5);
        newDivF5.appendChild(newInput5);


        let newBut1 = document.createElement('button');
        newBut1.className = 'btn btn-primary btn-block';
        newBut1.textContent = 'Guardar';

        let newBut2 = document.createElement('button');
        newBut2.className = 'btn btn-block';
        newBut2.textContent = 'Atras';


        let click1 = () => {
            this._bodyUsuario.postUsuarioDelForm(this._nav);
            
        }
        newBut1.addEventListener("click", click1);

        let click2 = () => {
            let body = document.body || document.getElementsByTagName('body')[0];
            body.removeChild(body.childNodes[0])
            this._nav.navigateToUrl("/login/");
            
        }
        newBut2.addEventListener("click", click2);

        newDiv5.appendChild(newBut1);
        newDiv5.appendChild(newBut2);


        let body = document.body || document.getElementsByTagName('body')[0];
        body.insertBefore(newDivCont, body.childNodes[0]);
    }
}

let app = null;

window.onload = () => {
    app = new App();
    app.appInit();
}
