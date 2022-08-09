import { Timestamp } from 'firebase/firestore'
import { insert } from 'firestore/utils/insert'
import { Category } from 'components/category/types/category'
import { getRandomStr } from 'shared/utils/string'

export const createCategory = async () => {
  const newCategory: Category = {
    id: getRandomStr(18),
    name: '新しいカテゴリー',
    created: Timestamp.now(),
    updated: Timestamp.now()
  }
  const result = insert('category', newCategory, newCategory.id)
  return result ? newCategory : null
}
