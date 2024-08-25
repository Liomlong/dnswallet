// 引入原始的 Wallet 类型
import { Wallet } from '@tonconnect/ui-react';

// 扩展 Wallet 类型以包括额外的 username 属性
export interface ExtendedWallet extends Wallet {
  username?: string;
}
