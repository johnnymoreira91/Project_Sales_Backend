import { Admin } from '@models/Admin'

describe('Should test Admin Model', () => {
  it('should get admins', async () => {
    const admins = await Admin.find({})
    expect(admins[0].name).toBe('Johnny')
  })

  it('should get one admin', async () => {
    const admin = await Admin.findOne({
      name: 'admin'
    })
    expect(admin.name).toBe('admin')
    expect(admin.email).toBe('admin@admin.com')
  })
})
