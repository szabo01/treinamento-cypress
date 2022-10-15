

class Assertions {


  shouldHaveStatus(response, status) {
    expect(response.status, `status id ${status}`).to.eq(status)
  }


  validateCointractOf(response, schema) {
    return cy.wrap(response.body).should(
      schema
    )
  }

  shouldBookingIdBePresent(response) {
    expect(response.body.bookingid, 'bookingid exists').to.not.be.null;
  }

  shouldHaveDefaultHeaders(response) {
    expect(response.headers, 'default headers').to.include({
      server: 'Cowboy',
      connection: 'keep-alive',
      'x-powered-by': 'Express'
    })
  }

  shouldContentTypeAppJson(response) {
    expect(response.headers, 'content type').to.include({
      'content-type': 'application/json; charset=utf-8'
    })
  }

  shouldDurationBeFast(response) {
    expect(response.duration, 'duration').lessThan(900)
  }
}

export default new Assertions()