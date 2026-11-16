import { SignInButton, SignUpButton, useAuth } from '@clerk/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Header } from '#/components/Header'
import { Footer } from '#/components/Footer'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { t, i18n } = useTranslation()
  const { isSignedIn, isLoaded } = useAuth()

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />

      <main className="flex flex-1 flex-col justify-center bg-muted/40 px-6 py-10 md:px-12">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h1 className="max-w-xs text-4xl font-normal leading-tight">
              {t('home.title')}
            </h1>
            <p className="mt-5 text-muted-foreground">
              {t('home.description')}
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              {isLoaded &&
                (isSignedIn ? (
                  <Button asChild size="lg" className="min-w-36">
                    <Link to="/app">{t('home.dashboard')}</Link>
                  </Button>
                ) : (
                  <>
                    <SignUpButton>
                      <Button size="lg" className="min-w-36">
                        {t('auth.register')}
                      </Button>
                    </SignUpButton>

                    <SignInButton>
                      <Button variant="outline" size="lg" className="min-w-36">
                        {t('auth.login')}
                      </Button>
                    </SignInButton>
                  </>
                ))}
            </div>
          </div>

          <div className="flex justify-end">
            <img
              src={
                i18n.resolvedLanguage?.startsWith('en')
                  ? '/atsargu-pavyzdys-en.png'
                  : '/atsargu-pavyzdys.png'
              }
              alt={t('home.demo.alt')}
              className="w-full max-w-lg h-auto"
            />
          </div>
        </section>
        <section className="mt-20 bg-primary/10 p-6">
          <h2 className="text-lg font-normal">{t('home.steps.title')}</h2>

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              <span className="bg-background px-2 py-1 text-xs font-medium text-primary">
                1
              </span>
              <h3 className="text-xs font-medium">
                {t('home.steps.createAccount')}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-background px-2 py-1 text-xs font-medium text-primary">
                2
              </span>
              <h3 className="text-xs font-medium">
                {t('home.steps.joinBlock')}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="bg-background px-2 py-1 text-xs font-medium text-primary">
                3
              </span>
              <h3 className="text-xs font-medium">
                {t('home.steps.manageSupplies')}
              </h3>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
