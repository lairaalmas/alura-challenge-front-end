(() => {
  const botaoCor = document.querySelector("[data-cor]");
  const botaoHighlight = document.querySelector("[data-highlight]");
  const codigo = document.querySelector("[data-codigo]");
  const linguagem = document.querySelector("[data-linguagem]");

  // Mudando cor da borda do editor de codigo
  const mudaCorBorda = (cor) => {
    document.querySelector("[data-borda]").style.background = cor;
  }
  botaoCor.addEventListener('change', () => mudaCorBorda(botaoCor.value));
  // Permitindo usar tab dentro do editor de código
  const tratarTeclado = (evento) => {
    if (evento.key == 'Tab') {
      evento.preventDefault();
      const tab = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.insertNode(tab);
      range.setStartAfter(tab);
      range.setEndAfter(tab);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
  codigo.addEventListener('keydown', tratarTeclado);
  // Alternando hightlight no codigo
  const toggleHighlight = () => {
    tratarCodigo();
    if (codigo.classList.contains('language-plaintext')) mostrarHighlight();
    else esconderHighlight();
  }
  botaoHighlight.addEventListener('click', toggleHighlight);
  // Mudando a linguagem de programação para highlight
  const mudarLinguagem = () => {
    if (botaoHighlight.classList.contains('active')) {
      tratarCodigo();
      codigo.classList = `hljs language-${linguagem.value}`;
      hljs.highlightElement(codigo);
    }
  }
  linguagem.addEventListener('change', mudarLinguagem);

  // Tratando codigo inserido para nao gerar conflito com html
  const tratarCodigo = () => {
    const texto = codigo.innerText;
    codigo.innerHTML = texto.replaceAll("<", "&lt;");
  }
  // Mostrar código com highlight
  const mostrarHighlight = () => {
    codigo.classList = `hljs language-${linguagem.value}`;
    botaoHighlight.classList.add('active');
    hljs.highlightElement(codigo);
  }
  // Mostrar codigo sem highlight
  const esconderHighlight = () => {
    codigo.classList = "hljs language-plaintext";
    botaoHighlight.classList.remove('active');
  }

})();