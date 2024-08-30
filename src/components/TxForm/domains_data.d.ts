export interface DomainForSale {
  domain: string;
  status: string;
  price: number;
  buttonClass: string;
  payload: string;
}

export const domainsForSale: DomainForSale[];
