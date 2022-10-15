/// <reference types="cypress" />


import req from '../support/api/requests'

import assertions from '../support/api/assertions';
describe('Ping', () => {
  it('GET Healtcheck', () => {

    // ping
    req.getPing().then(getPingResponse => {
      assertions.shouldHaveStatus(getPingResponse, 201)
    })
  });

});