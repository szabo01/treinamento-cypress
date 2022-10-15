
class Requests {

  getPing() {
    return cy.api({
      method: 'GET',
      url: 'ping'
    })
  }

  getBooking() {
    return cy.api({
      method: 'GET',
      url: 'booking/1'
    })
  }

  postBooking() {
    return cy.api({
      method: 'POST',
      url: '/booking',
      body: {
        "firstname": "Jim",
        "lastname": "Tania",
        "totalprice": 99,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2022-01-01",
          "checkout": "2022-01-02"
        },
        "additionalneeds": "Breakfast"
      }
    })

  }


  updateBookingWithouToken(response) {
    const id = response.body.bookingid
    return cy.api({
      method: 'PUT',
      url: `booking/${id}`,
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
    })
  }

  updateBooking(response) {
    const id = response.body.bookingid

    return cy.api({
      mehotd: 'PUT',
      url: `booking/${id}`,
      headers: {
        Cookie: `token=${Cypress.env('token')}`
      },
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
    })
  }

  postAuth() {
    return cy.api({
      method: 'POST',
      url: 'auth',
      body: {
        "username": "admin",
        "password": "password123"
      }
    })
  }

  doAuth() {
    this.postAuth().then(authResponse => {
      const token = authResponse.body.token

      Cypress.env('token', token)
    })
  }

}

export default new Requests()