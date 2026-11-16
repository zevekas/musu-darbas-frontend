import { useAuth } from '@clerk/react'
import { useTranslation } from 'react-i18next'
import { createFileRoute, Navigate, Link } from '@tanstack/react-router'
import { EditUserDataForm } from '#/components/app/UserDataForm'
import { Header } from '#/components/Header';
import { Footer } from '#/components/Footer';
import { useState } from 'react'
import { useUserData } from '#/hooks/use-user-data';

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const { isLoaded, isSignedIn } = useAuth()
  
  if (!isLoaded) return <div>{t('common.loading')}</div>
  if (!isSignedIn) return <Navigate to="/" />

  return <ProfilePage/>
}

function ProfilePage() {
  const { t } = useTranslation()
  const { getUserData, saveUserData } = useUserData()
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const { data, isPending, isError } = getUserData

  if (isPending) return <div>{t('common.loading')}</div>
  if (isError) return <div>{t('common.error')}</div>
  if (!data.username) return <Navigate to="/app" />

  return (
    <div className="flex flex-col justify-between min-h-screen w-full">
      <Header />
      <main className="flex-1 p-4">
        <div className="mx-auto w-full max-w-md">
          <Link to="/app" className="text-sm text-muted-foreground">
            ← {t('auth.profile.edit.back')}
          </Link>
        </div>

        <EditUserDataForm
          submitting={saveUserData.isPending}
          error={error}
          onSubmit={(values) => {
            setError(null)
            setSaved(false)
            saveUserData.mutate(
              {
                username: values.username,
                dorm: values.dormId,
                room: values.roomNumber,
              },
              {
                onSuccess: () => setSaved(true),
                onError: () => setError(t('auth.profile.edit.saveError')),
              },
            )
          }}
        />

        {saved && (
          <p className="mx-auto mt-2 max-w-md text-sm text-green-600 text-center">
            {t('auth.profile.edit.saved')}
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}