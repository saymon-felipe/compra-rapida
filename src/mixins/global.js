import { alertController } from '@ionic/vue';

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
        formatarDataPorExtenso: function (data) {
            data = new Date(data);

            const diasSemana = [
              'Domingo', 'Segunda-feira', 'Terça-feira',
              'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
            ];
          
            const meses = [
              'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
              'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
            ];
          
            const diaSemana = diasSemana[data.getDay()];
            const dia = data.getDate();
            const mes = meses[data.getMonth()];
            const ano = data.getFullYear();
          
            return `${diaSemana}, ${dia} ${mes} ${ano}`;
        },
        formatarParaReal(valor) {
            valor = parseFloat(valor);
            
            return valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        },
        scrollToInput: function (event) {
            setTimeout(() => {
                event.target.scrollIntoView({ behavior: "smooth", block: 'center' });
            }, 100)
        },
        saveCart: function () {
            let localStorageCart = JSON.parse(localStorage.getItem('cart')) || [];

            let index = localStorageCart.findIndex(c => c.id_usuario === this.$id_usuario);

            localStorageCart[index].produtos = this.$localStorage.cart;
            localStorage.setItem('cart', JSON.stringify(localStorageCart));
        },
        addToCart: function (produto, quantity) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let index = cart.findIndex(c => c.id_usuario === this.$id_usuario);

            if (!cart[index]) {
                let carrinhoUsuario = {
                    id_usuario: this.$id_usuario,
                    produtos: []
                };
                cart.push(carrinhoUsuario);
                index = cart.findIndex(c => c.id_usuario === this.$id_usuario);
            }
            
            let indexProdutoExistente = cart[index].produtos.findIndex(p => p.id === produto.id) || null;

            if (indexProdutoExistente != -1) {
                cart[index].produtos[indexProdutoExistente].quantity += quantity;
            } else {
                for (let i = 0; i < cart[index].produtos.length; i++) {
                    let currentProduct = cart[index].produtos[i];

                    if (currentProduct.store.id != produto.store.id) {
                        return false;
                    }
                }

                cart[index].produtos.push({...produto, quantity: quantity });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            return true;
        },
        removeFromCart: async function (produtoId) {
            const alert = await alertController.create({
                header: 'Excluir produto',
                message: 'Você tem certeza que deseja remover este produto do seu carrinho de compras?',
                buttons: [
                    {
                        text: 'Sim',
                        handler: () => {
                            return 'sim';
                        }
                    },
                    {
                        text: 'Cancelar',
                        handler: () => {
                            return 'cancelar';
                        }
                    }
                ]
            });

            await alert.present();
            const result = await alert.onWillDismiss();
            
            if (result.data === 'sim') {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                let index = cart.findIndex(c => c.id_usuario === this.$id_usuario);
            
                if (index === -1) return;
            
                cart[index].produtos = cart[index].produtos.filter(p => p.id !== produtoId);
            
                if (cart[index].produtos.length === 0) {
                    cart.splice(index, 1);
                }
            
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        },        
        clearCart: function () {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            let index = cart.findIndex(c => c.id_usuario === this.$id_usuario);

            if (index == -1) {
                let carrinhoUsuario = {
                    id_usuario: this.$id_usuario,
                    produtos: []
                };
                cart.push(carrinhoUsuario);
            }

            cart[index].produtos = [];

            localStorage.setItem('cart', JSON.stringify(cart));
        },
        getCart: function() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            let carrinhoUsuario = cart.find(c => c.id_usuario === this.$id_usuario);

            return carrinhoUsuario ? carrinhoUsuario.produtos : [];
        },
        goToProductDetails: function (product) {
            if (product) {
                this.$router.push({
                    name: 'ProductDetails',
                    params: {
                        product: JSON.stringify(product)
                    }
                });
            }
        }
    }
};
  