"use client"

import { use } from 'react'
import styles from './styles.module.scss'
import { RefreshCw } from 'lucide-react'
import { OrderProps } from '@/lib/order.type'
import { OrderContext } from '@/providers/order'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ModalHistory } from '../modal/modalHistory'

interface Props{
  orders: OrderProps[]
}

export function History({ orders }: Props){
  const { isOpen, onRequestOpen } = use(OrderContext)
  const router = useRouter();

  async function handleDetailOrder(order_id: string){
    await onRequestOpen(order_id)
  }

  function handleRefresh(){
    router.refresh();
    toast.success("Histórico atualizado com sucesso!")
  }

  const groupedOrders = orders.reduce((acc, order) => {
    const createdAt = order.created_at;
    if (!createdAt) return acc; 
  
    const date = new Date(createdAt);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(order);

    return acc;
  }, {} as Record<string, OrderProps[]>);


  return(
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Todos pedidos</h1>
          <button onClick={handleRefresh}>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {Object.entries(groupedOrders).map(([monthYear, orders]) => (
            <div key={monthYear}>
              <h3 className={styles.monthDivider}>{monthYear}</h3>
              {orders.map(order => (
                <button
                  key={order.id}
                  className={styles.orderItem}
                  onClick={() => handleDetailOrder(order.id)}
                >
                  <div className={styles.tag}></div>
                  <div className={styles.orderContainer}>
                    <span>Mesa {order.table}</span>
                    <span>{order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}</span>
                  </div>
                </button>
              ))}
            </div>
          ))}

          {orders.length === 0 && (
            <span className={styles.emptyItem}>
              Nenhum pedido aberto no momento...
            </span>
          )}
        </section>
      </main>

      {isOpen && <ModalHistory />}
    </>
  )
}