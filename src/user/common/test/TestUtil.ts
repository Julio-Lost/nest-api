import { User } from '../../user.entity';

export default class TestUtil {
  static giveAMeValidUser(): User {
    const user = new User();
    user.email = 'valid@email.com';
    user.name = 'Valid Name';
    user.id = '1';

    return user;
  }
}
