export default function logout(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('grade');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('staff');
}
