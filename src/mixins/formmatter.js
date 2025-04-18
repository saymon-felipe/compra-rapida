export default {
    methods: {
        formmatCurrency(value) {
            const number = parseFloat(value);

            if (isNaN(number)) return 'R$ 0,00';

            return number.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
    }
};
  