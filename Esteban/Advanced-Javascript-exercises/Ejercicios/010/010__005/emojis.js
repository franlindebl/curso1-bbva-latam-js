const emojis = {
	felices : ["😺","😃","😄","😁","😆","🙂","😉","😛","🤗","🤓","😎"],
	asustados : ["🙀","😱","😨","😫","😩","😬","😧","😦","😳","😯","😵"],
	molestos : ["😾","😟","😕","🙁","😤","😠","😡","😐","🤔","🤕","😢"],
	encendido : "💥",
	fuego : "🔥",
	arbol : "🌲",
	sensor : "🎄",
	fumador : {
        feliz: "😈",
        asustado: "😈",
        molesto: "👿"
	},
	colilla : "🚬",
	rayo : "⚡",
	bombero : "🚒",
	puesto : "⚪",
	plato : "🍽",
	comidas : ["🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🍈","🍒","🍑","🍍","🍅","🍆","🌽","🌶","🍠","🌰","🍯","🍞","🧀","🍳","🍤","🍗","🍖","🍕","🌭","🍔","🍟","🌮","🌯","🍝","🍜","🍲","🍥","🍣","🍱","🍛","🍙","🍚","🍘","🍢","🍡","🍧","🍨","🍦","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🍩","🍪"],
	bebidas: ["🍼","☕","🍵","🍶","🍺","🍻","🍷","🍸","🍹","🍾"],
	orden: "📝"
};
function getEmojisPersonaAleatorio() {
    let indice = Math.floor(Math.random() * emojis.felices.length);
    return {
        feliz: emojis.felices[indice],
        asustado: emojis.asustados[indice],
        molesto: emojis.molestos[indice]
    };
}
function getEmojisComidaAleatorio() {
    let indice = Math.floor(Math.random() * emojis.comidas.length);
    return emojis.comidas[indice];
}
function getEmojisBebidaAleatorio() {
    let indice = Math.floor(Math.random() * emojis.bebidas.length);
    return emojis.bebidas[indice];
}