import { api } from '@/services/api'
import { History } from '../components/orders/history'
import styles from './styles.module.scss'
import { getCookieServer } from '@/lib/cookieServer'
import type { OrderProps } from '@/lib/order.type';

async function getOrders(): Promise<OrderProps[] | []>{
  try{
    const token = getCookieServer();

    const response = await api.get("/history", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(response.data)
    return response.data || []

  }catch(err){
    console.log(err);
    return [];
  }
}

export default async function OrderHistory() {
  const orders = await getOrders()
  return (
    <div className={styles.container}>
      <h1>Histórico de Pedidos</h1>
      <History orders={orders} />
    </div>
  )
}
