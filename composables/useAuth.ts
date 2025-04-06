import Swal from 'sweetalert2'

interface LoginResponse {
  message: string;
}

export function useAuth() {
  const email = ref<string>('')
  const password = ref<string>('')

  const login = async (): Promise<void> => {
    try {
      const response = await $fetch<LoginResponse>('/api/login', {
        method: 'POST',
        body: {
          email: email.value,
          password: password.value,
        },
      })

      const { isConfirmed } = await Swal.fire({
        title: 'Sucesso!',
        text: 'Login realizado com sucesso.',
        icon: 'success',
        confirmButtonText: 'Fechar',
      })

      if (isConfirmed) {
        navigateTo('/')
      }
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: error.response?._data?.message ?? 'Ocorreu um erro ao fazer login.',
        icon: 'error',
        confirmButtonText: 'Close',
      })
    }
  }

  return {
    email,
    password,
    login,
  }
}
