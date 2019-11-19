// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Photon } from './generated/photon'; // eslint-disable-line import/no-unresolved

const photon = new Photon();

// eslint-disable-next-line import/prefer-default-export
export async function handler(event: any, context: any, callback: any): any {
  const users = await photon.users();
  return {
    statusCode: 200,
    body: JSON.stringify(users),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
}
