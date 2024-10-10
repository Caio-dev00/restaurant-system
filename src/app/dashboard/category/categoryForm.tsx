"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/app/dashboard/components/button";
import styles from './styles.module.scss';
import { toast } from 'sonner';

interface CategoryFormProps {
  handleRegisterCategory: (formData: FormData) => Promise<void>;
}

export function CategoryForm({ handleRegisterCategory }: CategoryFormProps) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter(); // Para redirecionar no lado do cliente

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setIsPending(true);
    await handleRegisterCategory(formData);
    setIsPending(false);

    toast.success("Categoria registrada com sucesso!")
    router.push('/dashboard');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input 
        type="text"
        name="name"
        placeholder="Nome da categoria, ex: Pizzas"
        required
        className={styles.input}
      />
      <Button name="Cadastrar" isPending={isPending} />
    </form>
  );
}
