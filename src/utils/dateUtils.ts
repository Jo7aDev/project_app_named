/**
 * Formata uma string de data para um formato mais legível
 */
export function formatarData(data: Date): string {
  const dia = data.getDate().toString().padStart(2, '0')
  const mes = (data.getMonth() + 1).toString().padStart(2, '0')
  const ano = data.getFullYear()
  const hora = data.getHours().toString().padStart(2, '0')
  const minutos = data.getMinutes().toString().padStart(2, '0')

  return `${dia}/${mes}/${ano} ${hora}:${minutos}`
}

/**
 * Verifica se uma data é hoje
 */
export const eHoje = (dataString: string): boolean => {
  const data = new Date(dataString);
  const hoje = new Date();
  
  return data.getDate() === hoje.getDate() &&
    data.getMonth() === hoje.getMonth() &&
    data.getFullYear() === hoje.getFullYear();
};

/**
 * Verifica se uma data está no passado
 */
export const ePassado = (dataString: string): boolean => {
  const data = new Date(dataString);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  return data < hoje;
};

/**
 * Obtém um tempo relativo legível (hoje, ontem, amanhã ou data formatada)
 */
export const obterTempoRelativo = (dataString: string): string => {
  const data = new Date(dataString);
  const hoje = new Date();
  const ontem = new Date();
  const amanha = new Date();
  
  ontem.setDate(hoje.getDate() - 1);
  amanha.setDate(hoje.getDate() + 1);
  
  // Reseta as partes de tempo para comparação precisa
  hoje.setHours(0, 0, 0, 0);
  ontem.setHours(0, 0, 0, 0);
  amanha.setHours(0, 0, 0, 0);
  data.setHours(0, 0, 0, 0);
  
  if (data.getTime() === hoje.getTime()) {
    return 'Hoje';
  } else if (data.getTime() === ontem.getTime()) {
    return 'Ontem';
  } else if (data.getTime() === amanha.getTime()) {
    return 'Amanhã';
  } else {
    return formatarData(data);
  }
};

export function calcularDiferencaDias(data1: Date, data2: Date): number {
  const diffTime = Math.abs(data2.getTime() - data1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function adicionarDias(data: Date, dias: number): Date {
  const novaData = new Date(data)
  novaData.setDate(novaData.getDate() + dias)
  return novaData
}