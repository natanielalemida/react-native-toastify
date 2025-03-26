import React from 'react';
import { View, Button } from 'react-native';
import toast, { ToastContainer } from 'react-native-toastify';

const App: React.FC = () => {
  const handleToast = () => {
    toast.show('Esta é uma mensagem de informação');
    toast.success('Sucesso!');
    toast.error('Erro!', 5000);
    toast.warning('Atenção!');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Mostrar Toast" onPress={handleToast} />
      <ToastContainer />
    </View>
  );
};

export default App;
