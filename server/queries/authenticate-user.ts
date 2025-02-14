import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function authenticateUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error('Unauthorized: User not found');
  }

  return user;
}
