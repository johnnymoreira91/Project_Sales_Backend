export class ContractMock {
  constructor (contractName, code, linkUrl) {
    this.contractName = contractName
    this.code = code
    this.linkUrl = linkUrl
  }

  contractName: string;
  code: string;
  linkUrl: string;
}

const first = new ContractMock('One', '001', 'www.one.com')
const second = new ContractMock('Two', '002', 'www.two.com')
