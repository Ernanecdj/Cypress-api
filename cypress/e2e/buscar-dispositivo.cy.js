/// <reference types="cypress"/>

describe("Buscar dispositivos", () => {

    it("Buscar dispositivo especifico", () => {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/1'
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.id).to.equal("1")
        })
    });

    it("Buscar dispositivo inexistente", () => {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/inexistente',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(404)
            expect(response.body.error).to.equal("Oject with id=inexistente was not found.")
        })
    });

    it("Cadastrar dispositivo", () => {
        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            body: {
                "name": "Dispositivo do Ernane",
                "data": {
                   "year": 2020,
                   "price": 1849.99,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "1 TB"
                }
             },
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.name).to.equal("Dispositivo do Ernane");
        })
    });

    it("Atualizar dispositivo", () => {
        cy.request({
            method: 'PUT',
            url: 'https://api.restful-api.dev/objects/ff808181932badb601958c92e4083d4e',
            body: {
                "name": "Dispositivo Atualizado",
                "data": {
                   "year": 2020,
                   "price": 2000,
                   "CPU model": "Ryzen 9",
                   "Hard disk size": "1 TB"
                }
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.name).to.equal("Dispositivo Atualizado")
        })
    });

    it("Excluir Dispositivo", () => {
        cy.request({
            method: 'DELETE',
            url: 'https://api.restful-api.dev/objects/ff808181932badb601958c92e4083d4e',
        }).then((response) => {
            expect(response.status).to.equal(200)
        });

        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/ff808181932badb601958c92e4083d4e',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(404)
        });
    });
});