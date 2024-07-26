import express from 'express'
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js'
import { deleteOrder, getAllOrders, getMyOrders, getOrderDetails, getSales, newOrder, updateOrder } from '../controllers/orderControllers.js'

const router = express.Router()
router.route('/orders/new').post(isAuthenticatedUser, newOrder)
router.route('/orders/:id').get(isAuthenticatedUser, getOrderDetails)
router.route('/me/orders').get(isAuthenticatedUser, getMyOrders)
router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders)
router.route('/admin/orders/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder)
router.route('/admin/get_sales')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getSales)




export default router