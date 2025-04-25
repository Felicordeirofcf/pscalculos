// Configuração adicional para o formulário de captação de leads
document.addEventListener('DOMContentLoaded', function() {
    // Formulário de contato com integração para captação de leads
    const form = document.getElementById('lead-form');
    if (form) {
        // Adicionar campos ocultos para rastreamento de origem
        const utmSource = document.createElement('input');
        utmSource.type = 'hidden';
        utmSource.name = 'utm_source';
        utmSource.value = getParameterByName('utm_source') || 'direct';
        form.appendChild(utmSource);
        
        const utmMedium = document.createElement('input');
        utmMedium.type = 'hidden';
        utmMedium.name = 'utm_medium';
        utmMedium.value = getParameterByName('utm_medium') || '';
        form.appendChild(utmMedium);
        
        const utmCampaign = document.createElement('input');
        utmCampaign.type = 'hidden';
        utmCampaign.name = 'utm_campaign';
        utmCampaign.value = getParameterByName('utm_campaign') || '';
        form.appendChild(utmCampaign);
        
        // Adicionar campo para data e hora do envio
        const timestamp = document.createElement('input');
        timestamp.type = 'hidden';
        timestamp.name = 'timestamp';
        form.appendChild(timestamp);
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Atualizar timestamp no momento do envio
            timestamp.value = new Date().toISOString();
            
            // Validação avançada
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validações mais rigorosas
            if (name.length < 3) {
                alert('Por favor, insira seu nome completo.');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            if (subject.length < 3) {
                alert('Por favor, especifique o assunto do contato.');
                return;
            }
            
            const whatsappRegex = /^\([0-9]{2}\) [0-9]{5}-[0-9]{4}$/;
            if (!whatsappRegex.test(whatsapp)) {
                alert('Por favor, insira um número de WhatsApp válido no formato (DDD) 90000-0000.');
                return;
            }
            
            // Coleta de dados do formulário
            const formData = {
                name: name,
                email: email,
                subject: subject,
                whatsapp: whatsapp,
                message: message,
                utm_source: utmSource.value,
                utm_medium: utmMedium.value,
                utm_campaign: utmCampaign.value,
                timestamp: timestamp.value,
                page_url: window.location.href
            };
            
            // Simulação de envio para um serviço de captação de leads
            console.log('Dados do lead:', formData);
            
            // Em produção, substituir por envio real para API ou serviço de e-mail
            // fetch('https://api.pontessilva.com.br/leads', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     console.log('Success:', data);
            //     showThankYouMessage();
            // })
            // .catch((error) => {
            //     console.error('Error:', error);
            //     alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
            // });
            
            // Simulação de sucesso
            showThankYouMessage();
            
            // Rastreamento de conversão para Google Ads
            if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                    'value': 1.0,
                    'currency': 'BRL',
                    'transaction_id': generateLeadId()
                });
                
                // Evento para Google Analytics
                gtag('event', 'form_submission', {
                    'event_category': 'lead',
                    'event_label': subject,
                    'value': 1
                });
            }
            
            // Evento para Facebook Pixel (se implementado)
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', {
                    content_name: subject,
                    content_category: 'Formulário de Contato'
                });
            }
        });
    }
    
    // Função para exibir mensagem de agradecimento
    function showThankYouMessage() {
        const form = document.getElementById('lead-form');
        const contactForm = document.querySelector('.contact-form');
        
        // Esconder formulário
        form.style.display = 'none';
        
        // Criar e mostrar mensagem de agradecimento
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Obrigado pelo seu contato!</h3>
            <p>Recebemos sua mensagem e entraremos em contato em breve através do WhatsApp ou e-mail fornecido.</p>
            <p>A Pontes & Silva Cálculos Judiciais agradece seu interesse.</p>
            <button class="btn btn-primary" id="new-message-btn">Enviar nova mensagem</button>
        `;
        
        contactForm.appendChild(thankYouMessage);
        
        // Botão para enviar nova mensagem
        document.getElementById('new-message-btn').addEventListener('click', function() {
            form.reset();
            form.style.display = 'block';
            thankYouMessage.remove();
        });
    }
    
    // Função para obter parâmetros da URL (para rastreamento de UTM)
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    // Função para gerar ID único para cada lead
    function generateLeadId() {
        return 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
});
