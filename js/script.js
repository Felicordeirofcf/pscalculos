// Script para o site Pontes & Silva Cálculos Judiciais

document.addEventListener('DOMContentLoaded', function() {
    // Formulário de contato
    const form = document.getElementById('lead-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const whatsapp = document.getElementById('whatsapp').value;
            
            if (!name || !email || !subject || !whatsapp) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Validação de WhatsApp
            const whatsappRegex = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;
            if (!whatsappRegex.test(whatsapp)) {
                alert('Por favor, insira um número de WhatsApp válido no formato (DDD) 90000-0000.');
                return;
            }
            
            // Simulação de envio (em produção, substituir por envio real)
            alert('Obrigado pelo contato! Em breve entraremos em contato com você.');
            form.reset();
            
            // Código para rastreamento de conversão do Google Ads
            // Em produção, substituir pelo código real de conversão
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                    'value': 1.0,
                    'currency': 'BRL'
                });
            }
        });
    }
    
    // Máscara para o campo de WhatsApp
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 2) {
                e.target.value = value.replace(/^(\d{0,2})/, '($1');
            } else if (value.length <= 7) {
                e.target.value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                e.target.value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        });
    }
    
    // Animação de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu fixo com mudança de estilo ao rolar
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = 'var(--white)';
                header.style.boxShadow = 'var(--box-shadow)';
            }
        });
    }
    
    // Código para rastreamento do Google Analytics e Google Ads
    // Em produção, substituir pelos IDs reais
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-MEASUREMENT_ID'); // Google Analytics
    gtag('config', 'AW-CONVERSION_ID'); // Google Ads
});
