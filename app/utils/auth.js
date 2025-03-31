// utils/auth.js
import { useRouter } from 'nuxt/app'

export function useAuth() {
	const router = useRouter()

	const checkToken = destination => {
		const token = localStorage.getItem('access_token')
		if (!token) {
			router.push('/login')
		} else {
			router.push(destination)
		}
	}

	const logout = () => {
		localStorage.removeItem('access_token')
		router.push('/login')
	}

	return {
		checkToken,
		logout,
	}
}
