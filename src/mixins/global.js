export default {
    methods: {
        chooseItemDeliveryTaxClass(delivery_tax) {
            if (delivery_tax === 0) {
                return 'green';
            }
            return '';
        },
        chooseItemDeliveryTax(delivery_tax) {
            if (delivery_tax === 0) {
                return 'Grátis';
            } else {
                return this.formmatCurrency(delivery_tax);
            }
        },
        formatarParaReal(valor) {
            return valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        },
        scrollToInput: function (event) {
            setTimeout(() => {
                event.target.scrollIntoView({ behavior: "smooth", block: 'center' });
            }, 100)
        }
    }
};
  