import { update } from 'firestore/utils/update'
import { Category } from 'components/category/types/category'
import { errorList } from './error'

export const saveCategory = async (category: Category) => {
  if (process.env.NODE_ENV === 'development') console.log(category)

  const result = await update<Category>('category', category.id, category)
  return result ? null : errorList.update_failed
}
