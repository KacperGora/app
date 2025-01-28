export type Employee = {
  id: string;
  name: string;
  position: string;
  contact: string;
  imageSrc: any;
};

export type ServiceType = {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: { hours?: number; minutes: number };
};
