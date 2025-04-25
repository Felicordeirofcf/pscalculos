// Script para o site Pontes & Silva Cálculos Judiciais

function enviarFormulario(event) {
  event.preventDefault();

  // Pega os valores do formulário
  const nome = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const assunto = document.getElementById('subject').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const mensagem = document.getElementById('message').value.trim();

  // Validação básica
  if (!nome || !email || !assunto || !whatsapp) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return false;
  }

  // Validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um e-mail válido.');
    return false;
  }

  // Redirecionar para a página de agradecimento com os parâmetros
  window.location.href = `obrigado.html?nome=${encodeURIComponent(nome)}&email=${encodeURIComponent(email)}&assunto=${encodeURIComponent(assunto)}&whatsapp=${encodeURIComponent(whatsapp)}&mensagem=${encodeURIComponent(mensagem)}`;
  
  // Rastreamento de conversão do Google Ads
  if (typeof gtag === 'function') {
    gtag('event', 'conversion', {
      'send_to': 'AW-11482096216',
      'value': 1.0,
      'currency': 'BRL'
    });
  }
  
  return false;
}

// Máscara para o campo de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
  const whatsappInput = document.getElementById('whatsapp');
  if (whatsappInput) {
    whatsappInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length <= 11) {
        if (value.length > 2) {
          value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        }
        if (value.length > 10) {
          value = `${value.substring(0, 10)}-${value.substring(10)}`;
        }
      }
      e.target.value = value;
    });
  }
  
  // Configurar o formulário
  const form = document.getElementById('lead-form');
  if (form) {
    form.setAttribute('onsubmit', 'return enviarFormulario(event)');
  }
});
