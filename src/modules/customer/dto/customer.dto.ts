export interface CreateCustomerDto {
  name: string;
  address: string;
  city: string;
  country: string;
  ice: string;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
}

export interface UpdateCustomerDto extends Partial<CreateCustomerDto> {
  id: string;
}
