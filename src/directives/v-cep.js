export default {
    mounted(el, binding, vnode) {
      function formatCEP(value) {
        value = value.replace(/\D/g, '');
        if (value.length > 5) {
          value = value.slice(0, 5) + '-' + value.slice(5, 8);
        }
        return value;
      }
  
      function validateCEP(value) {
        return /^\d{5}-\d{3}$/.test(value);
      }
  
      async function fetchCEPData(cep) {
        try {
          const res = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
          const data = await res.json();
          if (!data.erro) {
            // Dispara evento personalizado com os dados do CEP
            el.dispatchEvent(new CustomEvent('cep-found', { detail: data }));
          }
        } catch (err) {
          console.error('Erro ao buscar CEP:', err);
        }
      }
  
      const handler = (e) => {
        const formatted = formatCEP(e.target.value);
        if (e.target.value !== formatted) {
          e.target.value = formatted;
          el.dispatchEvent(new Event('input'));
        }
  
        if (!validateCEP(formatted)) {
          el.setCustomValidity('CEP inválido. Formato esperado: 00000-000');
        } else {
          el.setCustomValidity('');
          fetchCEPData(formatted); // busca o CEP automaticamente
        }
      };
  
      el.addEventListener('input', handler);
    }
  };
  