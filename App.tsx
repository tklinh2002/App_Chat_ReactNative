import { NavigationContainer,CommonActions } from '@react-navigation/native';
import Route from './router/route';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
      <Route/>
    </NavigationContainer>
    </QueryClientProvider>
    
  );
};
export default App;