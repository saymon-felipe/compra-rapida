import { alertController } from '@ionic/vue';

export default {
    watch: {
        loadingButton: function () {
            let progress = 0;
            
            if (this.loadingButton) {
                progress = 45;
            } else {
                progress = 100;
            }

            this.loadingStyle = progress;

            setTimeout(() => {
                if (this.loadingStyle == 100) {
                    this.loadingStyle = -1;

                    setTimeout(() => {
                        this.loadingStyle = 0;
                    }, 400)
                }
            }, 400);
        }
    },
    data() {
        return {
            loadingStyle: 0,
            loadingButton: false
        }
    },
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
        formatDate: function (date) {
            date = new Date(date);
          
            const dia = date.getDate();
            const mes = date.getMonth() - 1;
            const ano = date.getFullYear();
            const hora = date.getHours();
            const minutos = date.getMinutes();
          
            return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
        },
        isToday: function (date) {
            date = new Date(date);
            let now = new Date();
            now.setHours(now.getHours() - 3);
            
            if (now.getDate() == date.getDate() && now.getMonth() == date.getMonth() && now.getFullYear() == date.getFullYear()) {
                return "(Hoje)";
            } else {
                return "";
            }
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

            let index = localStorageCart.findIndex(c => c.id_usuario === this.$usuario.id);

            localStorageCart[index].produtos = this.$localStorage.cart;
            localStorage.setItem('cart', JSON.stringify(localStorageCart));
        },
        addToCart: function (produto, quantity) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let index = cart.findIndex(c => c.id_usuario === this.$usuario.id);
            
            if (!cart[index]) {
                let carrinhoUsuario = {
                    id_usuario: this.$usuario.id,
                    produtos: []
                };
                cart.push(carrinhoUsuario);
                index = cart.findIndex(c => c.id_usuario === this.$usuario.id);
            }
            
            let indexProdutoExistente = cart[index].produtos.findIndex(p => p.id === produto.id);

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
                        role: "sim"
                    },
                    {
                        text: 'Cancelar'
                    }
                ]
            });

            await alert.present();
            const result = await alert.onWillDismiss();
            
            if (result.role === 'sim') {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                let index = cart.findIndex(c => c.id_usuario === this.$usuario.id);
                
                if (index === -1) return;
            
                cart[index].produtos = cart[index].produtos.filter(p => p.id !== produtoId);
            
                if (cart[index].produtos.length === 0) {
                    cart.splice(index, 1);
                }
            
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        },        
        clearCart: async function ({ forceClear = false }) {
            let result;

            if (!forceClear) {
                const alert = await alertController.create({
                    header: 'Limpar carrinho',
                    message: 'Você tem certeza que deseja limpar o seu carrinho de compras?',
                    buttons: [
                        {
                            text: 'Sim',
                            role: "sim"
                        },
                        {
                            text: 'Cancelar'
                        }
                    ]
                });

                await alert.present();
                result = await alert.onWillDismiss();
            }
            
            if (forceClear || result?.role === 'sim') {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                let index = cart.findIndex(c => c.id_usuario === this.$usuario.id);

                if (index == -1) {
                    let carrinhoUsuario = {
                        id_usuario: this.$usuario.id,
                        produtos: []
                    };
                    cart.push(carrinhoUsuario);
                }

                cart[index].produtos = [];

                localStorage.setItem('cart', JSON.stringify(cart));
            }
        },
        getCart: function() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            let carrinhoUsuario = cart.find(c => c.id_usuario === this.$usuario.id);

            return carrinhoUsuario ? carrinhoUsuario.produtos : [];
        },
        cartItemsSum: function () {
            let cart = this.getCart();
            let sum = 0;

            for (let i = 0; i < cart.length; i++) {
                let currentProduct = cart[i];

                sum += (currentProduct.price * currentProduct.quantity);
            }

            sum += cart[0]?.delivery_tax;

            return sum || 0;
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
        },
        repeatOrder: function (order) {
            let data = {
                products: order.products
            }

            this.api.post("app/return_products", data).then(async (response) => {
                let unavailableProducts = response.data.returnObj.unavailableProducts;
                let products = response.data.returnObj.products;

                if (unavailableProducts.length) {
                    let resultadoHtml = resultado.join("\n");

                    const alert = await alertController.create({
                        header: 'Ops... Itens faltando',
                        message: 'Os seguintes itens não foram encontrados ou estão esgotados: \n ' + resultadoHtml,
                        buttons: [
                            {
                                text: 'OK'
                            }
                        ]
                    });

                    await alert.present();
                } else {
                    for (let i = 0; i < products.length; i++) {
                        let currentProduct = products[i];
                        this.addToCart(currentProduct, currentProduct.quantity);
                    }

                    this.$router.push("/cart");
                }
            }).catch(async (error) => {

                const alert = await alertController.create({
                    header: 'Ops... Erro ao refazer pedido',
                    message: 'Ocorreu um erro ao tentarmos refazer o seu pedido. Por favor tente novamente em alguns minutos.',
                    buttons: [
                        {
                            text: 'OK'
                        }
                    ]
                });

                await alert.present();
            })
        },
        setJwtInLocalStorage: function (jwt) {
            localStorage.setItem("jwt", jwt);
        },
        removeJwtFromLocalStorage: function () {
            localStorage.removeItem("jwt");
        },
        logout: function () {
            this.removeJwtFromLocalStorage();
            this.$usuario = {
                id: null
            }
        },
        verifyAuth: function (readOnly = false) {
            return new Promise((resolve, reject) => {
                let jwt = localStorage.getItem("jwt");
                let self = this;

                if (jwt) {
                    self.api.post("/app/check-jwt", { token: jwt }).then((response) => {
                        Object.assign(self.$usuario, response.data.returnObj.user);
                        self.setJwtInLocalStorage(response.data.returnObj.token);
                        
                        self.api.defaults.headers.common['Authorization'] = `Bearer ${response.data.returnObj.token}`;

                        resolve();
                    }).catch(() => {
                        if (!readOnly) {
                            self.$router.push("/login");
                        }
                        
                        self.logout();
                        reject();
                    })
                } else {
                    if (!readOnly) {
                        self.$router.push("/login");
                    }
                    
                    reject();
                }
            })
        },
        setSelectedAddress: function (address) {
            let localStorageAddresses = JSON.parse(localStorage.getItem('selectedAddress')) || [];

            let index = localStorageAddresses.findIndex(a => a.id_usuario === this.$usuario.id);

            let selectedAddress = {...address, id_usuario: this.$usuario.id };

            if (!localStorageAddresses[index]) {
                localStorageAddresses.push(selectedAddress);
                index = localStorageAddresses.findIndex(a => a.id_usuario === this.$usuario.id);
            }

            localStorageAddresses[index] = selectedAddress;
            localStorage.setItem('selectedAddress', JSON.stringify(localStorageAddresses));
        },
        getSelectedAddress: function () {
            let localStorageAddresses = JSON.parse(localStorage.getItem('selectedAddress')) || [];
            
            let index = localStorageAddresses.findIndex(a => a.id_usuario === this.$usuario.id);

            return localStorageAddresses[index] || undefined;
        },
        removeSelectedAddress: function () {
            if (!this.getSelectedAddress()) return;

            let localStorageAddresses = JSON.parse(localStorage.getItem('selectedAddress')) || [];
            
            let index = localStorageAddresses.findIndex(a => a.id_usuario === this.$usuario.id);

            localStorageAddresses.splice(index, 1);

            localStorage.setItem("selectedAddress", JSON.stringify(localStorageAddresses));
        }
    }
};
  