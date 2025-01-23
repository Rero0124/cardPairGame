export abstract class ICommonService {
  getPublicKeyRSA: () => Promise<{ key: string }>;
}