"use client";

import styles from './styles.module.scss';

interface Props {
  name: string;
  isPending?: boolean; 
}

export function Button({ name, isPending }: Props) {
  return (
    <button type="submit" disabled={isPending} className={styles.button}>
      {isPending ? "Carregando..." : name}
    </button>
  );
}
