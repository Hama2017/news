import { Category } from "./category"

export interface News {
  title: string
  subtitle: string
  category:Category
  id?: number
}