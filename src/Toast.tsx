import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ToastType = 'info' | 'success' | 'error' | 'warning';

interface ToastConfig {
  backgroundColor: string;
  iconName: string;
  iconColor: string;
}

const TOAST_CONFIG: Record<ToastType, ToastConfig> = {
  info: {
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    iconName: 'info',
    iconColor: '#fff',
  },
  success: {
    backgroundColor: 'rgba(52, 199, 89, 0.9)',
    iconName: 'check-circle',
    iconColor: '#fff',
  },
  error: {
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    iconName: 'error',
    iconColor: '#fff',
  },
  warning: {
    backgroundColor: 'rgba(255, 204, 0, 0.9)',
    iconName: 'warning',
    iconColor: '#000',
  },
};

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

class ToastManager {
  private setToasts: React.Dispatch<React.SetStateAction<ToastItem[]>> | null =
    null;

  init(setToasts: React.Dispatch<React.SetStateAction<ToastItem[]>>) {
    this.setToasts = setToasts;
  }

  show(message: string, type: ToastType = 'info', duration: number = 3000) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastItem = { id, message, type, duration };

    this.setToasts?.((prev) => [...prev, newToast]);

    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  }

  private removeToast(id: string) {
    this.setToasts?.((prev) => prev.filter((toast) => toast.id !== id));
  }
}

export const toastManager = new ToastManager();

export const ToastContainer = () => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    toastManager.init(setToasts);
  }, []);

  return (
    <>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </>
  );
};

const ToastItem = ({ message, type, duration }: ToastItem) => {
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -30,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, duration - 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const config = TOAST_CONFIG[type];

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: config.backgroundColor,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.content}>
        <Icon
          name={config.iconName}
          size={24}
          color={config.iconColor}
          style={styles.icon}
        />
        <Text style={[styles.text, { color: config.iconColor }]}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 9999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
});
