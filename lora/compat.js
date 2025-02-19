export function resolvePayload(p, fp) {
  if (!p) {
    return null;
  }
  let payload = p;
  let fPort = fp;

  // chirpstack-v4 - mqtt integraion
  try {
    const up = JSON.parse(payload);
    if (!up.data) {
      return null;
    }
    payload = up.data;
    fPort = up.fPort;
  } catch (err) {}

  return { payload, fPort };
}
