import Swal from 'sweetalert2'

export function useRegister() {
  const email = ref('')
  const password = ref('')

  const register = async (): Promise<void> => {
    try {
      const response = await $fetch('/api/user', {
        method: 'POST',
        body: {
          email: email.value,
          password: password.value,
        },
      })

      const { isConfirmed } = await Swal.fire({
        title: 'Sucesso!',
        text: 'Conta criada com sucesso.',
        icon: 'success',
        confirmButtonText: 'Fechar',
      })

      if (isConfirmed) {
        navigateTo('/')
      }
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: error.response?._data?.message || 'Ocorreu um erro inesperado.',
        icon: 'error',
        confirmButtonText: 'Fechar',
      })
    }
  }

  return {
    email,
    password,
    register,
  }
}