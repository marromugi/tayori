import { remove } from 'firestore/utils/remove'
import { Category } from '../types/category'

export const deleteCategory = async (category: Category) => {
  const result = await remove('category', category.id)
  return result
}
