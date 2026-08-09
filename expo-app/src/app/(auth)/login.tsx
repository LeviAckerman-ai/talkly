import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { LoginForm } from '@/features/auth/components/login-form';
import { useUsernameLogin } from '@/features/auth/hooks/use-username-login';

export default function LoginScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { mutate, isPending } = useUsernameLogin();

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
        flexGrow: 1,
      }}
      bottomOffset={100}
      contentContainerClassName="px-2 justify-center items-center"
    >
      <Text variant="h2" className="mb-8 text-center">
        Login to Talkly
      </Text>

      <LoginForm
        className="w-full max-w-sm"
        handleFormSubmit={(data) => mutate(data)}
        isFormSubmitting={isPending}
      />
    </KeyboardAwareScrollView>
  );
}
