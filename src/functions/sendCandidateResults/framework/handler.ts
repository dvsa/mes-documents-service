export async function handler() {

  const isLocal = process.env.IS_LOCAL || false;
  const useNotify = process.env.USE_NOTIFY || false;

  if (isLocal) {
    console.log('Use stub notify');
    return {};
  }

  if (useNotify) {
    console.log('Use Gov notify');
    return {};
  }

  console.log('Log to CloudWatch');

}
