describe('burgers spec', () => {
    before(() => {
        cy.visit('/');
        cy.contains('Соберите бургер');
    });

    beforeEach(() => {
        cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
            fixture: 'ingredients.json',
        });
    });

    it('should open ingredient modal', () => {
        cy.visit('/');
        //buns
        cy.get('[data-test-id=buns_group] [data-test-id=any_ingredient]').first().click();
        cy.get('[data-test-id=modal]').as('modal');
        cy.get('[data-test-id=close_modal]').as('closeModal');
        cy.get('@modal').contains('Детали ингредиента').should('exist');
        cy.get('@modal')
            .find('img')
            .should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/bun-02-large.png')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_name]')
            .contains('Краторная булка N-200i')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_calories]')
            .contains('420')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_proteins]')
            .contains('80')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_fat]')
            .contains('24')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_carbohydrates]')
            .contains('53')
            .should('exist');
        cy.get('@closeModal').click();
        cy.contains('Детали ингредиента').should('not.exist');

        //sauces
        cy.get('[data-test-id=sauces_group] [data-test-id=any_ingredient]').first().click();
        cy.get('[data-test-id=modal]').as('modal');
        cy.get('[data-test-id=close_modal]').as('closeModal');
        cy.get('@modal').contains('Детали ингредиента').should('exist');
        cy.get('@modal')
            .find('img')
            .should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/sauce-02-large.png');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_name]')
            .contains('Соус Spicy-X')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_calories]')
            .contains('30')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_proteins]')
            .contains('30')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_fat]')
            .contains('20')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_carbohydrates]')
            .contains('40')
            .should('exist');
        cy.get('@closeModal').click();
        cy.contains('Детали ингредиента').should('not.exist');

        //mains
        cy.get('[data-test-id=mains_group] [data-test-id=any_ingredient]').first().click();
        cy.get('[data-test-id=modal]').as('modal');
        cy.get('[data-test-id=close_modal]').as('closeModal');
        cy.get('@modal').contains('Детали ингредиента').should('exist');
        cy.get('@modal')
            .find('img')
            .should('have.attr', 'src', 'https://code.s3.yandex.net/react/code/meat-03-large.png')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_name]')
            .contains('Филе Люминесцентного тетраодонтимформа')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_calories]')
            .contains('643')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_proteins]')
            .contains('44')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_fat]')
            .contains('26')
            .should('exist');
        cy.get('@modal')
            .find('[data-test-id=ingredient_detail_carbohydrates]')
            .contains('85')
            .should('exist');
        cy.get('@closeModal').click();
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('should add ingredients to constructor using dnd', () => {
        cy.visit('/');
        cy.get('[data-test-id=buns_group] [data-test-id=any_ingredient]').first().as('bun');
        cy.get('[data-test-id=buns_group] [data-test-id=any_ingredient]').last().as('bun2');
        cy.get('[data-test-id=sauces_group] [data-test-id=any_ingredient]').first().as('souse');
        cy.get('[data-test-id=mains_group] [data-test-id=any_ingredient]').first().as('main');
        cy.get('[data-test-id=constructor_buns]').as('constructorBuns');
        cy.get('[data-test-id=constructor_ingredients]').as('constructorIngredients');

        cy.get('@bun')
            .find('[data-test-id=ingredient_name]')
            .then(($nameBun) => {
                cy.get('@bun').trigger('dragstart');
                cy.get('@constructorBuns').trigger('drop');
                cy.get('@constructorBuns').contains($nameBun.text()).should('exist');
            });

        cy.get('@souse')
            .find('[data-test-id=ingredient_name]')
            .then(($nameSouse) => {
                cy.get('@souse').trigger('dragstart');
                cy.get('@constructorIngredients').trigger('drop');
                cy.get('@constructorIngredients').contains($nameSouse.text()).should('exist');
            });

        cy.get('@main')
            .find('[data-test-id=ingredient_name]')
            .then(($nameMain) => {
                cy.get('@main').trigger('dragstart');
                cy.get('@constructorIngredients').trigger('drop');
                cy.get('@constructorIngredients').contains($nameMain.text()).should('exist');
            });

        cy.get('@bun2')
            .find('[data-test-id=ingredient_name]')
            .then(($nameBun2) => {
                cy.get('@bun2').trigger('dragstart');
                cy.get('@constructorBuns').trigger('drop');
                cy.get('@constructorBuns').contains($nameBun2.text()).should('exist');
            });

        // not exist
        cy.get('@bun')
            .find('[data-test-id=ingredient_name]')
            .then(($nameBun) => {
                cy.get('@bun').trigger('dragstart');
                cy.get('@constructorIngredients').trigger('drop');
                cy.get('@constructorIngredients').contains($nameBun.text()).should('not.exist');
            });

        cy.get('@main')
            .find('[data-test-id=ingredient_name]')
            .then(($nameMain) => {
                cy.get('@main').trigger('dragstart');
                cy.get('@constructorBuns').trigger('drop');
                cy.get('@constructorBuns').contains($nameMain.text()).should('not.exist');
            });
    });

    it('should process order with auth', () => {
        cy.visit('/');

        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
            fixture: 'order.json',
        }).as('postOrder');

        cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
            fixture: 'user.json',
        });

        // drop ingredients in constructor
        cy.get('[data-test-id=buns_group] [data-test-id=any_ingredient]').first().as('bun');
        cy.get('[data-test-id=sauces_group] [data-test-id=any_ingredient]').first().as('souse');
        cy.get('[data-test-id=mains_group] [data-test-id=any_ingredient]').first().as('main');
        cy.get('[data-test-id=constructor_buns]').as('constructorBuns');
        cy.get('[data-test-id=constructor_ingredients]').as('constructorIngredients');

        cy.get('@bun').trigger('dragstart');
        cy.get('@constructorBuns').trigger('drop');
        cy.get('@souse').trigger('dragstart');
        cy.get('@constructorIngredients').trigger('drop');
        cy.get('@main').trigger('dragstart');
        cy.get('@constructorIngredients').trigger('drop');

        // order
        cy.get('[data-test-id=order_submit]').click();

        // oops, you should be authorised
        cy.get('[data-test-id=email_input] input')
            .type('test@mail.com')
            .should('have.value', 'test@mail.com');
        cy.get('[data-test-id=password_input] input')
            .type('0123456789')
            .should('have.value', '0123456789');

        cy.get('[data-test-id=auth_submit] button').click();

        localStorage.setItem('accessToken', JSON.stringify('test-accessToken'));
        localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));

        // repeat and response
        cy.get('[data-test-id=order_submit]').click();
        cy.wait('@postOrder');

        cy.get('[data-test-id=modal]').contains('123').should('exist');
        cy.get('[data-test-id=close_modal]').click();
        cy.contains('идентификатор заказа').should('not.exist');
    });
});
