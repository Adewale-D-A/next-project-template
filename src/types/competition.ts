export interface Competition {
  _id: string;
  title: string;
  category: string;
  date: string;
  status: "active" | "available" | "request-sent";
  img: string;
  location: string;
}
