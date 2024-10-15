import styles from './styles.module.scss';
import { CategoryForm } from './categoryForm';
import { api } from '@/services/api';
import { getCookieServer } from '@/lib/cookieServer';

export default function Category() {

  async function handleRegisterCategory(formData: FormData) {
    "use server";

    const name = formData.get("name");
    if (!name) return;

    const data = {
      name: name.toString(),
    };

    const token = getCookieServer();

    try {
      // Fazendo a requisição para criar a categoria
      await api.post("/category", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    } catch (err) {
      console.log("Erro ao registrar categoria:", err);
    }
  }

  return (
    <main className={styles.container}>
      <h1>Nova Categoria</h1>
      <CategoryForm handleRegisterCategory={handleRegisterCategory} />
    </main>
  );
}
