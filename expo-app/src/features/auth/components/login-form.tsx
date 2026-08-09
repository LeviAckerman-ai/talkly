import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View, ViewProps } from 'react-native';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { UsernameLoginParam, usernameLoginParmaSchema } from '../schema/username-login.schema';

interface LoginFormProps extends ViewProps {
  handleFormSubmit: (data: UsernameLoginParam) => void;
  isFormSubmitting: boolean;
}

export function LoginForm({
  className,
  handleFormSubmit,
  isFormSubmitting,
  ...props
}: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
    },
    resolver: zodResolver(usernameLoginParmaSchema),
  });

  const onSubmit = (data: UsernameLoginParam) => {
    handleFormSubmit(data);
  };

  return (
    <View className={cn('gap-4', className)} {...props}>
      <View className="gap-2">
        <Label nativeID="username">Username</Label>
        <Controller
          control={control}
          name="username"
          render={({ field: { name, onBlur, onChange, value } }) => (
            <Input
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              aria-labelledby="username"
            />
          )}
        />
        {errors.username && (
          <Text className="text-sm text-red-500">{errors.username.message as string}</Text>
        )}
      </View>

      <Button onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
}
