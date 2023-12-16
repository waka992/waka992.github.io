import JSEncrypt from "jsencrypt";
export default function useEncrypt() {
  const encrypt = (info) => {
    const cryptor = new JSEncrypt();
    const pubKey =
      "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvkrW1JY220aibetDKXXD6ZTnaU2UWRT4qoPrNJJ/AsrKJsYIOyi68N/LJHzb2i0OjSWgsHJT7lQpOHCo0Y17yczqqeB73EQUSmmoxj4JSwe4lFyQrYUqVSu8imiiI93hf0sgFll885ssvCcV20rzJMeLgDEP60xT3Imn1BXLYibSOmO4ZkluT9T1Kc+5WqnDbSre2Dbe0XU88wIh3Ba1alu9bZmYaa7GtU7gkOqkyLxY31nn1z+PaW0CUrTc3n9mH0uO5xBjdb1zI0bKpfeMiJmUWLB2sNgwOBRcC62of7rkQF/A0iLV75hy+aNNh975NB+WxKIOVuPRYo3yXivOXQIDAQAB-----END PUBLIC KEY-----";
    cryptor.setPublicKey(pubKey);
    return cryptor.encrypt(info);
  };

  const decrypt = (info) => {
    const cryptor = new JSEncrypt();
    const privateKey = ""
    //   "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvkrW1JY220aibetDKXXD6ZTnaU2UWRT4qoPrNJJ/AsrKJsYIOyi68N/LJHzb2i0OjSWgsHJT7lQpOHCo0Y17yczqqeB73EQUSmmoxj4JSwe4lFyQrYUqVSu8imiiI93hf0sgFll885ssvCcV20rzJMeLgDEP60xT3Imn1BXLYibSOmO4ZkluT9T1Kc+5WqnDbSre2Dbe0XU88wIh3Ba1alu9bZmYaa7GtU7gkOqkyLxY31nn1z+PaW0CUrTc3n9mH0uO5xBjdb1zI0bKpfeMiJmUWLB2sNgwOBRcC62of7rkQF/A0iLV75hy+aNNh975NB+WxKIOVuPRYo3yXivOXQIDAQAB-----END PUBLIC KEY-----";
    cryptor.setPublicKey(privateKey);
    return cryptor.decrypt(info);

  }
  return { encrypt };
}
