# React Native Toastify - README

## 📦 Instalação

```bash
npm install react-native-toastify react-native-vector-icons
# ou
yarn add react-native-toastify react-native-vector-icons
```

## Configuração Obrigatória

Siga as instruções do `react-native-vector-icons` para configurar os ícones.

Adicione o `ToastContainer` no root do seu app (normalmente em `App.tsx`):

```jsx
import { ToastContainer } from 'react-native-toastify';

function App() {
  return (
    <>
      {/* Seus componentes */}
      <ToastContainer />
    </>
  );
}
```

## 🚀 Como Usar

Importe o objeto `toast` e use os métodos disponíveis:

```jsx
import toast from 'react-native-toastify';

// Métodos disponíveis
toast.show('Mensagem padrão'); // Tipo padrão: 'info'
toast.info('Informação importante');
toast.success('Sucesso!');
toast.error('Erro ocorreu');
toast.warning('Atenção!');

// Com duração customizada (ms)
toast.show('Mensagem de 5 segundos', 'info', 5000);
toast.error('Erro persistente', 5000);
```

## ⚙️ Configuração do ToastContainer

Personalize o comportamento global:

```jsx
<ToastContainer
  position="top" // ou 'bottom' (padrão)
  offset={20}    // distância das bordas
  duration={3000} // duração padrão
  animationDuration={300} // duração da animação
  maxToasts={3}  // máximo de toasts visíveis
/>
```

## 🎨 Personalização Avançada

### Tipos de Toast:

- **info** (azul)
- **success** (verde)
- **error** (vermelho)
- **warning** (amarelo)

### Métodos API:

| Método  | Parâmetros              | Descrição         |
| ------- | ----------------------- | ----------------- |
| show    | (msg, type?, duration?) | Toast genérico    |
| info    | (msg, duration?)        | Toast informativo |
| success | (msg, duration?)        | Toast de sucesso  |
| error   | (msg, duration?)        | Toast de erro     |
| warning | (msg, duration?)        | Toast de aviso    |

## 💡 Exemplo Completo

```jsx
import React from 'react';
import { Button, View } from 'react-native';
import toast, { ToastContainer } from 'react-native-toastify';

export default function App() {
  const showAllToasts = () => {
    toast.info('Você tem 3 notificações');
    toast.success('Relatório gerado!');
    setTimeout(() => {
      toast.error('Falha na conexão');
    }, 1000);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Mostrar Toasts" onPress={showAllToasts} />
      <ToastContainer position="top" duration={4000} />
    </View>
  );
}
```

## 🔧 Solução de Problemas

### Erros comuns:

#### Ícones não aparecem:

- Verifique a instalação do `react-native-vector-icons`.
- No Android, adicione no `android/app/build.gradle`:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

#### Toast não aparece:

- Certifique-se que o `<ToastContainer>` está renderizado.
- Verifique se não há erros no console.

#### Problemas no iOS:

```bash
cd ios && pod install && cd ..
```

## 📄 Licença

MIT

## 📥 Para instalar localmente durante o desenvolvimento:

```bash
# Na pasta do seu projeto principal:
npm install ../caminho/para/react-native-toastify
```
