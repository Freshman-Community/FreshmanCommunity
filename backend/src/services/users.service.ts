import { createHash } from 'crypto';
import { Users } from '../models/users.model';
import { logger } from '../modules/logger';

export async function createUser(
  username: string,
  password: string,
  nickname: string,
  major?: string,
  enteredYear?: number,
): Promise<number> {
  const hashedPassword = createHash('sha512').update(password).digest('hex');

  const { id: userId } = await Users.create({
    username,
    password: hashedPassword,
    nickname,
    major: major,
    enteredYear: enteredYear,
  });

  return userId;
}

export async function selectUser(
  id: number,
  username: string,
  nickname: string,
): Promise<Users> {
  if (id) {
    return await Users.findOne({ where: { id } });
  } else if (username) {
    return await Users.findOne({ where: { username } });
  } else if (nickname) {
    return await Users.findOne({ where: { nickname } });
  } else {
    return null;
  }
}

export async function verifyUser(
  username: string,
  password: string,
): Promise<boolean> {
  const user = await Users.findOne({ where: { username } });

  if (user === null) {
    return false;
  } else if (
    createHash('sha512').update(password).digest('hex') === user.password
  ) {
    return true;
  } else {
    return false;
  }
}
