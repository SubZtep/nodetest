const Lab = require('lab')
const Code = require('code')

const handlers = require('../src/handlers')

const { describe, it } = exports.lab = Lab.script()
const expect = Code.expect

describe('twitter', () => {

  it ('keys', () => {
    expect(process.env.consumer_key).to.be.string()
    expect(process.env.consumer_secret).to.be.string()
    expect(process.env.access_token_key).to.be.string()
    expect(process.env.access_token_secret).to.be.string()
  })

})
