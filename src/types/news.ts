import { Category } from "./category"

export interface News {
  title: string
  subtitle: string
  category_id: number
  id?: number
  category:Category
}