export interface UserLogin {
  name: string,
  password: string,
  email: string,
  uuid?: string,
  permissionLevel?: number,
  superUser: boolean
}
