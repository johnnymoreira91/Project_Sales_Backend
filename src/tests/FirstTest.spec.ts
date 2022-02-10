import { User } from '@models/UserTeste'

test('it should be ok', () => {
  const user = new User()

  user.name = 'Johnny'

  expect(user.name).toEqual('Johnny')
})
