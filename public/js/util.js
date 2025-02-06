var config = {
  apiURL: 'http://localhost:3000/common',
  loginURL: 'http://'
};

async function request(method, endpoint, data) {
  const response = await fetch(`${config.apiURL}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

async function arrayBufferToBase64(buffer) {
  const uint8Array = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

async function encryptAES(data) {
  const key = await crypto.subtle.generateKey(
    { name: 'AES-CBC', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encryptedData = await crypto.subtle.encrypt(
    { name: 'AES-CBC', iv },
    key,
    new TextEncoder().encode(data)
  );
  return { key, iv, encryptedData };
}

async function encryptAESWithRSA(data, t) {
  const { key, iv, encryptedData } = await encryptAES(data);
  const rawPublicKey = (await request('GET', 'crypto/rsa/key')).key
  const publicKeyBuffer = Uint8Array.from(
    atob(rawPublicKey.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\n/g, '')),
    (c) => c.charCodeAt(0)
  ).buffer
  const publicKey = await crypto.subtle.importKey(
    'spki',
    publicKeyBuffer,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    true,
    ['encrypt']
  );
  const rawKey = await crypto.subtle.exportKey('raw', key)
  const encryptedKey = await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    publicKey,
    rawKey
  );
  const encryptedIV = await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    publicKey,
    iv
  );
  if(t === 'base64') {
    const encryptedKeyBase64 = await arrayBufferToBase64(encryptedKey);
    const encryptedIVBase64 = await arrayBufferToBase64(encryptedIV);
    const encryptedDataBase64 = await arrayBufferToBase64(encryptedData);
    return { encryptedKey: encryptedKeyBase64, encryptedIV: encryptedIVBase64, encryptedData: encryptedDataBase64 };
  }
  return { encryptedKey, encryptedIV, encryptedData };
}