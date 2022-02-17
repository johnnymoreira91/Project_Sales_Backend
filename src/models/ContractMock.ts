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

function MyClass () {}

// function MyClass () {};

// MyClass.prototype.test = function () {
//   console.log('TEST')
// }

// function MyClassFactory () {
//   this.instances = []
// };

// MyClassFactory.prototype.create = function () {
//   const tmp = new MyClass()
//   this.instances.push(tmp)
//   return tmp
// }

// MyClassFactory.prototype.get = function (i) {
//   return this.instances[i]
// }

// MyClassFactory.prototype.getAll = function () {
//   return this.instances
// }

// const factory = new MyClassFactory()

// const obj1 = factory.create()
// const obj2 = factory.create()
// const obj3 = factory.create()

// const test1 = factory.get(0)

// const test2 = factory.getAll()

// for (const t of test2) {
//   t.test()
// }

// test1.test()
