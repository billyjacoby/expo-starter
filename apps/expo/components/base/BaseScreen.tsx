import { SafeAreaView } from 'react-native-safe-area-context';

import { cn } from '~/utils/cn';

export function BaseScreen({
  children,
  className: classOverride,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const className = cn('flex flex-1 p-6', classOverride);
  return <SafeAreaView className={className}>{children}</SafeAreaView>;
}
