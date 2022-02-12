import { ContractMock } from '@models/ContractMock'

describe('Should test ContractMock', () => {
  it('should create user', () => {
    const contractOne = new ContractMock(
      'Loja do Joao', 'SP0001', 'www.lojadojoao.com.br'
    )
    expect(contractOne.contractName).toBe('Loja do Joao')
  })

  // it('should get all ContractMock' () => {
  //   let contracts = ContractMock
  // })
})
