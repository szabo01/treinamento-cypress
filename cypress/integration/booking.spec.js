/// <reference types="cypress" />


import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

describe('Validar teste de contrato do GET Booking', () => {

  before(() => {
    req.doAuth()
  })
  it('GET Booking', () => {

    req.getBooking()
      .then(getBookingResponse => {
        assertions.validateCointractOf(getBookingResponse, schemas.getBookingSchema())
      })
  });


  it('Criar uma reserva com sucesso', () => {
    cy.api({
      method: 'POST',
      url: 'booking',
      body: {
        "firstname": "Jim zoe",
        "lastname": "Brown yasuo",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2020-01-01",
          "checkout": "2020-01-02"
        },
        "additionalneeds": "Breakfast"
      }
    }).then(postBookingResponse => {
      assertions.shouldHaveStatus(postBookingResponse, 200)
      assertions.shouldBookingIdBePresent(postBookingResponse)
      assertions.shouldContentTypeAppJson(postBookingResponse)
      assertions.shouldDurationBeFast(postBookingResponse)
      assertions.shouldHaveDefaultHeaders(postBookingResponse)
    })
  });

  it('Alterar uma reserva sem token', () => {


    cy.api({
      method: 'PUT',
      url: 'booking/16',
      body: {
        "firstname": "La",
        "lastname": "James Qualquer",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2020-01-01",
          "checkout": "2020-01-02"
        },
        "additionalneeds": "Breakfast"
      },
      failOnStatusCode: false
    }).then(postbookingResponse => {
      req.updateBookingWithouToken(postbookingResponse).then(putBookingResponse => {
        assertions.shouldHaveStatus(putBookingResponse, 403)
      })
    })
  });

  it('Realizar alteração com token válido', () => {
    req.postBooking().then(postBookingResponse => {
      req.updateBooking(postBookingResponse).then(putBookingResponse => {
        assertions.shouldHaveStatus(putBookingResponse, 200)
      })
    })
  });
  // validar alteração sem token
  // validar alteração com token inválido
  // validar alteração com sucesso
})

