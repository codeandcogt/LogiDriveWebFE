export interface ApiResponse<T> {
  code: number | string;
  message: string;
  data: T;
}

export interface SelectOption {
  value: string;
  label: string;
}
