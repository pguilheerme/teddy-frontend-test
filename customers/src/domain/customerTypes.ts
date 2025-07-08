type CustomerType = {
  id: string;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
};

type CustomerAPIType = {
  clients: CustomerType[];
  totalPages: number;
  currentPage: number;
};

export type { CustomerType, CustomerAPIType };
