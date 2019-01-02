/**
 * 加密方法
 * @param Plaintext 明文
 */
module.exports = Plaintext => {
  let ciphertext = require("crypto")
    .createHash("md5")
    .update(Plaintext)
    .digest("hex");
  return ciphertext;
};
