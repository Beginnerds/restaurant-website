import { MenuCategory } from '@/payload-types'
import type { FieldHook } from 'payload'

type AssignOrderFieldHook = FieldHook<MenuCategory, number, MenuCategory>

export const assignOrderFieldHook: AssignOrderFieldHook = async ({
  value,
  originalDoc,
  operation,
  req,
  context,
}) => {
  // Prevent infinite loop by checking custom flag
  if (context?.isOrderingMenuCategories) {
    return typeof value === 'number' && value >= 1 ? value : 1
  }

  const payload = req.payload

  const isCreate = operation === 'create'

  const existing = await payload.find({
    collection: 'menu-categories',
    limit: 1000,
  })

  const otherItems = originalDoc?.id
    ? existing.docs.filter((doc) => doc.id !== originalDoc.id)
    : existing.docs

  const sorted = otherItems.sort((a, b) => {
    const orderA = a.order ?? Infinity
    const orderB = b.order ?? Infinity
    return orderA - orderB
  })

  const maxOrder = sorted.length + 1
  let finalOrder: number

  if (!value || value < 1) {
    finalOrder = maxOrder
  } else if (value > maxOrder) {
    finalOrder = maxOrder
  } else {
    finalOrder = value
  }

  // If order hasn't changed, skip reordering
  if (!isCreate && originalDoc?.order === finalOrder) {
    return finalOrder
  }

  // Set context flag to avoid recursion
  context.isOrderingMenuCategories = true

  // Reassign others to fill the gap or make space
  let current = 1
  for (const doc of sorted) {
    // Leave space for the new item
    if (current === finalOrder) current++

    if (doc.order !== current) {
      // Only perform update if the value has actually changed
      await payload.update({
        collection: 'menu-categories',
        id: doc.id,
        data: { order: current },
        context, // keep passing the flag forward
      })
    }

    current++
  }

  return finalOrder
}
